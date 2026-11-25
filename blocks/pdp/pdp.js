const CART_KEY = 'fashionhub-cart';

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function parsePrice(text) {
  const match = text.replace(/,/g, '').match(/(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : 0;
}

function getProductData(block) {
  const img = block.querySelector('img');
  const text = block.textContent || '';
  const nameEl = block.querySelector('h1, h2, h3, h4, strong');
  const name = nameEl ? nameEl.textContent.trim() : 'Product';
  const priceMatch = text.match(/₹\s*[\d,]+/);
  const priceText = priceMatch ? priceMatch[0] : '₹0';
  const price = parsePrice(priceText);

  const sizeMatch = text.match(/Sizes?\s*:\s*([A-Z0-9,\s/]+)/i);
  const sizes = sizeMatch
    ? sizeMatch[1].split(/[,\s/]+/).map((s) => s.trim()).filter(Boolean)
    : ['S', 'M', 'L', 'XL'];

  const paragraphs = [...block.querySelectorAll('p')]
    .map((p) => p.textContent.trim())
    .filter((p) => p && !/^sizes?\s*:/i.test(p) && p !== name && p !== priceText);
  const description = paragraphs[0] || 'Premium quality fashion pick from FashionHub.';

  const id = window.location.pathname.replace(/\//g, '-').replace(/^-|-$/g, '') || name.toLowerCase().replace(/\s+/g, '-');

  return {
    id,
    name,
    price,
    priceText,
    description,
    sizes,
    image: img ? img.currentSrc || img.src : '',
    url: window.location.pathname,
  };
}

export default function decorate(block) {
  const product = getProductData(block);
  block.innerHTML = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'pdp-wrapper';

  const media = document.createElement('div');
  media.className = 'pdp-media';
  if (product.image) {
    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;
    img.loading = 'eager';
    media.append(img);
  }

  const details = document.createElement('div');
  details.className = 'pdp-details';
  details.innerHTML = `
    <p class="pdp-brand">FashionHub</p>
    <h1>${product.name}</h1>
    <p class="pdp-price">${product.priceText}</p>
    <p class="pdp-description">${product.description}</p>
  `;

  const sizeWrap = document.createElement('div');
  sizeWrap.className = 'pdp-sizes';
  sizeWrap.innerHTML = '<p class="pdp-label">Select Size</p>';
  const sizeOptions = document.createElement('div');
  sizeOptions.className = 'pdp-size-options';
  let selectedSize = product.sizes[0];
  product.sizes.forEach((size, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `pdp-size${i === 0 ? ' selected' : ''}`;
    btn.textContent = size;
    btn.addEventListener('click', () => {
      selectedSize = size;
      sizeOptions.querySelectorAll('.pdp-size').forEach((b) => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
    sizeOptions.append(btn);
  });
  sizeWrap.append(sizeOptions);

  const actions = document.createElement('div');
  actions.className = 'pdp-actions';
  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.className = 'button primary pdp-add';
  addBtn.textContent = 'Add to Bag';
  const msg = document.createElement('p');
  msg.className = 'pdp-message';
  msg.setAttribute('aria-live', 'polite');

  addBtn.addEventListener('click', () => {
    const cart = getCart();
    const existing = cart.find((item) => item.id === product.id && item.size === selectedSize);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        priceText: product.priceText,
        image: product.image,
        size: selectedSize,
        qty: 1,
        url: product.url,
      });
    }
    saveCart(cart);
    msg.innerHTML = `Added ${product.name} (${selectedSize}) to bag. <a href="/cart">Go to Cart</a>`;
  });

  actions.append(addBtn, msg);
  details.append(sizeWrap, actions);
  wrapper.append(media, details);
  block.append(wrapper);
}
