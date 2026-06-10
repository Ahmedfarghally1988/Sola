/////////// font icon /////////////
lucide.createIcons();

/////////// photo lightbox //////////////
document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");

  const swiper = new Swiper(".mySwiper", {
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // open images
  document.querySelectorAll(".gallery-open").forEach((img) => {
    img.addEventListener("click", () => {
      const index = parseInt(img.dataset.index);

      lightbox.classList.remove("hidden");
      lightbox.classList.add("flex");

      swiper.slideToLoop(index, 0);
    });
  });

  // ❌ غلق البوب اب عند الضغط خارج الصورة فقط
  lightbox.addEventListener("click", () => {
    lightbox.classList.add("hidden");
    lightbox.classList.remove("flex");
  });

  // ✅ مهم جدًا: امنع الإغلاق من داخل المحتوى
  document.querySelector(".mySwiper").addEventListener("click", (e) => {
    e.stopPropagation();
  });

  document
    .querySelector(".swiper-button-next")
    .addEventListener("click", (e) => {
      e.stopPropagation();
    });

  document
    .querySelector(".swiper-button-prev")
    .addEventListener("click", (e) => {
      e.stopPropagation();
    });
});


/////////// photo lightbox Crusie  //////////////
document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightboxCrusie");
  const closeBtn = document.getElementById("closeLightboxCrusie");
  const images = Array.from(document.querySelectorAll(".gallery-img-crusie"));

  let lightboxSwiperCrusie; 


  // =========================
  function buildSlides() {
    const wrapper = document.querySelector(
      ".lightboxSwiperCrusie .swiper-wrapper",
    );
    wrapper.innerHTML = "";

    images.forEach((img) => {
      wrapper.innerHTML += `
        <div class="swiper-slide">
          <img src="${img.src}" class="w-full max-h-[80vh] object-contain">
        </div>
      `;
    });
  }

  function initSwiper() {
    lightboxSwiperCrusie = new Swiper(".lightboxSwiperCrusie", {
      loop: true,
      navigation: {
        nextEl: "#nextBtnCrusie",
        prevEl: "#prevBtnCrusie",
      },
    });
  }


  function openLightbox(index) {
    buildSlides();

    lightbox.classList.remove("hidden");
    lightbox.classList.add("flex");

    // أول مرة init
    if (!lightboxSwiperCrusie) {
      initSwiper();
    } else {
      lightboxSwiperCrusie.update();
    }

    setTimeout(() => {
      lightboxSwiperCrusie.update();
      lightboxSwiperCrusie.slideToLoop(index, 0);
    }, 50);
  }


  images.forEach((img, index) => {
    img.addEventListener("click", () => {
      openLightbox(index);
    });
  });


  function closeLightbox() {
    lightbox.classList.add("hidden");
    lightbox.classList.remove("flex");
  }

  closeBtn.addEventListener("click", closeLightbox);

  // إغلاق عند الضغط خارج السلايدر (اختياري)
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
});

/////////// menu mobile /////////////
document.addEventListener("DOMContentLoaded", () => {
  // ===== العناصر الأساسية =====
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const openBtn = document.getElementById("openBtn");
  const closeBtn = document.getElementById("closeBtn");

  // ===== Services submenu =====
  const serviceToggle = document.getElementById("serviceToggle");
  const servicePanel = document.getElementById("servicePanel");
  const backBtn = document.getElementById("backBtn");
  const serviceIcon = document.getElementById("serviceIcon");

  // ===== فتح المينيو الرئيسي =====
  function openMenu() {
    sidebar.classList.remove("translate-x-full");
    overlay.classList.remove("hidden");

    setTimeout(() => {
      overlay.classList.remove("opacity-0");
    }, 10);
  }

  // ===== قفل المينيو الرئيسي =====
  function closeMenu() {
    sidebar.classList.add("translate-x-full");
    overlay.classList.add("opacity-0");

    setTimeout(() => {
      overlay.classList.add("hidden");
    }, 200);

    // مهم: قفل submenu لو مفتوح
    closeService();
  }

  // ===== فتح submenu (Services) =====
  function openService() {
    servicePanel.classList.remove("translate-x-full");

    serviceIcon.setAttribute("data-lucide", "chevron-down");
    lucide.createIcons();
  }

  // ===== قفل submenu =====
  function closeService() {
    if (!servicePanel) return;

    servicePanel.classList.add("translate-x-full");

    serviceIcon.setAttribute("data-lucide", "chevron-right");
    lucide.createIcons();
  }

  // ===== Events =====
  openBtn?.addEventListener("click", openMenu);
  closeBtn?.addEventListener("click", closeMenu);
  overlay?.addEventListener("click", closeMenu);

  serviceToggle?.addEventListener("click", openService);
  backBtn?.addEventListener("click", closeService);
});

/////////// Swiper hero /////////////
const swiper = new Swiper(".mySwiper", {
  loop: true,
  speed: 1000, // 👈 أهم حاجة
  autoplay: {
    delay: 6000,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  effect: "slide",
  grabCursor: true,
});

/////////// Swiper testimonial /////////////
const testimonialSwiper = new Swiper(".testimonialSwiper", {
  loop: true,
  spaceBetween: 20,
  slidesPerView: 1,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  breakpoints: {
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 4 },
  },
});

///////////// popup image //////////
function openImage(src) {
  const modal = document.getElementById("imageModal");
  const img = document.getElementById("modalImage");

  img.src = src;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeImage() {
  const modal = document.getElementById("imageModal");

  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

function closeImageOnOutside(e) {
  if (e.target.id === "imageModal") {
    closeImage();
  }
}

///////////// popup video //////////

function closeOnOutside(e) {
  closeVideo();
}

function openVideo(id) {
  const modal = document.getElementById("videoModal");
  const frame = document.getElementById("videoFrame");

  frame.src = `https://www.youtube.com/embed/${id}?autoplay=1`;
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeVideo() {
  const modal = document.getElementById("videoModal");
  const frame = document.getElementById("videoFrame");

  frame.src = "";
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

///////////////// read more /////////////////
document.querySelectorAll(".toggleBtn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const desc = btn.previousElementSibling;
    const clamp = desc.dataset.clamp;

    if (btn.dataset.expanded === "true") {
      desc.classList.add(`line-clamp-${clamp}`);
      btn.innerText = "Read More";
      btn.dataset.expanded = "false";
    } else {
      desc.classList.remove(`line-clamp-${clamp}`);
      btn.innerText = "Read Less";
      btn.dataset.expanded = "true";
    }
  });
});

///////////// tooltip ////////////
document.addEventListener("DOMContentLoaded", () => {
  const tooltip = document.getElementById("tooltip");

  document.querySelectorAll(".infoBtn").forEach((btn) => {
    btn.addEventListener("mouseenter", (e) => {
      tooltip.classList.remove("hidden");

      // خُد النص من نفس الكارد
      tooltip.innerText = btn.getAttribute("data-tooltip");
    });

    btn.addEventListener("mousemove", (e) => {
      positionTooltip(e);
    });

    btn.addEventListener("mouseleave", () => {
      tooltip.classList.add("hidden");
    });
  });

  function positionTooltip(e) {
    const padding = 15;

    let x = e.clientX + padding;
    let y = e.clientY + padding;

    const rect = tooltip.getBoundingClientRect();

    // يمنع الخروج يمين
    if (x + rect.width > window.innerWidth) {
      x = e.clientX - rect.width - padding;
    }

    // يمنع الخروج تحت
    if (y + rect.height > window.innerHeight) {
      y = e.clientY - rect.height - padding;
    }

    tooltip.style.left = x + "px";
    tooltip.style.top = y + "px";
  }
});

///////////// accordion ////////////
document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".accordion-header").forEach((header) => {
    header.addEventListener("click", () => {

      const currentContent = header.nextElementSibling;
      const currentIcon = header.querySelector("svg");

      // فتح / قفل العنصر الحالي فقط
      currentContent.classList.toggle("hidden");
      currentIcon.classList.toggle("rotate-180");

    });
  });

});
