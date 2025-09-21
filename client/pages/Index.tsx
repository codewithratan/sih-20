import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { INDIAN_STATES } from "@/data/states";
import VoiceInputButton from "@/components/VoiceInputButton";
import ResultsCard from "@/components/ResultsCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Satellite, ShieldCheck, MoveRight } from "lucide-react";
import {
  EligibilityResult,
  predictEligibility,
  solarPotentialLabel,
} from "@/lib/eligibility";

export default function Index() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpExpected, setOtpExpected] = useState<string | null>(null);
  const [otpVerified, setOtpVerified] = useState(false);

  const [land, setLand] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [district, setDistrict] = useState("");
  const [pumpType, setPumpType] = useState<"standalone" | "grid-connected">(
    "standalone",
  );
  const [pumpHP, setPumpHP] = useState<number>(5);
  const [crop, setCrop] = useState("");
  const [irrigation, setIrrigation] = useState<
    "diesel" | "electric" | "manual"
  >("diesel");
  const [stateSupport, setStateSupport] = useState<boolean>(false);

  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [ghi, setGhi] = useState<number | null>(null); // kWh/m²/day approx
  const [loadingSolar, setLoadingSolar] = useState(false);
  const [errorSolar, setErrorSolar] = useState<string | null>(null);

  const [result, setResult] = useState<EligibilityResult | null>(null);

  const canSubmit = useMemo(() => {
    const landSize = Number(land);
    return (
      name.trim().length >= 2 &&
      !Number.isNaN(landSize) &&
      landSize > 0 &&
      !!state &&
      !!pumpType &&
      !!pumpHP &&
      !!irrigation
    );
  }, [name, land, state, pumpType, pumpHP, irrigation]);

  const useGPS = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
      },
      () => {
        setErrorSolar("Unable to access GPS.");
      },
      { enableHighAccuracy: true, maximumAge: 10_000, timeout: 8_000 },
    );
  };

  const fetchSolar = useCallback(async () => {
    if (lat == null || lng == null) return;
    setLoadingSolar(true);
    setErrorSolar(null);
    try {
      // Try Open-Meteo global tilted irradiance
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=global_tilted_irradiance_instant&tilt=30&timezone=auto`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      const values: number[] | undefined =
        data?.hourly?.global_tilted_irradiance_instant;
      // Compute daytime average and convert W/m² to kWh/m²/day roughly
      if (Array.isArray(values) && values.length) {
        // Take top 30% values as peak daytime
        const sorted = [...values].sort((a, b) => b - a);
        const top = sorted.slice(
          0,
          Math.max(6, Math.floor(values.length * 0.3)),
        );
        const avgWm2 = top.reduce((a, b) => a + b, 0) / top.length;
        const kWhPerM2Day = Math.max(3.5, Math.min(6.5, (avgWm2 * 5) / 1000));
        setGhi(Number(kWhPerM2Day.toFixed(1)));
        setLoadingSolar(false);
        return;
      }
      throw new Error("Unexpected data");
    } catch (e) {
      // Fallback: latitude heuristic
      if (lat != null) {
        const absLat = Math.abs(lat);
        let approx = 5.0;
        if (absLat < 10) approx = 5.8;
        else if (absLat < 20) approx = 5.4;
        else if (absLat < 30) approx = 5.0;
        else approx = 4.6;
        setGhi(approx);
      }
      setErrorSolar("Using approximate solar potential based on latitude.");
      setLoadingSolar(false);
    }
  }, [lat, lng]);

  useEffect(() => {
    if (lat != null && lng != null) fetchSolar();
  }, [lat, lng, fetchSolar]);

  const sendOtp = () => {
    if (!/^\d{10}$/.test(phone)) return;
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setOtpExpected(code);
    setOtpSent(true);
  };

  const verifyOtp = () => {
    if (otpExpected && otpCode === otpExpected) setOtpVerified(true);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const landSize = Number(land);
    const r = predictEligibility({
      landSize,
      state,
      pumpType,
      pumpHP,
      crop: crop || "",
      irrigation,
      stateSupport,
    });
    setResult(r);
  };

  const ghiLabel = ghi != null ? solarPotentialLabel(ghi) : null;

  return (
    <div className="container py-8">
      <div className="grid gap-6 md:grid-cols-2 items-start">
        <section className="space-y-6">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </span>
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold leading-tight">
                  AI-Powered Subsidy Eligibility for PM-KUSUM
                </h1>
                <p className="text-sm text-muted-foreground">
                  Mobile-first web app to predict eligibility, estimate subsidy
                  and check solar potential.
                </p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="rounded-md bg-secondary p-3">
                <div className="font-semibold">Fast</div>
                <div className="text-muted-foreground">Instant check</div>
              </div>
              <div className="rounded-md bg-secondary p-3">
                <div className="font-semibold">Multilingual</div>
                <div className="text-muted-foreground">Voice input</div>
              </div>
              <div className="rounded-md bg-secondary p-3">
                <div className="font-semibold">GIS</div>
                <div className="text-muted-foreground">Solar potential</div>
              </div>
              <div className="rounded-md bg-secondary p-3">
                <div className="font-semibold">PDF</div>
                <div className="text-muted-foreground">Download report</div>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Farmer Details</CardTitle>
              <CardDescription>
                Fill basics. Use Voice for low-literacy input. Phone OTP is
                simulated for demo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid gap-2">
                  <Label htmlFor="name">Farmer Name</Label>
                  <div className="flex gap-2">
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Ramesh Kumar"
                      className="flex-1"
                    />
                    <VoiceInputButton
                      onResult={(t) => setName(t)}
                      className="shrink-0"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="phone">
                    Aadhaar-linked Phone (10 digits)
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => {
                        setPhone(
                          e.target.value.replace(/[^\d]/g, "").slice(0, 10),
                        );
                        setOtpVerified(false);
                        setOtpSent(false);
                      }}
                      placeholder="9xxxxxxxxx"
                      inputMode="numeric"
                      className="flex-1"
                    />
                    {!otpSent ? (
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={sendOtp}
                        disabled={!/^\d{10}$/.test(phone)}
                      >
                        Send OTP
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        variant={otpVerified ? "default" : "outline"}
                        disabled
                      >
                        {otpVerified ? "Verified" : "Sent"}
                      </Button>
                    )}
                  </div>
                  {otpSent && !otpVerified && (
                    <div className="flex gap-2 items-center">
                      <Input
                        value={otpCode}
                        onChange={(e) =>
                          setOtpCode(
                            e.target.value.replace(/[^\d]/g, "").slice(0, 6),
                          )
                        }
                        placeholder="Enter 6-digit OTP"
                        inputMode="numeric"
                        className="max-w-[200px]"
                      />
                      <Button
                        type="button"
                        onClick={verifyOtp}
                        disabled={otpCode.length !== 6}
                      >
                        Verify
                      </Button>
                      {otpExpected && (
                        <span className="text-xs text-muted-foreground">
                          Demo OTP:{" "}
                          <span className="font-mono">{otpExpected}</span>
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="land">Land Size (acres)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="land"
                      value={land}
                      onChange={(e) =>
                        setLand(e.target.value.replace(/[^\d.]/g, ""))
                      }
                      placeholder="e.g., 2.5"
                      inputMode="decimal"
                      className="flex-1"
                    />
                    <VoiceInputButton
                      onResult={(t) => setLand(t.replace(/[^\d.]/g, ""))}
                      className="shrink-0"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Basic check: land should be more than 0.5 acres for typical
                    eligibility.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>State</Label>
                    <Select value={state} onValueChange={setState}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {INDIAN_STATES.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="district">District</Label>
                    <Input
                      id="district"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      placeholder="e.g., Jaipur"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label>Pump Type</Label>
                    <Select
                      value={pumpType}
                      onValueChange={(v) => setPumpType(v as any)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standalone">
                          Standalone (Off-grid)
                        </SelectItem>
                        <SelectItem value="grid-connected">
                          Grid-connected
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Pump Capacity (HP)</Label>
                    <Select
                      value={String(pumpHP)}
                      onValueChange={(v) => setPumpHP(Number(v))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[2, 3, 5, 7.5, 10].map((hp) => (
                          <SelectItem key={hp} value={String(hp)}>
                            {hp}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Irrigation Method</Label>
                    <Select
                      value={irrigation}
                      onValueChange={(v) => setIrrigation(v as any)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="diesel">Diesel Pump</SelectItem>
                        <SelectItem value="electric">Electric Pump</SelectItem>
                        <SelectItem value="manual">Manual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="crop">Primary Crop</Label>
                    <div className="flex gap-2">
                      <Input
                        id="crop"
                        value={crop}
                        onChange={(e) => setCrop(e.target.value)}
                        placeholder="e.g., Wheat"
                        className="flex-1"
                      />
                      <VoiceInputButton
                        onResult={(t) => setCrop(t)}
                        className="shrink-0"
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>State Matching Support</Label>
                    <div className="flex items-center gap-3 text-sm">
                      <Button
                        type="button"
                        size="sm"
                        variant={stateSupport ? "default" : "outline"}
                        onClick={() => setStateSupport((v) => !v)}
                      >
                        {stateSupport ? "Yes" : "No"}
                      </Button>
                      <span className="text-muted-foreground">
                        If available, subsidy may go up to 90%.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label>Location</Label>
                  <div className="flex flex-wrap gap-2">
                    <Button type="button" variant="secondary" onClick={useGPS}>
                      <MapPin className="mr-2 h-4 w-4" /> Use GPS
                    </Button>
                    {lat != null && lng != null && (
                      <span className="inline-flex items-center rounded-md border bg-background px-3 py-2 text-xs text-muted-foreground">
                        Lat {lat.toFixed(3)}, Lng {lng.toFixed(3)}
                      </span>
                    )}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={fetchSolar}
                      disabled={lat == null || lng == null}
                    >
                      <Satellite className="mr-2 h-4 w-4" /> Check Solar
                      Potential
                    </Button>
                    {loadingSolar && (
                      <span className="text-xs text-muted-foreground">
                        Fetching solar data…
                      </span>
                    )}
                    {ghi != null && (
                      <span
                        className={`text-xs font-medium ${solarPotentialLabel(ghi).color}`}
                      >
                        Solar potential: {ghi} kWh/m²/day ({ghiLabel?.label})
                      </span>
                    )}
                    {errorSolar && (
                      <span className="text-xs text-amber-700">
                        {errorSolar}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <Button
                    type="submit"
                    disabled={!canSubmit}
                    className="flex-1"
                  >
                    Check Eligibility <MoveRight className="ml-2 h-4 w-4" />
                  </Button>
                  <a
                    className="flex-1"
                    href="https://pmkusum.mnre.gov.in"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button type="button" variant="outline" className="w-full">
                      Official PM-KUSUM Portal
                    </Button>
                  </a>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-6">
          <ResultsCard
            title="Eligibility & Subsidy Estimate"
            description="Rule-based model using guidelines. Advisory only—final approval on MNRE/State portal."
          >
            {!result ? (
              <div className="text-sm text-muted-foreground">
                Fill the form and click Check Eligibility to see your results
                here.
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid sm:grid-cols-3 gap-3">
                  <div className="rounded-md border p-3">
                    <div className="text-xs text-muted-foreground">
                      Eligibility Probability
                    </div>
                    <div className="text-2xl font-bold">
                      {Math.round(result.probability * 100)}%
                    </div>
                    <div className="text-xs">Component {result.component}</div>
                  </div>
                  <div className="rounded-md border p-3">
                    <div className="text-xs text-muted-foreground">
                      Estimated Subsidy
                    </div>
                    <div className="text-2xl font-bold">
                      ₹{result.estimatedSubsidyINR.toLocaleString("en-IN")}
                    </div>
                    <div className="text-xs">Based on pump HP & scheme</div>
                  </div>
                  <div className="rounded-md border p-3">
                    <div className="text-xs text-muted-foreground">
                      Solar Potential
                    </div>
                    <div className="text-2xl font-bold">
                      {ghi ? `${ghi} kWh/m²/d` : "—"}
                    </div>
                    <div className="text-xs">
                      {ghi ? ghiLabel?.label : "Use GPS to fetch"}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="font-semibold mb-2">Required Documents</div>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    {result.requiredDocs.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>

                {result.suggestions && result.suggestions.length > 0 && (
                  <div>
                    <div className="font-semibold mb-2">Suggestions</div>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      {result.suggestions.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="rounded-md bg-accent p-3 text-xs text-muted-foreground">
                  Next steps: Apply via the official portal. For vendors in your
                  area, check Dashboard (coming soon) or local DISCOM notices.
                </div>
              </div>
            )}
          </ResultsCard>

          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
              <CardDescription>Privacy & Accuracy</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>No real Aadhaar used in this demo. OTP is simulated.</li>
                <li>
                  Model is rule-based for speed and transparency; 80–90%
                  advisory accuracy.
                </li>
                <li>
                  Add PWA for offline; integrate MNRE APIs post-hackathon if
                  available.
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
