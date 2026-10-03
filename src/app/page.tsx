import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/hero/Hero";
import { HowItWorks } from "@/components/how-it-works/HowItWorks";
import { MissionControlSection } from "@/components/hero/MissionControlSection";
import { ProductTour } from "@/components/showcase/ProductTour";
import { VoiceCallingSpotlight } from "@/components/voice/VoiceCallingSpotlight";
import { Features } from "@/components/features/Features";
import { InstallMethods } from "@/components/showcase/InstallMethods";
import { Integrations } from "@/components/integrations/Integrations";
import { BRAND } from "@/lib/brand";

const Comparison = dynamic(
  () => import("@/components/comparison/Comparison").then((mod) => mod.Comparison),
  { ssr: true }
);

const Pricing = dynamic(
  () => import("@/components/pricing/Pricing").then((mod) => mod.Pricing),
  { ssr: true }
);

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "/",
  },
  twitter: {
    title: BRAND.seo.title,
    description: BRAND.seo.description,
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <MissionControlSection />
      <ProductTour />
      <VoiceCallingSpotlight />
      <Features />
      <InstallMethods />
      <Integrations />
      <Comparison />
      <Pricing />
    </>
  );
}
