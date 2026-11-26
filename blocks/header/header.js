import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia('(min-width: 900px)');

/**
 * Closes the open nav dropdown (desktop) or the nav menu (mobile) on Escape
 * @param {KeyboardEvent} e keydown event
 */
function closeOnEscape(e) {
  if (e.code === 'Escape') {
    const nav = document.getElementById('nav');
    const navSections = nav.querySelector('.nav-sections');
    if (!navSections) return;
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections);
      navSectionExpanded.focus();
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections);
      nav.querySelector('button').focus();
    }
  }
}

/**
 * Closes the open nav dropdown (desktop) or the nav menu (mobile) when focus leaves the nav
 * @param {FocusEvent} e focusout event
 */
function closeOnFocusLost(e) {
  const nav = e.currentTarget;
  if (!nav.contains(e.relatedTarget)) {
    const navSections = nav.querySelector('.nav-sections');
    if (!navSections) return;
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections, false);
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections, false);
    }
  }
}

/**
 * Toggles all nav sections
 * @param {Element} sections The container element
 * @param {Boolean|string} expanded Whether the element should be expanded or collapsed
 */
function toggleAllNavSections(sections, expanded = false) {
  if (!sections) return;
  sections.querySelectorAll('.nav-drop > button').forEach((button) => {
    button.setAttribute('aria-expanded', expanded);
  });
}

/**
 * Toggles the entire nav
 * @param {Element} nav The container element
 * @param {Element} navSections The nav sections within the container element
 * @param {*} forceExpanded Optional param to force nav expand behavior when not null
 */
function toggleMenu(nav, navSections, forceExpanded = null) {
  const expanded = forceExpanded !== null ? !forceExpanded : nav.getAttribute('aria-expanded') === 'true';
  const button = nav.querySelector('.nav-hamburger button');
  document.body.style.overflowY = (expanded || isDesktop.matches) ? '' : 'hidden';
  // the desktop nav is always expanded, so aria-expanded only applies to the mobile menu
  if (isDesktop.matches) nav.removeAttribute('aria-expanded');
  else nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  toggleAllNavSections(navSections, expanded || isDesktop.matches ? 'false' : 'true');
  button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');

  // enable menu collapse on escape keypress
  if (!expanded || isDesktop.matches) {
    // collapse menu on escape press
    window.addEventListener('keydown', closeOnEscape);
    // collapse menu on focus lost
    nav.addEventListener('focusout', closeOnFocusLost);
  } else {
    window.removeEventListener('keydown', closeOnEscape);
    nav.removeEventListener('focusout', closeOnFocusLost);
  }
}

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // load nav as fragment
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  // decorate nav DOM
  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  const classes = ['brand', 'sections', 'tools'];
  classes.forEach((c, i) => {
    const section = nav.children[i];
    if (section) section.classList.add(`nav-${c}`);
  });

  const navBrand = nav.querySelector('.nav-brand');
  const brandLink = navBrand.querySelector('.button');
  if (brandLink) {
    brandLink.className = '';
    brandLink.closest('.button-container').className = '';
  }

  const navSections = nav.querySelector('.nav-sections');
  if (navSections) {
    navSections.querySelectorAll(':scope .default-content-wrapper > ul > li').forEach((navSection) => {
      const subList = navSection.querySelector(':scope > ul');
      if (!subList) return;
      navSection.classList.add('nav-drop');
      // wrap the dropdown label in a button so it is announced as expandable
      const button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('aria-expanded', false);
      [...navSection.childNodes].forEach((node) => {
        if (node !== subList) button.append(node);
      });
      navSection.prepend(button);
      button.addEventListener('click', () => {
        const expanded = button.getAttribute('aria-expanded') === 'true';
        if (isDesktop.matches) {
          button.focus();
          toggleAllNavSections(navSections);
        }
        button.setAttribute('aria-expanded', !expanded);
      });
    });
  }

  const navTools = nav.querySelector('.nav-tools');
  if (navTools) {
    const toolIcons = {
      profile: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M20 21v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="7" r="4"/></svg>',
      wishlist: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 20.5l-1.45-1.32C5.4 14.36 2 11.28 2 7.5A5.5 5.5 0 0 1 7.5 2c1.74 0 3.41.81 4.5 2.09A6 6 0 0 1 16.5 2 5.5 5.5 0 0 1 22 7.5c0 3.78-3.4 6.86-8.55 11.69L12 20.5z" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      bag: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 7h12l1 14H5L6 7z" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 10V6a3 3 0 0 1 6 0v4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      cart: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 7h12l1 14H5L6 7z" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 10V6a3 3 0 0 1 6 0v4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      search: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5" stroke-linecap="round"/></svg>',
    };

    const getToolIcon = (text, href = '') => {
      const value = `${text} ${href}`.toLowerCase();
      if (value.includes('profile')) return toolIcons.profile;
      if (value.includes('wishlist')) return toolIcons.wishlist;
      if (value.includes('bag') || value.includes('cart')) return toolIcons.bag;
      return '';
    };

    const searchLink = [...navTools.querySelectorAll('a')].find((a) => /search/i.test(a.textContent) || /\/search|query-index/i.test(a.getAttribute('href') || ''));
    if (searchLink) {
      const searchContainer = searchLink.closest('p, li') || searchLink;
      const wrapper = document.createElement('div');
      wrapper.className = 'nav-tools-search';
      wrapper.innerHTML = `
        <form class="nav-search-form" action="/search" role="search">
          <span class="nav-search-icon">${toolIcons.search}</span>
          <input type="search" name="q" placeholder="${searchLink.textContent.trim() || 'Search for products, brands and more'}" aria-label="Search products" autocomplete="off" />
        </form>
        <div class="nav-search-suggestions" hidden></div>
      `;

      const form = wrapper.querySelector('.nav-search-form');
      const input = wrapper.querySelector('input');
      const suggestions = wrapper.querySelector('.nav-search-suggestions');
      let queryIndex;

      const renderSuggestions = (items, query) => {
        if (!query || !items.length) {
          suggestions.hidden = true;
          suggestions.innerHTML = '';
          return;
        }
        suggestions.hidden = false;
        suggestions.innerHTML = items.slice(0, 8).map((item) => `<a href="${item.path || '#'}" class="nav-search-suggestion">${item.title || ''}</a>`).join('');
      };

      const loadIndex = async () => {
        if (queryIndex) return queryIndex;
        try {
          const resp = await fetch('/query-index.json');
          if (!resp.ok) throw new Error('No index');
          const json = await resp.json();
          queryIndex = Array.isArray(json.data) ? json.data : [];
        } catch (e) {
          queryIndex = [];
        }
        return queryIndex;
      };

      input.addEventListener('input', async () => {
        const q = input.value.toLowerCase().trim();
        if (q.length < 2) {
          renderSuggestions([], '');
          return;
        }
        const data = await loadIndex();
        const matches = data.filter((item) => (item.title || '').toLowerCase().includes(q));
        renderSuggestions(matches, q);
      });

      form.addEventListener('submit', (e) => {
        if (!input.value.trim()) e.preventDefault();
      });

      document.addEventListener('click', (e) => {
        if (!wrapper.contains(e.target)) {
          suggestions.hidden = true;
        }
      });

      if (searchContainer.tagName === 'LI') {
        const list = searchContainer.closest('ul');
        const siblings = [...list.children].filter((item) => item !== searchContainer);
        list.before(wrapper);
        searchContainer.remove();
        if (!siblings.length) list.remove();
      } else {
        searchContainer.replaceWith(wrapper);
      }
    }

    navTools.querySelectorAll('a').forEach((a) => {
      if (a.closest('.nav-tools-search')) return;
      const label = a.textContent.trim();
      const icon = getToolIcon(label, a.getAttribute('href') || '');
      if (!icon) return;
      a.classList.add('nav-tool-link');
      a.innerHTML = `<span class="nav-tool-icon">${icon}</span><span class="nav-tool-label">${label}</span>`;
    });
  }

  // hamburger for mobile
  const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
      <span class="nav-hamburger-icon"></span>
    </button>`;
  hamburger.addEventListener('click', () => toggleMenu(nav, navSections));
  nav.prepend(hamburger);
  nav.setAttribute('aria-expanded', 'false');
  // prevent mobile nav behavior on window resize
  toggleMenu(nav, navSections, isDesktop.matches);
  isDesktop.addEventListener('change', () => toggleMenu(nav, navSections, isDesktop.matches));

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);
}
