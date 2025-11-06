import ResultItem from './ResultItem';

export default function SearchResults({ results, onItemClick }) {
  return (
    <div className="bg-[#152e16]/80 backdrop-blur-sm border border-white/10 rounded-lg p-2 max-h-80 overflow-y-auto">
      {/* Trees Section */}
      {results.trees && results.trees.length > 0 && (
        <div className="mb-4">
          <h3 className="text-white/70 text-sm font-medium px-2 py-1 mb-1">Trees</h3>
          <div className="space-y-1">
            {results.trees.map((tree) => (
              <ResultItem
                key={tree.id}
                item={tree}
                onItemClick={onItemClick}
                icon="park"
                title={tree.name}
                subtitle={`${tree.tree_type_display || tree.tree_type} • Planted by ${tree.planter_name}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Users Section */}
      {results.users && results.users.length > 0 && (
        <div>
          <h3 className="text-white/70 text-sm font-medium px-2 py-1 mb-1">Users</h3>
          <div className="space-y-1">
            {results.users.map((user) => (
              <ResultItem
                key={user.id}
                item={user}
                onItemClick={onItemClick}
                icon="person"
                title={user.name}
                subtitle={`${user.trees_planted} trees planted`}
              />
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {(!results.trees || results.trees.length === 0) &&
       (!results.users || results.users.length === 0) && (
        <div className="text-white/50 text-sm text-center py-4">
          No results found
        </div>
      )}
    </div>
  );
}