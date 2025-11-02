<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';

  interface Heading {
    id: string;
    text: string;
    level: number;
  }

  interface HeadingGroup {
    h2: Heading;
    children: Heading[];
  }

  // Prop: headings from SSR
  export let headings: Heading[] = [];

  let activeId: string = '';
  let activeH2Id: string = '';
  let observer: IntersectionObserver | null = null;
  let visibleHeadings = new Set<string>();
  let scrollCleanup: (() => void) | null = null;

  // Group headings by their parent h2
  function groupHeadingsByH2(allHeadings: Heading[]): HeadingGroup[] {
    const groups: HeadingGroup[] = [];
    let currentGroup: HeadingGroup | null = null;

    allHeadings.forEach((heading) => {
      if (heading.level === 2) {
        if (currentGroup) {
          groups.push(currentGroup);
        }
        currentGroup = {
          h2: heading,
          children: []
        };
      } else if (currentGroup && (heading.level === 3 || heading.level === 4)) {
        currentGroup.children.push(heading);
      }
    });

    if (currentGroup) {
      groups.push(currentGroup);
    }

    return groups;
  }

  // Reactive statement: group headings whenever they change
  $: groupedHeadings = groupHeadingsByH2(headings);

  // Find which h2 section a heading belongs to
  function findParentH2(headingId: string): string {
    if (groupedHeadings.length === 0) return '';

    for (const group of groupedHeadings) {
      if (group.h2.id === headingId) {
        return headingId;
      }
      if (group.children.some((child) => child.id === headingId)) {
        return group.h2.id;
      }
    }
    return '';
  }

  // Update active h2 whenever activeId changes
  function updateActiveH2(headingId: string) {
    if (!headingId || groupedHeadings.length === 0) return;

    const parentH2 = findParentH2(headingId);
    if (parentH2 && parentH2 !== activeH2Id) {
      activeH2Id = parentH2;
    }
  }

  // Client-side only: Set up active state tracking
  onMount(() => {
    if (!browser || headings.length === 0) return;

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
            updateActiveH2(heading.id);
            break;
          }
        }
      }
    }, observerOptions);

    // Observe all headings by their IDs
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer?.observe(element);
      }
    });

    // Handle scroll events for better accuracy
    const handleScroll = () => {
      if (headings.length === 0 || groupedHeadings.length === 0) return;

      const scrollPosition = window.scrollY + 150;
      let foundHeading = false;

      // Find the current heading based on scroll position
      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        const element = document.getElementById(heading.id);
        if (element && element.offsetTop <= scrollPosition) {
          if (activeId !== heading.id) {
            activeId = heading.id;
            updateActiveH2(heading.id);
          }
          foundHeading = true;
          return;
        }
      }

      // If we're at the very top, highlight the first heading
      if (!foundHeading && headings.length > 0) {
        activeId = headings[0].id;
        updateActiveH2(headings[0].id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Set initial state with a small delay to ensure everything is ready
    setTimeout(() => {
      handleScroll();
    }, 50);

    scrollCleanup = () => {
      window.removeEventListener('scroll', handleScroll);
    };

    return () => {
      scrollCleanup?.();
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
      updateActiveH2(id);
    }
  }

  function getIndentClass(level: number): string {
    return `toc-h${level}`;
  }
</script>

<div class="toc-wrapper">
  <h3 class="panel-heading">On this page</h3>
  <nav id="toc" class="toc">
    {#if groupedHeadings.length > 0}
      <ul class="toc-list">
        {#each groupedHeadings as group (group.h2.id)}
          <li class="toc-item toc-h2" class:active={activeId === group.h2.id}>
            <a
              href="#{group.h2.id}"
              class="toc-link"
              class:active={activeId === group.h2.id}
              on:click={(e) => scrollToHeading(group.h2.id, e)}
            >
              {group.h2.text}
            </a>

            {#if group.children.length > 0}
              <ul class="toc-sublist" class:expanded={group.h2.id === activeH2Id}>
                {#each group.children as child (child.id)}
                  <li
                    class="toc-item {getIndentClass(child.level)}"
                    class:active={activeId === child.id}
                  >
                    <a
                      href="#{child.id}"
                      class="toc-link"
                      class:active={activeId === child.id}
                      on:click={(e) => scrollToHeading(child.id, e)}
                    >
                      {child.text}
                    </a>
                  </li>
                {/each}
              </ul>
            {/if}
          </li>
        {/each}
      </ul>
    {/if}
  </nav>
</div>
