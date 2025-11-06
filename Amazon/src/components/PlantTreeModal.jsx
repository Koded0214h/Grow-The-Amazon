import { useState } from 'react';
import { treeAPI } from '../utils/api';
import { useNavigate } from 'react-router-dom';

// Tree type options
const TREE_TYPES = [
  { value: 'KAPOK', label: '🌳 Kapok Tree', color: '#22C55E' },
  { value: 'MAHOGANY', label: '🌲 Mahogany Tree', color: '#16A34A' },
  { value: 'RUBBER', label: '🌴 Rubber Tree', color: '#15803D' },
  { value: 'BRAZIL_NUT', label: '🌰 Brazil Nut Tree', color: '#CA8A04' },
  { value: 'ACAI', label: '🍇 Açaí Palm', color: '#DC2626' },
  { value: 'COCOA', label: '🍫 Cocoa Tree', color: '#7C2D12' },
  { value: 'ROSEWOOD', label: '🎻 Rosewood', color: '#BE123C' },
  { value: 'ANDEAN_ALDER', label: '🏔️ Andean Alder', color: '#0EA5E9' },
  { value: 'IRONWOOD', label: '⚙️ Ironwood', color: '#57534E' },
  { value: 'CECROPIA', label: '🌿 Cecropia', color: '#65A30D' },
];

export default function PlantTreeModal({ isOpen, onClose, onTreePlanted, isMobile }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: '',
    treeName: '',
    treeType: 'KAPOK'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.userName.trim() || !formData.treeName.trim()) {
      setError('Please fill in both name fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const newTree = await treeAPI.plantTree(formData.userName, formData.treeName, formData.treeType);
      onTreePlanted(newTree);
      setFormData({ userName: '', treeName: '', treeType: 'KAPOK' });
      onClose();
      navigate('/forest');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const getTreeTypeColor = (type) => {
    const treeType = TREE_TYPES.find(t => t.value === type);
    return treeType ? treeType.color : '#22C55E';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Blurred Background */}
      <div className="absolute inset-0 bg-background-dark/90 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal Content */}
      <div className={`relative bg-background-light dark:bg-[#111811] rounded-xl sm:rounded-2xl shadow-2xl ${
        isMobile ? 'w-full max-w-sm p-4' : 'w-full max-w-lg p-6 md:p-8'
      } z-10 max-h-[90vh] overflow-y-auto`}>
        
        {/* Close Button */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
          <button onClick={onClose} className="p-1 sm:p-2 text-stone-500 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-xl sm:text-2xl">close</span>
          </button>
        </div>

        {/* Header */}
        <h1 className={`text-stone-900 dark:text-white font-bold leading-tight text-left pb-2 ${
          isMobile ? 'text-2xl' : 'text-3xl'
        }`}>
          Plant Your Tree
        </h1>

        <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base font-normal leading-normal pb-4 sm:pb-6">
          Give your tree a unique identity and choose its species.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-6">
          {/* Your Name Field */}
          <div className="flex flex-col">
            <label className="flex flex-col w-full">
              <p className="text-stone-900 dark:text-white text-sm sm:text-base font-medium leading-normal pb-2">
                Your Name *
              </p>
              <input 
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded text-stone-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-stone-300 dark:border-[#3b543d] bg-white dark:bg-[#1b271c] focus:border-primary/50 placeholder:text-stone-400 dark:placeholder:text-[#9cba9e] px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-normal leading-normal" 
                placeholder="Enter your first name or a nickname" 
                disabled={loading}
                style={{ height: isMobile ? '48px' : '56px' }}
              />
            </label>
          </div>

          {/* Tree Name Field */}
          <div className="flex flex-col">
            <label className="flex flex-col w-full">
              <p className="text-stone-900 dark:text-white text-sm sm:text-base font-medium leading-normal pb-2">
                Name Your Tree *
              </p>
              <input 
                name="treeName"
                value={formData.treeName}
                onChange={handleChange}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded text-stone-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-stone-300 dark:border-[#3b543d] bg-white dark:bg-[#1b271c] focus:border-primary/50 placeholder:text-stone-400 dark:placeholder:text-[#9cba9e] px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-normal leading-normal" 
                placeholder="Arbor, Yggdrasil, The Guardian..." 
                disabled={loading}
                style={{ height: isMobile ? '48px' : '56px' }}
              />
            </label>
          </div>

          {/* Tree Type Field */}
          <div className="flex flex-col">
            <label className="flex flex-col w-full">
              <p className="text-stone-900 dark:text-white text-sm sm:text-base font-medium leading-normal pb-2">
                Tree Type
              </p>
              <select 
                name="treeType"
                value={formData.treeType}
                onChange={handleChange}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded text-stone-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-stone-300 dark:border-[#3b543d] bg-white dark:bg-[#1b271c] focus:border-primary/50 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-normal leading-normal" 
                disabled={loading}
                style={{ height: isMobile ? '48px' : '56px' }}
              >
                {TREE_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </label>
            <p className="text-stone-500 dark:text-stone-400 text-xs mt-2">
              Selected: <span style={{ color: getTreeTypeColor(formData.treeType) }}>
                {TREE_TYPES.find(t => t.value === formData.treeType)?.label}
              </span>
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-2 sm:pt-4">
            <button 
              type="submit"
              disabled={loading || !formData.userName.trim() || !formData.treeName.trim()}
              className="flex items-center justify-center w-full bg-primary text-background-dark font-bold rounded hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-dark focus:ring-primary disabled:bg-stone-400 dark:disabled:bg-stone-700 disabled:cursor-not-allowed"
              style={{ 
                height: isMobile ? '48px' : '56px',
                fontSize: isMobile ? '16px' : '18px'
              }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-background-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Planting...
                </>
              ) : (
                `Plant ${TREE_TYPES.find(t => t.value === formData.treeType)?.label.split(' ')[1]} Tree`
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}