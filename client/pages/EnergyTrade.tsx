import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ResultsCard from "@/components/ResultsCard";
import { CheckCircle2, QrCode, Wallet, Zap } from "lucide-react";

interface User {
  role: "farmer" | "buyer";
  name: string;
  phone: string;
  demandKWh?: number; // for buyers
}

interface Listing {
  id: number;
  farmer: string;
  kWh: number;
  basePrice: number; // ₹/kWh
  aiPrice: number; // suggested ₹/kWh
}

interface Trade {
  id: number;
  listingId: number;
  buyer: string;
  kWh: number;
  totalINR: number;
  paid: boolean;
  timestamp: number;
}

export default function EnergyTrade() {
  const [role, setRole] = useState<User["role"]>("farmer");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [demand, setDemand] = useState<string>("");

  const [registered, setRegistered] = useState<User | null>(null);

  const [solarOutput, setSolarOutput] = useState<string>("100"); // kWh/day mock
  const [listKWh, setListKWh] = useState<string>("10");
  const [basePrice, setBasePrice] = useState<string>("5.0");

  const aiPrice = useMemo(() => {
    const output = Number(solarOutput) || 100;
    const dem = Number(demand) || 100;
    // Simple heuristic: more output => lower price, more demand => higher price
    const price = 5 - 0.005 * (output - 100) + 0.003 * (dem - 100);
    return Number(Math.max(3.5, Math.min(6.5, price)).toFixed(2));
  }, [solarOutput, demand]);

  const [listings, setListings] = useState<Listing[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);

  const register = () => {
    if (name.trim().length < 2 || !/^\d{10}$/.test(phone)) return;
    const u: User = {
      role,
      name,
      phone,
      demandKWh: role === "buyer" ? Number(demand) || 50 : undefined,
    };
    setRegistered(u);
  };

  const createListing = () => {
    let user = registered;
    if (!user) {
      // Auto-register as farmer if valid details provided
      if (name.trim().length >= 2 && /^\d{10}$/.test(phone)) {
        user = { role: "farmer", name, phone };
        setRegistered(user);
      } else {
        alert("Please enter a valid name and 10-digit phone, then try again.");
        return;
      }
    }
    if (user.role !== "farmer") {
      alert("Switch role to Farmer to create a listing.");
      return;
    }
    const k = Number(listKWh);
    const p = Number(basePrice);
    if (!k || !p) {
      alert("Enter valid kWh and base price.");
      return;
    }
    const id = listings.length + 1;
    setListings((prev) => [
      ...prev,
      { id, farmer: user!.name, kWh: k, basePrice: p, aiPrice },
    ]);
  };

  const buyListing = (listing: Listing) => {
    if (!registered || registered.role !== "buyer") return;
    const totalINR = Math.round(listing.kWh * listing.aiPrice);
    const tradeId = trades.length + 1;
    // Mock UPI response
    const mock = { status: "success", amount: totalINR } as const;
    const paid = mock.status === "success";
    setTrades((prev) => [
      ...prev,
      {
        id: tradeId,
        listingId: listing.id,
        buyer: registered.name,
        kWh: listing.kWh,
        totalINR,
        paid,
        timestamp: Date.now(),
      },
    ]);
  };

  const discomTotal = useMemo(
    () => trades.reduce((s, t) => s + t.totalINR, 0),
    [trades],
  );

  return (
    <div className="container py-8 space-y-6">
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Zap className="h-5 w-5 text-primary" />
          </span>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold leading-tight">
              Blockchain Energy Trade (MVP)
            </h1>
            <p className="text-sm text-muted-foreground">
              List surplus solar energy and let buyers purchase transparently.
              Mumbai testnet-ready (simulated here).
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 items-start">
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>
              Farmer QR is simulated. Enter details to continue.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 text-sm">
              <Button
                variant={role === "farmer" ? "default" : "outline"}
                size="sm"
                onClick={() => setRole("farmer")}
              >
                Farmer
              </Button>
              <Button
                variant={role === "buyer" ? "default" : "outline"}
                size="sm"
                onClick={() => setRole("buyer")}
              >
                Buyer
              </Button>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={
                  role === "farmer" ? "e.g., Sita Devi" : "e.g., Village Buyer"
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone (10 digits)</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value.replace(/[^\d]/g, "").slice(0, 10))
                }
                placeholder="9xxxxxxxxx"
                inputMode="numeric"
              />
            </div>
            {role === "buyer" && (
              <div className="grid gap-2">
                <Label>Demand (kWh/day)</Label>
                <Input
                  value={demand}
                  onChange={(e) =>
                    setDemand(e.target.value.replace(/[^\d.]/g, ""))
                  }
                  placeholder="50"
                  inputMode="decimal"
                />
              </div>
            )}
            <div className="flex items-center gap-3">
              <Button onClick={register}>
                <CheckCircle2 className="mr-2 h-4 w-4" />{" "}
                {registered ? "Update" : "Register"}
              </Button>
              <span className="text-xs text-muted-foreground">
                QR scan simulated <QrCode className="inline h-4 w-4" />
              </span>
            </div>
            {registered && (
              <div className="rounded-md border p-3 text-xs">
                Registered as <b>{registered.role}</b>: {registered.name} (
                {registered.phone})
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Energy Listing</CardTitle>
            <CardDescription>
              Farmers can list surplus energy and get AI-suggested price.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label>Mock Solar Output (kWh/day)</Label>
              <Input
                value={solarOutput}
                onChange={(e) =>
                  setSolarOutput(e.target.value.replace(/[^\d.]/g, ""))
                }
                inputMode="decimal"
              />
            </div>
            <div className="grid gap-2">
              <Label>List kWh</Label>
              <Input
                value={listKWh}
                onChange={(e) =>
                  setListKWh(e.target.value.replace(/[^\d.]/g, ""))
                }
                inputMode="decimal"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Base Price (₹/kWh)</Label>
                <Input
                  value={basePrice}
                  onChange={(e) =>
                    setBasePrice(e.target.value.replace(/[^\d.]/g, ""))
                  }
                  inputMode="decimal"
                />
              </div>
              <div className="grid gap-2">
                <Label>AI Suggested (₹/kWh)</Label>
                <Input value={String(aiPrice)} readOnly />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={createListing}>
                Create Listing
              </Button>
              <span className="text-xs text-muted-foreground">
                AI uses simple supply/demand heuristic for MVP.
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 items-start">
        <Card>
          <CardHeader>
            <CardTitle>Marketplace</CardTitle>
            <CardDescription>
              Buyers can purchase listed energy via mock UPI payment.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {listings.length === 0 ? (
              <div className="text-sm text-muted-foreground">
                No listings yet.
              </div>
            ) : (
              <div className="space-y-2">
                {listings.map((l) => (
                  <div
                    key={l.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-md border p-3"
                  >
                    <div className="text-sm">
                      <div className="font-medium">
                        {l.kWh} kWh from {l.farmer}
                      </div>
                      <div className="text-muted-foreground">
                        Base ₹{l.basePrice}/kWh • AI ₹{l.aiPrice}/kWh
                      </div>
                    </div>
                    <Button
                      onClick={() => buyListing(l)}
                      disabled={!registered || registered.role !== "buyer"}
                    >
                      <Wallet className="mr-2 h-4 w-4" /> UPI Pay ₹
                      {Math.round(l.kWh * l.aiPrice)}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <ResultsCard
          title="DISCOM Compliance Report"
          description="Simulated trade data for audit. Download as PDF for demo."
        >
          {trades.length === 0 ? (
            <div className="text-sm text-muted-foreground">No trades yet.</div>
          ) : (
            <div className="space-y-2 text-sm">
              {trades.map((t) => (
                <div key={t.id} className="rounded-md border p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="font-medium">Trade #{t.id}</div>
                      <div className="text-muted-foreground">
                        Listing {t.listingId} • {t.kWh} kWh • ₹{t.totalINR}
                      </div>
                    </div>
                    <div className="text-xs font-medium">
                      {new Date(t.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <div className="mt-1 text-xs">Buyer: {t.buyer}</div>
                  <div className="text-xs">
                    Status: {t.paid ? "Paid" : "Unpaid"}
                  </div>
                </div>
              ))}
              <div className="rounded-md bg-accent p-3 text-xs text-muted-foreground">
                Total amount: ₹{discomTotal.toLocaleString("en-IN")}
              </div>
            </div>
          )}
        </ResultsCard>
      </div>
    </div>
  );
}
