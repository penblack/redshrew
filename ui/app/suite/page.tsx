'use client';

import { useEffect, useState } from 'react';
import { ShieldAlert, TerminalSquare, Eye, Cloud, Settings, X, ArrowRight, FlaskConical } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

type GeneratedSkeleton = {
  type: string;
  filename: string;
  path: string;
  value: string;
  created_at: string;
  tracking_bit: string;
  canary_url: string;
};

type PhantomStatus = {
  status?: string;
  generated?: GeneratedSkeleton[];
  error?: string;
} | null;

type HoneyPitchStatus = {
  status?: string;
  generated?: string[];
  error?: string;
} | null;

type EventLog = {
  timestamp: string;
  tool: string;
  action: string;
  status: string;
  metadata?: Record<string, unknown>;
};

type SystemStatus = {
  phantomkey: boolean;
  honeypitch: boolean;
  event_log_count: number;
  system_health: string;
  config_loaded: boolean;
} | null;

export default function CommandCenter() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'tools' | 'events' | 'cloud' | 'settings'>('dashboard');
  const [phantomStatus, setPhantomStatus] = useState<PhantomStatus>(null);
  const [honeypitchStatus, setHoneyPitchStatus] = useState<HoneyPitchStatus>(null);
  const [eventLogs, setEventLogs] = useState<EventLog[]>([]);
  const [systemStatus, setSystemStatus] = useState<SystemStatus>(null);

const handlePhantomKeyStart = async () => {
  try {
    const res = await fetch('/api/phantomkey/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fake_skeletons: ['aws', 'github', 'ssh'] }),
    });

    // safe parse + status check
    const data = await res.json().catch(() => null);
    if (!res.ok || !data) throw new Error(`HTTP ${res.status}`);

    setPhantomStatus(data);
  } catch (err) {
    console.error('Error calling PhantomKey:', err);
    setPhantomStatus({ error: 'Failed to connect to backend' });
  }
};


const handleHoneyPitchStart = async () => {
  try {
    const res = await fetch('/api/honeypitch/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    // safe parse + status check
    const data = await res.json().catch(() => null);
    if (!res.ok || !data) throw new Error(`HTTP ${res.status}`);

    setHoneyPitchStatus(data);
  } catch (err) {
    console.error('Error calling HoneyPitch:', err);
    setHoneyPitchStatus({ error: 'Failed to connect to backend' });
  }
};

  // Show the "in development" modal on first load
  useEffect(() => {
    setModalOpen(true);
  }, []);

useEffect(() => {
  if (activeTab === 'dashboard') {
    fetch('/api/status')
      .then(async (res) => {
        const data = await res.json().catch(() => null);
        if (!res.ok || !data) throw new Error('bad status');
        setSystemStatus(data);
      })
      .catch(() => setSystemStatus(null));
  } else if (activeTab === 'events') {
    fetch('/api/observer/logs')
      .then(async (res) => {
        const data = (await res.json().catch(() => null)) as EventLog[] | null;
        if (!res.ok || !data) throw new Error('bad logs');
        setEventLogs(data);
      })
      .catch(() =>
        setEventLogs([
          {
            timestamp: new Date().toISOString(),
            tool: 'Observer',
            action: 'Fetch Logs',
            status: 'Failed to fetch logs',
          },
        ])
      );
  }
}, [activeTab]);

  return (
    <>
      {/* ── In-development modal ────────────────────────────────── */}
      <AnimatePresence>
        {modalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
              onClick={() => setModalOpen(false)}
            />

            {/* Card */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="pointer-events-auto w-full max-w-md bg-neutral-950 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">

                {/* Red accent bar */}
                <div className="h-1 w-full bg-gradient-to-r from-red-700 via-red-500 to-red-700" />

                <div className="p-7">
                  {/* Header row */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-900/40 border border-red-700/40 flex items-center justify-center">
                        <FlaskConical size={20} className="text-red-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <h2 className="text-base font-bold text-white">The Suite is in Development</h2>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded-full px-2 py-0.5">
                          Early Access
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setModalOpen(false)}
                      className="flex-shrink-0 text-neutral-500 hover:text-neutral-200 transition-colors mt-0.5"
                      aria-label="Dismiss"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Body */}
                  <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                    We&apos;re actively building the full RedShrew Suite — HoneyPitch, Observer, Cloud Sync, and more are on the way.
                  </p>
                  <p className="text-sm text-neutral-400 leading-relaxed mb-7">
                    In the meantime, <span className="text-white font-medium">PhantomKey</span> is live and ready to use. Deploy realistic decoy API keys and get alerted the moment an attacker uses one.
                  </p>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/dashboard"
                      onClick={() => setModalOpen(false)}
                      className="flex items-center justify-center gap-2 flex-1 px-4 py-2.5 rounded-md text-sm font-semibold text-white bg-red-600 hover:bg-red-500 transition-colors"
                    >
                      View PhantomKey MVP
                      <ArrowRight size={15} />
                    </Link>
                    <button
                      onClick={() => setModalOpen(false)}
                      className="flex-1 px-4 py-2.5 rounded-md text-sm font-medium text-neutral-400 hover:text-neutral-200 border border-white/10 hover:border-white/20 transition-colors"
                    >
                      Browse Anyway
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    <main className="min-h-screen bg-black text-white font-sans p-6">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-red-600 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-neutral-200">RedShrew Command Center</h1>
        <span className="text-sm text-gray-400">v0.1.0</span>
      </header>

      {/* Navigation */}
      <nav className="flex space-x-4 mb-8">
        {([
          ['dashboard', ShieldAlert, 'Dashboard'],
          ['tools', TerminalSquare, 'Tools'],
          ['events', Eye, 'Event Log'],
          ['cloud', Cloud, 'Cloud Sync'],
          ['settings', Settings, 'Settings'],
        ] as const).map(([tab, Icon, label]) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={tabClass(activeTab, tab)}
          >
            <div className="flex items-center space-x-2">
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </div>
          </button>
        ))}
      </nav>

      {/* Content Area */}
      <section className="bg-zinc-900 rounded-xl p-6 shadow-md">
        {activeTab === 'dashboard' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-red-400">System Overview</h2>
            {systemStatus ? (
              <ul className="text-sm space-y-2">
                <li>🛡️ PhantomKey: {systemStatus.phantomkey ? 'Active' : 'Inactive'}</li>
                <li>🧪 HoneyPitch: {systemStatus.honeypitch ? 'Active' : 'Inactive'}</li>
                <li>📜 Event Logs: {systemStatus.event_log_count}</li>
                <li>🟢 System Health: {systemStatus.system_health}</li>
                <li>⚙️ Config Loaded: {systemStatus.config_loaded ? 'Yes' : 'No'}</li>
              </ul>
            ) : (
              <p className="text-gray-500">Loading system status...</p>
            )}
          </div>
        )}

        {activeTab === 'tools' && (
          <div className="space-y-10">
            <ToolModule
              title="PhantomKey"
              description="Generate decoy skeletons to catch intruders."
              onStart={handlePhantomKeyStart}
              status={phantomStatus}
            />
            <ToolModule
              title="HoneyPitch"
              description="Deploy fake files or services to catch intruders."
              onStart={handleHoneyPitchStart}
              status={honeypitchStatus}
            />
          </div>
        )}

        {activeTab === 'events' && (
  <div className="space-y-4">
    <h2 className="text-xl font-bold text-red-400">Event Logs</h2>
    {eventLogs.length === 0 ? (
      <p className="text-sm text-gray-500">No logs found.</p>
    ) : (
      <ul className="text-sm space-y-2">
        {eventLogs.map((log, idx) => (
          <li key={log.timestamp || idx} className="bg-zinc-800 p-3 rounded shadow space-y-1">
            <p><strong>{log.timestamp}</strong></p>

            <p className="flex items-center gap-2">
              <img src="/toolbox.svg" alt="Tool icon" className="w-4 h-4" />
              Tool: {log.tool}
            </p>

            <p className="flex items-center gap-2">
              <img src="/logs.svg" alt="Action icon" className="w-4 h-4" />
              Action: {log.action}
            </p>

            <p className="flex items-center gap-2">
              <img src="/status.svg" alt="Status icon" className="w-4 h-4" />
              Status: {log.status}
            </p>

            {log.metadata && Object.keys(log.metadata).length > 0 && (
              <pre className="bg-black text-green-400 p-2 rounded mt-2">
                {JSON.stringify(log.metadata, null, 2)}
              </pre>
            )}
          </li>
        ))}
      </ul>
    )}
  </div>
)}

        {activeTab === 'cloud' && <div>☁️ Cloud Connection Status and API Key Management</div>}
        {activeTab === 'settings' && <div>⚙️ Local Preferences and Config File Editor</div>}
      </section>
    </main>
  </>
  );
}

function tabClass(active: string, name: string) {
  return `flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium transition ${
    active === name
      ? 'bg-red-600 text-white shadow-lg'
      : 'text-gray-300 hover:bg-zinc-800 hover:text-white'
  }`;
}

function ToolModule({
  title,
  description,
  onStart,
  status,
}: {
  title: string;
  description: string;
  onStart: () => void;
  status: PhantomStatus | HoneyPitchStatus;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-red-400">{title}</h2>
      <p className="text-sm text-gray-400">{description}</p>
      <button
        onClick={onStart}
        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-semibold shadow"
      >
        Start {title}
      </button>
      {status && (
        <pre className="bg-zinc-800 p-4 rounded text-sm text-green-400 mt-4">
          {JSON.stringify(status, null, 2)}
        </pre>
      )}
    </div>
  );
}
