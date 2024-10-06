
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    const header = document.querySelector('header');
    const menuIcon = document.getElementById('menu-icon');
    const navUl = document.querySelector('nav ul');

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = event.target.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });

            // Close the mobile menu after clicking a link
            if (navUl.classList.contains('expanded')) {
                navUl.classList.remove('expanded');
            }
        });
    });

    // Toggle menu for mobile
    menuIcon.addEventListener('click', () => {
        navUl.classList.toggle('expanded');
    });

    // Change header background color on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = '#555';
        } else {
            header.style.background = '#333';
        }
    });

    // Implement auto scroll based on mouse wheel direction
    const sections = document.querySelectorAll("section");
    let currentSectionIndex = 0;
    let isScrolling = false;  // To prevent multiple triggers

    // Function to scroll to a specific section
    function scrollToSection(index) {
        sections[index].scrollIntoView({ behavior: "smooth" });
    }

    // Scroll event to handle wheel direction
    function handleScroll(event) {
        if (isScrolling) return;  // If already scrolling, ignore

        const delta = event.deltaY;

        // Scroll down
        if (delta > 0 && currentSectionIndex < sections.length - 1) {
            currentSectionIndex++;
        }
        // Scroll up
        else if (delta < 0 && currentSectionIndex > 0) {
            currentSectionIndex--;
        }

        // Smooth scroll to the next section
        scrollToSection(currentSectionIndex);

        // Set scrolling state to true, then reset after 1 second
        isScrolling = true;
        setTimeout(() => {
            isScrolling = false;
        }, 1000);  // Adjust time to control scroll frequency
    }

    // Add the scroll listener to the entire window
    window.addEventListener("wheel", handleScroll);
});

// Function to update the displayed value for sliders
function updateValue(spanId, value) {
    document.getElementById(spanId).textContent = value;
}

// Handle form submission
document.getElementById('review-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from refreshing the page
    
    // Get the slider values
    const creativityValue = document.getElementById('creativity-slider').value;
    const skillsValue = document.getElementById('skills-slider').value;
    
    // Display the review result
    document.getElementById('display-creativity').textContent = creativityValue;
    document.getElementById('display-skills').textContent = skillsValue;
    
    // Show the result section
    document.getElementById('review-result').style.display = 'block';
});
