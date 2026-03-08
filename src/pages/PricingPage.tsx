import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Check,
  Crown,
  Sparkles,
  Zap,
  MessageCircle,
  Globe,
  Users,
  Shield,
  Headphones,
  MapPinned,
  Coffee,
  CalendarCheck,
} from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "0",
    period: "forever",
    desc: "Get started with the basics",
    color: "border-border",
    bg: "bg-card",
    cta: "Current Plan",
    ctaVariant: "outline" as const,
    disabled: true,
    features: [
      "3 life categories",
      "Basic city guide",
      "5 AI questions per month",
      "Housing & insurance checklists",
      "Community forum access",
    ],
    excluded: [
      "Personalized recommendations",
      "Proactive notifications",
      "Priority support",
    ],
  },
  {
    name: "Pro",
    price: "9.90",
    period: "/month",
    desc: "Everything you need to settle in smoothly",
    color: "border-primary",
    bg: "bg-card",
    cta: "Upgrade to Pro",
    ctaVariant: "hero" as const,
    disabled: false,
    popular: true,
    features: [
      "All life categories",
      "Full city knowledge base",
      "Unlimited AI questions",
      "Personalized recommendations",
      "Proactive notifications",
      "Interactive checklists",
      "Neighborhood comparisons",
      "Email support",
    ],
    excluded: [
      "1-on-1 relocation advisor",
    ],
  },
  {
    name: "Premium",
    price: "29.90",
    period: "/month",
    desc: "Concierge-level relocation support",
    color: "border-warning",
    bg: "bg-card",
    cta: "Go Premium",
    ctaVariant: "accent" as const,
    disabled: false,
    features: [
      "Everything in Pro",
      "1-on-1 relocation advisor",
      "Priority document review",
      "Apartment search assistance",
      "School placement support",
      "Tax & insurance optimization",
      "Priority 24/7 support",
      "Family onboarding pack",
    ],
    excluded: [],
  },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function PricingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></Button>
            <span className="font-display text-2xl font-bold text-primary cursor-pointer" onClick={() => navigate("/")}>NewBe</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 space-y-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Choose Your <span className="text-primary">NewBe</span> Plan
          </h1>
          <p className="text-lg text-muted-foreground">
            Start free, upgrade when you're ready. Every plan helps you settle in faster.
          </p>
        </motion.div>

        {/* Plans */}
        <motion.div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto" variants={container} initial="hidden" animate="show">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={item}
              className={`relative p-6 rounded-2xl border-2 ${plan.color} ${plan.bg} shadow-[var(--shadow-card)] flex flex-col`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-display text-xl font-bold text-foreground">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{plan.desc}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-display font-bold text-foreground">CHF {plan.price}</span>
                <span className="text-muted-foreground text-sm ml-1">{plan.period}</span>
              </div>

              <Button
                variant={plan.ctaVariant}
                className="w-full mb-6"
                disabled={plan.disabled}
              >
                {plan.disabled ? plan.cta : plan.cta}
              </Button>

              <div className="space-y-3 flex-1">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    <span className="text-sm text-foreground">{f}</span>
                  </div>
                ))}
                {plan.excluded.map((f) => (
                  <div key={f} className="flex items-start gap-2 opacity-40">
                    <Check className="h-4 w-4 mt-0.5 shrink-0" />
                    <span className="text-sm line-through">{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto py-8"
        >
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">Why upgrade?</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: MessageCircle, title: "Unlimited AI Help", desc: "Ask anything about your new city, anytime" },
              { icon: Globe, title: "Full City Guide", desc: "Access all categories and local knowledge" },
              { icon: Headphones, title: "Expert Support", desc: "Get help from real relocation advisors" },
            ].map((f) => (
              <div key={f.title} className="text-center">
                <div className="mx-auto w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1">{f.title}</h3>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto pb-12"
        >
          <h2 className="font-display text-2xl font-bold text-foreground mb-6 text-center">Frequently Asked</h2>
          <div className="space-y-4">
            {[
              { q: "Can I cancel anytime?", a: "Yes! Cancel your subscription at any time. You'll keep access until the end of your billing period." },
              { q: "Is my data secure?", a: "Absolutely. Your personal data is encrypted and never shared with third parties." },
              { q: "Can I switch plans?", a: "Yes, upgrade or downgrade anytime. Changes take effect on your next billing cycle." },
              { q: "Do you support other cities?", a: "We're expanding! Currently supporting major Swiss cities with more European cities coming soon." },
            ].map((faq) => (
              <div key={faq.q} className="p-5 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
                <h3 className="font-semibold text-foreground text-sm mb-1">{faq.q}</h3>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
