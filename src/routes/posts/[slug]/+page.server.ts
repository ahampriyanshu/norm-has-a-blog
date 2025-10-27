import { getPost, getPosts, getLatestCommit } from '$lib/utils/posts';
import { siteConfig } from '$lib/config';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const post = await getPost(params.slug);

  if (!post) {
    throw error(404, 'Post not found');
  }

  const filePath = `src/posts/${params.slug}.md`;
  const commitInfo = await getLatestCommit(filePath, siteConfig.githubUsername, siteConfig.githubRepo);

  const allPosts = await getPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === params.slug);

  const previousPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return {
    metadata: {
      ...post.metadata,
      commitInfo
    },
    previousPost: previousPost ? { slug: previousPost.slug, title: previousPost.title } : null,
    nextPost: nextPost ? { slug: nextPost.slug, title: nextPost.title } : null,
    siteConfig
  };
};

export const prerender = true;

export async function entries() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
