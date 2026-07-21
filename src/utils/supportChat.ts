import posthog from 'posthog-js';

declare global {
  interface Window {
    $crisp?: unknown[];
    CRISP_WEBSITE_ID?: string;
  }
}

// Same Crisp website as the iOS app and therapist dashboard so every support
// conversation lands in one shared inbox.
const CRISP_WEBSITE_ID = 'e44f6f89-4729-442a-a39d-8f2c933e384d';

// The widget is loaded lazily on first use instead of on page load: this is a
// marketing site where Core Web Vitals matter, and most visitors never open
// support chat. Crisp queues $crisp.push commands made before l.js finishes
// loading, so opening the chat immediately after injection works.
function ensureCrispLoaded() {
  if (window.$crisp) return;

  window.$crisp = [];
  window.CRISP_WEBSITE_ID = CRISP_WEBSITE_ID;
  // Distinguish marketing-site visitors from iOS clients and dashboard
  // therapists in the shared inbox.
  window.$crisp.push(['set', 'session:segments', [['marketing-site']]]);

  const script = document.createElement('script');
  script.src = 'https://client.crisp.chat/l.js';
  script.async = true;
  // Ad blockers commonly block client.crisp.chat; without this the support
  // button would silently do nothing. Fall back to email instead.
  script.onerror = () => {
    delete window.$crisp;
    posthog.capture('support_chat_blocked_fallback_email');
    window.location.href = 'mailto:support@myempath.co';
  };
  document.head.appendChild(script);
}

/**
 * Opens the Crisp support chat, loading the widget on first call.
 * @param prefill Optional draft message placed in the visitor's composer,
 *   e.g. a topic hint like "Science & research inquiry: ".
 */
export function openSupportChat(prefill?: string) {
  posthog.capture('support_chat_opened', {
    path: window.location.pathname,
    prefill: prefill ?? null,
  });
  ensureCrispLoaded();
  const crisp = window.$crisp!;
  if (prefill) crisp.push(['set', 'message:text', [prefill]]);
  crisp.push(['do', 'chat:show']);
  crisp.push(['do', 'chat:open']);
}
