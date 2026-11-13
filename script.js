/**
 * ============================================================================
 * SHIRSH & TANU ROYAL WEDDING INVITATION - JAVASCRIPT
 * Wedding Date: 07 December 2026, Monday
 * Venue: Rudra Hotel, Near Town Degree College, Ballia, Uttar Pradesh
 * ============================================================================
 */

// Helper to run callbacks reliably even if DOMContentLoaded already fired
function onDomReady(fn) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fn);
  } else {
    fn();
  }
}

// ----------------------------------------------------------------------------
// CONFIGURATION VARIABLES (Customizable by User)
// ----------------------------------------------------------------------------
// You can replace this URL with the exact Google Maps link for your venue:
const GOOGLE_MAPS_VENUE_URL = "https://www.google.com/maps/search/?api=1&query=Rudra+Hotel+Near+Town+Degree+College+Ballia+Uttar+Pradesh";

// Wedding Target Date: 7 December 2026 00:00:00 (Local Time)
const WEDDING_DATE = new Date("2026-12-07T00:00:00").getTime();

// Couple Names & Details
const GROOM_NAME = "Shirsh Kumar Srivastav (Mohit)";
const BRIDE_NAME = "Tanu Srivastav (Vaishali)";
const VENUE_NAME = "Rudra Hotel, Near Town Degree College, Ballia, Uttar Pradesh";

// Full Photo Gallery Items (All 16 photos with rich metadata & categories)
const GALLERY_ITEMS = [
  {
    id: 0,
    src: "./assets/couple-hero.png",
    alt: "Shirsh and Tanu - The Royal Mandap Portrait",
    title: "The Royal Mandap Portrait",
    subtitle: "A digital celebration under the golden lights of togetherness",
    category: "portraits"
  },
  {
    id: 1,
    src: "./assets/couple-illustration.png",
    alt: "Shirsh and Tanu - Elegance & Tradition",
    title: "Elegance & Tradition",
    subtitle: "Regal peacock lehenga and embroidered ivory sherwani",
    category: "portraits"
  },
  {
    id: 2,
    src: "./assets/gallery/moment-mandap.jpeg",
    alt: "Shirsh & Tanu in Front of the Wedding Stage",
    title: "Shubh Vivah Stage",
    subtitle: "Grace and poise before the golden floral arch",
    category: "portraits"
  },
  {
    id: 3,
    src: "./assets/gallery/moment-gaze.jpeg",
    alt: "A Candid Look of Adoration",
    title: "A Gaze of Forever",
    subtitle: "A silent promise of eternal love and companionship",
    category: "portraits"
  },
  {
    id: 4,
    src: "./assets/gallery/namaste-welcome.jpeg",
    alt: "Shirsh & Tanu Greeting with Pranaam",
    title: "Pranaam & Warm Greetings",
    subtitle: "Welcoming all cherished guests with folded hands and respect",
    category: "rituals"
  },
  {
    id: 5,
    src: "./assets/gallery/groom-tilak.jpeg",
    alt: "Shirsh During the Auspicious Tilak Ceremony",
    title: "Shubh Tilak Ceremony",
    subtitle: "Sacred vermilion mark, marigold garland, and Vedic blessings",
    category: "rituals"
  },
  {
    id: 6,
    src: "./assets/gallery/sacred-hands.jpeg",
    alt: "Hathleva - Sacred Holding of Hands with Henna and Bangles",
    title: "Hathleva & Sacred Union",
    subtitle: "Intricate bridal mehndi and glittering bangles joined in destiny",
    category: "rituals"
  },
  {
    id: 7,
    src: "./assets/gallery/walk-together.jpeg",
    alt: "Couple Walking Together Hand in Hand",
    title: "Stepping Towards Eternity",
    subtitle: "Walking down the petal-strewn aisle toward a joyous new dawn",
    category: "rituals"
  },
  {
    id: 8,
    src: "./assets/gallery/bride-royal.jpeg",
    alt: "Tanu in Full Royal Bridal Attire",
    title: "The Royal Bride",
    subtitle: "Radiating timeless beauty in her handcrafted lehenga",
    category: "elegance"
  },
  {
    id: 9,
    src: "./assets/gallery/bride-smile.jpeg",
    alt: "Tanu Smiling Gracefully",
    title: "Bridal Grace & Radiance",
    subtitle: "A tender smile that illuminates every corner of our hearts",
    category: "elegance"
  },
  {
    id: 10,
    src: "./assets/gallery/moment-close.jpeg",
    alt: "Shirsh and Tanu Smiling Together",
    title: "Heart to Heart",
    subtitle: "Cherishing every laughter-filled second of our festivities",
    category: "portraits"
  },
  {
    id: 11,
    src: "./assets/gallery/moment-joy.jpeg",
    alt: "Joyful Celebrations",
    title: "Joy & High Spirits",
    subtitle: "Smiling bright as family and friends gather to celebrate",
    category: "portraits"
  },
  {
    id: 12,
    src: "./assets/gallery/holding-hands.jpeg",
    alt: "Shirsh and Tanu Holding Hands Softly",
    title: "Bound by Devotion",
    subtitle: "United by destiny and blessed by the divine elders",
    category: "rituals"
  },
  {
    id: 13,
    src: "./assets/gallery/couple-grace.jpeg",
    alt: "Poise and Harmony",
    title: "Harmony & Grace",
    subtitle: "Standing together in quiet elegance and deep understanding",
    category: "elegance"
  },
  {
    id: 14,
    src: "./assets/couple-photo-1.png",
    alt: "Together Forever Portrait",
    title: "Together Forever",
    subtitle: "A lifetime of boundless love, companionship, and peace",
    category: "portraits"
  },
  {
    id: 15,
    src: "./assets/couple-photo-2.png",
    alt: "Pure Joy & Laughter",
    title: "Pure Joy & Laughter",
    subtitle: "Every joyful smile holds a chapter of our eternal romance",
    category: "portraits"
  }
];

// Pre-populated Heartfelt Family & Friends Wishes
const DEFAULT_WISHES = [
  {
    id: "default-wish-1",
    name: "Srivastav Family Elders",
    relation: "Grandparents & Family Elders",
    text: "May Lord Ganesha and Maa Lakshmi shower their divine blessings upon Shirsh and Tanu. Wishing you both a lifetime of happiness, peace, and eternal harmony!",
    time: "Blessings from Elders",
    avatar: "ॐ",
    likes: 18
  },
  {
    id: "default-wish-2",
    name: "Abhishek & Priya Srivastav",
    relation: "Cousins",
    text: "Congratulations Mohit bhaiya and Vaishali bhabhi! We cannot wait to dance our hearts out at the Barat and Haldi. Wishing you endless laughter and adventures together!",
    time: "Celebration Wishes",
    avatar: "A",
    likes: 14
  },
  {
    id: "default-wish-3",
    name: "Rajesh & Sunita Srivastav",
    relation: "Mamu & Mami",
    text: "May your sacred union be as radiant as the morning sun and as tranquil as the starlit sky. Lots of love, blessings, and warm hugs to our dearest couple!",
    time: "Family Love",
    avatar: "R",
    likes: 11
  },
  {
    id: "default-wish-4",
    name: "Rohan & College Friends",
    relation: "Friends & Batchmates",
    text: "To the most wonderful couple! You two are truly made for each other. Here is to a beautiful journey full of spontaneous road trips, love, and sweet memories!",
    time: "Warm Wishes",
    avatar: "F",
    likes: 9
  }
];

// Couple Quiz Questions & Sample Guest Replies
const COUPLE_QUIZ_QUESTIONS = [
  {
    question: "1. Dulhe (Shirsh) ka ghar ka pyaara nickname kya hai?",
    options: ["Mohit", "Rohan", "Karan", "Aman"],
    correctIndex: 0,
    replyCorrect: "Bilkul sahi jawab! Mohit bhaiya sabke favourite hain! 💖",
    replyWrong: "Oops! Sahi jawab 'Mohit' hai — par aapke pyaar ke liye full marks! ✨"
  },
  {
    question: "2. Dulhan (Tanu) ko sab ghar par kis naam se bulate hain?",
    options: ["Ananya", "Vaishali", "Priya", "Sneha"],
    correctIndex: 1,
    replyCorrect: "100% Sahi! Vaishali bhabhi hamare pariwar ki shaan hain! 👑",
    replyWrong: "Arre! Unka pyaara naam 'Vaishali' hai — ab yaad rakhna! 💕"
  },
  {
    question: "3. Shirsh & Tanu ke Shubh Vivah ki date kaunsi hai?",
    options: ["25 November 2026", "07 December 2026", "14 February 2027", "10 December 2026"],
    correctIndex: 1,
    replyCorrect: "Wah! 07 December 2026 ko Barat me zabardast dance hoga! 💃🕺",
    replyWrong: "Calendar mark kar lein! Shubh Vivah 07 December 2026 (Monday) ko hai! 🗓️"
  },
  {
    question: "4. Wedding Celebration ka Venue kahan rakha gaya hai?",
    options: ["Lucknow Palace", "Varanasi Ghat", "Rudra Hotel, Near Town Degree College, Ballia", "Patna Heritage"],
    correctIndex: 2,
    replyCorrect: "Perfect! Rudra Hotel, Near Town Degree College, Ballia me sab milkar dhoom machayenge! 📍✨",
    replyWrong: "Venue note kar lein: Rudra Hotel, Near Town Degree College, Ballia, U.P.! 📍"
  },
  {
    question: "5. Couple ke liye sabse mazedaar prediction kya hai?",
    options: [
      "Tanu sabse pehle ready hongi 💄",
      "Shirsh dance floor par aag laga denge 🕺",
      "Dono photo-shoot me sabse cute lagenge 📸",
      "Inka pyaar hamesha #1 rahega ❤️"
    ],
    correctIndex: -1, // Any choice gets full score!
    replyCorrect: "Haha! Ye toh pakka 100% sach hone wala hai! 😍💘",
    replyWrong: "Haha! Ye toh pakka 100% sach hone wala hai! 😍💘"
  }
];

const DEFAULT_QUIZ_REPLIES = [
  {
    id: "default-quiz-1",
    name: "Ananya & Cousins Squad",
    scoreText: "5/5 • Royal VIP",
    reply: "Mohit & Vaishali ki jodi No. 1 hai! 07 Dec ko Barat me sabse zyada dance hum hi karenge! 💃❤️",
    avatar: "A",
    likes: 16,
    time: "Quiz Topper"
  },
  {
    id: "default-quiz-2",
    name: "Vivek & College Friends",
    scoreText: "4/5 • Dil Se Dost",
    reply: "Rudra Hotel, Near Town Degree College Ballia aane ke liye full excitement hai bhai! God bless Shirsh & Tanu! 🎊",
    avatar: "V",
    likes: 12,
    time: "Team Groom"
  }
];

// ----------------------------------------------------------------------------
// 1. PRELOADER & AUTOMATIC ROMANTIC MUSIC ON USER INTERACTION
// ----------------------------------------------------------------------------
let userHasInteracted = false;

function handleUserInteractionAndPlay() {
  if (!userHasInteracted) {
    userHasInteracted = true;
    if (typeof window.startWeddingAudio === "function") {
      window.startWeddingAudio();
    }
  }
}

onDomReady(() => {
  const preloader = document.getElementById("preloader");
  const enterBtn = document.getElementById("preloader-enter-btn");

  function scheduleAutoQuizOpen() {
    try {
      if (!sessionStorage.getItem("st_quiz_opened")) {
        sessionStorage.setItem("st_quiz_opened", "1");
        setTimeout(() => {
          if (typeof window.openCoupleQuizModal === "function") {
            window.openCoupleQuizModal();
          }
        }, 1600);
      }
    } catch (_e) {}
  }

  function dismissPreloader(e) {
    if (e) e.stopPropagation();
    handleUserInteractionAndPlay();

    if (preloader && !preloader.classList.contains("fade-out")) {
      preloader.classList.add("fade-out");
      setTimeout(() => {
        preloader.remove();
      }, 800);
    }
    scheduleAutoQuizOpen();
  }

  if (enterBtn) {
    enterBtn.addEventListener("click", dismissPreloader);
    enterBtn.addEventListener("touchend", dismissPreloader);
  }

  if (preloader) {
    preloader.addEventListener("click", dismissPreloader);
    preloader.addEventListener("touchend", dismissPreloader);
  }

  // If preloader was already dismissed via fail-safe before module load
  if (!preloader || preloader.classList.contains("fade-out")) {
    scheduleAutoQuizOpen();
  }

  // Global listener: first click, touch, or key anywhere immediately starts audio
  ["click", "touchstart", "keydown"].forEach((evt) => {
    document.addEventListener(evt, handleUserInteractionAndPlay, { once: true, passive: true });
  });
});

// ----------------------------------------------------------------------------
// 2. LIVE COUNTDOWN TIMER
// ----------------------------------------------------------------------------
function initCountdown() {
  const daysEl = document.getElementById("countdown-days");
  const hoursEl = document.getElementById("countdown-hours");
  const minutesEl = document.getElementById("countdown-minutes");
  const secondsEl = document.getElementById("countdown-seconds");
  const gridEl = document.getElementById("countdown-grid");
  const passedMsgEl = document.getElementById("countdown-passed-msg");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  function updateTimer() {
    const now = new Date().getTime();
    const distance = WEDDING_DATE - now;

    if (distance <= 0) {
      if (gridEl) gridEl.style.display = "none";
      if (passedMsgEl) passedMsgEl.style.display = "block";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

// ----------------------------------------------------------------------------
// 3. FLOATING FALLING HEARTS (CANVAS ANIMATION WITH CELEBRATION BURST)
// ----------------------------------------------------------------------------
let triggerCelebrationBurst = null;

function initPetalsCanvas() {
  const canvas = document.getElementById("petals-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const heartsCount = window.innerWidth < 768 ? 18 : 30;
  const hearts = [];

  const heartColors = [
    "rgba(225, 29, 72, 0.78)",   // Ruby Crimson Heart
    "rgba(244, 114, 182, 0.75)", // Romantic Rose Pink Heart
    "rgba(159, 18, 57, 0.72)",   // Royal Maroon Heart
    "rgba(217, 166, 78, 0.72)"   // Golden Shimmer Heart
  ];

  for (let i = 0; i < heartsCount; i++) {
    hearts.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 7 + 7,
      speedY: Math.random() * 1.15 + 0.55,
      speedX: Math.random() * 0.7 - 0.35,
      rotation: (Math.random() - 0.5) * 40,
      rotSpeed: (Math.random() - 0.5) * 1.1,
      color: heartColors[Math.floor(Math.random() * heartColors.length)],
      sway: Math.random() * 1.6 + 0.4,
      swaySpeed: Math.random() * 0.02 + 0.01
    });
  }

  // Heart Celebration burst when user submits a wish, completes quiz, or likes!
  triggerCelebrationBurst = function () {
    for (let i = 0; i < 42; i++) {
      hearts.push({
        x: width / 2 + (Math.random() - 0.5) * 220,
        y: height / 2 + (Math.random() - 0.5) * 120,
        size: Math.random() * 9 + 8,
        speedY: (Math.random() - 0.65) * 4.2,
        speedX: (Math.random() - 0.5) * 6,
        rotation: (Math.random() - 0.5) * 60,
        rotSpeed: (Math.random() - 0.5) * 4,
        color: heartColors[Math.floor(Math.random() * heartColors.length)],
        sway: Math.random() * 2.5,
        swaySpeed: 0.03
      });
    }
    // Trim extra after burst settles
    setTimeout(() => {
      if (hearts.length > heartsCount) {
        hearts.splice(heartsCount, hearts.length - heartsCount);
      }
    }, 4500);
  };

  let isCanvasActive = true;

  document.addEventListener("visibilitychange", () => {
    isCanvasActive = !document.hidden;
    if (isCanvasActive) renderHearts();
  });

  function drawHeartShape(s) {
    // Classic symmetrical heart centered near (0, 0)
    const topCurveHeight = s * 0.3;
    ctx.beginPath();
    ctx.moveTo(0, topCurveHeight);
    ctx.bezierCurveTo(0, 0, -s, 0, -s, topCurveHeight);
    ctx.bezierCurveTo(-s, s * 0.72, 0, s * 0.96, 0, s * 1.28);
    ctx.bezierCurveTo(0, s * 0.96, s, s * 0.72, s, topCurveHeight);
    ctx.bezierCurveTo(s, 0, 0, 0, 0, topCurveHeight);
    ctx.closePath();
  }

  function renderHearts() {
    if (!isCanvasActive) return;

    ctx.clearRect(0, 0, width, height);

    for (let h of hearts) {
      h.y += h.speedY;
      h.x += Math.sin(h.y * h.swaySpeed) * h.sway + h.speedX;
      h.rotation += h.rotSpeed;

      if (h.y > height + 24) {
        h.y = -24;
        h.x = Math.random() * width;
      }
      if (h.x > width + 24) h.x = -24;
      if (h.x < -24) h.x = width + 24;

      ctx.save();
      ctx.translate(h.x, h.y);
      ctx.rotate((h.rotation * Math.PI) / 180);

      // Soft ambient glow + filled heart
      ctx.shadowColor = h.color;
      ctx.shadowBlur = 8;
      drawHeartShape(h.size);
      ctx.fillStyle = h.color;
      ctx.fill();

      // Delicate inner specular highlight
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(-h.size * 0.42, h.size * 0.25, Math.max(1.2, h.size * 0.16), 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
      ctx.fill();

      ctx.restore();
    }

    requestAnimationFrame(renderHearts);
  }

  renderHearts();
}

// ----------------------------------------------------------------------------
// 4. SCROLL REVEAL (INTERSECTION OBSERVER)
// ----------------------------------------------------------------------------
function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  reveals.forEach((el) => observer.observe(el));
}

// ----------------------------------------------------------------------------
// 5. GALLERY FILTER TABS
// ----------------------------------------------------------------------------
function initGalleryFilters() {
  const filterBtns = document.querySelectorAll(".gallery-filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  if (!filterBtns.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter") || "all";

      galleryItems.forEach((item) => {
        const cat = item.getAttribute("data-category") || "";
        if (filter === "all" || cat === filter) {
          item.removeAttribute("data-hidden");
          item.style.opacity = "0";
          item.style.transform = "scale(0.96)";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 50);
        } else {
          item.setAttribute("data-hidden", "true");
        }
      });
    });
  });
}

// ----------------------------------------------------------------------------
// 6. RESPONSIVE FULL-SCREEN LIGHTBOX MODAL
// ----------------------------------------------------------------------------
let currentLightboxIndex = 0;
let activeLightboxItems = [...GALLERY_ITEMS];

function initLightbox() {
  const modal = document.getElementById("lightbox-modal");
  const lightboxImg = document.getElementById("lightbox-img");
  const captionEl = document.getElementById("lightbox-caption");
  const counterEl = document.getElementById("lightbox-counter");
  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");

  if (!modal || !lightboxImg) return;

  // Open Lightbox
  window.openLightbox = function (index) {
    currentLightboxIndex = index;
    updateLightboxContent();
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  function updateLightboxContent() {
    const item = GALLERY_ITEMS[currentLightboxIndex];
    if (!item) return;

    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt;
    if (captionEl) captionEl.textContent = item.title;
    if (counterEl) {
      counterEl.textContent = `${currentLightboxIndex + 1} of ${GALLERY_ITEMS.length}`;
    }
  }

  function closeLightbox() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  function showPrev() {
    currentLightboxIndex = (currentLightboxIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    updateLightboxContent();
  }

  function showNext() {
    currentLightboxIndex = (currentLightboxIndex + 1) % GALLERY_ITEMS.length;
    updateLightboxContent();
  }

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (prevBtn) prevBtn.addEventListener("click", showPrev);
  if (nextBtn) nextBtn.addEventListener("click", showNext);

  // Close on backdrop click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "ArrowRight") showNext();
  });

  // Touch Swipe for Mobile
  let touchStartX = 0;
  let touchEndX = 0;
  modal.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  modal.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) {
      showNext();
    } else if (touchEndX - touchStartX > 50) {
      showPrev();
    }
  }, { passive: true });

  // Attach click to gallery items
  const galleryCards = document.querySelectorAll(".gallery-card");
  galleryCards.forEach((card) => {
    card.addEventListener("click", () => {
      const idx = parseInt(card.getAttribute("data-gallery-index") || "0", 10);
      window.openLightbox(idx);
    });
  });
}

// ----------------------------------------------------------------------------
// 7. SHARED FIREBASE BACKEND (WISHES + QUIZ REPLIES + REAL-TIME LIKES)
// ----------------------------------------------------------------------------
let sharedBackendPromise = null;

function getLikedSet(storageKey) {
  try {
    const raw = localStorage.getItem(storageKey);
    const parsed = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set();
  }
}

function saveLikedId(storageKey, id) {
  try {
    const set = getLikedSet(storageKey);
    set.add(id);
    localStorage.setItem(storageKey, JSON.stringify([...set]));
  } catch {}
}

function getLocalLikeMap(storageKey) {
  try {
    const raw = localStorage.getItem(storageKey);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function saveLocalLikeCount(storageKey, id, count) {
  try {
    const map = getLocalLikeMap(storageKey);
    map[id] = count;
    localStorage.setItem(storageKey, JSON.stringify(map));
  } catch {}
}

function escapeHtmlSafe(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getWishesBackend() {
  if (sharedBackendPromise) return sharedBackendPromise;

  sharedBackendPromise = (async () => {
    try {
      return await import("./src/wishesFirebase.ts");
    } catch (_viteErr) {
      const configRes = await fetch("./firebase-applet-config.json");
      if (!configRes.ok) {
        throw new Error("Could not load firebase-applet-config.json");
      }
      const firebaseConfig = await configRes.json();
      const firebaseAppUrl = "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
      const firestoreUrl = "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
      const [{ initializeApp }, firestoreMod] = await Promise.all([
        import(/* @vite-ignore */ firebaseAppUrl),
        import(/* @vite-ignore */ firestoreUrl),
      ]);
      const {
        getFirestore,
        collection,
        addDoc,
        updateDoc,
        increment,
        query,
        orderBy,
        limit,
        onSnapshot,
        serverTimestamp,
        doc,
        getDocFromServer,
      } = firestoreMod;

      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

      getDocFromServer(doc(db, "test", "connection")).catch((err) => {
        if (err && err.message && err.message.includes("the client is offline")) {
          console.error("Please check your Firebase configuration.");
        }
      });

      function formatWishTime(createdAt) {
        if (!createdAt) return "Just now";
        try {
          const date = typeof createdAt.toDate === "function" ? createdAt.toDate() : new Date(String(createdAt));
          const diffMs = Date.now() - date.getTime();
          const diffMins = Math.floor(diffMs / 60000);
          if (diffMins < 1) return "Just now";
          if (diffMins < 60) return `${diffMins} min ago`;
          const diffHours = Math.floor(diffMins / 60);
          if (diffHours < 24) return `${diffHours} hr ago`;
          return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
        } catch {
          return "Blessed with love";
        }
      }

      function logFirestoreError(error, operationType, path) {
        const errInfo = {
          error: error instanceof Error ? error.message : String(error),
          operationType,
          path,
          authInfo: { userId: null, email: null, providerInfo: [] },
        };
        console.error("Firestore Error: ", JSON.stringify(errInfo));
        return new Error(JSON.stringify(errInfo));
      }

      return {
        subscribeToWishes(onUpdate, onError) {
          const path = "wishes";
          const q = query(collection(db, path), orderBy("createdAt", "desc"), limit(100));
          return onSnapshot(
            q,
            (snapshot) => {
              const wishes = snapshot.docs.map((docSnap) => {
                const data = docSnap.data();
                const name = typeof data.name === "string" ? data.name : "Well-wisher";
                return {
                  id: docSnap.id,
                  name,
                  relation: typeof data.relation === "string" ? data.relation : "Well-wisher",
                  text: typeof data.text === "string" ? data.text : "",
                  avatar:
                    typeof data.avatar === "string" && data.avatar.length > 0
                      ? data.avatar
                      : name.charAt(0).toUpperCase(),
                  likes: typeof data.likes === "number" && Number.isFinite(data.likes) ? data.likes : 0,
                  time: formatWishTime(data.createdAt),
                };
              });
              onUpdate(wishes);
            },
            (error) => {
              const wrapped = logFirestoreError(error, "list", path);
              if (onError) onError(wrapped);
            }
          );
        },
        async submitWishToFirebase(input) {
          const path = "wishes";
          const cleanName = input.name.trim().slice(0, 80);
          const cleanRelation = (input.relation.trim() || "Well-wisher").slice(0, 50);
          const cleanText = input.text.trim().slice(0, 500);
          const avatar = (cleanName.charAt(0) || "❤").toUpperCase().slice(0, 4);
          if (!cleanName || !cleanText) {
            throw new Error("Name and wish message are required.");
          }
          try {
            await addDoc(collection(db, path), {
              name: cleanName,
              relation: cleanRelation,
              text: cleanText,
              avatar,
              likes: 0,
              createdAt: serverTimestamp(),
            });
          } catch (error) {
            throw logFirestoreError(error, "create", path);
          }
        },
        async likeWishInFirebase(wishId) {
          const path = `wishes/${wishId}`;
          try {
            await updateDoc(doc(db, "wishes", wishId), {
              likes: increment(1),
            });
          } catch (error) {
            throw logFirestoreError(error, "update", path);
          }
        },
        subscribeToQuizReplies(onUpdate, onError) {
          const path = "quiz_replies";
          const q = query(collection(db, path), orderBy("createdAt", "desc"), limit(100));
          return onSnapshot(
            q,
            (snapshot) => {
              const replies = snapshot.docs.map((docSnap) => {
                const data = docSnap.data();
                const name = typeof data.name === "string" ? data.name : "Wedding Guest";
                return {
                  id: docSnap.id,
                  name,
                  scoreText: typeof data.scoreText === "string" ? data.scoreText : "Quiz Player",
                  reply: typeof data.reply === "string" ? data.reply : "",
                  avatar:
                    typeof data.avatar === "string" && data.avatar.length > 0
                      ? data.avatar
                      : name.charAt(0).toUpperCase(),
                  likes: typeof data.likes === "number" && Number.isFinite(data.likes) ? data.likes : 0,
                  time: formatWishTime(data.createdAt),
                };
              });
              onUpdate(replies);
            },
            (error) => {
              const wrapped = logFirestoreError(error, "list", path);
              if (onError) onError(wrapped);
            }
          );
        },
        async submitQuizReplyToFirebase(input) {
          const path = "quiz_replies";
          const cleanName = input.name.trim().slice(0, 80);
          const cleanScoreText = (input.scoreText.trim() || "Quiz Star").slice(0, 40);
          const cleanReply = input.reply.trim().slice(0, 400);
          const avatar = (cleanName.charAt(0) || "💘").toUpperCase().slice(0, 4);
          if (!cleanName || !cleanReply) {
            throw new Error("Name and reply are required.");
          }
          try {
            await addDoc(collection(db, path), {
              name: cleanName,
              scoreText: cleanScoreText,
              reply: cleanReply,
              avatar,
              likes: 0,
              createdAt: serverTimestamp(),
            });
          } catch (error) {
            throw logFirestoreError(error, "create", path);
          }
        },
        async likeQuizReplyInFirebase(replyId) {
          const path = `quiz_replies/${replyId}`;
          try {
            await updateDoc(doc(db, "quiz_replies", replyId), {
              likes: increment(1),
            });
          } catch (error) {
            throw logFirestoreError(error, "update", path);
          }
        },
      };
    }
  })();

  return sharedBackendPromise;
}

function initWishesWall() {
  const wallEl = document.getElementById("wishes-wall-container");
  const form = document.getElementById("wish-submit-form");
  const submitBtn = document.getElementById("wish-submit-btn");
  const toast = document.getElementById("wish-success-toast");
  const errorToast = document.getElementById("wish-error-toast");

  if (!wallEl || !form) return;

  let liveWishes = [];
  const WISH_LIKED_KEY = "st_liked_wishes_v1";
  const DEFAULT_LIKE_COUNTS_KEY = "st_default_wish_likes_v1";

  function renderWishes() {
    const likedSet = getLikedSet(WISH_LIKED_KEY);
    const defaultLikeMap = getLocalLikeMap(DEFAULT_LIKE_COUNTS_KEY);
    const combinedList = [...liveWishes, ...DEFAULT_WISHES];
    wallEl.innerHTML = "";

    combinedList.forEach((w) => {
      const card = document.createElement("article");
      card.className = "wish-card";

      const isDefault = String(w.id || "").startsWith("default-");
      const likeCount = isDefault
        ? (typeof defaultLikeMap[w.id] === "number" ? defaultLikeMap[w.id] : w.likes || 0)
        : (typeof w.likes === "number" ? w.likes : 0);
      const isLiked = w.id ? likedSet.has(w.id) : false;
      const initial = w.avatar || (w.name ? w.name.trim().charAt(0).toUpperCase() : "❤️");

      card.innerHTML = `
        <div class="wish-card-header">
          <div class="wish-sender-info">
            <div class="wish-avatar">${escapeHtmlSafe(initial)}</div>
            <div>
              <h4 class="wish-author-name">${escapeHtmlSafe(w.name)}</h4>
              <span class="wish-relation-tag">${escapeHtmlSafe(w.relation || "Well-wisher")}</span>
            </div>
          </div>
          <span class="wish-quote-symbol" aria-hidden="true">&ldquo;</span>
        </div>
        <p class="wish-body-text">${escapeHtmlSafe(w.text)}</p>
        <div class="wish-card-footer">
          <button
            type="button"
            class="like-btn${isLiked ? " liked" : ""}"
            data-wish-id="${escapeHtmlSafe(w.id || "")}"
            aria-label="Like this blessing"
          >
            <span>${isLiked ? "❤️" : "🤍"}</span>
            <span>Like</span>
            <span class="like-count">${likeCount}</span>
          </button>
          <span class="wish-time">${escapeHtmlSafe(w.time || "Blessed with love")}</span>
        </div>
      `;

      const likeBtn = card.querySelector(".like-btn");
      if (likeBtn && w.id) {
        likeBtn.addEventListener("click", async () => {
          if (likedSet.has(w.id)) return;
          likedSet.add(w.id);
          saveLikedId(WISH_LIKED_KEY, w.id);

          const countEl = likeBtn.querySelector(".like-count");
          const current = parseInt((countEl && countEl.textContent) || "0", 10) || 0;
          const next = current + 1;

          likeBtn.classList.add("liked", "like-pop");
          if (likeBtn.firstElementChild) likeBtn.firstElementChild.textContent = "❤️";
          if (countEl) countEl.textContent = String(next);

          if (isDefault) {
            saveLocalLikeCount(DEFAULT_LIKE_COUNTS_KEY, w.id, next);
          } else {
            try {
              const backend = await getWishesBackend();
              await backend.likeWishInFirebase(w.id);
            } catch (err) {
              console.warn("Unable to sync wish like:", err);
            }
          }
        });
      }

      wallEl.appendChild(card);
    });
  }

  // Initial render while connecting to Firestore
  renderWishes();

  const wishesBackendPromise = getWishesBackend();

  // Subscribe to real-time Firestore wishes so everyone sees all sent wishes & likes
  wishesBackendPromise
    .then((backend) => {
      backend.subscribeToWishes(
        (wishes) => {
          liveWishes = wishes;
          renderWishes();
        },
        (err) => {
          console.warn("Unable to sync wishes live:", err);
        }
      );
    })
    .catch((err) => {
      console.warn("Firestore subscription error:", err);
    });

  // Handle new wish submission to shared Firestore database
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("wish-name");
    const relationInput = document.getElementById("wish-relation");
    const textInput = document.getElementById("wish-text");

    const name = nameInput.value.trim();
    const relation = relationInput.value.trim() || "Well-wisher";
    const text = textInput.value.trim();

    if (!name || !text) return;

    if (errorToast) errorToast.style.display = "none";
    if (toast) toast.style.display = "none";

    const originalBtnHtml = submitBtn ? submitBtn.innerHTML : "";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = "<span>&#10047;</span> Posting Blessing...";
    }

    try {
      const backend = await wishesBackendPromise;
      await backend.submitWishToFirebase({ name, relation, text });

      // Trigger celebration burst of hearts!
      if (triggerCelebrationBurst) {
        triggerCelebrationBurst();
      }

      if (toast) {
        toast.style.display = "block";
        setTimeout(() => {
          toast.style.display = "none";
        }, 4500);
      }

      form.reset();
    } catch (err) {
      console.error("Failed to submit wish:", err);
      if (errorToast) {
        errorToast.style.display = "block";
        setTimeout(() => {
          errorToast.style.display = "none";
        }, 5000);
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
      }
    }
  });
}

// ----------------------------------------------------------------------------
// 8. BACKGROUND MUSIC PLAYER (YOUTUBE IFRAME API & AUTOMATIC ROMANTIC MUSIC)
// ----------------------------------------------------------------------------
let ytPlayer = null;
let isYtReady = false;
let shouldPlayWhenReady = false;
// Default: Aaj Sajeya (x9l2VRJ5-3k) starting at 27s
let currentYtVideoId = "x9l2VRJ5-3k";
let currentYtStartSeconds = 27;

// Master Function to Start Wedding Music on User Interaction
window.startWeddingAudio = function () {
  shouldPlayWhenReady = true;
  const musicBtn = document.getElementById("music-toggle-btn");
  const musicAudio = document.getElementById("wedding-audio");

  // 1. If YouTube Player is already initialized & ready, play immediately
  if (ytPlayer && isYtReady && typeof ytPlayer.playVideo === "function") {
    try {
      if (currentYtStartSeconds > 0) {
        ytPlayer.seekTo(currentYtStartSeconds, true);
      }
      ytPlayer.playVideo();
      if (musicBtn) {
        musicBtn.classList.add("playing");
        musicBtn.setAttribute("title", "Pause Wedding Music");
      }
      return;
    } catch (err) {
      console.warn("YouTube play attempt", err);
    }
  }

  // 2. Simultaneously unlock & play local audio / fallback in synchronous user gesture context
  if (musicAudio) {
    musicAudio.play().then(() => {
      if (musicBtn) {
        musicBtn.classList.add("playing");
        musicBtn.setAttribute("title", "Pause Wedding Music");
      }
    }).catch(() => {
      // Procedural synthesizer fallback
      if (typeof window.startAmbientSynthFallback === "function") {
        window.startAmbientSynthFallback();
        if (musicBtn) {
          musicBtn.classList.add("playing");
          musicBtn.setAttribute("title", "Pause Wedding Music");
        }
      }
    });
  }
};

// Helper to extract YouTube Video ID and start time from any URL or raw ID
function extractYouTubeDetails(urlOrId) {
  if (!urlOrId) return { videoId: null, startSeconds: 0 };
  urlOrId = urlOrId.trim();

  let startSeconds = 0;
  const tMatch = urlOrId.match(/[?&#](?:t|start)=(\d+)/);
  if (tMatch) {
    startSeconds = parseInt(tMatch[1], 10) || 0;
  }

  if (/^[a-zA-Z0-9_-]{11}$/.test(urlOrId)) {
    return { videoId: urlOrId, startSeconds };
  }

  const match = urlOrId.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return {
    videoId: match ? match[1] : null,
    startSeconds
  };
}

function extractYouTubeId(urlOrId) {
  return extractYouTubeDetails(urlOrId).videoId;
}

// Load YouTube IFrame Player API
(function loadYouTubeApi() {
  if (window.YT && window.YT.Player) {
    onYouTubeIframeAPIReady();
    return;
  }
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName("script")[0];
  if (firstScriptTag && firstScriptTag.parentNode) {
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  } else {
    document.head.appendChild(tag);
  }
})();

window.onYouTubeIframeAPIReady = function () {
  const container = document.getElementById("youtube-audio-player");
  if (!container || !window.YT) return;

  try {
    ytPlayer = new window.YT.Player("youtube-audio-player", {
      height: "200",
      width: "200",
      videoId: currentYtVideoId,
      playerVars: {
        autoplay: 1,
        controls: 0,
        disablekb: 1,
        fs: 0,
        loop: 1,
        start: currentYtStartSeconds,
        playlist: currentYtVideoId,
        modestbranding: 1,
        rel: 0
      },
      events: {
        onReady: () => {
          isYtReady = true;
          const statusMsg = document.getElementById("yt-status-msg");
          if (statusMsg) statusMsg.textContent = "Romantic Wedding Music Active 🎶 (Aaj Sajeya - Wedding Anthem)";

          // If the user has already tapped or clicked to dismiss preloader, start YouTube immediately
          if (shouldPlayWhenReady || window.__pendingAudioStart) {
            shouldPlayWhenReady = true;
            try {
              const musicAudio = document.getElementById("wedding-audio");
              if (musicAudio) musicAudio.pause();
              if (typeof window.stopAmbientSynthFallback === "function") {
                window.stopAmbientSynthFallback();
              }
              if (currentYtStartSeconds > 0) {
                ytPlayer.seekTo(currentYtStartSeconds, true);
              }
              ytPlayer.playVideo();
              const musicBtn = document.getElementById("music-toggle-btn");
              if (musicBtn) {
                musicBtn.classList.add("playing");
                musicBtn.setAttribute("title", "Pause Wedding Music");
              }
            } catch (e) {
              console.warn("Error playing YouTube upon onReady", e);
            }
          }
        },
        onStateChange: (event) => {
          const musicBtn = document.getElementById("music-toggle-btn");
          if (!musicBtn) return;
          // 1 = PLAYING, 2 = PAUSED, 0 = ENDED
          if (event.data === window.YT.PlayerState.PLAYING) {
            musicBtn.classList.add("playing");
            musicBtn.setAttribute("title", "Pause Wedding Music");
          } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
            musicBtn.classList.remove("playing");
            musicBtn.setAttribute("title", "Play Wedding Music");
          }
        },
        onError: () => {
          console.warn("YouTube player encountered an issue, fallback active.");
        }
      }
    });
  } catch (err) {
    console.warn("YouTube initialization error", err);
  }
};

function initMusicPlayer() {
  const musicBtn = document.getElementById("music-toggle-btn");
  const musicSettingsBtn = document.getElementById("music-settings-btn");
  const musicModal = document.getElementById("music-modal");
  const musicModalClose = document.getElementById("music-modal-close");
  const customYtInput = document.getElementById("custom-yt-input");
  const customYtBtn = document.getElementById("custom-yt-btn");
  const ytStatusMsg = document.getElementById("yt-status-msg");
  const presetItems = document.querySelectorAll(".music-preset-item");
  const musicAudio = document.getElementById("wedding-audio");

  if (!musicBtn) return;

  let isPlayingLocal = false;
  let audioCtx = null;
  let synthInterval = null;

  // Authentic procedural Indian Raag / Shehnai acoustic synthesizer fallback
  function startIndianAmbientSynth() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!audioCtx) audioCtx = new AudioContext();
      if (audioCtx.state === "suspended") audioCtx.resume();

      const masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      masterGain.connect(audioCtx.destination);

      const droneFreqs = [138.59, 207.65, 277.18];
      droneFreqs.forEach((freq) => {
        const osc = audioCtx.createOscillator();
        const droneGain = audioCtx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

        const filter = audioCtx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(450, audioCtx.currentTime);

        droneGain.gain.setValueAtTime(0.02, audioCtx.currentTime);
        osc.connect(filter);
        filter.connect(droneGain);
        droneGain.connect(masterGain);
        osc.start();
      });

      const ragaNotes = [277.18, 311.13, 349.23, 369.99, 415.3, 466.16, 523.25, 554.37];
      synthInterval = setInterval(() => {
        if (!isPlayingLocal || !audioCtx) return;
        const note = ragaNotes[Math.floor(Math.random() * ragaNotes.length)];
        const osc = audioCtx.createOscillator();
        const noteGain = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();

        osc.type = "sine";
        osc.frequency.setValueAtTime(note, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(note * 1.01, audioCtx.currentTime + 0.4);

        filter.type = "bandpass";
        filter.frequency.setValueAtTime(note * 1.5, audioCtx.currentTime);
        filter.Q.setValueAtTime(3, audioCtx.currentTime);

        const now = audioCtx.currentTime;
        noteGain.gain.setValueAtTime(0.001, now);
        noteGain.gain.linearRampToValueAtTime(0.05, now + 0.2);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);

        osc.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(masterGain);

        osc.start(now);
        osc.stop(now + 1.8);
      }, 950);
    } catch (e) {
      console.warn("Synth unavailable", e);
    }
  }

  function stopIndianAmbientSynth() {
    if (synthInterval) {
      clearInterval(synthInterval);
      synthInterval = null;
    }
    if (audioCtx) {
      audioCtx.close().catch(() => {});
      audioCtx = null;
    }
  }

  window.startAmbientSynthFallback = startIndianAmbientSynth;
  window.stopAmbientSynthFallback = stopIndianAmbientSynth;

  // Toggle Play / Pause function
  async function togglePlay() {
    if (ytPlayer && isYtReady && typeof ytPlayer.getPlayerState === "function") {
      const state = ytPlayer.getPlayerState();
      if (state === window.YT.PlayerState.PLAYING) {
        ytPlayer.pauseVideo();
        musicBtn.classList.remove("playing");
        musicBtn.setAttribute("title", "Play Wedding Music");
      } else {
        ytPlayer.playVideo();
        musicBtn.classList.add("playing");
        musicBtn.setAttribute("title", "Pause Wedding Music");
      }
      return;
    }

    // Fallback: MP3 or Procedural Web Audio Synth
    if (!isPlayingLocal) {
      isPlayingLocal = true;
      musicBtn.classList.add("playing");
      musicBtn.setAttribute("title", "Pause Wedding Music");

      if (musicAudio && musicAudio.src) {
        try {
          await musicAudio.play();
        } catch (err) {
          startIndianAmbientSynth();
        }
      } else {
        startIndianAmbientSynth();
      }
    } else {
      isPlayingLocal = false;
      musicBtn.classList.remove("playing");
      musicBtn.setAttribute("title", "Play Wedding Music");

      if (musicAudio) {
        musicAudio.pause();
      }
      stopIndianAmbientSynth();
    }
  }

  musicBtn.addEventListener("click", togglePlay);

  // Music Settings Modal Handlers
  if (musicSettingsBtn && musicModal) {
    musicSettingsBtn.addEventListener("click", () => {
      musicModal.classList.add("active");
    });

    if (musicModalClose) {
      musicModalClose.addEventListener("click", () => {
        musicModal.classList.remove("active");
      });
    }

    musicModal.addEventListener("click", (e) => {
      if (e.target === musicModal) {
        musicModal.classList.remove("active");
      }
    });

    // Preset Selection
    presetItems.forEach((item) => {
      item.addEventListener("click", () => {
        const videoId = item.getAttribute("data-yt-id");
        const start = parseInt(item.getAttribute("data-start") || "0", 10);
        const title = item.getAttribute("data-title") || "Wedding Track";

        presetItems.forEach((p) => p.classList.remove("active"));
        item.classList.add("active");

        if (videoId && ytPlayer && typeof ytPlayer.loadVideoById === "function") {
          currentYtVideoId = videoId;
          currentYtStartSeconds = start;
          ytPlayer.loadVideoById({
            videoId: videoId,
            startSeconds: start
          });
          ytPlayer.playVideo();
          musicBtn.classList.add("playing");

          if (ytStatusMsg) {
            ytStatusMsg.textContent = `Now Playing: ${title} 🎶`;
          }
        }
      });
    });

    // Custom YouTube Link Submission
    if (customYtBtn && customYtInput) {
      customYtBtn.addEventListener("click", () => {
        const raw = customYtInput.value.trim();
        const { videoId: extractedId, startSeconds } = extractYouTubeDetails(raw);

        if (!extractedId) {
          if (ytStatusMsg) {
            ytStatusMsg.textContent = "Please enter a valid YouTube link or video ID.";
            ytStatusMsg.style.color = "#C62828";
          }
          return;
        }

        if (ytPlayer && typeof ytPlayer.loadVideoById === "function") {
          currentYtVideoId = extractedId;
          currentYtStartSeconds = startSeconds;
          ytPlayer.loadVideoById({
            videoId: extractedId,
            startSeconds: startSeconds
          });
          ytPlayer.playVideo();
          musicBtn.classList.add("playing");

          presetItems.forEach((p) => p.classList.remove("active"));

          if (ytStatusMsg) {
            ytStatusMsg.textContent = `Custom YouTube track loaded & playing! 🎶 (ID: ${extractedId}${startSeconds ? `, start: ${startSeconds}s` : ""})`;
            ytStatusMsg.style.color = "#2E7D32";
          }
        } else {
          if (ytStatusMsg) {
            ytStatusMsg.textContent = "YouTube player is loading, please try in a moment.";
          }
        }
      });
    }
  }
}

// ----------------------------------------------------------------------------
// 9. VENUE GOOGLE MAPS DIRECTION
// ----------------------------------------------------------------------------
function initVenueDirections() {
  const directionsBtn = document.getElementById("venue-directions-btn");
  if (directionsBtn) {
    directionsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.open(GOOGLE_MAPS_VENUE_URL, "_blank", "noopener,noreferrer");
    });
  }
}

// ----------------------------------------------------------------------------
// 10. ADD TO CALENDAR (GOOGLE CALENDAR & ICAL / ICS)
// ----------------------------------------------------------------------------
function initCalendarButtons() {
  const gcalBtn = document.getElementById("add-to-gcal-btn");
  const icalBtn = document.getElementById("download-ical-btn");

  if (gcalBtn) {
    gcalBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const title = encodeURIComponent("Wedding of Shirsh & Tanu (Mohit & Vaishali)");
      const details = encodeURIComponent(
        "Join us to celebrate the joyous Shubh Vivah ceremony of Shirsh Kumar Srivastav & Tanu Srivastav.\n\nVenue: Rudra Hotel, Near Town Degree College, Ballia, Uttar Pradesh"
      );
      const location = encodeURIComponent(VENUE_NAME);
      // Event: 07 Dec 2026, 18:00 to 08 Dec 2026 02:00 (IST is UTC+5:30)
      const dates = "20261207T123000Z/20261207T203000Z";
      const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
      window.open(gcalUrl, "_blank", "noopener,noreferrer");
    });
  }

  if (icalBtn) {
    icalBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const icsData = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Shirsh & Tanu Wedding//EN",
        "BEGIN:VEVENT",
        "SUMMARY:Wedding of Shirsh & Tanu (Mohit & Vaishali)",
        "DESCRIPTION:With joyous hearts, we invite you to celebrate the wedding ceremony of Shirsh Kumar Srivastav and Tanu Srivastav.",
        "LOCATION:Rudra Hotel, Near Town Degree College, Ballia, Uttar Pradesh",
        "DTSTART:20261207T123000Z",
        "DTEND:20261207T203000Z",
        "STATUS:CONFIRMED",
        "END:VEVENT",
        "END:VCALENDAR"
      ].join("\r\n");

      const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const tempLink = document.createElement("a");
      tempLink.href = url;
      tempLink.setAttribute("download", "Shirsh-Tanu-Wedding.ics");
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      URL.revokeObjectURL(url);
    });
  }
}

// ----------------------------------------------------------------------------
// 11. WHATSAPP INVITATION SHARING (WITH UPLOADED WEDDING INVITATION CARD)
// ----------------------------------------------------------------------------
function initWhatsAppSharing() {
  const shareBtn = document.getElementById("whatsapp-share-btn");
  const hintEl = document.getElementById("share-hint-tip");
  if (!shareBtn) return;

  shareBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const currentUrl = window.location.href;
    const invitationText = `🙏 Shree Ganeshaya Namah 🙏\n\nTogether with their families, you are cordially invited to celebrate the Shubh Vivah of\n\n✨ Shirsh & Tanu ✨\n(Mohit & Vaishali)\n\n🗓️ Date: Monday, 07 December 2026\n📍 Venue: Rudra Hotel, Near Town Degree College, Ballia, U.P.\n\nPlease view our wedding invitation here:\n${currentUrl}\n\nWith Love & Blessings,\nThe Srivastav Family ❤️`;

    // 1. Try sharing with the actual Wedding Invitation Card image via Web Share API (Android, iOS)
    if (navigator.share) {
      try {
        const cardUrl = new URL("./assets/aistudio/image_8088e365.png", window.location.href).href;
        const res = await fetch(cardUrl);
        const blob = await res.blob();
        const file = new File([blob], "Shirsh-Tanu-Wedding-Invitation-Card.png", { type: "image/png" });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: "Shirsh & Tanu | Royal Wedding Invitation",
            text: invitationText,
            files: [file],
          });
          return;
        }
      } catch (shareErr) {
        if (shareErr && shareErr.name === "AbortError") {
          return;
        }
        console.warn("Native file share fallback:", shareErr);
      }
    }

    // 2. Desktop / Fallback: Trigger download of card + open WhatsApp with link & OG preview
    if (hintEl) {
      hintEl.innerHTML = '<span>📥</span> Card download ho raha hai — WhatsApp par message ke sath attach kar sakte hain!';
    }
    const downloadLink = document.getElementById("download-card-btn");
    if (downloadLink) {
      downloadLink.click();
    }
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(invitationText)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  });
}

// ----------------------------------------------------------------------------
// 12. STICKY NAVBAR & MOBILE MENU TOGGLE
// ----------------------------------------------------------------------------
function initNavbar() {
  const navbar = document.querySelector(".royal-navbar");
  const toggleBtn = document.querySelector(".mobile-nav-toggle");
  const navLinks = document.querySelector(".navbar-links");

  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener("click", () => {
      toggleBtn.classList.toggle("open");
      navLinks.classList.toggle("open");
    });

    // Close menu when clicking any nav link
    const links = navLinks.querySelectorAll("a");
    links.forEach((link) => {
      link.addEventListener("click", () => {
        toggleBtn.classList.remove("open");
        navLinks.classList.remove("open");
      });
    });
  }
}

// ----------------------------------------------------------------------------
// 13. BACK TO TOP BUTTON
// ----------------------------------------------------------------------------
function initBackToTop() {
  const backBtn = document.getElementById("back-to-top-btn");
  if (!backBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backBtn.classList.add("visible");
    } else {
      backBtn.classList.remove("visible");
    }
  });

  backBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ----------------------------------------------------------------------------
// 14. ADVANCED 3D TILT EFFECT ON HERO PORTRAIT
// ----------------------------------------------------------------------------
function initHero3DTilt() {
  const wrapper = document.getElementById("hero-portrait-wrapper");
  const frame = document.getElementById("hero-portrait-frame");
  if (!wrapper || !frame) return;

  function handleMove(e) {
    const rect = wrapper.getBoundingClientRect();
    const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : null);
    const clientY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0] ? e.touches[0].clientY : null);
    if (clientX === null || clientY === null) return;

    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -9;
    const rotateY = ((x - centerX) / centerX) * 11;

    frame.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.025, 1.025, 1.025)`;
  }

  function handleLeave() {
    frame.style.transform = "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  }

  wrapper.addEventListener("mousemove", handleMove);
  wrapper.addEventListener("mouseleave", handleLeave);
  wrapper.addEventListener("touchmove", handleMove, { passive: true });
  wrapper.addEventListener("touchend", handleLeave, { passive: true });
}

// ----------------------------------------------------------------------------
// 15. INTERACTIVE HERO SHAPE SWITCHER
// ----------------------------------------------------------------------------
function initHeroShapeSwitcher() {
  const frame = document.getElementById("hero-portrait-frame");
  const pills = document.querySelectorAll(".hero-shape-pill");
  if (!frame || !pills.length) return;

  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      const shape = pill.getAttribute("data-hero-shape");
      pills.forEach((p) => {
        p.classList.remove("active");
        p.setAttribute("aria-selected", "false");
      });
      pill.classList.add("active");
      pill.setAttribute("aria-selected", "true");

      frame.classList.remove("shape-arch", "shape-oval", "shape-jharokha");
      if (shape === "oval") {
        frame.classList.add("shape-oval");
      } else if (shape === "jharokha") {
        frame.classList.add("shape-jharokha");
      }
    });
  });
}

// ----------------------------------------------------------------------------
// 16. INTERACTIVE GALLERY SHAPE SWITCHER
// ----------------------------------------------------------------------------
function initGalleryShapeSwitcher() {
  const grid = document.getElementById("gallery-grid");
  const shapeBtns = document.querySelectorAll(".gallery-shape-btn");
  if (!grid || !shapeBtns.length) return;

  shapeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const shape = btn.getAttribute("data-shape");
      shapeBtns.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      grid.classList.remove("shape-arch", "shape-cameo", "shape-scallop", "shape-luxe");
      grid.classList.add(`shape-${shape}`);
    });
  });
}

// ----------------------------------------------------------------------------
// 17. INTERACTIVE COUPLE QUIZ, GUEST REPLIES & REAL-TIME HEART LIKES
// ----------------------------------------------------------------------------
function initCoupleQuiz() {
  const modal = document.getElementById("quiz-modal");
  const closeBtn = document.getElementById("quiz-modal-close");
  const openBtns = [
    document.getElementById("hero-open-quiz-btn"),
    document.getElementById("section-open-quiz-btn"),
    document.getElementById("quiz-float-btn"),
  ].filter(Boolean);

  const stageActive = document.getElementById("quiz-stage-active");
  const stageResult = document.getElementById("quiz-stage-result");
  const progressLabel = document.getElementById("quiz-progress-label");
  const scorePill = document.getElementById("quiz-score-pill");
  const progressFill = document.getElementById("quiz-progress-fill");
  const questionText = document.getElementById("quiz-question-text");
  const optionsList = document.getElementById("quiz-options-list");
  const answerReplyBox = document.getElementById("quiz-answer-reply");
  const nextBtn = document.getElementById("quiz-next-btn");

  const finalScoreEl = document.getElementById("quiz-final-score");
  const finalTitleEl = document.getElementById("quiz-final-title");
  const finalDescEl = document.getElementById("quiz-final-desc");
  const replyForm = document.getElementById("quiz-reply-form");
  const replySubmitBtn = document.getElementById("quiz-reply-submit-btn");
  const replyToast = document.getElementById("quiz-reply-toast");
  const retakeBtn = document.getElementById("quiz-retake-btn");
  const repliesWallEl = document.getElementById("quiz-replies-wall");

  let currentIdx = 0;
  let score = 0;
  let answeredCurrent = false;
  let lastScoreBadge = "5/5 • Royal VIP";
  let liveQuizReplies = [];

  const QUIZ_LIKED_KEY = "st_liked_quiz_replies_v1";
  const DEFAULT_QUIZ_LIKES_KEY = "st_default_quiz_likes_v1";

  function renderQuestion() {
    const q = COUPLE_QUIZ_QUESTIONS[currentIdx];
    if (!q || !questionText || !optionsList) return;

    answeredCurrent = false;
    if (progressLabel) progressLabel.textContent = `Question ${currentIdx + 1} of ${COUPLE_QUIZ_QUESTIONS.length}`;
    if (scorePill) scorePill.textContent = `Score: ${score}`;
    if (progressFill) progressFill.style.width = `${((currentIdx + 1) / COUPLE_QUIZ_QUESTIONS.length) * 100}%`;
    questionText.textContent = q.question;

    if (answerReplyBox) {
      answerReplyBox.style.display = "none";
      answerReplyBox.textContent = "";
    }
    if (nextBtn) {
      nextBtn.style.display = "none";
      nextBtn.textContent = currentIdx === COUPLE_QUIZ_QUESTIONS.length - 1 ? "See Result & Reply →" : "Next Question →";
    }

    optionsList.innerHTML = "";
    q.options.forEach((optText, optIndex) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "quiz-option-btn";
      btn.innerHTML = `<span>${escapeHtmlSafe(optText)}</span><span></span>`;

      btn.addEventListener("click", () => {
        if (answeredCurrent) return;
        answeredCurrent = true;

        const isCorrect = q.correctIndex === -1 || optIndex === q.correctIndex;
        if (isCorrect) score += 1;

        const allBtns = optionsList.querySelectorAll(".quiz-option-btn");
        allBtns.forEach((b, i) => {
          b.disabled = true;
          if (q.correctIndex === -1) {
            if (i === optIndex) {
              b.classList.add("correct");
              if (b.lastElementChild) b.lastElementChild.textContent = "💖";
            }
          } else if (i === q.correctIndex) {
            b.classList.add("correct");
            if (b.lastElementChild) b.lastElementChild.textContent = "✓";
          } else if (i === optIndex && !isCorrect) {
            b.classList.add("wrong");
            if (b.lastElementChild) b.lastElementChild.textContent = "✕";
          }
        });

        if (scorePill) scorePill.textContent = `Score: ${score}`;
        if (answerReplyBox) {
          answerReplyBox.textContent = isCorrect ? q.replyCorrect : q.replyWrong;
          answerReplyBox.style.display = "block";
        }
        if (nextBtn) nextBtn.style.display = "inline-flex";
      });

      optionsList.appendChild(btn);
    });
  }

  function showQuizResult() {
    if (stageActive) stageActive.style.display = "none";
    if (stageResult) stageResult.style.display = "block";

    const total = COUPLE_QUIZ_QUESTIONS.length;
    let title = "Royal Family VIP! 👑";
    let desc = "Waah! Aap Shirsh & Tanu ko dil se jaante hain! Ab apna pyara reply likhein.";
    let badgeTag = "Royal VIP";

    if (score <= 2) {
      title = "Sweet Wedding Guest! 🌸";
      desc = "Shaadi me aakar aapko aur maza aayega! Couple ke liye apna cute reply zaroor likhein.";
      badgeTag = "Sweet Guest";
    } else if (score <= 4) {
      title = "Dil Se Kareebi Dost! 💖";
      desc = "Bahut badhiya! Mohit & Vaishali ke celebration me aapki presence zaroori hai!";
      badgeTag = "Dil Se Dost";
    }

    lastScoreBadge = `${score}/${total} • ${badgeTag}`;
    if (finalScoreEl) finalScoreEl.textContent = `${score} / ${total}`;
    if (finalTitleEl) finalTitleEl.textContent = title;
    if (finalDescEl) finalDescEl.textContent = desc;

    if (triggerCelebrationBurst) {
      triggerCelebrationBurst();
    }
  }

  function resetQuiz() {
    currentIdx = 0;
    score = 0;
    if (stageResult) stageResult.style.display = "none";
    if (stageActive) stageActive.style.display = "block";
    if (replyToast) replyToast.style.display = "none";
    renderQuestion();
  }

  window.openCoupleQuizModal = function () {
    if (!modal) return;
    resetQuiz();
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  function closeQuizModal() {
    if (!modal) return;
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  openBtns.forEach((btn) => {
    btn.addEventListener("click", window.openCoupleQuizModal);
  });

  if (closeBtn) closeBtn.addEventListener("click", closeQuizModal);
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeQuizModal();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (currentIdx < COUPLE_QUIZ_QUESTIONS.length - 1) {
        currentIdx += 1;
        renderQuestion();
      } else {
        showQuizResult();
      }
    });
  }

  if (retakeBtn) {
    retakeBtn.addEventListener("click", resetQuiz);
  }

  // Render Live Quiz Replies & Likes Wall
  function renderQuizReplies() {
    if (!repliesWallEl) return;
    const likedSet = getLikedSet(QUIZ_LIKED_KEY);
    const defaultLikeMap = getLocalLikeMap(DEFAULT_QUIZ_LIKES_KEY);
    const combined = [...liveQuizReplies, ...DEFAULT_QUIZ_REPLIES];
    repliesWallEl.innerHTML = "";

    combined.forEach((item) => {
      const card = document.createElement("article");
      card.className = "quiz-reply-card";

      const isDefault = String(item.id || "").startsWith("default-");
      const likeCount = isDefault
        ? (typeof defaultLikeMap[item.id] === "number" ? defaultLikeMap[item.id] : item.likes || 0)
        : (typeof item.likes === "number" ? item.likes : 0);
      const isLiked = item.id ? likedSet.has(item.id) : false;
      const initial = item.avatar || (item.name ? item.name.trim().charAt(0).toUpperCase() : "💘");

      card.innerHTML = `
        <div>
          <div class="wish-card-header">
            <div class="wish-sender-info">
              <div class="wish-avatar">${escapeHtmlSafe(initial)}</div>
              <div>
                <h4 class="wish-author-name">${escapeHtmlSafe(item.name)}</h4>
                <span class="quiz-score-tag">${escapeHtmlSafe(item.scoreText || "Quiz Player")}</span>
              </div>
            </div>
            <span class="wish-quote-symbol" aria-hidden="true">💘</span>
          </div>
          <p class="wish-body-text">${escapeHtmlSafe(item.reply)}</p>
        </div>
        <div class="wish-card-footer">
          <button
            type="button"
            class="like-btn${isLiked ? " liked" : ""}"
            aria-label="Like this quiz reply"
          >
            <span>${isLiked ? "❤️" : "🤍"}</span>
            <span>Like</span>
            <span class="like-count">${likeCount}</span>
          </button>
          <span class="wish-time">${escapeHtmlSafe(item.time || "Quiz Reply")}</span>
        </div>
      `;

      const likeBtn = card.querySelector(".like-btn");
      if (likeBtn && item.id) {
        likeBtn.addEventListener("click", async () => {
          if (likedSet.has(item.id)) return;
          likedSet.add(item.id);
          saveLikedId(QUIZ_LIKED_KEY, item.id);

          const countEl = likeBtn.querySelector(".like-count");
          const current = parseInt((countEl && countEl.textContent) || "0", 10) || 0;
          const next = current + 1;

          likeBtn.classList.add("liked", "like-pop");
          if (likeBtn.firstElementChild) likeBtn.firstElementChild.textContent = "❤️";
          if (countEl) countEl.textContent = String(next);

          if (isDefault) {
            saveLocalLikeCount(DEFAULT_QUIZ_LIKES_KEY, item.id, next);
          } else {
            try {
              const backend = await getWishesBackend();
              await backend.likeQuizReplyInFirebase(item.id);
            } catch (err) {
              console.warn("Unable to sync quiz like:", err);
            }
          }
        });
      }

      repliesWallEl.appendChild(card);
    });
  }

  renderQuizReplies();

  // Subscribe to real-time Quiz Replies
  getWishesBackend()
    .then((backend) => {
      if (typeof backend.subscribeToQuizReplies === "function") {
        backend.subscribeToQuizReplies(
          (replies) => {
            liveQuizReplies = replies;
            renderQuizReplies();
          },
          (err) => {
            console.warn("Unable to sync quiz replies:", err);
          }
        );
      }
    })
    .catch((err) => {
      console.warn("Quiz replies backend unavailable:", err);
    });

  // Handle Quiz Reply Submit
  if (replyForm) {
    replyForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const nameEl = document.getElementById("quiz-reply-name");
      const textEl = document.getElementById("quiz-reply-text");
      const name = nameEl ? nameEl.value.trim() : "";
      const reply = textEl ? textEl.value.trim() : "";
      if (!name || !reply) return;

      const origHtml = replySubmitBtn ? replySubmitBtn.innerHTML : "";
      if (replySubmitBtn) {
        replySubmitBtn.disabled = true;
        replySubmitBtn.innerHTML = "<span>💘</span> Posting Reply...";
      }

      try {
        const backend = await getWishesBackend();
        await backend.submitQuizReplyToFirebase({
          name,
          scoreText: lastScoreBadge,
          reply,
        });
        if (triggerCelebrationBurst) triggerCelebrationBurst();
        if (replyToast) replyToast.style.display = "block";
        replyForm.reset();

        setTimeout(() => {
          closeQuizModal();
          const quizSection = document.getElementById("quiz");
          if (quizSection) quizSection.scrollIntoView({ behavior: "smooth" });
        }, 1400);
      } catch (err) {
        console.warn("Could not post quiz reply:", err);
      } finally {
        if (replySubmitBtn) {
          replySubmitBtn.disabled = false;
          replySubmitBtn.innerHTML = origHtml;
        }
      }
    });
  }
}

// ----------------------------------------------------------------------------
// INITIALIZE EVERYTHING ON DOM READY
// ----------------------------------------------------------------------------
onDomReady(() => {
  initCountdown();
  initPetalsCanvas();
  initScrollReveal();
  initGalleryFilters();
  initGalleryShapeSwitcher();
  initLightbox();
  initWishesWall();
  initCoupleQuiz();
  initMusicPlayer();
  initVenueDirections();
  initCalendarButtons();
  initWhatsAppSharing();
  initNavbar();
  initBackToTop();
  initHero3DTilt();
  initHeroShapeSwitcher();

  if (window.__pendingAudioStart) {
    handleUserInteractionAndPlay();
  }
});
