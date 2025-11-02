---
title: Writing New Post
description: How to write a new post
date: '2025-11-02'
tags:
  - writing
  - guide
---

## Headings

# H1 Heading
## H2 Heading
### H3 Heading
#### H4 Heading
##### H5 Heading
###### H6 Heading

### Text-level semantics

HTML defines a long list of available inline tags, a complete list of which can be found on the [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/HTML/Element).

- **To bold text**, use `<strong>`.
- *To italicize text*, use `<em>`.
- Abbreviations, like <abbr title="HyperText Markup Langage">HTML</abbr> should use `<abbr>`, with an optional `title` attribute for the full phrase.
- Citations, like <cite>&mdash; Mark otto</cite>, should use `<cite>`.
- <del>Deleted</del> text should use `<del>` and <ins>inserted</ins> text should use `<ins>`.
- Superscript <sup>text</sup> uses `<sup>` and subscript <sub>text</sub> uses `<sub>`.
- <kbd>keyboard input</kbd> use `<kbd>`.
- <mark>marked</mark> text should use `<mark>`.
- <q>short inline quotations</q> should use `<q>`.
- <s>strikethrough</s> text should use `<s>`.
- <small>small text</small> should use `<small>`.
- <span>span</span> text should use `<span>`.
- <sub>subscript</sub> text should use `<sub>`.
- <sup>superscript</sup> text should use `<sup>`.
- <time>datetime</time> text should use `<time>`.

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

You can add filenames to code blocks using the syntax: ` ```language:filename.ext `

```javascript:greeting.js
const greeting = (name) => {
  return `Hello, ${name}!`;
};

console.log(greeting('World'));
```

Or without a filename:

```css
.button {
  background-color: #0066cc;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
}
```

or just the code snippet:

```
These are the instructions to find the meaning of life.
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

## Images

You can add images using standard Markdown syntax:

![Alt text](/images/hero.jpeg)

## Math Equations

Mathematical expressions are fully supported using MathJax. Use single dollar signs `$...$` for inline math and double dollar signs `$$...$$` for multi line math.

### Inline Math

You can write inline equations like $E = mc^2$ or the quadratic formula $x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}$ directly in your text.

### Multi Line Math

For larger equations, use display mode:

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

### Summation and Limits

$$
\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}
$$

$$
\lim_{x \to 0} \frac{\sin x}{x} = 1
$$

The Schrödinger equation:

$$
i\hbar\frac{\partial}{\partial t}\Psi(\mathbf{r},t) = \hat{H}\Psi(\mathbf{r},t)
$$

Maxwell's equations in differential form:

$$
\begin{aligned}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\epsilon_0} \\
\nabla \cdot \mathbf{B} &= 0 \\
\nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \\
\nabla \times \mathbf{B} &= \mu_0\mathbf{J} + \mu_0\epsilon_0\frac{\partial \mathbf{E}}{\partial t}
\end{aligned}
$$

Matrix notation:

$$
\begin{bmatrix}
a & b \\
c & d
\end{bmatrix}
\begin{bmatrix}
x \\
y
\end{bmatrix}
=
\begin{bmatrix}
ax + by \\
cx + dy
\end{bmatrix}
$$


## HTML

You can also use raw HTML in Markdown:

<div style="border: 1px solid #f0f0f0; padding: 10px; border-radius: 12px; text-align: center;">
  This is a custom HTML div with inline styles.
</div>
