// models/Residence.ts
export interface Residence {
    _id: string;
    name: string;
    roomType: string;
    ageRestriction?: number; // Age restriction for residence (e.g., 19+)
  }
  