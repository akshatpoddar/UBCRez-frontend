import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import PostCard from '../components/PostCard';
import FilterBar from '../components/FilterBar';
import {Post} from '../models/Post';
import {Filter} from '../models/Filter';
import Navbar from '@/components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/userSlice';
import { RootState } from '../store';
import { UserState } from '../store/userSlice';

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [residenceOptions, setResidenceOptions] = useState<string[]>([]);
  const [filters, setFilters] = useState<Filter>({
    author: '',
    category: '',
    residence: '',
    roomType: '',
    gender: '',
    minAge: '',
  });

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() =>{
    console.log(user)
  }, [user])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await api.get('/auth/whoami', { withCredentials: true });
        const user = userResponse.data.user
        const isLoggedIn = userResponse.data.user !== null
        console.log('settng user')
        const state:UserState = { user: user, isLoggedIn: isLoggedIn }
        dispatch(setUser(state));
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, [dispatch]);

  // Fetch posts and residences based on filters
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const residences = await api.get('/residences');
        setResidenceOptions(residences.data.residenceOptions);
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