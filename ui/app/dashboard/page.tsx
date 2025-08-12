'use client'
import React, { useEffect, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// TEMP: Recharts TS workaround for Next.js + TS
type AnyComponent = React.ComponentType<any>;
const ResponsiveContainerC = ResponsiveContainer as unknown as AnyComponent;
const LineChartC = LineChart as unknown as AnyComponent;
const LineC = Line as unknown as AnyComponent;
const XAxisC = RechartsXAxis as unknown as AnyComponent;
const YAxisC = RechartsYAxis as unknown as AnyComponent;
const TooltipC = Tooltip as unknown as AnyComponent;
const LegendC = Legend as unknown as AnyComponent;
const PieChartC = PieChart as unknown as AnyComponent;
const PieC = Pie as unknown as AnyComponent;
const CellC = Cell as unknown as AnyComponent;




const API_BASE = process.env.NEXT_PUBLIC_REDSHREW_API_BASE || "https://api.redshrew.com/api";

// ---- Types ----
export type GeneratedKey = {
  type?: string;
  name?: string;
  provider?: string;
  tracking_bit: string;
  canary_url: string;
  used?: number;
  max_uses?: number;
  expires_at?: number | null;
  skeleton?: { type?: string };
};

export type TriggerEvent = {
  event?: string;
  tracking_id?: string;
  skeleton?: { type?: string };
  used?: number;
  max_uses?: number;
  ts?: number;
  created_ts?: number;
  ip?: string;
  country?: string;
  geo?: { country?: string };
};

type FormState = {
  fake_skeletons: string;
  ttl_seconds: number;
  max_uses: number;
  webhook_url: string;
};

export default function RedShrewDashboard() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Keys created during this session (MVP: until /all endpoint exists)
  const [keys, setKeys] = useState<GeneratedKey[]>([]);

  // Logs (trigger events). We will try /phantomkey/logs; if missing, we just keep it empty.
  const [logs, setLogs] = useState<TriggerEvent[]>([]);

  // Form state for creating keys
  const [form, setForm] = useState<FormState>({
    fake_skeletons: "aws,github,ssh",
    ttl_seconds: 86400,
    max_uses: 1,
    webhook_url: "",
  });

  // Attempt to fetch logs periodically (fallback if endpoint not present)
  useEffect(() => {
    let active = true;
    async function fetchLogs() {
      try {
        const res = await fetch(`${API_BASE}/phantomkey/logs`);
        if (!res.ok) return; // endpoint may not exist yet
        const data = await res.json();
        if (active && Array.isArray(data?.events)) {
          setLogs(data.events as TriggerEvent[]);
        }
      } catch {
        // best-effort; keep silent for MVP
      }
    }
    fetchLogs();
    const id = setInterval(fetchLogs, 10000);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, []);

  // KPI calculations
  const kpis = useMemo(() => {
    // Triggers Today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const startTs = Math.floor(startOfDay.getTime() / 1000);

    const triggersToday = logs.filter((e) => (e.ts || 0) >= startTs).length;

    // Active keys — without /all we only know locally created
    const activeKeys = keys.length;

    // Expired/Consumed — unknown without status; show 0 for MVP
    const expired = 0;

    // Avg. Time-to-Trigger
    let ttt: number | null = null;
    const valid = logs.filter((e) => e.created_ts && e.ts && e.ts >= e.created_ts);
    if (valid.length) {
      const avg =
        valid.reduce((acc, e) => acc + ((e.ts as number) - (e.created_ts as number)), 0) /
        valid.length;
      ttt = avg; // seconds
    }

    return { triggersToday, activeKeys, expired, ttt };
  }, [logs, keys]);

  // Triggers by hour (last 24h) for chart
  const timeSeries = useMemo(() => {
    const buckets = new Map<string, number>(); // hour label -> count
    const now = new Date();
    for (let i = 23; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 3600 * 1000);
      const label = `${d.getHours()}:00`;
      buckets.set(label, 0);
    }
    logs.forEach((e) => {
      if (!e.ts) return;
      const d = new Date(e.ts * 1000);
      const label = `${d.getHours()}:00`;
      if (buckets.has(label)) buckets.set(label, (buckets.get(label) || 0) + 1);
    });
    return Array.from(buckets.entries()).map(([name, count]) => ({ name, count }));
  }, [logs]);

  // Distribution by skeleton type (for donut chart)
  const donutData = useMemo(() => {
    const counts = new Map<string, number>();
    logs.forEach((e) => {
      const t = e?.skeleton?.type || "unknown";
      counts.set(t, (counts.get(t) || 0) + 1);
    });
    return Array.from(counts.entries()).map(([name, value]) => ({ name, value }));
  }, [logs]);

  async function handleCreateKeys(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const types = form.fake_skeletons
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const body: {
        fake_skeletons: string[];
        ttl_seconds: number;
        max_uses: number;
        webhook_url?: string;
      } = {
        fake_skeletons: types,
        ttl_seconds: Number(form.ttl_seconds) || 86400,
        max_uses: Number(form.max_uses) || 1,
      };
      if (form.webhook_url) body.webhook_url = form.webhook_url;

      const res = await fetch(`${API_BASE}/phantomkey/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Create failed: ${res.status} ${txt}`);
      }
      const data = await res.json();
      const generated = Array.isArray(data?.generated) ? (data.generated as GeneratedKey[]) : [];
      setKeys((prev) => [...generated, ...prev]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).catch(() => {});
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Top nav */}
      <header className="sticky top-0 z-10 border-b border-red-900/40 bg-neutral-950/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-red-700" />
            <div className="font-bold tracking-tight">RedShrew • PhantomKey</div>
          </div>
          <div className="text-sm text-neutral-400">MVP Dashboard (Wireframe)</div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 grid grid-cols-12 gap-6">
        {/* KPI Cards */}
        <section className="col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPI label="Active Keys" value={kpis.activeKeys} />
          <KPI label="Triggers Today" value={kpis.triggersToday} />
          <KPI label="Expired Keys" value={kpis.expired} />
          <KPI label="Avg. Time-to-Trigger" value={kpis.ttt ? fmtDuration(kpis.ttt) : "—"} />
        </section>

        {/* Charts */}
        <section className="col-span-12 lg:col-span-8 p-4 rounded-2xl border border-red-900/40 bg-neutral-900/40 shadow">
          <h3 className="text-sm font-semibold text-neutral-300 mb-3">Triggers • last 24h</h3>
          <div className="h-64">
           <ResponsiveContainerC width="100%" height="100%">
  <LineChartC data={timeSeries} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
    <XAxisC dataKey="name" hide={false} tick={{ fill: "#a3a3a3", fontSize: 12 }} />
    <YAxisC allowDecimals={false} tick={{ fill: "#a3a3a3", fontSize: 12 }} />
    <TooltipC
      contentStyle={{ background: "#111", border: "1px solid #4c0519", color: "#fff" }}
      labelStyle={{ color: "#fff" }}
      itemStyle={{ color: "#fff" }}
    />
    <LineC type="monotone" dataKey="count" stroke="#ef4444" strokeWidth={2} dot={false} />
  </LineChartC>
</ResponsiveContainerC>



          </div>
        </section>

        <section className="col-span-12 lg:col-span-4 p-4 rounded-2xl border border-red-900/40 bg-neutral-900/40 shadow">
          <h3 className="text-sm font-semibold text-neutral-300 mb-3">Top Skeletons</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChartC margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
  <PieC
    data={donutData}
    dataKey="value"
    nameKey="name"
    innerRadius={50}
    outerRadius={80}
    stroke="#111827"
  >
    {donutData.map((_, i) => (
      <CellC
        key={i}
        fill={["#ef4444", "#f97316", "#f59e0b", "#22c55e", "#3b82f6", "#a855f7"][i % 6]}
      />
    ))}
  </PieC>

  <LegendC
    verticalAlign="bottom"
    align="center"
    iconType="circle"
    height={28}
    wrapperStyle={{ color: "#e5e7eb", fontSize: 12 }}
  />

  <TooltipC
    contentStyle={{ background: "#111", border: "1px solid #4c0519", color: "#fff" }}
    labelStyle={{ color: "#fff" }}
    itemStyle={{ color: "#fff" }}
  />
</PieChartC>


            </ResponsiveContainer>
          </div>
        </section>

        {/* Create Keys */}
        <section className="col-span-12 xl:col-span-4 p-4 rounded-2xl border border-red-900/40 bg-neutral-900/60 shadow">
          <h3 className="text-sm font-semibold text-neutral-300 mb-3">Create PhantomKey</h3>
          <form onSubmit={handleCreateKeys} className="flex flex-col gap-3">
            <label className="text-xs text-neutral-400">Skeleton Types (comma-separated)</label>
            <input
              className="rounded-md bg-black/60 border border-red-900/50 px-3 py-2 text-sm"
              value={form.fake_skeletons}
              onChange={(e) => setForm((f) => ({ ...f, fake_skeletons: e.target.value }))}
              placeholder="aws,github,ssh"
            />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-neutral-400">TTL Seconds</label>
                <input
                  type="number"
                  className="w-full rounded-md bg-black/60 border border-red-900/50 px-3 py-2 text-sm"
                  value={form.ttl_seconds}
                  onChange={(e) => setForm((f) => ({ ...f, ttl_seconds: Number(e.target.value) }))}
                />
              </div>
              <div>
                <label className="text-xs text-neutral-400">Max Uses</label>
                <input
                  type="number"
                  className="w-full rounded-md bg-black/60 border border-red-900/50 px-3 py-2 text-sm"
                  value={form.max_uses}
                  onChange={(e) => setForm((f) => ({ ...f, max_uses: Number(e.target.value) }))}
                />
              </div>
            </div>

            <label className="text-xs text-neutral-400">Webhook URL (optional)</label>
            <input
              className="rounded-md bg-black/60 border border-red-900/50 px-3 py-2 text-sm"
              value={form.webhook_url}
              onChange={(e) => setForm((f) => ({ ...f, webhook_url: e.target.value }))}
              placeholder="https://your.site/hook"
            />

            {error && <div className="text-sm text-red-400">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 rounded-lg bg-red-600 hover:bg-red-500 active:bg-red-700 transition px-4 py-2 text-sm font-semibold shadow disabled:opacity-60"
            >
              {loading ? "Creating…" : "Create"}
            </button>

            <p className="text-xs text-neutral-500 mt-1">
              Uses <span className="font-mono">POST {API_BASE}/phantomkey/start</span>. Returned bits show below.
            </p>
          </form>
        </section>

        {/* Keys Table */}
        <section className="col-span-12 xl:col-span-8 p-4 rounded-2xl border border-red-900/40 bg-neutral-900/60 shadow">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-neutral-300">Keys Created (this session)</h3>
            <span className="text-xs text-neutral-500">(Connect to /phantomkey/all later)</span>
          </div>
          <div className="overflow-auto rounded-xl border border-neutral-800">
            <table className="min-w-full text-sm">
              <thead className="bg-neutral-900/80 text-neutral-300">
                <tr>
                  <Th>Skeleton</Th>
                  <Th>Tracking ID</Th>
                  <Th>Canary URL</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {keys.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-4 text-center text-neutral-500">No keys yet — create one above.</td>
                  </tr>
                )}
                {keys.map((k, idx) => (
                  <tr key={idx} className="odd:bg-black/30">
                    <Td>{k?.type || k?.skeleton?.type || labelFromSkeleton(k)}</Td>
                    <Td className="font-mono text-xs break-all">{k.tracking_bit}</Td>
                    <Td>
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-black/50 rounded px-2 py-1 border border-neutral-800">{k.canary_url}</code>
                        <button
                          onClick={() => copyToClipboard(fullURL(k.canary_url))}
                          className="text-xs rounded bg-neutral-800 hover:bg-neutral-700 px-2 py-1"
                        >Copy</button>
                      </div>
                    </Td>
                    <Td>
                      <div className="flex items-center gap-2">
                        <a
                          href={fullURL(k.canary_url)}
                          target="_blank"
                          className="text-xs underline text-red-300 hover:text-red-200"
                          rel="noreferrer"
                        >Test</a>
                      </div>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Live Feed */}
        <section className="col-span-12 p-4 rounded-2xl border border-red-900/40 bg-neutral-900/60 shadow">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-neutral-300">Live Activity Feed</h3>
            <span className="text-xs text-neutral-500">Polls /phantomkey/logs every 10s (add SSE later)</span>
          </div>
          <div className="overflow-auto rounded-xl border border-neutral-800">
            <table className="min-w-full text-sm">
              <thead className="bg-neutral-900/80 text-neutral-300">
                <tr>
                  <Th>Time</Th>
                  <Th>Skeleton</Th>
                  <Th>Tracking ID</Th>
                  <Th>IP</Th>
                  <Th>Country</Th>
                </tr>
              </thead>
              <tbody>
                {logs.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-neutral-500">No events yet.</td>
                  </tr>
                )}
                {logs.map((e, i) => (
                  <tr key={i} className="odd:bg-black/30">
                    <Td className="whitespace-nowrap">{e.ts ? new Date(e.ts * 1000).toLocaleString() : "—"}</Td>
                    <Td>{e?.skeleton?.type || "—"}</Td>
                    <Td className="font-mono text-xs break-all">{e.tracking_id || "—"}</Td>
                    <Td>{e.ip || "—"}</Td>
                    <Td>{e.country || e.geo?.country || "—"}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

function KPI({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-red-900/40 bg-neutral-900/60 p-4 shadow">
      <div className="text-xs text-neutral-400 mb-1">{label}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="text-left p-3 font-semibold text-xs uppercase tracking-wide">{children}</th>;
}
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`p-3 align-top ${className}`}>{children}</td>;
}

function fmtDuration(sec: number | null | undefined) {
  if (sec == null) return "—";
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  if (h) return `${h}h ${m}m`;
  if (m) return `${m}m ${s}s`;
  return `${s}s`;
}

function isKeyLike(x: unknown): x is { type?: string; name?: string; provider?: string } {
  return !!x && typeof x === "object";
}
function labelFromSkeleton(skel: unknown) {
  if (!isKeyLike(skel)) return "—";
  return skel.type ?? skel.name ?? skel.provider ?? "—";
}


function fullURL(path: string) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const base = (API_BASE || "").replace(/\/+$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  if (base.endsWith("/api") && p.startsWith("/api/")) {
    return base.slice(0, -4) + p; // drop trailing /api from base
  }
  return `${base}${p}`;
}
