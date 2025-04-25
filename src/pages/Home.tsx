import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, Video, User, Calendar, Award, MapPin } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/doctors${searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ''}`);
  };

  // Popular specialties for quick access
  const popularSpecialties = [
    { name: 'Cardiology', icon: '❤️' },
    { name: 'Neurology', icon: '🧠' },
    { name: 'Pediatrics', icon: '👶' },
    { name: 'Orthopedics', icon: '🦴' },
    { name: 'Dermatology', icon: '🧬' },
    { name: 'Ophthalmology', icon: '👁️' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with Navbar */}
      <section className="bg-gradient-to-r from-medical-700 to-medical-900 text-white">
        {/* Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                <span className="ml-2 text-xl font-bold text-white">Campus Doctor</span>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-4">
              {['Home', 'Doctors', 'Specialties', 'About', 'Contact'].map((link, index) => (
                <a
                  key={link}
                  href={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                  className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-white/10 transition-colors"
                >
                  {link}
                </a>
              ))}
              <Button className="ml-4 bg-white text-medical-800 hover:bg-medical-50">
                Emergency
              </Button>
            </div>
            
            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight animate-slide-down">
                Find the Best Campus Doctors for Your Health Needs
              </h1>
              <p className="text-xl text-medical-100 max-w-lg animate-slide-down" style={{ animationDelay: '100ms' }}>
                Connect with top healthcare professionals on campus for consultations, treatments, and medical advice.
              </p>
              
              <form onSubmit={handleSearch} className="relative max-w-xl animate-slide-down" style={{ animationDelay: '200ms' }}>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full p-4 pl-12 pr-32 rounded-full border-2 border-white/30 bg-white/20 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg"
                    placeholder="Search doctors by name or specialty..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-4 top-4 text-white/70" size={20} />
                  <Button 
                    type="submit"
                    className="absolute right-2 top-2 bg-white text-medical-800 hover:bg-medical-50 rounded-full px-6"
                  >
                    Search
                  </Button>
                </div>
              </form>
              
              <div className="flex flex-wrap gap-3 animate-slide-down" style={{ animationDelay: '300ms' }}>
                <span className="text-medical-200 mr-2">Popular:</span>
                {popularSpecialties.map((specialty, index) => (
                  <Button
                    key={specialty.name}
                    variant="outline"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-full text-sm px-4"
                    onClick={() => navigate(`/doctors?specialty=${encodeURIComponent(specialty.name)}`)}
                  >
                    <span className="mr-1">{specialty.icon}</span> {specialty.name}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="hidden lg:block animate-fade-in" style={{ animationDelay: '400ms' }}>
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-64 h-64 bg-medical-400/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-medical-600/20 rounded-full blur-3xl"></div>
                <div className="relative z-10 rounded-2xl shadow-2xl overflow-hidden h-[500px] w-full bg-gradient-to-r from-medical-800 to-medical-900">
                  <img 
                    src="https://img.freepik.com/free-photo/team-young-specialist-doctors-standing-corridor-hospital_1303-21199.jpg" 
                    alt="Campus Doctors" 
                    className="object-cover h-full w-full opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-medical-900/80 to-transparent"></div>
                  
                  {/* Doctor profile circles */}
                  <div className="absolute bottom-8 left-8 flex -space-x-4">
                    {[
                      'https://randomuser.me/api/portraits/women/44.jpg',
                      'https://randomuser.me/api/portraits/men/32.jpg',
                      'https://randomuser.me/api/portraits/women/68.jpg',
                      'https://randomuser.me/api/portraits/men/75.jpg'
                    ].map((img, i) => (
                      <div 
                        key={i} 
                        className="w-16 h-16 rounded-full border-2 border-white overflow-hidden animate-bounce-gentle"
                        style={{ animationDelay: `${i * 200}ms` }}
                      >
                        <img src={img} alt="Doctor" className="w-full h-full object-cover" />
                      </div>
                    ))}
                    <div className="w-16 h-16 rounded-full bg-medical-600 border-2 border-white flex items-center justify-center text-white font-bold animate-bounce-gentle" style={{ animationDelay: '800ms' }}>
                      +24
                    </div>
                  </div>
                  
                  <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg animate-fade-in" style={{ animationDelay: '500ms' }}>
                    <div className="text-xs text-gray-500">Trusted by</div>
                    <div className="text-lg font-bold text-medical-900">2,500+ Students</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Campus Doctor Directory</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We connect you with the best healthcare professionals on campus, making it easy to find the right doctor for your needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Video className="h-8 w-8 text-medical-600" />,
                title: "Video Consultations",
                description: "Connect with doctors remotely through secure video consultations from the comfort of your room."
              },
              {
                icon: <User className="h-8 w-8 text-medical-600" />,
                title: "In-Person Visits",
                description: "Schedule face-to-face appointments with doctors at the campus medical center."
              },
              {
                icon: <Calendar className="h-8 w-8 text-medical-600" />,
                title: "Easy Scheduling",
                description: "Book appointments quickly and receive instant confirmations for your medical consultations."
              },
              {
                icon: <Award className="h-8 w-8 text-medical-600" />,
                title: "Experienced Specialists",
                description: "Access a network of highly qualified and experienced healthcare professionals."
              },
              {
                icon: <MapPin className="h-8 w-8 text-medical-600" />,
                title: "Convenient Location",
                description: "All doctors are located on or near campus for easy access to healthcare services."
              },
              {
                icon: <Search className="h-8 w-8 text-medical-600" />,
                title: "Advanced Search",
                description: "Find doctors by specialty, experience, consultation type, and more with our filtering system."
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300 border border-gray-100 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-medical-50 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-medical-500 to-medical-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your Doctor?</h2>
          <p className="text-xl text-medical-100 max-w-3xl mx-auto mb-8">
            Browse our comprehensive directory of campus doctors and book your appointment today.
          </p>
          <Button 
            onClick={() => navigate('/doctors')}
            size="lg"
            className="bg-white text-medical-800 hover:bg-medical-50 rounded-full px-8 py-6 text-lg font-medium animate-bounce-gentle"
          >
            View All Doctors
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Campus Doctor Directory</h3>
              <p className="mb-4">
                Connecting students and staff with quality healthcare professionals on campus.
              </p>
              <p className="text-medical-300">© {new Date().getFullYear()} Campus Medical Center</p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['Home', 'Doctors', 'Specialties', 'About Us', 'Contact'].map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-medical-300 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Emergency Contact</h4>
              <p className="mb-2">Campus Medical Center</p>
              <p className="mb-2">Emergency Helpline: <span className="text-medical-300">+91 1234 567890</span></p>
              <p>Email: <span className="text-medical-300">emergency@campus-medical.com</span></p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;