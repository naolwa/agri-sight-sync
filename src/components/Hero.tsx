import { Button } from "@/components/ui/button";
import { ArrowRight, Sprout } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent py-20 lg:py-32">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptLTEyIDBjMy4zMTQgMCA2IDIuNjg2IDYgNnMtMi42ODYgNi02IDYtNi0yLjY4Ni02LTYgMi42ODYtNiA2LTZ6IiBzdHJva2U9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIuMDUiLz48L2c+PC9zdmc+')] opacity-20" />
      
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-primary-foreground backdrop-blur-sm">
            <Sprout className="h-5 w-5" />
            <span className="text-sm font-medium">AI-Powered Agricultural Intelligence</span>
          </div>
          
          <h1 className="mb-6 text-4xl font-bold text-primary-foreground sm:text-5xl lg:text-6xl">
            Sustainable Land Management
            <span className="block text-accent-foreground">Through AI & GIS</span>
          </h1>
          
          <p className="mb-8 text-lg text-primary-foreground/90 sm:text-xl">
            Monitor soil health, optimize crop rotation, and manage pastures with machine learning,
            remote sensing, and intelligent data analysis. Real-time NDVI mapping, AI-powered crop 
            recommendations, and predictive analytics. Supporting SDG 2 (Zero Hunger) and SDG 15 (Life on Land).
          </p>
          
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button 
              size="lg" 
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-[var(--shadow-strong)]"
              onClick={() => navigate('/auth')}
              aria-label="Get started with AgriAI"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-primary-foreground/20 bg-white/10 text-primary-foreground hover:bg-white/20 backdrop-blur-sm"
              onClick={() => navigate('/dashboard')}
              aria-label="View demo dashboard"
            >
              View Demo
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-primary-foreground/20 bg-white/10 text-primary-foreground hover:bg-white/20 backdrop-blur-sm"
              onClick={() => navigate('/methodology')}
              aria-label="Learn about our methodology"
            >
              How It Works
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-foreground">AI/ML</div>
              <div className="text-sm text-primary-foreground/80">Predictive Models</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-foreground">GIS</div>
              <div className="text-sm text-primary-foreground/80">Spatial Analysis</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-foreground">IoT</div>
              <div className="text-sm text-primary-foreground/80">Sensor Data</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-foreground">CNN</div>
              <div className="text-sm text-primary-foreground/80">Image Recognition</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
