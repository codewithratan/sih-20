import { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ResultsCard from "@/components/ResultsCard";
import { Activity, Battery, Bell, Droplets, Wrench } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface SamplePoint {
  t: string; // HH:mm
  flow: number; // L/min
  eff: number; // %
  volt: number; // V
}

interface UsageLog { id: number; kWh: number; timestamp: number }

export default function Maintenance() {
  const [data, setData] = useState<SamplePoint[]>(() => seedData());
  const [smsResponse, setSmsResponse] = useState<string | null>(null);
  const [usage, setUsage] = useState<UsageLog[]>([]);
  const [addKWh, setAddKWh] = useState<string>("5");

  // live updates
  useEffect(() => {
    const id = setInterval(() => setData((d) => nextTick(d)), 1000);
    return () => clearInterval(id);
  }, []);

  const latest = data[data.length - 1];
  const status = useMemo(() => predictFailure(latest.eff, latest.volt), [latest]);

  const sendSms = () => {
    const payload = { status: "SMS sent", message: status, time: new Date().toISOString() };
    setSmsResponse(JSON.stringify(payload));
  };

  const logUsage = () => {
    const k = Number(addKWh);
    if (!k) return;
    setUsage((prev) => [
      ...prev,
      { id: prev.length + 1, kWh: k, timestamp: Date.now() },
    ]);
  };

  const totalKWh = useMemo(() => usage.reduce((s, u) => s + u.kWh, 0), [usage]);

  return (
    <div className="container py-8 space-y-6">
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Wrench className="h-5 w-5 text-primary" />
          </span>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold leading-tight">Smart Solar Pump Monitoring & Predictive Maintenance</h1>
            <p className="text-sm text-muted-foreground">Real-time metrics, rule-based alerts, mock SMS, and blockchain usage logs for DISCOM compliance.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 items-start">
        <Card>
          <CardHeader>
            <CardTitle>Real-Time Monitoring</CardTitle>
            <CardDescription>Simulated sensor data updating every second.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <Metric label="Flow (L/min)" value={latest.flow.toFixed(1)} icon={<Droplets className="h-4 w-4" />} />
              <Metric label="Efficiency (%)" value={latest.eff.toFixed(0)} icon={<Activity className="h-4 w-4" />} />
              <Metric label="Voltage (V)" value={latest.volt.toFixed(2)} icon={<Battery className="h-4 w-4" />} />
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                  <XAxis dataKey="t" hide tick={{ fontSize: 10 }} />
                  <YAxis hide domain={[0, 100]} />
                  <Tooltip contentStyle={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="eff" stroke="#f59e0b" strokeWidth={2} dot={false} name="Efficiency" />
                  <Line type="monotone" dataKey="flow" stroke="#10b981" strokeWidth={2} dot={false} name="Flow" yAxisId={0} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Predictive Maintenance</CardTitle>
            <CardDescription>Rule-based alerts; Prophet can be added post-MVP.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={`rounded-md border p-3 text-sm ${status === "Normal" ? "border-green-200 bg-green-50" : "border-amber-200 bg-amber-50"}`}>
              <div className="flex items-center gap-2 font-medium">
                <Bell className="h-4 w-4 text-amber-600" /> Status: {status}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">Thresholds: efficiency {"<"} 70% or voltage {"<"} 11.5V trigger alerts.</div>
            </div>
            <Button onClick={sendSms}>
              Send SMS Alert
            </Button>
            {smsResponse && (
              <div className="rounded-md border p-3 text-xs font-mono bg-muted/30">{smsResponse}</div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 items-start">
        <ResultsCard title="Blockchain Usage Logs" description="Simulated Mumbai testnet logs for demonstration.">
          <div className="flex items-end gap-3">
            <div className="grid gap-2">
              <Label>Add Usage (kWh)</Label>
              <Input value={addKWh} onChange={(e) => setAddKWh(e.target.value.replace(/[^\d.]/g, ""))} inputMode="decimal" className="max-w-[160px]" />
            </div>
            <Button onClick={logUsage}>Log Usage (Mock)</Button>
            <div className="ml-auto text-sm">Total: <span className="font-semibold">{totalKWh.toFixed(1)} kWh</span></div>
          </div>
          <div className="mt-3 space-y-2 text-sm">
            {usage.length === 0 ? (
              <div className="text-muted-foreground">No usage logs yet.</div>
            ) : (
              usage.map((u) => (
                <div key={u.id} className="rounded-md border p-3 flex items-center justify-between">
                  <div>Log #{u.id} • {u.kWh} kWh</div>
                  <div className="text-xs text-muted-foreground">{new Date(u.timestamp).toLocaleString()}</div>
                </div>
              ))
            )}
          </div>
        </ResultsCard>

        <Card>
          <CardHeader>
            <CardTitle>PM-KUSUM Subsidy</CardTitle>
            <CardDescription>Maintenance support eligibility (mock).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="rounded-md bg-accent p-3 text-muted-foreground">Eligible for ₹5,000 maintenance subsidy; apply at pmkusum.mnre.gov.in.</div>
            <a href="https://pmkusum.mnre.gov.in" target="_blank" rel="noreferrer" className="inline-block">
              <Button variant="outline">Open Official Portal</Button>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Metric({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-md border p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 flex items-center gap-2 text-xl font-semibold">
        {icon}
        {value}
      </div>
    </div>
  );
}

function seedData(): SamplePoint[] {
  const arr: SamplePoint[] = [];
  const now = new Date();
  for (let i = 59; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 1000);
    arr.push({
      t: d.toTimeString().slice(3, 8),
      flow: 9 + Math.random() * 3,
      eff: 75 + Math.random() * 10,
      volt: 11.2 + Math.random() * 1.4,
    });
  }
  return arr;
}

function nextTick(data: SamplePoint[]): SamplePoint[] {
  const d = new Date();
  const next: SamplePoint = {
    t: d.toTimeString().slice(3, 8),
    flow: clamp((data[data.length - 1]?.flow ?? 10) + (Math.random() - 0.5) * 0.4, 8, 12),
    eff: clamp((data[data.length - 1]?.eff ?? 80) + (Math.random() - 0.5) * 1.2, 60, 92),
    volt: clamp((data[data.length - 1]?.volt ?? 12) + (Math.random() - 0.5) * 0.08, 10.8, 13.2),
  };
  return [...data.slice(1), next];
}

function clamp(n: number, min: number, max: number) { return Math.max(min, Math.min(max, n)); }

function predictFailure(efficiency: number, voltage: number): string {
  if (efficiency < 70 || voltage < 11.5) return "Warning: Clean panels or check battery";
  return "Normal";
}
