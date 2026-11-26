# FashionHub – Adobe EDS DA Capstone (Implementation Plan & Content)

**Project:** FashionHub (Myntra-inspired fashion eCommerce demo)  
**Stack:** Adobe Edge Delivery Services (EDS), Document Authoring (DA), AEM Sidekick, GitHub repo (`mallela-adb-pavani/eds-demo`)  
**Demo flow:** Home → Men/Women → Product Detail → Add to Cart → Cart → Checkout

This document provides a 2-day, capstone-ready plan with **page-by-page DA content**, block structures, navigation/footer, sample data, styling guidance, cart persistence plan, and demo talking points.

---

## 1. Capstone scope and 2-day implementation plan

### Goals demonstrated
- **Adobe EDS:** block-based pages, fragment-based header/footer, local dev with `aem up`, preview/publish flow.
- **DA Authoring:** pages and fragments authored as sections/blocks (tables) in DA.
- **Sidekick:** preview, publish, and edit actions during demo.
- **Blocks:** `Hero`, `Cards`, `Columns` (core), plus lightweight custom `PDP`, `Cart`, `Checkout` blocks for end-to-end shopping.
- **Header/Footer:** shared via `/nav` and `/footer` fragments.
- **End-to-end flow:** browse → PDP → add to bag (localStorage) → cart → checkout confirmation.

### Day 1 (build & author)
| Time | Task | Output |
| --- | --- | --- |
| 0.5h | Sync repo, run `npm i`, start `aem up` | Local preview ready |
| 1.5h | Create/update `/nav`, `/footer`, `/` in DA using content below | Header/footer/home live |
| 1.5h | Create `/men`, `/women` category pages with product cards | Category browsing |
| 1.5h | Create `/nike-tshirt` PDP using `PDP` block; verify add-to-bag | PDP + localStorage write |
| 1h | Create `/cart` and `/checkout` pages using `Cart`/`Checkout` blocks | Cart/checkout flow |
| 1h | Style polish (responsive, spacing, CTA states), preview/publish via Sidekick | Demo-ready UI |

### Day 2 (validate & present)
| Time | Task | Output |
| --- | --- | --- |
| 1h | Test full journey, edge cases (empty cart, size selection), fix content | Stable demo |
| 1h | Capture screenshots/preview links, prepare talking points | Presentation assets |
| 1h | Rehearse Sidekick preview/publish and DA edits | Confident demo |
| 1h | Buffer for fixes/content tweaks | Submission-ready |

### Repo implementation status (included)
- Styled core blocks/pages: [styles/styles.css](C:/Users/mallela.pavani/EDS/eds-demo/styles/styles.css), [blocks/header/header.css](C:/Users/mallela.pavani/EDS/eds-demo/blocks/header/header.css), [blocks/footer/footer.css](C:/Users/mallela.pavani/EDS/eds-demo/blocks/footer/footer.css), [blocks/hero/hero.css](C:/Users/mallela.pavani/EDS/eds-demo/blocks/hero/hero.css), [blocks/cards/cards.css](C:/Users/mallela.pavani/EDS/eds-demo/blocks/cards/cards.css), [blocks/columns/columns.css](C:/Users/mallela.pavani/EDS/eds-demo/blocks/columns/columns.css)
- Custom commerce demo blocks: [blocks/pdp/pdp.js](C:/Users/mallela.pavani/EDS/eds-demo/blocks/pdp/pdp.js), [blocks/pdp/pdp.css](C:/Users/mallela.pavani/EDS/eds-demo/blocks/pdp/pdp.css), [blocks/cart/cart.js](C:/Users/mallela.pavani/EDS/eds-demo/blocks/cart/cart.js), [blocks/cart/cart.css](C:/Users/mallela.pavani/EDS/eds-demo/blocks/cart/cart.css), [blocks/checkout/checkout.js](C:/Users/mallela.pavani/EDS/eds-demo/blocks/checkout/checkout.js), [blocks/checkout/checkout.css](C:/Users/mallela.pavani/EDS/eds-demo/blocks/checkout/checkout.css)

> **Note:** `npm run lint` may fail on pre-existing repo issues (e.g. dependency/core-web-vitals config) unrelated to this capstone; targeted lint on modified/new files was used during implementation.

---

## 2. Navigation structure (`/nav` fragment)

**Purpose:** shared header (brand, primary nav, tools). `header` block loads `/nav` and maps the first 3 sections to `nav-brand`, `nav-sections`, and `nav-tools`.

| Area | Items | EDS/DA structure |
| --- | --- | --- |
| Brand | FASHIONHUB (home link) | Section 1: plain text/link |
| Primary nav | MEN, WOMEN, KIDS, BEAUTY, NEW ARRIVALS | Section 2: bulleted link list |
| Tools | Search Products, Profile, Wishlist, Bag | Section 3: bulleted link list; first item becomes search-style area |

### DA content: `/nav`
```md
**[FASHIONHUB](/)**

---

- [MEN](/men)
- [WOMEN](/women)
- [KIDS](/kids)
- [BEAUTY](/beauty)
- [NEW ARRIVALS](/new-arrivals)

---

- [Search Products](/search)
- [Profile](/profile)
- [Wishlist](/wishlist)
- [Bag](/cart)
```

**Authoring notes:** Keep exactly 3 sections in order. The first Tools item renders as the search-style pill via [blocks/header/header.css](C:/Users/mallela.pavani/EDS/eds-demo/blocks/header/header.css). On mobile, [blocks/header/header.js](C:/Users/mallela.pavani/EDS/eds-demo/blocks/header/header.js) provides hamburger behavior.

---

## 3. Footer structure (`/footer` fragment)

**Purpose:** shared site footer with brand, shop links, customer care, and legal links.

| Column | Content |
| --- | --- |
| Brand | FashionHub value proposition |
| Shop | Men, Women, Kids, Beauty, New Arrivals |
| Customer Care | Contact Us, Track Orders, Returns, Support |
| Legal | Privacy Policy, Terms & Conditions |
| Bottom | Copyright |

### DA content: `/footer`
```md
| Columns |
| --- |
| **FASHIONHUB**<br>Your destination for trend-led fashion,<br>beauty and lifestyle. | **SHOP**<br>[Men](/men)<br>[Women](/women)<br>[Kids](/kids)<br>[Beauty](/beauty)<br>[New Arrivals](/new-arrivals) | **CUSTOMER CARE**<br>[Contact Us](/contact)<br>[Track Orders](/track-orders)<br>[Returns](/returns)<br>[Support](/support) | **LEGAL**<br>[Privacy Policy](/privacy-policy)<br>[Terms & Conditions](/terms-and-conditions) |

© 2026 FashionHub. All Rights Reserved.
```

---

## 4. Page-by-page DA authoring content and block structure

### 4.1 Home (`/`)

**Goal:** inspire discovery and route users to Men/Women and offers.

| Section | Block(s) | Content intent |
| --- | --- | --- |
| Hero | `Hero` | End-of-season campaign, primary CTA |
| Featured Categories | `Cards` | Men, Women, Kids, Beauty entry points |
| Trending Brands | `Cards (brands)` | Nike, Adidas, Puma, Levi's |
| Why Shop With Us | `Columns` | Trust, returns, payments, delivery |
| Special Offers | `Cards (offers)` | B2G1, Flat 50%, Free shipping |
| Footer | fragment | Shared `/footer` |

### DA content: `/`
```md
| Hero |
| --- |
| ![Fashion models showcasing end of season styles](https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80) |
| # End of Season Sale<br>Up to 70% OFF on Top Fashion Brands<br>Refresh your wardrobe with the season's most-loved styles.<br><br>**[Shop Now](/women)** *[Explore Men](/men)* |

---

## Featured Categories
Shop the latest trends across every style.

| Cards |
| --- |
| ![Men's fashion](https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=900&q=80)<br><br>### [Men's Fashion](/men)<br>Sharp fits, everyday essentials, and standout streetwear. |
| ![Women's fashion](https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80)<br><br>### [Women's Fashion](/women)<br>Chic dresses, ethnic edits, and modern silhouettes. |
| ![Kids wear](https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=900&q=80)<br><br>### [Kids Wear](/kids)<br>Playful, comfy styles for every little trendsetter. |
| ![Beauty essentials](https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80)<br><br>### [Beauty Essentials](/beauty)<br>Skincare, makeup, and grooming must-haves. |

---

## Trending Brands
Top labels everyone’s loving right now.

| Cards (brands) |
| --- |
| ![Nike style](https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80)<br><br>### Nike<br>Performance meets street style.<br><br>[Shop Nike Tee](/nike-tshirt) |
| ![Adidas style](https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=80)<br><br>### Adidas<br>Iconic classics and modern athleisure. |
| ![Puma style](https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=900&q=80)<br><br>### Puma<br>Bold designs for everyday movement. |
| ![Levi's style](https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80)<br><br>### Levi's<br>Timeless denim and wardrobe staples. |

| Section Metadata |
| --- |
| style | highlight |

---

## Why Shop With Us
A better way to shop fashion online.

| Columns |
| --- |
| ### Trusted Brands<br>100% authentic products from leading global and Indian labels. | ### Easy Returns<br>Hassle-free returns and quick exchanges on eligible orders. | ### Secure Payments<br>Safe checkout with UPI, cards, and cash on delivery. | ### Fast Delivery<br>Reliable doorstep delivery with easy order tracking. |

---

## Special Offers
Don’t miss these limited-time deals.

| Cards (offers) |
| --- |
| ![Offer](https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80)<br><br>### Buy 2 Get 1 Free<br>Mix and match across select styles.<br><br>**[Grab Offer](/men)** |
| ![Offer](https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80)<br><br>### Flat 50% Off<br>On trending picks from top brands.<br><br>**[Shop Deals](/women)** |
| ![Offer](https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=900&q=80)<br><br>### Free Shipping Above ₹999<br>Delivered to your doorstep at no extra cost.<br><br>**[Start Shopping](/men)** |

| Section Metadata |
| --- |
| style | light |
```

---

### 4.2 Men (`/men`)

**Goal:** category landing with banner and 4 shoppable products linking to PDP.

| Section | Block(s) | Content intent |
| --- | --- | --- |
| Category banner | `Hero` | Men's collection campaign |
| Product grid | `Cards` | 4 men's products (image, name, price, CTA) |

### DA content: `/men`
```md
| Hero |
| --- |
| ![Men's fashion banner](https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=1600&q=80) |
| # Men's Fashion<br>Styles that work from weekday to weekend.<br><br>**[Shop New Arrivals](/men)** |

---

## Men's Best Picks
Handpicked essentials and trending looks.

| Cards |
| --- |
| ![Nike Dri-FIT Running T-Shirt](https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80)<br><br>### [Nike Dri-FIT Running T-Shirt](/nike-tshirt)<br>**₹1,299** · Breathable active tee<br><br>**[View Product](/nike-tshirt)** |
| ![Levi's Slim Fit Jeans](https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80)<br><br>### [Levi's Slim Fit Jeans](/nike-tshirt)<br>**₹2,499** · Classic denim comfort<br><br>**[View Product](/nike-tshirt)** |
| ![Puma Street Sneakers](https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=900&q=80)<br><br>### [Puma Street Sneakers](/nike-tshirt)<br>**₹3,299** · Everyday cushioned style<br><br>**[View Product](/nike-tshirt)** |
| ![Adidas Training Jacket](https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80)<br><br>### [Adidas Training Jacket](/nike-tshirt)<br>**₹2,999** · Lightweight layer for workouts<br><br>**[View Product](/nike-tshirt)** |

| Section Metadata |
| --- |
| style | light |
```

> **Demo note:** For a 2-day build, extra product cards can link to the implemented `/nike-tshirt` PDP (or duplicate PDP pages like `/levis-jeans` later). The flow and UI pattern are fully demonstrated.

---

### 4.3 Women (`/women`)

**Goal:** category landing with banner and 4 women's products.

| Section | Block(s) | Content intent |
| --- | --- | --- |
| Category banner | `Hero` | Women's collection campaign |
| Product grid | `Cards` | 4 women's products |

### DA content: `/women`
```md
| Hero |
| --- |
| ![Women's fashion banner](https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80) |
| # Women's Fashion<br>Discover styles made to stand out.<br><br>**[Shop New Arrivals](/women)** |

---

## Women's Best Picks
Fresh edits for work, weekends, and everything in between.

| Cards |
| --- |
| ![Floral Summer Dress](https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=80)<br><br>### [Floral Summer Dress](/nike-tshirt)<br>**₹1,899** · Breezy, flattering silhouette<br><br>**[View Product](/nike-tshirt)** |
| ![Classic Handbag](https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80)<br><br>### [Classic Handbag](/nike-tshirt)<br>**₹2,299** · Structured everyday carry<br><br>**[View Product](/nike-tshirt)** |
| ![Ethnic Kurta Set](https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80)<br><br>### [Ethnic Kurta Set](/nike-tshirt)<br>**₹2,799** · Festive comfort with elegant detail<br><br>**[View Product](/nike-tshirt)** |
| ![Activewear Co-ord](https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=900&q=80)<br><br>### [Activewear Co-ord](/nike-tshirt)<br>**₹1,599** · Stretch fit for move-all-day ease<br><br>**[View Product](/nike-tshirt)** |

| Section Metadata |
| --- |
| style | light |
```

---

### 4.4 Product Detail (`/nike-tshirt`)

**Goal:** show product info and add selected size to cart (localStorage).

| Section | Block(s) | Content intent |
| --- | --- | --- |
| Product detail | `PDP` (custom) | Multi-image gallery, product details, pricing, sizes, Add to Bag, Wishlist |
| Trust/benefits | `Columns` | Delivery/returns/payment reassurance |
| Related CTA | `Cards` or links | Continue shopping |

### DA content: `/nike-tshirt`
```md
| PDP |
| --- |
| ![Nike Dri-FIT Running T-Shirt front](https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80)<br>![Nike Dri-FIT Running T-Shirt detail](https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80)<br>![Nike Dri-FIT Running T-Shirt back](https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1200&q=80)<br>![Nike Dri-FIT Running T-Shirt lifestyle](https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=1200&q=80) | ## Nike Dri-FIT Running T-Shirt<br><br>**₹1,299** MRP ₹1,999 (35% OFF)<br><br>4.4 ★ | 36.9k Ratings<br><br>Stay cool through every run with sweat-wicking Dri-FIT fabric, a relaxed athletic fit, and soft-touch comfort designed for all-day wear.<br><br>Sizes: S, M, L, XL |

---

## Why you'll love it

| Columns |
| --- |
| ### Breathable Fabric<br>Lightweight material keeps you comfortable on the move. | ### Easy Returns<br>30-day hassle-free returns on eligible items. | ### Secure Checkout<br>Pay safely with UPI, cards, or cash on delivery. |

---

## Continue Shopping
| Cards |
| --- |
| ![Men](https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=900&q=80)<br><br>### [Back to Men](/men)<br>Explore more men's styles. |
| ![Women](https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80)<br><br>### [Shop Women](/women)<br>Discover the latest women's picks. |
| ![Cart](https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=900&q=80)<br><br>### [Go to Bag](/cart)<br>Review items and checkout. |
```

**PDP block behavior:** collects all authored images for the gallery, parses product name/price/description/ratings/sizes, renders a size guide, and provides **Add to Bag** and **Wishlist** controls. Add to Bag stores the selected size in `localStorage` key `fashionhub-cart` and shows a “Go to Cart” link. Add two to four images to the first PDP cell to populate the gallery; the block still lays out a single image correctly.

---

### 4.5 Cart (`/cart`)

**Goal:** display cart items, total amount, proceed to checkout.

| Section | Block(s) | Content intent |
| --- | --- | --- |
| Intro | default content | Page heading/context |
| Cart | `Cart` (custom) | Items, qty, remove, total, proceed CTA |

### DA content: `/cart`
```md
# Your Bag
Review your selected styles before checkout.

| Cart |
| --- |

---

## Need help?
| Columns |
| --- |
| ### Easy Returns<br>Return eligible items within 30 days. | ### Secure Payments<br>Your checkout details are protected. | ### Support<br>[Contact us](/contact) for order assistance. |
```

**Cart block behavior:** reads `fashionhub-cart` from localStorage, renders item rows (image, name, size, qty, price), supports remove, computes total, and links to `/checkout`. Shows empty-state CTAs when no items exist.

---

### 4.6 Checkout (`/checkout`)

**Goal:** collect customer/order details and place demo order.

| Section | Block(s) | Content intent |
| --- | --- | --- |
| Intro | default content | Page heading |
| Checkout | `Checkout` (custom) | Name, address, phone, payment, place order, summary |

### DA content: `/checkout`
```md
# Checkout
Complete your details to place your order.

| Checkout |
| --- |

---

| Columns |
| --- |
| ### Secure Payments<br>UPI, cards, and cash on delivery options. | ### Fast Delivery<br>Estimated delivery in 3–5 business days. | ### Easy Returns<br>Simple returns on eligible products. |
```

**Checkout block behavior:** displays delivery form (Customer Name, Address, Phone Number), payment method (UPI/Card/COD), order summary/total from cart, and **Place Order**. On submit (demo): validates required fields, generates order ID, clears cart, and shows confirmation.

---

## 5. Sample product data and pricing

| ID | Name | Category | Price (₹) | Sizes | Image (demo) | Page/Link |
| --- | --- | --- | --- | --- | --- | --- |
| nike-tshirt | Nike Dri-FIT Running T-Shirt | Men | 1,299 | S, M, L, XL | Unsplash tee | `/nike-tshirt` |
| levis-jeans | Levi's Slim Fit Jeans | Men | 2,499 | 30, 32, 34, 36 | Unsplash denim | `/nike-tshirt` (demo link) |
| puma-sneakers | Puma Street Sneakers | Men | 3,299 | 7, 8, 9, 10 | Unsplash shoes | `/nike-tshirt` (demo link) |
| adidas-jacket | Adidas Training Jacket | Men | 2,999 | S, M, L, XL | Unsplash jacket | `/nike-tshirt` (demo link) |
| floral-dress | Floral Summer Dress | Women | 1,899 | XS, S, M, L | Unsplash dress | `/nike-tshirt` (demo link) |
| classic-handbag | Classic Handbag | Women | 2,299 | One Size | Unsplash bag | `/nike-tshirt` (demo link) |
| kurta-set | Ethnic Kurta Set | Women | 2,799 | S, M, L, XL | Unsplash ethnic | `/nike-tshirt` (demo link) |
| activewear-coord | Activewear Co-ord | Women | 1,599 | XS, S, M, L | Unsplash active | `/nike-tshirt` (demo link) |

**Pricing notes:** use `₹` prefix consistently; totals in cart/checkout are computed from numeric price values.

---

## 6. Suggested responsive styling for `styles.css`

Add/keep these responsive enhancements in [styles/styles.css](C:/Users/mallela.pavani/EDS/eds-demo/styles/styles.css) (some already applied):

```css
/* Capstone responsive refinements */
:root {
  --nav-height: 64px;
}

@media (width >= 900px) {
  :root {
    --nav-height: 80px;
  }
}

main > .section {
  margin: 32px 0;
}

main > .section > div {
  max-width: 1200px;
  margin: auto;
  padding: 0 16px;
}

@media (width >= 600px) {
  main > .section > div {
    padding: 0 24px;
  }
}

@media (width >= 900px) {
  main > .section {
    margin: 48px 0;
  }

  main > .section > div {
    padding: 0 32px;
  }
}

/* Touch-friendly CTAs */
a.button:any-link,
button.button {
  min-height: 44px;
}

/* Prevent long words/URLs from breaking layout */
main h1, main h2, main h3, main p {
  overflow-wrap: anywhere;
}
```

**Block-specific responsiveness (already implemented):**
- `hero`: fluid typography (`clamp`), reduced padding on mobile, full-bleed image.
- `cards`: auto-fit grid, stacked on small screens.
- `columns`: stacked on mobile, flex/grid-like row on desktop; promo/banner variants collapse gracefully.
- `header`: hamburger/mobile menu below 900px, inline nav + tools on desktop.
- `pdp/cart/checkout`: single-column on mobile, two-column (content + summary) on desktop.

---

## 7. localStorage implementation plan for Cart

### Data contract
- **Key:** `fashionhub-cart`
- **Format:** JSON array of line items
```json
[
  {
    "id": "nike-tshirt",
    "name": "Nike Dri-FIT Running T-Shirt",
    "price": 1299,
    "priceText": "₹1,299",
    "image": "https://...",
    "size": "M",
    "qty": 1,
    "url": "/nike-tshirt"
  }
]
```

### Operations
| Action | Where | Logic |
| --- | --- | --- |
| Read cart | PDP/Cart/Checkout | `JSON.parse(localStorage.getItem('fashionhub-cart') || '[]')` with try/catch |
| Add item | PDP "Add to Bag" | If same `id`+`size` exists increment `qty`, else push new item; `setItem` |
| Remove item | Cart | Remove index/item, persist, re-render |
| Compute total | Cart/Checkout | `sum(price * qty)`; format with `toLocaleString('en-IN')` |
| Clear cart | Checkout submit | `localStorage.removeItem('fashionhub-cart')` after "order placed" |
| Empty state | Cart/Checkout | Show guidance/CTAs when array empty |

### UX/edge considerations
- Show confirmation + link to `/cart` after add.
- Disable/place-order feedback if cart is empty.
- localStorage is per-browser/device (sufficient for capstone demo).
- Keep schema simple and versionless; if parsing fails, fall back to `[]`.

**Implemented in:** [blocks/pdp/pdp.js](C:/Users/mallela.pavani/EDS/eds-demo/blocks/pdp/pdp.js), [blocks/cart/cart.js](C:/Users/mallela.pavani/EDS/eds-demo/blocks/cart/cart.js), [blocks/checkout/checkout.js](C:/Users/mallela.pavani/EDS/eds-demo/blocks/checkout/checkout.js).

---

## 8. Demo explanation points (capstone presentation)

1. **Architecture:** EDS serves authored content + repo code; DA holds page content, GitHub holds blocks/styles/scripts, Sidekick manages preview/publish.
2. **Fragments:** `/nav` and `/footer` authored once and reused across pages via header/footer blocks (`getMetadata`/fragment loading).
3. **Block authoring:** show a DA table (`Hero`, `Cards`, `Columns`, `PDP`, `Cart`, `Checkout`) and corresponding rendered UI.
4. **Responsive design:** resize viewport to show mobile hamburger, stacked cards/columns, and two-column PDP/cart/checkout on desktop.
5. **End-to-end flow:** Home → Men/Women → `/nike-tshirt` → select size → Add to Bag → `/cart` (total, remove) → `/checkout` (form, payment, place order).
6. **Client-side state:** explain `localStorage` cart persistence across pages and reset on order confirmation.
7. **Sidekick workflow:** edit in DA, preview to validate, publish to live URL; code/content deployment separation (merge code vs publish content).
8. **Extensibility:** mention how to add real product pages, search, analytics/RUM, or commerce APIs beyond this 2-day demo.

---

## 9. Quick setup & demo checklist

- [ ] Install AEM Code Sync app and confirm preview URLs work.
- [ ] Run locally: `npm i` then `npx -y @adobe/aem-cli up`.
- [ ] Author `/nav`, `/footer`, `/`, `/men`, `/women`, `/nike-tshirt`, `/cart`, `/checkout` in DA with content above.
- [ ] Preview all pages and test: add to bag → cart total/remove → checkout place order.
- [ ] Capture links: `{branch}--eds-demo--mallela-adb-pavani.aem.page/` for PR/demo as required.
