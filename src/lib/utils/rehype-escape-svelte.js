import { visit } from 'unist-util-visit';

/**
 * Custom rehype plugin to escape Svelte template syntax and special characters
 * This prevents Svelte from interpreting curly braces, angle brackets as template syntax
 * @returns {(tree: any) => void}
 */
export function rehypeEscapeSvelte() {
  return (/** @type {any} */ tree) => {
    // Handle Jekyll/Liquid template syntax in img src attributes
    visit(tree, 'element', (node) => {
      if (node.tagName === 'img' && node.properties?.src) {
        const src = node.properties.src;
        if (typeof src === 'string') {
          // Convert Jekyll/Liquid template syntax to plain paths
          // Pattern: {{ '/path/to/file' | absolute_url }} -> /path/to/file
          const liquidMatch = src.match(/\{\{\s*['"]([^'"]+)['"]\s*\|\s*absolute_url\s*\}\}/);
          if (liquidMatch) {
            node.properties.src = liquidMatch[1];
          }
        }
      }
    });

    visit(tree, 'text', (node) => {
      if (node.value && typeof node.value === 'string') {
        // Escape double curly braces (Svelte/Liquid template syntax) in text nodes
        // But only if they're not in image paths (already handled above)
        node.value = node.value.replace(/\{\{/g, '&#123;&#123;').replace(/\}\}/g, '&#125;&#125;');
      }
    });

    // Escape < and > in table cells and list items
    visit(tree, 'element', (node) => {
      if (node.tagName === 'td' || node.tagName === 'th' || node.tagName === 'li') {
        visit(node, 'text', (textNode) => {
          if (textNode.value && typeof textNode.value === 'string') {
            // Only escape < and > that appear to be comparison operators (not part of HTML tags)
            // This regex looks for < or > surrounded by spaces or at word boundaries
            textNode.value = textNode.value
              .replace(/(\s|^)<(\s)/g, '$1&lt;$2')
              .replace(/(\s)>(\s|$)/g, '$1&gt;$2');
          }
        });
      }
    });
  };
}
