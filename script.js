document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Typewriter Effect Logic ---
    const titleElement = document.querySelector('.hero-content .subtitle');
    const titles = ["SOFTWARE DEVELOPER", "WEB DEVELOPER", "FRONT-END DEVELOPER", "JAVA DEVELOPER"]; 
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
        if (!titleElement) return;
        const currentTitle = titles[titleIndex];
        if (isDeleting) {
            charIndex--;
            titleElement.textContent = currentTitle.substring(0, charIndex);
        } else {
            charIndex++;
            titleElement.textContent = currentTitle.substring(0, charIndex);
        }
        let speed = isDeleting ? 50 : 100;
        if (!isDeleting && charIndex === currentTitle.length) {
            speed = 1500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            speed = 500;
        }
        setTimeout(typeWriter, speed);
    }
    if (titleElement) typeWriter();

    // --- 2. Profile Image Flip Logic ---
    const flipContainer = document.getElementById('imageFlipContainer');
    const profileImage = document.getElementById('profileImage');
    const avatarSrc = 'image.png'; 
    const profileSrc = 'your-profile-pic.jpg'; 

    if (flipContainer && profileImage) {
        flipContainer.addEventListener('click', () => {
            flipContainer.querySelector('.profile-glow-ring').classList.toggle('rotate-flipped');
            setTimeout(() => {
                if (profileImage.src.includes(profileSrc)) {
                    profileImage.src = avatarSrc;
                } else {
                    profileImage.src = profileSrc;
                }
            }, 300);
        });
    }

    // --- 3. Smooth Scrolling ---
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // --- 4. Scroll Spy (Active Link) ---
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            if (scrollY >= (section.offsetTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) link.classList.add('active');
        });
    });

    // --- 5. About Section Scroll Animation (Re-triggerable) ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .fade-in-line');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const element = entry.target;
            const delay = element.getAttribute('data-delay');

            if (entry.isIntersecting) {
                // Jab element screen par aaye (Show animation)
                if (delay) {
                    element.style.transitionDelay = delay; 
                }
                element.classList.add('visible');
            } else {
                // Jab element screen se bahar jaye (Reset for next time)
                element.classList.remove('visible');
                element.style.transitionDelay = "0s"; // Reset delay taaki turant gayab ho sake
            }
        });
    }, { 
        threshold: 0.1 // 10% dikhte hi trigger hoga
    });

    animatedElements.forEach(element => observer.observe(element));

    // --- 6. Timeline Line Animation (Re-triggerable) ---
    const aboutSection = document.getElementById('about');

    const lineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Jab About section screen par aaye, line draw hogi
                aboutSection.classList.add('animated');
            } else {
                // Jab section se bahar jayein, animation reset ho jayegi
                aboutSection.classList.remove('animated');
            }
        });
    }, { 
        threshold: 0.2 // 20% section dikhne par trigger hoga
    });

    if (aboutSection) {
        lineObserver.observe(aboutSection);
    }
});


const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    formStatus.textContent = "Sending messages...";

    const serviceID = "service_83liw78";
    
    // 1. Pehla mail: Jo AAPKO milega (Contact Us)
    const p1 = emailjs.sendForm(serviceID, "template_8z1c7lq", this);

    // 2. Dusra mail: Jo USER ko jayega (Auto-Reply)
    // Iske liye hum .send use karenge kyunki variables wahi hain
    const p2 = emailjs.send(serviceID, "template_m35b6vl", {
        from_name: contactForm.from_name.value,
        from_email: contactForm.from_email.value,
        message: contactForm.message.value
    });

    // Jab dono mail chale jayein
    Promise.all([p1, p2])
    .then(() => {
        formStatus.textContent = "Messages sent to you and the user! ✅";
        formStatus.style.color = "#53a3e6";
        contactForm.reset();
    })
    .catch((error) => {
        formStatus.textContent = "Failed to send one or more messages. ❌";
        formStatus.style.color = "#ff4081";
        console.error(error);
    });
});