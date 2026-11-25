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

function formatINR(amount) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export default function decorate(block) {
  const render = () => {
    const cart = getCart();
    block.innerHTML = '';

    if (!cart.length) {
      block.innerHTML = '<div class="cart-empty"><h2>Your bag is empty</h2><p>Add items from Men or Women collections.</p><p><a class="button primary" href="/men">Shop Men</a> <a class="button secondary" href="/women">Shop Women</a></p></div>';
      return;
    }

    const list = document.createElement('div');
    list.className = 'cart-items';

    let total = 0;
    cart.forEach((item, index) => {
      total += (item.price || 0) * (item.qty || 1);
      const row = document.createElement('div');
      row.className = 'cart-item';
      row.innerHTML = `
        <div class="cart-item-image">${item.image ? `<img src="${item.image}" alt="${item.name}">` : ''}</div>
        <div class="cart-item-details">
          <h3><a href="${item.url || '#'}">${item.name}</a></h3>
          <p>Size: ${item.size || '-'}</p>
          <p>Qty: ${item.qty || 1}</p>
          <p class="cart-item-price">${item.priceText || formatINR(item.price || 0)}</p>
        </div>
      `;
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'cart-remove';
      remove.textContent = 'Remove';
      remove.addEventListener('click', () => {
        const next = getCart();
        next.splice(index, 1);
        saveCart(next);
        render();
      });
      row.querySelector('.cart-item-details').append(remove);
      list.append(row);
    });

    const summary = document.createElement('div');
    summary.className = 'cart-summary';
    summary.innerHTML = `
      <h2>Price Details</h2>
      <p><span>Total Items</span><span>${cart.reduce((n, i) => n + (i.qty || 1), 0)}</span></p>
      <p class="cart-total"><span>Total Amount</span><span>${formatINR(total)}</span></p>
      <p class="button-wrapper"><a class="button primary" href="/checkout">Proceed to Checkout</a></p>
    `;

    const layout = document.createElement('div');
    layout.className = 'cart-layout';
    layout.append(list, summary);
    block.append(layout);
  };

  render();
}
