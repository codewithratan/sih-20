import { useEffect, useState } from "react";

interface Log {
  time: number;
  lat?: number;
  lon?: number;
}

export default function MulchMission({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [logs, setLogs] = useState<Log[]>(() => {
    try {
      const raw = localStorage.getItem("agriquest_mulch_logs_v1");
      return raw ? (JSON.parse(raw) as Log[]) : [];
    } catch {
      return [];
    }
  });
  const [locError, setLocError] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("agriquest_mulch_logs_v1", JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    if (logs.length >= 3) onComplete();
  }, [logs, onComplete]);

  const checkIn = () => {
    setLocError(null);
    if (!navigator.geolocation) {
      setLogs((l) => [...l, { time: Date.now() }]);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLogs((l) => [
          ...l,
          { time: Date.now(), lat: latitude, lon: longitude },
        ]);
      },
      (err) => {
        setLocError(err.message || "Location unavailable");
        setLogs((l) => [...l, { time: Date.now() }]);
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 8000 },
    );
  };

  const reset = () => setLogs([]);

  return (
    <div className="rounded-lg border p-3 space-y-3">
      <p className="text-sm">
        Log your mulching sessions. Three GPS-timed check-ins will complete this
        mission.
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={checkIn}
          className="rounded bg-primary text-primary-foreground px-3 py-1 text-sm"
        >
          Check-in now
        </button>
        <button
          onClick={reset}
          className="rounded border px-3 py-1 text-sm hover:bg-muted"
        >
          Reset
        </button>
        <span className="text-xs text-muted-foreground">
          Progress: {Math.min(3, logs.length)} / 3
        </span>
      </div>
      {locError && <div className="text-xs text-red-600">{locError}</div>}
      <ul className="text-sm space-y-1">
        {logs.map((l, i) => (
          <li key={i} className="rounded border p-2">
            <span className="mr-2">#{i + 1}</span>
            <span className="mr-2">{new Date(l.time).toLocaleString()}</span>
            {typeof l.lat === "number" && typeof l.lon === "number" && (
              <span className="text-xs text-muted-foreground">
                ({l.lat.toFixed(5)}, {l.lon.toFixed(5)})
              </span>
            )}
          </li>
        ))}
      </ul>
      {logs.length >= 3 && (
        <div className="text-xs bg-green-100 text-green-800 rounded p-2">
          Mission complete — great job protecting soil moisture!
        </div>
      )}
    </div>
  );
}
