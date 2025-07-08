let fontSize = 16;

function changeFontSize(delta) {
  fontSize = Math.max(12, Math.min(22, fontSize + delta));
  document.documentElement.style.fontSize = fontSize + 'px';
}

function resetFontSize() {
  fontSize = 16;
  document.documentElement.style.fontSize = fontSize + 'px';
}


function setTheme(mode) {
  document.body.classList.remove('light-mode', 'dark-mode');
  document.body.classList.add(`${mode}-mode`);
}

function toggleLanguage() {
  const currentLang = document.documentElement.getAttribute('data-lang') || 'en';
  const newLang = currentLang === 'en' ? 'hi' : 'en';
  document.documentElement.setAttribute('data-lang', newLang);

  // Update all static elements
  document.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = el.dataset[newLang];
  });

  // Bold current lang in toggle
  document.getElementById('lang-en').style.fontWeight = newLang === 'en' ? 'bold' : 'normal';
  document.getElementById('lang-hi').style.fontWeight = newLang === 'hi' ? 'bold' : 'normal';

  // Update dynamic FAQs
  loadFAQs();
}

function showForm(id) {
  document.getElementById(`${id}-form`).classList.remove('hidden');
  generateCaptcha(id);
}
function hideForm(id) {
  document.getElementById(`${id}-form`).classList.add('hidden');
}

function generateCaptcha(id) {
  const canvas = document.getElementById(`captchaCanvas-${id}`);
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let captcha = '';
  for (let i = 0; i < 5; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  ctx.font = '24px Arial';
  ctx.fillStyle = '#fff'; // White text on black background
  ctx.fillText(captcha, 10, 30);

}

function scrollToFaq() {
  document.getElementById('faq-section').scrollIntoView({ behavior: 'smooth' });
}

// ================== FAQ Logic ====================
const faqs = [
  {
    en: "How can I join DRDO?",
    hi: "मैं डीआरडीओ में कैसे शामिल हो सकता हूं?",
    enAns: "DRDO has RAC for Scientists (Group 'A') and CEPTAM for DRTC/Admin & Allied (Group ‘B’ and ‘C’) recruitment.",
    hiAns: "DRDO में वैज्ञानिकों के लिए RAC और DRTC, व्यवस्थापक और संबद्ध कैडर के लिए CEPTAM है।"
  },
  {
    en: "What are the pay scales of scientists/technical staff at various levels?",
    hi: "विभिन्न स्तरों पर वैज्ञानिकों/तकनीकी कर्मचारियों के वेतनमान क्या हैं?",
    enAns: "Visit https://rac.gov.in for complete information.",
    hiAns: "पूरी जानकारी के लिए https://rac.gov.in पर जाएं।"
  },
  {
    en: "How can I apply for JRF/SRF/RA/Apprentice Schemes in DRDO?",
    hi: "मैं डीआरडीओ में जेआरएफ/एसआरएफ/आरए/अपरेंटिस योजनाओं के लिए आवेदन कैसे कर सकता हूं?",
    enAns: "Check 'What’s New' section on DRDO website or specific lab pages.",
    hiAns: "DRDO वेबसाइट या प्रयोगशाला पृष्ठों के 'What's New' अनुभाग की जाँच करें।"
  },
  {
    en: "What are various modes of induction of scientists into DRDO system?",
    hi: "डीआरडीओ प्रणाली में वैज्ञानिकों को शामिल करने के विभिन्न तरीके क्या हैं?",
    enAns: "Lateral Recruitment, Talent Search Scheme (NRIs), Deputation & Absorption.",
    hiAns: "पार्श्व भर्ती, प्रतिभा खोज योजना (एनआरआई), तिनियुक्ति और अवशोषण।"
  },
  {
    en: "I have experience in R&D. Can I join DRDO at a higher post?",
    hi: "क्या मैं अनुसंधान अनुभव के साथ उच्च पद पर DRDO में शामिल हो सकता हूं?",
    enAns: "Yes, via Lateral Recruitment or Talent Search Scheme based on experience.",
    hiAns: "हाँ, अनुभव के आधार पर पार्श्व भर्ती या प्रतिभा खोज योजना के माध्यम से।"
  },
  {
    en: "How can I contact DRDO for recruitment-related queries?",
    hi: "मैं भर्ती संबंधित प्रश्नों के लिए DRDO से कैसे संपर्क कर सकता हूं?",
    enAns: "Visit www.rac.gov.in/feedback_form.",
    hiAns: "www.rac.gov.in/feedback_form पर जाएं।"
  },
  {
    en: "Where are the labs of DRDO situated?",
    hi: "डीआरडीओ की प्रयोगशालाएँ कहाँ स्थित हैं?",
    enAns: "DRDO labs are spread across India.",
    hiAns: "DRDO की प्रयोगशालाएँ पूरे भारत में फैली हुई हैं।"
  },
  {
    en: "What is the procedure for doing summer training in DRDO?",
    hi: "DRDO में समर ट्रेनिंग करने की प्रक्रिया क्या है?",
    enAns: "Apply to Director of lab as per your discipline via https://drdo.gov.in.",
    hiAns: "अपने विषय के अनुसार प्रयोगशाला निदेशक को https://drdo.gov.in के माध्यम से आवेदन करें।"
  },
  {
    en: "Is experience required to be a scientist in DRDO?",
    hi: "DRDO में वैज्ञानिक बनने के लिए अनुभव की आवश्यकता है?",
    enAns: "No for Scientist B. Required for higher posts as per guidelines.",
    hiAns: "Scientist B के लिए नहीं, उच्च पदों के लिए दिशा-निर्देश अनुसार अनुभव आवश्यक है।"
  },
  {
    en: "I am a journalist, how can I get DRDO news?",
    hi: "मैं पत्रकार हूँ, DRDO की खबरें कैसे प्राप्त करूं?",
    enAns: "Visit the Press Release section on DRDO website.",
    hiAns: "DRDO वेबसाइट के प्रेस विज्ञप्ति अनुभाग पर जाएं।"
  },
  {
    en: "I am a vendor, how can I sell to DRDO?",
    hi: "मैं एक विक्रेता हूं, DRDO को कैसे बेच सकता हूं?",
    enAns: "Register under Procurement section of DRDO website.",
    hiAns: "DRDO वेबसाइट के प्रोक्योरमेंट सेक्शन में पंजीकरण करें।"
  },
  {
    en: "I’m a research scholar. How to know about grants/scholarships?",
    hi: "मैं एक शोध विद्वान हूं। अनुदान/छात्रवृत्ति के बारे में कैसे जानें?",
    enAns: "Check www.drdo.gov.in for project opportunities.",
    hiAns: "परियोजना अवसरों के लिए www.drdo.gov.in पर जाएं।"
  },
  {
    en: "How to publish my research paper in DRDO journals?",
    hi: "मैं अपने शोध पत्र को DRDO पत्रिकाओं में कैसे प्रकाशित करूं?",
    enAns: "Visit https://publications.drdo.gov.in for process and submission.",
    hiAns: "प्रक्रिया और सबमिशन के लिए https://publications.drdo.gov.in पर जाएं।"
  },
  {
    en: "Is DRDO providing stipend for summer training?",
    hi: "क्या DRDO समर ट्रेनिंग के लिए स्टाइपेंड देता है?",
    enAns: "No.",
    hiAns: "नहीं।"
  },
  {
    en: "Does DRDO outsource manpower for projects?",
    hi: "क्या DRDO परियोजनाओं के लिए मैनपावर आउटसोर्स करता है?",
    enAns: "Yes, through tenders at https://eprocure.gov.in if required.",
    hiAns: "हाँ, आवश्यकता होने पर https://eprocure.gov.in पर निविदाएं प्रकाशित होती हैं।"
  }
];

function loadFAQs() {
  const container = document.getElementById('faq-container');
  const lang = document.documentElement.getAttribute('data-lang') || 'en';
  container.innerHTML = '';

  faqs.forEach((faq, index) => {
    const item = document.createElement('div');
    item.className = 'faq-item';
    item.innerHTML = `
      <div class="faq-question" data-index="${index}">
        <span class="faq-arrow">⟳</span>
        <span class="text">${faq[lang]}</span>
      </div>
      <div class="faq-answer">${faq[lang + 'Ans']}</div>
    `;
    container.appendChild(item);
  });

  // Bind click events for new structure
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const clickedItem = question.parentElement;
      const clickedArrow = question.querySelector('.faq-arrow');

      // Collapse all others
      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== clickedItem) {
          item.classList.remove('open');
          item.querySelector('.faq-arrow').style.transform = 'rotate(0deg)';
        }
      });

      // Toggle clicked
      const isOpen = clickedItem.classList.toggle('open');
      clickedArrow.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';

      // Scroll to topbar
      const topbar = document.querySelector('.topbar');
      if (topbar) {
        topbar.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}


function toggleFAQ(el) {
  const parent = el.parentElement;
  const icon = el.querySelector('.icon');
  parent.classList.toggle('open');
  icon.textContent = parent.classList.contains('open') ? '➖' : '➕';
}

function filterFAQs() {
  const input = document.getElementById('faq-search').value.toLowerCase();
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question .text').textContent.toLowerCase();
    item.style.display = question.includes(input) ? 'block' : 'none';
  });
}

function handleCustomQuery(e) {
  e.preventDefault();
  const isLoggedIn = false; // fake login check
  if (!isLoggedIn) {
    showForm('login');
    return false;
  }
  alert("Query submitted!");
  return true;
}

// Load FAQs initially
window.onload = loadFAQs;

// ========== Tab Switcher Logic ==========
function switchTab(group, tab, el) {
  const buttons = document.querySelectorAll(`#${group}-tabs button`);
  const contents = document.querySelectorAll(`[id^="${group}-"]`);

  buttons.forEach(btn => btn.classList.remove('active'));
  contents.forEach(content => content.classList.remove('active'));

  document.getElementById(`${group}-${tab}`).classList.add('active');
  el.classList.add('active');
}

// ========== Ticker Click Safe Handling ==========
const ticker = document.querySelector('#ticker-content');
if (ticker) {
  ticker.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      console.log('News item clicked:', link.href);
    });
  });
}

// ========== Global Search Logic ==========

function performGlobalSearch(event) {
  event.preventDefault();
  const query = document.getElementById("globalSearchInput").value.trim().toLowerCase();

  if (!query) {
    alert("Please enter a search term.");
    return false;
  }

  // Simulated full-site search (you can later extend this to search real content)
  const sections = [
    "Welcome to DRDO - RCMA Portal",
    "Feedback",
    "FAQs",
    "Main Content",
    "About DRDO",
    "Contact",
    "Sitemap"
  ];

  const results = sections.filter(item => item.toLowerCase().includes(query));
  if (results.length > 0) {
    alert(`Found ${results.length} result(s):\n` + results.join("\n"));
  } else {
    alert("No results found on the website.");
  }

  return false;
}

// ========== Clock & Date ==========
function updateClock() {
  const now = new Date();

  // Clock
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  document.getElementById('live-clock').textContent = `${h}:${m}:${s}`;

  // Date
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  const dateStr = now.toLocaleDateString('en-GB', options);
  document.getElementById('live-date').textContent = dateStr;
}
setInterval(updateClock, 1000);
updateClock(); // init immediately

// ========== Calendar & To-Do ==========
function toggleCalendar() {
  const popup = document.getElementById('calendar-popup');
  popup.classList.toggle('hidden');
}

function showToDo() {
  const isLoggedIn = false; // Replace with actual auth logic
  if (!isLoggedIn) {
    alert("Please log in to access To-Do list.");
    showForm('login');
    return;
  }
  document.getElementById('todo-box').classList.remove('hidden');
}

function saveToDo() {
  const text = document.querySelector('#todo-box textarea').value;
  if (text.trim() === "") return alert("Task is empty!");
  alert("✅ Task saved: " + text);
  document.querySelector('#todo-box textarea').value = "";
}


  document.querySelectorAll('#ticker-content a').forEach(link => {
    link.addEventListener('click', () => {
      console.log('News item clicked:', link.href);
    });
  });


  function toggleMenu() {
    const menu = document.getElementById("dropdown");
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
  }

  function openFormGenerator() {
    const description = prompt("Describe the form you want (e.g., Leave Request, Asset Handover, Visitor Entry):");

    if (!description) return;

    // Sample form generation
    let sampleForm = `
      <h3>${description} Form</h3>
      <form>
        <label>Full Name:</label><br><input type="text" required><br>
        <label>Email:</label><br><input type="email" required><br>
        <label>Reason:</label><br><textarea rows="4" required></textarea><br>
        <button type="submit">Submit</button>
      </form>
    `;

    // Show sample form to admin
    const confirmForm = confirm("Form based on your description is ready. Click OK to generate link.");

    if (confirmForm) {
      // Example: Generate Google Form / Typeform / JotForm link dynamically later
      // For now, simulate with a dummy link
      const link = `https://drdo.forms.internal/${description.replace(/\s+/g, '-').toLowerCase()}`;

      alert("Form created! Use this link:\n" + link);

      // Optionally copy to clipboard
      navigator.clipboard.writeText(link).then(() => {
        console.log("Link copied to clipboard.");
      });
    }
  }

  function switchTab(group, tab, el) {
  const buttons = document.querySelectorAll(`#${group}-tabs button`);
  const contents = document.querySelectorAll(`[id^="${group}-"]`);

  buttons.forEach(btn => btn.classList.remove('active'));
  contents.forEach(content => content.classList.remove('active'));

  document.getElementById(`${group}-${tab}`).classList.add('active');
  el.classList.add('active');
}

function requireLogin(action) {
  alert("You need to be logged in to " + action + ".");
  showForm('login');
}

// =================== DRDO AI Chatbot Script ===================

document.addEventListener('DOMContentLoaded', () => {
  const chatForm = document.getElementById('chat-form');
  const chatBox = document.getElementById('chat-box');
  const userInput = document.getElementById('user-input');

  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const message = userInput.value.trim();
    if (!message) return;

    const userMsg = document.createElement("div");
    userMsg.className = "chat-msg user-msg";
    userMsg.innerHTML = `👤 <strong>You:</strong> ${message}`;
    chatBox.appendChild(userMsg);

    const botMsg = document.createElement("div");
    botMsg.className = "chat-msg ai-msg";
    botMsg.innerHTML = `🤖 <strong>AI:</strong> Thinking...`;
    chatBox.appendChild(botMsg);

    chatBox.scrollTop = chatBox.scrollHeight;
    userInput.value = '';

    try {
      const res = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      });

      const data = await res.json();
      botMsg.innerHTML = `🤖 <strong>AI:</strong> ${data.reply || "Sorry, no reply available."}`;
    } catch (err) {
      console.error("❌ Error contacting backend:", err);
      botMsg.innerHTML = `⚠️ <strong>AI:</strong> Something went wrong.`;
    }

    chatBox.scrollTop = chatBox.scrollHeight;
  });
});


// =================== Optional Clear Chat Function ===================

function clearChat() {
  const chatBox = document.getElementById('chat-box');
  if (chatBox) chatBox.innerHTML = '';
}

// =================== Image Slideshow ===================

let slideIndex = 0;
let slides = document.querySelectorAll(".slide");
let interval;

function showSlides() {
  slides.forEach((slide) => slide.classList.remove("active"));
  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].classList.add("active");
}

function startSlideshow() {
  interval = setInterval(showSlides, 3000);
}

if (slides.length > 0) {
  slides[0].classList.add("active");
  startSlideshow();
}


// Pause on hover
slideshow.addEventListener("mouseenter", () => clearInterval(interval));
slideshow.addEventListener("mouseleave", startSlideshow);

function sendMessage(event) {
  event.preventDefault();
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  const message = input.value.trim();
  if (!message) return;

  // User message
  const userMsg = document.createElement("div");
  userMsg.className = "chat-message user";
  userMsg.textContent = "👤 You: " + message;
  chatBox.appendChild(userMsg);

  // Placeholder AI response
  const botMsg = document.createElement("div");
  botMsg.className = "chat-message bot";
  botMsg.textContent = "🤖 AI: Thinking...";
  chatBox.appendChild(botMsg);

  // Change background to black for focus
  chatBox.style.backgroundColor = "#000";

  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  

  return false;
}

function clearChat() {
  document.getElementById("chat-box").innerHTML = "";
}

function toggleChat() {
  const box = document.querySelector(".chatbot-container");
  box.style.display = box.style.display === "none" ? "block" : "none";
}
function toggleVoice() {
  alert("🎤 Voice input coming soon! (Placeholder)");
}

function toggleCalendar() {
  const popup = document.getElementById('calendar-popup');
  popup.classList.toggle('show');
  popup.classList.toggle('hidden');
}


