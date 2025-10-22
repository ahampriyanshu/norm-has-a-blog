import { getPosts } from '$lib/utils/posts';
import { siteConfig } from '$lib/config';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  const posts = await getPosts();
  console.log(posts);
  return {
    posts: posts.slice(0, siteConfig.paginate),
    siteConfig
  };
};

export const prerender = true;

