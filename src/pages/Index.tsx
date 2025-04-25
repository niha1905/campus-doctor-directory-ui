
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ConsultationType, SortType } from '@/types/doctor';
import { useDoctors } from '@/hooks/use-doctors';
import SearchBar from '@/components/SearchBar';
import FilterPanel from '@/components/FilterPanel';
import DoctorCard from '@/components/DoctorCard';
import { toast } from '@/components/ui/sonner';

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
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-medical-900">Campus Doctor Directory</h1>
          </div>
          
          <div className="my-4">
            <SearchBar 
              value={searchQuery}
              onChange={handleSearchChange}
              suggestions={getSuggestions(searchQuery)}
              onSuggestionClick={handleSuggestionClick}
            />
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters */}
          <div className="md:col-span-1">
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
          
          {/* Doctor list */}
          <div className="md:col-span-3">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-pulse text-medical-500">Loading doctors...</div>
              </div>
            ) : doctors.length > 0 ? (
              <div className="space-y-4">
                <div className="text-sm text-gray-500">
                  {doctors.length} {doctors.length === 1 ? 'doctor' : 'doctors'} found
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {doctors.map(doctor => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64">
                <p className="text-gray-500">No doctors found matching your criteria.</p>
                <button 
                  className="mt-4 text-medical-600 hover:text-medical-800"
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
    </div>
  );
};

export default Index;
