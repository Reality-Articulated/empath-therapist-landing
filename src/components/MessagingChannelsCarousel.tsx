import { ReactNode } from 'react';
import { Instagram } from 'lucide-react';
import posthog from 'posthog-js';
import { WhatsAppIcon, TelegramIcon, MessengerIcon } from './ChannelIcons';

const WHATSAPP_NUMBER = '18883663082';
const TELEGRAM_USERNAME = 'MyEmpathBot';
const MESSENGER_PAGE = '359987860540277'; // Empath: Private Journal
const INSTAGRAM_USERNAME = 'myempath';

interface MessagingChannel {
  key: string;
  label: string;
  href: string;
  icon: ReactNode;
  /** Brand button color */
  bg: string;
  /** Hard-shadow color (darker shade of bg) */
  shadow: string;
}

// The channel registry — adding a messaging service = one new entry here.
// Order = display order.
const CHANNELS: MessagingChannel[] = [
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    icon: <WhatsAppIcon className="w-5 h-5 shrink-0" />,
    bg: '#25D366',
    shadow: '#1a9e4d',
  },
  {
    key: 'telegram',
    label: 'Telegram',
    href: `https://t.me/${TELEGRAM_USERNAME}`,
    icon: <TelegramIcon className="w-5 h-5 shrink-0" />,
    bg: '#229ED9',
    shadow: '#1a7eb0',
  },
  {
    key: 'messenger',
    label: 'Messenger',
    href: `https://m.me/${MESSENGER_PAGE}`,
    icon: <MessengerIcon className="w-5 h-5 shrink-0" />,
    bg: '#0084FF',
    shadow: '#0063bf',
  },
  {
    key: 'instagram',
    label: 'Instagram',
    href: `https://ig.me/m/${INSTAGRAM_USERNAME}`,
    icon: <Instagram className="w-5 h-5 shrink-0" />,
    bg: '#E4405F',
    shadow: '#b32945',
  },
];

// Copies of the channel set on the marquee belt. The animation slides exactly
// one set width (100/COPIES %), so the loop is seamless as long as the belt
// is wider than the container plus one set — 4 copies covers that comfortably.
const COPIES = 4;

/**
 * Auto-scrolling belt of branded messaging-service buttons ("journal on…").
 * Pauses on hover/focus; falls back to a static wrapped row when the user
 * prefers reduced motion. Only the first copy is focusable/visible to
 * screen readers — the rest are decorative fill for the loop.
 */
export default function MessagingChannelsCarousel({
  eventPrefix,
  className = '',
}: {
  /** PostHog prefix, e.g. 'journaling_page' → journaling_page_whatsapp_clicked */
  eventPrefix: string;
  className?: string;
}) {
  const chip = (channel: MessagingChannel, copy: number) => (
    <a
      key={`${channel.key}-${copy}`}
      href={channel.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-hidden={copy > 0 ? true : undefined}
      tabIndex={copy > 0 ? -1 : undefined}
      onClick={() => posthog.capture(`${eventPrefix}_${channel.key}_clicked`)}
      className="px-4 py-3 text-white rounded-xl border-2 font-bold flex items-center justify-center gap-2 text-sm whitespace-nowrap transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px]"
      style={{
        backgroundColor: channel.bg,
        borderColor: channel.bg,
        boxShadow: `4px 4px 0px 0px ${channel.shadow}`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `2px 2px 0px 0px ${channel.shadow}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `4px 4px 0px 0px ${channel.shadow}`;
      }}
    >
      {channel.icon}
      {channel.label}
    </a>
  );

  return (
    <div className={className}>
      <style>{`
        @keyframes channel-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-${100 / COPIES}%); }
        }
        .channel-marquee-track {
          animation: channel-marquee ${CHANNELS.length * 5}s linear infinite;
        }
        .channel-marquee:hover .channel-marquee-track,
        .channel-marquee:focus-within .channel-marquee-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .channel-marquee-track { animation: none; width: 100%; }
          .channel-marquee-track > div:first-child {
            flex-wrap: wrap;
            justify-content: center;
            width: 100%;
            padding-right: 0;
          }
          .channel-marquee-copy { display: none; }
        }
      `}</style>
      <div
        className="channel-marquee overflow-hidden py-1"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
      >
        <div className="channel-marquee-track flex w-max">
          {Array.from({ length: COPIES }, (_, copy) => (
            <div
              key={copy}
              className={`flex gap-3 pr-3 ${copy > 0 ? 'channel-marquee-copy' : ''}`}
            >
              {CHANNELS.map((channel) => chip(channel, copy))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
