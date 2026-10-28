
const WISHLIST_KEY = "tsTharunWishlist";

const products = {
    "paints-tools": { name: "Paints & Paint Tools", description: "Paints, brushes, rollers and painting accessories.", image: "images/paints.webp" },
    "plumbing": { name: "Plumbing Materials", description: "PVC pipes, hose pipes and plumbing fittings.", image: "images/plumbing material.png" },
    "electrical": { name: "Electrical Supplies", description: "Wires, switches, sockets and electrical supplies.", image: "images/electrical items.jpg" },
    "construction": { name: "Construction Hardware", description: "Bolts, fasteners and construction hardware.", image: "images/construction-hardware-tools-.jpg" },
    "plumbing-pvc-pipe": {
        name: "Rigid PVC Pressure Pipes",
        description: "Heavy-gauge 4kg/cm² & 6kg/cm² rigid PVC pipes for potable water, underground drainage, and...",
        image: "images/products/plumbing-pvc-pipe.webp"
    },
    "plumbing-cpvc-pipe": {
        name: "CPVC Hot & Cold Water Pipes",
        description: "Lead-free, non-corrosive chlorinate pipes designed for high-temperature solar water heater...",
        image: "images/products/plumbing-cpvc-pipe.webp"
    },
    "plumbing-fittings": {
        name: "PVC Elbows, Tees & Couplers",
        description: "Precision-machined 90° bends, equal tees, reducing sockets, end caps, and unions engineere...",
        image: "images/products/plumbing-fittings.webp"
    },
    "plumbing-taps": {
        name: "Solid Brass & Chrome Bib Taps",
        description: "Durable quarter-turn ceramic disc long-body bib cocks, pillar taps, two-way angular stops,...",
        image: "images/products/plumbing-taps.webp"
    },
    "plumbing-valves": {
        name: "Heavy-Duty PVC & Brass Ball Valves",
        description: "Full-port smooth turn shut-off valves for overhead tanks, water mains, agricultural pump l...",
        image: "images/products/plumbing-valves.webp"
    },
    "plumbing-hose": {
        name: "Braided Flexible Garden Hoses",
        description: "Heavy-duty 3-layer braided reinforced PVC flexible garden water hoses and stainless steel ...",
        image: "images/products/plumbing-hose.webp"
    },
    "plumbing-solvent": {
        name: "PVC Solvent Cement & Teflon Tapes",
        description: "Heavy-bodied clear PVC pipe cement adhesive for instant leak-free joint bonding, paired wi...",
        image: "images/products/plumbing-solvent.webp"
    },
    "plumbing-tank-fitting": {
        name: "Overhead Tank Nipples & Unions",
        description: "Solid brass and virgin PVC water tank connectors with EPDM leak-proof rubber gaskets and h...",
        image: "images/products/plumbing-tank-fitting.webp"
    },
    "plumbing-drainage": {
        name: "Anti-Foul Floor Drains & Traps",
        description: "Stainless steel AISI 304 floor gratings with cockroach-proof, odor-blocking water seal tra...",
        image: "images/products/plumbing-drainage.webp"
    },
    "plumbing-suction": {
        name: "Spiral Suction Delivery Hoses",
        description: "Rigid spiral PVC ribbed delivery and suction hoses designed for agricultural submersible p...",
        image: "images/products/plumbing-suction.webp"
    },
    "paints-royale": {
        name: "Asian Paints Royale Luxury Emulsion",
        description: "Ultra-luxurious interior wall finish infused with Teflon surface protector for outstanding...",
        image: "images/products/paints-royale.webp"
    },
    "paints-apex": {
        name: "Apex WeatherProof Exterior Emulsion",
        description: "Specially formulated acrylic exterior paint with micro-silicon technology to shield facade...",
        image: "images/products/paints-apex.webp"
    },
    "paints-tractor": {
        name: "Tractor Interior Emulsion",
        description: "Cost-effective, smooth matte finish interior paint providing double the coverage of tradit...",
        image: "images/products/paints-tractor.webp"
    },
    "paints-enamel": {
        name: "Premium Synthetic Gloss Enamel",
        description: "High-gloss mirror-sheen enamel for wooden doors, windows, trim, and metal grills. Rust-pre...",
        image: "images/products/paints-enamel.webp"
    },
    "paints-primer": {
        name: "TruCare Acrylic Wall Primer & Putty",
        description: "Water-based interior and exterior primer providing exceptional bonding for topcoats while ...",
        image: "images/products/paints-primer.webp"
    },
    "paints-damp-proof": {
        name: "SmartCare Damp Proof Waterproofing",
        description: "Fiber-reinforced elastomeric waterproofing liquid membrane for flat roofs, terraces, parap...",
        image: "images/products/paints-damp-proof.webp"
    },
    "paints-rollers": {
        name: "Microfiber Roller & Paint Tray Sets",
        description: "Heavy-gauge 9-inch microfiber lint-free wall rollers with ergonomic handles, paired with d...",
        image: "images/products/paints-rollers.webp"
    },
    "paints-brushes": {
        name: "High-Grade Bristle Paint Brushes",
        description: "Pure natural and synthetic blend bristle brushes in 1-inch, 2-inch, 3-inch, and 4-inch wid...",
        image: "images/products/paints-brushes.webp"
    },
    "paints-varnish": {
        name: "PU Clear Wood Varnish & Lacquers",
        description: "Polyurethane protective transparent wood coating offering superior scratch resistance and ...",
        image: "images/products/paints-varnish.webp"
    },
    "paints-sandpaper": {
        name: "Waterproof Silicon Carbide Emery Sheets",
        description: "Industrial grade sandpaper sheets available in 80, 120, 220, and 320 grits for smoothing w...",
        image: "images/products/paints-sandpaper.webp"
    },
    "electrical-wires": {
        name: "Flame-Retardant Copper House Wires",
        description: "100% pure electrolytic grade multi-strand copper cables with flame-retardant (FR/FRLS) ins...",
        image: "images/products/electrical-wires.webp"
    },
    "electrical-switches": {
        name: "Modular Rocker Switches & Plates",
        description: "Sleek flame-proof polycarbonate modular switches, bell indicators, and glossy front plates...",
        image: "images/products/electrical-switches.webp"
    },
    "electrical-sockets": {
        name: "Universal 3-Pin Power Sockets",
        description: "Child-safety shuttered 6A and 16A modular power sockets engineered for heavy home applianc...",
        image: "images/products/electrical-sockets.webp"
    },
    "electrical-mcb": {
        name: "Miniature Circuit Breakers (MCB)",
        description: "Single pole, double pole, and four-pole C-Curve circuit breakers providing instantaneous p...",
        image: "images/products/electrical-mcb.webp"
    },
    "electrical-conduits": {
        name: "Rigid PVC Electrical Conduits",
        description: "High-impact non-metallic conduit pipes with smooth internal walls for easy cable pulling i...",
        image: "images/products/electrical-conduits.webp"
    },
    "electrical-junction": {
        name: "Concealed Metal & PVC Gang Boxes",
        description: "Heavy-gauge rust-resistant galvanized steel and PVC modular back boxes ranging from 1-modu...",
        image: "images/products/electrical-junction.webp"
    },
    "electrical-tape": {
        name: "Vinyl Electrical Insulation Tape",
        description: "Flame-retardant, high-voltage pressure-sensitive adhesive PVC insulation tapes available i...",
        image: "images/products/electrical-tape.webp"
    },
    "electrical-lights": {
        name: "High-Lumen LED Batten Tube Lights",
        description: "20W and 36W energy-saving commercial LED tube lights with integrated 4kV surge protectors ...",
        image: "images/products/electrical-lights.webp"
    },
    "electrical-extension": {
        name: "Multi-Socket Extension Power Strips",
        description: "Heavy-duty 4-way and 6-way surge-protected spike busters with master switch, reset button,...",
        image: "images/products/electrical-extension.webp"
    },
    "electrical-tools": {
        name: "Digital Multimeter & Electrical Testers",
        description: "Compact digital multimeters, neon line testers, multi-size wire strippers, and insulated c...",
        image: "images/products/electrical-tools.webp"
    },
    "hardware-hex-bolts": {
        name: "High-Tensile Grade 8.8 Hex Bolts & Nuts",
        description: "Metric full-thread and half-thread hex head bolts with matching spring washers and lock nu...",
        image: "images/products/hardware-hex-bolts.webp"
    },
    "hardware-anchor-bolts": {
        name: "Concrete Wedge Expansion Anchors",
        description: "High load-bearing carbon steel through-bolt expansion anchor fasteners for structural maso...",
        image: "images/products/hardware-anchor-bolts.webp"
    },
    "hardware-screws": {
        name: "Self-Tapping Drywall & Wood Screws",
        description: "Hardened steel black phosphate drywall screws with bugle heads and deep twin-fast threads ...",
        image: "images/products/hardware-screws.webp"
    },
    "hardware-hinges": {
        name: "Stainless Steel Ball-Bearing Butt Hinges",
        description: "Heavy-gauge AISI 304 stainless steel ball-bearing hinges providing silent, sag-free suppor...",
        image: "images/products/hardware-hinges.webp"
    },
    "hardware-tower-bolts": {
        name: "Solid Brass & SS Tower Bolts",
        description: "Heavy-duty barrel bolts, pad bolts, and surface latches for secure window, bedroom, and ma...",
        image: "images/products/hardware-tower-bolts.webp"
    },
    "hardware-sealant": {
        name: "Weatherproof Silicone Sealant & Caulking",
        description: "Neutral-cure silicone gap fillers and construction adhesive sealants for glass glazing, do...",
        image: "images/products/hardware-sealant.webp"
    },
    "hardware-cutting-discs": {
        name: "Abrasive Metal & Masonry Cutting Discs",
        description: "Double-reinforced 4-inch and 14-inch abrasive cut-off wheels for rebar, structural pipes, ...",
        image: "images/products/hardware-cutting-discs.webp"
    },
    "hardware-measuring": {
        name: "Heavy-Duty Steel Measuring Tapes",
        description: "5m and 10m nylon-coated steel measuring tapes with shock-absorbent rubber casing and stron...",
        image: "images/products/hardware-measuring.webp"
    },
    "hardware-hand-tools": {
        name: "Drop-Forged Claw Hammers & Spanners",
        description: "Drop-forged carbon steel claw hammers with fiberglass shock-absorbing handles, adjustable ...",
        image: "images/products/hardware-hand-tools.webp"
    },
    "hardware-safety": {
        name: "Industrial Safety Helmets & Grip Gloves",
        description: "ISI-approved high-density polyethylene construction helmets with chin straps and puncture-...",
        image: "images/products/hardware-safety.webp"
    }
};

function getWishlist() {
    try {
        return JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]")
            .filter(id => products[id]);
    } catch {
        return [];
    }
}

function saveWishlist(items) {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
    renderWishlistPage();
    updateWishlistCount();
}

function updateWishlistCount() {
    const count = document.getElementById("wishlist-count");
    if (count) count.textContent = getWishlist().length;
}

function renderWishlistPage() {
    const container = document.getElementById("wishlist-items");
    const empty = document.getElementById("wishlist-empty");

    if (!container || !empty) return;

    container.replaceChildren();

    const saved = getWishlist();
    empty.hidden = saved.length !== 0;

    saved.forEach(id => {
        const product = products[id];

        const card = document.createElement("article");
        card.className = "product-card";

        const img = document.createElement("img");
        img.src = product.image;
        img.alt = product.name;

        const info = document.createElement("div");
        info.className = "product-info";

        const title = document.createElement("h3");
        title.textContent = product.name;

        const description = document.createElement("p");
        description.textContent = product.description;

        const remove = document.createElement("button");
        remove.className = "shop-button";
        remove.textContent = "♥ Remove from Wishlist";

        remove.addEventListener("click", () => {
            saveWishlist(getWishlist().filter(item => item !== id));
            updateHeartButtons();
        });

        info.append(title, description, remove);
        card.append(img, info);
        container.append(card);
    });
}

function updateHeartButtons() {
    const saved = getWishlist();

    document.querySelectorAll(".wishlist-toggle").forEach(button => {
        const active = saved.includes(button.dataset.productId);

        button.classList.toggle("active", active);
        button.textContent = active ? "♥" : "♡";
        button.setAttribute("aria-pressed", String(active));
    });
}

document.querySelectorAll(".wishlist-toggle").forEach(button => {
    button.addEventListener("click", () => {
        const id = button.dataset.productId;
        const saved = getWishlist();

        const updated = saved.includes(id)
            ? saved.filter(item => item !== id)
            : [...saved, id];

        saveWishlist(updated);
        updateHeartButtons();
    });
});

renderWishlistPage();
updateHeartButtons();
