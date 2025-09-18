import { forwardRef, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface Props {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const ResultsCard = forwardRef<HTMLDivElement, Props>(({ title, description, children }, _ref) => {
  const reportRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    const input = reportRef.current;
    if (!input) return;
    const canvas = await html2canvas(input, { scale: 2, backgroundColor: "#ffffff" });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
    const imgWidth = canvas.width * ratio;
    const imgHeight = canvas.height * ratio;
    const x = (pageWidth - imgWidth) / 2;
    const y = 24;
    pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
    pdf.save("pm-kusum-eligibility-report.pdf");
  };

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <div>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        <Button onClick={downloadPDF}>Download PDF</Button>
      </CardHeader>
      <CardContent>
        <div ref={reportRef} className="space-y-4">
          {children}
        </div>
      </CardContent>
    </Card>
  );
});

export default ResultsCard;
