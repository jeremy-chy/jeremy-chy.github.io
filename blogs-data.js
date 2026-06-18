// =============================================================
//  Blog posts
// -------------------------------------------------------------
//  To add a new piece:
//    1. Create an article page, e.g. blogs/my-post.html
//       (copy an existing post in blogs/ as a starting template).
//    2. Add an entry to the TOP of the array below.
//
//  Fields:
//    title    - shown as the headline
//    date     - free-form date string
//    summary  - short blurb (optional)
//    url      - link to the article page (or any URL)
//    external - set true to open the link in a new tab (optional)
// =============================================================
const blogPosts = [
    {
        title: "Four Dials",
        date: "Jun 18, 2026",
        summary: "Four interlocking factors I use to read where society is heading under AI \u2014 and how to act on it.",
        url: "blogs/four-dials.html"
    }
];

// Renders the post list into a container element.
function renderBlogList(container, posts) {
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
