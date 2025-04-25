
import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ConsultationType, SortType } from '@/types/doctor';
import { useDoctors } from '@/hooks/use-doctors';
import SearchBar from '@/components/SearchBar';
import FilterPanel from '@/components/FilterPanel';
import TopFilters from '@/components/TopFilters';
import DoctorCard from '@/components/DoctorCard';
import { toast } from '@/components/ui/sonner';
import { ChevronLeft } from 'lucide-react';

const Index = () => {
  // URL query params
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('search') || '');
  const [consultationType, setConsultationType] = useState<ConsultationType | null>(
    (searchParams.get('consultation') as ConsultationType) || null
  );
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(
    searchParams.getAll('specialty')
  );
  const [sortBy, setSortBy] = useState<SortType | null>(
    (searchParams.get('sort') as SortType) || null
  );

  // Get doctors data with applied filters
  const { 
    doctors, 
    allSpecialties, 
    loading, 
    error, 
    getSuggestions 
  } = useDoctors(searchQuery, consultationType, selectedSpecialties, sortBy);
  
  // Update URL when filters change
  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    
    if (searchQuery) {
      newSearchParams.set('search', searchQuery);
    }
    
    if (consultationType) {
      newSearchParams.set('consultation', consultationType);
    }
    
    selectedSpecialties.forEach(specialty => {
      newSearchParams.append('specialty', specialty);
    });
    
    if (sortBy) {
      newSearchParams.set('sort', sortBy);
    }
    
    setSearchParams(newSearchParams);
  }, [searchQuery, consultationType, selectedSpecialties, sortBy, setSearchParams]);
  
  // Handle search query change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };
  
  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
  };
  
  // Handle consultation type change
  const handleConsultationChange = (type: ConsultationType) => {
    setConsultationType(prev => prev === type ? null : type);
  };
  
  // Handle specialty filter change
  const handleSpecialtyChange = (specialty: string) => {
    setSelectedSpecialties(prev => {
      if (prev.includes(specialty)) {
        return prev.filter(s => s !== specialty);
      } else {
        return [...prev, specialty];
      }
    });
  };
  
  // Handle sort change
  const handleSortChange = (sort: SortType) => {
    setSortBy(prev => prev === sort ? null : sort);
  };

  // Show error toast if API fails
  useEffect(() => {
    if (error) {
      toast.error('Failed to load doctors. Please try again later.');
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-medical-600 to-medical-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 animate-fade-in">
          <Link 
            to="/" 
            className="inline-flex items-center text-medical-100 hover:text-white transition-colors mb-4"
          >
            <ChevronLeft size={16} className="mr-1" />
            Back to Home
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="animate-slide-down">
              <h1 className="text-2xl font-bold text-white">Find Doctors</h1>
              <p className="text-medical-100 mt-1 max-w-2xl text-sm">
                Browse and filter through our directory of campus doctors
              </p>
            </div>
            
            <div className="w-full md:w-1/2 lg:w-1/3 animate-slide-up">
              <SearchBar 
                value={searchQuery}
                onChange={handleSearchChange}
                suggestions={getSuggestions(searchQuery)}
                onSuggestionClick={handleSuggestionClick}
              />
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Top Filters - Mobile and Desktop */}
        <div className="mb-6 animate-slide-down">
          <TopFilters
            consultationType={consultationType}
            onConsultationChange={handleConsultationChange}
            specialties={selectedSpecialties}
            availableSpecialties={allSpecialties}
            onSpecialtyChange={handleSpecialtyChange}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            onClearAll={() => {
              setSearchQuery('');
              setConsultationType(null);
              setSelectedSpecialties([]);
              setSortBy(null);
            }}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Filters - Desktop Only */}
          <div className="hidden md:block md:col-span-1 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="sticky top-4">
              <FilterPanel 
                consultationType={consultationType}
                onConsultationChange={handleConsultationChange}
                specialties={selectedSpecialties}
                availableSpecialties={allSpecialties}
                onSpecialtyChange={handleSpecialtyChange}
                sortBy={sortBy}
                onSortChange={handleSortChange}
              />
            </div>
          </div>
          
          {/* Doctor list */}
          <div className="col-span-1 md:col-span-3 animate-slide-up" style={{ animationDelay: '300ms' }}>
            {loading ? (
              <div className="flex flex-col justify-center items-center h-64 bg-white rounded-lg shadow-sm p-8">
                <div className="w-16 h-16 rounded-full bg-medical-100 animate-pulse-gentle mb-4"></div>
                <div className="text-medical-600 font-medium">Loading doctors...</div>
                <div className="text-sm text-gray-500 mt-2">Please wait while we fetch the best doctors for you</div>
              </div>
            ) : doctors.length > 0 ? (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-4 flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium text-medical-700">{doctors.length}</span> {doctors.length === 1 ? 'doctor' : 'doctors'} found
                  </div>
                </div>
                <div className="space-y-4">
                  {doctors.map((doctor, index) => (
                    <div key={doctor.id} style={{ animationDelay: `${350 + index * 50}ms` }}>
                      <DoctorCard doctor={doctor} />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-sm p-8 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-600 font-medium">No doctors found matching your criteria.</p>
                <p className="text-sm text-gray-500 mt-1 mb-4">Try adjusting your filters for better results</p>
                <button 
                  className="px-4 py-2 bg-medical-500 text-white rounded-md hover:bg-medical-600 transition-colors"
                  onClick={() => {
                    setSearchQuery('');
                    setConsultationType(null);
                    setSelectedSpecialties([]);
                    setSortBy(null);
                  }}
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} Campus Medical Center. All rights reserved.</p>
            <p className="mt-2">For medical emergencies, please call our 24/7 helpline: <span className="text-medical-700">+91 1234 567890</span></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
