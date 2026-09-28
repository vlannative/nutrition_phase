// Shemomo Nutrition — shared site behaviour
// No build step, no dependencies. Safe to include on every page.

document.addEventListener('DOMContentLoaded', function () {
  // ---- Mobile nav toggle ----
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('nav.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // ---- Footer year ----
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // ---- Newsletter form (placeholder — wire up to Mailchimp/ConvertKit/Buttondown) ----
  var newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = form.querySelector('.form-msg');
      if (msg) {
        msg.textContent = 'Thanks — you\'re on the list. (Connect a real email provider before launch.)';
      }
      form.reset();
    });
  });

  // ---- Contact form (placeholder — wire up to Formspree/Netlify Forms) ----
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = document.getElementById('contact-form-msg');
      if (msg) {
        msg.hidden = false;
        msg.textContent = 'Thanks for reaching out — this is a placeholder confirmation. Connect a form backend (Formspree or Netlify Forms) so submissions actually arrive by email.';
      }
      contactForm.reset();
    });
  }

  // ---- Lightweight goal quiz (client-side only, no data stored) ----
  initQuiz();

  // ---- YouTube click-to-load videos ----
  initVideos();
});

// A real YouTube ID is 11 characters (letters, numbers, - and _).
// Anything else (e.g. REPLACE_ID_1) is treated as a placeholder and does nothing.
function initVideos() {
  document.querySelectorAll('.video-frame[data-video-id]').forEach(function (frame) {
    var id = frame.getAttribute('data-video-id');
    var isReal = /^[A-Za-z0-9_-]{11}$/.test(id) && id.indexOf('REPLACE') !== 0;
    var btn = frame.querySelector('button');
    if (!isReal || !btn) return;

    frame.style.backgroundImage = 'url(https://i.ytimg.com/vi/' + id + '/hqdefault.jpg)';

    btn.addEventListener('click', function () {
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
      iframe.title = btn.getAttribute('aria-label') || 'YouTube video';
      iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      frame.innerHTML = '';
      frame.appendChild(iframe);
    });
  });
}

function initQuiz() {
  var quiz = document.getElementById('goal-quiz');
  if (!quiz) return;

  var steps = Array.prototype.slice.call(quiz.querySelectorAll('.quiz-step'));
  var progress = quiz.querySelector('.quiz-progress');
  var answers = {};

  var results = {
    weight: {
      title: 'A good fit: Weight Management',
      body: 'Based on your answers, the Weight Management program is the most direct starting point — it pairs a personalised plan with regular check-ins to keep changes realistic and sustainable.',
      cta: 'programs.html#weight-management'
    },
    gut: {
      title: 'A good fit: Gut Health Reset',
      body: 'Based on your answers, the Gut Health program is the best starting point — it looks at digestion, food triggers and daily habits before anything else.',
      cta: 'programs.html#gut-health'
    },
    general: {
      title: 'A good fit: 1:1 Consultation',
      body: 'Your answers point to something more individual than a set program. A first 1:1 Consultation is the right next step so we can map out what actually fits your goals.',
      cta: 'services.html#one-to-one'
    }
  };

  function showStep(index) {
    steps.forEach(function (step, i) {
      step.classList.toggle('active', i === index);
    });
    if (progress) {
      var totalQuestionSteps = steps.length - 1; // exclude result step
      progress.textContent = index < totalQuestionSteps
        ? 'Question ' + (index + 1) + ' of ' + totalQuestionSteps
        : '';
    }
  }

  quiz.querySelectorAll('.quiz-options button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var step = btn.closest('.quiz-step');
      var key = step.getAttribute('data-key');
      answers[key] = btn.getAttribute('data-value');

      var currentIndex = steps.indexOf(step);
      var nextIndex = currentIndex + 1;

      if (nextIndex < steps.length - 1) {
        showStep(nextIndex);
      } else {
        renderResult();
        showStep(steps.length - 1);
      }
    });
  });

  function renderResult() {
    var resultStep = quiz.querySelector('.quiz-result');
    var pick = results.general;
    if (answers.goal === 'weight') pick = results.weight;
    if (answers.goal === 'gut') pick = results.gut;

    resultStep.querySelector('h3').textContent = pick.title;
    resultStep.querySelector('p').textContent = pick.body;
    var cta = resultStep.querySelector('a.btn');
    if (cta) cta.setAttribute('href', pick.cta);
  }

  var restartBtn = quiz.querySelector('[data-quiz-restart]');
  if (restartBtn) {
    restartBtn.addEventListener('click', function () {
      answers = {};
      showStep(0);
    });
  }

  showStep(0);
}
