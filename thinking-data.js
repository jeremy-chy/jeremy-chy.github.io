// =============================================================
//  Thinking posts
// -------------------------------------------------------------
//  To add a new piece:
//    1. Create an article page, e.g. thinking/my-post.html
//       (copy thinking/example-post.html as a starting template).
//    2. Add an entry to the TOP of the array below.
//
//  Fields:
//    title    - shown as the headline
//    date     - free-form date string
//    summary  - short blurb (optional)
//    url      - link to the article page (or any URL)
//    external - set true to open the link in a new tab (optional)
// =============================================================
const thinkingPosts = [
    {
        title: "Why I started writing things down",
        date: "Jun 18, 2026",
        summary: "A short note on keeping a public log of half-formed ideas, and why that is worth the embarrassment.",
        url: "thinking/example-post.html"
    },
    {
        title: "Decision making is just search under uncertainty",
        date: "Jun 10, 2026",
        summary: "Trying to unify how I think about planning, RL, and everyday choices.",
        url: "thinking/example-post.html"
    },
    {
        title: "Notes on embodied agents",
        date: "May 28, 2026",
        summary: "What changes once an agent has a body and the world stops being a frozen dataset.",
        url: "thinking/example-post.html"
    },
    {
        title: "On reading papers slowly",
        date: "May 2, 2026",
        summary: "A workflow for getting more out of fewer papers.",
        url: "thinking/example-post.html"
    },
    {
        title: "Things I was wrong about this year",
        date: "Apr 15, 2026",
        summary: "An incomplete and growing list.",
        url: "thinking/example-post.html"
    }
];

// Renders the post list into a container element.
function renderThinkingList(container, posts) {
    if (!container) return;
    container.innerHTML = '';

    if (!posts || !posts.length) {
        const empty = document.createElement('p');
        empty.className = 'thinking-empty';
        empty.textContent = 'Nothing here yet — check back soon.';
        container.appendChild(empty);
        return;
    }

    posts.forEach(post => {
        const item = document.createElement('a');
        item.className = 'thinking-item';
        item.href = post.url || '#';
        if (post.external) {
            item.target = '_blank';
            item.rel = 'noopener';
        }

        if (post.date) {
            const date = document.createElement('p');
            date.className = 'thinking-item-date';
            date.textContent = post.date;
            item.appendChild(date);
        }

        const title = document.createElement('p');
        title.className = 'thinking-item-title';
        title.textContent = post.title || 'Untitled';
        item.appendChild(title);

        if (post.summary) {
            const summary = document.createElement('p');
            summary.className = 'thinking-item-summary';
            summary.textContent = post.summary;
            item.appendChild(summary);
        }

        container.appendChild(item);
    });
}
