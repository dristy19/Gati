// ========== Utility: Load External HTML Sections ==========
function loadSection(id, filePath, callback) {
  fetch(filePath)
    .then((res) => res.text())
    .then((data) => {
      const section = document.getElementById(id);
      if (section) {
        section.innerHTML = data;
        if (typeof callback === "function") callback(section);
      }
    })
    .catch((err) => console.error(`Failed to load ${id}:`, err));
}

// ========== SECTION LOADS ==========

// HEADER
loadSection("header", "../Components/header.html", () => {
  // Hamburger toggle
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => navLinks.classList.toggle("active"));
  }

  // Contact modal
  const contactBtn = document.querySelector(".contact-btn");
  const popupOverlay = document.getElementById("popupOverlay");
  const popupCloseBtn = document.getElementById("popupCloseBtn");
  if (contactBtn && popupOverlay && popupCloseBtn) {
    contactBtn.addEventListener("click", () => (popupOverlay.style.display = "flex"));
    popupCloseBtn.addEventListener("click", () => (popupOverlay.style.display = "none"));
    window.addEventListener("click", (e) => { if (e.target === popupOverlay) popupOverlay.style.display = "none"; });
  }

  // Active nav highlight
  const currentPath = window.location.pathname.split("/").pop();
  const navLinksList = document.querySelectorAll(".nav-links li a");
  navLinksList.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href").split("/").pop() === currentPath);
  });
});

// HERO
loadSection("hero", "../Components/hero.html");

// SERVICE SELECTION with tabs
loadSection("service_selection", "../Components/service_selection.html", initQuoteTabs);
function initQuoteTabs() {
  const tabs = document.querySelectorAll(".tabs .tab");
  const forms = document.querySelectorAll(".form-content");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      forms.forEach((f) => (f.style.display = "none"));
      tab.classList.add("active");
      const target = tab.getAttribute("data-target");
      const formToShow = document.getElementById(`form-${target}`);
      if (formToShow) formToShow.style.display = "block";
    });
  });
}

// VIDEO CAROUSEL
loadSection("video_carousel", "../Components/video_carousel.html");

// MAP
loadSection("map", "../Components/map.html");

// CONTACT carousel
loadSection("contact", "../Components/contact.html", () => {
  const images = [
    "images/packing-moving1.jpg",
    "images/packing-moving2.jpg",
    "images/packing-moving3.jpg",
    "images/packing-moving4.jpg",
  ];
  let index = 0;
  const carouselImg = document.getElementById("carousel-img");
  if (carouselImg) setInterval(() => { index = (index + 1) % images.length; carouselImg.src = images[index]; }, 4000);
});

// ACHIEVEMENTS carousel
loadSection("achievements", "../Components/achievements.html", () => {
  const carousel = document.getElementById("achievementCarousel");
  if (!carousel) return;
  const items = carousel.querySelectorAll(".carousel-item");
  let currentIndex = 0;
  const totalItems = items.length;
  const moveCarousel = (dir) => { currentIndex = (currentIndex + dir + totalItems) % totalItems; carousel.style.transform = `translateX(-${currentIndex * 100}%)`; };
  setInterval(() => moveCarousel(1), 4000);
});

// TRUST, ABOUT US, REVIEWS
loadSection("trust", "../Components/trust.html");
loadSection("about_us", "../Components/about_us.html");
loadSection("reviews", "../Components/reviews.html");

// FAQ
loadSection("faq", "../Components/faq.html", () => {
  // Toggle answers
  document.querySelectorAll(".faq-question").forEach((btn) => {
    btn.addEventListener("click", () => {
      const answer = btn.nextElementSibling;
      const icon = btn.querySelector(".faq-icon");
      const isOpen = answer.style.display === "block";
      document.querySelectorAll(".faq-answer").forEach(a => a.style.display = "none");
      document.querySelectorAll(".faq-icon").forEach(i => { i.classList.remove("fa-minus"); i.classList.add("fa-plus"); });
      if (!isOpen) { answer.style.display = "block"; icon.classList.replace("fa-plus","fa-minus"); }
    });
  });

  // Show More
  const showMoreBtn = document.getElementById("show-more-btn");
  const contactUsBtn = document.getElementById("contact-us-btn");
  const extraFaqs = document.querySelectorAll(".extra-faq");
  if (showMoreBtn) {
    showMoreBtn.addEventListener("click", () => {
      extraFaqs.forEach(f => f.classList.remove("hidden"));
      showMoreBtn.classList.add("hidden");
      contactUsBtn?.classList.remove("hidden");
    });
  }
});

// LOCATIONS, FOOTER, STEPS, CONTACT BAR
loadSection("locations", "../Components/locations.html");
loadSection("footer", "../Components/footer.html");
loadSection("steps_for_quote", "../Components/steps_for_quote.html");
loadSection("contact_bar", "../Components/floating-contact-bar.html");

// BRANDS
loadSection("brands", "../Components/brands.html");

// ========== UTILITY SETUPS ==========

function setupReviewStars() {
  const stars = document.querySelectorAll(".star-rating i");
  const ratingInput = document.getElementById("reviewRating");
  stars.forEach((star) => {
    star.addEventListener("click", () => {
      const value = parseInt(star.getAttribute("data-value"));
      ratingInput.value = value;
      stars.forEach((s) => s.classList.toggle("selected", parseInt(s.getAttribute("data-value")) <= value));
    });
  });
}

function setupPhotoGallery() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const photoCards = document.querySelectorAll(".photo-card");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");
      photoCards.forEach((card) => { card.style.display = filter === "all" || card.getAttribute("data-category") === filter ? "block" : "none"; });
    });
  });
}

function setupServiceTabs() {
  const serviceTitles = {
    house: "House Shifting", ac: "AC Shifting", bike: "Bike Transport", car: "Car Transport",
    pet: "Pet Relocation", office: "Office Shifting", commercial: "Commercial Shifting",
    luggage: "Luggage Transport", domestic: "Domestic Moving", international: "International Moving",
    tempo: "Tempo for Shifting", warehouse: 'Warehouse Services', storage: 'Storage Facility', coldstorage: 'Cold Storage'
  };
  const defaultService = "house";
  const titleEl = document.getElementById("serviceTitle");
  const listItems = document.querySelectorAll("#serviceList li");
  document.querySelector(`#serviceList li[data-target="${defaultService}"]`)?.classList.add("active");
  document.getElementById(defaultService)?.classList.add("active");
  if (titleEl) titleEl.textContent = serviceTitles[defaultService];

  listItems.forEach((item) => {
    item.addEventListener("click", function () {
      listItems.forEach((li) => li.classList.remove("active"));
      this.classList.add("active");
      const target = this.getAttribute("data-target");
      document.querySelectorAll(".desc").forEach((desc) => desc.classList.remove("active"));
      document.getElementById(target)?.classList.add("active");
      if (titleEl) titleEl.textContent = serviceTitles[target];
    });
  });
}

function setupIssueForm() {
  const issueForm = document.getElementById("issueForm");
  if (!issueForm) return;
  issueForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const phone = e.target.phone.value.trim();
    const booking = e.target.booking.value.trim();
    const category = e.target.category.value;
    const message = e.target.message.value.trim();
    const whatsappNumber = "+917290008200";
    const fullMessage = `🚨 New Issue Reported!\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n📦 Booking ID: ${booking || "N/A"}\n📋 Category: ${category}\n📝 Message: ${message}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(fullMessage)}`, "_blank");
  });
}

// Pickup Form Submission (single handler)
function setupPickupForm() {
  const form = document.getElementById('pickupForm');
  if (!form) return;
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    try {
      const response = await fetch('https://gatishiftingpackers.com/save_form.php', { method: 'POST', body: formData });
      const text = await response.text();
      if (text.includes("success")) { alert("✅ Thank you! We’ll reach out soon."); form.reset(); }
      else alert("⚠️ Error: " + text);
    } catch (err) {
      console.error(err); alert("❌ Submission failed. Please try again later.");
    }
  });
}

// ========== Scroll Animation & Active Sidebar Highlight ==========
const sections = document.querySelectorAll('.mg-section');
const showOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;
  sections.forEach(section => {
    if (section.getBoundingClientRect().top < triggerBottom) section.classList.add('visible');
  });
};
window.addEventListener('scroll', showOnScroll);
window.addEventListener('load', showOnScroll);

const navLinksSidebar = document.querySelectorAll('nav.sidebar a');
const activateCurrentTab = () => {
  let current = "";
  sections.forEach(section => { if (scrollY >= section.offsetTop - 120) current = section.getAttribute("id"); });
  navLinksSidebar.forEach(link => { link.classList.toggle("active", link.getAttribute("href") === "#" + current); });
};
window.addEventListener("scroll", activateCurrentTab);
navLinksSidebar.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.getElementById(link.getAttribute("href").slice(1));
    window.scrollTo({ top: target.offsetTop - 80, behavior: "smooth" });
  });
});

// ========== Initialize Everything ==========
document.addEventListener("DOMContentLoaded", () => {
  setupReviewStars();
  setupPhotoGallery();
  setupServiceTabs();
  setupIssueForm();
  loadSection("get_in_touch", "../Comp  onents/get_in_touch.html", () => {
  setupPickupForm();
});
});
