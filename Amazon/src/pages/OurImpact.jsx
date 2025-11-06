import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function OurImpact() {
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size on component mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <div className="bg-background-light dark:bg-background-dark">
      <div className="relative flex min-h-screen w-full flex-col font-display overflow-x-hidden">
        <Navbar onPlantTree={() => {}} isMobile={isMobile} />

        <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-8">
              Our Impact
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6">
              Together, we're making a real difference in restoring the Amazon rainforest.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="bg-background-dark/50 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                <div className="text-3xl font-bold text-primary mb-2">1,234</div>
                <div className="text-white/70">Trees Planted</div>
              </div>
              <div className="bg-background-dark/50 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                <div className="text-3xl font-bold text-primary mb-2">567</div>
                <div className="text-white/70">Acres Restored</div>
              </div>
              <div className="bg-background-dark/50 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                <div className="text-3xl font-bold text-primary mb-2">89</div>
                <div className="text-white/70">Communities Supported</div>
              </div>
            </div>
            <p className="text-white/60 mt-12 max-w-2xl mx-auto">
              Every tree planted contributes to biodiversity, carbon sequestration, and sustainable livelihoods.
              Join us in our mission to protect and restore one of the world's most vital ecosystems.
            </p>
          </div>
        </main>

        <Footer isMobile={isMobile} />
      </div>
    </div>
  );
}
