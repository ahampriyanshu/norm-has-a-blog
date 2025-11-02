---
title: Adding New Post
description: Step-by-step guide to writing and publishing blog posts. Learn frontmatter, markdown features, best practices, and troubleshooting tips.
date: '2025-11-02'
tags:
  - writing
  - guide
  - tutorial
---

## Creating Your First Post

Writing a new blog post is simple and straightforward. This guide will walk you through the entire process, from creating a markdown file to publishing your post.

## Quick Start

The fastest way to create a new post:

1. Create a new `.md` file in `src/posts/`
2. Add frontmatter with metadata
3. Write your content in markdown
4. Save and view in your browser

That's it! The blog automatically discovers and renders new posts.

## Step-by-Step Guide

### 1. Create a New Markdown File

Navigate to the `src/posts/` directory and create a new markdown file. The filename should be descriptive and use kebab-case:

```bash
cd src/posts
touch my-awesome-post.md
```

**Naming Conventions:**
- Use lowercase letters
- Separate words with hyphens (-)
- Keep it concise but descriptive
- Avoid special characters

**Good Examples:**
- `introduction-to-svelte.md`
- `debugging-javascript-errors.md`
- `my-coding-journey.md`

**Avoid:**
- `My Post.md` (spaces, capitals)
- `post_1.md` (underscores, generic)
- `2025-11-02-post.md` (date prefix - not needed)

### 2. Add Frontmatter

Every post requires YAML frontmatter at the top of the file. This contains metadata about your post:

```markdown
---
title: Your Post Title
description: A brief description of your post
date: '2025-11-02'
tags:
  - javascript
  - tutorial
---
```

#### Required Fields

| Field | Description | Example |
|-------|-------------|---------|
| `title` | Post title (displayed everywhere) | `"Introduction to SvelteKit"` |
| `description` | Brief summary (used for SEO and previews) | `"Learn the basics of SvelteKit"` |
| `date` | Publication date in YYYY-MM-DD format | `'2025-11-02'` |
| `tags` | Array of tags (at least one recommended) | `[javascript, tutorial]` |

#### Optional Fields

| Field | Description | Default |
|-------|-------------|---------|
| `math` | Enable math equation rendering | `false` |
| `pin` | Pin post to top of the list | `false` |

#### Complete Frontmatter Example

```markdown
---
title: Advanced React Patterns
description: Exploring compound components, render props, and hooks patterns in React
date: '2025-11-02'
tags:
  - react
  - javascript
  - patterns
  - advanced
math: false
pin: false
---
```

**Important Notes:**
- Dates must be in quotes: `date: '2025-11-02'`
- Use single or double quotes for strings
- Tags should be lowercase for consistency
- Each tag should be on a new line with a hyphen

### 3. Write Your Content

After the frontmatter, write your post content using markdown. Here's a complete example:

```markdown
---
title: Getting Started with TypeScript
description: A beginner-friendly introduction to TypeScript
date: '2025-11-02'
tags:
  - typescript
  - javascript
  - beginners
---

## Introduction

TypeScript is a statically typed superset of JavaScript that compiles to plain JavaScript. In this guide, we'll explore the basics.

## Why TypeScript?

Here are the main benefits:

1. **Type Safety** - Catch errors at compile time
2. **Better IDE Support** - Autocomplete and IntelliSense
3. **Improved Refactoring** - Rename and refactor with confidence
4. **Modern JavaScript** - Use latest ECMAScript features

## Basic Types

TypeScript provides several basic types:

```typescript:types.ts
// String
let name: string = "John Doe";

// Number
let age: number = 30;

// Boolean
let isActive: boolean = true;

// Array
let tags: string[] = ["typescript", "javascript"];
```

## Conclusion

TypeScript makes JavaScript development more robust and maintainable. Start using it in your next project!
```

### 4. Preview Your Post

Start the development server if it's not already running:

```bash
npm run dev
```

Navigate to `http://localhost:5173` in your browser. Your new post should appear on the homepage automatically!

### 5. Check the Post

Click on your post to view it. Verify that:

- ✅ Title displays correctly
- ✅ Description appears in the preview
- ✅ Date is formatted properly
- ✅ Tags are showing
- ✅ Content renders as expected
- ✅ Code blocks have syntax highlighting
- ✅ Links work correctly
- ✅ Images display (if any)

## Writing Tips

### Use Descriptive Titles

Your title is the first thing readers see. Make it:

- **Clear and specific**: "How to Debug React Apps" vs "React Tips"
- **Engaging**: Use action words and benefits
- **Concise**: Aim for 5-10 words
- **Searchable**: Include relevant keywords

### Write Compelling Descriptions

The description appears in:
- Post previews on the homepage
- Search engine results (SEO)
- Social media shares
- RSS/Atom feeds

Make it count:
- Keep it under 160 characters for SEO
- Summarize the main benefit or topic
- Don't repeat the title verbatim
- Include a call-to-action when appropriate

### Choose Relevant Tags

Tags help readers discover related content:

- Use 2-5 tags per post
- Be consistent with tag names across posts
- Use lowercase for uniformity
- Choose specific tags over generic ones
- Create new tags sparingly

**Example tag strategy:**

```markdown
tags:
  - javascript        # Language
  - react            # Framework
  - hooks            # Specific feature
  - tutorial         # Content type
```

### Structure Your Content

A well-structured post is easier to read:

1. **Introduction** - Hook the reader and explain what they'll learn
2. **Main Content** - Break into logical sections with headings
3. **Code Examples** - Show, don't just tell
4. **Visuals** - Add diagrams, screenshots, or images
5. **Conclusion** - Summarize key takeaways

### Use Headings Hierarchy

Organize content with proper heading levels:

```markdown
# H1 - Reserved for post title (automatic)
## H2 - Main sections
### H3 - Subsections
#### H4 - Sub-subsections
```

**Example structure:**

```markdown
## Introduction
## Setup
### Prerequisites
### Installation
## Core Concepts
### Concept 1
### Concept 2
## Conclusion
```

## Advanced Features

### Math Equations

Enable mathematical expressions by adding `math: true` to frontmatter:

```markdown
---
title: Calculus Fundamentals
math: true
---

The derivative of $f(x) = x^2$ is $f'(x) = 2x$.

The fundamental theorem of calculus:

$$
\int_a^b f(x)dx = F(b) - F(a)
$$
```

For more details, see the [Markdown Syntax Guide](./markdown-syntax-guide).

### Pinning Posts

Pin important posts to the top of your blog:

```markdown
---
title: Important Announcement
pin: true
---
```

Pinned posts appear first on the homepage, regardless of date.

### Code Blocks with Filenames

Add context to code examples with filenames:

````markdown
```javascript:app.js
function greet(name) {
  return `Hello, ${name}!`;
}
```
````

The filename appears as a header above the code block.

### Adding Images

Place images in `static/images/` and reference them in your markdown:

```markdown
![Alt text describing the image](/images/my-image.jpg)
```

**Image tips:**
- Use descriptive alt text for accessibility
- Optimize images before adding them (compress, resize)
- Use common formats: JPG, PNG, WebP
- Organize images in subdirectories if needed

### Internal Links

Link to other posts using relative URLs:

```markdown
Check out the [Getting Started](./getting-started) guide.

See the [Markdown Syntax Guide](./markdown-syntax-guide) for more.
```

### External Links

Link to external resources:

```markdown
[MDN Web Docs](https://developer.mozilla.org/)

[SvelteKit Documentation](https://kit.svelte.dev/)
```

## Post Checklist

Before publishing, verify:

- [ ] Frontmatter is complete and properly formatted
- [ ] Title is clear and descriptive
- [ ] Description is concise and compelling
- [ ] Date is correct and in proper format
- [ ] Tags are relevant and consistent
- [ ] Content is well-structured with headings
- [ ] Code blocks have syntax highlighting
- [ ] Links work and open correctly
- [ ] Images display properly
- [ ] Spelling and grammar are correct
- [ ] Post previews correctly on homepage

## Publishing Workflow

### Local Development

1. Write your post in `src/posts/`
2. Preview with `npm run dev`
3. Make edits and verify changes
4. Commit your changes to git

### Deployment

#### Option 1: Automatic (Recommended)

If you have CI/CD set up (GitHub Actions, etc.):

```bash
git add src/posts/my-new-post.md
git commit -m "Add new post: My Post Title"
git push origin main
```

Your blog will automatically rebuild and deploy.

#### Option 2: Manual Build

```bash
# Build the site
npm run build

# Deploy the build/ directory
# (method depends on your hosting platform)
```

## Common Issues and Solutions

### Post Not Appearing

**Problem:** New post doesn't show on homepage.

**Solutions:**
1. Check frontmatter syntax (valid YAML)
2. Ensure date is in quotes: `date: '2025-11-02'`
3. Verify file extension is `.md`
4. Restart dev server: `Ctrl+C`, then `npm run dev`
5. Check for console errors in terminal

### Tags Not Working

**Problem:** Tags don't link or show correctly.

**Solutions:**
1. Use lowercase tag names
2. Ensure tags are an array (with hyphens)
3. Check YAML indentation

**Correct format:**

```yaml
tags:
  - javascript
  - tutorial
```

**Incorrect format:**

```yaml
tags: javascript, tutorial  # Wrong
```

### Code Highlighting Issues

**Problem:** Code blocks don't have syntax highlighting.

**Solutions:**
1. Specify language: ` ```javascript ` not ` ``` `
2. Check if language is supported by Shiki
3. Verify code block syntax (three backticks)

### Date Format Errors

**Problem:** Date displays incorrectly or causes errors.

**Solutions:**
- Use ISO format: `YYYY-MM-DD`
- Always use quotes: `date: '2025-11-02'`
- Don't use slashes or other formats

## Best Practices

### Consistency

- Use the same tag names across posts
- Follow a consistent structure
- Maintain a regular posting schedule
- Keep formatting uniform

### SEO Optimization

- Use keywords in titles and descriptions
- Write descriptive alt text for images
- Use proper heading hierarchy
- Link to related posts
- Keep URLs clean (handled automatically via filename)

### Accessibility

- Use semantic HTML when needed
- Add alt text to all images
- Ensure sufficient color contrast
- Test with screen readers when possible

### Version Control

- Commit posts individually with descriptive messages
- Use branches for draft posts
- Review before merging to main

```bash
# Create a branch for a new post
git checkout -b post/typescript-intro

# Make changes
git add src/posts/typescript-intro.md
git commit -m "Draft: Introduction to TypeScript"

# Publish
git checkout main
git merge post/typescript-intro
git push
```

## Post Templates

### Tutorial Post Template

```markdown
---
title: How to [Do Something]
description: Learn how to [accomplish task] step by step
date: 'YYYY-MM-DD'
tags:
  - tutorial
  - technology
---

## Introduction

Brief overview of what readers will learn.

## Prerequisites

- Requirement 1
- Requirement 2

## Step 1: [Action]

Detailed instructions...

## Step 2: [Action]

More instructions...

## Conclusion

Recap what was covered.

## Resources

- [Resource 1](url)
- [Resource 2](url)
```

### Technical Deep-Dive Template

```markdown
---
title: Understanding [Concept]
description: A deep dive into [concept] and how it works
date: 'YYYY-MM-DD'
tags:
  - deep-dive
  - technology
---

## Overview

High-level explanation.

## The Problem

What problem does this solve?

## How It Works

Technical explanation with examples.

## Use Cases

When to use this approach.

## Conclusion

Final thoughts and recommendations.
```

### Opinion/Personal Post Template

```markdown
---
title: [Your Take on Topic]
description: My thoughts on [topic]
date: 'YYYY-MM-DD'
tags:
  - opinion
  - personal
---

## Introduction

Context and why this matters.

## My Experience

Personal story or perspective.

## Key Insights

Main points and takeaways.

## Conclusion

Final thoughts.
```

## Next Steps

Now that you know how to create posts:

1. **Write your first post** - Start with an introduction or share something you've learned
2. **Explore markdown features** - Check the [Markdown Syntax Guide](./markdown-syntax-guide)
3. **Review the blog setup** - See the [Getting Started](./getting-started) guide
4. **Share your work** - Publish and promote your content

Happy writing! ✍️
