import { useLenis } from '@/hooks/useLenis';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { CustomCursor } from '@/components/CustomCursor';
import { CherryBlossoms } from '@/components/CherryBlossoms';
import { HeroSection } from '@/sections/HeroSection';
import { AboutSection } from '@/sections/AboutSection';
import { IncludedSection } from '@/sections/IncludedSection';
import { ContactSection } from '@/sections/ContactSection';

export default function App() {
  useLenis();

  return (
    <div className="relative min-h-screen bg-mist-black text-kimono-white">
      <CustomCursor />
      <CherryBlossoms />
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <IncludedSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
