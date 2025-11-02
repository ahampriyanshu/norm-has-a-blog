---
title: Markdown Syntax Guide
description: A comprehensive guide to Markdown syntax and formatting
date: '2023-12-10'
updated: '2024-01-12'
tags:
  - markdown
  - writing
  - guide
  - syntax
---

## Headings

# H1 Heading
## H2 Heading
### H3 Heading
#### H4 Heading
##### H5 Heading
###### H6 Heading

## Emphasis

You can make text **bold** or _italic_. You can also combine them: **_bold and italic_**.

For strikethrough, use ~~strikethrough~~.

## Links

[This is an inline link](https://example.com)

[This is a link with a title](https://example.com "Link Title")

## Lists

### Unordered Lists

- Item 1
- Item 2
  - Nested item 2.1
  - Nested item 2.2
- Item 3

### Ordered Lists

1. First item
2. Second item
   1. Nested item 2.1
   2. Nested item 2.2
3. Third item

### Task Lists

- [x] Completed task
- [ ] Incomplete task
- [ ] Another task

## Code

### Inline Code

Use `inline code` for short code snippets.

### Code Blocks

```javascript
// JavaScript example

const greeting = (name) => {
  return `Hello, ${name}!`;
};

console.log(greeting('World'));
```

```python
# Python example
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
```

```css
/* CSS example */
.button {
  background-color: #0066cc;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
}
```

## Blockquotes

> This is a blockquote.


## Tables

| Syntax | Description | Example |
|--------|-------------|---------|
| Header | Title | Value |
| Paragraph | Text | Content |
| Bold | **Bold** | **Example** |
| Italic | _Italic_ | _Example_ |

Aligned tables:

| Left aligned | Center aligned | Right aligned |
|:-------------|:--------------:|--------------:|
| Left | Center | Right |
| Text | Text | Text |

## Horizontal Rule

Use three or more hyphens, asterisks, or underscores:

---

## Abbreviations

The HTML specification is maintained by the W3C.

*[HTML]: Hyper Text Markup Language
*[W3C]: World Wide Web Consortium

## Emojis

You can use emojis! 😄 🎉 🚀 ✨ 💡

## Math (if supported)

Math expressions can be added with proper configuration.

Inline: E = mc²

Block formulas can be rendered with KaTeX or MathJax when configured.

## Escaping Characters

You can escape special characters with a backslash: \* \_ \[ \]

## HTML

You can also use raw HTML in Markdown:

<div style="border: 1px solid #f0f0f0; padding: 10px; border-radius: 12px; text-align: center;">
  This is a custom HTML div with inline styles.
</div>

## Conclusion

This covers most of the Markdown syntax you'll need for blogging. Experiment with these elements to create engaging and well-formatted content!
