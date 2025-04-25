import { useState } from 'react';
import { Doctor } from '@/types/doctor';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Phone, Mail, Award, DollarSign, Video, User } from 'lucide-react';
import { useFallbackImage } from '@/hooks/use-fallback-image';

interface DoctorProfileCardProps {
  doctor: Doctor;
  isOpen: boolean;
  onClose: () => void;
}

const DoctorProfileCard = ({ doctor, isOpen, onClose }: DoctorProfileCardProps) => {
  const { hasError, handleError } = useFallbackImage();
  // Mock data for the profile (in a real app, this would come from the API)
  const mockAvailability = [
    { day: 'Monday', hours: '9:00 AM - 5:00 PM' },
    { day: 'Tuesday', hours: '9:00 AM - 5:00 PM' },
    { day: 'Wednesday', hours: '9:00 AM - 5:00 PM' },
    { day: 'Thursday', hours: '9:00 AM - 5:00 PM' },
    { day: 'Friday', hours: '9:00 AM - 5:00 PM' },
  ];

  const mockContact = {
    phone: '+91 98765 43210',
    email: `dr.${doctor.name.toLowerCase().replace(' ', '.')}@campus-medical.com`,
    address: 'Campus Medical Center, Building 4, Room 101'
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] overflow-y-auto max-h-[90vh] animate-scale-in">
        <DialogHeader>
          <div className="flex items-center gap-4">
            {doctor.image && !hasError ? (
              <div className="h-24 w-24 rounded-full bg-medical-50 flex items-center justify-center overflow-hidden shadow-md border-2 border-medical-100 animate-pulse-gentle">
                <img 
                  src={doctor.image} 
                  alt={`Dr. ${doctor.name}`} 
                  className="h-full w-full object-cover"
                  onError={handleError}
                />
              </div>
            ) : (
              <div className="h-24 w-24 rounded-full bg-gradient-to-r from-medical-400 to-medical-600 flex items-center justify-center text-white text-xl font-bold animate-pulse-gentle">
                {doctor.name.charAt(0)}
              </div>
            )}
            <div>
              <DialogTitle className="text-2xl font-bold text-medical-900 animate-slide-down">
                Dr. {doctor.name}
              </DialogTitle>
              <DialogDescription className="text-medical-700 animate-slide-down" style={{ animationDelay: '50ms' }}>
                {doctor.speciality && doctor.speciality.length > 0 
                  ? doctor.speciality.join(', ')
                  : 'General Practitioner'}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          {/* Experience and Fees */}
          <div className="grid grid-cols-2 gap-4 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="bg-medical-50 p-4 rounded-lg flex flex-col items-center justify-center hover:bg-medical-100 transition-colors">
              <Award className="text-medical-600 mb-2" />
              <div className="text-sm text-gray-500">Experience</div>
              <div className="font-semibold text-medical-900">{doctor.experience} years</div>
            </div>
            <div className="bg-medical-50 p-4 rounded-lg flex flex-col items-center justify-center hover:bg-medical-100 transition-colors">
              <DollarSign className="text-medical-600 mb-2" />
              <div className="text-sm text-gray-500">Consultation Fee</div>
              <div className="font-semibold text-medical-900">₹{doctor.fee}</div>
            </div>
          </div>
          
          {/* Consultation Types */}
          <div className="animate-fade-in" style={{ animationDelay: '150ms' }}>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Available Consultation Types</h4>
            <div className="flex flex-wrap gap-2">
              {doctor.moc && doctor.moc.map((consultType, index) => (
                <div 
                  key={index}
                  className={`px-3 py-2 rounded-md flex items-center gap-2 ${
                    consultType === 'Video Consult' 
                      ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                      : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                  } transition-colors`}
                >
                  {consultType === 'Video Consult' ? <Video size={16} /> : <User size={16} />}
                  {consultType}
                </div>
              ))}
            </div>
          </div>
          
          {/* Availability */}
          <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Availability</h4>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              {mockAvailability.map((slot, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-medical-600" />
                    <span className="text-sm font-medium">{slot.day}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-medical-600" />
                    <span className="text-sm">{slot.hours}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="animate-fade-in" style={{ animationDelay: '250ms' }}>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Contact Information</h4>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-medical-600" />
                <span className="text-sm">{mockContact.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-medical-600" />
                <span className="text-sm">{mockContact.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-medical-600" />
                <span className="text-sm">{mockContact.address}</span>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="mt-6 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <Button 
            variant="outline" 
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Close
          </Button>
          <Button 
            className="w-full sm:w-auto bg-gradient-to-r from-medical-500 to-medical-700 hover:from-medical-600 hover:to-medical-800 transition-all duration-300"
          >
            Book Appointment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DoctorProfileCard;