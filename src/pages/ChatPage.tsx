import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useOnboardingStore } from "@/lib/onboarding-store";
import {
  ArrowLeft,
  MessageCircle,
  Send,
  Bot,
  User,
  Sparkles,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestedQuestions = [
  "What documents do I need to register in Zurich?",
  "How do I find a good pediatrician?",
  "What's the best neighborhood for families?",
  "How does the Swiss tax system work?",
  "Where can I take German language courses?",
  "What are the best international schools?",
];

// Mock AI responses for demo — will be replaced with real AI
const mockResponses: Record<string, string> = {
  default: `Great question! As your NewBe AI assistant, I can help you navigate life in your new city. Here are some things I can help with:

- **Housing**: Finding apartments, understanding lease terms, neighborhood recommendations
- **Insurance**: Health insurance comparison, mandatory vs optional coverage
- **Education**: School enrollment, international vs public schools
- **Finance**: Banking setup, tax optimization, retirement planning
- **Community**: Local events, sports clubs, networking opportunities

What would you like to know more about?`,
  documents: `## Documents for Zurich Registration

When registering at the **Einwohnerkontrolle** (residents' registration office), you'll need:

1. **Valid passport** or ID card
2. **Residence permit** (or confirmation from migration office)
3. **Rental contract** (Mietvertrag)
4. **Marriage certificate** (if applicable, apostilled)
5. **Birth certificates** for children (apostilled)
6. **Passport photos** (2 recent)

📅 **Deadline**: Register within **14 days** of moving in.

💡 **Tip**: Book an appointment online at [stadt-zuerich.ch](https://www.stadt-zuerich.ch) to avoid long waits.`,
  pediatrician: `## Finding a Pediatrician in Zurich

Here are the best ways to find a good **Kinderarzt** (pediatrician):

1. **Doctolib.ch** — Book appointments online, read reviews
2. **Medgate** — Telehealth for quick consultations
3. **Your health insurer's directory** — Lists in-network doctors
4. **Ask neighbors/parent groups** — Facebook "Expat Parents Zurich"

### Top-rated Pediatric Practices:
- **Kinderarztpraxis Seefeld** (Kreis 8)
- **Kinderpraxis Wiedikon** (Kreis 3)
- **Kinderspital Zürich** (Children's Hospital — for emergencies)

💡 **Tip**: Many pediatricians have long waitlists. Register early, even before you arrive!`,
  neighborhood: `## Best Neighborhoods for Families in Zurich

### 🏆 Top Picks:
| District | Why Families Love It | Rent (3.5 rooms) |
|----------|---------------------|-----------------|
| **Kreis 2 (Wollishofen)** | Lake access, parks, good schools | CHF 1'800–3'200 |
| **Kreis 6 (Oberstrass)** | Near university, green, quiet | CHF 1'700–2'900 |
| **Kreis 7 (Witikon)** | Spacious, ETH campus, nature | CHF 2'000–3'500 |
| **Kreis 10 (Höngg)** | Village feel, affordable, green | CHF 1'400–2'400 |

💡 **Key factors**: Proximity to schools, parks, public transport, and Kita availability.`,
  tax: `## Swiss Tax System — Quick Guide

Switzerland has **3 levels** of taxation:

### 1. Federal Tax (Bundessteuer)
- Progressive: 0–11.5%
- Same across all cantons

### 2. Cantonal Tax (Zurich)
- Progressive: ~5–13%
- Varies by canton

### 3. Municipal Tax (Gemeinde)
- Percentage of cantonal tax
- Zurich city: ~119% multiplier

### 💰 Key Deductions:
- Commuting costs (up to CHF 3'000)
- Work meals (CHF 3'200/year)
- **Pillar 3a** (CHF 7'056/year — most impactful!)
- Childcare costs
- Professional development

📅 **Filing deadline**: March 31 (extensions available online)`,
  german: `## German Language Courses in Zurich

### Popular Schools:
1. **Migros Klubschule** — Most popular, affordable, all levels
   - Cost: CHF 500–800 per semester
   - Locations across Zurich

2. **VOX Sprachschule** — Intensive courses, small groups
   - Cost: CHF 600–1'200 per course

3. **Goethe-Institut** — Premium, internationally recognized
   - Cost: CHF 800–1'500 per course

4. **ZHAW Language Center** — Academic-oriented
   - Cost: CHF 400–600 per semester

### Free Options:
- **City of Zurich integration courses** — For newcomers, subsidized
- **Tandem partners** — Find on tandempartners.org
- **Meetup German conversation groups** — Practice for free

💡 **Tip**: Swiss German (Schwiizerdütsch) is very different from High German. Learn High German first, then pick up Swiss German naturally.`,
  schools: `## International Schools Near Zurich

### Top Picks:

1. **Zurich International School (ZIS)**
   - 📍 Wädenswil & Adliswil
   - 🎓 IB Curriculum, Ages 3–18
   - 💰 CHF 25'000–40'000/year

2. **Inter-Community School (ICS)**
   - 📍 Zurich-Wollishofen
   - 🎓 IB Curriculum, Ages 3–18
   - 💰 CHF 28'000–38'000/year

3. **Swiss International School (SIS)**
   - 📍 Multiple locations
   - 🎓 Bilingual EN/DE, Ages 4–18
   - 💰 CHF 22'000–35'000/year

⚠️ **Important**: Apply **6–12 months** in advance. Waitlists are common!`,
};

function getResponse(userMsg: string): string {
  const lower = userMsg.toLowerCase();
  if (lower.includes("document") || lower.includes("register")) return mockResponses.documents;
  if (lower.includes("pediatrician") || lower.includes("doctor") || lower.includes("kinderarzt")) return mockResponses.pediatrician;
  if (lower.includes("neighborhood") || lower.includes("family") || lower.includes("district")) return mockResponses.neighborhood;
  if (lower.includes("tax")) return mockResponses.tax;
  if (lower.includes("german") || lower.includes("language")) return mockResponses.german;
  if (lower.includes("school") || lower.includes("international")) return mockResponses.schools;
  return mockResponses.default;
}

export default function ChatPage() {
  const navigate = useNavigate();
  const { profile } = useOnboardingStore();
  const city = profile.city || "Zurich";
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const send = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI typing delay
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 1200));
    const response = getResponse(text);
    setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    setIsTyping(false);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <nav className="shrink-0 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}><ArrowLeft className="h-5 w-5" /></Button>
            <span className="font-display text-2xl font-bold text-primary cursor-pointer" onClick={() => navigate("/")}>NewBe</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" /> AI Assistant
          </div>
        </div>
      </nav>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="container mx-auto max-w-3xl px-4 py-6 space-y-4">
          {messages.length === 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12 space-y-6">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Bot className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-2">Hi! I'm your NewBe Assistant</h2>
                <p className="text-muted-foreground">Ask me anything about settling into {city}. I can help with housing, insurance, schools, bureaucracy, and more.</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-2 max-w-lg mx-auto">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="text-left p-3 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-[var(--shadow-card)] transition-all text-sm text-foreground"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
              )}
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-card border border-border shadow-[var(--shadow-card)] text-foreground rounded-bl-md"
              }`}>
                {msg.role === "assistant" ? (
                  <div className="prose prose-sm max-w-none [&_h2]:font-display [&_h2]:text-base [&_h2]:font-semibold [&_h2]:mt-2 [&_h2]:mb-2 [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:mt-3 [&_h3]:mb-1 [&_p]:my-1.5 [&_ul]:my-1 [&_li]:my-0.5 [&_table]:text-xs [&_strong]:text-foreground [&_code]:text-xs [&_code]:bg-muted [&_code]:px-1 [&_code]:rounded">
                    {msg.content.split("\n").map((line, li) => {
                      if (line.startsWith("## ")) return <h2 key={li}>{line.slice(3)}</h2>;
                      if (line.startsWith("### ")) return <h3 key={li}>{line.slice(4)}</h3>;
                      if (line.startsWith("- ") || line.startsWith("* ")) return <div key={li} className="flex gap-2 my-0.5"><span>•</span><span dangerouslySetInnerHTML={{ __html: line.slice(2).replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} /></div>;
                      if (line.match(/^\d+\. /)) return <div key={li} className="flex gap-2 my-0.5"><span className="text-muted-foreground">{line.match(/^\d+/)?.[0]}.</span><span dangerouslySetInnerHTML={{ __html: line.replace(/^\d+\.\s*/, "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} /></div>;
                      if (line.startsWith("|")) return null; // skip table rows for simplicity
                      if (line.trim() === "") return <div key={li} className="h-1" />;
                      return <p key={li} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/💡|📅|⚠️|🏆|📍|🎓|💰/g, (m) => `<span>${m}</span>`) }} />;
                    })}
                  </div>
                ) : (
                  <span>{msg.content}</span>
                )}
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-1">
                  <User className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </motion.div>
          ))}

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3 shadow-[var(--shadow-card)]">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="shrink-0 border-t border-border bg-card">
        <div className="container mx-auto max-w-3xl px-4 py-4">
          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Ask anything about life in ${city}...`}
              className="flex-1 h-11 px-4 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              disabled={isTyping}
            />
            <Button type="submit" variant="hero" size="icon" disabled={!input.trim() || isTyping} className="h-11 w-11 rounded-xl">
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <p className="text-xs text-muted-foreground text-center mt-2">AI responses are for guidance only. Always verify important information.</p>
        </div>
      </div>
    </div>
  );
}
