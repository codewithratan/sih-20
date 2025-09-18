import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import EnergyTrade from "./pages/EnergyTrade";
import Maintenance from "./pages/Maintenance";
import Home from "./pages/Home";

const queryClient = new QueryClient();

const Header = () => (
  <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
    <div className="container flex h-16 items-center justify-between">
      <Link to="/" className="flex items-center gap-2 font-extrabold text-lg">
        <span className="inline-block h-7 w-7 rounded-md bg-primary" />
        <span>Solar Saarthi</span>
      </Link>
      <nav className="flex items-center gap-4 text-sm font-medium">
        <Link to="/home" className="hover:underline">Home</Link>
        <Link to="/" className="hover:underline">
          Eligibility & Subsidy Estimate
        </Link>
        <Link to="/energy-trade" className="hover:underline">
          Energy Trade
        </Link>
        <Link to="/maintenance" className="hover:underline">
          Maintenance
        </Link>
        <Link to="/dashboard" className="hover:underline">
          Dashboard
        </Link>
      </nav>
    </div>
  </header>
);

const Footer = () => (
  <footer className="border-t bg-muted/20">
    <div className="container py-6 text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-2">
      <p>Built for SIH 2025 • PM-KUSUM</p>
      <p>Demo only. Not an official MNRE tool.</p>
    </div>
  </footer>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Header />
        <main className="min-h-[calc(100dvh-8rem)] bg-gradient-to-b from-amber-50 to-transparent">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/energy-trade" element={<EnergyTrade />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/maintaince" element={<Maintenance />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
