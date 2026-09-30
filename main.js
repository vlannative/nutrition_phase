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
      toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
      });
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

  var ORDER = ['goal', 'support', 'timeline'];
  var steps = Array.prototype.slice.call(quiz.querySelectorAll('.quiz-step'));
  var progress = quiz.querySelector('.quiz-progress');
  var resultStep = quiz.querySelector('.quiz-result');
  var resultMsgEl = resultStep ? resultStep.querySelector('.quiz-result-msg') : null;
  var resultCta = resultStep ? resultStep.querySelector('a.btn') : null;
  var answerLabels = {};

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

  function resetQuiz() {
    answerLabels = {};
    if (resultMsgEl) resultMsgEl.textContent = '';
    if (resultCta) resultCta.removeAttribute('href');
    showStep(0);
  }

  function renderResult() {
    if (!resultStep) return;

    // Builds e.g. "1. What's the main thing you want help with? — Digestion / gut issues"
    // for each question, so the WhatsApp message shows the question next to the answer
    // instead of just a bare list of answers.
    var lines = ORDER.map(function (key, i) {
      var step = quiz.querySelector('.quiz-step[data-key="' + key + '"]');
      var qEl = step ? step.querySelector('.quiz-question') : null;
      var question = qEl ? qEl.textContent.trim() : '';
      return (i + 1) + '. ' + question + ' \u2014 ' + (answerLabels[key] || '');
    });
    var summary = lines.join('\n');

    if (resultMsgEl) resultMsgEl.textContent = summary;

    var floatBtn = document.querySelector('.whatsapp-float');
    var base = floatBtn ? floatBtn.getAttribute('href').split('?')[0] : 'https://wa.me/254700000000';
    var waMessage = summary + '\n\nI\'d like to book a consultation.';

    if (resultCta) {
      resultCta.setAttribute('href', base + '?text=' + encodeURIComponent(waMessage));
    }
  }

  // Event delegation: one listener on the quiz box handles every answer
  // button and the restart button, so nothing can end up unbound (or
  // bound twice) even if this script ever runs more than once on a page.
  quiz.addEventListener('click', function (e) {
    var optionBtn = e.target.closest('.quiz-options button');
    if (optionBtn) {
      var step = optionBtn.closest('.quiz-step');
      var key = step.getAttribute('data-key');
      answerLabels[key] = optionBtn.textContent.trim();

      var currentIndex = steps.indexOf(step);
      var nextIndex = currentIndex + 1;

      if (nextIndex < steps.length - 1) {
        showStep(nextIndex);
      } else {
        renderResult();
        showStep(steps.length - 1);
      }
      return;
    }

    if (e.target.closest('[data-quiz-restart]')) {
      resetQuiz();
    }
  });

  showStep(0);
}