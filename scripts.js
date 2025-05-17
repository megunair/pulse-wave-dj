// PULSE//WAVE DJ - Interactive Elements & Effects

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive elements and effects
  initializeGlitchEffects();
  initializeParallaxEffects();
  initializeTerminalEffects();
  initializeHoverEffects();
  addRandomNoiseDistortion();
});

// Create the cyberpunk glitch effects on certain elements
function initializeGlitchEffects() {
  // Random glitch effects for hero elements
  const heroElements = document.querySelectorAll('.hero-content h1, .hero-content h2');
  
  heroElements.forEach(element => {
    // Add glitch class for styling hooks
    element.classList.add('glitch-text');
    
    // Create glitch event at random intervals
    setInterval(() => {
      if (Math.random() > 0.97) { // Occasional glitch
        element.classList.add('glitching');
        
        // Remove glitch class after short duration
        setTimeout(() => {
          element.classList.remove('glitching');
        }, 200 + Math.random() * 400);
      }
    }, 2000);
  });
}

// Add subtle parallax effects to sections on scroll
function initializeParallaxEffects() {
  const heroImage = document.querySelector('.hero-image');
  const specsItems = document.querySelectorAll('.spec-item');
  const featureCards = document.querySelectorAll('.feature-card');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Parallax for hero image
    if (heroImage) {
      heroImage.style.transform = `translateY(${scrollY * 0.05}px)`;
    }
    
    // Staggered reveal for spec items
    specsItems.forEach((item, index) => {
      const delay = index * 100;
      const startPos = item.getBoundingClientRect().top + window.scrollY - window.innerHeight;
      
      if (scrollY > startPos) {
        setTimeout(() => {
          item.classList.add('revealed');
        }, delay);
      }
    });
    
    // Subtle float effect for feature cards
    featureCards.forEach((card, index) => {
      const offset = Math.sin((scrollY / 500) + (index / 2)) * 10;
      card.style.transform = `translateY(${offset}px)`;
    });
  });
}

// Terminal typing effect for the code terminal display
function initializeTerminalEffects() {
  const terminalLines = document.querySelectorAll('.terminal-line');
  
  // Hide all lines initially
  terminalLines.forEach(line => {
    line.style.opacity = '0';
    line.style.transform = 'translateY(10px)';
    line.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  });
  
  // Reveal lines sequentially with typing effect
  let lineIndex = 0;
  const terminalInterval = setInterval(() => {
    if (lineIndex >= terminalLines.length) {
      clearInterval(terminalInterval);
      
      // Add blinking cursor to the last line
      const lastLine = terminalLines[terminalLines.length - 1];
      lastLine.innerHTML += '<span class="cursor">_</span>';
      
      // Blink the cursor
      setInterval(() => {
        const cursor = document.querySelector('.cursor');
        if (cursor) {
          cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        }
      }, 500);
      
      return;
    }
    
    const line = terminalLines[lineIndex];
    line.style.opacity = '1';
    line.style.transform = 'translateY(0)';
    
    // Simulate typing by revealing characters sequentially
    if (line.innerHTML.includes('$>')) {
      // Command lines appear at once
      lineIndex++;
    } else {
      // Output lines appear with typing effect
      simulateTyping(line.textContent, line);
      lineIndex++;
    }
  }, 500);
}

// Simulate typing effect for terminal lines
function simulateTyping(text, element) {
  element.textContent = '';
  let charIndex = 0;
  
  const typingInterval = setInterval(() => {
    if (charIndex >= text.length) {
      clearInterval(typingInterval);
      return;
    }
    
    element.textContent += text.charAt(charIndex);
    charIndex++;
  }, 30);
}

// Enhanced hover effects for buttons and interactive elements
function initializeHoverEffects() {
  // CTA buttons pulse effect
  const ctaButtons = document.querySelectorAll('.cta-button');
  
  ctaButtons.forEach(button => {
    button.addEventListener('mouseover', () => {
      button.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      button.style.transform = 'scale(1.05)';
    });
    
    button.addEventListener('mouseout', () => {
      button.style.transition = 'all 0.3s ease';
      button.style.transform = 'scale(1)';
    });
  });
  
  // Feature cards glow effect
  const featureCards = document.querySelectorAll('.feature-card');
  
  featureCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate angle for gradient
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const angleX = (x - centerX) / centerX;
      const angleY = (y - centerY) / centerY;
      
      // Apply highlight effect
      card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 255, 136, 0.15), rgba(0, 0, 0, 0) 50%)`;
      card.style.boxShadow = `0 5px 15px rgba(0, 0, 0, 0.3), 0 0 30px rgba(0, 255, 136, ${0.1 + Math.abs(angleX) * 0.1 + Math.abs(angleY) * 0.1})`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.background = 'rgba(0, 255, 136, 0.03)';
      card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
    });
  });
  
  // Nav items glow effect
  const navItems = document.querySelectorAll('.nav-item');
  
  navItems.forEach(item => {
    const indicator = item.querySelector('.nav-indicator');
    
    item.addEventListener('mouseover', () => {
      navItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.style.opacity = '0.5';
        }
      });
      
      if (indicator) {
        indicator.style.transform = 'scale(1.5)';
      }
    });
    
    item.addEventListener('mouseout', () => {
      navItems.forEach(otherItem => {
        otherItem.style.opacity = '1';
      });
      
      if (indicator) {
        indicator.style.transform = 'scale(1)';
      }
    });
  });
}

// Add subtle noise/distortion effects to enhance cyberpunk feel
function addRandomNoiseDistortion() {
  // Create glitch overlay with scanlines
  const glitchOverlay = document.querySelector('.glitch-overlay');
  
  // Random static noise effect occasionally
  setInterval(() => {
    if (Math.random() > 0.95) {
      glitchOverlay.style.backgroundImage = "url('data:image/png;base64,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')";
      glitchOverlay.style.opacity = '0.7';
      
      setTimeout(() => {
        glitchOverlay.style.backgroundImage = "repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.11) 0px, rgba(0, 0, 0, 0.11) 1px, transparent 1px, transparent 2px)";
        glitchOverlay.style.opacity = '0.4';
      }, 100);
    }
  }, 5000);
  
  // Random color shift effect on logos and indicators
  const indicators = document.querySelectorAll('.logo-indicator, .nav-indicator, .button-indicator, .spec-indicator, .icon-indicator');
  
  setInterval(() => {
    if (Math.random() > 0.97) {
      indicators.forEach(indicator => {
        // Random RGB shift
        const r = Math.floor(Math.random() * 100);
        const g = Math.floor(Math.random() * 155) + 100; // Keep green dominant
        const b = Math.floor(Math.random() * 100);
        
        indicator.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        indicator.style.boxShadow = `0 0 10px rgb(${r}, ${g}, ${b}), 0 0 20px rgba(${r}, ${g}, ${b}, 0.3)`;
        
        setTimeout(() => {
          indicator.style.backgroundColor = '';
          indicator.style.boxShadow = '';
        }, 300);
      });
    }
  }, 3000);
  
  // Create data visualization in the terminal
  createDataVisualization();
}

// Create a simple audio spectrum visualization
function createDataVisualization() {
  // Check if terminal exists
  const terminalContent = document.querySelector('.terminal-content');
  if (!terminalContent) return;
  
  // Create visualization container
  const visualizationContainer = document.createElement('div');
  visualizationContainer.className = 'visualization-container';
  visualizationContainer.style.height = '40px';
  visualizationContainer.style.marginTop = '10px';
  visualizationContainer.style.display = 'flex';
  visualizationContainer.style.alignItems = 'flex-end';
  visualizationContainer.style.justifyContent = 'space-between';
  
  // Create visualization bars
  const barsCount = 16;
  for (let i = 0; i < barsCount; i++) {
    const bar = document.createElement('div');
    bar.className = 'visualization-bar';
    bar.style.width = `${100 / barsCount - 1}%`;
    bar.style.height = '5px';
    bar.style.backgroundColor = 'var(--color-primary)';
    bar.style.boxShadow = 'var(--glow-primary)';
    bar.style.transition = 'height 0.1s ease';
    visualizationContainer.appendChild(bar);
  }
  
  // Add to terminal
  setTimeout(() => {
    terminalContent.appendChild(document.createElement('br'));
    terminalContent.appendChild(visualizationContainer);
    
    // Animate visualization
    animateVisualization();
  }, 10000);
  
  function animateVisualization() {
    const bars = document.querySelectorAll('.visualization-bar');
    
    setInterval(() => {
      bars.forEach(bar => {
        // Random height
        const height = Math.floor(Math.random() * 35) + 5;
        bar.style.height = `${height}px`;
      });
    }, 100);
  }
}

// Add mousemove light effect to the hero section
document.addEventListener('mousemove', (e) => {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  
  const x = e.clientX;
  const y = e.clientY;
  
  const rect = hero.getBoundingClientRect();
  if (y >= rect.top && y <= rect.bottom) {
    // Create spotlight effect following cursor
    const spotlightX = ((x - rect.left) / rect.width) * 100;
    const spotlightY = ((y - rect.top) / rect.height) * 100;
    
    hero.style.background = `radial-gradient(circle at ${spotlightX}% ${spotlightY}%, rgba(0, 255, 136, 0.05), rgba(0, 0, 0, 0) 40%)`;
  }
});

// Implement smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      // Add glitch effect during scroll
      document.querySelector('.glitch-overlay').style.opacity = '0.7';
      
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Account for fixed header
        behavior: 'smooth'
      });
      
      // Reset overlay opacity after scroll
      setTimeout(() => {
        document.querySelector('.glitch-overlay').style.opacity = '0.4';
      }, 500);
    }
  });
});
