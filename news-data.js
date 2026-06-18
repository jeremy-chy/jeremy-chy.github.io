// =============================================================
//  Recent News items
// -------------------------------------------------------------
//  Add a new item to the TOP of the array below.
//
//  Fields:
//    date    - free-form date string
//    image   - path to an illustration (optional)
//    content - the news text; HTML is allowed (e.g. <b>...</b>)
// =============================================================
const newsPosts = [
    // {
    //     date: "Oct 20, 2025",
    //     image: "material/news/UIUC-Robot-Lab.jpg",
    //     content: "We got access to the <b>UIUC Robotics Lab</b> and started to work on <b>Real Robots</b> for the first time!"
    // },
    {
        date: "Oct 14, 2025",
        image: "material/news/era.jpg",
        content: " <b>ERA(Embodied Reasoning Agent)</b> is finished and released! Check out if you are interested in transforming a small VLM into Embodied Agent with <b>Pretraining</b> and <b>Online Reinforcement Learning</b>."
    },
    {
        date: "July 12, 2025",
        image: "material/news/ICML-25-Oral.jpg",
        content: "I am very fortunate to give an <b>Oral Talk at ICML 2025</b> for our work <b>EmbodiedBench</b>."
    },
    {
        date: "Mar 20, 2025",
        image: "material/news/ebench.jpg",
        content: "We released <b>EmbodiedBench</b>: A comprehensive evaluating system for more fine-grained understanding of the capability of VLM for embodied tasks."
    }
];

// Renders the news list into a container element.
function renderNewsList(container, posts) {
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
        const item = document.createElement('div');
        item.className = 'news-item';

        if (post.image) {
            const img = document.createElement('img');
            img.className = 'news-image';
            img.src = post.image;
            img.alt = 'News illustration';
            img.loading = 'lazy';
            item.appendChild(img);
        }

        const body = document.createElement('div');
        body.className = 'news-body';

        const date = document.createElement('p');
        date.className = 'news-date';
        date.textContent = post.date;
        body.appendChild(date);

        const content = document.createElement('p');
        content.className = 'news-content';
        content.innerHTML = post.content;
        body.appendChild(content);

        item.appendChild(body);
        container.appendChild(item);
    });
}
