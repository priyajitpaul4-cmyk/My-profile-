/**
 * ================================================
 * PORTFOLIO WEBSITE - INTERACTIVITY SCRIPT
 * ================================================
 * This file handles all the interactive features:
 * - Smooth scrolling
 * - Form handling
 * - Project loading
 * - Animations
 * - Validation
 */

// ================================================
// 1. DYNAMIC PROJECTS DATA
// ================================================

/**
 * Array of project objects
 * Each project has: title, description, image, technologies, codeLink, demoLink
 * In the future, this would come from a backend API
 */
const projects = [
    {
        id: 1,
        title: 'E-Commerce Product Page',
        description: 'A responsive product page with image gallery, reviews, and add-to-cart functionality. Built with HTML, CSS, and JavaScript.',
        image: 'https://via.placeholder.com/400x250?text=E-Commerce+Store',
        technologies: ['HTML5', 'CSS3', 'JavaScript'],
        codeLink: '#',
        demoLink: '#'
    },
    {
        id: 2,
        title: 'Weather App',
        description: 'Real-time weather application that fetches data from an API. Shows temperature, humidity, and 5-day forecast with beautiful UI.',
        image: 'https://via.placeholder.com/400x250?text=Weather+App',
        technologies: ['HTML5', 'CSS3', 'JavaScript'],
        codeLink: '#',
        demoLink: '#'
    },
    {
        id: 3,
        title: 'Task Management App',
        description: 'A to-do list application with add, edit, delete, and mark-complete features. Data persists using browser localStorage.',
        image: 'https://via.placeholder.com/400x250?text=Task+Manager',
        technologies: ['HTML5', 'CSS3', 'JavaScript'],
        codeLink: '#',
        demoLink: '#'
    }
];

// ================================================
// 2. LOAD & DISPLAY PROJECTS
// ================================================

/**
 * Function to load all projects into the HTML
 * Runs when page loads
 */
function loadProjects() {
    // Find the container where we'll put projects
    const projectsContainer = document.getElementById('projects-container');
    
    // Clear what was there (template card)
    projectsContainer.innerHTML = '';
    
    // Loop through each project
    projects.forEach(project => {
        // Create HTML for this project
        const projectHTML = `
            <div class="col-md-6 col-lg-4">
                <div class="card h-100 project-card">
                    <!-- Project image -->
                    <img src="${project.image}" class="card-img-top" alt="${project.title}">
                    
                    <!-- Card content -->
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${project.title}</h5>
                        <p class="card-text">${project.description}</p>
                        
                        <!-- Technology badges -->
                        <div class="mb-3 mt-auto">
                            ${project.technologies.map(tech => 
                                `<span class="badge bg-secondary">${tech}</span>`
                            ).join('')}
                        </div>
                    </div>
                    
                    <!-- Buttons -->
                    <div class="card-footer bg-white">
                        <a href="${project.codeLink}" class="btn btn-sm btn-primary">
                            <i class="fas fa-code"></i> View Code
                        </a>
                        <a href="${project.demoLink}" class="btn btn-sm btn-outline-primary">
                            <i class="fas fa-external-link-alt"></i> Live Demo
                        </a>
                    </div>
                </div>
            </div>
        `;
        
        // Add this HTML to the container
        projectsContainer.innerHTML += projectHTML;
    });
}

// ================================================
// 3. FORM VALIDATION & SUBMISSION
// ================================================

/**
 * Handle contact form submission
 * Validates form before submission
 */
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Prevent default form submission (page reload)
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Simple validation check
        if (!name || !email || !subject || !message) {
            showAlert('Please fill in all fields!', 'warning');
            return;
        }
        
        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showAlert('Please enter a valid email!', 'warning');
            return;
        }
        
        // If everything is valid, show success message
        showAlert('Thanks for reaching out! I\'ll get back to you soon! 📧', 'success');
        
        // Reset the form (clear all inputs)
        contactForm.reset();
        
        // In a real app, we would send this data to a server here
        console.log('Form data:', { name, email, subject, message });
    });
}

// ================================================
// 4. HELPER FUNCTION - Show alerts
// ================================================

/**
 * Show a temporary alert message
 * @param {string} message - The message to display
 * @param {string} type - 'success' or 'warning'
 */
function showAlert(message, type) {
    // Create alert HTML
    const alertHTML = `
        <div class="alert alert-${type === 'success' ? 'success' : 'warning'} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    // Find form container
    const formContainer = document.querySelector('#contact');
    
    // Insert alert at top of form
    formContainer.insertAdjacentHTML('afterbegin', alertHTML);
    
    // Remove alert after 5 seconds
    setTimeout(() => {
        const alertElement = formContainer.querySelector('.alert');
        if (alertElement) {
            alertElement.remove();
        }
    }, 5000);
}

// ================================================
// 5. SMOOTH SCROLL FOR NAVIGATION LINKS
// ================================================

/**
 * Add smooth scrolling to all anchor links
 * When you click a link with #section, it smoothly scrolls to it
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Prevent default anchor behavior
        e.preventDefault();
        
        // Get the target section
        const target = document.querySelector(this.getAttribute('href'));
        
        // If target exists, scroll to it smoothly
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ================================================
// 6. HIGHLIGHT ACTIVE NAVIGATION LINK
// ================================================

/**
 * Update which nav link is highlighted based on scroll position
 * As you scroll through sections, the nav link highlights
 */
window.addEventListener('scroll', function() {
    // Get all nav links
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    // Check each section
    navLinks.forEach(link => {
        // Get the section ID from the link's href
        const sectionId = link.getAttribute('href');
        const section = document.querySelector(sectionId);
        
        if (section) {
            // Get position of section on page
            const rect = section.getBoundingClientRect();
            
            // If section is currently visible
            if (rect.top <= 100 && rect.bottom >= 100) {
                // Remove active from all links
                navLinks.forEach(l => l.classList.remove('active'));
                
                // Add active to current link
                link.classList.add('active');
            }
        }
    });
});

// ================================================
// 7. ADD SCROLL ANIMATION TO ELEMENTS
// ================================================

/**
 * Simple fade-in animation when sections come into view
 * As you scroll down, elements fade in
 */
function observeElements() {
    // Create observer that watches for elements entering viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If element is visible
            if (entry.isIntersecting) {
                // Add animation class
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1  // Trigger when 10% of element is visible
    });
    
    // Watch all cards and section headings
    document.querySelectorAll('.card, section h2').forEach(el => {
        // Set initial state (invisible, lower)
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        
        // Start watching this element
        observer.observe(el);
    });
}

// ================================================
// 8. INITIALIZE EVERYTHING WHEN PAGE LOADS
// ================================================

/**
 * Run all our functions when the page is ready
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Portfolio loaded!');
    
    // Load all projects
    loadProjects();
    
    // Set up scroll animations
    observeElements();
    
    // Log to console (for debugging)
    console.log('🚀 All features initialized!');
});