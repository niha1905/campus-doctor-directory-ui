
import { useState, useEffect, useMemo } from 'react';
import { Doctor, ConsultationType, SortType } from '../types/doctor';

const API_URL = 'https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json';

export function useDoctors(
  searchQuery: string = '',
  selectedConsultation: ConsultationType | null = null,
  selectedSpecialties: string[] = [],
  sortBy: SortType | null = null
) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [allSpecialties, setAllSpecialties] = useState<string[]>([]);

  // Fetch doctors data
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch doctors');
        }
        const data = await response.json();
        setDoctors(data);
        
        // Extract all unique specialities
        const specialties = new Set<string>();
        data.forEach((doctor: Doctor) => {
          doctor.speciality.forEach((spec: string) => specialties.add(spec));
        });
        setAllSpecialties(Array.from(specialties).sort());
        
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Get suggestions for autocomplete
  const getSuggestions = (query: string): string[] => {
    if (!query) return [];
    
    const matches = doctors
      .filter(doctor => 
        doctor.name.toLowerCase().includes(query.toLowerCase()))
      .map(doctor => doctor.name)
      .slice(0, 3);
      
    return matches;
  };

  // Filter and sort doctors
  const filteredDoctors = useMemo(() => {
    return doctors
      .filter(doctor => {
        // Filter by search query
        if (searchQuery && !doctor.name.toLowerCase().includes(searchQuery.toLowerCase())) {
          return false;
        }
        
        // Filter by consultation type
        if (selectedConsultation && !doctor.moc.includes(selectedConsultation)) {
          return false;
        }
        
        // Filter by specialties
        if (selectedSpecialties.length > 0) {
          return selectedSpecialties.some(specialty => 
            doctor.speciality.includes(specialty)
          );
        }
        
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'fees') {
          return a.fee - b.fee; // ascending
        } 
        if (sortBy === 'experience') {
          return b.experience - a.experience; // descending
        }
        return 0;
      });
  }, [doctors, searchQuery, selectedConsultation, selectedSpecialties, sortBy]);

  return {
    doctors: filteredDoctors,
    allDoctors: doctors,
    allSpecialties,
    loading,
    error,
    getSuggestions
  };
}
