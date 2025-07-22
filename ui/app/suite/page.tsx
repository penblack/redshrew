'use client';

import { useEffect, useState } from 'react';
import { ShieldAlert, TerminalSquare, Eye, Cloud, Settings } from 'lucide-react';

type PhantomStatus = {
  status?: string;
  generated?: string[];
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
  const [activeTab, setActiveTab] = useState<'dashboard' | 'tools' | 'events' | 'cloud' | 'settings'>('dashboard');
  const [phantomStatus, setPhantomStatus] = useState<PhantomStatus>(null);
  const [honeypitchStatus, setHoneyPitchStatus] = useState<HoneyPitchStatus>(null);
  const [eventLogs, setEventLogs] = useState<EventLog[]>([]);
  const [systemStatus, setSystemStatus] = useState<SystemStatus>(null);

  const handlePhantomKeyStart = async () => {
    try {
      const response = await fetch('/api/phantomkey/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fake_skeleton: ['API_KEY_XYZ', 'TOKEN_ABC'] }),
      });
      const data = await response.json();
      setPhantomStatus(data);
    } catch (error) {
      console.error('Error calling PhantomKey:', error);
      setPhantomStatus({ error: 'Failed to connect to backend' });
    }
  };

  const handleHoneyPitchStart = async () => {
    try {
      const response = await fetch('/api/honeypitch/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      setHoneyPitchStatus(data);
    } catch (error) {
      console.error('Error calling HoneyPitch:', error);
      setHoneyPitchStatus({ error: 'Failed to connect to backend' });
    }
  };

  useEffect(() => {
    if (activeTab === 'dashboard') {
      fetch('/api/status')
        .then((res) => res.json())
        .then((data) => setSystemStatus(data))
        .catch(() => setSystemStatus(null));
    } else if (activeTab === 'events') {
      fetch('/api/observer/logs')
        .then((res) => res.json())
        .then((data: EventLog[]) => setEventLogs(data))
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
