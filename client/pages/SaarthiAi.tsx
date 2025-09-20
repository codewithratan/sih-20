import VoiceChatDemo from "@/components/ui/ia-siri-chat";
import { PromptInputBox } from "@/components/ui/ai-prompt-box";

export default function SaarthiAi() {
  return (
    <div className="container py-8">
      <div className="max-w-5xl mx-auto">
        <VoiceChatDemo />

        <section className="max-w-3xl mx-auto mt-12">
          <PromptInputBox onSend={(message, files) => console.log(message, files)} />
        </section>
      </div>
    </div>
  );
}
