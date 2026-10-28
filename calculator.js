/**
 * T.S. Tharun Paints - Smart Purchase & Paint Cost Calculator
 * Real-time material and cost estimation for paint, plumbing, electrical & construction hardware.
 */

// =========================================================================
// 1. Predefined Hardware, Electrical, Plumbing & Store Catalog
// =========================================================================
const STORE_CATALOG = [
    // --- Paints & Wall Preparation ---
    { id: "p-royale-20", name: "Royale Luxury Emulsion (20L Bucket)", cat: "Paints", price: 11200, unit: "20L bucket" },
    { id: "p-royale-4", name: "Royale Luxury Emulsion (4L Can)", cat: "Paints", price: 2450, unit: "4L can" },
    { id: "p-apex-20", name: "Apex WeatherProof Exterior (20L Bucket)", cat: "Paints", price: 7800, unit: "20L bucket" },
    { id: "p-apex-4", name: "Apex WeatherProof Exterior (4L Can)", cat: "Paints", price: 1750, unit: "4L can" },
    { id: "p-tractor-20", name: "Tractor Interior Emulsion (20L Bucket)", cat: "Paints", price: 3600, unit: "20L bucket" },
    { id: "p-tractor-4", name: "Tractor Interior Emulsion (4L Can)", cat: "Paints", price: 850, unit: "4L can" },
    { id: "p-primer-10", name: "TruCare Acrylic Wall Primer (10L)", cat: "Paints", price: 1650, unit: "10L bucket" },
    { id: "p-putty-40", name: "Acrylic Wall Putty (40kg Bag)", cat: "Paints", price: 980, unit: "40kg bag" },
    { id: "p-enamel-4", name: "Premium Synthetic Gloss Enamel (4L)", cat: "Paints", price: 1480, unit: "4L can" },

    // --- Painting Tools ---
    { id: "t-roller-9", name: "Professional Paint Roller (9-inch with handle)", cat: "Tools", price: 240, unit: "piece" },
    { id: "t-brush-4", name: "Royal Soft Synthetic Paint Brush (4-inch)", cat: "Tools", price: 130, unit: "piece" },
    { id: "t-brush-2", name: "Synthetic Detail Paint Brush (2-inch)", cat: "Tools", price: 75, unit: "piece" },
    { id: "t-tape", name: "Painters Masking Tape (2-inch roll)", cat: "Tools", price: 65, unit: "roll" },

    // --- Electrical Supplies ---
    { id: "el-wire-10", name: "FR Pure Copper House Wire 1.0 sq mm (90m coil)", cat: "Electrical", price: 1350, unit: "90m coil" },
    { id: "el-wire-15", name: "FR Pure Copper House Wire 1.5 sq mm (90m coil)", cat: "Electrical", price: 1850, unit: "90m coil" },
    { id: "el-wire-25", name: "FR Pure Copper House Wire 2.5 sq mm (90m coil)", cat: "Electrical", price: 2950, unit: "90m coil" },
    { id: "el-wire-40", name: "FR Pure Copper Heavy Load Wire 4.0 sq mm (90m coil)", cat: "Electrical", price: 4350, unit: "90m coil" },
    { id: "el-wire-earth", name: "Pure Copper Earthing Wire 1.0 sq mm (Green, 90m coil)", cat: "Electrical", price: 1250, unit: "90m coil" },
    { id: "el-conduit-20", name: "Heavy Duty PVC Rigid Conduit Pipe 20mm (10ft / 3m)", cat: "Electrical", price: 85, unit: "10ft pipe" },
    { id: "el-conduit-25", name: "Heavy Duty PVC Rigid Conduit Pipe 25mm (10ft / 3m)", cat: "Electrical", price: 115, unit: "10ft pipe" },
    { id: "el-switch-6a", name: "6A 1-Way Polycarbonate Modular Light Switch", cat: "Electrical", price: 45, unit: "piece" },
    { id: "el-socket-6a", name: "6A 3-Pin Shuttered Modular Wall Socket", cat: "Electrical", price: 95, unit: "piece" },
    { id: "el-socket-16a", name: "16A Heavy Duty Power Socket with Shutter", cat: "Electrical", price: 190, unit: "piece" },
    { id: "el-box-6m", name: "6-Module Galvanised / Polycarbonate Flush Box", cat: "Electrical", price: 140, unit: "box" },
    { id: "el-board-8m", name: "8-Module Polycarbonate Modular Switchboard Base Plate", cat: "Electrical", price: 720, unit: "board" },
    { id: "el-mcb-c16", name: "C-Curve 16A Single Pole MCB Circuit Breaker", cat: "Electrical", price: 280, unit: "piece" },
    { id: "el-mcb-32a", name: "32A Double-Pole Main Isolator MCB Breaker", cat: "Electrical", price: 640, unit: "piece" },
    { id: "el-db-spn8", name: "8-Way SPN Distribution Board Enclosure", cat: "Electrical", price: 1450, unit: "board" },
    { id: "el-tape-pvc", name: "FR PVC Electrical Insulation Tape (Pack of 5)", cat: "Electrical", price: 110, unit: "pack (5)" },
    { id: "el-led-12w", name: "12W Warm White Commercial LED Downlight", cat: "Electrical", price: 320, unit: "piece" },

    // --- Plumbing Materials ---
    { id: "pl-cpvc-1", name: "CPVC 1-inch High Pressure Hot & Cold Water Pipe (10ft)", cat: "Plumbing", price: 420, unit: "10ft pipe" },
    { id: "pl-cpvc-075", name: "CPVC 3/4-inch High Pressure Water Supply Pipe (10ft)", cat: "Plumbing", price: 310, unit: "10ft pipe" },
    { id: "pl-pvc-4", name: "Heavy-Gauge ISI PVC 4-inch Drainage Pipe (10ft)", cat: "Plumbing", price: 680, unit: "10ft pipe" },
    { id: "pl-pvc-2", name: "ISI PVC 2.5-inch Waste Water Pipe (10ft)", cat: "Plumbing", price: 390, unit: "10ft pipe" },
    { id: "pl-elbow-1", name: "CPVC 90-degree Heavy Solvent-Weld Elbow (1-inch)", cat: "Plumbing", price: 45, unit: "piece" },
    { id: "pl-tee-1", name: "CPVC Equal Tee Fitting (1-inch)", cat: "Plumbing", price: 55, unit: "piece" },
    { id: "pl-coupler-1", name: "CPVC Straight Coupler / Socket (1-inch)", cat: "Plumbing", price: 35, unit: "piece" },
    { id: "pl-valve-1", name: "Brass Full-Bore Ball Valve (1-inch)", cat: "Plumbing", price: 490, unit: "piece" },
    { id: "pl-tap-brass", name: "Solid Brass Long-Body Bib Tap (1/2-inch)", cat: "Plumbing", price: 340, unit: "piece" },
    { id: "pl-solvent-500", name: "Heavy Duty PVC Solvent Cement (500ml)", cat: "Plumbing", price: 280, unit: "can" },
    { id: "pl-teflon", name: "PTFE Thread Sealant Teflon Tape (12mm x 10m roll)", cat: "Plumbing", price: 30, unit: "roll" },
    { id: "pl-hose-garden", name: "Braided Heavy Duty Water Delivery Hose (30m)", cat: "Plumbing", price: 850, unit: "roll" },

    // --- General Hardware & Fasteners ---
    { id: "hw-screws-dry", name: "Drywall Bugle-Head Screws (Box of 500)", cat: "Hardware", price: 390, unit: "box (500)" },
    { id: "hw-screws-wood", name: "High-Tensile Zinc Plated Wood Screws (Box of 200)", cat: "Hardware", price: 280, unit: "box (200)" },
    { id: "hw-nails-steel", name: "Hardened Concrete & Steel Nails (1kg pack)", cat: "Hardware", price: 160, unit: "1kg pack" },
    { id: "hw-hex-bolts", name: "Grade 8.8 Structural Hex Bolts & Nuts (Box of 50)", cat: "Hardware", price: 850, unit: "box (50)" },
    { id: "hw-anchors", name: "High-Tensile Concrete Wedge Anchors (Pack of 20)", cat: "Hardware", price: 480, unit: "pack (20)" },
    { id: "hw-wallplugs", name: "Nylon Wall Plugs / Gitti (Box of 100)", cat: "Hardware", price: 90, unit: "box (100)" },
    { id: "hw-hinges", name: "Stainless Steel Heavy Butt Hinges (4-inch Pair)", cat: "Hardware", price: 260, unit: "pair" },
    { id: "hw-tower-bolt", name: "Solid Brass / SS 6-inch Heavy Tower Bolt", cat: "Hardware", price: 180, unit: "piece" },
    { id: "hw-door-handle", name: "Designer Stainless Steel Door Pull Handle (Pair)", cat: "Hardware", price: 540, unit: "pair" },

    // --- Construction Materials & Tile Preps ---
    { id: "cn-tile-adh", name: "Polymer-Modified Tile Adhesive C1T (20kg Bag)", cat: "Construction", price: 360, unit: "20kg bag" },
    { id: "cn-tile-grout", name: "Epoxy & Polymer Waterproof Tile Joint Grout (1kg Pack)", cat: "Construction", price: 120, unit: "1kg pack" },
    { id: "cn-waterproof-20", name: "SmartCare Damp Proof Waterproofing Membrane (20L Bucket)", cat: "Construction", price: 5400, unit: "20L bucket" },
    { id: "cn-waterproof-4", name: "SmartCare Damp Proof Waterproofing Primer (4L Can)", cat: "Construction", price: 1250, unit: "4L can" },
    { id: "hw-silicone", name: "Neutral-Cure Waterproof Silicone Sealant (300ml Cartridge)", cat: "Construction", price: 310, unit: "cartridge" },
    { id: "hw-trowel", name: "Heavy Duty Carbon Steel Mason Trowel", cat: "Construction", price: 380, unit: "piece" }
];

// Bill Cart State
let billCart = [];

// Estimated Hardware State
let currentEstimatedHardware = [];
let activeHwCatFilter = 'all';

// Master App Initialization
document.addEventListener("DOMContentLoaded", function () {
    initTabs();
    initPaintCalculator();
    initHardwareCalculator();
    initHardwareEstimator();
});

// =========================================================================
// 2. Tab Navigation & Inter-Tab Synchronization
// =========================================================================
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

function switchTab(tabId) {
    const tabBtns = document.querySelectorAll(".calc-tab-btn");
    const tabPanels = document.querySelectorAll(".calc-panel");

    tabBtns.forEach(b => b.classList.toggle("active", b.dataset.target === tabId));
    tabPanels.forEach(p => p.classList.toggle("active", p.id === tabId));
}

// =========================================================================
// 3. Mode 1: Paint & Wall Area Estimator
// =========================================================================
function initPaintCalculator() {
    const areaInput = document.getElementById("paintAreaInput");
    const areaTypeSelect = document.getElementById("paintAreaType");
    const surfaceTypeSelect = document.getElementById("paintSurfaceType");
    const projectTypeSelect = document.getElementById("paintProjectType");
    const qualityTierSelect = document.getElementById("paintQualityTier");
    const laborCheckbox = document.getElementById("paintIncludeLabor");
    const presetButtons = document.querySelectorAll(".preset-btn:not(.hw-preset-btn)");

    if (!areaInput) return;

    // Preset buttons
    presetButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            presetButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            areaInput.value = btn.dataset.area;
            if (areaTypeSelect) areaTypeSelect.value = "carpet";
            calculatePaint();
            syncPaintAreaToHardware(parseFloat(btn.dataset.area) || 0);
        });
    });

    // Input change listeners
    [areaInput, areaTypeSelect, surfaceTypeSelect, projectTypeSelect, qualityTierSelect, laborCheckbox].forEach(el => {
        if (el) {
            el.addEventListener("input", () => {
                calculatePaint();
                if (el === areaInput) {
                    syncPaintAreaToHardware(parseFloat(areaInput.value) || 0);
                }
            });
            el.addEventListener("change", () => {
                calculatePaint();
                if (el === areaInput) {
                    syncPaintAreaToHardware(parseFloat(areaInput.value) || 0);
                }
            });
        }
    });

    // Transfer paint materials to cart button
    const transferBtn = document.getElementById("transferToCartBtn");
    if (transferBtn) {
        transferBtn.addEventListener("click", transferPaintToCart);
    }

    // Bridge button: Transfer Area & Estimate Hardware Materials
    const transferAreaBtn = document.getElementById("transferAreaToHardwareBtn");
    if (transferAreaBtn) {
        transferAreaBtn.addEventListener("click", () => {
            const rawArea = parseFloat(areaInput.value) || 900;
            syncPaintAreaToHardware(rawArea, true);
            switchTab("panel-hardware");
            calculateHardwareRequirements();
            
            const resultsSection = document.getElementById("hwAutoEstimatorCard");
            if (resultsSection) {
                resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    }

    // Share paint estimate on WhatsApp
    const shareWaBtn = document.getElementById("sharePaintWaBtn");
    if (shareWaBtn) {
        shareWaBtn.addEventListener("click", sharePaintOnWhatsApp);
    }

    // Initial calculation & sync
    calculatePaint();
    syncPaintAreaToHardware(parseFloat(areaInput.value) || 900);
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

    // Store state on window for WhatsApp / Cart transfer
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

    const url = `https://wa.me/919750507565?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
}

function transferPaintToCart() {
    const est = window.currentPaintEstimate;
    if (!est || est.paintLiters <= 0) {
        alert("Please calculate paint requirements first.");
        return;
    }

    // Add main paint (deduplicating if already present)
    const paintItemId = est.qualityTier === "luxury" ? "p-royale-20" : est.qualityTier === "economy" ? "p-tractor-20" : "p-apex-20";
    const catalogItem = STORE_CATALOG.find(i => i.id === paintItemId);

    if (catalogItem) {
        const qtyBuckets = Math.max(1, Math.round(est.paintLiters / 20));
        addOrUpdateCartItem(catalogItem, qtyBuckets);
    }

    // Add primer if needed
    if (est.primerLiters > 0) {
        const primerItem = STORE_CATALOG.find(i => i.id === "p-primer-10");
        if (primerItem) {
            const pQty = Math.max(1, Math.round(est.primerLiters / 10));
            addOrUpdateCartItem(primerItem, pQty);
        }
    }

    // Add putty if fresh
    if (est.puttyKg > 0) {
        const puttyItem = STORE_CATALOG.find(i => i.id === "p-putty-40");
        if (puttyItem) {
            const uQty = Math.max(1, Math.round(est.puttyKg / 40));
            addOrUpdateCartItem(puttyItem, uQty);
        }
    }

    // Switch to Tab 2
    switchTab("panel-hardware");

    // Scroll to cart
    const cartEl = document.querySelector(".bill-cart-grid");
    if (cartEl) cartEl.scrollIntoView({ behavior: "smooth", block: "start" });
}

// =========================================================================
// 4. Area Synchronization between Paint & Hardware Calculators
// =========================================================================
function syncPaintAreaToHardware(area, forceOverwrite = false) {
    const badge = document.getElementById("hwSyncAreaBadge");
    if (badge) {
        badge.textContent = `${area.toLocaleString('en-IN')} sq.ft`;
    }

    const hwAreaInput = document.getElementById("hwAreaInput");
    if (!hwAreaInput) return;

    // Overwrite if forced or if user hasn't explicitly diverged
    if (forceOverwrite || !hwAreaInput.dataset.manualAreaEdit) {
        hwAreaInput.value = area;
        
        // Update preset buttons in Hardware estimator
        const hwPresets = document.querySelectorAll(".hw-preset-btn");
        hwPresets.forEach(btn => {
            btn.classList.toggle("active", parseFloat(btn.dataset.hwArea) === area);
        });

        // Recalculate suggested norms
        updateHardwareNormsFromArea(area, false);
    }
}

// =========================================================================
// 5. Automatic Hardware Material & Cost Estimator Engine
// =========================================================================
function initHardwareEstimator() {
    const hwAreaInput = document.getElementById("hwAreaInput");
    const hwPresets = document.querySelectorAll(".hw-preset-btn");
    const syncBtn = document.getElementById("hwSyncPaintAreaBtn");
    const calcBtn = document.getElementById("hwCalculateBtn");
    const resetBtn = document.getElementById("hwResetParamsBtn");
    const addEstBtn = document.getElementById("hwAddEstimatedToBillBtn");
    const selectAllBtn = document.getElementById("hwSelectAllBtn");
    const deselectAllBtn = document.getElementById("hwDeselectAllBtn");
    const catChips = document.querySelectorAll(".hw-cat-chip");

    // Step buttons (+ / - for parameter boxes)
    document.querySelectorAll(".param-step-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const targetId = btn.dataset.target;
            const step = parseInt(btn.dataset.step, 10) || 1;
            const input = document.getElementById(targetId);
            if (input) {
                const currentVal = parseInt(input.value, 10) || 0;
                const min = parseInt(input.min, 10) || 1;
                const max = parseInt(input.max, 10) || 1000;
                input.value = Math.max(min, Math.min(max, currentVal + step));
                input.dataset.userEdited = "true";
                // Recalculate if results are visible
                if (currentEstimatedHardware.length > 0) {
                    calculateHardwareRequirements();
                }
            }
        });
    });

    // Mark manual edits on parameter fields
    ["hwRoomsInput", "hwElecPointsInput", "hwSwitchesInput", "hwPlumbFixturesInput", "hwTileAreaInput"].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener("input", () => {
                el.dataset.userEdited = "true";
                if (currentEstimatedHardware.length > 0) {
                    calculateHardwareRequirements();
                }
            });
        }
    });

    // Advanced inputs change listener
    ["hwWireRouteInput", "hwPlumbRouteInput", "hwWastageInput"].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener("change", () => {
                if (currentEstimatedHardware.length > 0) {
                    calculateHardwareRequirements();
                }
            });
        }
    });

    // Hardware Area Presets
    hwPresets.forEach(btn => {
        btn.addEventListener("click", () => {
            hwPresets.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const area = parseFloat(btn.dataset.hwArea) || 900;
            if (hwAreaInput) {
                hwAreaInput.value = area;
                delete hwAreaInput.dataset.manualAreaEdit;
            }
            updateHardwareNormsFromArea(area, true);
            calculateHardwareRequirements();
        });
    });

    // Hardware Area Input
    if (hwAreaInput) {
        hwAreaInput.addEventListener("input", () => {
            hwAreaInput.dataset.manualAreaEdit = "true";
            const area = parseFloat(hwAreaInput.value) || 0;
            
            // Sync active preset button
            hwPresets.forEach(btn => {
                btn.classList.toggle("active", parseFloat(btn.dataset.hwArea) === area);
            });

            updateHardwareNormsFromArea(area, false);
            if (currentEstimatedHardware.length > 0) {
                calculateHardwareRequirements();
            }
        });
    }

    // Sync from Paint Estimator Button
    if (syncBtn) {
        syncBtn.addEventListener("click", () => {
            const paintArea = parseFloat(document.getElementById("paintAreaInput")?.value) || 900;
            if (hwAreaInput) {
                hwAreaInput.value = paintArea;
                delete hwAreaInput.dataset.manualAreaEdit;
            }
            hwPresets.forEach(btn => {
                btn.classList.toggle("active", parseFloat(btn.dataset.hwArea) === paintArea);
            });
            updateHardwareNormsFromArea(paintArea, true);
            calculateHardwareRequirements();

            // Brief visual feedback
            syncBtn.style.transform = "scale(0.96)";
            setTimeout(() => { syncBtn.style.transform = ""; }, 200);
        });
    }

    // Reset Norms Button
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            const area = parseFloat(hwAreaInput?.value) || 900;
            ["hwRoomsInput", "hwElecPointsInput", "hwSwitchesInput", "hwPlumbFixturesInput", "hwTileAreaInput"].forEach(id => {
                const el = document.getElementById(id);
                if (el) delete el.dataset.userEdited;
            });
            updateHardwareNormsFromArea(area, true);
            calculateHardwareRequirements();
        });
    }

    // Calculate Hardware Button
    if (calcBtn) {
        calcBtn.addEventListener("click", () => {
            calculateHardwareRequirements();
            const resultsSection = document.getElementById("hwEstimateResultsSection");
            if (resultsSection) {
                resultsSection.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }
        });
    }

    // Category Filter Chips
    catChips.forEach(chip => {
        chip.addEventListener("click", () => {
            catChips.forEach(c => c.classList.remove("active"));
            chip.classList.add("active");
            activeHwCatFilter = chip.dataset.cat;
            filterEstimatedHardwareTable(activeHwCatFilter);
        });
    });

    // Select / Deselect All
    if (selectAllBtn) {
        selectAllBtn.addEventListener("click", () => selectAllEstItems(true));
    }
    if (deselectAllBtn) {
        deselectAllBtn.addEventListener("click", () => selectAllEstItems(false));
    }

    // Add Estimated Materials to Bill Button
    if (addEstBtn) {
        addEstBtn.addEventListener("click", addEstimatedHardwareToBill);
    }
}

/**
 * Updates suggested electrical, plumbing and room counts based on area
 */
function updateHardwareNormsFromArea(area, forceUpdate = false) {
    if (area <= 0) return;

    // Room count estimation
    let rooms = 2;
    if (area <= 400) rooms = 1;
    else if (area <= 750) rooms = 2;
    else if (area <= 1200) rooms = 3;
    else if (area <= 1800) rooms = 4;
    else rooms = Math.max(1, Math.round(area / 400));

    // Electrical points: residential standard ~1 point per 30-35 sq.ft
    const elecPoints = Math.max(6, Math.round(area / 32));

    // Switches & Sockets: ~1.25x electrical points
    const switches = Math.max(8, Math.round(elecPoints * 1.25));

    // Plumbing wet areas (bathrooms + kitchen)
    let plumb = 2;
    if (area <= 500) plumb = 2;
    else if (area <= 1200) plumb = 3;
    else if (area <= 2000) plumb = 4;
    else plumb = Math.max(2, Math.round(area / 500) + 1);

    const roomsEl = document.getElementById("hwRoomsInput");
    const elecEl = document.getElementById("hwElecPointsInput");
    const switchEl = document.getElementById("hwSwitchesInput");
    const plumbEl = document.getElementById("hwPlumbFixturesInput");
    const tileEl = document.getElementById("hwTileAreaInput");

    if (roomsEl && (forceUpdate || !roomsEl.dataset.userEdited)) roomsEl.value = rooms;
    if (elecEl && (forceUpdate || !elecEl.dataset.userEdited)) elecEl.value = elecPoints;
    if (switchEl && (forceUpdate || !switchEl.dataset.userEdited)) switchEl.value = switches;
    if (plumbEl && (forceUpdate || !plumbEl.dataset.userEdited)) plumbEl.value = plumb;
    if (tileEl && (forceUpdate || !tileEl.dataset.userEdited)) tileEl.value = area;
}

/**
 * Core Calculation Logic for Hardware, Electrical, Plumbing and Construction
 */
function calculateHardwareRequirements() {
    const area = parseFloat(document.getElementById("hwAreaInput")?.value) || 0;
    if (area <= 0) {
        alert("Please enter a valid project area in square feet.");
        return;
    }

    const rooms = parseInt(document.getElementById("hwRoomsInput")?.value, 10) || 2;
    const elecPoints = parseInt(document.getElementById("hwElecPointsInput")?.value, 10) || 28;
    const switches = parseInt(document.getElementById("hwSwitchesInput")?.value, 10) || 35;
    const plumbFixtures = parseInt(document.getElementById("hwPlumbFixturesInput")?.value, 10) || 3;
    const wireRoute = parseFloat(document.getElementById("hwWireRouteInput")?.value) || 12;
    const plumbRoute = parseFloat(document.getElementById("hwPlumbRouteInput")?.value) || 15;
    const wastage = parseFloat(document.getElementById("hwWastageInput")?.value) || 0.10;
    const tileArea = parseFloat(document.getElementById("hwTileAreaInput")?.value) || area;

    // 1. Electrical Calculation Logic
    const totalWireRun = elecPoints * wireRoute * (1 + wastage);
    const wire10Coils = Math.max(1, Math.ceil((totalWireRun * 0.40) / 90));
    const wire15Coils = Math.max(1, Math.ceil((totalWireRun * 0.35) / 90));
    const wire25Coils = Math.max(1, Math.ceil((totalWireRun * 0.25) / 90));
    const wireEarthCoils = Math.max(1, Math.ceil((totalWireRun * 0.35) / 90));

    const totalConduitRun = elecPoints * 2.8 * (1 + wastage);
    const conduit20Pipes = Math.max(4, Math.ceil((totalConduitRun * 0.70) / 3));
    const conduit25Pipes = Math.max(2, Math.ceil((totalConduitRun * 0.30) / 3));

    const switch6aQty = Math.max(6, Math.ceil(switches * 0.65));
    const socket6aQty = Math.max(4, Math.ceil(switches * 0.25));
    const socket16aQty = Math.max(2, Math.ceil(switches * 0.10));
    const flushBoxQty = Math.max(2, Math.ceil(elecPoints / 4));
    const boardPlateQty = Math.max(2, Math.ceil(elecPoints / 4));

    const mcb16aQty = Math.max(2, Math.ceil(rooms * 1.5));
    const mcb32aQty = 1;
    const dbEnclosureQty = 1;
    const elecTapeQty = Math.max(1, Math.ceil(elecPoints / 12));

    // 2. Plumbing Calculation Logic
    const cpvc1Pipes = Math.max(2, Math.ceil((plumbFixtures * 6) / 3));
    const cpvc075Pipes = Math.max(3, Math.ceil((plumbFixtures * 10) / 3));
    const pvc4Pipes = Math.max(2, Math.ceil((plumbFixtures * 6) / 3));
    const pvc2Pipes = Math.max(2, Math.ceil((plumbFixtures * 8) / 3));

    const elbowsQty = plumbFixtures * 6;
    const teesQty = plumbFixtures * 4;
    const couplersQty = plumbFixtures * 4;
    const ballValvesQty = Math.max(1, plumbFixtures);
    const bibTapsQty = Math.max(2, plumbFixtures * 2);
    const solventCementQty = Math.max(1, Math.ceil(plumbFixtures / 3));
    const teflonTapeQty = Math.max(2, plumbFixtures * 2);

    // 3. General Hardware Calculation Logic
    const drywallScrewsQty = Math.max(1, Math.ceil(area / 900));
    const woodScrewsQty = Math.max(1, rooms);
    const steelNailsQty = Math.max(1, Math.ceil(area / 1000));
    const hexBoltsQty = Math.max(1, Math.ceil(rooms / 2));
    const wedgeAnchorsQty = Math.max(1, Math.ceil(rooms / 2));
    const wallPlugsQty = Math.max(1, Math.ceil(area / 500));
    const hingesPairsQty = Math.max(2, rooms * 2);
    const towerBoltsQty = Math.max(2, rooms * 2);
    const doorHandlesQty = Math.max(1, rooms);

    // 4. Construction Materials Calculation Logic
    const tileAdhesiveBags = Math.max(1, Math.ceil((tileArea * (1 + wastage)) / 55));
    const tileGroutPacks = Math.max(1, Math.ceil((tileArea * (1 + wastage)) / 60));

    // Waterproofing for wet areas (~75 sq ft per fixture at 30 sq ft / L)
    const waterproofLiters = Math.ceil((plumbFixtures * 75 * 1.1) / 30);
    const waterproof20Bucket = waterproofLiters >= 15 ? 1 : 0;
    const waterproof4Can = waterproofLiters < 15 ? Math.max(1, Math.ceil(waterproofLiters / 4)) : 0;
    const siliconeQty = Math.max(1, plumbFixtures);
    const trowelQty = 1;

    // Helper map to lookup existing user modifications if already calculated
    const prevMap = {};
    currentEstimatedHardware.forEach(item => {
        prevMap[item.id] = { qty: item.qty, price: item.price, selected: item.selected };
    });

    // Assemble raw items
    const rawList = [
        // --- Electrical ---
        { id: "el-wire-10", calcQty: wire10Coils },
        { id: "el-wire-15", calcQty: wire15Coils },
        { id: "el-wire-25", calcQty: wire25Coils },
        { id: "el-wire-earth", calcQty: wireEarthCoils },
        { id: "el-conduit-20", calcQty: conduit20Pipes },
        { id: "el-conduit-25", calcQty: conduit25Pipes },
        { id: "el-switch-6a", calcQty: switch6aQty },
        { id: "el-socket-6a", calcQty: socket6aQty },
        { id: "el-socket-16a", calcQty: socket16aQty },
        { id: "el-box-6m", calcQty: flushBoxQty },
        { id: "el-board-8m", calcQty: boardPlateQty },
        { id: "el-mcb-c16", calcQty: mcb16aQty },
        { id: "el-mcb-32a", calcQty: mcb32aQty },
        { id: "el-db-spn8", calcQty: dbEnclosureQty },
        { id: "el-tape-pvc", calcQty: elecTapeQty },

        // --- Plumbing ---
        { id: "pl-cpvc-1", calcQty: cpvc1Pipes },
        { id: "pl-cpvc-075", calcQty: cpvc075Pipes },
        { id: "pl-pvc-4", calcQty: pvc4Pipes },
        { id: "pl-pvc-2", calcQty: pvc2Pipes },
        { id: "pl-elbow-1", calcQty: elbowsQty },
        { id: "pl-tee-1", calcQty: teesQty },
        { id: "pl-coupler-1", calcQty: couplersQty },
        { id: "pl-valve-1", calcQty: ballValvesQty },
        { id: "pl-tap-brass", calcQty: bibTapsQty },
        { id: "pl-solvent-500", calcQty: solventCementQty },
        { id: "pl-teflon", calcQty: teflonTapeQty },

        // --- General Hardware ---
        { id: "hw-screws-dry", calcQty: drywallScrewsQty },
        { id: "hw-screws-wood", calcQty: woodScrewsQty },
        { id: "hw-nails-steel", calcQty: steelNailsQty },
        { id: "hw-hex-bolts", calcQty: hexBoltsQty },
        { id: "hw-anchors", calcQty: wedgeAnchorsQty },
        { id: "hw-wallplugs", calcQty: wallPlugsQty },
        { id: "hw-hinges", calcQty: hingesPairsQty },
        { id: "hw-tower-bolt", calcQty: towerBoltsQty },
        { id: "hw-door-handle", calcQty: doorHandlesQty },

        // --- Construction Materials ---
        { id: "cn-tile-adh", calcQty: tileAdhesiveBags },
        { id: "cn-tile-grout", calcQty: tileGroutPacks },
        ...(waterproof20Bucket > 0 ? [{ id: "cn-waterproof-20", calcQty: waterproof20Bucket }] : []),
        ...(waterproof4Can > 0 ? [{ id: "cn-waterproof-4", calcQty: waterproof4Can }] : []),
        { id: "hw-silicone", calcQty: siliconeQty },
        { id: "hw-trowel", calcQty: trowelQty }
    ];

    // Map to catalog with preserved state
    currentEstimatedHardware = rawList.map(raw => {
        const catItem = STORE_CATALOG.find(i => i.id === raw.id);
        const prev = prevMap[raw.id];
        return {
            id: raw.id,
            name: catItem ? catItem.name : raw.id,
            cat: catItem ? catItem.cat : "Hardware",
            unit: catItem ? catItem.unit : "piece",
            price: prev && prev.price > 0 ? prev.price : (catItem ? catItem.price : 100),
            qty: prev && prev.qty > 0 ? prev.qty : raw.calcQty,
            selected: prev !== undefined ? prev.selected : true
        };
    });

    renderEstimatedHardwareTable();

    // Reveal output section
    const resultsSection = document.getElementById("hwEstimateResultsSection");
    if (resultsSection) {
        resultsSection.style.display = "block";
    }
}

/**
 * Renders estimated items into the interactive table
 */
function renderEstimatedHardwareTable() {
    const tbody = document.getElementById("hwEstimateTableBody");
    if (!tbody) return;

    tbody.innerHTML = "";

    let totalSelectedCost = 0;
    let selectedCount = 0;

    let countAll = 0;
    let countElec = 0;
    let countPlumb = 0;
    let countHw = 0;
    let countConst = 0;

    currentEstimatedHardware.forEach(item => {
        // Count categories
        countAll++;
        if (item.cat === "Electrical") countElec++;
        else if (item.cat === "Plumbing") countPlumb++;
        else if (item.cat === "Hardware") countHw++;
        else if (item.cat === "Construction") countConst++;

        const isVisible = activeHwCatFilter === "all" || item.cat === activeHwCatFilter;
        const lineTotal = item.qty * item.price;

        if (item.selected) {
            totalSelectedCost += lineTotal;
            selectedCount++;
        }

        const tr = document.createElement("tr");
        tr.className = `hw-est-row cat-${item.cat.toLowerCase()}`;
        if (!isVisible) tr.style.display = "none";

        tr.innerHTML = `
            <td style="text-align: center;">
                <input type="checkbox" class="est-item-checkbox" ${item.selected ? 'checked' : ''} onchange="toggleEstItem('${item.id}', this.checked)">
            </td>
            <td>
                <div class="cart-item-title">${item.name}</div>
            </td>
            <td>
                <span class="cart-item-cat cat-tag-${item.cat.toLowerCase()}">${item.cat}</span>
            </td>
            <td>
                <span class="unit-badge">${item.unit}</span>
            </td>
            <td>
                <div class="est-input-wrap">
                    <span class="curr-sign">₹</span>
                    <input type="number" class="calc-input est-cell-input" value="${item.price}" min="1" step="5" onchange="updateEstPrice('${item.id}', parseFloat(this.value) || 0)">
                </div>
            </td>
            <td>
                <div class="cart-qty-control est-qty-control">
                    <button type="button" class="qty-btn" onclick="updateEstQty('${item.id}', ${item.qty - 1})">−</button>
                    <input type="number" class="qty-val-input" value="${item.qty}" min="0" max="10000" onchange="updateEstQty('${item.id}', parseInt(this.value, 10) || 0)">
                    <button type="button" class="qty-btn" onclick="updateEstQty('${item.id}', ${item.qty + 1})">+</button>
                </div>
            </td>
            <td style="text-align: right;" class="line-total-cell">
                ₹ ${lineTotal.toLocaleString('en-IN')}
            </td>
        `;

        tbody.appendChild(tr);
    });

    // Update Category Chips Badge Counts
    updateText("countAll", countAll);
    updateText("countElec", countElec);
    updateText("countPlumb", countPlumb);
    updateText("countHw", countHw);
    updateText("countConst", countConst);

    // Update Summary in Bar
    updateText("hwSelectedItemsCount", `${selectedCount} item${selectedCount === 1 ? '' : 's'}`);
    updateText("hwSelectedMaterialTotal", `₹ ${totalSelectedCost.toLocaleString('en-IN')}`);
}

function filterEstimatedHardwareTable(cat) {
    const rows = document.querySelectorAll(".hw-est-row");
    rows.forEach(row => {
        if (cat === "all") {
            row.style.display = "";
        } else {
            row.style.display = row.classList.contains(`cat-${cat.toLowerCase()}`) ? "" : "none";
        }
    });
}

function updateEstQty(id, newQty) {
    const item = currentEstimatedHardware.find(i => i.id === id);
    if (item) {
        item.qty = Math.max(0, newQty);
        renderEstimatedHardwareTable();
    }
}

function updateEstPrice(id, newPrice) {
    const item = currentEstimatedHardware.find(i => i.id === id);
    if (item) {
        item.price = Math.max(1, newPrice);
        renderEstimatedHardwareTable();
    }
}

function toggleEstItem(id, isChecked) {
    const item = currentEstimatedHardware.find(i => i.id === id);
    if (item) {
        item.selected = isChecked;
        renderEstimatedHardwareTable();
    }
}

function selectAllEstItems(selectVal) {
    currentEstimatedHardware.forEach(item => {
        item.selected = selectVal;
    });
    renderEstimatedHardwareTable();
}

/**
 * Transfers all selected estimated hardware items to the Purchase Bill Cart
 * Uses smart deduplication: updates quantities and prices of existing items without creating duplicates!
 */
function addEstimatedHardwareToBill() {
    if (currentEstimatedHardware.length === 0) {
        alert("Please calculate hardware requirements first.");
        return;
    }

    const selectedItems = currentEstimatedHardware.filter(i => i.selected && i.qty > 0);
    if (selectedItems.length === 0) {
        alert("Please select at least one material with quantity greater than zero.");
        return;
    }

    let addedCount = 0;
    let updatedCount = 0;

    selectedItems.forEach(item => {
        const existing = billCart.find(i => i.id === item.id);
        if (existing) {
            existing.qty = item.qty;
            existing.price = item.price;
            existing.unit = item.unit;
            updatedCount++;
        } else {
            billCart.push({
                id: item.id,
                name: item.name,
                cat: item.cat,
                price: item.price,
                unit: item.unit,
                qty: item.qty
            });
            addedCount++;
        }
    });

    renderCart();

    // Scroll down to Itemized Bill Table
    const billCard = document.querySelector(".bill-cart-grid");
    if (billCard) {
        billCard.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Success notification
    const totalProcessed = addedCount + updatedCount;
    alert(`Success! ${totalProcessed} hardware material${totalProcessed === 1 ? '' : 's'} transferred to your Purchase Bill (No duplicate items).`);
}

// =========================================================================
// 6. Mode 2: Hardware & Multi-Item Purchase Bill Cart Engine
// =========================================================================
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
                addOrUpdateCartItem(item, qty);
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

            addOrUpdateCartItem(customItem, qty);
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

/**
 * Intelligent Cart Insertion: Merges quantities instead of creating duplicates
 */
function addOrUpdateCartItem(item, qty) {
    const existing = billCart.find(i => i.id === item.id);
    if (existing) {
        existing.qty += qty;
    } else {
        billCart.push({
            id: item.id,
            name: item.name,
            cat: item.cat,
            price: item.price,
            unit: item.unit || "piece",
            qty: qty
        });
    }
    renderCart();
}

function updateCartQty(id, newQty) {
    if (newQty <= 0) {
        billCart = billCart.filter(i => i.id !== id);
    } else {
        const target = billCart.find(i => i.id === id);
        if (target) target.qty = newQty;
    }
    renderCart();
}

function updateCartPrice(id, newPrice) {
    const target = billCart.find(i => i.id === id);
    if (target && newPrice > 0) {
        target.price = newPrice;
        renderCart();
    }
}

function removeCartItem(id) {
    billCart = billCart.filter(i => i.id !== id);
    renderCart();
}

/**
 * Render Itemized Purchase Bill with Unit, Line Total, Volume Discounts, GST, and Payable Total
 */
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
                <span class="cart-item-cat cat-tag-${item.cat.toLowerCase()}">${item.cat}</span>
            </td>
            <td>
                <span class="unit-badge">${item.unit || 'piece'}</span>
            </td>
            <td>
                <div class="est-input-wrap">
                    <span class="curr-sign">₹</span>
                    <input type="number" class="calc-input est-cell-input" value="${item.price}" min="1" step="5" onchange="updateCartPrice('${item.id}', parseFloat(this.value) || 0)">
                </div>
            </td>
            <td>
                <div class="cart-qty-control">
                    <button type="button" class="qty-btn" onclick="updateCartQty('${item.id}', ${item.qty - 1})">−</button>
                    <input type="number" class="qty-val-input" value="${item.qty}" min="1" max="10000" onchange="updateCartQty('${item.id}', parseInt(this.value, 10) || 1)">
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
        itemLines += `${idx + 1}. *${item.name}*\n   Qty: ${item.qty} ${item.unit || 'units'} @ ₹${item.price.toLocaleString('en-IN')} = *₹${itemLineTotal.toLocaleString('en-IN')}*\n`;
    });

    const discountMsg = bill.discountAmount > 0 
        ? `• Volume Discount: *- ₹${bill.discountAmount.toLocaleString('en-IN')}* (${bill.discountPct * 100}% off)\n` 
        : "";

    const gstMsg = bill.includeGst 
        ? `• GST (18%): + ₹${bill.gstAmount.toLocaleString('en-IN')}\n` 
        : "• GST: Excluded / B2B Reverse\n";

    const message = `*Hello T.S. Tharun Paints, here is my purchase order estimate from your website:*
-------------------------------------
*Itemized Hardware, Electrical, Plumbing & Paint List:*
${itemLines}-------------------------------------
• Subtotal: *₹ ${bill.subtotal.toLocaleString('en-IN')}*
${discountMsg}${gstMsg}• *FINAL ESTIMATED TOTAL: ₹ ${bill.grandTotal.toLocaleString('en-IN')}*
-------------------------------------
Please confirm stock availability, contractor dispatch rate, and delivery details in Sankarankoil!`;

    const url = `https://wa.me/919750507565?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
}

// =========================================================================
// 7. General Utility Helpers
// =========================================================================
function updateText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}

function capitalize(s) {
    if (!s) return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
}
