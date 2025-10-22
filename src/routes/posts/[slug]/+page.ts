import { getPost, getPosts } from '$lib/utils/posts';
import { siteConfig } from '$lib/config';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
    const post = await getPost(params.slug);

    if (!post) {
        throw error(404, 'Post not found');
    }

    return {
        metadata: post.metadata,
        content: post.content,
        siteConfig
    };
};

export const prerender = true;

// Generate all post routes at build time
export async function entries() {
    const posts = await getPosts();
    return posts.map(post => ({ slug: post.slug }));
}

