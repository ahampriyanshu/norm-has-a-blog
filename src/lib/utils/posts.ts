export interface Post {
  title: string;
  description: string;
  date: string;
  updated?: string;
  tags?: string[];
  pin?: boolean;
  math?: boolean;
  mermaid?: boolean;
  image?: string;
  slug: string;
  content?: string;
}

export interface CommitInfo {
  hash: string;
  message: string;
  date: string;
  url: string;
}

export interface PostMetadata extends Post {
  readingTime: string;
  commitInfo?: CommitInfo;
}

/**
 * Get all posts from the file system
 */
export async function getPosts(): Promise<PostMetadata[]> {
  const postFiles = import.meta.glob('/src/posts/**/*.md');
  const posts: PostMetadata[] = [];

  for (const path in postFiles) {
    const post = await postFiles[path]();
    const metadata = (post as any).metadata;

    if (metadata) {
      const slug = path
        .replace('/src/posts/', '')
        .replace('.md', '')
        .split('/')
        .pop() || '';

      posts.push({
        ...metadata,
        slug,
        readingTime: calculateReadingTime((post as any).default?.render?.()?.html || '')
      });
    }
  }

  // Sort by date (newest first) and pin status
  return posts.sort((a, b) => {
    if (a.pin && !b.pin) return -1;
    if (!a.pin && b.pin) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

/**
 * Get a single post by slug
 */
export async function getPost(slug: string): Promise<{ metadata: PostMetadata; content: any } | null> {
  try {
    const post = await import(`../../posts/${slug}.md`);
    return {
      metadata: {
        ...post.metadata,
        slug,
        readingTime: calculateReadingTime(post.default?.render?.()?.html || '')
      },
      content: post.default
    };
  } catch {
    return null;
  }
}

/**
 * Get all unique tags from posts
 */
export async function getTags(): Promise<Map<string, number>> {
  const posts = await getPosts();
  const tags = new Map<string, number>();

  posts.forEach(post => {
    post.tags?.forEach(tag => {
      tags.set(tag, (tags.get(tag) || 0) + 1);
    });
  });

  return tags;
}

/**
 * Get posts by tag
 */
export async function getPostsByTag(tag: string): Promise<PostMetadata[]> {
  const posts = await getPosts();
  return posts.filter(post => post.tags?.includes(tag));
}

/**
 * Calculate reading time from HTML content
 */
function calculateReadingTime(html: string): string {
  const text = html.replace(/<[^>]*>/g, '');
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200); // Average reading speed: 200 words/min
  return `${minutes} min read`;
}

/**
 * Format date
 */
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Get archives grouped by year and month
 */
export async function getArchives(): Promise<Map<string, Map<string, PostMetadata[]>>> {
  const posts = await getPosts();
  const archives = new Map<string, Map<string, PostMetadata[]>>();

  posts.forEach(post => {
    const date = new Date(post.date);
    const year = date.getFullYear().toString();
    const month = date.toLocaleDateString('en-US', { month: 'long' });

    if (!archives.has(year)) {
      archives.set(year, new Map());
    }

    const yearMap = archives.get(year)!;
    if (!yearMap.has(month)) {
      yearMap.set(month, []);
    }

    yearMap.get(month)!.push(post);
  });

  return archives;
}

/**
 * Get the latest git commit information for a specific file using local git commands
 */
export async function getLatestCommit(filePath: string, githubUsername: string, githubRepo: string): Promise<CommitInfo | null> {
  try {
    // Only run in Node.js environment (during build)
    if (typeof window !== 'undefined') {
      return null;
    }

    const { execSync } = await import('child_process');
    
    // Get the latest commit hash, message, and timestamp for the file
    const gitLog = execSync(
      `git log -1 --pretty=format:"%H|%s|%aI" -- "${filePath}"`,
      { encoding: 'utf-8', cwd: process.cwd() }
    ).trim();

    if (!gitLog) {
      return null;
    }

    const [hash, message, date] = gitLog.split('|');
    
    return {
      hash: hash.substring(0, 7), // Short hash
      message,
      date,
      url: `https://github.com/${githubUsername}/${githubRepo}/commit/${hash}`
    };
  } catch (error) {
    console.warn(`Failed to get git commit info for ${filePath}:`, error);
    return null;
  }
}

