// Initialize thumbnails swiper
const thumbsSwiper = new Swiper(".myThumbs", {
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
  breakpoints: { 320: { slidesPerView: 3 }, 480: { slidesPerView: 4 } }
});

// Initialize main swiper
const swiper = new Swiper(".mySwiper", {
  effect: "fade",
  loop: true,
  autoplay: { delay: 10000, disableOnInteraction: false },
  pagination: { el: ".swiper-pagination", clickable: true },
  navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
  thumbs: { swiper: thumbsSwiper },
  on: {
    autoplayTimeLeft(s, time, progress) {
      const fill = document.querySelector(".progress-fill");
      if (fill) fill.style.width = `${(1 - progress) * 100}%`;
    },
    slideChangeTransitionStart() {
      const fill = document.querySelector(".progress-fill");
      if (fill) fill.style.width = "0%";
      // reset captions
      document.querySelectorAll(".caption").forEach(c => { c.style.opacity = 0; c.style.transform = "translateY(18px)"; c.style.animation = "none"; });
      // pause other videos
      document.querySelectorAll(".slide-video").forEach(v => { try { v.pause(); } catch(_){} });
    },
    slideChangeTransitionEnd() {
      const activeCaption = document.querySelector(".swiper-slide-active .caption");
      if (activeCaption) activeCaption.style.animation = "fadeInUp 1.1s ease forwards";
      // autoplay active slide's video element (looped muted playback)
      const activeVideo = document.querySelector(".swiper-slide-active .slide-video");
      if (activeVideo) { activeVideo.currentTime = 0; activeVideo.play().catch(()=>{}); }
    }
  }
});

// Ensure first active slide video plays
document.addEventListener("DOMContentLoaded", () => {
  const v = document.querySelector(".swiper-slide-active .slide-video");
  if (v) v.play().catch(()=>{});
});

// Play/pause toggle for autoplay
const toggleBtn = document.getElementById("toggleAutoplay");
let isPlaying = true;
toggleBtn.addEventListener("click", () => {
  const fill = document.querySelector(".progress-fill");
  if (isPlaying) {
    swiper.autoplay.stop();
    toggleBtn.textContent = "▶ Play";
    if (fill) fill.style.transition = "none";
  } else {
    swiper.autoplay.start();
    toggleBtn.textContent = "⏸ Pause";
    if (fill) fill.style.transition = "width linear";
  }
  isPlaying = !isPlaying;
});

// Parallax on scroll for gradient and caption
window.addEventListener("scroll", () => {
  document.querySelectorAll(".video-container").forEach(container => {
    const rect = container.getBoundingClientRect();
    const offset = rect.top / window.innerHeight; // approx -1..1
    const shift = (offset * 18).toFixed(2);
    container.style.setProperty("--overlay-shift", `${shift}px`);
    if (container.closest(".swiper-slide").classList.contains("swiper-slide-active")) {
      const cap = container.querySelector(".caption");
      if (cap) cap.style.transform = `translateY(${Math.max(0, 18 - offset * 22)}px)`;
    }
  });
});

// Lightbox (opens unmuted)
const lightbox = document.getElementById("lightbox");
const lightboxVideo = document.getElementById("lightbox-video");
const closeBtn = document.querySelector(".lightbox .close");

document.querySelectorAll(".mySwiper .slide-video").forEach(video => {
  video.addEventListener("click", (e) => {
    e.preventDefault();
    // Use the same src, but unmuted and with controls
    const src = video.querySelector('source') ? video.querySelector('source').src : video.currentSrc;
    if (!src) return;
    lightboxVideo.src = src;
    lightboxVideo.muted = false;
    lightbox.style.display = "flex";
    lightboxVideo.play().catch(()=>{});
    // pause main autoplay
    if (isPlaying) { swiper.autoplay.stop(); toggleBtn.textContent = "▶ Play"; isPlaying = false; }
  });
});

function closeLightbox() {
  lightbox.style.display = "none";
  lightboxVideo.pause();
  lightboxVideo.src = "";
}
closeBtn.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });

// Keyboard controls: ESC closes lightbox, arrows navigate, Space toggles autoplay
document.addEventListener("keydown", (e) => {
  const lightOpen = lightbox.style.display === "flex";
  if (e.key === "Escape" && lightOpen) closeLightbox();
  else if (e.key === "ArrowRight" && !lightOpen) swiper.slideNext();
  else if (e.key === "ArrowLeft" && !lightOpen) swiper.slidePrev();
  else if ((e.key === " " || e.code === "Space") && !lightOpen) { e.preventDefault(); toggleBtn.click(); }
});
