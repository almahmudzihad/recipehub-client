import FeaturedRecipes from "@/components/homepage/FeaturedRecipes";
import Hero from "@/components/homepage/Hero";
import TopChefs from "@/components/homepage/TopChefs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedRecipes />
      <TopChefs />
    </div>
  );
}
