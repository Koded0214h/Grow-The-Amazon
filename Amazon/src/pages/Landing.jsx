import { useState, useEffect } from 'react';
import { treeAPI, checkBackendHealth } from '../utils/api';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import PlantTreeModal from '../components/PlantTreeModal';

export default function Landing() {
  const [treeCount, setTreeCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [backendOnline, setBackendOnline] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size and backend health on component mount
  useEffect(() => {
    const checkHealth = async () => {
      const isOnline = await checkBackendHealth();
      setBackendOnline(isOnline);
      
      if (isOnline) {
        loadStats();
      }
    };

    // Check mobile screen size
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkHealth();
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const loadStats = async () => {
    try {
      const stats = await treeAPI.getStats();
      setTreeCount(stats.total_trees);
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const handlePlantTree = () => {
    if (!backendOnline) {
      alert('Backend is currently offline. Please try again later.');
      return;
    }
    setIsModalOpen(true);
  };

  const handleTreePlanted = (newTree) => {
    setTreeCount(prev => prev + 1);
    console.log('New tree planted:', newTree);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark">
      <div className="relative flex min-h-screen w-full flex-col font-display overflow-x-hidden">
        <Navbar onPlantTree={handlePlantTree} isMobile={isMobile} />
        <HeroSection 
          treeCount={treeCount} 
          onPlantTree={handlePlantTree} 
          backendOnline={backendOnline}
          isMobile={isMobile}
        />
        <Footer isMobile={isMobile} />
        
        <PlantTreeModal 
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onTreePlanted={handleTreePlanted}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
}