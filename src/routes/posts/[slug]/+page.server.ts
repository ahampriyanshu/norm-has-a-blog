import { getPost, getPosts, getLatestCommit } from '$lib/utils/posts';
import { siteConfig } from '$lib/config';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { readFileSync } from 'fs';
import { join } from 'path';

interface Heading {
  id: string;
  text: string;
  level: number;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function extractHeadingsFromMarkdown(markdown: string): Heading[] {
  const headings: Heading[] = [];

  const contentWithoutFrontmatter = markdown.replace(/^---[\s\S]*?---\n/, '');

  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  let match;

  while ((match = headingRegex.exec(contentWithoutFrontmatter)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = slugify(text);

    headings.push({ id, text, level });
  }

  return headings;
}

export const load: PageServerLoad = async ({ params }) => {
  const post = await getPost(params.slug);

  if (!post) {
    throw error(404, 'Post not found');
  }

  const filePath = `src/posts/${params.slug}.md`;
  const commitInfo = await getLatestCommit(
    filePath,
    siteConfig.githubUsername,
    siteConfig.githubRepo
  );

  const allPosts = await getPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === params.slug);

  const previousPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  let headings: Heading[] = [];
  try {
    const markdownPath = join(process.cwd(), filePath);
    const markdownContent = readFileSync(markdownPath, 'utf-8');
    headings = extractHeadingsFromMarkdown(markdownContent);
  } catch (err) {
    console.warn('Failed to extract headings:', err);
  }

  return {
    metadata: {
      ...post.metadata,
      commitInfo
    },
    previousPost: previousPost ? { slug: previousPost.slug, title: previousPost.title } : null,
    nextPost: nextPost ? { slug: nextPost.slug, title: nextPost.title } : null,
    headings,
    siteConfig
  };
};

export const prerender = true;

export async function entries() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
