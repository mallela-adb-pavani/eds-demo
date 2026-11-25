const CART_KEY = 'fashionhub-cart';

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function formatINR(amount) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export default function decorate(block) {
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + (item.price || 0) * (item.qty || 1), 0);

  block.innerHTML = `
    <div class="checkout-layout">
      <form class="checkout-form">
        <h2>Delivery Details</h2>
        <label>Customer Name<input name="name" type="text" required placeholder="Enter full name"></label>
        <label>Address<textarea name="address" rows="4" required placeholder="House no, street, city, state, pincode"></textarea></label>
        <label>Phone Number<input name="phone" type="tel" required placeholder="10-digit mobile number"></label>
        <fieldset>
          <legend>Payment Method</legend>
          <label><input type="radio" name="payment" value="UPI" required> UPI</label>
          <label><input type="radio" name="payment" value="Card"> Credit / Debit Card</label>
          <label><input type="radio" name="payment" value="COD"> Cash on Delivery</label>
        </fieldset>
        <button type="submit" class="button primary">Place Order</button>
        <p class="checkout-message" aria-live="polite"></p>
      </form>
      <aside class="checkout-summary">
        <h2>Order Summary</h2>
        <p><span>Items</span><span>${cart.reduce((n, i) => n + (i.qty || 1), 0)}</span></p>
        <p class="checkout-total"><span>Total Amount</span><span>${formatINR(total)}</span></p>
        ${cart.length ? `<ul>${cart.map((i) => `<li>${i.name} (${i.size || '-'}) × ${i.qty || 1}</li>`).join('')}</ul>` : '<p>Your bag is empty. <a href="/men">Continue shopping</a></p>'}
      </aside>
    </div>
  `;

  const form = block.querySelector('.checkout-form');
  const msg = block.querySelector('.checkout-message');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!getCart().length) {
      msg.textContent = 'Your bag is empty. Please add products before placing an order.';
      return;
    }
    const data = new FormData(form);
    const orderId = `FH${Date.now().toString().slice(-6)}`;
    localStorage.removeItem(CART_KEY);
    form.reset();
    msg.innerHTML = `Order placed successfully! Order ID: <strong>${orderId}</strong>. Thank you, ${data.get('name')}.`;
    block.querySelector('.checkout-summary').innerHTML = '<h2>Order Summary</h2><p>Your order has been placed.</p><p><a class="button secondary" href="/">Continue Shopping</a></p>';
  });
}
