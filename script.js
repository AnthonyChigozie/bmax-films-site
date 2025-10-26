// Theme Toggle Functionality
document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS with better error handling
  const AOS = window.AOS // Declare the AOS variable
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: "ease-in-out",
      delay: 0,
    })
  } else {
    console.warn("AOS library not loaded")
  }
  // Loader Animation
  // ...existing code...
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.classList.add('hide');
    setTimeout(() => loader.style.display = 'none', 600);
  }
});


  // Theme Toggle
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle.querySelector('.theme-icon i');
  const html = document.documentElement;

  const currentTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeToggle.addEventListener('click', () => {
      const theme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      html.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      updateThemeIcon(theme);
  });

  function updateThemeIcon(theme) {
      themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
  }

  // Navigation Scroll Effect
  const navbar = document.getElementById("navbar")
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        navbar.classList.add("scrolled")
      } else {
        navbar.classList.remove("scrolled")
      }
    })
  }

  const backToTopBtn = document.getElementById("backToTop")
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add("visible")
        backToTopBtn.style.display = "flex"
      } else {
        backToTopBtn.classList.remove("visible")
        backToTopBtn.style.display = "none"
      }
    })

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // Reviews Carousel
  const reviews = document.querySelectorAll(".review-card")
  if (reviews.length > 0) {
    let currentReview = 0

    function showReview(index) {
      reviews.forEach((review) => review.classList.remove("active"))
      if (reviews[index]) {
        reviews[index].classList.add("active")
      }
    }

    // Auto-rotate reviews
    setInterval(() => {
      currentReview = (currentReview + 1) % reviews.length
      showReview(currentReview)
    }, 5000)
  }

  // Mobile Menu Toggle
  const mobileMenuToggle = document.getElementById("mobileMenuToggle")
  const mobileDropdown = document.getElementById("mobileDropdown")

  if (mobileMenuToggle && mobileDropdown) {
    mobileMenuToggle.addEventListener("click", function () {
      mobileDropdown.classList.toggle("active")
      this.classList.toggle("active")
    })

    // Close dropdown when clicking outside
    mobileDropdown.addEventListener("click", function (e) {
      if (e.target === mobileDropdown) {
        mobileDropdown.classList.remove("active")
        mobileMenuToggle.classList.remove("active")
      }
    })
// Close dropdown when clicking on links

    // Close dropdown when clicking on links
    const dropdownLinks = mobileDropdown.querySelectorAll(".dropdown-link, .dropdown-cta")
    dropdownLinks.forEach(link => {
      link.addEventListener("click", () => {
        mobileDropdown.classList.remove("active")
        mobileMenuToggle.classList.remove("active")
      })
    })
  }

  // Smooth scrolling for anchor links (ignore bare "#" anchors and invalid selectors)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href") || "";
      // Ignore bare "#" (no target) or empty hrefs
      if (!href || href === "#") return;

      // Only attempt querySelector for valid fragment identifiers like "#section"
      if (href.startsWith('#') && href.length > 1) {
        e.preventDefault()
        try {
          const target = document.querySelector(href)
          if (target) {
            target.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }
        } catch (err) {
          // If an invalid selector somehow gets here, log and continue without throwing
          console.warn('Invalid anchor selector:', href, err)
        }
      }
    })
  })

  // Loading animation
  const loadingElements = document.querySelectorAll(".loading")
  if (loadingElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("loaded")
        }
      })
    })

    loadingElements.forEach((el) => {
      observer.observe(el)
    })
  }

  // Cinematographer Hero behaviors (scoped to .cinema-hero)
  const cinemaHero = document.querySelector('.cinema-hero')
  if (cinemaHero) {
    const backgroundImages = [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=1080&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&crop=center'
    ]

    // Preload images
    ;[...backgroundImages,
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop&crop=faces',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=300&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=800&fit=crop&crop=center']
      .forEach((url) => { const img = new Image(); img.src = url })

    // Background rotation
    const heroBg = document.getElementById('heroBg')
    if (heroBg) {
      let currentIndex = 0
      const changeBackground = () => {
        heroBg.style.backgroundImage = `url('${backgroundImages[currentIndex]}')`
        currentIndex = (currentIndex + 1) % backgroundImages.length
      }
      changeBackground()
      setInterval(changeBackground, 8000)
    }

    // Parallax
    const galleryImages = cinemaHero.querySelectorAll('.gallery-image')
    const showcaseMain = cinemaHero.querySelector('.showcase-main')
    const showcaseMinis = cinemaHero.querySelectorAll('.showcase-mini')
    cinemaHero.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const xPos = (clientX / innerWidth - 0.5) * 2
      const yPos = (clientY / innerHeight - 0.5) * 2

      galleryImages.forEach((img, index) => {
        const intensity = (index + 1) * 8
        img.style.transform = `translate(${-xPos * intensity}px, ${-yPos * intensity}px)`
      })

      if (showcaseMain) {
        showcaseMain.style.transform = `translateX(${xPos * 15}px) translateY(${yPos * 15}px)`
      }

      showcaseMinis.forEach((mini, index) => {
        const intensity = (index + 1) * 5
        mini.style.transform = `translate(${xPos * intensity}px, ${yPos * intensity}px)`
      })
    })

    // Hover effects
    const showcaseImages = cinemaHero.querySelectorAll('.showcase-main, .showcase-mini, .gallery-image')
    showcaseImages.forEach((el) => {
      el.addEventListener('mouseenter', function () {
        this.style.filter = 'brightness(1.1) contrast(1.1) saturate(1.2)'
        this.style.transition = 'all 0.3s ease'
      })
      el.addEventListener('mouseleave', function () {
        this.style.filter = 'brightness(1) contrast(1) saturate(1)'
      })
    })

    // Typing animation restart
    const typingElement = cinemaHero.querySelector('.typing-text')
    if (typingElement) {
      setInterval(() => {
        typingElement.style.animation = 'none'
        setTimeout(() => {
          typingElement.style.animation = 'typing 4s steps(40, end) infinite, blink-caret 0.75s step-end infinite'
        }, 100)
      }, 8000)
    }

    // Pause animations when tab hidden
    document.addEventListener('visibilitychange', () => {
      const animatedElements = cinemaHero.querySelectorAll('.gallery-image, .showcase-main, .showcase-mini')
      animatedElements.forEach((el) => {
        el.style.animationPlayState = document.hidden ? 'paused' : 'running'
      })
    })
  }

  // Form validation (if forms exist)
  const forms = document.querySelectorAll("form")
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      const requiredFields = form.querySelectorAll("[required]")
      let isValid = true

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false
          field.classList.add("error")
        } else {
          field.classList.remove("error")
        }
      })

      if (!isValid) {
        e.preventDefault()
        alert("Please fill in all required fields.")
      }
    })
  })

  // Performance optimization - lazy load images
  const images = document.querySelectorAll("img[data-src]")
  if (images.length > 0) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          img.classList.remove("lazy")
          imageObserver.unobserve(img)
        }
      })
    })

    images.forEach((img) => imageObserver.observe(img))
  }

  // Initialize Swiper logo sliders if present
  setTimeout(() => {
    if (typeof Swiper !== 'undefined') {
      const logoSliders = document.querySelectorAll('.logo-swiper')
      console.log('Found logo sliders:', logoSliders.length)
      
      logoSliders.forEach((sliderEl, index) => {
        console.log('Initializing slider', index)
        new Swiper(sliderEl, {
          slidesPerView: 2,
          spaceBetween: 30,
          loop: true,
          autoplay: { 
            delay: 0, 
            disableOnInteraction: false,
            pauseOnMouseEnter: false
          },
          speed: 2000,
          allowTouchMove: true,
          on: {
            init: function () {
              console.log('Swiper initialized successfully')
            }
          },
          breakpoints: {
            320: { 
              slidesPerView: 2,
              spaceBetween: 20
            },
            480: { 
              slidesPerView: 3,
              spaceBetween: 24
            },
            768: { 
              slidesPerView: 4,
              spaceBetween: 30
            },
            1024: { 
              slidesPerView: 5,
              spaceBetween: 40
            },
            1200: { 
              slidesPerView: 6,
              spaceBetween: 50
            }
          }
        })
      })
    } else {
      console.log('Swiper not loaded')
    }
  }, 100)
})

// Reviews Carousel Controls
function changeReview(direction) {
  const reviews = document.querySelectorAll(".review-card")
  const currentActive = document.querySelector(".review-card.active")

  if (!reviews.length || !currentActive) return

  let currentIndex = Array.from(reviews).indexOf(currentActive)

  reviews[currentIndex].classList.remove("active")

  if (direction === 1) {
    currentIndex = (currentIndex + 1) % reviews.length
  } else {
    currentIndex = (currentIndex - 1 + reviews.length) % reviews.length
  }

  reviews[currentIndex].classList.add("active")
}

// SEO and Performance Functions
function preloadCriticalResources() {
  // Preload critical CSS and fonts
  const criticalResources = ["https://unpkg.com/aos@2.3.1/dist/aos.css", "./styles.css"]

  criticalResources.forEach((resource) => {
    const link = document.createElement("link")
    link.rel = "preload"
    link.href = resource
    link.as = "style"
    document.head.appendChild(link)
  })
}

// Call preload function
preloadCriticalResources()

// Google Analytics (replace with your tracking ID)
window.dataLayer = window.dataLayer || []
function gtag() {
  window.dataLayer.push(arguments)
}
if (typeof gtag !== "undefined") {
  gtag("js", new Date())
  gtag("config", "GA_TRACKING_ID")
}

// Service Worker Registration for PWA capabilities
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // Use a relative path so registration works when served from a local folder
    navigator.serviceWorker
      .register("./sw.js")
      .then((registration) => {
        console.log("ServiceWorker registration successful", registration)
      })
      .catch((err) => {
        console.error("ServiceWorker registration failed:", err)
      })
  })
}

// This is for the activeness of the bottom menu
document.addEventListener('DOMContentLoaded', function() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === currentPage) {
          link.classList.add('active');
      }
  });
});

 // Mobile Bottom Navigation JavaScript
 function initBottomNav() {
  const bottomNav = document.getElementById('bottomMobileNav');
  
  if (!bottomNav) return; // Exit if nav doesn't exist

  // Show navigation on load with slide-in animation
  setTimeout(() => {
      bottomNav.classList.add('visible');
  }, 300);

  // Add haptic feedback and visual effects on tap
  const navItems = document.querySelectorAll('.bottom-nav-item');
  navItems.forEach(item => {
      item.addEventListener('click', function() {
          // Haptic feedback (vibration) - 10ms pulse
          if ('vibrate' in navigator) {
              navigator.vibrate(10);
          }
          
          // Optional: Add scale animation on click
          this.style.transform = 'scale(0.9)';
          setTimeout(() => {
              this.style.transform = '';
          }, 100);
      });
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBottomNav);
} else {
  initBottomNav();
}


// Bottom Mobile Nav Visibility and Active State
function handleBottomNav() {
  const bottomNav = document.getElementById('bottomMobileNav');
  if (!bottomNav) return; // guard: exit early when nav is not present on the page

  const currentPage = window.location.pathname.split('/').pop() || 'index.html'; // Gets 'contact.html'
  const navItems = bottomNav.querySelectorAll('.bottom-nav-item');
  
  // Set active item based on current page
  navItems.forEach(item => {
      item.classList.remove('active');
      const itemPage = item.getAttribute('data-page');
      if (itemPage === 'contact' && currentPage.includes('contact')) { // Adjust for your page names
          item.classList.add('active');
      } else if (itemPage === 'home' && currentPage === 'index.html') {
          item.classList.add('active');
      } else if (itemPage === 'services' && currentPage.includes('services')) {
          item.classList.add('active');
      } else if (itemPage === 'book' && currentPage.includes('book')) {
          item.classList.add('active');
      } else if (itemPage === 'portfolio' && currentPage.includes('portfolio')) {
          item.classList.add('active');
      }
  });
  
  // Show/hide based on screen size
  if (window.innerWidth <= 768) {
      bottomNav.classList.add('visible');
      document.body.style.paddingBottom = '80px'; // Ensure body padding is applied dynamically
  } else {
      bottomNav.classList.remove('visible');
      document.body.style.paddingBottom = ''; // Reset on desktop
  }
}

// Run on DOM ready and resize (safer: only run after DOM exists)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', handleBottomNav);
} else {
  handleBottomNav();
}

window.addEventListener('resize', handleBottomNav);

//This is for on scroll appearance of botton-menu
let scrollTimeout;
window.addEventListener('scroll', () => {
  // Safely reference the bottom nav element (it may be absent on some pages)
  const bottomNavEl = document.getElementById('bottomMobileNav');
  if (!bottomNavEl) return;

  clearTimeout(scrollTimeout);
  bottomNavEl.classList.remove('visible');
  scrollTimeout = setTimeout(() => {
    if (window.innerWidth <= 768) bottomNavEl.classList.add('visible');
  }, 3000); // Re-show after 3s idle
});