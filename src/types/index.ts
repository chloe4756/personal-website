
export interface Experience {
  id: string;
  company: string;
  startDate: string;
  endDate: string;
  location: string;
  skills: string[];
  boardingPassNumber: string;
  seat: string;
  header: string;
  label: string;
}

export interface BoardingPassProps {
  experience: Experience;
  isActive?: boolean;
  stackPosition?: number;
}