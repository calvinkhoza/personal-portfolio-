
(function() {
  "use strict";

  
  //Header toggle
   
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  
   // Hide mobile nav on same-page/hash links
   
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show'))
     {
        headerToggle();
      }
    });

  });

  
  //Toggle mobile nav dropdowns
   
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  
  //Preloader
   
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  
  //Scroll top button
   
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  
  //Animation on scroll function and init
   
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  
  //Init typed.js
   
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  
   //Initiate Pure Counter
   
  new PureCounter();

  
   //Animate the skills items on reveal
   
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  
   //Initiate glightbox 
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

   //Init isotope layout and filters
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  
   //Init swiper sliders

  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

   //Correct scrolling position upon page load for URLs containing hash links.
   
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  
   //Navmenu Scrollspy
   
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();
function toggleChatbot() {
  const chatbot = document.getElementById('chatbot');
  chatbot.style.display = chatbot.style.display === 'flex' ? 'none' : 'flex';
}

function closechat() {
  const closec = document.getElementById('chatbot');
  closec.style.display = closec.style.display === 'flex' ? 'none' : 'flex';
}

// Function to send message to chatbot
function sendMessage() {
  const userInput = document.getElementById('user-input').value.trim().toLowerCase(); 
  // Check if the user input is not empty
  if (userInput) {
    // Display user message
    const userMessageDiv = document.createElement('div');
    userMessageDiv.classList.add('message', 'user-message');
    userMessageDiv.textContent = userInput;
    document.getElementById('chatbot-body').appendChild(userMessageDiv);
    
    // Determine the bot's response based on user input
    setTimeout(() => {
      const botMessageDiv = document.createElement('div');
      botMessageDiv.classList.add('message', 'bot-message');
      
      let botResponse = "I'm not sure how to respond to that.";
      // Define responses with links for navigation
      if (userInput.includes("hello") || userInput.includes("hi") || userInput.includes("hey")) {
        botResponse = "Hi there! How can I assist you today?";
      } else if (userInput.includes("how are you")) {
        botResponse = "I'm great, thanks for asking! How about you?";
      } else if (userInput.includes("help")) {
        botResponse = "I'm here to help! What do you need assistance with?";
      } else if (userInput.includes("cv")) {
        botResponse = "You can download the CV under the <a href='#resume'>Resume</a> section.";
      } else if (userInput.includes("bye")) {
        botResponse = "Goodbye! Have a great day!";
      } else if (userInput.includes("thank you") || userInput.includes("thanks")) {
        botResponse = "You're welcome! Let me know if you need anything else.";
      } else if (userInput.includes("exprience")) {
        botResponse = "You can navigate to my summary to see my exprience history <a href='#resume'>Resume</a> section.";
      } else if (userInput.includes("skills")) {
        botResponse = "I posses both soft and technical skills . You can navigate to the <a href='#skills'>Skills</a> page for more information.";
      } else if (userInput.includes("name")) {
        botResponse = "My name is CK, Cavin's assistant. I'm here to help!";
      } else if (userInput.includes("tell me more about the profile")) {
        botResponse = "Motivated IT professional with a Diploma in Information Technology, specializing in Software Development. For more information, visit the <a href='#profile'>Profile</a> section.";
      } else if (userInput.includes("links")) {
        botResponse = "Click any icon below my profile picture to get redirected, or visit the <a href='#contact'>Contact</a> section for more details.";
      } else if (userInput.includes("contact")) {
        botResponse = "To get a hold of Cavin, email him at calvinkhoza1998@gmail.com or visit the <a href='#contact'>Contact</a> page for further information.";
      } else if (userInput.includes("joke")) {
        botResponse = "Why did the programmer quit their job? Because they didn't get arrays! 😆";
      } else if (userInput.includes("motivation") || userInput.includes("inspire me")) {
        botResponse = "Nurture Your Mind With Great Thoughts, For You Will Never Go Any Higher Than You Think.";
      } else if (userInput.includes("education")) {
        botResponse = "Cavin studied at the Tshwane University of Technology, Pretoria, South Africa. For more info, check out the <a href='#education'>Education</a> section.";
      } else if (userInput.includes("experience")) {
        botResponse = "Cavin worked at a few companies and did a learnership at Gijima Technologies. For more details, click on the <a href='#resume'>Resume</a> section.";
      } else if (userInput.includes("profile")) {
        botResponse = "This portfolio showcases Cavin Khoza’s professional profile, skills, education, and work experience. Explore it for more! You can visit the <a href='#profile'>Profile</a> section.";
      }

      // Display the bot response
      botMessageDiv.innerHTML = botResponse; 
      document.getElementById('chatbot-body').appendChild(botMessageDiv);

      // Scroll to the bottom of the chat
      document.getElementById('chatbot-body').scrollTop = document.getElementById('chatbot-body').scrollHeight;

    }, 500); 
    // Clear the input field after sending the message
    document.getElementById('user-input').value = '';
  }
}

// Event listener to allow "Enter" key to send the message
document.getElementById('user-input').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    sendMessage(); 
  }
});
