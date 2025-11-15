import { visit } from 'unist-util-visit';

export function rehypeFixInternalLinks(basePath = '') {
  return (/** @type {any} */ tree) => {
    const base = process.env.NODE_ENV === 'production' ? basePath : '';
    if (!base || !tree) return;

    visit(tree, 'element', (node) => {
      if (node.tagName === 'a' && node.properties?.href) {
        const href = node.properties.href;
        const className = node.properties.className || node.properties.class;
        const isHeadingAnchor =
          className === 'heading-anchor' ||
          (Array.isArray(className) && className.includes('heading-anchor'));
        if (!isHeadingAnchor && typeof href === 'string') {
          if (href.startsWith('/') && !href.startsWith('//') && !href.startsWith('http')) {
            node.properties.href = `${base}${href}`;
          }
        }
      }
    });
  };
}
