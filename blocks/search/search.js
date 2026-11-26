export default async function decorate(block) {
  const url = block.textContent.trim();

  if (!url) {
    block.innerHTML = '<p>No search index configured.</p>';
    return;
  }

  try {
    const response = await fetch(url);
    const json = await response.json();

    block.innerHTML = `
      <div class="fashion-search">
        <input
          type="text"
          id="fashion-search-input"
          placeholder="Search for products, brands and more"
        />
        <div id="fashion-search-results"></div>
      </div>
    `;

    const input = block.querySelector('#fashion-search-input');
    const results = block.querySelector('#fashion-search-results');
    const data = Array.isArray(json.data) ? json.data : [];

    const renderResults = (query) => {
      const q = query.toLowerCase().trim();
      if (!q) {
        results.innerHTML = '';
        return;
      }
      const filtered = data.filter((item) => (item.title || '').toLowerCase().includes(q));
      results.innerHTML = filtered.length
        ? filtered.map((item) => `
        <a href="${item.path || '#'}" class="search-result">
          <strong>${item.title || ''}</strong><br>
          ${item.description || ''}
        </a>
      `).join('')
        : '<p class="search-result">No results found.</p>';
    };

    input.addEventListener('input', () => renderResults(input.value));

    const initialQuery = new URLSearchParams(window.location.search).get('q');
    if (initialQuery) {
      input.value = initialQuery;
      renderResults(initialQuery);
    }
  } catch (e) {
    block.innerHTML = `<p>Search error: ${e.message}</p>`;
  }
}
