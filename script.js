document.addEventListener("DOMContentLoaded", function () {
  // 1. Select paint colour
  const colorBoxes = document.querySelectorAll(".color-box");
  colorBoxes.forEach(function (box) {
    box.addEventListener("click", function () {
      const color = box.dataset.color || box.textContent.trim();
      alert("You selected: " + color +
        "\nContact us to enquire about this paint colour!");
    });
  });
  // 2. WhatsApp enquiry
  const whatsappButtons = document.querySelectorAll(".whatsapp-btn");
  whatsappButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const message = encodeURIComponent(
        "Hello T.S. Tharun Paints! I would like to enquire about your products."
      );
      // Replace with the shop's actual WhatsApp number.
      const phoneNumber = "91XXXXXXXXXX";
      if (phoneNumber.includes("X")) {
        alert("Please add the shop's WhatsApp number in script.js.");
        return;
      }
      window.open(
        "https://wa.me/" + phoneNumber + "?text=" + message,
        "_blank"
      );
    });
  });
  // 3. Contact form interaction (instant WhatsApp prefill)
  const contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const name = document.getElementById("contact-name")?.value || "";
      const phone = document.getElementById("contact-phone")?.value || "";
      const email = document.getElementById("contact-email")?.value || "";
      const category = document.getElementById("contact-category")?.value || "General Enquiry";
      const message = document.getElementById("contact-message")?.value || "";
      const msg = `Hello T.S. Tharun Paints,\nName: ${name}\nPhone: ${phone}\n${email ? "Email: " + email + "\n" : ""}Interested In: ${category}\nRequirements: ${message}`;
      const url = "https://wa.me/919750507565?text=" + encodeURIComponent(msg);
      window.open(url, "_blank");
      contactForm.reset();
    });
  }
  // 4. Footer current year
  const yearElement = document.querySelector("#current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
/* TS THARUN PAINTS - COLOUR PALETTE */
document.addEventListener("DOMContentLoaded", function () {
    const palette = document.getElementById("colorPalette");
    if (!palette) return;
    const cards = Array.from(
        palette.querySelectorAll(".shade-card")
    );
    const filters = document.querySelectorAll(".filter-btn");
    const search = document.getElementById("colorSearch");
    const selectedSwatch = document.getElementById("selectedSwatch");
    const selectedName = document.getElementById("selectedName");
    const selectedHex = document.getElementById("selectedHex");
    const copyButton = document.getElementById("copyColor");
    const noColors = document.getElementById("noColors");
    let activeFamily = "all";
    let currentHex = "";
    function filterColors() {
        const query = search.value.trim().toLowerCase();
        let visibleCount = 0;
        cards.forEach(function (card) {
            const family = card.dataset.family;
            const name = card.dataset.name.toLowerCase();
            const hex = card.dataset.hex.toLowerCase();
            const matchesFamily =
                activeFamily === "all" || family === activeFamily;
            const matchesSearch =
                name.includes(query) || hex.includes(query);
            const visible = matchesFamily && matchesSearch;
            card.hidden = !visible;
            if (visible) visibleCount++;
        });
        noColors.hidden = visibleCount !== 0;
    }
    filters.forEach(function (button) {
        button.addEventListener("click", function () {
            activeFamily = button.dataset.family;
            filters.forEach(function (item) {
                item.classList.toggle("active", item === button);
            });
            filterColors();
        });
    });
    search.addEventListener("input", filterColors);
    cards.forEach(function (card) {
        card.addEventListener("click", function () {
            currentHex = card.dataset.hex;
            selectedSwatch.style.backgroundColor = currentHex;
            selectedName.textContent = card.dataset.name;
            selectedHex.textContent = currentHex;
            cards.forEach(function (item) {
                item.classList.toggle("selected", item === card);
            });
        });
    });
    copyButton.addEventListener("click", async function () {
        if (!currentHex) {
            alert("Please select a colour first.");
            return;
        }
        try {
            await navigator.clipboard.writeText(currentHex);
            copyButton.textContent = "Copied!";
        } catch (error) {
            selectedHex.textContent = currentHex + " — copy this code";
        }
        setTimeout(function () {
            copyButton.textContent = "Copy HEX";
        }, 1500);
    });
    filterColors();
});
document.querySelectorAll(".dropdown-menu a").forEach(link => {
  link.addEventListener("click", function () {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
    const dropdown = this.closest(".products-dropdown");
    if (dropdown) {
      dropdown.classList.remove("open");
      const button = dropdown.querySelector(".products-toggle");
      if (button) button.setAttribute("aria-expanded", "false");
    }
  });
});
// Sticky Transparent Header on Scroll (Dynamic Glassmorphism)
(function initHeaderScroll() {
    const siteHeader = document.querySelector('header');
    if (!siteHeader) return;
    const onScroll = () => {
        if (window.scrollY > 40) {
            siteHeader.classList.add('scrolled');
        } else {
            siteHeader.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
})();
// Hero Section Realistic Sequential Typewriter Motion
(function initTypewriter() {
    const line1 = document.getElementById('typewriterLine1');
    const cursor1 = document.getElementById('typewriterCursor1');
    const prefixTarget = document.getElementById('typewriterPrefix');
    const wordTarget = document.getElementById('typewriterWord');
    const cursor2 = document.getElementById('typewriterCursor2');
    if (!line1 || !wordTarget) return;
    const line1Text = "Transform Your Walls.";
    const prefixText = "Colour ";
    const rotatingWords = [
        "Beautifully.",
        "Luxuriously.",
        "Vibrantly.",
        "Flawlessly.",
        "With Elegance."
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    // Reset initial text so animation starts clean
    line1.textContent = "";
    if (prefixTarget) prefixTarget.textContent = "";
    wordTarget.textContent = "";
    if (cursor1) cursor1.style.display = "inline-block";
    if (cursor2) cursor2.style.display = "none";
    // 1. Type line 1 character by character
    let l1Idx = 0;
    function typeLine1() {
        if (l1Idx < line1Text.length) {
            line1.textContent += line1Text.charAt(l1Idx);
            l1Idx++;
            const speed = 40 + Math.random() * 25; // natural human typing rhythm
            setTimeout(typeLine1, speed);
        } else {
            // Line 1 finished! Switch cursor to Line 2 after brief pause
            setTimeout(switchToLine2, 300);
        }
    }
    // 2. Switch cursor to line 2 and type prefix "Colour "
    let pIdx = 0;
    function switchToLine2() {
        if (cursor1) cursor1.style.display = "none";
        if (cursor2) cursor2.style.display = "inline-block";
        typePrefix();
    }
    function typePrefix() {
        if (!prefixTarget) {
            startRotatingWords();
            return;
        }
        if (pIdx < prefixText.length) {
            prefixTarget.textContent += prefixText.charAt(pIdx);
            pIdx++;
            const speed = 45 + Math.random() * 20;
            setTimeout(typePrefix, speed);
        } else {
            // Prefix finished, start typing the first word "Beautifully."
            setTimeout(startRotatingWords, 150);
        }
    }
    // 3. Type and rotate words on line 2
    function startRotatingWords() {
        charIndex = 0;
        isDeleting = false;
        typeWord();
    }
    function typeWord() {
        const currentWord = rotatingWords[wordIndex];
        if (isDeleting) {
            charIndex--;
            wordTarget.textContent = currentWord.substring(0, charIndex);
        } else {
            charIndex++;
            wordTarget.textContent = currentWord.substring(0, charIndex);
        }
        let speed = isDeleting ? 35 : 75;
        speed += Math.random() * 20;
        if (!isDeleting && charIndex === currentWord.length) {
            // Word fully typed! Pause so user can read the complete phrase
            speed = 2500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Word deleted, move to next word
            isDeleting = false;
            wordIndex = (wordIndex + 1) % rotatingWords.length;
            speed = 400; // brief pause before next word
        }
        setTimeout(typeWord, speed);
    }
    // Start typing after page opens (450ms delay for smooth perception)
    setTimeout(typeLine1, 450);
})();
// Product Category Frame Click & Interactive Components Handler
document.addEventListener("DOMContentLoaded", function () {
    const productCards = document.querySelectorAll(".product-card");
    productCards.forEach(card => {
        const toggleBtn = card.querySelector(".frame-toggle-btn");
        const toggleText = card.querySelector(".toggle-text");
        const cardTitle = card.querySelector("h3") ? card.querySelector("h3").textContent.trim() : "Category";
        function toggleFrame(e) {
            // Do not toggle if clicking directly on action links or chips
            if (e.target.closest(".product-card-actions") || 
                e.target.closest("a") || 
                                e.target.closest(".comp-chip")) {
                return;
            }
            const isExpanded = card.classList.toggle("expanded");
            if (toggleBtn) {
                toggleBtn.setAttribute("aria-expanded", String(isExpanded));
            }
            if (toggleText) {
                toggleText.textContent = isExpanded 
                    ? "▲ Hide Components" 
                    : "✨ Click Frame to View Components (7)";
            }
        }
        // 1. Toggle button click
        if (toggleBtn) {
            toggleBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                const isExpanded = card.classList.toggle("expanded");
                toggleBtn.setAttribute("aria-expanded", String(isExpanded));
                if (toggleText) {
                    toggleText.textContent = isExpanded 
                        ? "▲ Hide Components" 
                        : "✨ Click Frame to View Components (7)";
                }
            });
        }
        // 2. Clicking anywhere on the card/frame header or image reveals components
        const cardImg = card.querySelector("img");
        if (cardImg) {
            cardImg.addEventListener("click", toggleFrame);
        }
        const cardHeading = card.querySelector("h3");
        if (cardHeading) {
            cardHeading.addEventListener("click", toggleFrame);
        }
        // 3. Interactive Component Chips click to customize WhatsApp enquiry
        const chips = card.querySelectorAll(".comp-chip");
        const waBtn = card.querySelector(".product-card-actions a.shop-button");
        const originalWaHref = waBtn ? waBtn.href : "";
        chips.forEach(chip => {
            chip.addEventListener("click", (e) => {
                e.stopPropagation();
                const isActive = chip.classList.contains("active-chip");
                chips.forEach(c => c.classList.remove("active-chip"));
                if (!isActive) {
                    chip.classList.add("active-chip");
                    const chipLabel = chip.textContent.trim();
                    if (waBtn) {
                        const message = encodeURIComponent(`Hello T.S. Tharun Paints, I want to enquire about: ${chipLabel} (under ${cardTitle}).`);
                        waBtn.href = `https://wa.me/919750507565?text=${message}`;
                    }
                } else if (waBtn) {
                    waBtn.href = originalWaHref;
                }
            });
        });
    });
    // 4. Category Filter Buttons (on products.html)
    const filterButtons = document.querySelectorAll(".category-filter-bar .cat-filter-btn");
    const catalogCards = document.querySelectorAll("#full-catalog-grid .product-card, .product-card:not(.category-card)");
    if (filterButtons.length && catalogCards.length) {
        filterButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                const selectedCat = button.dataset.cat || button.dataset.catFilter;
                if (!selectedCat) return; // Allow normal link navigation for href links
                e.preventDefault();
                filterButtons.forEach(btn => {
                    if (btn.dataset.cat || btn.dataset.catFilter) {
                        btn.classList.toggle("active", btn === button);
                    }
                });
                catalogCards.forEach(card => {
                    const cardCat = card.dataset.category;
                    const matches = (selectedCat === "all" || cardCat === selectedCat);
                    card.style.display = matches ? "" : "none";
                    if (matches) {
                        card.style.animation = 'none';
                        void card.offsetWidth;
                        card.style.animation = 'heroFadeUp 0.4s ease forwards';
                    }
                });
            });
        });
    }
});
// Automatic Category Card Navigation (whole card click)
function initCategoryCardNavigation() {
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Prevent navigation if user clicked inside WhatsApp enquiry button
            if (e.target.closest('.product-card-actions') || 
                e.target.closest('.shop-button')) {
                return;
            }
            const url = card.dataset.url;
            if (url) {
                window.location.href = url;
            }
        });
    });
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCategoryCardNavigation);
} else {
    initCategoryCardNavigation();
}
// Frequently Asked Questions (FAQ) Interactive Accordion
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        if (!questionBtn) return;
        questionBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const isCurrentlyActive = item.classList.contains('active');
            // Close other FAQ items for a clean single-open accordion
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherBtn = otherItem.querySelector('.faq-question');
                    if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
                }
            });
            // Toggle clicked item
            if (isCurrentlyActive) {
                item.classList.remove('active');
                questionBtn.setAttribute('aria-expanded', 'false');
            } else {
                item.classList.add('active');
                questionBtn.setAttribute('aria-expanded', 'true');
            }
        });
    });
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFaqAccordion);
} else {
    initFaqAccordion();
}
// =========================================================
// ===== COMPREHENSIVE WEBSITE ANIMATIONS & MOTION FX ======
// =========================================================
// 1. Scroll Progress Indicator Bar
(function initScrollProgressBar() {
    let bar = document.getElementById('scroll-progress-bar');
    if (!bar) {
        bar = document.createElement('div');
        bar.id = 'scroll-progress-bar';
        document.body.prepend(bar);
    }
    const updateProgressBar = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        bar.style.width = `${progress}%`;
    };
    window.addEventListener('scroll', updateProgressBar, { passive: true });
    updateProgressBar();
})();
// 2. Floating Back-to-Top Button with Smooth Scroll
(function initBackToTop() {
    let topBtn = document.getElementById('back-to-top-btn');
    if (!topBtn) {
        topBtn = document.createElement('button');
        topBtn.id = 'back-to-top-btn';
        topBtn.type = 'button';
        topBtn.setAttribute('aria-label', 'Back to top of page');
        topBtn.innerHTML = `
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="m18 15-6-6-6 6"/>
            </svg>
        `;
        document.body.appendChild(topBtn);
    }
    const checkScrollPosition = () => {
        if (window.scrollY > 380) {
            topBtn.classList.add('is-visible');
        } else {
            topBtn.classList.remove('is-visible');
        }
    };
    window.addEventListener('scroll', checkScrollPosition, { passive: true });
    topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    checkScrollPosition();
})();
// 3. High-Performance IntersectionObserver Scroll Reveal Engine (Professional Across Every Page)
(function initScrollRevealEngine() {
    if (!('IntersectionObserver' in window)) return;

    // Comprehensive list of cards, headers, controls and content sections across all pages
    const targets = [
        // All Card Types across all pages
        '.product-card',
        '.category-card',
        '.shade-card',
        '.room-guide-card',
        '.about-item',
        '.why-us-item',
        '.testimonial-card',
        '.calc-card',
        '.calc-summary-card',
        '.calc-breakdown-card',
        '.faq-item',
        '.feature-box',
        '.feature-item',
        '.stat-box',
        '.stat-item',
        '.value-card',
        '.store-details-card',
        '.direct-contact-item',
        // Interactive Controls & Filters
        '.calc-tabs-wrapper',
        '.category-filter-bar',
        '.color-filters',
        '.selected-color',
        // Major Headings & Banners
        '.section-tag',
        '.about-tag',
        '.colors-heading',
        '.colors-consultation-banner',
        '.calculator-cta-banner',
        '.contact-cta-wrapper',
        '.bulk-order-banner',
        '.page-feature-pills',
        '.page-breadcrumb',
        '.footer-col',
        '.footer-brand'
    ];

    const elements = document.querySelectorAll(targets.join(', '));
    if (!elements.length) return;

    elements.forEach(el => {
        // Exclude contact swap-box cards which have their own dedicated slow swapping animation
        if (el.classList.contains('swap-box') || el.closest('.contact-info-panel')) return;
        el.classList.add('scroll-reveal');
    });

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                
                // Calculate dynamic cascading stagger if sibling cards share parent grid/flex
                const parent = el.parentElement;
                if (parent) {
                    const siblings = Array.from(parent.querySelectorAll('.scroll-reveal'));
                    const index = siblings.indexOf(el);
                    if (index >= 0) {
                        const delay = Math.min(index * 110, 600);
                        el.style.transitionDelay = `${delay}ms`;
                    }
                }

                el.classList.add('is-revealed');
                obs.unobserve(el);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.10
    });

    elements.forEach(el => {
        if (!el.classList.contains('swap-box') && !el.closest('.contact-info-panel')) {
            observer.observe(el);
        }
    });
})();
// 4. Interactive Animated Stats Number Counters
(function initStatsCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (!statNumbers.length || !('IntersectionObserver' in window)) return;
    const animateCounter = (el) => {
        const rawTarget = el.dataset.target || el.textContent.replace(/[^0-9]/g, '');
        const targetNum = parseInt(rawTarget, 10);
        if (isNaN(targetNum)) return;
        const suffix = el.dataset.suffix || (el.textContent.includes('%') ? '%' : el.textContent.includes('+ Yrs') ? '+ Yrs' : el.textContent.includes('+') ? '+' : '');
        const duration = 1600; // ms
        const startTime = performance.now();
        const updateCount = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic function
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const currentNum = Math.floor(easeOutProgress * targetNum);
            el.textContent = `${currentNum.toLocaleString('en-IN')}${suffix}`;
            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                el.textContent = `${targetNum.toLocaleString('en-IN')}${suffix}`;
            }
        };
        requestAnimationFrame(updateCount);
    };
    const counterObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    statNumbers.forEach(stat => counterObserver.observe(stat));
})();
// 5. Contact Page: Sequential Left-to-Right 3-Box Swapping Animation Controller
(function initContactCardsSwapAnimation() {
    const contactPanel = document.querySelector('.contact-info-panel');
    const swapCards = document.querySelectorAll('.contact-info-card');
    const formPanel = document.querySelector('.contact-form-panel');
    if (!contactPanel || !swapCards.length) return;

    // Trigger smooth left-to-right sequential entry
    const triggerSwapAnimation = () => {
        swapCards.forEach((card, idx) => {
            card.style.animation = 'none';
            void card.offsetWidth; // Force reflow
            const delay = 0.15 + (idx * 0.35);
            card.style.animation = `cardSwapFromLeft 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s forwards`;
        });
        if (formPanel) {
            formPanel.style.animation = 'none';
            void formPanel.offsetWidth;
            formPanel.style.animation = 'formSwapFromRight 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.35s forwards';
        }
    };

    // Run on initial load
    triggerSwapAnimation();

    // Use IntersectionObserver to replay gracefully when scrolled back into view
    if ('IntersectionObserver' in window) {
        let isFirst = true;
        const panelObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!isFirst) {
                        triggerSwapAnimation();
                    }
                    isFirst = false;
                }
            });
        }, { threshold: 0.15 });
        panelObserver.observe(contactPanel);
    }

    // Continuous Subtle Sequential Highlight Wave (Card 1 -> 2 -> 3)
    let activeWaveIdx = 0;
    setInterval(() => {
        if (!contactPanel || contactPanel.matches(':hover')) return;
        swapCards.forEach((c, i) => {
            if (i === activeWaveIdx) {
                c.classList.add('wave-active');
                setTimeout(() => c.classList.remove('wave-active'), 1400);
            } else {
                c.classList.remove('wave-active');
            }
        });
        activeWaveIdx = (activeWaveIdx + 1) % swapCards.length;
    }, 3400);
})();

// 6. Deep-Link Smooth Scroll & Focus Handler for Footer Terms
(function initFooterDeepLinking() {
    function scrollToTarget(hash) {
        if (!hash) return;
        try {
            const target = document.querySelector(hash);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        } catch (e) {
            // Ignore invalid selector
        }
    }

    window.addEventListener('load', function () {
        if (window.location.hash) {
            setTimeout(function () {
                scrollToTarget(window.location.hash);
            }, 150);
        }
    });

    window.addEventListener('hashchange', function () {
        if (window.location.hash) {
            scrollToTarget(window.location.hash);
        }
    });
})();

// 7. Synchronized Hero Wall Painting Animation (Colors Page)
(function initHeroPaintingAnimation() {
    document.addEventListener("DOMContentLoaded", function () {
        const liveName = document.getElementById("heroLivePaintName");
        const liveHex = document.getElementById("heroLivePaintHex");
        const liveDot = document.getElementById("heroLivePaintDot");
        if (!liveName || !liveHex) return;

        const paintShades = [
            { name: "Royale Imperial Blue", hex: "#01379B", glow: "#01379b" },
            { name: "Emerald Jade Green", hex: "#0F712B", glow: "#0f712b" },
            { name: "Warm Sunburst Amber", hex: "#F59E0B", glow: "#f59e0b" },
            { name: "Crimson Velvet Red", hex: "#EC0103", glow: "#ec0103" },
            { name: "Ocean Turquoise Cyan", hex: "#0284C7", glow: "#0284c7" },
            { name: "Regal Velvet Violet", hex: "#7C3AED", glow: "#7c3aed" }
        ];

        let currentIdx = 0;
        // 18s total cycle / 6 shades = exactly 3000ms (3s) per shade
        setInterval(function () {
            currentIdx = (currentIdx + 1) % paintShades.length;
            const shade = paintShades[currentIdx];

            liveName.style.opacity = "0";
            liveHex.style.opacity = "0";

            setTimeout(function () {
                liveName.textContent = shade.name;
                liveHex.textContent = shade.hex;
                if (liveDot) {
                    liveDot.style.backgroundColor = shade.glow;
                    liveDot.style.boxShadow = `0 0 12px ${shade.glow}`;
                }
                liveName.style.opacity = "1";
                liveHex.style.opacity = "1";
            }, 220);
        }, 3000);
    });
})();
