import { ComparisonTable } from "@/components/ComparisonTable";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PageMotion } from "@/components/PageMotion";
import { ProblemSolution } from "@/components/ProblemSolution";
import { Testimonials } from "@/components/Testimonials";
import { VipSection } from "@/components/VipSection";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <ProblemSolution />
        <Features />
        <ComparisonTable />
        <Testimonials />
        <VipSection />
      </main>
      <Footer />
      <PageMotion />
    </>
  );
}
