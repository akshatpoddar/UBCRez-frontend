'use client'

import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import {User} from '../models/User';
import {Filter} from '../models/Filter';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { useRouter } from 'next/router';

interface UserPost {
  _id: string;
  title: string;
  category: string;
  residence: {
    residenceId: {
      name: string;
    };
    roomType: string;
  };
  rent?: number;
  gender?: string;
  duration?: string;
}

const ProfilePage: React.FC = () => {
  const router = useRouter();
  
  const isLoggedIn = typeof window !== 'undefined' && useSelector((state: RootState) => state.user.isLoggedIn);
  if (!isLoggedIn){
    router.push('/login')
  }
  const user = useSelector((state: RootState) => state.user.user);
  console.log(user)
  console.log(isLoggedIn)

  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<UserPost[]>([]);


  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get('/api/auth/whoami');
        if(!response.data.user){
          throw new Error();
        }
        setUserProfile(response.data.user);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    const fetchUserPosts = async () => {
      try {
        const filter:Filter = {author: userProfile?._id}
        const response = await api.get('/api/posts/', { params: filter });
        setUserPosts(response.data); 
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };

    fetchUserProfile();
    if(userProfile){
      fetchUserPosts();
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="profile">
        {userProfile && (
          <div className="user-info">
            <h2>{userProfile.name}'s Profile</h2>
            <p>Email: {userProfile.email}</p>
            {userProfile.major && (<p>Major: {userProfile.major}</p>)}
            {userProfile.year && (<p>Year: {userProfile.year?.toString()}</p>)}
            {userProfile.bio && (<p>Bio: {userProfile.bio}</p>)}
          </div>
        )}
        <div className="user-posts">
          <h3>Your Posts</h3>
          {userPosts.map((post) => (
            <div key={post._id} className="post-card">
              <h4>{post.title}</h4>
              <p>Category: {post.category}</p>
              <p>Residence: {post.residence.residenceId.name}</p>
              <p>Room Type: {post.residence.roomType}</p>
              <p>Rent: {post.rent ? `$${post.rent}` : 'N/A'}</p>
              <p>Gender Preference: {post.gender || 'Any'}</p>
              <p>Duration: {post.duration || 'N/A'}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
