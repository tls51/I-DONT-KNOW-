document.addEventListener('DOMContentLoaded', () => {
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            
            const targetId = this.getAttribute('href');
            if (targetId.length > 1) { 
                e.preventDefault();
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const headerOffset = document.querySelector('.main-header').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                    const offsetPosition = elementPosition - headerOffset - 20; 

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in-hidden'); 
        sectionObserver.observe(section);
    });

    
    document.querySelectorAll('.testimonial-card').forEach(card => {
        const reviewText = card.querySelector('.testimonial-text');

        if (reviewText) {
            
            card.addEventListener('mouseover', () => {
                reviewText.style.display = 'block';
            });

            card.addEventListener('mouseout', () => {
                reviewText.style.display = 'none';
            });
        }
    });

    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); 

            const nameInput = contactForm.querySelector('input[type="text"]');
            let name = 'friend';
            if (nameInput && nameInput.value.trim() !== '') {
                name = nameInput.value.trim();
            }

            alert(`Thank you, ${name}! Your message has been sent. We will get back to you shortly.`);

            contactForm.reset();
        });
    }

});