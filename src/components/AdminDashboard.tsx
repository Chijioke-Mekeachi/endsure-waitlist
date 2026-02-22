import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { motion } from "motion/react";
import {
  Activity,
  CalendarClock,
  LogOut,
  RefreshCw,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";
import { getSupabaseHeaders, SUPABASE_URL } from "../lib/supabase";

type WaitlistEntry = {
  id: string;
  email: string;
  created_at: string;
  status: string | null;
  referred_by: string | null;
};

const ADMIN_PASSWORD =
  import.meta.env.NEXT_PUBLIC_ADMIN_PASSWORD ||
  import.meta.env.VITE_ADMIN_PASSWORD ||
  "endsure-admin";

const AUTH_STORAGE_KEY = "endsure_admin_authenticated";

function isAuthenticatedFromStorage() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.sessionStorage.getItem(AUTH_STORAGE_KEY) === "1";
}

function formatDateTime(value: string | null | undefined) {
  if (!value) {
    return "N/A";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function dateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getRecentDaysCounts(entries: WaitlistEntry[], days = 14) {
  const map = new Map<string, number>();
  for (const entry of entries) {
    const key = dateKey(new Date(entry.created_at));
    map.set(key, (map.get(key) || 0) + 1);
  }

  const now = new Date();
  const labels = new Intl.DateTimeFormat("en-US", { weekday: "short" });

  return Array.from({ length: days }, (_, index) => {
    const day = new Date(now);
    day.setHours(0, 0, 0, 0);
    day.setDate(day.getDate() - (days - 1 - index));
    const key = dateKey(day);
    return {
      key,
      label: labels.format(day),
      count: map.get(key) || 0,
    };
  });
}

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(isAuthenticatedFromStorage);
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    if (!SUPABASE_URL) {
      setFetchError(
        "Supabase URL missing. Add NEXT_PUBLIC_SUPABASE_URL before using admin analytics."
      );
      return;
    }

    setIsLoading(true);
    setFetchError("");

    try {
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/waitlist?select=id,email,created_at,status,referred_by&order=created_at.desc&limit=5000`,
        {
          method: "GET",
          headers: getSupabaseHeaders(),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        const message =
          Array.isArray(error) && error[0]?.message
            ? error[0].message
            : error?.message || "Failed to load waitlist analytics.";
        throw new Error(message);
      }

      const rows = (await response.json()) as WaitlistEntry[];
      setEntries(rows);
      setLastUpdated(new Date().toISOString());
    } catch (error) {
      setFetchError(
        error instanceof Error ? error.message : "Failed to load waitlist analytics."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    void loadData();
  }, [isAuthenticated, loadData]);

  const analytics = useMemo(() => {
    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;

    const total = entries.length;
    const signups24h = entries.filter(
      (entry) => now - new Date(entry.created_at).getTime() <= day
    ).length;
    const signups7d = entries.filter(
      (entry) => now - new Date(entry.created_at).getTime() <= 7 * day
    ).length;
    const signups30d = entries.filter(
      (entry) => now - new Date(entry.created_at).getTime() <= 30 * day
    ).length;
    const referredCount = entries.filter(
      (entry) => entry.referred_by && entry.referred_by.trim().length > 0
    ).length;
    const pendingCount = entries.filter(
      (entry) => (entry.status || "").toLowerCase() === "pending"
    ).length;
    const referralRate = total === 0 ? 0 : (referredCount / total) * 100;
    const avgDaily30d = signups30d / 30;
    const latest = entries[0]?.created_at || null;
    const oldest = entries[entries.length - 1]?.created_at || null;
    const trend = getRecentDaysCounts(entries, 14);

    return {
      total,
      signups24h,
      signups7d,
      signups30d,
      referredCount,
      pendingCount,
      referralRate,
      avgDaily30d,
      latest,
      oldest,
      trend,
    };
  }, [entries]);

  const maxTrendCount = Math.max(...analytics.trend.map((item) => item.count), 1);

  const handleLogin = (event: FormEvent) => {
    event.preventDefault();
    setAuthError("");

    if (password !== ADMIN_PASSWORD) {
      setAuthError("Incorrect admin password.");
      return;
    }

    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(AUTH_STORAGE_KEY, "1");
    }
    setIsAuthenticated(true);
    setPassword("");
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(AUTH_STORAGE_KEY);
    }
    setIsAuthenticated(false);
    setEntries([]);
  };

  return (
    <section id="admin" className="py-24 px-6 bg-navy text-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-emerald/90 font-bold mb-4">
            <Shield className="w-4 h-4" />
            Investor Analytics
          </p>
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            Waitlist Admin Dashboard
          </h2>
          <p className="text-white/70 max-w-2xl">
            Track signups, trend momentum, and referral traction with real-time data
            from your Supabase waitlist table.
          </p>
        </div>

        {!isAuthenticated ? (
          <div className="bg-white/10 border border-white/15 rounded-3xl p-8 md:p-10 max-w-xl">
            <form onSubmit={handleLogin} className="space-y-4">
              <label className="block text-sm font-semibold text-white/80">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 rounded-xl bg-white/95 text-navy outline-none border-2 border-transparent focus:border-emerald"
                required
              />
              <button
                type="submit"
                className="w-full bg-emerald text-white py-3 rounded-xl font-bold hover:bg-emerald/90 transition-all"
              >
                Login to Admin Dashboard
              </button>
            </form>
            {authError ? (
              <p className="text-red-300 text-sm mt-4">{authError}</p>
            ) : null}
            <p className="text-xs text-white/60 mt-6">
              For production security, move this to real authentication and server-side
              authorization.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-white/65">
                Last updated: {formatDateTime(lastUpdated)}
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => void loadData()}
                  disabled={isLoading}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition-all disabled:opacity-60"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
                  Refresh
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>

            {fetchError ? (
              <div className="bg-red-500/15 border border-red-300/30 rounded-xl px-4 py-3 text-red-200 text-sm">
                {fetchError}
              </div>
            ) : null}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <motion.div className="bg-white/10 rounded-2xl border border-white/10 p-5">
                <p className="text-white/65 text-sm mb-2">Total Signups</p>
                <div className="flex items-end justify-between">
                  <p className="text-3xl font-black">{analytics.total}</p>
                  <Users className="w-6 h-6 text-emerald" />
                </div>
              </motion.div>

              <motion.div className="bg-white/10 rounded-2xl border border-white/10 p-5">
                <p className="text-white/65 text-sm mb-2">Signups in 7 Days</p>
                <div className="flex items-end justify-between">
                  <p className="text-3xl font-black">{analytics.signups7d}</p>
                  <TrendingUp className="w-6 h-6 text-emerald" />
                </div>
              </motion.div>

              <motion.div className="bg-white/10 rounded-2xl border border-white/10 p-5">
                <p className="text-white/65 text-sm mb-2">Last 24 Hours</p>
                <div className="flex items-end justify-between">
                  <p className="text-3xl font-black">{analytics.signups24h}</p>
                  <Activity className="w-6 h-6 text-emerald" />
                </div>
              </motion.div>

              <motion.div className="bg-white/10 rounded-2xl border border-white/10 p-5">
                <p className="text-white/65 text-sm mb-2">Pending Status</p>
                <div className="flex items-end justify-between">
                  <p className="text-3xl font-black">{analytics.pendingCount}</p>
                  <CalendarClock className="w-6 h-6 text-emerald" />
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2 bg-white/10 rounded-2xl border border-white/10 p-6">
                <h3 className="text-xl font-bold mb-2">Signup Trend (Last 14 Days)</h3>
                <p className="text-sm text-white/60 mb-6">
                  Daily signup volume to show growth momentum.
                </p>
                <div className="h-56">
                  <div className="h-44 grid grid-cols-[repeat(14,minmax(0,1fr))] gap-2 items-end">
                    {analytics.trend.map((point) => {
                      const ratio = point.count / maxTrendCount;
                      const height = point.count === 0 ? 8 : Math.max(12, ratio * 160);
                      return (
                        <div key={point.key} className="flex flex-col items-center justify-end h-full">
                          <div
                            title={`${point.key}: ${point.count} signups`}
                            className="w-full rounded-md bg-emerald/80 hover:bg-emerald transition-colors"
                            style={{ height: `${height}px` }}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="grid grid-cols-[repeat(14,minmax(0,1fr))] gap-2 mt-4">
                    {analytics.trend.map((point) => (
                      <span
                        key={`${point.key}-label`}
                        className="text-[10px] text-center text-white/60"
                      >
                        {point.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white/10 rounded-2xl border border-white/10 p-6">
                <h3 className="text-xl font-bold mb-4">Investor Snapshot</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-white/65">Signups in 30 days</span>
                    <span className="font-bold">{analytics.signups30d}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/65">Avg/day (30d)</span>
                    <span className="font-bold">{analytics.avgDaily30d.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/65">Referral signups</span>
                    <span className="font-bold">{analytics.referredCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/65">Referral rate</span>
                    <span className="font-bold">{analytics.referralRate.toFixed(1)}%</span>
                  </div>
                  <div className="border-t border-white/15 pt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white/65">First signup</span>
                      <span className="font-medium">{formatDateTime(analytics.oldest)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/65">Latest signup</span>
                      <span className="font-medium">{formatDateTime(analytics.latest)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-2xl border border-white/10 p-6">
              <h3 className="text-xl font-bold mb-2">Recent Signups</h3>
              <p className="text-sm text-white/60 mb-5">
                Latest 10 people who joined the waitlist.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[560px]">
                  <thead>
                    <tr className="text-left text-white/60 border-b border-white/10">
                      <th className="py-3 pr-4 font-medium">Email</th>
                      <th className="py-3 pr-4 font-medium">Signup Time</th>
                      <th className="py-3 pr-4 font-medium">Status</th>
                      <th className="py-3 font-medium">Referral</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.slice(0, 10).map((entry) => (
                      <tr key={entry.id} className="border-b border-white/5">
                        <td className="py-3 pr-4">{entry.email}</td>
                        <td className="py-3 pr-4">{formatDateTime(entry.created_at)}</td>
                        <td className="py-3 pr-4 capitalize">{entry.status || "unknown"}</td>
                        <td className="py-3">{entry.referred_by ? "Yes" : "No"}</td>
                      </tr>
                    ))}
                    {entries.length === 0 && !isLoading ? (
                      <tr>
                        <td className="py-6 text-white/60" colSpan={4}>
                          No waitlist records yet.
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
