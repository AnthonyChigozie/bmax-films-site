// Portfolio filtering functionality
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn")
  const portfolioItems = document.querySelectorAll(".portfolio-item")

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter")

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      this.classList.add("active")

      // Filter portfolio items
      portfolioItems.forEach((item) => {
        if (filter === "all" || item.classList.contains(filter)) {
          item.style.display = "block"
          item.style.animation = "fadeIn 0.5s ease"
        } else {
          item.style.display = "none"
        }
      })
    })
  })
})

// Modal functionality
function openModal(projectId) {
  const modal = document.getElementById("portfolioModal")
  const modalBody = document.getElementById("modalBody")

  // Stop any currently playing videos before opening new modal
  const existingVideos = modal.querySelectorAll('video')
  existingVideos.forEach(video => {
    video.pause()
    video.currentTime = 0
  })

  // Project data
  const projects = {
    wedding1: {
      title: "Sarah & Michael's Wedding",
      description:
        "A beautiful garden wedding captured with cinematic storytelling techniques. This project showcased the couple's love story through intimate moments and stunning visuals.",
      details: [
        "Location: FCT Abuja",
        "Duration: 8 hours of coverage",
        "Deliverables: 4-minute highlight reel, full ceremony footage",
        "Style: Cinematic with natural lighting",
      ],
      videoEmbed: `
  <video controls width="100%">
    <source src="./videos/Videodoc6.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
`,

    },
    wedding2: {
      title: "Traditional Marraige Ceremony",
      description: "Beautiful cultural celebration filled with love,family and traditions.",
      details: [
        "Enugu",
        "Duration: 6 hours of coverage",
        "Deliverables: 3-minute highlight reel, ceremony footage",
        "Style: Natural and romantic",
      ],
      videoEmbed: `
  <video controls width="100%">
    <source src="./videos/Videodoc4.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
`,

    },
    birthday1: {
      title: "60th Birthday Celebration",
      description: "A milestone birthday celebration capturing family moments and heartfelt speeches.",
      details: [
        "Location: Event Hall",
        "Duration: 4 hours of coverage",
        "Deliverables: 2-minute highlight reel",
        "Style: Documentary-style coverage",
      ],
      videoEmbed: `
  <video controls width="100%">
    <source src="./videos/Videodoc8.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
`,
 
    },
    birthday2: {
      title: "2nd Birthday Celebration",
      description: "Joyful and colorful party filled with laughter, family, and love",
      details: [
        "Location: Private residence",
        "Duration: 5 hours of coverage",
        "Deliverables: 3-minute party highlights",
        "Style: Energetic and fun",
      ],
      videoEmbed: `
  <video controls width="100%">
    <source src="./videos/Videodoc3.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
`,
    },
    doc1: {
      title: "FinTech Startup Story",
      description: "A corporate documentary showcasing innovation and company culture.",
      details: [
        "Client: Tech startup company",
        "Duration: 2 weeks of production",
        "Deliverables: 15-minute documentary",
        "Style: Professional and inspiring",
      ],
      videoEmbed: `
  <video controls width="100%">
    <source src="./videos/Videodoc1.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
`,
    },
    doc2: {
      title: "Family Heritage Documentary",
      description: "Three generations sharing their family story and heritage.",
      details: [
        "Subject: Multi-generational family",
        "Duration: 1 month of production",
        "Deliverables: 20-minute documentary",
        "Style: Intimate and emotional",
      ],
      videoEmbed: `
  <video controls width="100%">
    <source src="./videos/Videodoc7.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
`,
    },
    real1: {
      title: "Luxury Home Tour",
      description: "A stunning modern mansion showcased with cinematic techniques.",
      details: [
        "Property: 5-bedroom luxury home",
        "Duration: 1 day shoot",
        "Deliverables: 2-minute property tour",
        "Style: Cinematic and elegant",
      ],
      videoEmbed: `
  <video controls width="100%">
    <source src="./videos/Videodoc2.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
`,
    },
    real2: {
      title: "Commercial Property Tour",
      description: "Professional office space highlighted for potential tenants.",
      details: [
        "Property: Commercial office building",
        "Duration: Half-day shoot",
        "Deliverables: 90-second property showcase",
        "Style: Professional and clean",
      ],
      videoEmbed: `
  <video controls width="100%">
    <source src="./pictures/Real2.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
`,
    },
  }

  const project = projects[projectId]
  if (project) {
    modalBody.innerHTML = `
            <h2>${project.title}</h2>
            ${project.videoEmbed}
            <div class="project-description">
                <p>${project.description}</p>
                <h3>Project Details:</h3>
                <ul>
                    ${project.details.map((detail) => `<li>${detail}</li>`).join("")}
                </ul>
                <div class="modal-actions">
                    <a href="book.html" class="cta-button">Book Similar Project</a>
                    <a href="contact.html" class="secondary-button">Get Quote</a>
                </div>
            </div>
        `
    modal.style.display = "block"
    document.body.style.overflow = "hidden"
  }
}

function closeModal() {
  // Stop all videos before closing
  stopAllVideos()
  
  const modal = document.getElementById("portfolioModal")
  modal.style.display = "none"
  document.body.style.overflow = "auto"
}

// Close modal when clicking outside
window.addEventListener("click", (event) => {
  const modal = document.getElementById("portfolioModal")
  if (event.target === modal) {
    closeModal()
  }
})

// Close modal with Escape key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal()
  }
})

// Helper function to stop all videos in modal
function stopAllVideos() {
  const modal = document.getElementById("portfolioModal")
  const videos = modal.querySelectorAll('video')
  videos.forEach(video => {
    video.pause()
    video.currentTime = 0
  })
}

// Stop videos when page is hidden (user switches tabs)
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    stopAllVideos()
  }
})
