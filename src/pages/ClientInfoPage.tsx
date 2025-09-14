import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, CheckCircle, Shield, Clock, Smartphone, Ban, Phone, FileText } from 'lucide-react';
import logo from '../../public/empath-logo.png';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';
import posthog from 'posthog-js';
import { useFeatureFlagVariantKey } from 'posthog-js/react';
import { Link } from 'react-router-dom';

// Declare YouTube API types
declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    twq?: (...args: any[]) => void;
  }
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

// FAQ Accordion Item Component (accessible)
const FAQItem = ({ question, answer }: { question: string; answer: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const baseId = `faq-${question.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  const buttonId = `${baseId}-button`;
  const panelId = `${baseId}-panel`;

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        id={buttonId}
        className="w-full py-4 flex justify-between items-center text-left text-lg font-medium text-gray-700 hover:text-slate-900 transition"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        {question}
        <ChevronDown className={`w-5 h-5 text-slate-600 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!isOpen}
        className="pb-6 pt-2 text-gray-600 pr-6"
      >
        {answer}
      </div>
    </div>
  );
};

const variantContent = {
  unheard_a: {
    heading: 'Your Therapist Needs The Whole You<br />Give Them the <span class="text-slate-900 underline decoration-wavy">Complete Map</span>',
    subheading: 'Stop performing. Capture your real thoughts when they happen.<br class="hidden md:block" /><span class="font-semibold">Therapy works best when your therapist sees the full picture.</span>'
  },
  unheard_b: {
    heading: 'Apps See the Real You<br />Now Your Therapist Can <span class="text-slate-900 underline decoration-wavy">Too</span>',
    subheading: 'Record authentic moments between sessions.<br class="hidden md:block" /><span class="font-semibold">Bring your therapist into your real life, not just the recap.</span>'
  },
  rushed_a: {
    heading: 'Breakthroughs Don\'t Wait for Tuesdays<br />Capture <span class="text-slate-900 underline decoration-wavy">Real Moments</span> As They Happen',
    subheading: 'Voice, text, or call when it\'s real—not rehearsed.<br class="hidden md:block" /><span class="font-semibold">Start sessions already caught up.</span>'
  },
  rushed_b: {
    heading: 'Stop Performing in Session<br />Show Up As the <span class="text-slate-900 underline decoration-wavy">Real You</span>',
    subheading: 'Bridge the gap between your recap and your reality.<br class="hidden md:block" /><span class="font-semibold">Give your therapist the moments that matter.</span>'
  },
  timesave_a: {
    heading: 'Become the Observer of Your Mind<br />Not <span class="text-slate-900 underline decoration-wavy">Submerged</span> in It',
    subheading: 'Externalize your thoughts to create distance and clarity.<br class="hidden md:block" /><span class="font-semibold">Do the real work faster.</span>'
  },
  control: {
    heading: 'Feel Deeply Understood<br />By Your <span class="text-slate-900 underline decoration-wavy">Therapist</span>',
    subheading: 'Your therapist can navigate as well as the map you share.<br class="hidden md:block" /><span class="font-semibold">Share the complete picture of your inner world.</span>'
  }
};

// Value Proposition Banner copy by variant
const valuePropBanner = {
  unheard_a: "Therapy is only as good as the map you share.<br /><span class='font-semibold text-yellow-300'>Give your therapist access to all versions of you.</span>",
  unheard_b: "Algorithms see your authentic self. Your therapist should too.<br /><span class='font-semibold text-yellow-300'>Share the real you—between sessions.</span>",
  rushed_a: "Your biggest moments don\'t happen on a schedule.<br /><span class='font-semibold text-yellow-300'>Capture them and start sessions already aligned.</span>",
  rushed_b: "Performing in therapy slows progress.<br /><span class='font-semibold text-yellow-300'>Show up with the moments that matter.</span>",
  timesave_a: "Make your thoughts observable, not overwhelming.<br /><span class='font-semibold text-yellow-300'>Create distance. Find clarity. Move faster.</span>",
  control: "Your therapist navigates the map you provide.<br /><span class='font-semibold text-yellow-300'>Share the complete picture of your inner world.</span>"
};

export default function ClientInfoPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  // Modal state for invite request
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [therapistEmail, setTherapistEmail] = useState('');
  const [inviteSubmitted, setInviteSubmitted] = useState(false);
  const [inviteError, setInviteError] = useState('');
  const [noTherapist, setNoTherapist] = useState(false);
  // Parse signUpToken, token, and therapistName from URL
  const [signUpUrl, setSignUpUrl] = useState<string | null>(null);
  const [therapistName, setTherapistName] = useState<string | null>(null);
  
  // Add new state for user count animation
  const [userCount, setUserCount] = useState(2847);
  
  // Add state for floating CTA
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  // Phone constants for consistency
  const PHONE_MAIN = '+18883663082';
  const PHONE_MAIN_DISPLAY = '(888) 366-3082';
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const signUpToken = params.get('signUpToken');
      const token = params.get('token');
      const therapistNameParam = params.get('therapistName');
      if (signUpToken && token) {
        setSignUpUrl(`https://empath-793bdf3d3ee1.herokuapp.com/sign-up-client/${signUpToken}/${token}`);
        
        // Identify invited user in PostHog with their token
        posthog.identify(token, {
          signUpToken: signUpToken,
          therapistName: therapistNameParam ? decodeURIComponent(therapistNameParam) : null,
          userType: 'invited_client',
          inviteUrl: window.location.href,
          invitedAt: new Date().toISOString()
        });
        
        // Track that an invited user visited
        posthog.capture('invited_client_page_viewed', {
          signUpToken: signUpToken,
          token: token,
          therapistName: therapistNameParam ? decodeURIComponent(therapistNameParam) : null
        });
      } else {
        setSignUpUrl(null);
      }
      setTherapistName(therapistNameParam ? decodeURIComponent(therapistNameParam) : null);
    }
  }, []);

  useEffect(() => {
    // Animate user count
    const interval = setInterval(() => {
      setUserCount(prev => prev + Math.floor(Math.random() * 3));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Add scroll listener for floating CTA
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight * 0.8; // Adjust based on your hero section height
      setShowFloatingCTA(scrollPosition > heroHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle YouTube API events
  useEffect(() => {
    if (!document.getElementById('youtube-api')) {
      const tag = document.createElement('script');
      tag.id = 'youtube-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
    }
    if (!window.onYouTubeIframeAPIReady) {
      window.onYouTubeIframeAPIReady = () => {};
      const handleMessage = (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data);
          if (data.event === 'onStateChange') {
            setIsPlaying(data.info === 1);
          }
        } catch (e) {}
      };
      window.addEventListener('message', handleMessage);
      return () => window.removeEventListener('message', handleMessage);
    }
  }, []);
  useEffect(() => {
    posthog.capture('client_info_page_viewed');
  }, []);
  // Invite form submit handler
  const handleInviteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInviteError('');
    setInviteSubmitted(false);
    posthog.capture('invite_form_submitted', { user_email: userEmail, therapist_email: therapistEmail, no_therapist: noTherapist, variant: selectedVariant });
    if (!userEmail) {
      setInviteError('Please enter your email.');
      return;
    }
    if (!noTherapist && !therapistEmail) {
      setInviteError('Please enter your therapist\'s email or check the box if you don\'t have a therapist.');
      return;
    }
    try {
      await emailjs.send(
        'service_vxj3w0n',
        'template_k7xemzd',
        {
          to_email: 'karan@myempath.co',
          user_email: userEmail,
          therapist_email: noTherapist ? 'No therapist' : therapistEmail,
          no_therapist: noTherapist ? 'Yes' : 'No',
          time: new Date().toLocaleString(),
        },
        'RkdQiScnBEMQIBtNL'
      );
      toast.success('Thank you! We will reach out to your therapist and let you know when you are connected.');
      if (window.twq) {
        window.twq('event', 'tw-onbx0-onbx0', {
          user_email: userEmail,
          therapist_email: noTherapist ? 'No therapist' : therapistEmail,
          no_therapist: noTherapist ? 'Yes' : 'No',
          variant: selectedVariant
        });
      }
      setInviteSubmitted(true);
      setUserEmail('');
      setTherapistEmail('');
      setNoTherapist(false);
    } catch (err) {
      toast.error('Failed to submit. Please try again.');
      setInviteError('Something went wrong. Please try again.');
    }
  };
  // Add new state for flow modal
  const [showFlowModal, setShowFlowModal] = useState(false);
  // Add state for call-to-journal modal
  const [showCallModal, setShowCallModal] = useState(false);
  // Helper: is user invited (has signUpUrl)?
  const isInvited = !!signUpUrl;
  // --- PostHog variant logic (moved inside component) ---
  const variantRaw = useFeatureFlagVariantKey('client-info-copy-experiment');
  const variant = typeof variantRaw === 'string' ? variantRaw : '';
  const validVariants = [
    'unheard_a',
    'unheard_b',
    'rushed_a',
    'rushed_b',
    'timesave_a',
    'control',
  ] as const;
  type VariantKey = typeof validVariants[number];
  const selectedVariant: VariantKey = validVariants.includes(variant as VariantKey) ? (variant as VariantKey) : 'unheard_a';
  const { heading, subheading } = variantContent[selectedVariant];

  useEffect(() => {
    if (import.meta.env.DEV) {
      posthog.featureFlags.override({ 'client-info-copy-experiment': 'rushed_a' });
    }
  }, []);

  return (
    <div className="flex-grow overflow-hidden">
      {/* Updated Invite Modal with less friction */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative max-h-[90vh] overflow-y-auto">
            <Toaster position="top-center" />
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={() => {
                setShowInviteModal(false);
                setInviteSubmitted(false);
                setInviteError('');
                posthog.capture('invite_modal_closed');
              }}
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            
            <h3 className="text-2xl font-bold mb-2 text-slate-900 text-center">
              🎉 Get Early Access
            </h3>
            
            {inviteSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">You're on the list!</h4>
                <p className="text-gray-600">Check your email for next steps. You can start journaling right now:</p>
                <div className="flex gap-3 mt-4">
                  <a
                    href={`tel:${PHONE_MAIN}`}
                    className="flex-1 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all duration-300 font-light text-center"
                    aria-label={`Call Empath at ${PHONE_MAIN_DISPLAY}`}
                  >
                    📞 Call Now
                  </a>
                  <a
                    href={`sms:${PHONE_MAIN}`}
                    className="flex-1 px-6 py-3 bg-white text-slate-900 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 font-light text-center"
                    aria-label={`Text Empath at ${PHONE_MAIN_DISPLAY}`}
                  >
                    💬 Text Now
                  </a>
                </div>
              </div>
            ) : (
              <>
                <p className="mb-4 text-gray-600 text-center">
                  <span className="font-semibold">Join {userCount.toLocaleString()}+ people</span> already using Empath to transform their therapy
                </p>
                
                <form onSubmit={handleInviteSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent text-lg"
                      value={userEmail}
                      onChange={e => setUserEmail(e.target.value)}
                      placeholder="Your email address"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Therapist's Email</label>
                    <input
                      type="email"
                      className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                      value={therapistEmail}
                      onChange={e => setTherapistEmail(e.target.value)}
                      placeholder="your.therapist@email.com"
                      disabled={noTherapist}
                      required={!noTherapist}
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="noTherapist"
                      className="w-4 h-4 text-slate-900 bg-gray-100 border-gray-300 rounded focus:ring-slate-900 focus:ring-2"
                      checked={noTherapist}
                      onChange={e => {
                        setNoTherapist(e.target.checked);
                        if (e.target.checked) {
                          setTherapistEmail('');
                        }
                      }}
                    />
                    <label htmlFor="noTherapist" className="ml-2 text-sm text-gray-700">
                      I don't currently have a therapist
                    </label>
                  </div>
                  
                  {inviteError && <div className="text-red-600 text-sm">{inviteError}</div>}
                  
                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all duration-300 font-light tracking-wide"
                  >
                    Get Instant Access →
                  </button>
                  
                  <p className="text-xs text-center text-gray-500">
                    No credit card required • Start journaling in 30 seconds
                  </p>
                </form>
                
                {/* Simplified bottom section */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                    <h5 className="font-semibold text-gray-800 mb-2">
                      💡 Pro tip: Try it right now!
                    </h5>
                    <p className="text-sm text-gray-600 mb-3">
                      No app needed. Just call or text to start journaling instantly.
                    </p>
                    
                    <div className="flex gap-2">
                      <a
                        href="tel:+18883663082"
                        className="flex-1 px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all duration-300 font-light text-center text-sm"
                      >
                        📞 Call
                      </a>
                      <a
                        href="sms:+18883663082"
                        className="flex-1 px-6 py-2 bg-white text-slate-900 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 font-light text-center text-sm"
                      >
                        💬 Text
                      </a>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* What happens next? Modal (for invited users) */}
      {showFlowModal && isInvited && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={() => setShowFlowModal(false)}
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h3 className="text-xl font-bold mb-2 text-slate-900">Connect to your Therapist</h3>
            <ol className="mb-4 text-gray-700 text-base list-decimal list-inside space-y-2">
              <li>You'll create your Empath account (name, phone number, password).</li>
              <li>We'll securely link you to your therapist using your invite.</li>
              <li>After sign-up, you'll get options to download the app or call to journal.</li>
            </ol>
            <div className="mt-4 p-3 bg-blue-50 rounded text-blue-900 text-sm border border-blue-200">
              <strong>Why your phone number?</strong><br />
              It's needed for secure login and to enable journaling by phone if you prefer.
            </div>
            <button
              className="w-full px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all duration-300 font-light mt-4"
              onClick={() => {
                setShowFlowModal(false);
                if (signUpUrl) {
                  window.open(signUpUrl, '_blank', 'noopener,noreferrer');
                  posthog.capture('connect_to_therapist_signup_initiated', { variant: selectedVariant });
                }
              }}
            >
              Continue to Sign Up
            </button>
          </div>
        </div>
      )}

      {/* What happens next? Modal (for non-invited users) */}
      {showFlowModal && !isInvited && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={() => setShowFlowModal(false)}
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h3 className="text-xl font-bold mb-2 text-slate-900">What happens next?</h3>
            <ol className="mb-4 text-gray-700 text-base list-decimal list-inside space-y-2">
              <li>Complete a quick sign-up form to securely connect you to your therapist.</li>
              <li>Download the Empath app (iOS only).</li>
              <li>Start your Journey on Empath!</li>
            </ol>
            <div className="mt-4 p-3 bg-blue-50 rounded text-blue-900 text-sm border border-blue-200">
              <strong>Don't have an iPhone?</strong><br />
              You can still use Empath by calling <a href={`tel:${PHONE_MAIN}`} className="underline text-slate-900">{`+1 ${PHONE_MAIN_DISPLAY}`}</a> to journal by phone—no app needed!
            </div>
            <button
              className="w-full px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all duration-300 font-light"
              onClick={() => {
                setShowFlowModal(false);
                if (signUpUrl) {
                  window.open(signUpUrl, '_blank', 'noopener,noreferrer');
                  posthog.capture('connect_to_therapist_signup_initiated', { variant: selectedVariant });
                }
              }}
            >
              Continue to Sign Up
            </button>
          </div>
        </div>
      )}

      {/* Call to Journal Modal */}
      {showCallModal && !isInvited && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={() => setShowCallModal(false)}
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h3 className="text-xl font-bold mb-4 text-slate-900 text-center">Journal Instantly—No App Needed</h3>
            <p className="mb-6 text-gray-700 text-center text-base">
              Prefer not to download the app? You can journal by phone or text anytime.
            </p>
            <div className="flex gap-4 mb-6">
              <a
                href={`tel:${PHONE_MAIN}`}
                className="flex-1 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all duration-300 font-light text-center text-lg"
                onClick={() => {
                  setShowCallModal(false);
                  posthog.capture('call_to_journal_call_initiated', { variant: selectedVariant });
                  if (window.twq) {
                    window.twq('event', 'tw-onbx0-onbx0', {
                      event_type: 'call_to_journal',
                      variant: selectedVariant
                    });
                  }
                }}
                aria-label={`Call Empath at ${PHONE_MAIN_DISPLAY} to journal`}
              >
                Call to Journal
              </a>
              <a
                href={`sms:${PHONE_MAIN}`}
                className="flex-1 px-6 py-3 bg-white text-slate-900 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 font-light text-center text-lg"
                onClick={() => {
                  setShowCallModal(false);
                  posthog.capture('text_to_journal_initiated', { variant: selectedVariant });
                  if (window.twq) {
                    window.twq('event', 'tw-onbx0-onbx0', {
                      event_type: 'text_to_journal',
                      variant: selectedVariant
                    });
                  }
                }}
                aria-label={`Text Empath at ${PHONE_MAIN_DISPLAY} to journal`}
              >
                Text to Journal
              </a>
            </div>
            <div className="mt-2 p-4 bg-blue-50 border border-blue-100 rounded-lg text-blue-900 text-sm">
              <div className="font-semibold mb-1">What happens next?</div>
              <ul className="list-disc list-inside space-y-1">
                <li>If you already have an Empath account, your secure call or text will converted into a journal entry and added to your account automatically.</li>
                <li>If you don't have an account, we'll create one for you using your phone number—no extra steps required.</li>
                <li>This is the easiest way to capture your thoughts on the go, even without the app.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Logo in top left corner */}
      <div className="absolute top-4 left-4 z-10">
        <motion.img 
          src={logo} 
          alt="Empath Logo" 
          className="w-12 h-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      </div>
      
      {/* Trust banner at very top */}
      <div className="bg-slate-50 py-2 text-center border-b border-slate-100">
        <p className="text-sm text-slate-600">
          <span className="font-semibold">🔒 HIPAA-Compliant</span> • 
          <span className="font-semibold"> 🏥 Works With Your Therapist</span> • 
          <span className="font-semibold"> 📞 Call or Text—No App Needed</span>
        </p>
      </div>
      
      {/* Hero Section (aligned with Home/Advisory styling) */}
      <motion.section
        className="bg-gradient-to-b from-slate-50 via-gray-50 to-white py-32 relative"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* Subtle background shapes and grid */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="w-96 h-96 bg-slate-200/20 rounded-full absolute -top-20 -left-20 blur-3xl"></div>
          <div className="w-96 h-96 bg-indigo-100/20 rounded-full absolute top-40 -right-20 blur-3xl"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">

          <motion.div
            variants={fadeIn}
            className="text-center mb-8"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light mb-12 leading-tight text-slate-900"
                dangerouslySetInnerHTML={{ __html: heading }} />
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto font-light mb-12"
               dangerouslySetInnerHTML={{ __html: subheading }} />
            

          </motion.div>

          {/* Big CTA Buttons - Much more prominent */}
          <motion.div
            variants={fadeIn}
            className="flex flex-col items-center gap-4 mb-8 max-w-md mx-auto"
          >
            {isInvited ? (
              <>
                <button
                  className="w-full px-8 py-4 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all duration-300 transform hover:-translate-y-0.5 font-light tracking-wide"
                  onClick={() => {
                    setShowFlowModal(true);
                    posthog.capture('connect_to_therapist_clicked', { variant: selectedVariant });
                  }}
                >
                  {therapistName ? `Connect to ${therapistName}` : 'Connect to Your Therapist'} →
                </button>
                <p className="text-sm text-gray-500 text-center">
                  Your therapist invited you • Setup takes 30 seconds
                </p>
              </>
            ) : (
              <>
                <button
                  className="w-full px-8 py-4 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all duration-300 transform hover:-translate-y-0.5 font-light tracking-wide"
                  onClick={() => {
                    setShowInviteModal(true);
                    posthog.capture('hero_cta_clicked', { variant: selectedVariant });
                  }}
                >
                  Start Free Today →
                </button>
                
                <div className="flex items-center gap-4 w-full">
                  <a
                    href={`tel:${PHONE_MAIN}`}
                    className="flex-1 px-8 py-4 bg-white text-slate-900 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 font-light flex items-center justify-center"
                    onClick={() => {
                      posthog.capture('hero_call_clicked', { variant: selectedVariant });
                    }}
                    aria-label={`Call Empath at ${PHONE_MAIN_DISPLAY} to try now`}
                  >
                    📞 Call to journal
                  </a>
                  <a
                    href={`sms:${PHONE_MAIN}`}
                    className="flex-1 px-8 py-4 bg-white text-slate-900 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 font-light flex items-center justify-center"
                    onClick={() => {
                      posthog.capture('hero_text_clicked', { variant: selectedVariant });
                    }}
                    aria-label={`Text Empath at ${PHONE_MAIN_DISPLAY} to try now`}
                  >
                    💬 Text to journal
                  </a>
                </div>
                
                <p className="text-sm text-gray-500 text-center">
                  No app download required
                </p>
              </>
            )}
          </motion.div>

          {/* Quick testimonial */}
          <motion.div
            variants={fadeIn}
            className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-slate-300"
          >
            <p className="text-gray-700 italic mb-3">
              "There are multiple versions of me, but my therapist only met the one that showed up for therapy—not the version that had a fight with my mother, decided to skip a workout, or went for a walk to clear my head. <span className="font-semibold">Now my therapist has access to all those different versions of myself, not just the performative one I become in session.</span> It's like finally giving them the complete map instead of just fragments."
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 mr-3" />
              <div>
                <p className="font-semibold text-gray-800">Sarah M.</p>
                <p className="text-sm text-gray-600">Empath user for 6 months</p>
              </div>
            </div>
          </motion.div>

          {/* Video Section - Moved here with better framing */}
          <motion.div
            variants={fadeIn}
            className="text-center"
          >
            <p className="text-lg text-gray-600 mb-4">
              See how it works in <span className="font-semibold text-slate-900">2 minutes</span> 👇
            </p>
            <div className="max-w-3xl mx-auto rounded-xl overflow-hidden shadow-lg aspect-video bg-gray-100 relative">
              <div className="relative w-full h-full">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/qkCoQ4t7HsQ?enablejsapi=1&controls=0&rel=0&modestbranding=1&showinfo=0" 
                  title="Empath: How It Works (2 minutes)" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                  id="explainerVideo"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                ></iframe>
                
                {/* Play button overlay */}
                <div 
                  className={`absolute inset-0 flex items-center justify-center cursor-pointer transition-all duration-300 z-10 bg-black bg-opacity-30 ${isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                  onClick={() => {
                    const iframe = document.getElementById('explainerVideo') as HTMLIFrameElement;
                    if (iframe && iframe.contentWindow) {
                      iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                      setIsPlaying(true);
                      posthog.capture('explainer_video_played');
                    }
                  }}
                >
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-900 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Value Proposition Banner with Map Metaphor */}
      <motion.section
        className="py-12 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            variants={fadeIn}
            className="text-center"
          >
            <p className="text-lg md:text-xl max-w-4xl mx-auto leading-relaxed text-slate-600"
               dangerouslySetInnerHTML={{ __html: valuePropBanner[selectedVariant] }} />
          </motion.div>
        </div>
      </motion.section>

      {/* 2. The Math - Value Comparison - REDESIGNED */}
      <motion.section
        className="py-16 bg-gradient-to-b from-blue-50 to-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            variants={fadeIn}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-800">
              The Hidden Cost of "How Was Your Week?"
            </h2>
            <p className="text-xl text-center text-gray-600 mb-10">
              You're paying <span className="font-bold text-slate-900">$60-80</span> just to catch your therapist up
            </p>

            {/* Visual comparison with better design */}
            <div className="bg-white p-8 rounded-2xl shadow-lg mb-10">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-500 mb-4">Without Empath</h3>
                  <div className="relative">
                    <div className="w-full h-24 bg-gray-100 rounded-lg overflow-hidden">
                      <div className="absolute inset-0 flex">
                        <div className="w-[40%] bg-red-100 flex items-center justify-center border-r-2 border-white">
                          <div className="text-center px-2">
                            <p className="text-2xl font-bold text-red-600">$70</p>
                            <p className="text-xs text-red-700">wasted on recap</p>
                          </div>
                        </div>
                        <div className="w-[60%] bg-green-100 flex items-center justify-center">
                          <div className="text-center px-2">
                            <p className="text-2xl font-bold text-green-600">$105</p>
                            <p className="text-xs text-green-700">actual therapy</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-gray-600">Total: $175 for 50 minutes</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">With Empath ✨</h3>
                  <div className="relative">
                    <div className="w-full h-24 bg-gray-100 rounded-lg overflow-hidden">
                      <div className="absolute inset-0 flex">
                        <div className="w-[10%] bg-red-100 flex items-center justify-center border-r-2 border-white">
                          <div className="text-center px-1">
                            <p className="text-sm font-bold text-red-600">$17</p>
                          </div>
                        </div>
                        <div className="w-[90%] bg-green-100 flex items-center justify-center">
                          <div className="text-center px-2">
                            <p className="text-2xl font-bold text-green-600">$158</p>
                            <p className="text-xs text-green-700">pure breakthrough time</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-gray-600">Total: $175 for 50 minutes</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <div className="inline-flex items-center bg-yellow-50 border-2 border-yellow-200 rounded-full px-6 py-3">
                  <span className="text-2xl mr-2">💰</span>
                  <span className="text-lg font-bold text-gray-800">
                    Save $600+ per year on therapy you're already paying for
                  </span>
                </div>
              </div>
            </div>

            {/* Clear value props */}
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div variants={fadeIn} className="bg-white rounded-xl p-6 shadow-md text-center transform hover:scale-105 transition-transform">
                <div className="text-4xl mb-3">⏱️</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">20 Extra Minutes</h3>
                <p className="text-gray-600">Of actual therapy work every single session</p>
              </motion.div>
              
              <motion.div variants={fadeIn} className="bg-white rounded-xl p-6 shadow-md text-center transform hover:scale-105 transition-transform">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">3x Faster Progress</h3>
                <p className="text-gray-600">Get to breakthroughs without the weekly recap</p>
              </motion.div>
              
              <motion.div variants={fadeIn} className="bg-white rounded-xl p-6 shadow-md text-center transform hover:scale-105 transition-transform">
                <div className="text-4xl mb-3">🧠</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Never Forget</h3>
                <p className="text-gray-600">Important moments captured when they happen</p>
              </motion.div>
            </div>

            {/* Another CTA */}
            <motion.div variants={fadeIn} className="text-center mt-10">
              <button
                className="px-8 py-4 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all duration-300 font-light tracking-wide"
                onClick={() => {
                  setShowInviteModal(true);
                  posthog.capture('value_section_cta_clicked', { variant: selectedVariant });
                }}
              >
                Claim Your Free Access →
              </button>
              <p className="text-sm text-gray-500 mt-2">Stop wasting time in therapy</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* 3. Micro-story - REDESIGNED with more emotion */}
      <motion.section
        className="py-16 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            variants={fadeIn}
            className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800"
          >
            Your Breakthroughs Don't Wait for Appointments
          </motion.h2>
          <motion.p
            variants={fadeIn}
            className="text-xl text-center text-gray-600 mb-10 max-w-3xl mx-auto"
          >
            Real emotions, insights, and breakthroughs happen when you're most vulnerable—not on Tuesdays at 2pm.
          </motion.p>
          
          <motion.div 
            variants={fadeIn}
            className="max-w-4xl mx-auto"
          >
            <div className="space-y-6">
              {/* Anxiety spiral at 2 AM */}
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500 transform hover:scale-[1.02] transition-transform">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🌙</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-gray-800 text-lg">Sunday 2:17 AM</h3>
                      <div className="text-right">
                        <span className="text-sm text-red-600 font-semibold">9 days until therapy</span>
                        <div className="text-xs text-gray-500">This moment will be forgotten</div>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      <span className="font-semibold text-red-700">"Why does everyone leave me?"</span> The thought hits like a freight train. Heart pounding, spiraling through every relationship. This raw panic, this exact question, these specific fears about abandonment—<span className="italic text-gray-600">this is the therapy material. But my therapist will never see me like this.</span>
                    </p>
                    <div className="mt-3 flex items-center text-sm text-gray-500">
                      <div className="w-2 h-2 bg-red-400 rounded-full mr-2 animate-pulse"></div>
                      Peak vulnerability moment - lost forever
                    </div>
                  </div>
                </div>
              </div>

              {/* Shower breakthrough */}
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500 transform hover:scale-[1.02] transition-transform">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🚿</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-gray-800 text-lg">Wednesday 7:42 AM</h3>
                      <div className="text-right">
                        <span className="text-sm text-yellow-600 font-semibold">6 days until therapy</span>
                        <div className="text-xs text-gray-500">Will try to remember</div>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      Shower epiphany: <span className="font-semibold text-yellow-700">"I'm not actually afraid of success—I'm afraid of being seen."</span> Crystal clear connection between my self-sabotage and childhood shame. This is THE insight that could unlock months of work. <span className="italic text-gray-600">But I'll forget the exact wording, the emotional intensity, the clarity by next Tuesday.</span>
                    </p>
                    <div className="mt-3 flex items-center text-sm text-gray-500">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></div>
                      Breakthrough insight - fading fast
                    </div>
                  </div>
                </div>
              </div>

              {/* Mother trigger moment */}
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500 transform hover:scale-[1.02] transition-transform">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">📞</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-gray-800 text-lg">Friday 4:33 PM</h3>
                      <div className="text-right">
                        <span className="text-sm text-orange-600 font-semibold">4 days until therapy</span>
                        <div className="text-xs text-gray-500">Context will be lost</div>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      Mom calls: <span className="font-semibold text-orange-700">"You look tired in that photo."</span> Instant child-mode: shame, smallness, people-pleasing activated. I can feel my nervous system shift, my voice change. <span className="italic text-gray-600">This exact trigger, this body response, this regression—it's pure therapy gold happening right now. Gone by Tuesday.</span>
                    </p>
                    <div className="mt-3 flex items-center text-sm text-gray-500">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mr-2 animate-pulse"></div>
                      Live trauma response - no witness
                    </div>
                  </div>
                </div>
              </div>

              {/* The therapy session - stark contrast */}
              <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl shadow-md p-6 border-l-4 border-purple-500 transform hover:scale-[1.02] transition-transform">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🎭</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-gray-800 text-lg">Tuesday 2:00 PM</h3>
                      <div className="text-right">
                        <span className="text-sm text-purple-600 font-semibold bg-purple-100 px-2 py-1 rounded-full">Therapy Session</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <p className="text-gray-700 leading-relaxed">
                        <span className="font-semibold text-purple-700">"So... how was your week?"</span>
                      </p>
                      <div className="bg-white rounded-lg p-4 border-l-2 border-gray-300">
                        <p className="text-gray-600 italic text-sm leading-relaxed">
                          Now I'm performing again. Trying to remember... something about my mom? And I think I had an insight in the shower? The raw panic from Sunday feels like it happened to someone else. I'm giving fragments, summaries, performances. My therapist is working with 30% of the story, trying to help navigate a map I can't even remember drawing.
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                          Performance mode: ON
                        </div>
                        <div className="text-sm text-red-600 font-medium">
                          $175 • 3 breakthroughs lost • Starting from scratch
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced CTA with urgency */}
            <motion.div variants={fadeIn} className="mt-12 text-center">
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-2xl p-8 shadow-xl">
                <h3 className="text-3xl font-bold mb-4">
                  Stop Losing Your Breakthrough Moments
                </h3>
                <p className="text-xl mb-2 opacity-90">
                  Your most authentic self appears between sessions—not during them
                </p>
                <p className="text-lg mb-6 text-blue-100">
                  Give your therapist access to <span className="font-bold">all versions</span> of yourself
                </p>
                <button
                  className="px-8 py-4 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all duration-300 font-light tracking-wide"
                  onClick={() => {
                    setShowInviteModal(true);
                    posthog.capture('story_section_cta_clicked', { variant: selectedVariant });
                  }}
                >
                  Capture Every Breakthrough →
                </button>

              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* 4. How Empath Works - SIMPLIFIED & CLEARER */}
      <motion.section
        className="py-16 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            variants={fadeIn}
            className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800"
          >
            Externalize Your Mind, Transform Your Therapy
          </motion.h2>
          <motion.p
            variants={fadeIn}
            className="text-xl text-center text-gray-600 mb-12 max-w-2xl mx-auto"
          >
            Create distance between you and your thoughts. Become the observer, not the observed.
          </motion.p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            <motion.div variants={fadeIn} className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Capture Your Authentic Self</h3>
              <p className="text-gray-600">Voice memo, text, or type when you're most real—not performing for anyone</p>
              <div className="mt-4 flex justify-center gap-2">
                <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">📱 App</div>
                <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">📞 Call</div>
                <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">💬 Text</div>
              </div>
            </motion.div>
            
            <motion.div variants={fadeIn} className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Externalize & Organize</h3>
              <p className="text-gray-600">Transform abstract thoughts into something tangible your therapist can navigate with you</p>
              <div className="mt-4">
                <div className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium inline-block">🔒 HIPAA Secure</div>
              </div>
            </motion.div>
            
            <motion.div variants={fadeIn} className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Become the Observer</h3>
              <p className="text-gray-600">Your therapist guides you to observe your patterns from a distance, creating freedom from being submerged in them</p>
              <div className="mt-4">
                <div className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium inline-block">⚡ True Progress</div>
              </div>
            </motion.div>
          </div>
          
          {/* Quick start options */}
          <motion.div variants={fadeIn} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Try It Right Now!</h3>
            <p className="text-gray-600 mb-6">No commitment. See how easy it is:</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${PHONE_MAIN}`}
                className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all duration-300 font-light"
                onClick={() => {
                  posthog.capture('how_it_works_call_clicked', { variant: selectedVariant });
                }}
                aria-label={`Call Empath at ${PHONE_MAIN_DISPLAY}`}
              >
                📞 Call {PHONE_MAIN_DISPLAY}
              </a>
              <a
                href={`sms:${PHONE_MAIN}`}
                className="px-6 py-3 bg-white text-slate-900 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all font-light"
                onClick={() => {
                  posthog.capture('how_it_works_text_clicked', { variant: selectedVariant });
                }}
                aria-label={`Text Empath at ${PHONE_MAIN_DISPLAY}`}
              >
                💬 Text to Start
              </a>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* 5. Testimonials Section - NEW */}
      <motion.section
        className="py-16 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            variants={fadeIn}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
          >
            Real People, Real Breakthroughs
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div variants={fadeIn} className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex mb-3">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Empath helped me become the observer of my own mind instead of being submerged in my thoughts. <span className="font-semibold">By externalizing my thinking through journaling, I could finally look at my patterns from a distance.</span> My therapist became my guide in this process rather than just someone I performed for."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 mr-3" />
                <div>
                  <p className="font-semibold text-gray-800">Jennifer K.</p>
                  <p className="text-sm text-gray-600">Anxiety & Depression</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex mb-3">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "I realized Instagram's algorithm knew me better than my therapist because it saw me when I was alone and authentic. <span className="font-semibold">Empath gave my therapist that same access to my real thoughts and feelings, not just the curated version I brought to sessions.</span> Game changer."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-green-400 mr-3" />
                <div>
                  <p className="font-semibold text-gray-800">Marcus T.</p>
                  <p className="text-sm text-gray-600">ADHD & Relationships</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex mb-3">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Life doesn't happen on a schedule, but therapy does. <span className="font-semibold">Now when I have a breakthrough insight at 2am or a panic attack on Sunday, my therapist knows about it.</span> We spend our time working through patterns, not trying to remember what happened."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-400 mr-3" />
                <div>
                  <p className="font-semibold text-gray-800">Rachel P.</p>
                  <p className="text-sm text-gray-600">Trauma Recovery</p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div variants={fadeIn} className="text-center mt-10">
            <button
              className="px-8 py-4 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all duration-300 font-light tracking-wide"
              onClick={() => {
                setShowInviteModal(true);
                posthog.capture('testimonial_cta_clicked', { variant: selectedVariant });
              }}
            >
              Join Thousands Getting More From Therapy →
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* 6. Why You'll Feel the Difference - REDESIGNED */}
      <motion.section
        className="py-16 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            variants={fadeIn}
            className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800"
          >
            The Philosophy Behind Empath
          </motion.h2>
          <motion.p
            variants={fadeIn}
            className="text-xl text-center text-gray-600 mb-12 max-w-2xl mx-auto"
          >
            This isn't just another journal app. It's designed to enhance the fundamental work of therapy itself.
          </motion.p>
          
          <motion.div 
            variants={fadeIn}
            className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8"
          >
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100">
              <h3 className="font-bold text-xl mb-4 text-slate-900">Empath ✨</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Designed to help you become the observer of your mind</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Externalizes thoughts so you can observe them from distance</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Gives therapist access to your authentic self, not just the performative version</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Creates a complete map of your inner world for your therapist to navigate</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Transforms therapy from performance to authentic self-discovery</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold text-xl mb-4 text-gray-600">Generic Journal Apps</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Ban className="w-5 h-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Just digital note-taking with no therapeutic purpose</span>
                </li>
                <li className="flex items-start">
                  <Ban className="w-5 h-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Therapist has to sift through raw data without context</span>
                </li>
                <li className="flex items-start">
                  <Ban className="w-5 h-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">No understanding of the observer-observed dynamic</span>
                </li>
                <li className="flex items-start">
                  <Ban className="w-5 h-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Doesn't bridge the gap between sessions and real life</span>
                </li>
                <li className="flex items-start">
                  <Ban className="w-5 h-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Misses the multiple versions of yourself</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* 7. Choose Your Lane - SIMPLIFIED */}
      <motion.section
        className="py-16 bg-gradient-to-b from-gray-50 to-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            variants={fadeIn}
            className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800"
          >
            Ready to Transform Your Therapy?
          </motion.h2>
          <motion.p
            variants={fadeIn}
            className="text-xl text-center text-gray-600 mb-12 max-w-2xl mx-auto"
          >
            Get more from every session
          </motion.p>
          
          <motion.div variants={fadeIn} className="max-w-lg mx-auto">
            <button
              className="w-full px-8 py-5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all duration-300 font-light tracking-wide text-2xl mb-6"
              onClick={() => {
                setShowInviteModal(true);
                posthog.capture('final_cta_clicked', { variant: selectedVariant });
              }}
            >
              Get Started Free →
            </button>
            
            <div className="text-center">
              <p className="text-gray-600 mb-4">Or try it instantly:</p>
              <div className="flex gap-4 justify-center">
                <a
                  href={`tel:${PHONE_MAIN}`}
                  className="px-6 py-3 bg-white text-slate-900 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all font-light"
                  onClick={() => {
                    posthog.capture('final_call_clicked', { variant: selectedVariant });
                  }}
                  aria-label={`Call Empath at ${PHONE_MAIN_DISPLAY}`}
                >
                  📞 Call Now
                </a>
                <a
                  href={`sms:${PHONE_MAIN}`}
                  className="px-6 py-3 bg-white text-slate-900 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all font-light"
                  onClick={() => {
                    posthog.capture('final_text_clicked', { variant: selectedVariant });
                  }}
                  aria-label={`Text Empath at ${PHONE_MAIN_DISPLAY}`}
                >
                  💬 Text Now
                </a>
              </div>
            </div>
            
            {/* Trust badges */}
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-1 text-green-600" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-1 text-green-600" />
                <span>No Credit Card</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1 text-green-600" />
                <span>Setup in 30 Seconds</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* 8. Security & Privacy */}
      <motion.section
        className="py-16 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            variants={fadeIn}
            className="text-3xl font-bold text-center mb-12 text-gray-800"
          >
            Security & Privacy
          </motion.h2>
          
          <motion.div 
            variants={fadeIn}
            className="max-w-3xl mx-auto"
          >
            <ul className="space-y-4">
              <li className="flex items-start">
                <Shield className="text-[#00B9B0] w-6 h-6 mr-3 flex-shrink-0 mt-1" />
                <p className="text-gray-700">End-to-end encryption (AES-256 in transit & at rest)</p>
              </li>
              <li className="flex items-start">
                <Shield className="text-[#00B9B0] w-6 h-6 mr-3 flex-shrink-0 mt-1" />
                <p className="text-gray-700">HIPAA-ready infrastructure & BAA with providers</p>
              </li>
              <li className="flex items-start">
                <Ban className="text-[#00B9B0] w-6 h-6 mr-3 flex-shrink-0 mt-1" />
                <p className="text-gray-700">Data <strong>never</strong> sold or used for ads</p>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-[#00B9B0] w-6 h-6 mr-3 flex-shrink-0 mt-1" />
                <p className="text-gray-700">You can delete your entries at any time</p>
              </li>
              <li className="flex items-start">
                <FileText className="text-[#00B9B0] w-6 h-6 mr-3 flex-shrink-0 mt-1" />
                <p className="text-gray-700">
                  Read our <Link to="/pledge" className="text-slate-900 hover:underline font-medium">Privacy Pledge</Link>, 
                  <Link to="/privacy" className="text-slate-900 hover:underline font-medium"> Privacy Policy</Link>, and 
                  <Link to="/terms" className="text-slate-900 hover:underline font-medium"> Terms & Conditions</Link> for complete details
                </p>
              </li>
            </ul>
          </motion.div>
        </div>
      </motion.section>

      {/* 9. FAQ */}
      <motion.section
        className="py-16 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            variants={fadeIn}
            className="text-3xl font-bold text-center mb-12 text-gray-800"
          >
            Frequently Asked Questions
          </motion.h2>
          
          <motion.div 
            variants={fadeIn}
            className="max-w-3xl mx-auto bg-white rounded-2xl p-6 shadow-md divide-y divide-gray-100"
          >
            <FAQItem 
              question="Do I have to download an app?" 
              answer="No. You can journal by phone call or text instead. Just dial +1 877 652 8626 anytime to share your thoughts, and we'll make sure they get to your therapist before your next session."
            />
            <FAQItem 
              question="Will my therapist see everything I log?" 
              answer="No. On the app you will have the option to share/un-share entries with your therapist. Your therapist will only see the entries you share."
            />
            <FAQItem 
              question="When does my therapist see my entries?" 
              answer="Your therapist receives a digest of your entries just before your scheduled session. This timing ensures they have the most up-to-date information without creating expectations of mid-week responses."
            />
            <FAQItem 
              question="Will my therapist message me mid-week?" 
              answer="No. Empath is preparation for your sessions, not a live chat platform. This boundary ensures your therapist maintains their professional capacity and prevents burnout."
            />
            <FAQItem 
              question="Does Empath replace therapy?" 
              answer="No. It simply makes the therapy you already value more efficient. Empath helps you capture your experiences more accurately and helps your therapist understand your week better, but it's not a substitute for the therapeutic relationship."
            />
            <FAQItem 
              question="How does Empath help me become the observer of my own mind?" 
              answer="By externalizing your thoughts through journaling, you make abstract mental patterns tangible and observable. This creates distance between you (the observer) and your thoughts (the observed), which is fundamental therapeutic work. Your therapist then guides you in this process of self-observation rather than just listening to you perform or recall fragments."
            />
            <FAQItem 
              question="How is this different from other mental health apps?" 
              answer="Unlike general wellness apps, Empath is designed specifically to enhance your existing therapy relationship. We don't provide therapy ourselves—we enhance the therapy you're already getting by improving the information flow between sessions."
            />
            <FAQItem 
              question="Is it really secure?" 
              answer="Yes. We meet or exceed HIPAA requirements and work under a signed BAA with your therapist. Your data is encrypted end-to-end, and we never sell or share your information with third parties."
            />
            <FAQItem 
              question="How much does it cost?" 
              answer="Empath is free to clients through their therapists."
            />
          </motion.div>

          <motion.div 
            variants={fadeIn}
            className="max-w-3xl mx-auto mt-6 p-4 bg-white rounded-lg border border-red-100 flex"
          >
            <Ban className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-1" />
            <p className="text-sm text-gray-700">
              <span className="font-medium text-red-600">Important:</span> Empath is not emergency monitoring or a replacement for therapy. If you're experiencing a crisis, please contact emergency services or a crisis hotline immediately.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* 10. Citations */}
      <motion.section
        className="py-8 bg-gray-100 text-xs text-gray-500"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h3 className="font-medium mb-2">Sources:</h3>
            <ul className="space-y-1">
              <li>• Average US therapy cost $100-$200/session (Healthline; Medical News Today).</li>
              <li>• Physicians spend ~16-20% of work time on admin (Int. J. Health Services study, Psychiatry Advisor).</li>
              <li>• Journaling interventions linked to improved mental-health outcomes (Systematic review, PMC 2022).</li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Legal Links Footer */}
      <motion.section
        className="py-6 bg-gray-900 text-gray-400"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8 text-center md:text-left">
            <p className="text-sm">© {new Date().getFullYear()} Reality Articulated Inc.</p>
            <div className="flex items-center gap-4 text-sm">
              <Link to="/pledge" className="hover:text-slate-300 transition-colors">
                Privacy Pledge
              </Link>
              <span className="hidden md:inline">•</span>
              <Link to="/privacy" className="hover:text-slate-300 transition-colors">
                Privacy Policy
              </Link>
              <span className="hidden md:inline">•</span>
              <Link to="/terms" className="hover:text-slate-300 transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Fixed bottom CTA on mobile */}
      {!isInvited && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-3 flex gap-2 z-50">
          <button
            className="flex-1 px-3 py-2 bg-slate-900 text-white rounded-lg text-sm font-light text-center flex items-center justify-center focus:outline-none hover:bg-slate-800 transition"
            onClick={() => {
              setShowInviteModal(true);
            }}
          >
            <Smartphone className="w-4 h-4 mr-1" /> Start on Mobile App
          </button>
          <div className="flex flex-col items-center flex-1">
            <button
              className="w-full px-3 py-2 bg-white text-slate-900 rounded-lg border border-slate-200 text-sm font-light text-center flex items-center justify-center hover:border-slate-300 hover:bg-slate-50 transition"
              onClick={() => setShowCallModal(true)}
            >
              <Phone className="w-4 h-4 mr-1" /> Call to Journal
            </button>
          </div>
        </div>
      )}

      {/* Floating CTA Bar - Desktop */}
      {showFloatingCTA && !isInvited && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-0 left-0 right-0 bg-white shadow-lg border-b border-gray-200 z-50 hidden md:block"
        >
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.img 
                  src={logo} 
                  alt="Empath Logo" 
                  className="w-10 h-10"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-800">Ready to transform your therapy?</p>
                  <p className="text-xs text-gray-600">Join users already getting more from every session</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all duration-300 font-light"
                  onClick={() => {
                    setShowInviteModal(true);
                    posthog.capture('floating_cta_clicked', { variant: selectedVariant });
                  }}
                >
                  Get Started Free →
                </button>
                <a
                  href={`tel:${PHONE_MAIN}`}
                  className="px-6 py-2 bg-white text-slate-900 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all font-light"
                  onClick={() => {
                    posthog.capture('floating_call_clicked', { variant: selectedVariant });
                  }}
                  aria-label={`Call Empath at ${PHONE_MAIN_DISPLAY}`}
                >
                  📞 Call Now
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Floating CTA Bar for Invited Users - Desktop */}
      {showFloatingCTA && isInvited && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg z-50 hidden md:block"
        >
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.img 
                  src={logo} 
                  alt="Empath Logo" 
                  className="w-10 h-10 brightness-0 invert"
                />
                <div className="text-white">
                  <p className="text-sm font-semibold">Your therapist is waiting for you to connect</p>
                  <p className="text-xs opacity-90">Complete your setup in just 30 seconds</p>
                </div>
              </div>
              <button
                className="px-6 py-2 bg-white text-slate-900 rounded-lg hover:bg-slate-50 transition-all duration-300 font-light"
                onClick={() => {
                  setShowFlowModal(true);
                  posthog.capture('floating_connect_clicked', { variant: selectedVariant });
                }}
              >
                {therapistName ? `Connect to ${therapistName}` : 'Connect Now'} →
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
} 