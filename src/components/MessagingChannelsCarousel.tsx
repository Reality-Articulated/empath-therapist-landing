import { ReactNode } from 'react';
import { Instagram } from 'lucide-react';
import posthog from 'posthog-js';
import { WhatsAppIcon, TelegramIcon, MessengerIcon } from './ChannelIcons';
import { useJournalingCopy } from '../i18n/copy';

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
    icon: <WhatsAppIcon className="w-6 h-6 shrink-0" />,
    bg: '#25D366',
    shadow: '#1a9e4d',
  },
  {
    key: 'telegram',
    label: 'Telegram',
    href: `https://t.me/${TELEGRAM_USERNAME}`,
    icon: <TelegramIcon className="w-6 h-6 shrink-0" />,
    bg: '#229ED9',
    shadow: '#1a7eb0',
  },
  {
    key: 'messenger',
    label: 'Messenger',
    href: `https://m.me/${MESSENGER_PAGE}`,
    icon: <MessengerIcon className="w-6 h-6 shrink-0" />,
    bg: '#0084FF',
    shadow: '#0063bf',
  },
  {
    key: 'instagram',
    label: 'Instagram',
    href: `https://ig.me/m/${INSTAGRAM_USERNAME}`,
    icon: <Instagram className="w-6 h-6 shrink-0" />,
    bg: '#E4405F',
    shadow: '#b32945',
  },
];

/**
 * Branded messaging-service buttons ("journal on…"): a centered row of
 * icon-only brand tiles. The service name lives in the aria-label/tooltip —
 * the logos are recognizable on their own and the compact row fits every
 * viewport, so there's no marquee/static split anymore.
 */
export default function MessagingChannelsCarousel({
  eventPrefix,
  className = '',
}: {
  /** PostHog prefix, e.g. 'journaling_page' → journaling_page_whatsapp_clicked */
  eventPrefix: string;
  className?: string;
}) {
  const { channelRow } = useJournalingCopy();
  return (
    <div className={`flex flex-wrap justify-center gap-4 py-1 ${className}`}>
      {CHANNELS.map((channel) => (
        <a
          key={channel.key}
          href={channel.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${channelRow.journalOn} ${channel.label}`}
          title={channel.label}
          onClick={() => posthog.capture(`${eventPrefix}_${channel.key}_clicked`)}
          className="w-12 h-12 text-white rounded-xl border-2 flex items-center justify-center transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px]"
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
        </a>
      ))}
    </div>
  );
}
