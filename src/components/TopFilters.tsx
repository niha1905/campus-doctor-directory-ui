import { ConsultationType, SortType } from '@/types/doctor';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Video, 
  User, 
  ArrowDownAZ, 
  ArrowUpDown, 
  DollarSign, 
  Award, 
  X,
  Filter as FilterIcon
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from 'react';

interface TopFiltersProps {
  consultationType: ConsultationType | null;
  onConsultationChange: (type: ConsultationType) => void;
  specialties: string[];
  availableSpecialties: string[];
  onSpecialtyChange: (specialty: string) => void;
  sortBy: SortType | null;
  onSortChange: (sort: SortType) => void;
  onClearAll: () => void;
}

const TopFilters = ({
  consultationType,
  onConsultationChange,
  specialties,
  availableSpecialties,
  onSpecialtyChange,
  sortBy,
  onSortChange,
  onClearAll
}: TopFiltersProps) => {
  const [specialtyDropdownOpen, setSpecialtyDropdownOpen] = useState(false);
  
  // Count active filters
  const activeFiltersCount = (consultationType ? 1 : 0) + specialties.length + (sortBy ? 1 : 0);
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-3 mb-6 animate-slide-down">
      <div className="flex flex-wrap items-center gap-3">
        {/* Filter Label */}
        <div className="flex items-center gap-1 text-gray-500 mr-1">
          <FilterIcon size={16} />
          <span className="text-sm font-medium">Filters:</span>
        </div>
        
        {/* Consultation Type Buttons */}
        <Button
          variant={consultationType === 'Video Consult' ? 'default' : 'outline'}
          size="sm"
          className={`rounded-full ${
            consultationType === 'Video Consult' 
              ? 'bg-green-100 text-green-800 hover:bg-green-200 border-green-200' 
              : 'hover:bg-gray-100 border-gray-200'
          }`}
          onClick={() => onConsultationChange('Video Consult')}
        >
          <Video size={14} className="mr-1" />
          Video Consult
        </Button>
        
        <Button
          variant={consultationType === 'In Clinic' ? 'default' : 'outline'}
          size="sm"
          className={`rounded-full ${
            consultationType === 'In Clinic' 
              ? 'bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200' 
              : 'hover:bg-gray-100 border-gray-200'
          }`}
          onClick={() => onConsultationChange('In Clinic')}
        >
          <User size={14} className="mr-1" />
          In Clinic
        </Button>
        
        {/* Specialties Dropdown */}
        <DropdownMenu open={specialtyDropdownOpen} onOpenChange={setSpecialtyDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={`rounded-full ${
                specialties.length > 0 
                  ? 'bg-medical-100 text-medical-800 hover:bg-medical-200 border-medical-200' 
                  : 'hover:bg-gray-100 border-gray-200'
              }`}
            >
              <ArrowDownAZ size={14} className="mr-1" />
              Specialties
              {specialties.length > 0 && (
                <Badge 
                  variant="secondary" 
                  className="ml-1 bg-medical-200 text-medical-800 hover:bg-medical-300"
                >
                  {specialties.length}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 max-h-[300px] overflow-y-auto">
            <DropdownMenuLabel>Select Specialties</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {availableSpecialties.map((specialty) => (
                <DropdownMenuItem 
                  key={specialty}
                  className={`flex items-center gap-2 cursor-pointer ${
                    specialties.includes(specialty) ? 'bg-medical-50' : ''
                  }`}
                  onClick={() => onSpecialtyChange(specialty)}
                >
                  <input 
                    type="checkbox" 
                    checked={specialties.includes(specialty)} 
                    readOnly 
                    className="rounded text-medical-600 focus:ring-medical-500"
                  />
                  <span>{specialty}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* Sort Buttons */}
        <Button
          variant={sortBy === 'fees' ? 'default' : 'outline'}
          size="sm"
          className={`rounded-full ${
            sortBy === 'fees' 
              ? 'bg-medical-100 text-medical-800 hover:bg-medical-200 border-medical-200' 
              : 'hover:bg-gray-100 border-gray-200'
          }`}
          onClick={() => onSortChange('fees')}
        >
          <DollarSign size={14} className="mr-1" />
          Fees: Low to High
        </Button>
        
        <Button
          variant={sortBy === 'experience' ? 'default' : 'outline'}
          size="sm"
          className={`rounded-full ${
            sortBy === 'experience' 
              ? 'bg-medical-100 text-medical-800 hover:bg-medical-200 border-medical-200' 
              : 'hover:bg-gray-100 border-gray-200'
          }`}
          onClick={() => onSortChange('experience')}
        >
          <Award size={14} className="mr-1" />
          Experience: High to Low
        </Button>
        
        {/* Clear All Button */}
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-gray-700 ml-auto"
            onClick={onClearAll}
          >
            <X size={14} className="mr-1" />
            Clear All
          </Button>
        )}
      </div>
      
      {/* Active Specialty Tags */}
      {specialties.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3 pl-1">
          {specialties.map(specialty => (
            <Badge 
              key={specialty}
              variant="secondary"
              className="bg-medical-50 text-medical-700 hover:bg-medical-100 cursor-pointer"
              onClick={() => onSpecialtyChange(specialty)}
            >
              {specialty}
              <X size={12} className="ml-1" />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopFilters;