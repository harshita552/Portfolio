// script.js

// Smooth scrolling for navigation links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


//******************  scroll reveal ****************//
ScrollReveal({
    distance: '80px' , 
    duration: 2000,
    delay: 200,
})

ScrollReveal().reveal('.home-content , heading', { origin: 'top'});
ScrollReveal().reveal('.home-img , .contact form', { origin: 'button'});
ScrollReveal().reveal('.home-contact h1 , about-img', { origin: 'left'});
ScrollReveal().reveal('.home-contact p , .about-content .project , .project-content', { origin: 'right'});



//******************** typed js **********************//


const typed = new Typed('.multiple-text' , {
    strings: ['Frontend Developer', 'Web Designer'],
    typeSpeed: 70,
    backSpeed: 70,
    backDelay: 1000,
    loop: true,
})