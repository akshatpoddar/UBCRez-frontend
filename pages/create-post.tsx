// pages/create-post.tsx
import React from 'react';
import CreatePost from '../components/CreatePost';
import Navbar from '@/components/Navbar';

const CreatePostPage: React.FC = () => {
  const residenceOptions = [
    'Marine Drive',
    'Ponderosa Commons',
    'Walter Gage',
    'Exchange',
    'Brock North',
  ]; // Replace with real residence data or fetch dynamically

  return (
    <div>
        <Navbar/>
        <CreatePost residenceOptions={residenceOptions} />
    </div>
  );
};

export default CreatePostPage;
