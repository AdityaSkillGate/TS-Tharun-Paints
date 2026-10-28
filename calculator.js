/**
 * T.S. Tharun Paints - Smart Purchase & Paint Cost Calculator
 * Real-time material and cost estimation for paint, plumbing, electrical & hardware.
 */

// Predefined Hardware & Store Catalog
const STORE_CATALOG = [
    // Paints & Wall Preps
    { id: "p-royale-20", name: "Royale Luxury Emulsion (20L Bucket)", cat: "Paints", price: 11200, unit: "20L bucket" },
    { id: "p-royale-4", name: "Royale Luxury Emulsion (4L Can)", cat: "Paints", price: 2450, unit: "4L can" },
    { id: "p-apex-20", name: "Apex WeatherProof Exterior (20L Bucket)", cat: "Paints", price: 7800, unit: "20L bucket" },
    { id: "p-apex-4", name: "Apex WeatherProof Exterior (4L Can)", cat: "Paints", price: 1750, unit: "4L can" },
    { id: "p-tractor-20", name: "Tractor Interior Emulsion (20L Bucket)", cat: "Paints", price: 3600, unit: "20L bucket" },
    { id: "p-tractor-4", name: "Tractor Interior Emulsion (4L Can)", cat: "Paints", price: 850, unit: "4L can" },
    { id: "p-primer-10", name: "TruCare Acrylic Wall Primer (10L)", cat: "Paints", price: 1650, unit: "10L bucket" },
    { id: "p-putty-40", name: "Acrylic Wall Putty (40kg Bag)", cat: "Paints", price: 980, unit: "40kg bag" },
    { id: "p-enamel-4", name: "Premium Synthetic Gloss Enamel (4L)", cat: "Paints", price: 1480, unit: "4L can" },
    
    // Painting Tools
    { id: "t-roller-9", name: "Professional Paint Roller (9-inch with handle)", cat: "Tools", price: 240, unit: "piece" },
    { id: "t-brush-4", name: "Royal Soft Synthetic Paint Brush (4-inch)", cat: "Tools", price: 130, unit: "piece" },
    { id: "t-brush-2", name: "Synthetic Detail Paint Brush (2-inch)", cat: "Tools", price: 75, unit: "piece" },
    { id: "t-tape", name: "Painters Masking Tape (2-inch roll)", cat: "Tools", price: 65, unit: "roll" },

    // Plumbing Materials
    { id: "pl-pvc-4", name: "Heavy-Gauge ISI PVC 4\" Drainage Pipe (10ft)", cat: "Plumbing", price: 680, unit: "10ft pipe" },
    { id: "pl-pvc-2", name: "ISI PVC 2.5\" Waste Water Pipe (10ft)", cat: "Plumbing", price: 390, unit: "10ft pipe" },
    { id: "pl-cpvc-1", name: "CPVC 1\" High Pressure Hot & Cold Pipe (10ft)", cat: "Plumbing", price: 420, unit: "10ft pipe" },
    { id: "pl-tap-brass", name: "Solid Brass Long-Body Bib Tap (1/2\")", cat: "Plumbing", price: 340, unit: "piece" },
    { id: "pl-valve-1", name: "Brass Full-Bore Ball Valve (1\")", cat: "Plumbing", price: 490, unit: "piece" },
    { id: "pl-solvent-500", name: "Heavy Duty PVC Solvent Cement (500ml)", cat: "Plumbing", price: 280, unit: "can" },
    { id: "pl-hose-garden", name: "Braided Heavy Duty Water Delivery Hose (30m)", cat: "Plumbing", price: 850, unit: "roll" },

    // Electrical Supplies
    { id: "el-wire-15", name: "FR Pure Copper House Wire 1.5 sq mm (90m coil)", cat: "Electrical", price: 1850, unit: "90m coil" },
    { id: "el-wire-25", name: "FR Pure Copper House Wire 2.5 sq mm (90m coil)", cat: "Electrical", price: 2950, unit: "90m coil" },
    { id: "el-board-8m", name: "8-Module Polycarbonate Modular Switchboard Base", cat: "Electrical", price: 720, unit: "board" },
    { id: "el-socket-16a", name: "16A Heavy Duty Power Socket with Shutter", cat: "Electrical", price: 190, unit: "piece" },
    { id: "el-mcb-32a", name: "32A Double-Pole MCB Circuit Breaker", cat: "Electrical", price: 640, unit: "piece" },
    { id: "el-led-12w", name: "12W Warm White Commercial LED Downlight", cat: "Electrical", price: 320, unit: "piece" },

    // Construction Hardware
    { id: "hw-hex-bolts", name: "Grade 8.8 Structural Hex Bolts & Nuts (Box of 50)", cat: "Hardware", price: 850, unit: "box (50)" },
    { id: "hw-anchors", name: "High-Tensile Concrete Wedge Anchors (Pack of 20)", cat: "Hardware", price: 480, unit: "pack (20)" },
    { id: "hw-screws", name: "Drywall Bugle-Head Screws (Box of 500)", cat: "Hardware", price: 390, unit: "box (500)" },
    { id: "hw-hinges", name: "Stainless Steel Heavy Butt Hinges (4\" Pair)", cat: "Hardware", price: 260, unit: "pair" },
    { id: "hw-silicone", name: "Neutral-Cure Waterproof Silicone Sealant (300ml)", cat: "Hardware", price: 310, unit: "cartridge" },
    { id: "hw-trowel", name: "Heavy Duty Carbon Steel Mason Trowel", cat: "Hardware", price: 380, unit: "piece" }
];

// Bill Cart State
let billCart = [];

document.addEventListener("DOMContentLoaded", function () {
    initTabs();
    initPaintCalculator();
    initHardwareCalculator();
});

// 1. Tab Switching
function initTabs() {
    const tabBtns = document.querySelectorAll(".calc-tab-btn");
    const tabPanels = document.querySelectorAll(".calc-panel");

    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const target = btn.dataset.target;
            tabBtns.forEach(b => b.classList.toggle("active", b === btn));
            tabPanels.forEach(p => p.classList.toggle("active", p.id === target));
        });
    });
}

// 2. Mode 1: Paint & Area Estimator
function initPaintCalculator() {
    const areaInput = document.getElementById("paintAreaInput");
    const areaTypeSelect = document.getElementById("paintAreaType");
    const surfaceTypeSelect = document.getElementById("paintSurfaceType");
    const projectTypeSelect = document.getElementById("paintProjectType");
    const qualityTierSelect = document.getElementById("paintQualityTier");
    const laborCheckbox = document.getElementById("paintIncludeLabor");
    const presetButtons = document.querySelectorAll(".preset-btn");

    if (!areaInput) return;

    // Preset buttons
    presetButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            presetButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            areaInput.value = btn.dataset.area;
            if (areaTypeSelect) areaTypeSelect.value = "carpet";
            calculatePaint();
        });
    });

    // Inputs change listeners
    [areaInput, areaTypeSelect, surfaceTypeSelect, projectTypeSelect, qualityTierSelect, laborCheckbox].forEach(el => {
        if (el) {
            el.addEventListener("input", calculatePaint);
            el.addEventListener("change", calculatePaint);
        }
    });

    // Transfer to Bill Cart button
    const transferBtn = document.getElementById("transferToCartBtn");
    if (transferBtn) {
        transferBtn.addEventListener("click", transferPaintToCart);
    }

    // Share paint estimate on WhatsApp
    const shareWaBtn = document.getElementById("sharePaintWaBtn");
    if (shareWaBtn) {
        shareWaBtn.addEventListener("click", sharePaintOnWhatsApp);
    }

    // Initial calculation
    calculatePaint();
}

function calculatePaint() {
    const rawArea = parseFloat(document.getElementById("paintAreaInput")?.value) || 0;
    const areaType = document.getElementById("paintAreaType")?.value || "carpet";
    const surfaceType = document.getElementById("paintSurfaceType")?.value || "interior";
    const projectType = document.getElementById("paintProjectType")?.value || "fresh";
    const qualityTier = document.getElementById("paintQualityTier")?.value || "premium";
    const includeLabor = document.getElementById("paintIncludeLabor")?.checked ?? true;

    // Calculate actual wall area (sq ft)
    const wallArea = areaType === "carpet" ? Math.round(rawArea * 3.5) : Math.round(rawArea);

    // Coverage per liter for 2 coats
    let paintCoverage = 130; // interior emulsion sq.ft / L
    if (surfaceType === "exterior") paintCoverage = 65;
    else if (surfaceType === "enamel") paintCoverage = 100;
    else if (surfaceType === "waterproof") paintCoverage = 45;

    // Rates per liter according to tier
    let paintRatePerLiter = 390; // Premium default
    let tierName = "Premium Sheen";
    if (qualityTier === "economy") {
        paintRatePerLiter = 180;
        tierName = "Economy (Tractor Series)";
    } else if (qualityTier === "luxury") {
        paintRatePerLiter = 580;
        tierName = "Royale Luxury Sheen";
    }

    // Paint liters needed
    const paintLiters = wallArea > 0 ? Math.max(1, Math.ceil((wallArea / paintCoverage) * 10) / 10) : 0;
    
    // Primer liters needed
    const primerCoverage = projectType === "fresh" ? 130 : 220;
    const primerLiters = wallArea > 0 ? Math.ceil(wallArea / primerCoverage) : 0;
    const primerRate = 175; // ₹ per liter

    // Putty kg needed (fresh = 2 coats, repaint = 0 or patch)
    const puttyKg = projectType === "fresh" && wallArea > 0 ? Math.ceil(wallArea / 12) : 0;
    const puttyRate = 25; // ₹ per kg

    // Labor rate per sq ft of wall area
    const laborRatePerSqFt = projectType === "fresh" ? 14 : 10;
    const laborCost = includeLabor && wallArea > 0 ? Math.round(wallArea * laborRatePerSqFt) : 0;

    // Costs
    const paintCost = Math.round(paintLiters * paintRatePerLiter);
    const primerCost = Math.round(primerLiters * primerRate);
    const puttyCost = Math.round(puttyKg * puttyRate);
    const materialCost = paintCost + primerCost + puttyCost;
    const grandTotal = materialCost + laborCost;

    // Packaging recommendation breakdown
    const packagingDesc = getPackagingBreakdown(paintLiters);

    // Update DOM outputs
    updateText("outWallArea", `${wallArea.toLocaleString('en-IN')} sq.ft`);
    updateText("outPaintLiters", `${paintLiters} Litres`);
    updateText("outPaintPackaging", packagingDesc);
    updateText("outPrimerLiters", `${primerLiters} Litres`);
    updateText("outPuttyKg", puttyKg > 0 ? `${puttyKg} kg (approx ${Math.ceil(puttyKg / 40)} x 40kg bag)` : "Not required (Repainting)");
    updateText("outPaintCost", `₹ ${paintCost.toLocaleString('en-IN')}`);
    updateText("outPrimerCost", `₹ ${primerCost.toLocaleString('en-IN')}`);
    updateText("outPuttyCost", `₹ ${puttyCost.toLocaleString('en-IN')}`);
    updateText("outMaterialTotal", `₹ ${materialCost.toLocaleString('en-IN')}`);
    updateText("outLaborTotal", includeLabor ? `₹ ${laborCost.toLocaleString('en-IN')}` : "Excluded (DIY / Self)");
    updateText("outGrandTotal", `₹ ${grandTotal.toLocaleString('en-IN')}`);

    // Store state on container for WhatsApp / Cart transfer
    window.currentPaintEstimate = {
        wallArea,
        rawArea,
        areaType,
        surfaceType,
        projectType,
        qualityTier,
        tierName,
        paintLiters,
        packagingDesc,
        primerLiters,
        puttyKg,
        paintCost,
        primerCost,
        puttyCost,
        materialCost,
        laborCost,
        includeLabor,
        grandTotal
    };
}

function getPackagingBreakdown(liters) {
    if (liters <= 0) return "0 Litres";
    let rem = Math.ceil(liters);
    const b20 = Math.floor(rem / 20);
    rem = rem % 20;
    const b10 = Math.floor(rem / 10);
    rem = rem % 10;
    const b4 = Math.floor(rem / 4);
    rem = rem % 4;
    const b1 = rem;

    const parts = [];
    if (b20 > 0) parts.push(`${b20}x 20L Bucket`);
    if (b10 > 0) parts.push(`${b10}x 10L Bucket`);
    if (b4 > 0) parts.push(`${b4}x 4L Can`);
    if (b1 > 0) parts.push(`${b1}x 1L Can`);
    return parts.join(" + ") || "1x 1L Can";
}

function sharePaintOnWhatsApp() {
    const est = window.currentPaintEstimate;
    if (!est || est.wallArea <= 0) {
        alert("Please enter a valid wall or carpet area first.");
        return;
    }

    const message = `*Hello T.S. Tharun Paints, I calculated my paint estimate on your website:*
-------------------------------------
*Project Details:*
• Surface: ${capitalize(est.surfaceType)}
• Project Type: ${est.projectType === 'fresh' ? 'Fresh Painting (Primer + Putty + Paint)' : 'Repainting (2 Coats)'}
• Wall Area: ${est.wallArea.toLocaleString('en-IN')} sq.ft
• Quality Tier: ${est.tierName}

*Material Requirements:*
• Paint Needed: *${est.paintLiters} Litres* (${est.packagingDesc})
• Primer Needed: *${est.primerLiters} Litres*
• Wall Putty: *${est.puttyKg > 0 ? est.puttyKg + ' kg' : 'None'}*

*Cost Estimate:*
• Estimated Material Cost: *₹ ${est.materialCost.toLocaleString('en-IN')}*
${est.includeLabor ? `• Estimated Painter Labour: ₹ ${est.laborCost.toLocaleString('en-IN')}\n• Total Estimated Budget: *₹ ${est.grandTotal.toLocaleString('en-IN')}*` : '• (Labour Excluded)'}
-------------------------------------
Please confirm your best in-store price and shade availability in Sankarankoil!`;

    const url = `https://wa.me/919487939710?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
}

function transferPaintToCart() {
    const est = window.currentPaintEstimate;
    if (!est || est.paintLiters <= 0) {
        alert("Please calculate paint requirements first.");
        return;
    }

    // Add main paint
    const paintItemId = est.qualityTier === "luxury" ? "p-royale-20" : est.qualityTier === "economy" ? "p-tractor-20" : "p-apex-20";
    const catalogItem = STORE_CATALOG.find(i => i.id === paintItemId);

    if (catalogItem) {
        const qtyBuckets = Math.max(1, Math.round(est.paintLiters / 20));
        addToCart(catalogItem, qtyBuckets);
    }

    // Add primer if needed
    if (est.primerLiters > 0) {
        const primerItem = STORE_CATALOG.find(i => i.id === "p-primer-10");
        if (primerItem) {
            const pQty = Math.max(1, Math.round(est.primerLiters / 10));
            addToCart(primerItem, pQty);
        }
    }

    // Add putty if fresh
    if (est.puttyKg > 0) {
        const puttyItem = STORE_CATALOG.find(i => i.id === "p-putty-40");
        if (puttyItem) {
            const uQty = Math.max(1, Math.round(est.puttyKg / 40));
            addToCart(puttyItem, uQty);
        }
    }

    // Switch to tab 2
    const cartTabBtn = document.querySelector('.calc-tab-btn[data-target="panel-hardware"]');
    if (cartTabBtn) cartTabBtn.click();

    // Notification
    alert("Paint materials have been added to your Hardware & Purchase Bill!");
}

// 3. Mode 2: Hardware & Multi-Item Purchase Bill Calculator
function initHardwareCalculator() {
    const categoryFilter = document.getElementById("hwCatFilter");
    const itemSelect = document.getElementById("hwItemSelect");
    const qtyInput = document.getElementById("hwQtyInput");
    const addItemBtn = document.getElementById("hwAddItemBtn");
    const customNameInput = document.getElementById("hwCustomName");
    const customPriceInput = document.getElementById("hwCustomPrice");
    const addCustomBtn = document.getElementById("hwAddCustomBtn");
    const gstToggle = document.getElementById("hwGstToggle");
    const clearCartBtn = document.getElementById("hwClearCartBtn");
    const shareBillWaBtn = document.getElementById("hwShareBillWaBtn");
    const printBillBtn = document.getElementById("hwPrintBillBtn");

    populateCatalogDropdown("all");

    // Category filter change
    if (categoryFilter) {
        categoryFilter.addEventListener("change", () => {
            populateCatalogDropdown(categoryFilter.value);
        });
    }

    // Add catalog item
    if (addItemBtn) {
        addItemBtn.addEventListener("click", () => {
            const selectedId = itemSelect.value;
            const qty = parseInt(qtyInput.value, 10) || 1;
            const item = STORE_CATALOG.find(i => i.id === selectedId);
            if (item && qty > 0) {
                addToCart(item, qty);
                qtyInput.value = 1;
            }
        });
    }

    // Add custom item
    if (addCustomBtn) {
        addCustomBtn.addEventListener("click", () => {
            const name = customNameInput.value.trim();
            const price = parseFloat(customPriceInput.value) || 0;
            const qty = 1;

            if (!name || price <= 0) {
                alert("Please enter a valid item name and unit price.");
                return;
            }

            const customItem = {
                id: "custom-" + Date.now(),
                name: name,
                cat: "Custom",
                price: price,
                unit: "item"
            };

            addToCart(customItem, qty);
            customNameInput.value = "";
            customPriceInput.value = "";
        });
    }

    // GST toggle
    if (gstToggle) {
        gstToggle.addEventListener("change", renderCart);
    }

    // Clear cart
    if (clearCartBtn) {
        clearCartBtn.addEventListener("click", () => {
            if (billCart.length === 0) return;
            if (confirm("Clear all items from your bill?")) {
                billCart = [];
                renderCart();
            }
        });
    }

    // Share Bill on WhatsApp
    if (shareBillWaBtn) {
        shareBillWaBtn.addEventListener("click", shareBillOnWhatsApp);
    }

    // Print Estimate
    if (printBillBtn) {
        printBillBtn.addEventListener("click", () => {
            window.print();
        });
    }

    // Initial render
    renderCart();
}

function populateCatalogDropdown(cat) {
    const itemSelect = document.getElementById("hwItemSelect");
    if (!itemSelect) return;

    itemSelect.innerHTML = "";
    const filtered = cat === "all" ? STORE_CATALOG : STORE_CATALOG.filter(i => i.cat === cat);

    filtered.forEach(item => {
        const opt = document.createElement("option");
        opt.value = item.id;
        opt.textContent = `${item.name} — ₹${item.price.toLocaleString('en-IN')}`;
        itemSelect.appendChild(opt);
    });
}

function addToCart(item, qty) {
    const existing = billCart.find(i => i.id === item.id);
    if (existing) {
        existing.qty += qty;
    } else {
        billCart.push({
            id: item.id,
            name: item.name,
            cat: item.cat,
            price: item.price,
            unit: item.unit,
            qty: qty
        });
    }
    renderCart();
}

function updateCartQty(id, newQty) {
    if (newQty <= 0) {
        billCart = billCart.filter(i => i.id !== id);
    } else {
        const item = billCart.find(i => i.id !== id);
        const target = billCart.find(i => i.id === id);
        if (target) target.qty = newQty;
    }
    renderCart();
}

function removeCartItem(id) {
    billCart = billCart.filter(i => i.id !== id);
    renderCart();
}

function renderCart() {
    const tableBody = document.getElementById("cartTableBody");
    const emptyNotice = document.getElementById("cartEmptyNotice");
    const gstToggle = document.getElementById("hwGstToggle");
    const includeGst = gstToggle ? gstToggle.checked : true;

    if (!tableBody) return;

    if (billCart.length === 0) {
        tableBody.innerHTML = "";
        if (emptyNotice) emptyNotice.style.display = "block";
        updateText("cartSubtotal", "₹ 0");
        updateText("cartDiscount", "₹ 0");
        updateText("cartGst", "₹ 0");
        updateText("cartGrandTotal", "₹ 0");
        updateText("cartItemCount", "0 items");
        return;
    }

    if (emptyNotice) emptyNotice.style.display = "none";
    tableBody.innerHTML = "";

    let subtotal = 0;
    let totalItemsCount = 0;

    billCart.forEach(item => {
        const lineTotal = item.price * item.qty;
        subtotal += lineTotal;
        totalItemsCount += item.qty;

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>
                <div class="cart-item-title">${item.name}</div>
                <span class="cart-item-cat">${item.cat}</span>
            </td>
            <td>₹ ${item.price.toLocaleString('en-IN')}</td>
            <td>
                <div class="cart-qty-control">
                    <button type="button" class="qty-btn" onclick="updateCartQty('${item.id}', ${item.qty - 1})">−</button>
                    <span class="qty-val">${item.qty}</span>
                    <button type="button" class="qty-btn" onclick="updateCartQty('${item.id}', ${item.qty + 1})">+</button>
                </div>
            </td>
            <td class="line-total-cell">₹ ${lineTotal.toLocaleString('en-IN')}</td>
            <td>
                <button type="button" class="cart-del-btn" onclick="removeCartItem('${item.id}')" title="Remove item" aria-label="Remove item">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </button>
            </td>
        `;
        tableBody.appendChild(tr);
    });

    // Tiered Volume / Contractor Discount
    let discountPct = 0;
    let discountDesc = "₹ 0";
    if (subtotal >= 15000) {
        discountPct = 0.10; // 10% wholesale
        discountDesc = "-10% Wholesale / Bulk Discount";
    } else if (subtotal >= 5000) {
        discountPct = 0.05; // 5% volume
        discountDesc = "-5% Volume Discount";
    }

    const discountAmount = Math.round(subtotal * discountPct);
    const discountedSubtotal = subtotal - discountAmount;

    // GST calculation
    const gstRate = 0.18;
    const gstAmount = includeGst ? Math.round(discountedSubtotal * gstRate) : 0;
    const grandTotal = discountedSubtotal + gstAmount;

    // Update discount banner
    const discountHint = document.getElementById("discountHintNotice");
    if (discountHint) {
        if (subtotal < 5000) {
            discountHint.textContent = `💡 Add ₹${(5000 - subtotal).toLocaleString('en-IN')} more to unlock 5% Volume Discount!`;
            discountHint.className = "discount-hint-bar unlocked-none";
        } else if (subtotal < 15000) {
            discountHint.textContent = `🎉 5% Volume Discount Applied! Add ₹${(15000 - subtotal).toLocaleString('en-IN')} more for 10% Contractor Bulk Rate!`;
            discountHint.className = "discount-hint-bar unlocked-5";
        } else {
            discountHint.textContent = `🔥 10% Tier-1 Contractor Volume Discount Applied to Your Order!`;
            discountHint.className = "discount-hint-bar unlocked-10";
        }
    }

    updateText("cartSubtotal", `₹ ${subtotal.toLocaleString('en-IN')}`);
    updateText("cartDiscount", discountAmount > 0 ? `- ₹ ${discountAmount.toLocaleString('en-IN')} (${discountDesc})` : "₹ 0");
    updateText("cartGst", includeGst ? `+ ₹ ${gstAmount.toLocaleString('en-IN')} (18% GST)` : "Exempt / B2B Exclusive");
    updateText("cartGrandTotal", `₹ ${grandTotal.toLocaleString('en-IN')}`);
    updateText("cartItemCount", `${totalItemsCount} item${totalItemsCount === 1 ? '' : 's'}`);

    window.currentBillEstimate = {
        items: billCart,
        subtotal,
        discountPct,
        discountAmount,
        includeGst,
        gstAmount,
        grandTotal
    };
}

function shareBillOnWhatsApp() {
    const bill = window.currentBillEstimate;
    if (!bill || bill.items.length === 0) {
        alert("Your cart is empty. Please add items to calculate your bill first.");
        return;
    }

    let itemLines = "";
    bill.items.forEach((item, idx) => {
        const itemLineTotal = item.price * item.qty;
        itemLines += `${idx + 1}. *${item.name}* (Qty: ${item.qty}) = ₹${itemLineTotal.toLocaleString('en-IN')}\n`;
    });

    const discountMsg = bill.discountAmount > 0 
        ? `• Volume Discount: *- ₹${bill.discountAmount.toLocaleString('en-IN')}* (${bill.discountPct * 100}% off)\n` 
        : "";

    const gstMsg = bill.includeGst 
        ? `• GST (18%): + ₹${bill.gstAmount.toLocaleString('en-IN')}\n` 
        : "• GST: Excluded / B2B Reverse\n";

    const message = `*Hello T.S. Tharun Paints, here is my purchase order estimate from your website:*
-------------------------------------
*Itemized Hardware & Paint List:*
${itemLines}-------------------------------------
• Subtotal: *₹ ${bill.subtotal.toLocaleString('en-IN')}*
${discountMsg}${gstMsg}• *ESTIMATED TOTAL: ₹ ${bill.grandTotal.toLocaleString('en-IN')}*
-------------------------------------
Please confirm item stock, delivery to Sankarankoil, and final payment details!`;

    const url = `https://wa.me/919487939710?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
}

// Helpers
function updateText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}

function capitalize(s) {
    if (!s) return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
}

