import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import PostCard from '../components/PostCard';
import FilterBar from '../components/FilterBar';
import {Post} from '../models/Post';
import {Filters} from '../models/Filters';
import Navbar from '@/components/Navbar';

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [residenceOptions, setResidenceOptions] = useState<string[]>([]);
  const [filters, setFilters] = useState<Filters>({
    category: '',
    residence: '',
    roomType: '',
    gender: '',
    minAge: '',
    duration: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const residences = await api.get('/residences')
        setResidenceOptions(residences.data.residenceOptions)
        const response = await api.get('/posts', { params: filters });
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, [filters]);

  return (
    <div>
        <Navbar/>
        <FilterBar filters={filters} residenceOptions={residenceOptions} setFilters={setFilters} />
        <div className="post-feed">
        {posts.map((post) => (
            <PostCard key={post._id} post={post} />
        ))}
        </div>
    </div>
  );
};

export default HomePage;