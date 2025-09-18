import { useEffect, useRef, useState } from "react";
import { Mic, Square } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  onResult: (text: string) => void;
  lang?: string;
  className?: string;
}

export default function VoiceInputButton({ onResult, lang = "en-IN", className }: Props) {
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [active, setActive] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const SR: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      setSupported(false);
      return;
    }
    const rec: SpeechRecognition = new SR();
    rec.lang = lang;
    rec.continuous = false;
    rec.interimResults = false;
    rec.onresult = (e: SpeechRecognitionEvent) => {
      const transcript = Array.from(e.results).map(r => r[0].transcript).join(" ").trim();
      if (transcript) onResult(transcript);
    };
    rec.onend = () => setActive(false);
    recognitionRef.current = rec;
  }, [lang, onResult]);

  if (!supported) {
    return (
      <Button type="button" variant="outline" size="sm" className={className} disabled>
        <Mic className="mr-2 h-4 w-4" /> Voice
      </Button>
    );
  }

  const toggle = () => {
    const rec = recognitionRef.current;
    if (!rec) return;
    if (active) {
      rec.stop();
      setActive(false);
    } else {
      try {
        rec.start();
        setActive(true);
      } catch {
        // Ignore multiple start calls
      }
    }
  };

  return (
    <Button type="button" variant={active ? "destructive" : "secondary"} size="sm" onClick={toggle} className={className}>
      {active ? <Square className="mr-2 h-4 w-4" /> : <Mic className="mr-2 h-4 w-4" />} {active ? "Stop" : "Voice"}
    </Button>
  );
}
