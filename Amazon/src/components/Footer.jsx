export default function Footer({ isMobile }) {
  return (
    <footer className="flex flex-col gap-4 sm:gap-6 px-4 sm:px-6 py-8 sm:py-10 text-center bg-background-light dark:bg-background-dark text-gray-500 dark:text-gray-400">
      {/* Links */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        <a className="text-sm sm:text-base font-normal hover:text-primary transition-colors px-2 py-1" href="#">
          Privacy Policy
        </a>
        <a className="text-sm sm:text-base font-normal hover:text-primary transition-colors px-2 py-1" href="#">
          Terms of Service
        </a>
        <a className="text-sm sm:text-base font-normal hover:text-primary transition-colors px-2 py-1" href="#">
          FAQ
        </a>
      </div>
      
      {/* Social Icons */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
        <a className="hover:text-primary transition-colors p-2" href="#">
          <span className="material-symbols-outlined text-xl sm:text-2xl">group</span>
        </a>
        <a className="hover:text-primary transition-colors p-2" href="#">
          <span className="material-symbols-outlined text-xl sm:text-2xl">public</span>
        </a>
        <a className="hover:text-primary transition-colors p-2" href="#">
          <span className="material-symbols-outlined text-xl sm:text-2xl">photo_camera</span>
        </a>
      </div>
      
      {/* Copyright */}
      <p className="text-sm sm:text-base font-normal leading-normal">
        © 2025 Take The Lead • All rights reserved.
      </p>

      {/* Mobile-specific additional info */}
      {isMobile && (
        <div className="text-xs text-gray-400 mt-2">
          <p>Made with ❤️ for a greener planet</p>
        </div>
      )}
    </footer>
  );
}