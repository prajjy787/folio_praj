// Advanced Greeting Animation
(() => {
    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', () => {
      // Get greeting element
      const greeting = document.querySelector('.greeting');
      
      if (!greeting) return;
      
      // Text animation configuration
      const greetingAnimation = {
        fadeInDuration: 800,
        typingSpeed: 50,
        cursorBlinkRate: 530
      };
      
      // Time-based greeting messages with emoji
      const getGreetingByHour = () => {
        const hour = new Date().getHours();
        
        if (hour >= 5 && hour < 12) return { text: "Good Morning", emoji: "🌤️", theme: "#FF9500" };
        if (hour >= 12 && hour < 17) return { text: "Good Afternoon", emoji: "☀️", theme: "#FB5607" };
        if (hour >= 17 && hour < 21) return { text: "Good Evening", emoji: "🌆", theme: "#3A86FF" };
        return { text: "Good Night", emoji: "🌙", theme: "#8338EC", theme: "#3A0CA3" };
      };
      
      // Get the appropriate greeting
      const currentGreeting = getGreetingByHour();
      
      // Create cursor element for typing effect
      const cursor = document.createElement('span');
      cursor.className = 'greeting-cursor';
      cursor.textContent = '';
      cursor.style.opacity = '1';
      cursor.style.marginLeft = '0.1em';
      cursor.style.animation = `cursor-blink ${greetingAnimation.cursorBlinkRate}ms infinite`;
      
      // Clear and prepare greeting element
      greeting.textContent = '';
      greeting.style.opacity = '0';
      greeting.style.transform = 'translateY(-20px)';
      greeting.style.transition = `opacity ${greetingAnimation.fadeInDuration}ms ease-out, transform ${greetingAnimation.fadeInDuration}ms ease-out`;
      
      // Create style for cursor blinking
      const style = document.createElement('style');
      style.textContent = `
        @keyframes cursor-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        
        @keyframes emoji-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .greeting-emoji {
          display: inline-block;
          margin-left: 0.3em;
          animation: emoji-float 3s ease-in-out infinite;
        }
      `;
      document.head.appendChild(style);
      
      // Start the animation sequence
      setTimeout(() => {
        // First fade in
        greeting.style.opacity = '1';
        greeting.style.transform = 'translateY(0)';
        
        // Then start typing effect
        setTimeout(() => {
          const characters = currentGreeting.text.split('');
          let charIndex = 0;
          
          // Typing animation
          const typeNextChar = () => {
            if (charIndex < characters.length) {
              greeting.textContent += characters[charIndex];
              charIndex++;
              setTimeout(typeNextChar, greetingAnimation.typingSpeed);
            } else {
              // Typing completed, add emoji with float animation
              const emojiSpan = document.createElement('span');
              emojiSpan.className = 'greeting-emoji';
              emojiSpan.textContent = currentGreeting.emoji;
              greeting.appendChild(emojiSpan);
              
              // Apply subtle color theme
              document.documentElement.style.setProperty('--theme-color', currentGreeting.theme);
              
              // Remove cursor when complete
              setTimeout(() => {
                cursor.style.display = 'none';
              }, 1500);
            }
          };
          
          // Start typing and add cursor
          greeting.textContent = '';
          greeting.appendChild(cursor);
          typeNextChar();
        }, greetingAnimation.fadeInDuration);
        
      }, 300); // Short delay before starting animations
      
      // Update greeting periodically (every hour)
      setInterval(() => {
        const newGreeting = getGreetingByHour();
        
        // Only update if greeting has changed
        if (greeting.textContent.indexOf(newGreeting.text) === -1) {
          // Fade out
          greeting.style.opacity = '0';
          greeting.style.transform = 'translateY(-20px)';
          
          // Update content and fade back in
          setTimeout(() => {
            greeting.textContent = newGreeting.text;
            const emojiSpan = document.createElement('span');
            emojiSpan.className = 'greeting-emoji';
            emojiSpan.textContent = newGreeting.emoji;
            greeting.appendChild(emojiSpan);
            
            // Apply new theme color
            document.documentElement.style.setProperty('--theme-color', newGreeting.theme);
            
            // Fade back in
            greeting.style.opacity = '1';
            greeting.style.transform = 'translateY(0)';
          }, greetingAnimation.fadeInDuration);
        }
      }, 60 * 60 * 1000); // Check every hour
    });
  })();

  document.addEventListener("DOMContentLoaded", function () {
    const text = "Tech Enthusiast";
    const speed = 100;
    let index = 0;

    function type() {
      if (index < text.length) {
        document.querySelector(".desc").textContent += text.charAt(index);
        index++;
        setTimeout(type, speed);
      }
    }

    type();
  });

  //script for about section

  // Add to existing Intersection Observer
  document.addEventListener('DOMContentLoaded', () => {
    // Hero Section Functionality
    function updateGreeting() {
        const hour = new Date().getHours();
        const greeting = document.querySelector('.greeting');
        let message;
        
        if(hour >= 5 && hour < 12) message = "Good Morning ☀️";
        else if(hour >= 12 && hour < 18) message = "Good Afternoon 🌤️";
        else message = "Good Evening 🌙";

        if(greeting) {
            greeting.innerHTML = message;
            greeting.classList.add('show');
        }
    }

    // Initialize Greeting
    updateGreeting();
    setInterval(updateGreeting, 1000 * 60 * 60);

    // Profile Image Hover
    const profileImg = document.querySelector('.profile-img');
    if(profileImg) {
        profileImg.addEventListener('mouseover', () => {
            profileImg.style.transform = 'scale(1.1) rotate(2deg)';
        });
        profileImg.addEventListener('mouseout', () => {
            profileImg.style.transform = 'scale(1) rotate(0)';
        });
    }

    // About Section 3D Effect
    const bioImage = document.querySelector('.bio-image');
    if(bioImage) {
        bioImage.addEventListener('mousemove', (e) => {
            const rect = bioImage.getBoundingClientRect();
            const xAxis = (rect.width/2 - (e.clientX - rect.left)) / 25;
            const yAxis = (rect.height/2 - (e.clientY - rect.top)) / 25;
            bioImage.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });

        bioImage.addEventListener('mouseleave', () => {
            bioImage.style.transform = 'rotateY(0) rotateX(0)';
        });
    }

    // Intersection Observer Setup
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    // Observe All Animated Elements
    document.querySelectorAll('.fade-up, [class*="fade"]').forEach((el) => {
        observer.observe(el);
    });
});

// Animation and responsive behavior script for About section
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initFadeAnimations();
    
    // Handle scroll events for animations
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Trigger initial animations
    setTimeout(() => {
      handleScrollAnimations();
    }, 100);
    
    // Add interactive hover effects to skill tags
    initSkillTagEffects();
  });
  
  // Function to initialize fade animations
  function initFadeAnimations() {
    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(element => {
      // Set initial state with slight delay variation for staggered effect
      const delay = Array.from(fadeElements).indexOf(element) * 100;
      element.style.transitionDelay = `${delay}ms`;
    });
  }
  
  // Function to handle scroll animations
  function handleScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-up');
    
    fadeElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('active');
      }
    });
  }
  
  // Function to add interactive effects to skill tags
  function initSkillTagEffects() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
      tag.addEventListener('mouseover', function() {
        // Create subtle pulse effect for other tags
        skillTags.forEach(otherTag => {
          if (otherTag !== tag) {
            otherTag.style.opacity = '0.7';
          }
        });
      });
      
      tag.addEventListener('mouseout', function() {
        // Reset all tags
        skillTags.forEach(otherTag => {
          otherTag.style.opacity = '1';
        });
      });
    });
    
    // Add parallax effect to bio-visual on mouse move
    const bioVisual = document.querySelector('.bio-visual');
    if (bioVisual) {
      document.addEventListener('mousemove', function(e) {
        // Only apply on desktop
        if (window.innerWidth > 900) {
          const mouseX = e.clientX / window.innerWidth - 0.5;
          const mouseY = e.clientY / window.innerHeight - 0.5;
          
          const bioImage = bioVisual.querySelector('.bio-image');
          const bioShape = bioVisual.querySelector('.bio-shape');
          
          if (bioImage && bioShape) {
            // Subtle movement based on mouse position
            bioImage.style.transform = `translateX(${mouseX * 15}px) translateY(${mouseY * 15}px)`;
            bioShape.style.transform = `translateX(${mouseX * -20}px) translateY(${mouseY * -20}px)`;
          }
        }
      });
    }
    
    // Add download animation for CV button
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', function(e) {
        // Add button press animation
        this.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
          this.style.transform = '';
        }, 150);
      });
    }
  }
  
  // Function to check if device is mobile
  function isMobile() {
    return window.innerWidth <= 900;
  }
  
  // Handle responsive behavior
  window.addEventListener('resize', function() {
    // Reset parallax effects on smaller screens
    if (isMobile()) {
      const bioImage = document.querySelector('.bio-image');
      const bioShape = document.querySelector('.bio-shape');
      
      if (bioImage) bioImage.style.transform = '';
      if (bioShape) bioShape.style.transform = '';
    }
  });





  

  // education section
// Education & Skills Section JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // ... existing animateOnScroll function ...

  // Animate skill tags with staggered appearance
  const animateSkillTags = () => {
      const skillTags = document.querySelectorAll('.skill-tag');
      const skillsSection = document.querySelector('.skills-section');

      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  skillTags.forEach((tag, index) => {
                      setTimeout(() => {
                          tag.style.opacity = "1";
                          tag.style.transform = "translateY(0)";
                      }, index * 100); // 100ms stagger between tags
                  });
                  observer.unobserve(entry.target);
              }
          });
      }, { threshold: 0.25 });

      if (skillsSection) {
          // Initial hidden state
          skillTags.forEach(tag => {
              tag.style.opacity = "0";
              tag.style.transform = "translateY(15px)";
              tag.style.transition = "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
          });
          
          observer.observe(skillsSection);
      }
  };

  // Initialize both animation systems
  animateOnScroll();
  animateSkillTags();
});












document.addEventListener('DOMContentLoaded', function() {
  const projectCards = document.querySelectorAll('.project-card');
  
  // Observer for scroll-based animations
  const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
              setTimeout(() => {
                  entry.target.style.animation = `slideUp 0.8s ease forwards`;
                  entry.target.style.opacity = '1';
                  
                  // Handle desktop frames
                  const desktop = entry.target.querySelector('.desktop');
                  if (desktop) {
                      setTimeout(() => {
                          desktop.classList.add('active');
                          desktop.style.animation = 'slideInFromBottom 0.7s ease forwards';
                      }, 400);
                  } else {
                      // Handle phone animations
                      const leftPhone = entry.target.querySelector('.phone-left');
                      const rightPhone = entry.target.querySelector('.phone-right');
                      
                      if (leftPhone && rightPhone) {
                          setTimeout(() => {
                              leftPhone.classList.add('active');
                              leftPhone.style.animation = 'slideInFromLeft 0.7s ease forwards';
                          }, 400);
                          
                          setTimeout(() => {
                              rightPhone.classList.add('active');
                              rightPhone.style.animation = 'slideInFromRight 0.7s ease forwards';
                          }, 600);
                      }
                  }
              }, index * 150);
              observer.unobserve(entry.target);
          }
      });
  }, { root: null, threshold: 0.15, rootMargin: '-50px' });
  
  projectCards.forEach(card => observer.observe(card));
  
  // Hover effects for phones and desktop frames
  projectCards.forEach(card => {
      const desktop = card.querySelector('.desktop');
      const phones = card.querySelectorAll('.phone');
      
      card.addEventListener('mousemove', (e) => {
          const { left, top, width, height } = card.getBoundingClientRect();
          const x = e.clientX - left;
          const y = e.clientY - top;
          
          const rotateX = ((y - height / 2) / height) * 5;
          const rotateY = ((x - width / 2) / width) * 5;
          
          if (desktop && desktop.classList.contains('active')) {
              desktop.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
          }
          
          phones.forEach(phone => {
              if (phone.classList.contains('active')) {
                  const isLeft = phone.classList.contains('phone-left');
                  const baseRotateY = isLeft ? 15 : -15;
                  phone.style.transform = `perspective(1200px) rotateY(${baseRotateY}deg)`;
              }
          });
      });
      
      card.addEventListener('mouseleave', () => {
          if (desktop) desktop.style.transform = 'translateY(0)';
          phones.forEach(phone => phone.style.transform = 'perspective(1200px) rotateY(0)');
      });
  });
  
  // Resize handler for desktop and phone frames
  function adjustContainers() {
      const desktopContainers = document.querySelectorAll('.desktop-container');
      desktopContainers.forEach(container => {
          const containerWidth = container.offsetWidth;
          const desktop = container.querySelector('.desktop');
          if (desktop) {
              if (containerWidth < 400) {
                  desktop.style.width = `${Math.min(280, containerWidth * 0.8)}px`;
                  desktop.querySelector('.desktop-screen').style.height = `${Math.min(170, containerWidth * 0.8 * 0.6)}px`;
              } else {
                  const defaultWidth = window.innerWidth > 1024 ? '400px' : window.innerWidth > 768 ? '320px' : '280px';
                  const defaultHeight = window.innerWidth > 1024 ? '250px' : window.innerWidth > 768 ? '200px' : '170px';
                  desktop.style.width = defaultWidth;
                  desktop.querySelector('.desktop-screen').style.height = defaultHeight;
              }
          }
      });
  }
  
  adjustContainers();
  window.addEventListener('resize', adjustContainers);
});






// for dark and light mode

document.addEventListener('DOMContentLoaded', function () {
  const themeToggle = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme');

  // Check if a theme is already set in localStorage
  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon for dark mode
    }
  }

  // Toggle theme on button click
  themeToggle.addEventListener('click', function () {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'light');
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Moon icon for light mode
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon for dark mode
      localStorage.setItem('theme', 'dark');
    }
  });
  
});




document.addEventListener('DOMContentLoaded', function() {
  // Select all indicator links in the mobile version
  const mobileIndicators = document.querySelectorAll('.mobile-sticky-indicators ul li a');
  
  // Get all sections that the indicators point to
  const sections = [];
  mobileIndicators.forEach(indicator => {
    const sectionId = indicator.getAttribute('href');
    if (sectionId && sectionId.startsWith('#')) {
      const section = document.querySelector(sectionId);
      if (section) {
        sections.push({
          id: sectionId,
          element: section,
          indicator: indicator
        });
      }
    }
  });
  
  // Function to set active indicator with smooth transitions
  function setActiveIndicator(indicator, skipScroll = false) {
    // Don't do anything if indicator is already active
    if (indicator.classList.contains('active')) return;
    
    // Remove active class from all indicators with smooth transitions
    mobileIndicators.forEach(ind => {
      ind.classList.remove('active');
      // Use CSS transitions for smooth width changes
      ind.style.transition = 'width 0.3s ease, background-color 0.3s ease';
      ind.style.width = '40px';
      
      const span = ind.querySelector('span');
      if (span) {
        span.style.transition = 'opacity 0.3s ease';
        span.style.opacity = '0';
        // Small delay before hiding to allow fade out
        setTimeout(() => {
          if (!ind.classList.contains('active')) {
            span.style.display = 'none';
          }
        }, 300);
      }
    });
    
    // Add active class to current indicator
    indicator.classList.add('active');
    indicator.style.width = '120px';
    
    // Show text span for active indicator with fade in
    const span = indicator.querySelector('span');
    if (span) {
      span.style.display = 'inline-block';
      span.style.marginLeft = '8px';
      // Small delay to ensure display property is applied before opacity transition
      setTimeout(() => {
        span.style.opacity = '1';
      }, 10);
    }
    
    // Smooth scroll to section when clicked (not during regular scrolling)
    if (!skipScroll) {
      const targetId = indicator.getAttribute('href');
      if (targetId) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          // Prevent default behavior to handle our own smooth scrolling
          event.preventDefault();
          window.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
          });
        }
      }
    }
  }
  
  // Use a throttled scroll event for better performance
  let scrollTimeout;
  function throttledScroll() {
    if (scrollTimeout) return;
    
    scrollTimeout = setTimeout(() => {
      updateIndicatorsByScroll();
      scrollTimeout = null;
    }, 100); // Adjust throttle time as needed for performance vs. responsiveness
  }
  
  // Function to check which section is in viewport
  function updateIndicatorsByScroll() {
    // Get current scroll position
    const scrollPosition = window.scrollY + window.innerHeight / 3;
    
    // Find the current section in view
    let currentSection = null;
    
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i].element;
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        currentSection = sections[i];
        break;
      }
    }
    
    // Handle edge cases
    if (!currentSection && window.scrollY < 100 && sections.length > 0) {
      currentSection = sections[0];
    }
    else if (!currentSection && window.scrollY + window.innerHeight >= document.body.offsetHeight - 100 && sections.length > 0) {
      currentSection = sections[sections.length - 1];
    }
    
    // Update active indicator if a section is found
    if (currentSection) {
      setActiveIndicator(currentSection.indicator, true); // Skip scrolling when called from scroll event
    }
  }
  
  // Add hover functionality to indicators
  mobileIndicators.forEach(indicator => {
    // Hover functionality with transitions
    indicator.addEventListener('mouseenter', function() {
      // Only apply hover effects to non-active indicators
      if (!this.classList.contains('active')) {
        this.style.transition = 'width 0.3s ease';
        this.style.width = '120px';
        
        const span = this.querySelector('span');
        if (span) {
          span.style.display = 'inline-block';
          span.style.marginLeft = '8px';
          setTimeout(() => {
            span.style.transition = 'opacity 0.3s ease';
            span.style.opacity = '1';
          }, 10);
        }
      }
    });
    
    indicator.addEventListener('mouseleave', function() {
      if (!this.classList.contains('active')) {
        this.style.transition = 'width 0.3s ease';
        this.style.width = '40px';
        
        const span = this.querySelector('span');
        if (span) {
          span.style.transition = 'opacity 0.3s ease';
          span.style.opacity = '0';
          setTimeout(() => {
            if (!this.classList.contains('active')) {
              span.style.display = 'none';
            }
          }, 300);
        }
      }
    });
    
    // Click functionality
    indicator.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent default jump
      setActiveIndicator(this); // Will handle smooth scroll
    });
  });
  
  // Use throttled scroll event for better performance
  window.addEventListener('scroll', throttledScroll);
  
  // Initial check to set the correct indicator on page load
  updateIndicatorsByScroll();
});




//greeting
document.addEventListener('DOMContentLoaded', function() {
  // Get the elements
  const helloText = document.querySelector('.hello-text');
  const hello2Text = document.querySelector('.hello2-text');
  
  // Make sure the elements exist before trying to modify them
  if (!helloText || !hello2Text) {
    console.error('Could not find required elements');
    return;
  }
  // Set greeting based on time of day with emoji
  const hour = new Date().getHours();
  let greeting;
  
  if (hour >= 5 && hour < 12) {
    greeting = 'Good Morning ☀️';
  } else if (hour >= 12 && hour < 18) {
    greeting = 'Good Afternoon 🌤️';
  } else {
    greeting = 'Good Evening 🌙';
  }
  
  // Add greeting and start animation
  helloText.innerHTML = greeting;
  helloText.classList.add('fade-up');
  
  // Set text for typing animation
  hello2Text.textContent = "Hi, there";
  hello2Text.classList.add('typing');
  
  // Make cursor invisible after typing animation completes
  const typingDuration = 2500; // Match your CSS animation duration (in ms)
  setTimeout(() => {
    hello2Text.style.borderRight = 'none';
  }, typingDuration);
});




// scattering of icons

  document.addEventListener("DOMContentLoaded", function () {
    const hero = document.querySelector(".hero");
    const icons = hero.querySelectorAll(".coder-icon");

    icons.forEach((icon) => {
      // Randomize position within the hero section
      const randomX = Math.random() * (hero.offsetWidth - 32); // 32 = icon size
      const randomY = Math.random() * (hero.offsetHeight - 32);

      // Apply random position
      icon.style.left = `${randomX}px`;
      icon.style.top = `${randomY}px`;
    });
  });
