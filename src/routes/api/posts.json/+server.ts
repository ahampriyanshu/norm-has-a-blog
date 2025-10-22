import { json } from '@sveltejs/kit';
import { getPosts } from '$lib/utils/posts';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  const posts = await getPosts();

  // Return simplified post data for search
  const searchData = posts.map(post => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    tags: post.tags,
    date: post.date
  }));

  return json(searchData);
};

