
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
  const chatbotBody = document.getElementById('chatbot-body');
  chatbot.style.display = chatbot.style.display === 'flex' ? 'none' : 'flex';
  if (chatbot.style.display === 'flex') {
      chatbotBody.innerHTML = ""; // Clear previous messages
      displayBotMessage("Hello! How can I help you today?");
  }
}

function closechat() {
  document.getElementById('chatbot').style.display = 'none';
}

function displayBotMessage(message) {
  const chatbotBody = document.getElementById('chatbot-body');
  const botMessageDiv = document.createElement('div');
  botMessageDiv.classList.add('message', 'bot-message');
  botMessageDiv.innerHTML = message;
  chatbotBody.appendChild(botMessageDiv);
  chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

function sendMessage() {
  const userInput = document.getElementById('user-input').value.trim().toLowerCase();
  if (userInput) {
      const chatbotBody = document.getElementById('chatbot-body');
      const userMessageDiv = document.createElement('div');
      userMessageDiv.classList.add('message', 'user-message');
      userMessageDiv.textContent = userInput;
      chatbotBody.appendChild(userMessageDiv);
      document.getElementById('user-input').value = '';
      
      const typingIndicator = document.createElement('div');
      typingIndicator.classList.add('typing-indicator');
      typingIndicator.textContent = "Typing...";
      chatbotBody.appendChild(typingIndicator);
      chatbotBody.scrollTop = chatbotBody.scrollHeight;
      
      setTimeout(() => {
          chatbotBody.removeChild(typingIndicator);
          let response = "I'm not sure how to respond to that.";

      if (userInput.includes("hello") || userInput.includes("hi") || userInput.includes("hey")) {
        response = "Hi there! How can I assist you today?";
      } else if (userInput.includes("cv")) {
        response = "You can download the CV under the <a href='#resume'>Resume</a> section.";
      } else if (userInput.includes("bye")) {
        response = "Goodbye! Have a great day!";
      }else if (userInput.includes("certificates")) {
        response = "You can view my certificates  under the <a href='#certificate'>Certificate </a> section.";
      } else if (userInput.includes("thank you") || userInput.includes("thanks")) {
        response = "You're welcome! Let me know if you need anything else.";
      } else if (userInput.includes("exprience")) {
        response = "You can navigate to my summary to see my exprience history <a href='#resume'>Resume</a> section.";
      } else if (userInput.includes("skills")) {
        response = "I posses both soft and technical skills . You can navigate to the <a href='#skills'>Skills</a> page for more information about my skills .";
      } else if (userInput.includes("name")) {
        response = "My name is CK, Cavin's assistant. I'm here to help!";
      } else if (userInput.includes("tell me more about the profile")) {
        botResponse = "Motivated IT professional with a Diploma in Information Technology, specializing in Software Development. For more information, visit the <a href='#profile'>Profile</a> section.";
      } else if (userInput.includes("links")) {
        botResponse = "Click any icon below my profile picture to get redirected, or visit the <a href='#contact'>Contact</a> section for more details.";
      } else if (userInput.includes("contact")) {
        response = "To get a hold of Cavin, email him at calvinkhoza1998@gmail.com or visit the <a href='#contact'>Contact</a> page for further information.";
      } else if (userInput.includes("joke")) {
        response= "Why did the programmer quit their job? Because they didn't get arrays! 😆";
      } else if (userInput.includes("motivation") || userInput.includes("inspire me")) {
        response = "Nurture Your Mind With Great Thoughts, For You Will Never Go Any Higher Than You Think.";
      } else if (userInput.includes("education")) {
        response = "Cavin studied Computer Science at the Tshwane University of Technology, Pretoria, South Africa. For more info, check out the <a href='#resume'>Education</a> section.";
      } else if (userInput.includes("experience")) {
        response = "Cavin worked at a few companies and did a learnership at Gijima Technologies. For more details, click on the <a href='#resume'>Resume</a> section.";
      } else if (userInput.includes("profile")) {
        response = "This portfolio showcases Cavin Khoza’s professional profile, skills, education, and work experience. Explore it for more! You can visit the <a href='#about'>About</a> section.";
      }
          displayBotMessage(response);
      }, 1000);
  }
}

document.getElementById('user-input').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
      sendMessage();
  }
});

 document.getElementById("contact-form").addEventListener("submit", function(event) {
event.preventDefault(); // Prevents the form from actually submitting
        
            // Show the popup
  alert("Your message has been sent successfully!");
        
            // Clear the form after submission
  document.getElementById("contact-form").reset();
});
    