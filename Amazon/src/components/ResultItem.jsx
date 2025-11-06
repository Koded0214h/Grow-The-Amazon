export default function ResultItem({ item, onItemClick, icon, profileImage, title, subtitle }) {
    return (
      <button
        onClick={() => onItemClick(item)}
        className="flex items-center gap-4 px-2 py-2.5 rounded-md hover:bg-white/10 transition-colors cursor-pointer group w-full text-left"
      >
        {profileImage ? (
          <img 
            className="h-10 w-10 rounded-full object-cover" 
            alt={`Profile picture of ${title}`}
            src={profileImage} 
          />
        ) : (
          <div className="flex items-center justify-center shrink-0 size-10 rounded-md bg-primary/20 text-primary">
            <span className="material-symbols-outlined">{icon}</span>
          </div>
        )}
        
        <div className="flex flex-col flex-1">
          <p className="text-white text-base font-medium leading-normal line-clamp-1">
            {title}
          </p>
          <p className="text-white/60 text-sm font-normal leading-normal line-clamp-2">
            {subtitle}
          </p>
        </div>
        
        <div className="shrink-0 text-white/50 group-hover:text-white transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
          <span className="material-symbols-outlined text-xl">north_west</span>
        </div>
      </button>
    );
  }