// Shop preview interactions. Orders are handed to WhatsApp; no payment details are collected here.
document.addEventListener('DOMContentLoaded', function () {
  var cart = {};
  var panel = document.querySelector('.cart-panel');
  var backdrop = document.querySelector('.cart-backdrop');
  var trigger = document.querySelector('.cart-trigger');
  var itemsEl = document.querySelector('.cart-items');
  var emptyEl = document.querySelector('.cart-empty');
  var subtotalEl = document.querySelector('.cart-subtotal');
  var countEl = document.querySelector('.cart-count');
  var checkout = document.querySelector('.checkout-button');
  var productGrid = document.querySelector('.product-grid');

  function useFolderPhoto(art, productId, altText) {
    var photo = document.createElement('img');
    photo.className = 'product-photo';
    photo.src = '/images/products/' + encodeURIComponent(productId) + '.jpg';
    photo.alt = altText;
    photo.loading = 'lazy';
    photo.addEventListener('load', function () { art.classList.add('has-photo'); }, { once: true });
    photo.addEventListener('error', function () { photo.remove(); }, { once: true });
    art.appendChild(photo);
  }

  // Static preview photos use the matching product ID as the filename, e.g. moringa-soap.jpg.
  document.querySelectorAll('.product-card').forEach(function (card) {
    var art = card.querySelector('.product-art');
    if (art) useFolderPhoto(art, card.dataset.id, card.dataset.name);
  });

  function openCart() {
    panel.classList.add('open'); panel.setAttribute('aria-hidden', 'false');
    backdrop.hidden = false; document.body.classList.add('cart-open'); trigger.setAttribute('aria-expanded', 'true');
    panel.querySelector('.cart-close').focus();
  }
  function closeCart() {
    panel.classList.remove('open'); panel.setAttribute('aria-hidden', 'true');
    backdrop.hidden = true; document.body.classList.remove('cart-open'); trigger.setAttribute('aria-expanded', 'false'); trigger.focus();
  }
  function renderCart() {
    var entries = Object.keys(cart).map(function (id) { return cart[id]; });
    var count = entries.reduce(function (sum, item) { return sum + item.quantity; }, 0);
    var allPricesKnown = entries.every(function (item) { return item.price !== null; });
    var subtotal = entries.reduce(function (sum, item) { return sum + (item.price === null ? 0 : item.price * item.quantity); }, 0);
    countEl.textContent = count;
    subtotalEl.textContent = count === 0 ? '—' : (allPricesKnown ? 'KSh ' + subtotal.toLocaleString('en-KE') : 'Confirm on WhatsApp');
    emptyEl.hidden = count > 0;
    itemsEl.innerHTML = '';
    entries.forEach(function (item) {
      var row = document.createElement('div'); row.className = 'cart-item';
      var name = document.createElement('span'); name.className = 'cart-item-name'; name.textContent = item.name;
      var price = document.createElement('span'); price.className = 'cart-item-price'; price.textContent = item.price === null ? 'Price to be confirmed' : 'KSh ' + (item.price * item.quantity).toLocaleString('en-KE');
      var controls = document.createElement('div'); controls.className = 'quantity-control';
      var minus = document.createElement('button'); minus.type = 'button'; minus.textContent = '−'; minus.setAttribute('aria-label', 'Remove one ' + item.name); minus.dataset.change = '-1'; minus.dataset.id = item.id;
      var qty = document.createElement('span'); qty.textContent = item.quantity;
      var plus = document.createElement('button'); plus.type = 'button'; plus.textContent = '+'; plus.setAttribute('aria-label', 'Add one ' + item.name); plus.dataset.change = '1'; plus.dataset.id = item.id;
      controls.append(minus, qty, plus); row.append(name, price, controls); itemsEl.appendChild(row);
    });
    checkout.disabled = count === 0;
  }
  productGrid.addEventListener('click', function (event) {
      var button = event.target.closest('.add-button');
      if (!button) return;
      var card = button.closest('.product-card'); var id = card.dataset.id;
      if (!cart[id]) cart[id] = { id: id, name: card.dataset.name, price: card.dataset.price === '' ? null : Number(card.dataset.price), quantity: 0 };
      cart[id].quantity += 1; renderCart();
      var previous = button.innerHTML; button.innerHTML = 'Added ✓';
      window.setTimeout(function () { button.innerHTML = previous; }, 900);
  });
  itemsEl.addEventListener('click', function (event) {
    var button = event.target.closest('[data-change]'); if (!button) return;
    var item = cart[button.dataset.id]; if (!item) return;
    item.quantity += Number(button.dataset.change); if (item.quantity <= 0) delete cart[item.id]; renderCart();
  });
  document.querySelectorAll('.filter-button').forEach(function (button) {
    button.addEventListener('click', function () {
      document.querySelectorAll('.filter-button').forEach(function (filter) { filter.classList.toggle('active', filter === button); });
      document.querySelectorAll('.product-card').forEach(function (card) { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; });
    });
  });
  trigger.addEventListener('click', openCart);
  panel.querySelector('.cart-close').addEventListener('click', closeCart);
  panel.querySelector('.continue-shopping').addEventListener('click', closeCart);
  backdrop.addEventListener('click', closeCart);
  document.addEventListener('keydown', function (event) { if (event.key === 'Escape' && panel.classList.contains('open')) closeCart(); });
  checkout.addEventListener('click', function () {
    var entries = Object.keys(cart).map(function (id) { return cart[id]; });
    var allPricesKnown = entries.every(function (item) { return item.price !== null; });
    var lines = entries.map(function (item) { return item.quantity + ' × ' + item.name + (item.price === null ? ' — price to confirm' : ' — KSh ' + (item.price * item.quantity).toLocaleString('en-KE')); });
    var total = entries.reduce(function (sum, item) { return sum + (item.price === null ? 0 : item.price * item.quantity); }, 0);
    var subtotal = allPricesKnown ? 'KSh ' + total.toLocaleString('en-KE') : 'To be confirmed on WhatsApp';
    var message = 'Hello Shemomo, I would like to order:\n' + lines.join('\n') + '\n\nSubtotal: ' + subtotal + '\nPlease confirm prices, availability and delivery options.';
    window.open('https://wa.me/254700643152?text=' + encodeURIComponent(message), '_blank', 'noopener,noreferrer');
  });
  renderCart();

  // When the Laravel backend is served from the same origin, replace the preview cards with live catalog data.
  fetch('/api/products', { headers: { Accept: 'application/json' } }).then(function (response) {
    if (!response.ok) throw new Error('Catalog unavailable');
    return response.json();
  }).then(function (products) {
    if (!Array.isArray(products)) throw new Error('Invalid catalog response');
    // Keep the supplied preview items visible until the admin has entered live products.
    if (products.length === 0) return;
    productGrid.replaceChildren();
    products.forEach(function (product) {
      var card = document.createElement('article'); card.className = 'product-card';
      var category = product.category === 'pantry' ? 'fermented' : product.category;
      card.dataset.id = String(product.id); card.dataset.name = product.name; card.dataset.price = String(product.price_kes); card.dataset.category = category; card.dataset.isInStock = product.is_in_stock ? 'true' : 'false';
      var art = document.createElement('div'); art.className = 'product-art live-product-art';
      if (product.image_url) {
        var photo = document.createElement('img'); photo.className = 'product-photo'; photo.src = product.image_url; photo.alt = product.name; photo.loading = 'lazy'; art.appendChild(photo);
        photo.addEventListener('load', function () { art.classList.add('has-photo'); }, { once: true });
        photo.addEventListener('error', function () { photo.remove(); }, { once: true });
      } else {
        art.textContent = product.category === 'kombucha' ? '✳' : '❋'; art.setAttribute('aria-label', product.name);
        useFolderPhoto(art, product.slug, product.name);
      }
      var info = document.createElement('div'); info.className = 'product-info';
      var categoryLabels = { kombucha: 'KOMBUCHA', fermented: 'FERMENTED GOODS', 'body-care': 'BODY CARE', supplement: 'SUPPLEMENT', home: 'HOME', pantry: 'FERMENTED GOODS' };
      var type = document.createElement('p'); type.className = 'product-type'; type.textContent = categoryLabels[product.category] || 'PANTRY';
      var availability = document.createElement('span'); availability.className = 'stock-status ' + (product.is_in_stock ? 'in-stock' : 'out-of-stock'); availability.textContent = product.is_in_stock ? 'In stock' : 'Out of stock';
      var name = document.createElement('h3'); name.textContent = product.name;
      var description = document.createElement('p'); description.textContent = product.description;
      var buy = document.createElement('div'); buy.className = 'product-buy';
      var price = document.createElement('span'); price.className = 'product-price'; price.textContent = 'KSh ' + Number(product.price_kes).toLocaleString('en-KE');
      var add = document.createElement('button'); add.type = 'button'; add.className = 'add-button';
      add.disabled = !product.is_in_stock;
      if (product.is_in_stock) {
        add.setAttribute('aria-label', 'Add ' + product.name + ' to basket'); add.append('Add ');
        var plus = document.createElement('span'); plus.textContent = '+'; add.appendChild(plus);
      } else {
        add.setAttribute('aria-label', product.name + ' is out of stock'); add.textContent = 'Out of stock';
      }
      buy.append(price, add); info.append(type, availability, name, description, buy); card.append(art, info); productGrid.appendChild(card);
    });
  }).catch(function () { /* Keep the clearly labelled static preview when no same-origin backend is connected. */ });
});
