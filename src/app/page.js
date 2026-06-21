import FeaturedRecipes from "@/components/homepage/FeaturedRecipes";
import Hero from "@/components/homepage/Hero";
import HowItWorks from "@/components/homepage/HowItWorks";
import TopChefs from "@/components/homepage/TopChefs";
import WhyChoose from "@/components/homepage/WhyChoose";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedRecipes />
      <TopChefs />
      <HowItWorks />
      <WhyChoose />
      {/* <TopChefs /> */}
    </div>
  );
}
