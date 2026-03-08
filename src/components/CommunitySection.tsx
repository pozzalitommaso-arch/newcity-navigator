import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, ThumbsUp, Send, User, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Tip {
  user: string;
  text: string;
  likes: number;
  timeAgo: string;
}

interface Question {
  user: string;
  question: string;
  answers: { user: string; text: string; timeAgo: string }[];
  timeAgo: string;
}

interface CommunitySectionProps {
  category: string;
  tips?: Tip[];
  questions?: Question[];
}

const defaultTips: Record<string, Tip[]> = {
  insurance: [
    { user: "Anna M.", text: "Go with Assura for the cheapest basic insurance — saved CHF 80/month vs Helsana.", likes: 24, timeAgo: "2d ago" },
    { user: "Marco R.", text: "Don't skip household insurance! My bike got stolen week 2 and it was fully covered.", likes: 18, timeAgo: "5d ago" },
  ],
  banking: [
    { user: "Sophie L.", text: "Neon account took 2 days. UBS took 3 weeks. Go digital first!", likes: 31, timeAgo: "1d ago" },
    { user: "Raj P.", text: "Set up TWINT immediately — you can't even split bills at restaurants without it.", likes: 22, timeAgo: "3d ago" },
  ],
  housing: [
    { user: "Luca B.", text: "Kreis 3 and 4 have the best vibe for young professionals. Worth the extra rent.", likes: 15, timeAgo: "4d ago" },
    { user: "Yuki T.", text: "Bring a complete dossier to EVERY viewing. I lost 3 apartments before learning this.", likes: 28, timeAgo: "1w ago" },
  ],
  education: [
    { user: "Maria K.", text: "Swiss public schools are excellent. Save the CHF 30k/year on international school.", likes: 19, timeAgo: "3d ago" },
  ],
  sports: [
    { user: "Tom H.", text: "Join a Verein! It's the fastest way to make Swiss friends. I joined a volleyball club.", likes: 12, timeAgo: "6d ago" },
  ],
  finance: [
    { user: "David W.", text: "Finpension 3a has the lowest fees — 0.39%. Don't go with your bank's 3a.", likes: 26, timeAgo: "2d ago" },
  ],
  pension: [
    { user: "Elena S.", text: "Max out your 3a before December 31. The tax savings alone are worth CHF 1,500+.", likes: 20, timeAgo: "5d ago" },
  ],
  family: [
    { user: "Nina F.", text: "Get on Kita waitlists the moment you arrive. Some have 12-month waits!", likes: 33, timeAgo: "1d ago" },
  ],
  friends: [
    { user: "James C.", text: "InterNations events are great but the real friendships come from Vereine.", likes: 14, timeAgo: "4d ago" },
  ],
  events: [
    { user: "Lisa M.", text: "Subscribe to Zürich Tipps newsletter — best curated local events list.", likes: 9, timeAgo: "1w ago" },
  ],
  "public-services": [
    { user: "Carlos G.", text: "Go to Kreisbüro early morning. After 10am the wait is 2+ hours.", likes: 27, timeAgo: "2d ago" },
  ],
  shopping: [
    { user: "Mia W.", text: "Furnished my entire apartment from Brocki + Tutti.ch for under CHF 400. Patience pays off!", likes: 35, timeAgo: "1d ago" },
    { user: "Tom K.", text: "Don't forget Züri-Sack! Regular trash bags don't work here. Buy the official ones at Migros.", likes: 29, timeAgo: "3d ago" },
  ],
  groceries: [
    { user: "Sarah L.", text: "Aldi's Wednesday specials are unreal. Got a full week of groceries for CHF 45.", likes: 41, timeAgo: "1d ago" },
    { user: "Pedro M.", text: "Too Good To Go saved me hundreds. CHF 3.99 for a bag of bakery goods from Sprüngli!", likes: 33, timeAgo: "2d ago" },
  ],
  language: [
    { user: "Yuki T.", text: "Migros Klubschule intensive course got me from A1 to B1 in 6 months. Best investment.", likes: 28, timeAgo: "3d ago" },
    { user: "Anna M.", text: "Don't stress about Swiss German at first. Everyone understands Hochdeutsch. But learn 'Grüezi' day one!", likes: 22, timeAgo: "5d ago" },
  ],
};

const defaultQuestions: Record<string, Question[]> = {
  insurance: [
    { user: "Kim S.", question: "Is dental insurance worth it in Switzerland?", timeAgo: "1d ago", answers: [
      { user: "Anna M.", text: "Only if you need regular work. A cleaning costs ~CHF 200 without it. Do the math based on your needs.", timeAgo: "12h ago" },
    ]},
  ],
  housing: [
    { user: "Pavel T.", question: "Best neighborhoods in Zurich for families with kids?", timeAgo: "2d ago", answers: [
      { user: "Maria K.", text: "Kreis 6 (Oberstrass) and Kreis 7 (Witikon) — great schools, parks, and safe streets.", timeAgo: "1d ago" },
      { user: "Luca B.", text: "Wollishofen (Kreis 2) is also lovely — right by the lake with a family-friendly vibe.", timeAgo: "18h ago" },
    ]},
  ],
  banking: [
    { user: "Aisha N.", question: "Can I open a bank account before I have my residence permit?", timeAgo: "3d ago", answers: [
      { user: "Sophie L.", text: "Yes! Neon and Yuh only need your passport. Traditional banks usually want the permit.", timeAgo: "2d ago" },
    ]},
  ],
};

export default function CommunitySection({ category, tips, questions }: CommunitySectionProps) {
  const [newQuestion, setNewQuestion] = useState("");
  const [showQuestionInput, setShowQuestionInput] = useState(false);
  const displayTips = tips || defaultTips[category] || [];
  const displayQuestions = questions || defaultQuestions[category] || [];

  if (displayTips.length === 0 && displayQuestions.length === 0) return null;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 mt-8">
      {/* Tried & Tested Tips */}
      {displayTips.length > 0 && (
        <div>
          <h2 className="font-display text-xl font-semibold text-foreground mb-1 flex items-center gap-2">
            <Star className="h-5 w-5 text-warning" /> Tried & Tested
          </h2>
          <p className="text-sm text-muted-foreground mb-4">Real tips from people who've been through it.</p>
          <div className="space-y-3">
            {displayTips.map((tip, i) => (
              <div key={i} className="p-4 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-full bg-primary/10 shrink-0">
                    <User className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-foreground">{tip.user}</span>
                      <span className="text-[10px] text-muted-foreground">{tip.timeAgo}</span>
                    </div>
                    <p className="text-sm text-foreground">{tip.text}</p>
                    <button className="flex items-center gap-1 mt-2 text-xs text-muted-foreground hover:text-primary transition-colors">
                      <ThumbsUp className="h-3 w-3" /> {tip.likes} helpful
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ask a Local */}
      <div>
        <h2 className="font-display text-xl font-semibold text-foreground mb-1 flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-info" /> Ask a Local
        </h2>
        <p className="text-sm text-muted-foreground mb-4">Got a question? The community has answers.</p>

        {displayQuestions.map((q, i) => (
          <div key={i} className="mb-4 p-4 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-1.5 rounded-full bg-info/10 shrink-0">
                <User className="h-3.5 w-3.5 text-info" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-semibold text-foreground">{q.user}</span>
                  <span className="text-[10px] text-muted-foreground">{q.timeAgo}</span>
                </div>
                <p className="text-sm font-medium text-foreground">{q.question}</p>
              </div>
            </div>
            {q.answers.map((a, j) => (
              <div key={j} className="ml-8 mt-2 p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-semibold text-foreground">{a.user}</span>
                  <span className="text-[10px] text-muted-foreground">{a.timeAgo}</span>
                </div>
                <p className="text-xs text-foreground">{a.text}</p>
              </div>
            ))}
          </div>
        ))}

        {!showQuestionInput ? (
          <Button variant="outline" size="sm" onClick={() => setShowQuestionInput(true)} className="mt-2">
            <MessageCircle className="h-4 w-4 mr-1.5" /> Ask a question
          </Button>
        ) : (
          <div className="flex gap-2 mt-2">
            <input
              autoFocus
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 h-10 px-3 rounded-lg border border-input bg-background text-sm outline-none focus:ring-1 focus:ring-primary"
            />
            <Button size="sm" className="h-10" disabled={!newQuestion.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
