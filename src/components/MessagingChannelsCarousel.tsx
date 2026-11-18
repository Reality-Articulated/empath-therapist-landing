import { ReactNode, useMemo } from 'react';
import { Instagram } from 'lucide-react';
import { WhatsAppIcon, TelegramIcon, MessengerIcon } from './ChannelIcons';
import { useJournalingCopy } from '../i18n/copy';
import {
  buildChannelHref,
  captureChannelLinkClick,
  getChannelRefCode,
} from '../utils/attribution';

type ChannelKey = 'whatsapp' | 'telegram' | 'messenger' | 'instagram';

interface MessagingChannel {
  key: ChannelKey;
  label: string;
  icon: ReactNode;
  /** Brand button color */
  bg: string;
}

// The channel registry — adding a messaging service = one new entry here
// plus a case in buildChannelHref. Order = display order.
const CHANNELS: MessagingChannel[] = [
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    icon: <WhatsAppIcon className="w-6 h-6 shrink-0" />,
    bg: '#25D366',
  },
  {
    key: 'telegram',
    label: 'Telegram',
    icon: <TelegramIcon className="w-6 h-6 shrink-0" />,
    bg: '#229ED9',
  },
  {
    key: 'messenger',
    label: 'Messenger',
    icon: <MessengerIcon className="w-6 h-6 shrink-0" />,
    bg: '#0084FF',
  },
  {
    key: 'instagram',
    label: 'Instagram',
    icon: <Instagram className="w-6 h-6 shrink-0" />,
    bg: '#E4405F',
  },
];

/**
 * Branded messaging-service buttons ("chat on…"): a centered row of
 * icon-only brand tiles. The service name lives in the aria-label/tooltip —
 * the logos are recognizable on their own and the compact row fits every
 * viewport, so there's no marquee/static split anymore.
 *
 * Every link carries the session ref code (and WhatsApp a localized
 * prefilled first message) so the blank compose box never greets the user
 * and empath-heroku can attribute the conversation back to this session.
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
  const refCode = useMemo(getChannelRefCode, []);
  return (
    <div className={`flex flex-wrap justify-center gap-4 py-1 ${className}`}>
      {CHANNELS.map((channel) => (
        <a
          key={channel.key}
          href={buildChannelHref(channel.key, channelRow.prefill, refCode)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${channelRow.journalOn} ${channel.label}`}
          title={channel.label}
          onClick={() => captureChannelLinkClick(eventPrefix, channel.key, refCode)}
          className="w-12 h-12 text-white rounded-full flex items-center justify-center shadow-soft transition-transform duration-200 hover:-translate-y-0.5"
          style={{ backgroundColor: channel.bg }}
        >
          {channel.icon}
        </a>
      ))}
    </div>
  );
}
