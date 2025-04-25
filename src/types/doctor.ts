
export interface Doctor {
  id: string;
  name: string;
  speciality: string[];
  experience: number;
  fee: number;
  moc: ConsultationType[];
  image?: string;
}

export type ConsultationType = 'Video Consult' | 'In Clinic';
export type SortType = 'fees' | 'experience';
