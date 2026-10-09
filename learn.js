// Load published recipes and articles from Laravel when it is available.
document.addEventListener('DOMContentLoaded', function () {
  var grid = document.getElementById('article-grid');
  if (!grid) return;

  fetch('/api/articles', { headers: { Accept: 'application/json' } }).then(function (response) {
    if (!response.ok) throw new Error('Content feed unavailable');
    return response.json();
  }).then(function (articles) {
    if (!Array.isArray(articles)) throw new Error('Invalid content feed');
    grid.replaceChildren();
    if (articles.length === 0) {
      var empty = document.createElement('p');
      empty.className = 'article-card';
      empty.textContent = 'New recipes and articles are on the way. Please check back soon.';
      grid.appendChild(empty);
      return;
    }

    articles.forEach(function (article) {
      var card = document.createElement('article');
      card.className = 'article-card';
      if (article.image_url) {
        var image = document.createElement('img');
        image.src = article.image_url;
        image.alt = '';
        image.loading = 'lazy';
        image.className = 'article-cover-thumb';
        card.appendChild(image);
      }
      var tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = article.type === 'recipe' ? 'Recipe' : 'Article';
      var meta = document.createElement('div');
      meta.className = 'article-meta';
      if (article.type === 'recipe' && article.prep_minutes) {
        var prep = document.createElement('span'); prep.textContent = 'Prep: ' + article.prep_minutes + ' min'; meta.appendChild(prep);
      }
      if (article.type === 'recipe' && article.servings) {
        var servings = document.createElement('span'); servings.textContent = 'Serves: ' + article.servings; meta.appendChild(servings);
      }
      if (article.published_at) {
        var date = document.createElement('span'); date.textContent = new Date(article.published_at + 'T00:00:00').toLocaleDateString(); meta.appendChild(date);
      }
      var heading = document.createElement('h3');
      var link = document.createElement('a'); link.href = article.url; link.textContent = article.title; heading.appendChild(link);
      var excerpt = document.createElement('p'); excerpt.textContent = article.excerpt;
      card.append(tag, meta, heading, excerpt);
      grid.appendChild(card);
    });
  }).catch(function () {
    // Keep the existing static articles visible until the backend is connected.
  });
});
