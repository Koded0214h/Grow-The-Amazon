export default function HeroSection({ treeCount, onPlantTree, isMobile }) {
  return (
    <main className="pt-16"> {/* Add padding for fixed navbar */}
      <div className="relative">
        <div
          className="flex min-h-screen flex-col gap-6 sm:gap-8 items-center justify-center px-4 sm:px-6 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.6) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBMW8t34V9-mBKp_V8kASteHTaofi0fvhD1Kt0Fnz1X9iKtUzwBo_4cTD0VSMhl4oxoetqkzGjbPpJ-e45rC0IvfLFo8su9iUgNrZLCfikrzhHhm8Qlf6DN87-ybkom0ixOA4Xj9i-_Xb6mt8lBk95HJ9QzFuqrpp0Op5wTTOYYclRqXrBZzIho52sz3POj3uVObaZLA5YMoIWyMR-Xu4udfitc_-fBVnxzPKOjaaNFIZuC_HlWftZpX7iigxPBayTx1W2sMUzGAaQ")'
          }}
        >
          {/* Main Heading */}
          <div className="flex flex-col gap-3 sm:gap-4 text-center max-w-3xl px-4">
            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight">
              Grow The Amazon
            </h1>
            <h2 className="text-gray-300 text-sm sm:text-base md:text-lg font-normal leading-normal">
              By Team Amazon @ Take The Lead
            </h2>
          </div>

          {/* Stats */}
          <div className="flex flex-col gap-2 rounded-lg p-4 sm:p-6 bg-black/30 backdrop-blur-sm border border-white/20 w-full max-w-xs sm:max-w-sm mx-auto">
            <p className="text-white text-sm sm:text-base font-medium text-center">
              Trees Planted So Far
            </p>
            <p className="text-primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center transition-all duration-500">
              {treeCount.toLocaleString()}
            </p>
          </div>

          {/* CTA Button */}
          <button
            onClick={onPlantTree}
            className="flex items-center justify-center rounded-full h-12 sm:h-14 px-6 sm:px-8 bg-primary text-background-dark text-base sm:text-lg font-bold hover:bg-opacity-90 transition-all hover:scale-105 active:scale-95 w-full max-w-xs sm:max-w-sm"
          >
            <span className="material-symbols-outlined mr-2 text-lg">park</span>
            Plant a Tree
          </button>

          {/* Additional Info for Mobile */}
          {isMobile && (
            <div className="text-center text-white/70 text-sm mt-4 px-4">
              <p>Join thousands helping restore the Amazon rainforest</p>
              <p className="mt-1">Every tree makes a difference 🌱</p>
            </div>
          )}

          {/* Scroll Indicator for Desktop */}
          {!isMobile && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
              <span className="material-symbols-outlined">expand_more</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}