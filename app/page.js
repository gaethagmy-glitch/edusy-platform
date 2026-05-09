import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Features from '@/components/Features';
import Teachers from '@/components/Teachers';
import HowItWorks from '@/components/HowItWorks';
import Payment from '@/components/Payment';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <Teachers />
      <HowItWorks />
      <Payment />
      <CTA />
      <Footer />
    </>
  );
}
