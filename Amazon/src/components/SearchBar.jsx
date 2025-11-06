export default function SearchBar({ value, onChange, onClear, placeholder }) {
    return (
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <span className="material-symbols-outlined text-white/70">search</span>
        </div>
        
        <input 
          className="w-full h-12 pl-11 pr-10 py-2 font-display text-white placeholder:text-white/50 bg-[#152e16]/80 backdrop-blur-sm border border-white/10 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none transition-all duration-300"
          placeholder={placeholder}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        
        {value && (
          <button 
            onClick={onClear}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-white/70 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        )}
      </div>
    );
  }