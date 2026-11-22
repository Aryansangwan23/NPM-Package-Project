import { timeAgo } from 'time-ago-lite';

// Color palette for user avatars
const AVATAR_PALETTE = [
  'linear-gradient(135deg, #6366f1, #8b5cf6)',
  'linear-gradient(135deg, #ec4899, #f43f5e)',
  'linear-gradient(135deg, #10b981, #059669)',
  'linear-gradient(135deg, #f59e0b, #d97706)',
  'linear-gradient(135deg, #3b82f6, #0284c7)',
  'linear-gradient(135deg, #8b5cf6, #d946ef)',
  'linear-gradient(135deg, #14b8a6, #0d9488)',
  'linear-gradient(135deg, #f97316, #ea580c)'
];

function getAvatarColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_PALETTE.length;
  return AVATAR_PALETTE[index];
}

function getInitials(name) {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return (name.slice(0, 2) || '??').toUpperCase();
}

// Initial sample feed posts (9 items spanning seconds, minutes, hours, days, weeks, months)
const now = Date.now();
let posts = [
  {
    id: 'post-1',
    author: 'Elena Rostova',
    content: 'Just deployed the new release to staging! All regression tests passed in under 4 minutes 🚀',
    timestamp: new Date(now - 5 * 1000) // 5 seconds ago -> "just now"
  },
  {
    id: 'post-2',
    author: 'Marcus Vance',
    content: 'Observing a 35% latency drop after migrating to zero-dependency micro-libraries. Small bundles matter!',
    timestamp: new Date(now - 45 * 1000) // 45 seconds ago -> "45 seconds ago"
  },
  {
    id: 'post-3',
    author: 'Sophia Chen',
    content: 'Coffee break! Who is up for a quick sync on the Q3 roadmap architecture?',
    timestamp: new Date(now - 5 * 60 * 1000) // 5 minutes ago -> "5 minutes ago"
  },
  {
    id: 'post-4',
    author: 'Devon Miles',
    content: 'Code review submitted for the relative time formatter. Feedback welcome!',
    timestamp: new Date(now - 28 * 60 * 1000) // 28 minutes ago -> "28 minutes ago"
  },
  {
    id: 'post-5',
    author: 'Amara Okafor',
    content: 'Finished drafting the API documentation and interactive sandbox guides.',
    timestamp: new Date(now - 3 * 3600 * 1000) // 3 hours ago -> "3 hours ago"
  },
  {
    id: 'post-6',
    author: 'Liam Gallagher',
    content: 'Production cluster upgrade completed smoothly with zero customer downtime.',
    timestamp: new Date(now - 2 * 24 * 3600 * 1000) // 2 days ago -> "2 days ago"
  },
  {
    id: 'post-7',
    author: 'Chloe Dupont',
    content: 'Our team hackathon kickoff was incredible! 12 exciting prototypes built in 48 hours.',
    timestamp: new Date(now - 14 * 24 * 3600 * 1000) // 2 weeks ago -> "2 weeks ago"
  },
  {
    id: 'post-8',
    author: 'Kenji Sato',
    content: 'Celebrating 1 year anniversary of the open-source design system milestone 🎉',
    timestamp: new Date(now - 120 * 24 * 3600 * 1000) // 4 months ago -> "4 months ago"
  },
  {
    id: 'post-9',
    author: 'Aria Montgomery',
    content: 'Repository initialized! Excited to begin building lightweight developer tools.',
    timestamp: new Date(now - 365 * 24 * 3600 * 1000) // 1 year ago -> "1 year ago"
  }
];

// DOM Elements
const feedListEl = document.getElementById('feed-list');
const feedCountEl = document.getElementById('feed-count');
const composerForm = document.getElementById('composer-form');
const authorInput = document.getElementById('author-input');
const contentInput = document.getElementById('content-input');
const charCounter = document.getElementById('char-counter');
const refreshCountdownEl = document.getElementById('refresh-countdown');
const themeToggleBtn = document.getElementById('theme-toggle');
const datePickerInput = document.getElementById('date-picker-input');
const rawDateInput = document.getElementById('raw-date-input');
const testerResultEl = document.getElementById('tester-result');
const testerErrorEl = document.getElementById('tester-error');
const testerErrorMessageEl = document.getElementById('tester-error-message');
const presetButtons = document.querySelectorAll('.preset-btn');

/**
 * Renders the feed items using timeAgo()
 */
function renderFeed() {
  feedListEl.innerHTML = '';
  feedCountEl.textContent = `${posts.length} items`;

  posts.forEach((post) => {
    let formattedTime = '';
    try {
      formattedTime = timeAgo(post.timestamp);
    } catch (err) {
      formattedTime = 'Invalid date';
    }

    const item = document.createElement('article');
    item.className = 'feed-item';
    if (post.isNew) {
      item.classList.add('is-new');
    }

    const initials = getInitials(post.author);
    const bgGradient = getAvatarColor(post.author);

    item.innerHTML = `
      <div class="item-avatar" style="background: ${bgGradient}">
        ${initials}
      </div>
      <div class="item-body">
        <div class="item-header">
          <span class="item-author">${escapeHtml(post.author)}</span>
          <time class="item-time" datetime="${new Date(post.timestamp).toISOString()}" title="${new Date(post.timestamp).toLocaleString()}">
            ${escapeHtml(formattedTime)}
          </time>
        </div>
        <p class="item-content">${escapeHtml(post.content)}</p>
      </div>
    `;

    feedListEl.appendChild(item);
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Auto-refresh interval (every 10 seconds)
const REFRESH_INTERVAL_SECONDS = 10;
let secondsRemaining = REFRESH_INTERVAL_SECONDS;

setInterval(() => {
  secondsRemaining--;
  if (secondsRemaining <= 0) {
    // Re-render feed timestamps
    renderFeed();
    secondsRemaining = REFRESH_INTERVAL_SECONDS;
  }
  if (refreshCountdownEl) {
    refreshCountdownEl.textContent = secondsRemaining;
  }
}, 1000);

// Composer Form submission
composerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const author = authorInput.value.trim();
  const content = contentInput.value.trim();

  if (!author || !content) return;

  const newPost = {
    id: `post-${Date.now()}`,
    author,
    content,
    timestamp: new Date(), // Created right now
    isNew: true
  };

  posts.unshift(newPost);
  renderFeed();

  // Reset form
  contentInput.value = '';
  charCounter.textContent = '0 / 280';
  authorInput.focus();
});

// Character counter for textarea
contentInput.addEventListener('input', () => {
  const len = contentInput.value.length;
  charCounter.textContent = `${len} / 280`;
});

/**
 * Handles Date Tester evaluations safely with clear TypeError display
 */
function evaluateTesterDate(inputValue) {
  testerErrorEl.classList.add('hidden');
  testerResultEl.classList.remove('hidden');

  if (inputValue === null || inputValue === undefined || inputValue === '') {
    testerResultEl.innerHTML = '<span class="result-value">Select or type a date</span>';
    testerResultEl.className = 'result-box';
    return;
  }

  try {
    // Attempt parsing as number if purely numeric string
    let parsedInput = inputValue;
    if (typeof inputValue === 'string' && /^-?\d+$/.test(inputValue.trim())) {
      parsedInput = Number(inputValue.trim());
    }

    const result = timeAgo(parsedInput);
    testerResultEl.className = 'result-box result-success';
    testerResultEl.innerHTML = `
      <span class="result-label-text">Result:</span>
      <span class="result-value">"${escapeHtml(result)}"</span>
    `;
  } catch (err) {
    // Graceful error display
    testerResultEl.className = 'result-box hidden';
    testerErrorEl.classList.remove('hidden');
    testerErrorMessageEl.textContent = `${err.name}: ${err.message}`;
  }
}

// Date picker change handler
datePickerInput.addEventListener('input', (e) => {
  if (e.target.value) {
    rawDateInput.value = '';
    evaluateTesterDate(e.target.value);
  } else {
    evaluateTesterDate('');
  }
});

// Raw input handler
rawDateInput.addEventListener('input', (e) => {
  datePickerInput.value = '';
  evaluateTesterDate(e.target.value);
});

// Preset button click handlers
presetButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const preset = btn.dataset.preset;
    const currentMs = Date.now();
    let targetValue;

    switch (preset) {
      case 'just-now':
        targetValue = new Date(currentMs - 4 * 1000);
        break;
      case 'future-5m':
        targetValue = new Date(currentMs + 5 * 60 * 1000);
        break;
      case 'future-3d':
        targetValue = new Date(currentMs + 3 * 24 * 3600 * 1000);
        break;
      case 'future-2w':
        targetValue = new Date(currentMs + 14 * 24 * 3600 * 1000);
        break;
      case 'past-2h':
        targetValue = new Date(currentMs - 2 * 3600 * 1000);
        break;
      case 'past-4m':
        targetValue = new Date(currentMs - 120 * 24 * 3600 * 1000);
        break;
      case 'invalid-test':
        targetValue = 'not-a-valid-date-input';
        break;
      default:
        targetValue = new Date();
    }

    if (preset === 'invalid-test') {
      rawDateInput.value = targetValue;
      datePickerInput.value = '';
      evaluateTesterDate(targetValue);
    } else {
      rawDateInput.value = targetValue.toISOString();
      // Format for datetime-local input (YYYY-MM-DDTHH:mm)
      const tzOffset = targetValue.getTimezoneOffset() * 60000;
      const localISOTime = new Date(targetValue.getTime() - tzOffset).toISOString().slice(0, 16);
      datePickerInput.value = localISOTime;
      evaluateTesterDate(targetValue);
    }
  });
});

// Theme Toggle
const savedTheme = localStorage.getItem('pulsefeed-theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggleBtn.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('pulsefeed-theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  const iconSpan = themeToggleBtn.querySelector('.theme-icon');
  if (iconSpan) {
    iconSpan.textContent = theme === 'dark' ? '🌙' : '☀️';
  }
}

// Initial render
renderFeed();
// Initialize preset with future-3d so the user sees future formatting immediately
const initialFutureDate = new Date(Date.now() + 3 * 24 * 3600 * 1000);
const tzOffset = initialFutureDate.getTimezoneOffset() * 60000;
datePickerInput.value = new Date(initialFutureDate.getTime() - tzOffset).toISOString().slice(0, 16);
evaluateTesterDate(initialFutureDate);
