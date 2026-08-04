//
// UpgradePage — web mirror of the iOS paywall (PaywallView.swift), shown to
// phone-channel users (SMS/voice limit hits) before the RevenueCat Web
// Purchase Link checkout. Chrome-less (in App.tsx's hideNavbar list),
// noindex, deliberately NOT in the sitemap.
//
// Opened as https://www.empathdash.com/upgrade?cid={client_id} — `cid` is the
// app/backend client_id (same identity RevenueCat uses), appended to the
// pay.rev.cat Web Purchase Link so the purchase lands on the right account.
// Without a cid the checkout link would 404 by design, so the CTA degrades
// to the App Store.
//
// The CTA also carries `?package_id=$rc_monthly|$rc_annual` (the RC offering's
// package identifiers — RC's own app-to-web `web_checkout_url` uses exactly
// this form). That makes RC skip its OWN hosted paywall/package-selection page
// and land the user directly on checkout with the plan they picked here — this
// page IS the paywall, a second one is a wasted click. If the identifier ever
// stops matching a package, RC silently falls back to rendering its paywall
// (which still carries stale "7 days free" copy — no trial exists anywhere,
// see empath-heroku CLAUDE.md), so keep these in sync with the RC dashboard.
//
// Styling intentionally copies the iOS paywall recipe: dark scrim over a
// blue glow, offWhite text, frosted 18px-radius panels, and the comparison
// table's accent-tinted "Empath+" column strip. The comparison rows mirror
// PaywallViewModel.compareRows (plus two phone-channel rows first — that's
// why this page's visitors are here). Free-tier numbers mirror the backend
// gate registry (empath-heroku services/premiumGate.js); update both sides
// together.
//
// Prices are static (RC Web Billing has no public price API): keep in sync
// with the Stripe products behind the purchase link ($6.99/mo, $49.99/yr).
//
import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import posthog from 'posthog-js';
import {
  MessageCircle,
  Phone,
  MessageSquare,
  PenSquare,
  AudioWaveform,
  Sparkles,
  Lightbulb,
  LayoutGrid,
  Link2,
  Heart,
  MapPin,
  Upload,
  ScanText,
  WifiOff,
  Check,
  Minus,
  Infinity as InfinityIcon,
} from 'lucide-react';

const PAY_LINK_BASE = 'https://pay.rev.cat/pyafsvglrimcfaih';
const APP_STORE_URL = 'https://apps.apple.com/us/app/myempath/id6472873287';
const TERMS_URL = 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/';
const PRIVACY_URL = 'https://www.termsfeed.com/live/153f184d-16c7-4aa9-a4e9-64fdb8dd2145';

// iOS theme constants (EmpathColors.xcassets)
const OFF_WHITE = '#F0F0F0';
const PRIMARY = '#0077E6';

type CompareCell =
  | { kind: 'text'; value: string }
  | { kind: 'unlimited' }
  | { kind: 'included' }
  | { kind: 'notIncluded' };

const text = (value: string): CompareCell => ({ kind: 'text', value });
const UNLIMITED: CompareCell = { kind: 'unlimited' };
const INCLUDED: CompareCell = { kind: 'included' };
const NOT_INCLUDED: CompareCell = { kind: 'notIncluded' };

interface CompareRow {
  id: string;
  icon: typeof MessageCircle;
  title: string;
  free: CompareCell;
  plus: CompareCell;
}

// Phone-channel rows first (this page's traffic source), then the iOS
// paywall's rows verbatim.
const COMPARE_ROWS: CompareRow[] = [
  { id: 'phone_messages', icon: MessageSquare, title: 'Journaling by text', free: text('15/mo'), plus: UNLIMITED },
  { id: 'voice_calls', icon: Phone, title: 'AI voice calls', free: text('4/mo'), plus: UNLIMITED },
  { id: 'ai_chat', icon: MessageCircle, title: 'AI chat', free: text('10 total'), plus: UNLIMITED },
  { id: 'journal_assistant', icon: PenSquare, title: 'Journal assistant', free: text('5 total'), plus: UNLIMITED },
  { id: 'voice_analysis', icon: AudioWaveform, title: 'Voice analysis', free: text('5 total'), plus: UNLIMITED },
  { id: 'deeper_insights', icon: Sparkles, title: 'Deeper Insights', free: text('3 total'), plus: UNLIMITED },
  { id: 'self_reflection', icon: Lightbulb, title: 'Discover Yourself', free: text('3 total'), plus: UNLIMITED },
  { id: 'widgets', icon: LayoutGrid, title: 'Home Screen widgets', free: text('2 basic'), plus: text('All') },
  { id: 'integrations', icon: Link2, title: 'Integrations', free: text('Health only'), plus: text('All') },
  { id: 'health', icon: Heart, title: 'Apple Health', free: text('Partial'), plus: text('Full') },
  { id: 'location', icon: MapPin, title: 'Location insights', free: NOT_INCLUDED, plus: INCLUDED },
  { id: 'import_export', icon: Upload, title: 'Import & export', free: text('Limited'), plus: UNLIMITED },
  { id: 'image_scan', icon: ScanText, title: 'Journal scanning', free: INCLUDED, plus: INCLUDED },
  { id: 'offline', icon: WifiOff, title: 'Offline journaling', free: INCLUDED, plus: INCLUDED },
];

interface Plan {
  id: 'monthly' | 'annual';
  /** RevenueCat package identifier in the `default` offering. */
  packageId: string;
  title: string;
  price: string;
  periodSuffix: string;
  detail: string;
  badge?: string;
}

const PLANS: Plan[] = [
  {
    id: 'monthly',
    packageId: '$rc_monthly',
    title: 'Monthly',
    price: '$6.99',
    periodSuffix: '/ month',
    detail: 'Billed monthly. Cancel anytime.',
  },
  {
    id: 'annual',
    packageId: '$rc_annual',
    title: 'Yearly',
    price: '$49.99',
    periodSuffix: '/ year',
    detail: 'Only $4.17 per month, billed annually. Cancel anytime.',
    badge: 'Save 40%',
  },
];

// Column geometry copied from PaywallView (pt ≈ px).
const FREE_COL = 60;
const PLUS_COL = 84;
const STRIP_INSET = 6;

function CellContent({ cell, emphasized }: { cell: CompareCell; emphasized: boolean }) {
  const dim = emphasized ? OFF_WHITE : 'rgba(240,240,240,0.6)';
  switch (cell.kind) {
    case 'text':
      return (
        <span
          className="text-xs leading-tight"
          style={{ color: dim, fontWeight: emphasized ? 600 : 500 }}
        >
          {cell.value}
        </span>
      );
    case 'unlimited':
      return <InfinityIcon size={16} strokeWidth={2.5} style={{ color: dim }} aria-label="Unlimited" />;
    case 'included':
      return <Check size={15} strokeWidth={3} style={{ color: dim }} aria-label="Included" />;
    case 'notIncluded':
      return <Minus size={14} strokeWidth={2.5} style={{ color: 'rgba(240,240,240,0.3)' }} aria-label="Not included" />;
  }
}

export default function UpgradePage() {
  const location = useLocation();
  const cid = useMemo(
    () => new URLSearchParams(location.search).get('cid'),
    [location.search],
  );
  const [selectedPlan, setSelectedPlan] = useState<Plan['id']>('annual');

  // Deep-links straight to RC's checkout for the selected package (no second
  // paywall). URLSearchParams encodes the `$` in the package identifier.
  const checkoutUrl = useMemo(() => {
    if (!cid) return APP_STORE_URL;
    const plan = PLANS.find((p) => p.id === selectedPlan) ?? PLANS[0];
    const params = new URLSearchParams({ package_id: plan.packageId });
    return `${PAY_LINK_BASE}/${encodeURIComponent(cid)}?${params.toString()}`;
  }, [cid, selectedPlan]);

  const handleCheckout = () => {
    posthog.capture('upgrade_checkout_clicked', {
      plan: selectedPlan,
      has_cid: Boolean(cid),
      destination: cid ? 'web_billing' : 'app_store',
    });
  };

  const selectPlan = (id: Plan['id']) => {
    if (id === selectedPlan) return;
    setSelectedPlan(id);
    posthog.capture('upgrade_plan_selected', { plan: id });
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center px-6 py-10"
      style={{
        color: OFF_WHITE,
        background:
          `radial-gradient(ellipse 80% 50% at 50% -10%, rgba(0,119,230,0.28), transparent),` +
          `radial-gradient(ellipse 60% 40% at 85% 105%, rgba(0,119,230,0.18), transparent),` +
          `linear-gradient(135deg, #0b1220 0%, #101826 45%, #0a0f1a 100%)`,
      }}
    >
      <Helmet>
        <title>Empath Premium</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="w-full max-w-md flex flex-col gap-6">
        {/* Header — premium logo in a frosted circle, like the iOS sheet */}
        <div className="flex flex-col items-center gap-3 pt-2">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: 'rgba(240,240,240,0.14)',
              border: '1px solid rgba(240,240,240,0.2)',
            }}
          >
            <img src="/premium-logo.png" alt="" className="w-10 h-10 object-contain" />
          </div>
          <h1 className="text-[28px] font-bold text-center leading-tight">
            Unlock All Premium Features
          </h1>
          <p className="text-sm text-center" style={{ color: 'rgba(240,240,240,0.7)' }}>
            Everything Empath offers, in one plan.
          </p>
        </div>

        {/* Comparison table — frosted panel with the Empath+ accent strip */}
        <div
          className="relative rounded-[18px]"
          style={{
            backgroundColor: 'rgba(240,240,240,0.07)',
            border: '1px solid rgba(240,240,240,0.12)',
            paddingLeft: 16,
            paddingRight: STRIP_INSET,
            paddingTop: STRIP_INSET,
            paddingBottom: STRIP_INSET,
          }}
        >
          {/* Accent strip under the Empath+ column, header to last row */}
          <div
            aria-hidden
            className="absolute rounded-[14px] pointer-events-none"
            style={{
              top: STRIP_INSET,
              bottom: STRIP_INSET,
              right: STRIP_INSET,
              width: PLUS_COL,
              background: `linear-gradient(to bottom, rgba(0,119,230,0.5), rgba(0,119,230,0.22))`,
              border: '1px solid rgba(240,240,240,0.22)',
              boxShadow: `0 0 10px rgba(0,119,230,0.35)`,
            }}
          />

          {/* Header row */}
          <div className="relative flex items-center gap-2.5 pt-3 pb-2">
            <span className="flex-1 text-[15px] font-semibold">What's included</span>
            <span
              className="text-xs font-semibold text-center"
              style={{ width: FREE_COL, color: 'rgba(240,240,240,0.6)' }}
            >
              Free
            </span>
            <span
              className="text-xs font-bold text-center flex items-center justify-center gap-1"
              style={{ width: PLUS_COL }}
            >
              <img src="/premium-logo.png" alt="" className="h-3.5 object-contain" />
              Empath+
            </span>
          </div>

          {COMPARE_ROWS.map((row, index) => {
            const Icon = row.icon;
            return (
              <div key={row.id} className="relative">
                {index > 0 && (
                  <div
                    style={{
                      height: 0.5,
                      backgroundColor: 'rgba(240,240,240,0.08)',
                      marginRight: PLUS_COL + STRIP_INSET,
                    }}
                  />
                )}
                <div className="flex items-center gap-2.5 py-[11px]">
                  <Icon
                    size={14}
                    strokeWidth={2.5}
                    className="shrink-0"
                    style={{ color: 'rgba(240,240,240,0.85)', width: 20 }}
                    aria-hidden
                  />
                  <span className="flex-1 text-[13px] font-medium leading-tight">{row.title}</span>
                  <span className="flex items-center justify-center" style={{ width: FREE_COL }}>
                    <CellContent cell={row.free} emphasized={false} />
                  </span>
                  <span className="flex items-center justify-center" style={{ width: PLUS_COL }}>
                    <CellContent cell={row.plus} emphasized />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Plan cards — Monthly leading, Yearly trailing, annual pre-selected */}
        <div className="flex gap-3 pt-3 items-stretch">
          {PLANS.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            return (
              <button
                key={plan.id}
                type="button"
                onClick={() => selectPlan(plan.id)}
                aria-pressed={isSelected}
                className="relative flex-1 rounded-[18px] p-3.5 pb-8 text-left transition-colors"
                style={{
                  backgroundColor: isSelected ? 'rgba(240,240,240,0.16)' : 'rgba(240,240,240,0.07)',
                  border: isSelected
                    ? `1.5px solid ${OFF_WHITE}`
                    : '1px solid rgba(240,240,240,0.18)',
                  minHeight: 150,
                }}
              >
                {plan.badge && (
                  <span
                    className="absolute -top-3 right-[-6px] text-[11px] font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: PRIMARY,
                      border: '1px solid rgba(240,240,240,0.35)',
                      color: OFF_WHITE,
                    }}
                  >
                    {plan.badge}
                  </span>
                )}
                <div className="text-base font-semibold">{plan.title}</div>
                <div className="flex items-baseline gap-1 mt-1.5">
                  <span className="text-[22px] font-bold">{plan.price}</span>
                  <span className="text-[13px] font-medium" style={{ color: 'rgba(240,240,240,0.65)' }}>
                    {plan.periodSuffix}
                  </span>
                </div>
                <div className="text-xs mt-1.5" style={{ color: 'rgba(240,240,240,0.65)' }}>
                  {plan.detail}
                </div>
                <span
                  aria-hidden
                  className="absolute bottom-3 right-3 w-[22px] h-[22px] rounded-full flex items-center justify-center"
                  style={
                    isSelected
                      ? { backgroundColor: OFF_WHITE }
                      : { border: '1.5px solid rgba(240,240,240,0.3)' }
                  }
                >
                  {isSelected && <Check size={14} strokeWidth={3} color="#101826" />}
                </span>
              </button>
            );
          })}
        </div>

        {/* CTA + legal */}
        <div className="flex flex-col gap-3 pt-1">
          <a
            href={checkoutUrl}
            onClick={handleCheckout}
            className="w-full text-center font-semibold text-white text-base py-3.5 rounded-2xl transition-opacity hover:opacity-90"
            style={{ backgroundColor: PRIMARY }}
          >
            {cid ? 'Continue' : 'Get the app'}
          </a>
          {!cid && (
            <p className="text-xs text-center" style={{ color: 'rgba(240,240,240,0.55)' }}>
              To upgrade an existing account, open the link from the text Empath sent you.
            </p>
          )}
          <p className="text-[11px] font-light text-center" style={{ color: 'rgba(240,240,240,0.55)' }}>
            Your subscription renews automatically until cancelled. Cancel anytime.
          </p>
          <div className="flex justify-center gap-[18px] pb-2">
            <a
              href={TERMS_URL}
              className="text-xs font-medium"
              style={{ color: 'rgba(240,240,240,0.65)' }}
            >
              Terms of Use
            </a>
            <a
              href={PRIVACY_URL}
              className="text-xs font-medium"
              style={{ color: 'rgba(240,240,240,0.65)' }}
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
