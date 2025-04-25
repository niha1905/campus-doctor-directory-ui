
import { ConsultationType, SortType } from '@/types/doctor';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
  return (
    <div className="space-y-6">
      {/* Consultation Mode Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle data-testid="filter-header-moc" className="text-lg font-semibold">
            Consultation Mode
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={consultationType || ""} 
            onValueChange={(value) => onConsultationChange(value as ConsultationType)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem 
                value="Video Consult" 
                id="video-consult"
                data-testid="filter-video-consult"
              />
              <Label htmlFor="video-consult">Video Consult</Label>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <RadioGroupItem 
                value="In Clinic" 
                id="in-clinic"
                data-testid="filter-in-clinic"
              />
              <Label htmlFor="in-clinic">In Clinic</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
      
      {/* Specialties Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle data-testid="filter-header-speciality" className="text-lg font-semibold">
            Speciality
          </CardTitle>
        </CardHeader>
        <CardContent className="max-h-[300px] overflow-y-auto">
          <div className="space-y-2">
            {availableSpecialties.map((specialty) => (
              <div key={specialty} className="flex items-center space-x-2">
                <Checkbox 
                  id={`specialty-${specialty}`}
                  data-testid={`filter-specialty-${specialty}`}
                  checked={specialties.includes(specialty)}
                  onCheckedChange={() => onSpecialtyChange(specialty)}
                />
                <Label htmlFor={`specialty-${specialty}`}>{specialty}</Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Sort Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle data-testid="filter-header-sort" className="text-lg font-semibold">
            Sort
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={sortBy || ""}
            onValueChange={(value) => onSortChange(value as SortType)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem 
                value="fees" 
                id="sort-fees"
                data-testid="sort-fees"
              />
              <Label htmlFor="sort-fees">Fees (low to high)</Label>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <RadioGroupItem 
                value="experience" 
                id="sort-experience"
                data-testid="sort-experience"
              />
              <Label htmlFor="sort-experience">Experience (high to low)</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
};

export default FilterPanel;
