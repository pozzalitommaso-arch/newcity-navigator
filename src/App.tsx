import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import OnboardingPage from "./pages/OnboardingPage";
import DashboardPage from "./pages/DashboardPage";
import HousingPage from "./pages/HousingPage";
import EducationPage from "./pages/EducationPage";
import FamilyPage from "./pages/FamilyPage";
import InsurancePage from "./pages/InsurancePage";
import SportsPage from "./pages/SportsPage";
import FinancePage from "./pages/FinancePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/housing" element={<HousingPage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/family" element={<FamilyPage />} />
          <Route path="/insurance" element={<InsurancePage />} />
          <Route path="/sports" element={<SportsPage />} />
          <Route path="/finance" element={<FinancePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
