import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import Navbar from '../components/Navbar';

interface UserProfile {
  username: string;
  name: string;
  email: string;
}

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
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userPosts, setUserPosts] = useState<UserPost[]>([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get('/api/users/profile');
        setUserProfile(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    const fetchUserPosts = async () => {
      try {
        const response = await api.get('/api/posts/user');
        setUserPosts(response.data);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };

    fetchUserProfile();
    fetchUserPosts();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="profile">
        {userProfile && (
          <div className="user-info">
            <h2>{userProfile.name}'s Profile</h2>
            <p>Username: {userProfile.username}</p>
            <p>Email: {userProfile.email}</p>
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
