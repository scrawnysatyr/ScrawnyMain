const TOOL_DETAILS = {
  summoner: {
    title: "Scrawny Summoner",
    category: "Desktop Tools",
    url: "https://summoner.scrawny.site",
    domain: "summoner.scrawny.site",
    description:
      "Native download manager tool built in Rust with GPUI. Handles direct files, BitTorrent, yt-dlp videos, and HLS/DASH streams with a companion Chrome extension.",
    features: [
      "Multi-connection direct file downloads & queue control",
      "Built-in BitTorrent & magnet link support",
      "Video & audio extraction via yt-dlp and HLS/DASH streams",
      "Companion Chrome extension for one-click capture",
    ],
    tech: ["Rust", "GPUI", "BitTorrent", "yt-dlp"],
  },
  boards: {
    title: "Scrawny Boards",
    category: "Web Games",
    url: "https://boards.scrawny.site",
    domain: "boards.scrawny.site",
    description:
      "Turn-based & peer-to-peer board game hub over WebRTC with zero login, 2D fan animations, custom room links, and spectator mode.",
    features: [
      "Direct peer-to-peer multiplayer over WebRTC with zero accounts",
      "Shareable custom room links & live spectator mode",
      "Smooth 2D card fan animations and tabletop UI",
      "Fast edge signaling powered by Cloudflare",
    ],
    tech: ["React 19", "WebRTC", "TypeScript", "Cloudflare"],
  },
  pdf: {
    title: "Scrawny PDF",
    category: "Web App",
    url: "https://pdf.scrawny.site",
    domain: "pdf.scrawny.site",
    description:
      "PDF maker tool — convert anything to PDF with drag-and-drop page reordering, real-time paper preview, margins, and 5-level compression in the browser.",
    features: [
      "Drag-and-drop page reordering, rotation, and merging",
      "Real-time paper size & margin preview",
      "5-level PDF compression running 100% in your browser",
      "Private client-side processing with pdf-lib",
    ],
    tech: ["React", "TypeScript", "pdf-lib", "Tailwind"],
  },
  ocr: {
    title: "Scrawny OCR",
    category: "Web App",
    url: "https://ocr.scrawny.site",
    domain: "ocr.scrawny.site",
    description:
      "Text extraction from Images and PDFs — fast client-side OCR running directly in your browser with zero server uploads.",
    features: [
      "Extract text from images and multi-page PDFs",
      "Hardware-accelerated local inference via ONNX & WebGPU",
      "Zero server uploads — your documents stay on your device",
      "Fast copy & export workflow",
    ],
    tech: ["React", "TypeScript", "ONNX", "WebGPU"],
  },
  enhance: {
    title: "Scrawny Enhance",
    category: "Desktop Tools",
    url: "https://enhancer.scrawny.site",
    domain: "enhancer.scrawny.site",
    description:
      "Image and video enhancement via AI running locally on your machine — native desktop app built with Rust & GPUI with zero cloud limits.",
    features: [
      "AI upscaling & restoration for images and videos",
      "Runs 100% locally on your GPU/CPU with zero cloud quotas",
      "Before/after split preview window",
      "Native Rust + GPUI desktop performance",
    ],
    tech: ["Rust", "GPUI", "Local AI", "Image/Video"],
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".project-card");
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
