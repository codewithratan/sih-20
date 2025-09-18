import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="container mx-auto py-10">
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <h1 className="text-3xl font-bold">Dashboard (Coming Soon)</h1>
        <p className="text-muted-foreground">
          This page will show saved applications, vendor contacts, and progress tracking. Ask to fill it next.
        </p>
        <Link to="/" className="text-primary underline">Back to Home</Link>
      </div>
    </div>
  );
}
