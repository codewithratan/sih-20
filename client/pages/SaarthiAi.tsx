import { useState, useRef } from "react";
import VoiceChatDemo from "@/components/ui/ia-siri-chat";
import { PromptInputBox } from "@/components/ui/ai-prompt-box";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function SaarthiAi() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const listEndRef = useRef<HTMLDivElement>(null);

  const scrollToEnd = () => listEndRef.current?.scrollIntoView({ behavior: "smooth" });

  const fileToDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleSend = async (message: string, files?: File[]) => {
    const userMsg: ChatMessage = { role: "user", content: message };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    scrollToEnd();

    try {
      const image = files && files[0] ? await fileToDataUrl(files[0]) : null;
      const res = await fetch("/api/saarthi/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          imageDataUrl: image,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Request failed");
      }

      const data: { reply: string } = await res.json();
      const assistantMsg: ChatMessage = {
        role: "assistant",
        content: data.reply,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I couldn't process that request." },
      ]);
      console.error(err);
    } finally {
      setIsLoading(false);
      setTimeout(scrollToEnd, 50);
    }
  };

  return (
    <div className="container py-8">
      <div className="max-w-5xl mx-auto">
        <VoiceChatDemo />

        <section className="max-w-3xl mx-auto mt-12">
          <div className="space-y-4 max-h-[50vh] overflow-y-auto border rounded-xl p-4 border-border/60 bg-background/40">
            {messages.map((m, idx) => (
              <div key={idx} className={m.role === "user" ? "text-right" : "text-left"}>
                <div
                  className={
                    m.role === "user"
                      ? "inline-block rounded-2xl px-4 py-2 bg-primary text-primary-foreground"
                      : "inline-block rounded-2xl px-4 py-2 bg-muted text-foreground"
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}
            <div ref={listEndRef} />
          </div>

          <div className="mt-4">
            <PromptInputBox onSend={handleSend} isLoading={isLoading} />
          </div>
        </section>
      </div>
    </div>
  );
}
