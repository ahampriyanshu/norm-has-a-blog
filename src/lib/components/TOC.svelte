<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  interface Heading {
    id: string;
    text: string;
    level: number;
    element: HTMLElement;
  }

  let headings: Heading[] = [];
  let activeId: string = '';
  let observer: IntersectionObserver | null = null;
  let visibleHeadings = new Set<string>();

  onMount(() => {
    // Get all headings from the content
    const articleHeadings = document.querySelectorAll('.content h2, .content h3, .content h4');
    headings = Array.from(articleHeadings).map((heading) => ({
      id: heading.id,
      text: heading.textContent || '',
      level: parseInt(heading.tagName.substring(1)),
      element: heading as HTMLElement
    }));

    // Set up Intersection Observer for scroll tracking
    const observerOptions = {
      rootMargin: '-100px 0px -66% 0px',
      threshold: 0
    };

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleHeadings.add(entry.target.id);
        } else {
          visibleHeadings.delete(entry.target.id);
        }
      });

      // Find the first visible heading in the document order
      if (visibleHeadings.size > 0) {
        for (const heading of headings) {
          if (visibleHeadings.has(heading.id)) {
            activeId = heading.id;
            break;
          }
        }
      }
    }, observerOptions);

    // Observe all headings
    headings.forEach((heading) => {
      if (heading.element) {
        observer?.observe(heading.element);
      }
    });

    // Handle scroll events for better accuracy
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        if (heading.element && heading.element.offsetTop <= scrollPosition) {
          activeId = heading.id;
          return;
        }
      }

      // If we're at the very top, highlight the first heading
      if (headings.length > 0) {
        activeId = headings[0].id;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Set initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  onDestroy(() => {
    if (observer) {
      observer.disconnect();
    }
  });

  function scrollToHeading(id: string, event: MouseEvent) {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      activeId = id;
    }
  }

  function getIndentClass(level: number): string {
    return `toc-h${level}`;
  }
</script>

{#if headings.length > 0}
  <div class="toc-wrapper">
    <h3 class="panel-heading">Contents</h3>
    <nav id="toc" class="toc">
      <ul class="toc-list">
        {#each headings as heading (heading.id)}
          <li class="toc-item {getIndentClass(heading.level)}" class:active={activeId === heading.id}>
            <a
              href="#{heading.id}"
              class="toc-link"
              class:active={activeId === heading.id}
              on:click={(e) => scrollToHeading(heading.id, e)}
            >
              {heading.text}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  </div>
{/if}

