import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroCity from "@/assets/hero-city.jpg";
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
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Recommendations",
    desc: "Personalized suggestions for schools, insurance, housing, and more based on your profile.",
  },
  {
    icon: Bell,
    title: "Proactive Notifications",
    desc: "Never miss a deadline — enrollment periods, insurance reviews, local opportunities.",
  },
  {
    icon: BarChart3,
    title: "Progress Tracker",
    desc: "Visualize your settling-in journey across all life categories.",
  },
  {
    icon: MapPin,
    title: "City-Specific Knowledge",
    desc: "Curated local data about neighborhoods, services, and community life.",
  },
];

const categories = [
  { icon: GraduationCap, label: "Education", color: "bg-info/10 text-info" },
  { icon: Heart, label: "Family", color: "bg-accent/10 text-accent" },
  { icon: Home, label: "Housing", color: "bg-primary/10 text-primary" },
  { icon: Shield, label: "Insurance", color: "bg-success/10 text-success" },
  { icon: Dumbbell, label: "Sports", color: "bg-warning/10 text-warning" },
  { icon: Landmark, label: "Finance", color: "bg-primary/10 text-primary" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <span className="font-display text-2xl font-bold text-primary cursor-pointer" onClick={() => navigate("/")}>NewBe</span>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/pricing")}>Pricing</Button>
            <Button variant="hero" size="lg" onClick={() => navigate("/onboarding")}>Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-16 overflow-hidden">
        <div className="container mx-auto px-4 py-20 lg:py-32 flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight mb-6">
              Your AI Guide to{" "}
              <span className="text-primary">Feeling at Home</span> in a New City
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              NewBe helps you navigate every aspect of relocating — from schools
              and insurance to sports clubs and local services. Powered by AI,
              personalized for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="xl" onClick={() => navigate("/onboarding")}>
                Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="hero-outline" size="xl" onClick={() => {
                document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
              }}>
                Learn More
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <img
              src={heroCity}
              alt="Vibrant city community illustration"
              className="rounded-2xl shadow-[var(--shadow-elevated)] w-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Categories Strip */}
      <section className="py-12 bg-secondary/50">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {categories.map((cat) => (
              <motion.div
                key={cat.label}
                variants={item}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-card shadow-[var(--shadow-card)]"
              >
                <span className={`p-2 rounded-lg ${cat.color}`}>
                  <cat.icon className="h-5 w-5" />
                </span>
                <span className="font-medium text-foreground">{cat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Everything You Need to Settle In
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              NewBe combines AI intelligence with local knowledge to make your
              relocation seamless and stress-free.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {features.map((feat) => (
              <motion.div
                key={feat.title}
                variants={item}
                className="p-6 rounded-2xl bg-card shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-shadow duration-300"
              >
                <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
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

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
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
              Create your profile in minutes and let NewBe guide you through
              your new city.
            </p>
            <Button
              variant="secondary"
              size="xl"
              onClick={() => navigate("/onboarding")}
              className="font-semibold"
            >
              Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          © 2026 NewBe. Your personal relocation assistant.
        </div>
      </footer>
    </div>
  );
}
