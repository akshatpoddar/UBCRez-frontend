// components/CreatePost.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, TextField, Button, Typography, MenuItem } from '@mui/material';
import api from '../utils/api';

interface CreatePostProps {
  residenceOptions: string[];
}

const CreatePost: React.FC<CreatePostProps> = ({ residenceOptions }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    residence: '',
    category: '',
    rent: '',
    gender: 'Any',
    startDate: '',
    endDate: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let res = await api.post('/posts', formData);
      console.log(res)
      router.push('/'); // Redirect to homepage after creating a post
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 600,
        margin: 'auto',
        padding: 3,
        backgroundColor: 'white',
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" sx={{ mb: 3 }}>Create a Post</Typography>
      <TextField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        multiline
        rows={4}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        select
        label="Residence"
        name="residence"
        value={formData.residence}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      >
        {residenceOptions.map((residence, index) => (
          <MenuItem key={index} value={residence}>
            {residence}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      >
        <MenuItem value="Sublet">Sublet</MenuItem>
        <MenuItem value="Room Switch">Room Switch</MenuItem>
      </TextField>
      {formData.category === 'Sublet' && (
        <TextField
          label="Rent"
          name="rent"
          type="number"
          value={formData.rent}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
      )}
      <TextField
        select
        label="Gender Preference"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      >
        <MenuItem value="Any">Any</MenuItem>
        <MenuItem value="Male">Male</MenuItem>
        <MenuItem value="Female">Female</MenuItem>
      </TextField>
      <TextField
        label="Start Date"
        name="startDate"
        type="date"
        value={formData.startDate}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 2 }}
      />
      <TextField
        label="End Date"
        name="endDate"
        type="date"
        value={formData.endDate}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Create Post
      </Button>
    </Box>
  );
};

export default CreatePost;