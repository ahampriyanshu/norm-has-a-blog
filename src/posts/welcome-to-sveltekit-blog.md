---
title: Welcome to SvelteKit Blog
description: Getting started with your new SvelteKit blog powered by mdsvex
date: '2024-01-15'
tags:
  - sveltekit
  - mdsvex
  - blogging
pin: true
---

# Welcome to Your SvelteKit Blog!

This is your first blog post written in Markdown. This blog is built with **SvelteKit** and **mdsvex**, providing a powerful and flexible blogging platform.

## Features

This blog comes with many great features:

- ✍️ Write posts in Markdown
- 🎨 Dark/Light theme toggle
- 📱 Fully responsive design
- 🏷️ Tags for organization
- 📅 Archive by date
- 🔍 Search functionality
- ⚡ Lightning-fast static site generation
- 🎯 SEO optimized

## Writing Posts

To create a new post, simply add a new `.md` file to the `src/posts` directory. Each post should include frontmatter with metadata:

```markdown
---
title: Your Post Title
description: A brief description of your post
date: '2024-01-15'
tags:
  - tag1
  - tag2
pin: false
---

Your content here...
\```

## Markdown Support

You can use all standard Markdown features:

### Code Blocks

\```javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet('World');
\```

### Lists

1. First item
2. Second item
3. Third item

- Bullet point
- Another bullet
- One more

### Blockquotes

> This is a blockquote. It can span multiple lines and is great for highlighting important information or quotes.

### Tables

| Feature | Status |
|---------|--------|
| Markdown | ✅ |
| Dark Mode | ✅ |
| Tags | ✅ |
| Search | ✅ |

## Images

You can add images using standard Markdown syntax:

```markdown
![Alt text](/path/to/image.jpg)
```

## Next Steps

1. Customize the site configuration in `src/lib/config.ts`
2. Update the About page
3. Start writing your own posts!
4. Deploy to your favorite hosting platform

Happy blogging! 🚀


