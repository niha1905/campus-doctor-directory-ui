
import { useState } from 'react';
import { Doctor } from '@/types/doctor';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import DoctorProfileCard from './DoctorProfileCard';
import { useFallbackImage } from '@/hooks/use-fallback-image';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { hasError, handleError } = useFallbackImage();

  return (
    <>
      <Card 
        data-testid="doctor-card"
        className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-l-medical-500 animate-fade-in"
        onClick={() => setIsProfileOpen(true)}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            {doctor.image && !hasError ? (
              <div className="h-20 w-20 rounded-full bg-medical-50 flex items-center justify-center overflow-hidden shadow-md border-2 border-medical-100">
                <img 
                  src={doctor.image} 
                  alt={`Dr. ${doctor.name}`} 
                  className="h-full w-full object-cover"
                  onError={handleError}
                />
              </div>
            ) : (
              <div className="h-20 w-20 rounded-full bg-gradient-to-r from-medical-400 to-medical-600 flex items-center justify-center text-white text-xl font-bold shadow-md">
                {doctor.name.charAt(0)}
              </div>
            )}
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 
                  data-testid="doctor-name"
                  className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-medical-700 transition-colors"
                >
                  Dr. {doctor.name}
                </h3>
                <ChevronRight className="text-medical-500 opacity-70 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div 
                data-testid="doctor-specialty"
                className="text-sm text-gray-600 mb-2"
              >
                {doctor.speciality && doctor.speciality.length > 0 
                  ? doctor.speciality.join(', ')
                  : 'No speciality listed'}
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-500">Experience:</span>
                  <span 
                    data-testid="doctor-experience"
                    className="ml-1 text-sm text-gray-900"
                  >
                    {doctor.experience} years
                  </span>
                </div>
                
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-500">Fees:</span>
                  <span 
                    data-testid="doctor-fee"
                    className="ml-1 text-sm text-gray-900"
                  >
                    ₹{doctor.fee}
                  </span>
                </div>
              </div>
              
              <div className="mt-3 flex flex-wrap gap-2">
                {doctor.moc && doctor.moc.map((consultType, index) => (
                  <span 
                    key={index}
                    className={`px-2 py-1 text-xs rounded-full transition-all duration-300 ${
                      consultType === 'Video Consult' 
                        ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                        : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                    }`}
                  >
                    {consultType}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <DoctorProfileCard 
        doctor={doctor} 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
      />
    </>
  );
};

export default DoctorCard;
