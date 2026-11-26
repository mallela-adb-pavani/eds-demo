# FashionHub – Adobe EDS DA Authoring Content (Myntra-inspired)

This file contains copy-ready content for **Adobe EDS / Document Authoring (DA)** for a Myntra-inspired FashionHub homepage.
Create/update:
- `/nav` (header fragment)
- `/index` (homepage)
- `/footer` (footer fragment)

> **Images:** Unsplash URLs are included for demo use. Replace with your own assets in DA as needed.
> **Blocks:** EDS block tables map to `header`, `hero`, `cards`, `columns`, and `footer`. Variants like `Cards (brands)` and `Columns (promo)` become CSS classes.

---

## 1) `/nav` (Header Navigation)

Create `/nav` with **three sections** in order (separate with section breaks in DA).

### Section 1 (Brand)

**[FASHIONHUB](/)**

---

### Section 2 (Navigation)

- [MEN](/men)
- [WOMEN](/women)
- [KIDS](/kids)
- [BEAUTY](/beauty)
- [NEW ARRIVALS](/new-arrivals)

---

### Section 3 (Tools)

- [Search Products](/search)
- [Profile](/profile)
- [Wishlist](/wishlist)
- [Bag](/cart)

> The first item in Tools becomes the search-style area via [blocks/header/header.css](C:/Users/mallela.pavani/EDS/eds-demo/blocks/header/header.css). Keep Search Products first.

---

## 2) `/index` (Homepage)

### Promo Strip (like Myntra coupon banner)
| Columns (promo) |
| --- |
| ## Get 25% Off<br>**Up To ₹200 Off\*** | **COUPON CODE**<br><br>`FASHIONHUB25` | On Your First Order \| [T&C Apply](/terms-and-conditions) |

---

### Main Sale Banner (split)
| Columns (banner) |
| --- |
| ![Handbags sale banner](https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80) | # HANDBAGS<br>**Min. 60% Off**<br><br>**[+ Explore](/women/handbags)** |

---

### Hero Banner (End of Season Sale)
| Hero |
| --- |
| ![Fashion models showcasing end of season styles](https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80) |
| # End of Season Sale<br>Up to 70% OFF on Top Fashion Brands<br><br>**[Shop Now](/shop)** |

---

### Featured Categories
## Featured Categories
Shop the latest trends across every style.

| Cards |
| --- |
| ![Men's fashion collection](https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=900&q=80)<br><br>### [Men's Fashion](/men)<br>Sharp fits, everyday essentials, and statement looks. |
| ![Women's fashion collection](https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80)<br><br>### [Women's Fashion](/women)<br>Chic styles, ethnic wear, and modern silhouettes. |
| ![Kids wear collection](https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=900&q=80)<br><br>### [Kids Wear](/kids)<br>Playful, comfy, and colorful picks for every age. |
| ![Beauty essentials](https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80)<br><br>### [Beauty Essentials](/beauty)<br>Skincare, makeup, and grooming must-haves. |

---

### Trending Brands
## Trending Brands
Top labels everyone’s loving right now.

| Cards (brands) |
| --- |
| ![Nike inspired sportswear style](https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80)<br><br>### Nike<br>Performance meets street style. |
| ![Adidas inspired athleisure style](https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=80)<br><br>### Adidas<br>Iconic classics and modern athleisure. |
| ![Puma inspired activewear style](https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=900&q=80)<br><br>### Puma<br>Bold designs for everyday movement. |
| ![Levi's inspired denim style](https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80)<br><br>### Levi's<br>Timeless denim and wardrobe staples. |

| Section Metadata |
| --- |
| style | highlight |

---

### Why Shop With Us
## Why Shop With Us
A better way to shop fashion online.

| Columns |
| --- |
| ### Trusted Brands<br>Shop 100% authentic products from leading global and Indian labels. | ### Easy Returns<br>Hassle-free returns and quick exchanges on eligible orders. | ### Secure Payments<br>Multiple safe payment options with encrypted checkout. | ### Fast Delivery<br>Reliable doorstep delivery with real-time tracking. |

---

### Special Offers
## Special Offers
Don’t miss these limited-time deals.

| Cards (offers) |
| --- |
| ![Buy 2 Get 1 Free offer](https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80)<br><br>### Buy 2 Get 1 Free<br>Mix & match across select styles.<br><br>**[Grab Offer](/offers/buy-2-get-1)** |
| ![Flat 50 percent off offer](https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80)<br><br>### Flat 50% Off<br>On trending picks from top brands.<br><br>**[Shop Deals](/offers/flat-50)** |
| ![Free shipping offer](https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=900&q=80)<br><br>### Free Shipping Above ₹999<br>Get your favorites delivered at no extra cost.<br><br>**[Start Shopping](/shop)** |

| Section Metadata |
| --- |
| style | light |

---

## 3) `/footer` (Footer)

Create a `/footer` document in DA.

| Columns |
| --- |
| **FASHIONHUB**<br>Your destination for trend-led fashion,<br>beauty and lifestyle. | **SHOP**<br>[Men](/men)<br>[Women](/women)<br>[Kids](/kids)<br>[Beauty](/beauty)<br>[New Arrivals](/new-arrivals) | **CUSTOMER CARE**<br>[Contact Us](/contact)<br>[Track Orders](/track-orders)<br>[Returns](/returns)<br>[Support](/support) | **LEGAL**<br>[Privacy Policy](/privacy-policy)<br>[Terms & Conditions](/terms-and-conditions) |

© 2026 FashionHub. All Rights Reserved.

---

## Block mapping summary
- **Header Navigation** → `/nav` fragment consumed by `header` block
- **Hero Banner** → `Hero` block
- **Featured Categories** → `Cards` block
- **Trending Brands** → `Cards` block (variant: `brands`)
- **Why Shop With Us** → `Columns` block
- **Special Offers** → `Cards` block (variant: `offers`)
- **Footer** → `/footer` fragment consumed by `footer` block
