import { siteConfig } from '$lib/config';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
    return {
        siteConfig
    };
};

export const prerender = true;

