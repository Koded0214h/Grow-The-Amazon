import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar({ onPlantTree, isMobile }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 font-display text-white bg-background-dark/80 backdrop-blur-sm">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="text-primary">
          <span className="material-symbols-outlined text-3xl sm:text-4xl">forest</span>
        </div>
        <h2 className="text-lg sm:text-xl font-bold leading-tight tracking-tight text-white">
          Grow The Amazon
        </h2>
      </div>

      {/* Desktop Navigation */}
      {!isMobile && (
        <div className="flex flex-1 justify-end items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <a className="text-sm font-medium text-white hover:text-primary transition-colors" href="#">
              Home
            </a>
            <Link to='/forest' className="text-sm font-medium text-white hover:text-primary transition-colors">
              Forest
            </Link>
            <Link to='/impact' className="text-sm font-medium text-white hover:text-primary transition-colors" href="#">
              Our Impact
            </Link>
          </div>
          <button
            onClick={onPlantTree}
            className="flex items-center justify-center rounded-full h-10 px-4 bg-primary text-background-dark text-sm font-bold hover:bg-opacity-90 transition-all min-w-[120px]"
          >
            Plant a Tree
          </button>
        </div>
      )}

      {/* Mobile Menu Button */}
      {isMobile && (
        <div className="flex items-center gap-2">
          <button
            onClick={onPlantTree}
            className="flex items-center justify-center rounded-full h-9 px-3 bg-primary text-background-dark text-sm font-bold hover:bg-opacity-90 transition-all"
          >
            <span className="material-symbols-outlined text-lg">park</span>
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-white hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined">
              {isMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      )}

      {/* Mobile Menu Dropdown */}
      {isMobile && isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background-dark/95 backdrop-blur-sm border-t border-white/10 py-4 px-4">
          <div className="flex flex-col gap-4">
            <a className="text-base font-medium text-white hover:text-primary transition-colors py-2" href="#">
              Home
            </a>
            <Link 
              to='/forest' 
              className="text-base font-medium text-white hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Forest
            </Link>
            <a className="text-base font-medium text-white hover:text-primary transition-colors py-2" href="#">
              Our Impact
            </a>
            <button
              onClick={() => {
                onPlantTree();
                setIsMenuOpen(false);
              }}
              className="flex items-center justify-center rounded-full h-12 bg-primary text-background-dark text-base font-bold hover:bg-opacity-90 transition-all mt-2"
            >
              Plant a Tree
            </button>
          </div>
        </div>
      )}
    </header>
  );
}