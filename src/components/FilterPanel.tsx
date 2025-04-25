
import { ConsultationType, SortType } from '@/types/doctor';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Video, User, DollarSign, Award, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface FilterPanelProps {
  consultationType: ConsultationType | null;
  onConsultationChange: (type: ConsultationType) => void;
  specialties: string[];
  availableSpecialties: string[];
  onSpecialtyChange: (specialty: string) => void;
  sortBy: SortType | null;
  onSortChange: (sort: SortType) => void;
}

const FilterPanel = ({
  consultationType,
  onConsultationChange,
  specialties,
  availableSpecialties,
  onSpecialtyChange,
  sortBy,
  onSortChange
}: FilterPanelProps) => {
  // Count active filters
  const activeFiltersCount = (consultationType ? 1 : 0) + specialties.length + (sortBy ? 1 : 0);
  
  return (
    <div className="space-y-6">
      {/* Filter Summary */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-medical-600" />
            <span className="font-medium text-gray-700">Filters</span>
          </div>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="bg-medical-100 text-medical-800 hover:bg-medical-200">
              {activeFiltersCount} active
            </Badge>
          )}
        </div>
      </div>
      
      {/* Consultation Mode Filter */}
      <Card className="border-none shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
        <CardHeader className="pb-3 bg-gradient-to-r from-medical-50 to-white">
          <CardTitle data-testid="filter-header-moc" className="text-lg font-semibold flex items-center gap-2 text-medical-800">
            <span className="bg-medical-100 p-1.5 rounded-full">
              <Video size={16} className="text-medical-600" />
            </span>
            Consultation Mode
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <RadioGroup 
            value={consultationType || ""} 
            onValueChange={(value) => onConsultationChange(value as ConsultationType)}
          >
            <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50 transition-colors">
              <RadioGroupItem 
                value="Video Consult" 
                id="video-consult"
                data-testid="filter-video-consult"
                className="text-medical-600 border-medical-300 focus:ring-medical-500"
              />
              <Label htmlFor="video-consult" className="flex items-center gap-2 cursor-pointer">
                <Video size={16} className="text-green-600" />
                <span>Video Consult</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2 mt-2 p-2 rounded-md hover:bg-gray-50 transition-colors">
              <RadioGroupItem 
                value="In Clinic" 
                id="in-clinic"
                data-testid="filter-in-clinic"
                className="text-medical-600 border-medical-300 focus:ring-medical-500"
              />
              <Label htmlFor="in-clinic" className="flex items-center gap-2 cursor-pointer">
                <User size={16} className="text-blue-600" />
                <span>In Clinic</span>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
      
      {/* Specialties Filter */}
      <Card className="border-none shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
        <CardHeader className="pb-3 bg-gradient-to-r from-medical-50 to-white">
          <CardTitle data-testid="filter-header-speciality" className="text-lg font-semibold flex items-center gap-2 text-medical-800">
            <span className="bg-medical-100 p-1.5 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-medical-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </span>
            Speciality
          </CardTitle>
          {specialties.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {specialties.length > 0 && (
                <Badge variant="outline" className="bg-medical-50 text-medical-700 border-medical-200">
                  {specialties.length} selected
                </Badge>
              )}
            </div>
          )}
        </CardHeader>
        <CardContent className="max-h-[300px] overflow-y-auto custom-scrollbar pt-4">
          <div className="space-y-1">
            {availableSpecialties.map((specialty, index) => (
              <div 
                key={specialty} 
                className={`flex items-center space-x-2 p-2 rounded-md transition-colors ${
                  specialties.includes(specialty) 
                    ? 'bg-medical-50' 
                    : 'hover:bg-gray-50'
                }`}
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <Checkbox 
                  id={`specialty-${specialty}`}
                  data-testid={`filter-specialty-${specialty}`}
                  checked={specialties.includes(specialty)}
                  onCheckedChange={() => onSpecialtyChange(specialty)}
                  className={specialties.includes(specialty) ? 'text-medical-600 border-medical-400' : ''}
                />
                <Label 
                  htmlFor={`specialty-${specialty}`}
                  className={`cursor-pointer ${specialties.includes(specialty) ? 'font-medium text-medical-800' : ''}`}
                >
                  {specialty}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Sort Filter */}
      <Card className="border-none shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
        <CardHeader className="pb-3 bg-gradient-to-r from-medical-50 to-white">
          <CardTitle data-testid="filter-header-sort" className="text-lg font-semibold flex items-center gap-2 text-medical-800">
            <span className="bg-medical-100 p-1.5 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-medical-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
            </span>
            Sort By
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <RadioGroup 
            value={sortBy || ""}
            onValueChange={(value) => onSortChange(value as SortType)}
          >
            <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50 transition-colors">
              <RadioGroupItem 
                value="fees" 
                id="sort-fees"
                data-testid="sort-fees"
                className="text-medical-600 border-medical-300 focus:ring-medical-500"
              />
              <Label htmlFor="sort-fees" className="flex items-center gap-2 cursor-pointer">
                <DollarSign size={16} className="text-medical-600" />
                <span>Fees (low to high)</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2 mt-2 p-2 rounded-md hover:bg-gray-50 transition-colors">
              <RadioGroupItem 
                value="experience" 
                id="sort-experience"
                data-testid="sort-experience"
                className="text-medical-600 border-medical-300 focus:ring-medical-500"
              />
              <Label htmlFor="sort-experience" className="flex items-center gap-2 cursor-pointer">
                <Award size={16} className="text-medical-600" />
                <span>Experience (high to low)</span>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
};

export default FilterPanel;
