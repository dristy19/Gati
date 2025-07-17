// ✅ Helper function to safely fetch and inject content
function loadSection(id, filePath, callback) {
  fetch(filePath)
    .then(res => res.text())
    .then(data => {
      const section = document.getElementById(id);
      if (section) {
        section.innerHTML = data;
        if (typeof callback === 'function') callback(section);
      }
    })
    .catch(err => console.error(`Failed to load ${id}:`, err));
}

// ===== Load HEADER with nav toggle logic
loadSection('header', '../Home/header.html', () => {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }
});

// ===== Load HERO section
loadSection('hero', '../Home/hero.html');

// ===== Load SERVICE SELECTION section with tab-switch logic
loadSection('service_selection', '../Home/service_selection.html', () => {
  initQuoteTabs();
});

// ===== Load VIDEO CAROUSEL
loadSection('video_carousel', '../Home/video_carousel.html');

// ===== Load MAP
loadSection('map', '../Home/map.html');

// ===== Load CONTACT section with carousel
loadSection('contact', '../Home/contact.html', () => {
  const images = [
    'images/packing-moving1.jpg',
    'images/packing-moving2.jpg',
    'images/packing-moving3.jpg',
    'images/packing-moving4.jpg'
  ];
  let index = 0;
  const carouselImg = document.getElementById('carousel-img');
  if (carouselImg) {
    setInterval(() => {
      index = (index + 1) % images.length;
      carouselImg.src = images[index];
    }, 4000);
  }
});

// ===== Load ACHIEVEMENTS with carousel logic
loadSection('achievements', '../Home/achievements.html', () => {
  const carousel = document.getElementById('achievementCarousel');
  if (carousel) {
    let currentIndex = 0;
    const items = carousel.querySelectorAll('.carousel-item');
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
loadSection('trust', '../Home/trust.html');

// ===== Load ABOUT US
loadSection('about_us', '../Home/about_us.html');

// ===== Load REVIEWS
loadSection('reviews', '../Home/reviews.html');

// ===== Load FAQ with toggle logic
loadSection('faq', '../Home/faq.html', () => {
  const faqButtons = document.querySelectorAll('.faq-question');

  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const icon = btn.querySelector('.faq-icon');
      const isOpen = answer.style.display === 'block';

      // Close all
      document.querySelectorAll('.faq-answer').forEach(ans => ans.style.display = 'none');
      document.querySelectorAll('.faq-icon').forEach(ic => {
        ic.classList.remove('fa-minus');
        ic.classList.add('fa-plus');
      });

      // Toggle selected
      if (!isOpen) {
        answer.style.display = 'block';
        icon.classList.remove('fa-plus');
        icon.classList.add('fa-minus');
      }
    });
  });
});

// ===== Load LOCATIONS
loadSection('locations', '../Home/locations.html');

// ===== Load FOOTER
loadSection('footer', '../Home/footer.html');

// ===== Load STEPS FOR QUOTE
loadSection('steps_for_quote', '../Home/steps_for_quote.html');

// ===== Load STEPS GET IN TOUCH
loadSection('get_in_touch', '../Home/get_in_touch.html');

// ===== Load BRANDS
loadSection('brands', '../Home/brands.html');


// ===== Load SERVICE SELECTION
loadSection('service_selection', '../Home/service_selection.html');


// ===========  FAQ Load & Modal Logic  ==========
document.addEventListener('DOMContentLoaded', () => {

  /* Fetch the FAQ HTML */
  fetch('../Home/faq.html')
    .then(res => res.text())
    .then(data => {
      document.getElementById('faq').innerHTML = data;

      // Give the browser a tick to paint the new HTML
      setTimeout(() => {

        /* 1️⃣  ACCORDION TOGGLE (works on every page) */
        document.querySelectorAll('.faq-question').forEach(btn => {
          btn.addEventListener('click', () => {
            btn.parentElement.classList.toggle('open');
          });
        });

        /* 2️⃣  SHOW / HIDE extra FAQs depending on which page we’re on */
        const isFullFaqPage = window.location.pathname.includes('faq_page.html');

        if (isFullFaqPage) {
          // Show all FAQs on the dedicated FAQ page
          document.querySelectorAll('.extra-faq').forEach(el => el.classList.remove('hidden'));
          // Hide “Show More”, show “Contact Us”
          document.getElementById('show-more-btn')?.classList.add('hidden');
          document.getElementById('contact-us-btn')?.classList.remove('hidden');
        }

        /* 3️⃣  CONTACT‑US MODAL */
        const modal        = document.getElementById('contactModal');
        const closeModal   = modal?.querySelector('.close-modal');
        const contactBtn   = document.getElementById('contact-us-btn');

        contactBtn?.addEventListener('click', e => {
          e.preventDefault();
          modal?.classList.remove('hidden');
        });

        closeModal?.addEventListener('click', () => modal?.classList.add('hidden'));

        window.addEventListener('click', e => {
          if (e.target === modal) modal?.classList.add('hidden');
        });

      }, 50);   // ← small delay to ensure DOM is ready
    })
    .catch(err => console.error('Failed to load FAQ:', err));

});

// ===========  Write your review  ==========

document.addEventListener("DOMContentLoaded", () => {
  const stars = document.querySelectorAll('.star-rating i');
  const ratingInput = document.getElementById('reviewRating');

  stars.forEach(star => {
    star.addEventListener('click', () => {
      const value = parseInt(star.getAttribute('data-value'));
      ratingInput.value = value;

      stars.forEach(s => {
        s.classList.toggle('selected', parseInt(s.getAttribute('data-value')) <= value);
      });
    });
  });
});


const serviceTitles = {
  house: "House Shifting",
  ac: "AC Shifting",
  bike: "Bike Transport",
  car: "Car Transport",
  pet: "Pet Relocation",
  office: "Office Shifting",
  commercial: "Commercial Shifting",
  luggage: "Luggage Transport",
  domestic: "Domestic Moving",
  international: "International Moving",
  tempo: "Tempo for Shifting"
};

document.addEventListener("DOMContentLoaded", function () {
  // Ensure House is active on load
  document.querySelector('#serviceList li[data-target="house"]').classList.add("active");
  document.getElementById("house").classList.add("active");
  document.getElementById("serviceTitle").textContent = serviceTitles["house"];

  // Attach click listeners
  document.querySelectorAll('#serviceList li').forEach(item => {
    item.addEventListener('click', function () {
      document.querySelectorAll('#serviceList li').forEach(li => li.classList.remove('active'));
      this.classList.add('active');

      const target = this.getAttribute('data-target');

      document.querySelectorAll('.desc').forEach(desc => desc.classList.remove('active'));
      document.getElementById(target).classList.add('active');

      document.getElementById('serviceTitle').textContent = serviceTitles[target];
    });
  });
});

