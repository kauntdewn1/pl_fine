import { supabase } from './supabase';

export async function checkUserVip(email: string) {
  const { data, error } = await supabase
    .rpc('is_user_vip', { user_email: email });
  
  if (error) throw error;
  return data;
}

export async function toggleLike(postId: string, userEmail: string) {
  const { data, error } = await supabase
    .rpc('toggle_post_like', { 
      p_post_id: postId, 
      p_user_email: userEmail 
    });
  
  if (error) throw error;
  return data;
}

export async function getPostStats(postId: string) {
  const { data, error } = await supabase
    .rpc('get_post_stats', { p_post_id: postId });
  
  if (error) throw error;
  return data;
}

export async function getVipPosts(userEmail: string, limit = 10, offset = 0) {
  const { data, error } = await supabase
    .rpc('get_vip_posts_with_like_status', { 
      p_user_email: userEmail,
      p_limit: limit,
      p_offset: offset
    });
  
  if (error) throw error;
  return data;
} 