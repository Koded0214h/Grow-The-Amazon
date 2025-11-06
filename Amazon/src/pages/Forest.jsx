import { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sky } from '@react-three/drei';
import * as THREE from 'three';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import { treeAPI } from '../utils/api';

// Tree type configurations with different colors and sizes
const TREE_CONFIGS = {
  KAPOK: { 
    trunkColor: "#8B4513", 
    foliageColor: "#22C55E",
    height: 1.2,
    trunkWidth: 0.1,
    foliageSize: 0.5
  },
  MAHOGANY: { 
    trunkColor: "#654321", 
    foliageColor: "#166534",
    height: 1.0,
    trunkWidth: 0.12,
    foliageSize: 0.4
  },
  RUBBER: { 
    trunkColor: "#A0522D", 
    foliageColor: "#15803D",
    height: 0.9,
    trunkWidth: 0.08,
    foliageSize: 0.45
  },
  BRAZIL_NUT: { 
    trunkColor: "#8B5A2B", 
    foliageColor: "#CA8A04",
    height: 1.3,
    trunkWidth: 0.15,
    foliageSize: 0.6
  },
  ACAI: { 
    trunkColor: "#D2691E", 
    foliageColor: "#DC2626",
    height: 0.8,
    trunkWidth: 0.06,
    foliageSize: 0.3
  },
  COCOA: { 
    trunkColor: "#7C2D12", 
    foliageColor: "#7C2D12",
    height: 0.7,
    trunkWidth: 0.07,
    foliageSize: 0.35
  },
  ROSEWOOD: { 
    trunkColor: "#BE123C", 
    foliageColor: "#BE123C",
    height: 1.1,
    trunkWidth: 0.11,
    foliageSize: 0.4
  },
  ANDEAN_ALDER: { 
    trunkColor: "#0EA5E9", 
    foliageColor: "#0EA5E9",
    height: 1.0,
    trunkWidth: 0.09,
    foliageSize: 0.42
  },
  IRONWOOD: { 
    trunkColor: "#57534E", 
    foliageColor: "#57534E",
    height: 0.9,
    trunkWidth: 0.13,
    foliageSize: 0.38
  },
  CECROPIA: { 
    trunkColor: "#65A30D", 
    foliageColor: "#65A30D",
    height: 0.8,
    trunkWidth: 0.05,
    foliageSize: 0.32
  }
};

// Tree Info Component - Shows tooltip when tree is hovered
function TreeInfo({ tree, position, visible }) {
  if (!visible) return null;

  return (
    <group position={[position[0], position[1] + 1.5, position[2]]}>
      {/* Simple billboard for tree name */}
      <mesh>
        <planeGeometry args={[1, 0.3]} />
        <meshBasicMaterial 
          color="#000000" 
          transparent 
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// 3D Tree Component with unique models based on tree type
function Tree3D({ tree, position, onTreeHover, hoveredTree }) {
  const meshRef = useRef();
  const isHovered = hoveredTree?.id === tree.id;
  const treeConfig = TREE_CONFIGS[tree.tree_type] || TREE_CONFIGS.KAPOK;

  useFrame((state, delta) => {
    if (meshRef.current && !isHovered) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  const handlePointerEnter = (event) => {
    event.stopPropagation();
    onTreeHover(tree, position);
  };

  const handlePointerLeave = (event) => {
    event.stopPropagation();
    onTreeHover(null, null);
  };

  const trunkHeight = treeConfig.height * 0.4;
  const foliagePosition = trunkHeight + treeConfig.foliageSize * 0.3;

  return (
    <group 
      position={position} 
      ref={meshRef}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {/* Tree Trunk - Different sizes based on tree type */}
      <mesh castShadow position={[0, trunkHeight / 2, 0]}>
        <cylinderGeometry args={[
          treeConfig.trunkWidth * 0.8, 
          treeConfig.trunkWidth, 
          trunkHeight, 
          6
        ]} />
        <meshStandardMaterial color={isHovered ? "#654321" : treeConfig.trunkColor} />
      </mesh>
      
      {/* Main Tree Crown - Different shapes based on tree type */}
      <mesh castShadow position={[0, foliagePosition, 0]}>
        <sphereGeometry args={[treeConfig.foliageSize, 6, 4]} />
        <meshStandardMaterial color={isHovered ? "#38b82e" : treeConfig.foliageColor} />
      </mesh>
      
      {/* Additional foliage layers - Different arrangements */}
      {tree.tree_type === 'KAPOK' && (
        <>
          <mesh castShadow position={[0.1, foliagePosition + 0.1, 0.05]}>
            <sphereGeometry args={[treeConfig.foliageSize * 0.7, 5, 3]} />
            <meshStandardMaterial color={isHovered ? "#2da325" : "#16A34A"} />
          </mesh>
          <mesh castShadow position={[-0.08, foliagePosition + 0.15, -0.03]}>
            <sphereGeometry args={[treeConfig.foliageSize * 0.6, 5, 3]} />
            <meshStandardMaterial color={isHovered ? "#1e7c18" : "#15803D"} />
          </mesh>
        </>
      )}
      
      {tree.tree_type === 'MAHOGANY' && (
        <>
          <mesh castShadow position={[0.15, foliagePosition - 0.05, 0]}>
            <sphereGeometry args={[treeConfig.foliageSize * 0.8, 5, 3]} />
            <meshStandardMaterial color={isHovered ? "#2da325" : "#14532D"} />
          </mesh>
        </>
      )}
      
      {tree.tree_type === 'BRAZIL_NUT' && (
        <>
          <mesh castShadow position={[0, foliagePosition + 0.2, 0]}>
            <sphereGeometry args={[treeConfig.foliageSize * 0.9, 6, 4]} />
            <meshStandardMaterial color={isHovered ? "#ca8a04" : "#CA8A04"} />
          </mesh>
          <mesh castShadow position={[0.2, foliagePosition, 0.1]}>
            <sphereGeometry args={[treeConfig.foliageSize * 0.5, 4, 2]} />
            <meshStandardMaterial color={isHovered ? "#eab308" : "#EAB308"} />
          </mesh>
        </>
      )}
      
      {tree.tree_type === 'RUBBER' && (
        <>
          <mesh castShadow position={[0, foliagePosition, 0]}>
            <coneGeometry args={[treeConfig.foliageSize, treeConfig.foliageSize * 1.5, 6]} />
            <meshStandardMaterial color={isHovered ? "#2da325" : treeConfig.foliageColor} />
          </mesh>
        </>
      )}
      
      {tree.tree_type === 'ACAI' && (
        <>
          <mesh castShadow position={[0, foliagePosition + 0.1, 0]}>
            <sphereGeometry args={[treeConfig.foliageSize * 0.8, 4, 2]} />
            <meshStandardMaterial color={isHovered ? "#dc2626" : treeConfig.foliageColor} />
          </mesh>
          <mesh castShadow position={[0.1, foliagePosition - 0.1, 0.05]}>
            <sphereGeometry args={[treeConfig.foliageSize * 0.4, 3, 2]} />
            <meshStandardMaterial color={isHovered ? "#ef4444" : "#EF4444"} />
          </mesh>
        </>
      )}
      
      {tree.tree_type === 'COCOA' && (
        <>
          <mesh castShadow position={[0, foliagePosition, 0]}>
            <boxGeometry args={[treeConfig.foliageSize, treeConfig.foliageSize, treeConfig.foliageSize]} />
            <meshStandardMaterial color={isHovered ? "#7c2d12" : treeConfig.foliageColor} />
          </mesh>
        </>
      )}

      {/* Tree Info Tooltip */}
      <TreeInfo 
        tree={tree} 
        position={position} 
        visible={isHovered} 
      />
    </group>
  );
}

// Camera Controller Component
function CameraController({ targetTree, onTargetReached }) {
  const { camera, controls } = useThree();
  const animationRef = useRef();

  useEffect(() => {
    // Stop any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    if (targetTree) {
      const targetPosition = new THREE.Vector3(
        targetTree.position_x || 0,
        0.5, // Look at tree trunk height
        targetTree.position_z || 0
      );

      // Get current controls
      const orbitControls = controls;

      // Calculate camera position for close zoom
      const cameraOffset = new THREE.Vector3(1.5, 1.2, 1.5); // Close offset
      const targetCameraPosition = targetPosition.clone().add(cameraOffset);

      // Smooth camera movement
      const duration = 1000; // ms
      const startTime = Date.now();
      const startPosition = camera.position.clone();
      const startTarget = orbitControls?.target ? orbitControls.target.clone() : new THREE.Vector3();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth movement
        const ease = 1 - Math.pow(1 - progress, 3);

        // Interpolate camera position
        camera.position.lerpVectors(startPosition, targetCameraPosition, ease);

        // Interpolate look-at target
        if (orbitControls) {
          orbitControls.target.lerpVectors(startTarget, targetPosition, ease);
          orbitControls.update();
        } else {
          // Fallback: manually look at target
          camera.lookAt(targetPosition.x, targetPosition.y, targetPosition.z);
        }

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          // Set final close zoom distance
          if (orbitControls) {
            orbitControls.minDistance = 0.8; // Very close zoom
            orbitControls.maxDistance = 8;   // Limited zoom out when focused
            orbitControls.update();
          }
          onTargetReached();
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    } else {
      // Zoom out to default position
      const defaultCameraPosition = new THREE.Vector3(0, 8, 8);
      const defaultTarget = new THREE.Vector3(0, 0, 0);

      const orbitControls = controls;

      const duration = 1000; // ms
      const startTime = Date.now();
      const startPosition = camera.position.clone();
      const startTarget = orbitControls?.target ? orbitControls.target.clone() : new THREE.Vector3();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth movement
        const ease = 1 - Math.pow(1 - progress, 3);

        // Interpolate camera position
        camera.position.lerpVectors(startPosition, defaultCameraPosition, ease);

        // Interpolate look-at target
        if (orbitControls) {
          orbitControls.target.lerpVectors(startTarget, defaultTarget, ease);
          orbitControls.update();
        } else {
          // Fallback: manually look at target
          camera.lookAt(defaultTarget.x, defaultTarget.y, defaultTarget.z);
        }

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          // Reset zoom distances to original
          if (orbitControls) {
            orbitControls.minDistance = 2; // Can get close to trees
            orbitControls.maxDistance = 20;  // Normal zoom out
            orbitControls.update();
          }
          onTargetReached();
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [targetTree, camera, controls, onTargetReached]);

  return null;
}

// Grass Component
function GrassBlade({ position, rotation }) {
  return (
    <mesh position={position} rotation={rotation} castShadow>
      <planeGeometry args={[0.02, 0.1]} />
      <meshStandardMaterial color="#22C55E" side={2} />
    </mesh>
  );
}

function GrassPatch({ position }) {
  const grassBlades = [];
  
  for (let i = 0; i < 8; i++) {
    const x = (Math.random() - 0.5) * 0.3;
    const z = (Math.random() - 0.5) * 0.3;
    const rotation = [0, Math.random() * Math.PI, (Math.random() - 0.5) * 0.3];
    
    grassBlades.push(
      <GrassBlade key={i} position={[x, 0.05, z]} rotation={rotation} />
    );
  }
  
  return <group position={position}>{grassBlades}</group>;
}

function Ground() {
  const grassPatches = [];
  
  for (let i = 0; i < 150; i++) {
    const x = (Math.random() - 0.5) * 90;
    const z = (Math.random() - 0.5) * 90;
    const isNearTree = Math.abs(x) < 4 && Math.abs(z) < 4;
    if (!isNearTree) {
      grassPatches.push(<GrassPatch key={i} position={[x, 0, z]} />);
    }
  }

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#1a3c27" />
      </mesh>
      {grassPatches}
    </group>
  );
}

// Custom OrbitControls that exposes ref
const ControlledOrbitControls = (props) => {
  const { camera, gl } = useThree();
  const controlsRef = useRef();

  useFrame(() => {
    if (controlsRef.current) {
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      {...props}
    />
  );
};

// Main Forest Scene
function ForestScene({ trees = [], onTreeHover, hoveredTree, onCameraTargetReached }) {
  const safeTrees = Array.isArray(trees) ? trees : [];
  const controlsRef = useRef();

  return (
    <Canvas shadows camera={{ position: [0, 8, 8], fov: 60 }}>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      
      {/* Sky with proper configuration */}
      <Sky 
        distance={450000}
        sunPosition={[10, 10, 5]}
        inclination={0}
        azimuth={0.25}
      />
      
      <fog attach="fog" args={['#87CEEB', 8, 25]} />
      <Ground />
      
      {/* Camera Controller */}
      <CameraController 
        targetTree={hoveredTree} 
        onTargetReached={onCameraTargetReached}
      />
      
      {/* Trees */}
      {safeTrees.map((tree) => (
        <Tree3D 
          key={tree.id}
          tree={tree}
          position={[tree.position_x || 0, 0, tree.position_z || 0]}
          onTreeHover={onTreeHover}
          hoveredTree={hoveredTree}
        />
      ))}
      
      {/* OrbitControls with ref */}
      <ControlledOrbitControls
        ref={controlsRef}
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        minDistance={2}
        maxDistance={20}
        zoomSpeed={1.0}
        panSpeed={1.0}
        rotateSpeed={0.8}
        target={[0, 0, 0]}
        autoRotate={!hoveredTree}
        autoRotateSpeed={0.5}
        makeDefault
      />
    </Canvas>
  );
}

export default function Forest() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ trees: [], users: [] });
  const [allTrees, setAllTrees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [hoveredTree, setHoveredTree] = useState(null);
  const [isCameraMoving, setIsCameraMoving] = useState(false);

  useEffect(() => {
    fetchAllTrees();
  }, []);

  const fetchAllTrees = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await treeAPI.getAllTrees();
      
      let treesData = [];
      
      if (Array.isArray(response)) {
        treesData = response;
      } else if (response && Array.isArray(response.results)) {
        treesData = response.results;
      } else if (response && Array.isArray(response.data)) {
        treesData = response.data;
      } else if (response && typeof response === 'object') {
        treesData = [response];
      }
      
      setAllTrees(treesData);
      
    } catch (err) {
      console.error('Error fetching trees:', err);
      setError('Failed to load trees from the forest');
      setAllTrees([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTreeHover = (tree, position) => {
    setHoveredTree(tree);
    setIsCameraMoving(true);
  };

  const handleCameraTargetReached = () => {
    setIsCameraMoving(false);
  };

  const handleSearchChange = async (query) => {
    setSearchQuery(query);
    
    if (query.trim()) {
      try {
        const results = await treeAPI.search(query);
        const safeResults = {
          trees: Array.isArray(results?.trees) ? results.trees : [],
          users: Array.isArray(results?.users) ? results.users : []
        };
        setSearchResults(safeResults);
      } catch (err) {
        console.error('Search failed:', err);
        setSearchResults({ trees: [], users: [] });
      }
    } else {
      setSearchResults({ trees: [], users: [] });
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults({ trees: [], users: [] });
  };

  const handleSearchItemClick = (item) => {
    if (item.position_x !== undefined && item.position_z !== undefined) {
      setHoveredTree(item);
      setIsCameraMoving(true);
    } else {
      console.log('User clicked:', item);
    }
  };

  const clearHoveredTree = () => {
    setHoveredTree(null);
    setIsCameraMoving(false);
  };

  if (loading) {
    return (
      <div className="relative w-full min-h-screen font-display flex items-center justify-center">
        <div className="text-white text-lg">Loading forest...</div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen font-display">
      {/* 3D Forest Background */}
      <div className="absolute inset-0 z-0">
        <ForestScene 
          trees={allTrees} 
          onTreeHover={handleTreeHover}
          hoveredTree={hoveredTree}
          onCameraTargetReached={handleCameraTargetReached}
        />
      </div>
      
      {/* Hovered Tree Info Panel */}
      {hoveredTree && (
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-[#152e16]/80 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-white max-w-md">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold">{hoveredTree.name}</h3>
              <button 
                onClick={clearHoveredTree}
                className="text-white/70 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <p className="text-white/80">Planted by: {hoveredTree.planter_name}</p>
            <p className="text-white/80">Type: {hoveredTree.tree_type_display || hoveredTree.tree_type}</p>
            <p className="text-white/60 text-sm">
              Position: ({hoveredTree.position_x?.toFixed(1)}, {hoveredTree.position_z?.toFixed(1)})
            </p>
            {isCameraMoving && (
              <p className="text-primary text-sm mt-2">🔄 Focusing on tree...</p>
            )}
          </div>
        </div>
      )}
      
      {/* Search Interface */}
      <div className="absolute top-6 right-6 w-full max-w-sm z-10">
        <div className="flex flex-col gap-2">
          <SearchBar 
            value={searchQuery}
            onChange={handleSearchChange}
            onClear={handleClearSearch}
            placeholder="Search for trees or users..."
          />
          
          {searchQuery && (
            <SearchResults 
              results={searchResults}
              onItemClick={handleSearchItemClick}
            />
          )}
        </div>
      </div>
      
      {/* Instructions */}
      <div className="absolute bottom-6 left-6 z-10">
        <div className="bg-[#152e16]/80 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-white">
          <p className="text-sm">🎮 Drag to rotate • Scroll to zoom</p>
          <p className="text-sm">🌳 Hover over trees to focus camera</p>
          <p className="text-sm mt-1">📊 {allTrees.length} trees in the forest</p>
        </div>
      </div>

      {/* Refresh Button */}
      <div className="absolute bottom-6 right-6 z-10">
        <button
          onClick={fetchAllTrees}
          className="bg-[#152e16]/80 backdrop-blur-sm border border-white/10 rounded-lg p-3 text-white hover:bg-[#152e16] transition-colors"
          title="Refresh forest"
        >
          <span className="material-symbols-outlined">refresh</span>
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="absolute top-20 left-6 z-10">
          <div className="bg-red-500/80 backdrop-blur-sm border border-red-300 rounded-lg p-4 text-white">
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}