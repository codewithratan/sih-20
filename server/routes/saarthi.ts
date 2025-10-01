import type { RequestHandler } from "express";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string | Array<{ type: string; text?: string; image_url?: { url: string } }>;
}

export const handleSaarthiChat: RequestHandler = async (req, res) => {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      res.status(500).json({ error: "Missing OPENAI_API_KEY" });
      return;
    }

    const { messages, imageDataUrl } = req.body as {
      messages: { role: string; content: string }[];
      imageDataUrl?: string | null;
    };

    if (!Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: "Invalid messages payload" });
      return;
    }

    // Prepare messages. If an image is provided, attach it to the last user message
    const oaiMessages: ChatMessage[] = messages.map((m) => ({
      role: m.role as ChatMessage["role"],
      content: m.content,
    }));

    if (imageDataUrl) {
      const lastIdx = oaiMessages.length - 1;
      const last = oaiMessages[lastIdx];
      if (last && last.role === "user") {
        const textPart = typeof last.content === "string" ? [{ type: "text", text: last.content }] : (last.content as any[]);
        oaiMessages[lastIdx] = {
          role: "user",
          content: [
            ...textPart,
            { type: "image_url", image_url: { url: imageDataUrl } },
          ],
        };
      }
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: oaiMessages,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      res.status(response.status).json({ error: "Upstream error", details: text });
      return;
    }

    const data = (await response.json()) as any;
    const reply: string = data?.choices?.[0]?.message?.content ?? "";
    res.status(200).json({ reply });
  } catch (err: any) {
    res.status(500).json({ error: "Internal server error", details: err?.message || String(err) });
  }
};
