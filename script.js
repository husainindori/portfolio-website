const navLinks = document.querySelectorAll('.nav-link');
const themeMode = document.getElementById('theme-toggle');
const mediaIcon = document.getElementById('media-icon');
const typeText = document.querySelector(".about h2");
const submit = document.getElementById('submit-button');

// hamburger menu
const hamburger = document.getElementById('hamburger');
const navLeft = document.querySelector('.nav-left');

hamburger.addEventListener('click', () => {
    navLeft.classList.toggle('active');
    hamburger.classList.toggle('open');
});
// Close the menu when a navigation link is clicked
navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        navLeft.classList.remove('active');
        hamburger.classList.remove('open');
    });
});

// Close the menu when clicking outside of it
document.addEventListener('click', (e) => {
    if (!navLeft.contains(e.target) && !hamburger.contains(e.target)) {
        navLeft.classList.remove('active');
        hamburger.classList.remove('open');
    }
});

// Smooth scrolling for navigation links
navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default anchor behavior
        const targetId = link.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' }); // Smooth scrolling
        }
    });
});



// Highlight active nav link based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section').forEach((section) => {
        const sectionTop = section.offsetTop - 100; // Adjust for offset
        const sectionHeight = section.offsetHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove('active'); // Remove active class from all links
        if (link.getAttribute('data-target') === current) {
            link.classList.add('active'); // Add active class to the current link
        }
    });
});






// theme
themeMode.addEventListener('click', () =>{
    const lightMode = document.body.classList.toggle('light-theme');
    if(lightMode){
        themeMode.innerHTML = `<img id="light-mode" src="./img/icons8-dark-mode-100.png" alt="">`
        // mediaIcon.src = "./img/icons8-github(1)-logo.svg"
        

    }else{
        themeMode.innerHTML = `<img id="light-mode" src="./img/icons8-light-mode-100.png" alt="">`
    }
})





// Typing Animation
// Typing Animation
const originalText = typeText.textContent; // Use textContent for better performance
typeText.textContent = ""; // Clear the text initially

let i = 0;
function typeWriter() {
  if (i < originalText.length) {
    typeText.textContent += originalText.charAt(i); // Append one character at a time
    i++;
    setTimeout(typeWriter, 50); // Adjust typing speed (100ms delay)
  }
}

// Start the typing animation when the page loads
window.addEventListener("load", typeWriter);


//  scroll animation
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show-section");
      }
    });
  }, {
    threshold: 0.1
  });
  
  sections.forEach(section => {
    observer.observe(section);
  });
  




// EmailJS Script
submit.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate form fields
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !subject || !message) {
        document.getElementById('status-message').innerHTML = "Please fill in all fields.";
        document.getElementById('status-message').style.color = "red";
        return;
    }

    // Prepare parameters
    const param = {
        name: name,
        email_id: email,
        subject: subject,
        message: message
    };

    // Clear status message before sending
    document.getElementById('status-message').innerHTML = "Sending...";
    document.getElementById('status-message').style.color = "blue";

    // Send email using EmailJS
    emailjs.send('service_husain', 'template_kagp5ib', param)
        .then((response) => {
            document.getElementById('status-message').innerHTML = "Message sent successfully!";
            document.getElementById('status-message').style.color = "green";
        })
        .catch((error) => {
            document.getElementById('status-message').innerHTML = "Message not sent. Please try again.";
            document.getElementById('status-message').style.color = "red";
            console.error("EmailJS Error:", error); // Log error for debugging
        });
});


// dynamic year
const yearElement = document.getElementById('year');
yearElement.textContent = new Date().getFullYear();

