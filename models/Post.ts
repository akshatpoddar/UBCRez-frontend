import { User } from './User';
import { Residence } from './Residence';

export interface Post {
    _id: string;
    title: string;
    description: string;
    author: User;
    category: 'Sublet' | 'Room Switch';
    rent?: number;
    gender: string[];
    residence: Residence;
    startDate: Date;
    endDate: Date;
  }

  export interface SubletPost extends Post {
    category: 'Sublet'; // Discriminator value
    rent: number;
    duration: {
      startDate: Date;
      endDate: Date;
    }
  }

  export interface SwitchPost extends Post {
    category: 'Room Switch'; // Discriminator value
  }