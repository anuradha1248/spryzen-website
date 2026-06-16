document.addEventListener('DOMContentLoaded', () => {
    // 1. Custom Cursor Glow Tracking
    const cursorGlow = document.querySelector('.cursor-glow');
    if (cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
    }

    // 2. Scroll Header Scrolled State
    const nav = document.querySelector('.nav');
    if (nav) {
        const checkScroll = () => {
            if (window.scrollY > 24) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', checkScroll, { passive: true });
        checkScroll(); // Check on init
    }

    // 3. Mobile Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileLinks = document.querySelector('.nav-links-mobile');
    if (hamburger && mobileLinks) {
        const toggleMenu = () => {
            const isOpen = mobileLinks.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', isOpen);
            
            // Hamburger animation
            const lines = hamburger.querySelectorAll('.ham-line');
            if (isOpen) {
                lines[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                lines[1].style.opacity = '0';
                lines[1].style.transform = 'translateX(10px)';
                lines[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                lines[0].style.transform = 'none';
                lines[1].style.opacity = '1';
                lines[1].style.transform = 'none';
                lines[2].style.transform = 'none';
            }
        };
        hamburger.addEventListener('click', toggleMenu);

        // Close menu on link click
        mobileLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mobileLinks.classList.contains('open')) {
                    toggleMenu();
                }
            });
        });
    }

    // 4. Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // 5. Portfolio Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                filterButtons.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-pressed', 'false');
                });
                
                // Add to clicked
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');

                const filterValue = btn.dataset.filter || btn.textContent.trim();
                
                projectCards.forEach(card => {
                    const cardCategory = card.dataset.category;
                    
                    // Animate transition
                    if (filterValue === 'All' || cardCategory === filterValue) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // 6. FAQ Accordion Behavior
    const faqTriggers = document.querySelectorAll('.faq-trigger');
    if (faqTriggers.length > 0) {
        faqTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const item = trigger.closest('.faq-item');
                const content = item.querySelector('.faq-content');
                const isActive = item.classList.contains('active');

                // Close all other FAQs
                document.querySelectorAll('.faq-item').forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-content').style.maxHeight = '0';
                    }
                });

                // Toggle current FAQ
                if (isActive) {
                    item.classList.remove('active');
                    content.style.maxHeight = '0';
                } else {
                    item.classList.add('active');
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            });
        });
    }

    // 7. Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            
            // Simple validation
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
                alert('Please fill out all fields.');
                return;
            }

            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            // Simulate form submission
            setTimeout(() => {
                // Revert button
                submitBtn.textContent = 'Message Sent! ✓';
                submitBtn.style.background = '#22c55e';
                submitBtn.style.color = '#ffffff';

                // Prompt user to also click WhatsApp for quick reply if they want
                const userConfirm = confirm("Inquiry received! Would you also like to open WhatsApp to chat with us immediately?");
                if (userConfirm) {
                    const waText = encodeURIComponent(`Hi Spryzen, my name is ${nameInput.value.trim()}. I'm interested in building a project. Here are some details: ${messageInput.value.trim()}`);
                    window.open(`https://wa.me/918565841359?text=${waText}`, '_blank');
                }

                // Reset form
                contactForm.reset();
                
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                    submitBtn.style.background = '';
                    submitBtn.style.color = '';
                }, 3000);
            }, 1200);
        });
    }

    // 8. Hover Effect for Service Cards (updating mouse position coordinates for CSS hover gradient)
    const serviceCards = document.querySelectorAll('.svc-card');
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });

    // 9. Scroll Spy for Active Navigation Link
    const navLinks = document.querySelectorAll('.nav-links-desktop .nav-link, .nav-links-mobile .nav-link');
    const sections = document.querySelectorAll('header#home, section[id]');
    
    if (navLinks.length > 0 && sections.length > 0) {
        const checkActiveSection = () => {
            let current = '';
            const scrollPosition = window.scrollY + 120; // Offset for fixed navbar height

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            if (current) {
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href && href.startsWith('#')) {
                        link.classList.remove('nav-link-active');
                        if (href === `#${current}`) {
                            link.classList.add('nav-link-active');
                        }
                    }
                });
            }
        };

        window.addEventListener('scroll', checkActiveSection, { passive: true });
        checkActiveSection(); // Initialize on load
    }
});
