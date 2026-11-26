const TOOL_DETAILS = {
  summoner: {
    title: "Scrawny Summoner",
    category: "Desktop Tools",
    url: "https://summoner.scrawny.site",
    domain: "summoner.scrawny.site",
    description:
      "Download direct files, videos, music, and torrents in one fast desktop app—with pause/resume, queue control, and a browser extension.",
    features: [
      "Speed up file downloads with pause, resume, and queue control",
      "Download torrents and magnet links right inside the app",
      "Save online videos and audio in your preferred quality",
      "Grab links in one click using the companion Chrome extension",
    ],
    tech: ["Downloads", "Torrents", "Video & Audio", "Browser Extension"],
  },
  boards: {
    title: "Scrawny Boards",
    category: "Web Games",
    url: "https://boards.scrawny.site",
    domain: "boards.scrawny.site",
    description:
      "Jump into turn-based board and card games with friends in seconds. Create a room, share the link, and play together with no account required.",
    features: [
      "Play Ohno!, Wild PUSH!, The Millionaire, and Bluff or Wheel",
      "Create public or private rooms and invite friends with a code or link",
      "Play solo or fill empty seats with smart bots anytime",
      "Watch live matches as a spectator with zero login needed",
    ],
    tech: ["Board Games", "Card Games", "Multiplayer", "No Account"],
  },
  pdf: {
    title: "Scrawny PDF",
    category: "Web App",
    url: "https://pdf.scrawny.site",
    domain: "pdf.scrawny.site",
    description:
      "Turn images and documents into clean PDFs right in your browser. Reorder or rotate pages, preview paper sizes, and shrink file sizes privately.",
    features: [
      "Combine images and PDFs, then drag to reorder or rotate pages",
      "Preview paper sizes, margins, and layout before saving",
      "Shrink large PDFs with 5 compression levels",
      "Everything runs on your device—no files are uploaded",
    ],
    tech: ["Create PDF", "Reorder Pages", "Compress", "Private"],
  },
  ocr: {
    title: "Scrawny OCR",
    category: "Web App",
    url: "https://ocr.scrawny.site",
    domain: "ocr.scrawny.site",
    description:
      "Pull editable text out of screenshots, photos, and multi-page PDFs in seconds—everything stays private on your own device.",
    features: [
      "Read and copy text from photos, screenshots, and scanned PDFs",
      "Process multi-page documents quickly in your browser",
      "Your files never leave your device—zero cloud uploads",
      "Copy results or export clean text in one click",
    ],
    tech: ["Image to Text", "PDF Scanner", "Offline Ready", "Private"],
  },
  enhance: {
    title: "Scrawny Enhance",
    category: "Desktop Tools",
    url: "https://enhancer.scrawny.site",
    domain: "enhancer.scrawny.site",
    description:
      "Make blurry photos and low-res videos crisp and clear using AI models right on your own computer—no subscriptions or cloud limits.",
    features: [
      "Upscale and restore photos and videos directly on your PC",
      "Compare before and after side-by-side in a live preview",
      "Unlimited usage with no watermarks or cloud queues",
      "Works completely offline using your own computer's power",
    ],
    tech: ["Photo Upscale", "Video Upscale", "Offline AI", "No Limits"],
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const CATEGORY_ORDER = {
    desktop: 0,
    webgames: 1,
    webapp: 2,
  };

  const grid = document.getElementById("cards-grid");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const cards = Array.from(document.querySelectorAll(".project-card"));

  if (grid) {
    cards.sort((a, b) => {
      const catA = CATEGORY_ORDER[a.getAttribute("data-category")] ?? 99;
      const catB = CATEGORY_ORDER[b.getAttribute("data-category")] ?? 99;
      if (catA !== catB) return catA - catB;
      const nameA = a.querySelector("h3")?.textContent.trim() || "";
      const nameB = b.querySelector("h3")?.textContent.trim() || "";
      return nameA.localeCompare(nameB);
    });
    cards.forEach((card) => grid.appendChild(card));
  }
  const modal = document.getElementById("tool-modal");
  const modalIcon = document.getElementById("modal-icon");
  const modalCategory = document.getElementById("modal-category");
  const modalTitle = document.getElementById("modal-title");
  const modalUrl = document.getElementById("modal-url");
  const modalDescription = document.getElementById("modal-description");
  const modalFeatures = document.getElementById("modal-features");
  const modalTech = document.getElementById("modal-tech");
  const modalVisual = document.getElementById("modal-visual");
  const modalVisit = document.getElementById("modal-visit");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter") || "all";

      filterButtons.forEach((btn) => {
        const active = btn === button;
        btn.classList.toggle("is-active", active);
        btn.setAttribute("aria-selected", String(active));
      });

      cards.forEach((card) => {
        const category = card.getAttribute("data-category");
        const visible = filter === "all" || category === filter;
        card.classList.toggle("is-hidden", !visible);
      });
    });
  });

  function openModal(card) {
    const key = card.getAttribute("data-tool");
    const data = TOOL_DETAILS[key];
    if (!data || !modal) return;

    const cardSvg = card.querySelector(".card-bg-svg");
    const cardIconSvg = card.querySelector(".card-icon svg");

    modalIcon.innerHTML = cardIconSvg ? cardIconSvg.outerHTML : "";
    modalCategory.textContent = data.category;
    modalTitle.textContent = data.title;
    modalUrl.textContent = data.domain;
    modalDescription.textContent = data.description;

    modalFeatures.innerHTML = data.features
      .map((item) => `<li>${item}</li>`)
      .join("");

    modalTech.innerHTML = data.tech
      .map((tag) => `<li>${tag}</li>`)
      .join("");

    modalVisual.innerHTML = cardSvg ? cardSvg.outerHTML : "";
    const visualSvg = modalVisual.querySelector("svg");
    if (visualSvg) {
      visualSvg.removeAttribute("class");
    }

    modalVisit.href = data.url;
    modalVisit.innerHTML = `Open ${data.title} <span aria-hidden="true">&nearr;</span>`;

    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  cards.forEach((card) => {
    card.addEventListener("click", () => openModal(card));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(card);
      }
    });
  });

  if (modal) {
    modal.querySelectorAll("[data-modal-close]").forEach((el) => {
      el.addEventListener("click", closeModal);
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});
