const CART_KEY = 'fashionhub-cart';
const WISHLIST_KEY = 'fashionhub-wishlist';

function readStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function parsePrice(text) {
  const match = String(text).replace(/,/g, '').match(/(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : 0;
}

function getProductData(block) {
  const images = [...block.querySelectorAll('img')]
    .map((img) => ({
      src: img.currentSrc || img.src,
      alt: img.alt,
    }))
    .filter((item) => Boolean(item.src));

  const text = block.textContent || '';
  const nameEl = block.querySelector('h1, h2, h3, h4, strong');
  const name = nameEl ? nameEl.textContent.trim() : 'Product';

  const prices = [...text.matchAll(/₹\s*[\d,]+(?:\.\d{1,2})?/g)].map((match) => match[0]);
  const priceText = prices[0] || '₹0';
  const price = parsePrice(priceText);
  const mrpText = prices[1] || '';
  const mrp = parsePrice(mrpText);

  const discountMatch = text.match(/(\d{1,2})\s*%\s*off/i);
  const ratingMatch = text.match(/\b([0-5](?:\.\d)?)\s*(?:★|star|stars)?\s*[|·-]\s*([\d,.]+k?)\s*ratings?/i);

  const sizeMatch = text.match(/Sizes?\s*:\s*([A-Z0-9,\s/]+)/i);
  const sizes = sizeMatch
    ? sizeMatch[1].split(/[,\s/]+/).map((s) => s.trim()).filter(Boolean)
    : ['S', 'M', 'L', 'XL'];

  const paragraphs = [...block.querySelectorAll('p')]
    .map((p) => p.textContent.trim())
    .filter((p) => p
      && !/^sizes?\s*:/i.test(p)
      && !/^seller\s*:/i.test(p)
      && !/^inclusive of all taxes$/i.test(p)
      && !/^₹\s*[\d,]+/i.test(p)
      && p !== name
      && p !== priceText
      && p !== mrpText);

  const description = paragraphs[0] || 'Premium quality fashion pick from FashionHub.';

  const id = window.location.pathname.replace(/\//g, '-').replace(/^-|-$/g, '')
    || name.toLowerCase().replace(/\s+/g, '-');

  return {
    id,
    name,
    price,
    priceText,
    mrpText,
    mrp,
    discount: discountMatch ? discountMatch[1] : '',
    rating: ratingMatch ? ratingMatch[1] : '',
    ratingCount: ratingMatch ? ratingMatch[2] : '',
    description,
    sizes,
    images,
    image: images.length ? images[0].src : '',
    url: window.location.pathname,
  };
}

export default function decorate(block) {
  const product = getProductData(block);
  block.innerHTML = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'pdp-wrapper';

  const gallery = document.createElement('div');
  gallery.className = 'pdp-gallery';
  if (product.images.length === 1) gallery.classList.add('pdp-gallery-single');

  product.images.forEach((image, index) => {
    const media = document.createElement('div');
    media.className = 'pdp-media';
    const img = document.createElement('img');
    img.src = image.src;
    img.alt = image.alt || `${product.name} - view ${index + 1}`;
    img.loading = index < 2 ? 'eager' : 'lazy';
    media.append(img);
    gallery.append(media);
  });

  const details = document.createElement('div');
  details.className = 'pdp-details';

  const brand = document.createElement('p');
  brand.className = 'pdp-brand';
  brand.textContent = 'FashionHub';

  const title = document.createElement('h1');
  title.textContent = product.name;
  details.append(brand, title);

  if (product.rating) {
    const rating = document.createElement('p');
    rating.className = 'pdp-rating';
    rating.innerHTML = `<strong>${product.rating} <span aria-hidden="true">★</span></strong><span>${product.ratingCount} Ratings</span>`;
    details.append(rating);
  }

  const price = document.createElement('div');
  price.className = 'pdp-price';
  const currentPrice = document.createElement('strong');
  currentPrice.textContent = product.priceText;
  price.append(currentPrice);

  if (product.mrpText) {
    const mrp = document.createElement('del');
    mrp.textContent = product.mrpText;
    price.append(mrp);
  }

  if (product.discount) {
    const discount = document.createElement('span');
    discount.className = 'pdp-discount';
    discount.textContent = `(${product.discount}% OFF)`;
    price.append(discount);
  } else if (product.mrp > product.price && product.mrp) {
    const discount = document.createElement('span');
    discount.className = 'pdp-discount';
    discount.textContent = `(${Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF)`;
    price.append(discount);
  }
  details.append(price);

  const taxNote = document.createElement('p');
  taxNote.className = 'pdp-tax-note';
  taxNote.textContent = 'Inclusive of all taxes';
  details.append(taxNote);

  const description = document.createElement('p');
  description.className = 'pdp-description';
  description.textContent = product.description;
  details.append(description);

  const sizeWrap = document.createElement('div');
  sizeWrap.className = 'pdp-sizes';

  const sizeHeader = document.createElement('div');
  sizeHeader.className = 'pdp-size-header';
  sizeHeader.innerHTML = '<p class="pdp-label">Select Size</p><button class="pdp-size-guide" type="button" aria-expanded="false">Size Guide ›</button>';

  const sizeGuide = document.createElement('p');
  sizeGuide.className = 'pdp-size-guide-content';
  sizeGuide.hidden = true;
  sizeGuide.textContent = `Available sizes: ${product.sizes.join(', ')}. Choose your usual size for a comfortable fit.`;

  sizeHeader.querySelector('.pdp-size-guide').addEventListener('click', (event) => {
    const button = event.currentTarget;
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    sizeGuide.hidden = expanded;
  });

  const sizeOptions = document.createElement('div');
  sizeOptions.className = 'pdp-size-options';
  let selectedSize = product.sizes[0];

  product.sizes.forEach((size, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `pdp-size${i === 0 ? ' selected' : ''}`;
    btn.setAttribute('aria-pressed', String(i === 0));
    btn.innerHTML = `<strong>${size}</strong><span>${product.priceText}</span>`;
    btn.addEventListener('click', () => {
      selectedSize = size;
      sizeOptions.querySelectorAll('.pdp-size').forEach((b) => {
        b.classList.remove('selected');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('selected');
      btn.setAttribute('aria-pressed', 'true');
    });
    sizeOptions.append(btn);
  });
  sizeWrap.append(sizeHeader, sizeGuide, sizeOptions);

  const actions = document.createElement('div');
  actions.className = 'pdp-actions';

  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.className = 'button primary pdp-add';
  addBtn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8h12l1 13H5L6 8Zm3 0V6a3 3 0 0 1 6 0v2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg> Add to Bag';

  const initialWishlist = readStorage(WISHLIST_KEY);
  const isInitiallyWishlisted = initialWishlist.some((item) => item.id === product.id);

  const wishlistBtn = document.createElement('button');
  wishlistBtn.type = 'button';
  wishlistBtn.className = 'pdp-wishlist';
  wishlistBtn.setAttribute('aria-pressed', String(isInitiallyWishlisted));
  wishlistBtn.innerHTML = isInitiallyWishlisted
    ? '<span aria-hidden="true">♥</span> Wishlisted'
    : '<span aria-hidden="true">♡</span> Wishlist';

  const msg = document.createElement('p');
  msg.className = 'pdp-message';
  msg.setAttribute('aria-live', 'polite');

  wishlistBtn.addEventListener('click', () => {
    const wishlist = readStorage(WISHLIST_KEY);
    const existsIndex = wishlist.findIndex((item) => item.id === product.id);
    const added = existsIndex === -1;

    if (added) {
      wishlist.push({
        id: product.id,
        name: product.name,
        price: product.price,
        priceText: product.priceText,
        image: product.image,
        url: product.url,
      });
    } else {
      wishlist.splice(existsIndex, 1);
    }

    writeStorage(WISHLIST_KEY, wishlist);
    wishlistBtn.setAttribute('aria-pressed', String(added));
    wishlistBtn.innerHTML = added
      ? '<span aria-hidden="true">♥</span> Wishlisted'
      : '<span aria-hidden="true">♡</span> Wishlist';
  });

  addBtn.addEventListener('click', () => {
    const cart = readStorage(CART_KEY);
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
    writeStorage(CART_KEY, cart);
    msg.innerHTML = `Added ${product.name} (${selectedSize}) to bag. <a href="/cart">Go to Cart</a>`;
  });

  actions.append(addBtn, wishlistBtn);

  const seller = document.createElement('p');
  seller.className = 'pdp-seller';
  seller.innerHTML = '<strong>Seller:</strong> FashionHub';

  details.append(sizeWrap, actions, msg, seller);
  wrapper.append(gallery, details);
  block.append(wrapper);
}
