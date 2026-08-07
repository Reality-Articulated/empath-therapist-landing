import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { useJournalingCopy } from '../i18n/copy';
import { buildChannelHref, getQrRefCode } from '../utils/attribution';
import { WhatsAppIcon } from './ChannelIcons';

const APP_STORE_URL = 'https://apps.apple.com/us/app/empath-ai-diary-for-your-mind/id6472873287';

/**
 * Desktop hero helper: a visitor on a laptop can't act on tel:/wa.me links,
 * so give their phone something to scan. Two codes: the prefilled WhatsApp
 * chat (carrying the session ref code with the QR "Q" suffix, so scans stay
 * attributable and distinguishable from taps) and the App Store page.
 * Render inside a desktop-only branch — this component doesn't hide itself.
 */
export default function DesktopQRCodes({ className = '' }: { className?: string }) {
  const c = useJournalingCopy();
  const [waQr, setWaQr] = useState<string | null>(null);
  const [appQr, setAppQr] = useState<string | null>(null);

  useEffect(() => {
    const waHref = buildChannelHref('whatsapp', c.channelRow.prefill, getQrRefCode());
    QRCode.toDataURL(waHref, { margin: 1, width: 192 })
      .then(setWaQr)
      .catch(() => setWaQr(null));
    QRCode.toDataURL(APP_STORE_URL, { margin: 1, width: 192 })
      .then(setAppQr)
      .catch(() => setAppQr(null));
  }, [c.channelRow.prefill]);

  if (!waQr || !appQr) return null;

  return (
    <div className={`flex items-center justify-center gap-6 ${className}`}>
      <span className="text-sm font-bold text-stone-400 uppercase tracking-wider">{c.qr.onPhone}</span>
      <div className="flex items-center gap-3 bg-white rounded-xl border-2 border-stone-200 p-2.5">
        <img src={waQr} alt={c.qr.whatsapp} className="w-20 h-20 rounded" />
        <p className="text-xs font-bold text-stone-600 max-w-[7.5rem] text-left flex items-start gap-1.5">
          <WhatsAppIcon className="w-4 h-4 shrink-0 text-[#25D366]" /> {c.qr.whatsapp}
        </p>
      </div>
      <div className="flex items-center gap-3 bg-white rounded-xl border-2 border-stone-200 p-2.5">
        <img src={appQr} alt={c.qr.appStore} className="w-20 h-20 rounded" />
        <p className="text-xs font-bold text-stone-600 max-w-[7.5rem] text-left flex items-start gap-1.5">
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
          </svg>
          {c.qr.appStore}
        </p>
      </div>
    </div>
  );
}
