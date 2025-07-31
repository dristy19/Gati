// ✅ Load HEADER with nav toggle logic and popup modal
loadSection("header", "../Components/header.html", () => {
  // 🔹 Hamburger menu toggle for mobile nav
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // 🔹 Contact popup modal logic
  const contactBtn = document.querySelector(".contact-btn");
  const popupOverlay = document.getElementById("popupOverlay");
  const popupCloseBtn = document.getElementById("popupCloseBtn");

  if (contactBtn && popupOverlay && popupCloseBtn) {
    contactBtn.addEventListener("click", () => {
      popupOverlay.style.display = "flex";
    });

    popupCloseBtn.addEventListener("click", () => {
      popupOverlay.style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if (e.target === popupOverlay) {
        popupOverlay.style.display = "none";
      }
    });
  }

  // 🔹 Active Tab Highlight Logic
  const currentPath = window.location.pathname.split("/").pop(); // e.g., about_page.html
  const navLinksList = document.querySelectorAll(".nav-links li a");

  navLinksList.forEach((link) => {
    const linkPath = link.getAttribute("href").split("/").pop();
    if (linkPath === currentPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});

// ✅ Load HERO section
loadSection("hero", "../Components/hero.html");

// ===== Load SERVICE SELECTION section with tab-switch logic
loadSection("service_selection", "../Components/service_selection.html", () => {
  initQuoteTabs();
});
function initQuoteTabs() {
  const tabs = document.querySelectorAll(".tabs .tab");
  const forms = document.querySelectorAll(".form-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove "active" from all tabs
      tabs.forEach((t) => t.classList.remove("active"));
      // Hide all forms
      forms.forEach((f) => (f.style.display = "none"));

      // Add "active" to clicked tab
      tab.classList.add("active");

      // Show corresponding form
      const target = tab.getAttribute("data-target");
      const formToShow = document.getElementById(`form-${target}`);
      if (formToShow) {
        formToShow.style.display = "block";
      }
    });
  });
}
// ===== Load VIDEO CAROUSEL
loadSection("video_carousel", "../Components/video_carousel.html");

// ===== Load MAP
loadSection("map", "../Components/map.html");

// ===== Load CONTACT section with carousel
loadSection("contact", "../Components/contact.html", () => {
  const images = [
    "images/packing-moving1.jpg",
    "images/packing-moving2.jpg",
    "images/packing-moving3.jpg",
    "images/packing-moving4.jpg",
  ];
  let index = 0;
  const carouselImg = document.getElementById("carousel-img");
  if (carouselImg) {
    setInterval(() => {
      index = (index + 1) % images.length;
      carouselImg.src = images[index];
    }, 4000);
  }
});

// ===== Load ACHIEVEMENTS with carousel logic
loadSection("achievements", "../Components/achievements.html", () => {
  const carousel = document.getElementById("achievementCarousel");
  if (carousel) {
    let currentIndex = 0;
    const items = carousel.querySelectorAll(".carousel-item");
    const totalItems = items.length;

    function updateCarousel() {
      carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function moveCarousel(direction) {
      currentIndex = (currentIndex + direction + totalItems) % totalItems;
      updateCarousel();
    }

    setInterval(() => moveCarousel(1), 4000);
  }
});

// ===== Load TRUST
loadSection("trust", "../Components/trust.html");

// ===== Load ABOUT US
loadSection("about_us", "../Components/about_us.html");

// ===== Load REVIEWS
loadSection("reviews", "../Components/reviews.html");

// ===== Load FAQ toggle & "Show More" logic
loadSection("faq", "../Components/faq.html", () => {
  // FAQ toggle logic
  const faqButtons = document.querySelectorAll(".faq-question");

  faqButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const answer = btn.nextElementSibling;
      const icon = btn.querySelector(".faq-icon");
      const isOpen = answer.style.display === "block";

      // Close all first
      document.querySelectorAll(".faq-answer").forEach(ans => ans.style.display = "none");
      document.querySelectorAll(".faq-icon").forEach(ic => {
        ic.classList.remove("fa-minus");
        ic.classList.add("fa-plus");
      });

      // Toggle selected
      if (!isOpen) {
        answer.style.display = "block";
        icon.classList.remove("fa-plus");
        icon.classList.add("fa-minus");
      }
    });
  });

  // Show More logic
  const showMoreBtn = document.getElementById("show-more-btn");
  const contactUsBtn = document.getElementById("contact-us-btn");
  const extraFaqs = document.querySelectorAll(".extra-faq");

  if (showMoreBtn) {
    showMoreBtn.addEventListener("click", () => {
      extraFaqs.forEach(faq => faq.classList.remove("hidden"));
      showMoreBtn.classList.add("hidden");
      contactUsBtn.classList.remove("hidden");
    });
  }
});

// ===== Load LOCATIONS
loadSection("locations", "../Components/locations.html");

// ===== Load FOOTER
loadSection("footer", "../Components/footer.html");

// ===== Load STEPS FOR QUOTE
loadSection("steps_for_quote", "../Components/steps_for_quote.html");

// ===== Load CONTACT BAR (floating bar)
loadSection("contact_bar", "../Components/floating-contact-bar.html");

// ===== Load GET IN TOUCH
loadSection("get_in_touch", "../Components/get_in_touch.html", () => {
  const form = document.getElementById('pickupForm');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        pickup: form.pickup.value,
        drop: form.drop.value,
        details: form.details.value
      };

      // ✅ Replace with your backend API endpoint
const BACKEND_API_URL = window.location.hostname === "localhost"
  ? "http://localhost:5000/api/leads"
  : "https://gati-crm-backend.onrender.com/api/leads";

      fetch(BACKEND_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
        .then(res => res.json())
        .then(data => {
          alert("Form submitted successfully!");
          form.reset();
        })
        .catch(error => {
          console.error("Error:", error);
          alert("There was an error. Please try again.");
        });
    });
  }
});



// ===== Load BRANDS
loadSection("brands", "../Components/brands.html");

// ===========  FAQ Load & Modal Logic  ==========
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

// ========== Setup Functions ==========
function setupReviewStars() {
  const stars = document.querySelectorAll(".star-rating i");
  const ratingInput = document.getElementById("reviewRating");

  stars.forEach((star) => {
    star.addEventListener("click", () => {
      const value = parseInt(star.getAttribute("data-value"));
      ratingInput.value = value;

      stars.forEach((s) => {
        s.classList.toggle("selected", parseInt(s.getAttribute("data-value")) <= value);
      });
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
      photoCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        card.style.display = filter === "all" || category === filter ? "block" : "none";
      });
    });
  });
}

function setupContactModal() {
  const contactBtn = document.querySelector(".contact-btn");
  const popupOverlay = document.getElementById("popupOverlay");
  const popupCloseBtn = document.getElementById("popupCloseBtn");

  if (contactBtn && popupOverlay && popupCloseBtn) {
    contactBtn.addEventListener("click", () => popupOverlay.style.display = "flex");
    popupCloseBtn.addEventListener("click", () => popupOverlay.style.display = "none");
    window.addEventListener("click", (e) => {
      if (e.target === popupOverlay) popupOverlay.style.display = "none";
    });
  }
}

function setupServiceTabs() {
  const serviceTitles = {
    house: "House Shifting", ac: "AC Shifting", bike: "Bike Transport", car: "Car Transport",
    pet: "Pet Relocation", office: "Office Shifting", commercial: "Commercial Shifting",
    luggage: "Luggage Transport", domestic: "Domestic Moving", international: "International Moving",
    tempo: "Tempo for Shifting",
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

    const whatsappNumber = "91XXXXXXXXXX"; // Replace with your WhatsApp number
    const fullMessage = `🚨 New Issue Reported!\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n📦 Booking ID: ${booking || "N/A"}\n📋 Category: ${category}\n📝 Message: ${message}`;
    const encoded = encodeURIComponent(fullMessage);
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encoded}`;
    window.open(whatsappLink, "_blank");
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById('pickupForm');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        pickup: form.pickup.value,
        drop: form.drop.value,
        details: form.details.value
      };

      // Replace this line with your actual Google Script URL
      const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwmTIr49M22jVtYpxMUhlsyGS332f8tO1ij0-k5GRGQP-f3z6Fnhoa-sCy0P_mTfA/exec";

      fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          alert("Form submitted successfully!");
          form.reset(); // Optional: clears the form after submission
        })
        .catch(error => {
          console.error('Error:', error);
          alert("There was an error. Please try again.");
        });
    });
  }
});

// ========== Initialize All Setup Functions on DOM Ready ==========
document.addEventListener("DOMContentLoaded", () => {
  setupReviewStars();
  setupPhotoGallery();
  setupContactModal();
  setupServiceTabs();
  setupIssueForm();
});


// Show section on scroll
const sections = document.querySelectorAll('.mg-section');

const showOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;

  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop < triggerBottom) {
      section.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', showOnScroll);
window.addEventListener('load', showOnScroll); // run once on page load

const navLinks = document.querySelectorAll('nav.sidebar a');

const activateCurrentTab = () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120; // adjust for sticky nav
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
};

window.addEventListener("scroll", activateCurrentTab);

navLinks.forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").slice(1);
    const target = document.getElementById(targetId);

    window.scrollTo({
      top: target.offsetTop - 80, // adjust for header height
      behavior: "smooth"
    });
  });
});
