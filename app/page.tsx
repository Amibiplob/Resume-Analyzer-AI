import FeaturesSection from "@/components/home/FeaturesSection";
import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";

export default function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <main>
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
      </main>
      {/* <Footer /> */}
    </>
  );
}
