import { SplineSceneBasic } from "@/components/ui/spline-demo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container py-8 space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Welcome to Solar Saarthi</h1>
        <p className="text-muted-foreground max-w-2xl">
          Explore our suite: Eligibility checker, Energy Trade, and Maintenance Dashboard.
        </p>
      </div>
      <SplineSceneBasic />
      <div className="flex flex-wrap gap-3">
        <Link to="/"><Button>Eligibility & Subsidy Estimate</Button></Link>
        <Link to="/energy-trade"><Button variant="outline">Energy Trade</Button></Link>
        <Link to="/maintenance"><Button variant="secondary">Maintenance</Button></Link>
      </div>
    </div>
  );
}
