import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import PageTransition from "@/components/PageTransition";
import heroCity from "@/assets/hero-city.jpg";
import newbeLogo from "@/assets/newbe-logo.png";
import {
  GraduationCap,
  Home,
  Shield,
  Heart,
  Dumbbell,
  Landmark,
  Sparkles,
  ArrowRight,
  Bell,
  BarChart3,
  MapPin,
  User,
  CheckCircle,
  Zap,
  Globe,
  FileText,
  Users,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Recommendations",
    desc: "Personalized suggestions for schools, insurance, housing, and more based on your profile.",
    gradient: "from-primary/10 to-primary/5",
  },
  {
    icon: Bell,
    title: "Proactive Notifications",
    desc: "Never miss a deadline — enrollment periods, insurance reviews, local opportunities.",
    gradient: "from-accent/10 to-accent/5",
  },
  {
    icon: BarChart3,
    title: "Progress Tracker",
    desc: "Visualize your settling-in journey across all life categories.",
    gradient: "from-info/10 to-info/5",
  },
  {
    icon: MapPin,
    title: "City-Specific Knowledge",
    desc: "Curated local data about neighborhoods, services, and community life.",
    gradient: "from-success/10 to-success/5",
  },
];

const categories = [
  { icon: GraduationCap, label: "Education", color: "text-info", bg: "bg-info/10" },
  { icon: Heart, label: "Family", color: "text-accent", bg: "bg-accent/10" },
  { icon: Home, label: "Housing", color: "text-primary", bg: "bg-primary/10" },
  { icon: Shield, label: "Insurance", color: "text-success", bg: "bg-success/10" },
  { icon: Dumbbell, label: "Sports", color: "text-warning", bg: "bg-warning/10" },
  { icon: Landmark, label: "Finance", color: "text-primary", bg: "bg-primary/10" },
];

const stats = [
  { value: "11", label: "Life Categories", icon: Globe },
  { value: "50+", label: "Checklist Items", icon: CheckCircle },
  { value: "AI", label: "Powered Assistant", icon: Zap },
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } } };

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <PageTransition className="min-h-screen bg-background">
      {/* Glass Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <img src={newbeLogo} alt="NewBE logo" className="h-7 w-7" />
            <span className="font-display text-2xl font-bold gradient-text">NewBE</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate("/pricing")}>Pricing</Button>
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => navigate("/profile")} title="Profile">
              <User className="h-5 w-5" />
            </Button>
            <Button size="sm" className="font-semibold" onClick={() => navigate("/onboarding")}>Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero — Emotional Hook */}
      <section className="relative pt-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroCity} alt="" className="w-full h-full object-cover object-bottom" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>

        <div className="container mx-auto px-4 py-20 lg:py-28 relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              <Sparkles className="h-4 w-4" /> AI-Powered Relocation
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight mb-4">
              Moving to a new city?<br />
              <span className="gradient-text">We know the feeling.</span>
            </h1>
            <p className="text-base md:text-lg text-primary font-medium mb-4 tracking-wide">Your New Beginning starts here.</p>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Bureaucracy, housing, insurance, making friends — it's overwhelming.
              NewBE turns chaos into a clear, personalized action plan.
            </p>
          </motion.div>

          {/* "What's your biggest worry?" cards */}
          <motion.div
            className="max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-center text-lg font-display font-semibold text-foreground mb-6">
              What worries you most about moving?
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: FileText, label: "Paperwork & Bureaucracy", desc: "Permits, registration, insurance deadlines", color: "text-info", bg: "bg-info/10", path: "/onboarding" },
                { icon: Home, label: "Housing & Setup", desc: "Finding an apartment, setting up utilities", color: "text-primary", bg: "bg-primary/10", path: "/onboarding" },
                { icon: Users, label: "Making Friends", desc: "Meeting people, finding your community", color: "text-accent", bg: "bg-accent/10", path: "/onboarding" },
              ].map((card) => (
                <motion.button
                  key={card.label}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(card.path)}
                  className="bento-card text-left !p-5 cursor-pointer group"
                >
                  <div className={`p-3 rounded-xl ${card.bg} w-fit mb-3 transition-transform group-hover:scale-110`}>
                    <card.icon className={`h-6 w-6 ${card.color}`} />
                  </div>
                  <h3 className="font-display text-base font-semibold text-foreground mb-1">{card.label}</h3>
                  <p className="text-xs text-muted-foreground">{card.desc}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <Button size="lg" onClick={() => navigate("/onboarding")} className="text-base px-8 h-12 shadow-lg hover:shadow-xl transition-shadow">
              Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-base px-8 h-12" onClick={() => {
              document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
            }}>
              Learn More
            </Button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="flex flex-wrap gap-8 mt-12 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <stat.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-bold text-foreground text-lg leading-none">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories Strip */}
      <section className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {categories.map((cat) => (
              <motion.div
                key={cat.label}
                variants={fadeUp}
                className="flex items-center gap-2.5 px-5 py-3 rounded-xl bento-card"
              >
                <span className={`p-2 rounded-lg ${cat.bg}`}>
                  <cat.icon className={`h-5 w-5 ${cat.color}`} />
                </span>
                <span className="font-medium text-foreground">{cat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 lg:py-28 gradient-mesh-bg">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Everything You Need to <span className="gradient-text">Settle In</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              NewBE combines AI intelligence with local knowledge to make your
              relocation seamless and stress-free.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {features.map((feat) => (
              <motion.div
                key={feat.title}
                variants={fadeUp}
                className={`bento-card bg-gradient-to-br ${feat.gradient} !border-border/50`}
              >
                <div className="p-3 rounded-xl bg-card w-fit mb-4 shadow-sm">
                  <feat.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {feat.title}
                </h3>
                <p className="text-muted-foreground">{feat.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA — gradient with glass overlay */}
      <section className="py-24 relative overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
        <div className="absolute inset-0 shimmer" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
              Ready to Feel at Home?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Create your profile in minutes and let NewBE guide you through
              your new city.
            </p>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate("/onboarding")}
              className="font-semibold text-base px-8 h-12 shadow-lg hover:shadow-xl transition-shadow"
            >
              Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          © 2026 NewBE. Your personal relocation assistant.
        </div>
      </footer>
    </PageTransition>
  );
}
