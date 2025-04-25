
import { Doctor } from '@/types/doctor';
import { Card, CardContent } from '@/components/ui/card';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <Card 
      data-testid="doctor-card"
      className="overflow-hidden hover:shadow-md transition-shadow duration-200"
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="h-20 w-20 rounded-full bg-medical-100 flex items-center justify-center text-medical-700 text-xl font-bold">
            {doctor.name.charAt(0)}
          </div>
          
          <div className="flex-1">
            <h3 
              data-testid="doctor-name"
              className="text-lg font-semibold text-gray-900 mb-1"
            >
              Dr. {doctor.name}
            </h3>
            
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
                  className={`px-2 py-1 text-xs rounded-full ${
                    consultType === 'Video Consult' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
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
  );
};

export default DoctorCard;
