import React from 'react';
import { useRouter } from 'next/router';
import {Post, SubletPost, SwitchPost} from '../models/Post';

interface PostCardProps {
  post: Post;
}

const calculateDaysBetween = (startDate: Date, endDate: Date): number => {
  // Convert both dates to milliseconds
  const startMillis = startDate.getTime();
  const endMillis = endDate.getTime();

  // Calculate the difference in milliseconds
  const diffMillis = endMillis - startMillis;

  // Convert milliseconds to days
  const daysDifference = diffMillis / (1000 * 60 * 60 * 24);

  // Return the number of days
  return Math.round(daysDifference); // Round to handle potential floating-point errors
};

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const router = useRouter();

  const handlePostClick = () => {
    router.push(`/post/${post._id}`);
  };

  let duration = null;
  if(post.category == "Sublet"){
    let subletPost: SubletPost = post as SubletPost
    duration = calculateDaysBetween(subletPost.duration.startDate, subletPost.duration.endDate)
  }

  return (
    <div className="post-card" onClick={handlePostClick}>
      <h3>{post.title}</h3>
      <p>Category: {post.category}</p>
      <p>Residence: {post.residence.name}</p>
      <p>Room Type: {post.residence.roomType}</p>
      <p>Rent: {post.rent ? `$${post.rent}` : 'N/A'}</p>
      <p>Gender Preference: {post.gender || 'Any'}</p>
      <p>Duration: {duration ? `$${duration}` : 'N/A'}</p>
    </div>
  );
};

export default PostCard;