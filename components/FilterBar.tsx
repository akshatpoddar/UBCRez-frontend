import React from 'react';
import {Post} from '../models/Post';
import {Filters} from '../models/Filters';

interface FilterBarProps {
  filters: Filters;
  residenceOptions: string[];
  setFilters: (filters: Filters) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, residenceOptions, setFilters }) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="filters">
      <select name="category" value={filters.category} onChange={handleFilterChange}>
        <option value="">All Categories</option>
        <option value="Sublet">Sublet</option>
        <option value="Room Switch">Room Switch</option>
      </select>
      <select name="residence" value={filters.residence} onChange={handleFilterChange}>
        <option value="">All Residences</option>
          {residenceOptions.map((residence, index) => (
            <option key={index} value={residence}>
              {residence}
            </option>
          ))}
      </select>
      <input name="roomType" value={filters.roomType} onChange={handleFilterChange} placeholder="Room Type" />
      <select name="gender" value={filters.gender} onChange={handleFilterChange}>
        <option value="">Any Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <input type="number" name="minAge" value={filters.minAge} onChange={handleFilterChange} placeholder="Minimum Age" />
      <input name="duration" value={filters.duration} onChange={handleFilterChange} placeholder="Duration" />
      <input type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} placeholder="Start Date" />
      <input type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} placeholder="End Date" />
    </div>
  );
};

export default FilterBar;
