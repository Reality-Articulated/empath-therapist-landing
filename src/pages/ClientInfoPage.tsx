import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, CheckCircle, Shield, Clock, Calendar, Mic, Smartphone, Brain, Ban, Info, Phone, Download } from 'lucide-react';
import logo from '../../public/empath-logo.png';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';
import posthog from 'posthog-js';
import { useFeatureFlagVariantKey } from 'posthog-js/react';

// Declare YouTube API types
declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
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

// FAQ Accordion Item Component
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="w-full py-4 flex justify-between items-center text-left text-lg font-medium text-gray-700 hover:text-[#1281dd] transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        <ChevronDown className={`w-5 h-5 text-[#1281dd] transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="pb-6 pt-2 text-gray-600 pr-6">
          {answer}
        </div>
      )}
    </div>
  );
};

const variantContent = {
  unheard_a: {
    heading: 'Stop Sharing Weekly Puzzle Pieces <br /> Give Your Therapist The Complete Picture',
    subheading: 'Empath gives your therapist a deeper understanding of your life experience'
  },
  unheard_b: {
    heading: 'If No One Gets You, <br /> Ensure Your Therapist Truly Does',
    subheading: 'Empath gives your therapist a deeper understanding of your life experience'
  },
  rushed_a: {
    heading: 'Never Feel Rushed in Therapy Again',
    subheading: 'Empath maximizes every minute, so breakthroughs aren\'t cut short by the clock.'
  },
  rushed_b: {
    heading: 'Avoid Throwing a Time-Wrench <br /> in Your Therapy Wheel',
    subheading: 'Empath maximizes every minute, so breakthroughs aren\'t cut short by the clock.'
  },
  timesave_a: {
    heading: '70 Minutes of Therapy Progress <br /> in 50 Minutes',
    subheading: 'Empath frees up 15–20 extra minutes every session — so you can spend more time healing, growing, and making real breakthroughs, <span class="font-semibold">without paying a penny more.</span>'
  },
  control: {
    heading: 'Feel Truly Understood by Your Therapist',
    subheading: 'Empath gives your therapist a deeper understanding of your life experience'
  }
};

// Value Proposition Banner copy by variant
const valuePropBanner = {
  unheard_a: "Make sure your therapist truly understands what you're going through.<br /><span class='font-semibold text-[#1281dd]'>Their understanding leads to your breakthroughs.</span>",
  unheard_b: "Make sure your therapist truly understands what you're going through.<br /><span class='font-semibold text-[#1281dd]'>Their understanding leads to your breakthroughs.</span>",
  rushed_a: "Spend less time catching up,<br /><span class='font-semibold text-[#1281dd]'>More time making breakthroughs.</span>",
  rushed_b: "Spend less time catching up,<br /><span class='font-semibold text-[#1281dd]'>More time making breakthroughs.</span>",
  timesave_a: "Reclaim the ~20 minutes spent recapping in every session.<br /><span class='font-semibold text-[#1281dd]'>More therapy value, same therapy bill.</span>",
  control: "Make sure your therapist truly understands what you're going through.<br /><span class='font-semibold text-[#1281dd]'>Their understanding leads to your breakthroughs.</span>"
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
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const signUpToken = params.get('signUpToken');
      const token = params.get('token');
      const therapistNameParam = params.get('therapistName');
      if (signUpToken && token) {
        setSignUpUrl(`https://empath-793bdf3d3ee1.herokuapp.com/sign-up-client/${signUpToken}/${token}`);
      } else {
        setSignUpUrl(null);
      }
      setTherapistName(therapistNameParam ? decodeURIComponent(therapistNameParam) : null);
    }
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
        'template_7kwdlh8',
        {
          to_email: 'karan@myempath.co',
          user_email: userEmail,
          therapist_email: noTherapist ? 'No therapist' : therapistEmail,
          no_therapist: noTherapist ? 'Yes' : 'No',
        },
        'RkdQiScnBEMQIBtNL'
      );
      toast.success('Thank you! We will reach out to your therapist and let you know when you are connected.');
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
      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
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
            <h3 className="text-xl font-bold mb-2 text-[#1281dd]">You need an invite from your therapist</h3>
            <p className="mb-4 text-gray-600 text-sm">To use Empath, your therapist needs to invite you. Enter your email and your therapist's email below. We'll reach out to get you connected!</p>
            {inviteSubmitted ? (
              <div className="text-green-600 font-medium text-center py-4">Thank you! We'll reach out to your therapist and let you know when you're connected.</div>
            ) : (
              <form onSubmit={handleInviteSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1281dd]"
                    value={userEmail}
                    onChange={e => setUserEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Therapist's Email</label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1281dd]"
                    value={therapistEmail}
                    onChange={e => setTherapistEmail(e.target.value)}
                    required={!noTherapist}
                    disabled={noTherapist}
                    placeholder={noTherapist ? 'Not required' : ''}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    id="no-therapist"
                    type="checkbox"
                    checked={noTherapist}
                    onChange={e => setNoTherapist(e.target.checked)}
                    className="h-4 w-4 text-[#1281dd] border-gray-300 rounded focus:ring-[#1281dd]"
                  />
                  <label htmlFor="no-therapist" className="text-sm text-gray-700 select-none">I don't currently have a therapist</label>
                </div>
                {inviteError && <div className="text-red-600 text-sm">{inviteError}</div>}
                <button
                  type="submit"
                  className="w-full bg-[#1281dd] text-white rounded-full py-2 font-semibold hover:bg-[#0e6bb8] transition"
                >
                  Submit
                </button>
              </form>
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
            <h3 className="text-xl font-bold mb-2 text-[#1281dd]">Connect to your Therapist</h3>
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
              className="w-full bg-[#1281dd] text-white rounded-full py-2 font-semibold hover:bg-[#0e6bb8] transition mt-4"
              onClick={() => {
                setShowFlowModal(false);
                if (signUpUrl) {
                  window.open(signUpUrl, '_blank', 'noopener,noreferrer');
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
            <h3 className="text-xl font-bold mb-2 text-[#1281dd]">What happens next?</h3>
            <ol className="mb-4 text-gray-700 text-base list-decimal list-inside space-y-2">
              <li>Complete a quick sign-up form to securely connect you to your therapist.</li>
              <li>Download the Empath app (iOS only).</li>
              <li>Start your Journey on Empath!</li>
            </ol>
            <div className="mt-4 p-3 bg-blue-50 rounded text-blue-900 text-sm border border-blue-200">
              <strong>Don't have an iPhone?</strong><br />
              You can still use Empath by calling <a href="tel:+18776528626" className="underline text-[#1281dd]">+1 877 652 8626</a> to journal by phone—no app needed!
            </div>
            <button
              className="w-full bg-[#1281dd] text-white rounded-full py-2 font-semibold hover:bg-[#0e6bb8] transition"
              onClick={() => {
                setShowFlowModal(false);
                if (signUpUrl) {
                  window.open(signUpUrl, '_blank', 'noopener,noreferrer');
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
            <h3 className="text-xl font-bold mb-4 text-[#1281dd] text-center">Journal Instantly—No App Needed</h3>
            <p className="mb-6 text-gray-700 text-center text-base">
              Prefer not to download the app? You can journal by phone or text anytime.
            </p>
            <div className="flex gap-4 mb-6">
              <a
                href="tel:+18776528626"
                className="flex-1 bg-[#1281dd] text-white rounded-full py-3 font-semibold text-center text-lg shadow hover:bg-[#0e6bb8] transition"
                onClick={() => setShowCallModal(false)}
              >
                Call to Journal
              </a>
              <a
                href="sms:+18776528626"
                className="flex-1 bg-white text-[#1281dd] border border-[#1281dd] rounded-full py-3 font-semibold text-center text-lg shadow hover:bg-blue-50 transition"
                onClick={() => setShowCallModal(false)}
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
      
      {/* 1. Hero Section */}
      <motion.section
        className="bg-gradient-to-b from-blue-50 via-teal-50/30 to-white pt-12 pb-16 relative"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            variants={fadeIn}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-teal-500 animate-gradient-x"
                dangerouslySetInnerHTML={{ __html: heading }} />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed"
               dangerouslySetInnerHTML={{ __html: subheading }} />
          </motion.div>

          {/* Video prompt */}
          <motion.div
            variants={fadeIn}
            className="text-center mb-4"
          >
            <p className="text-lg text-[#1281dd] font-medium flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Watch this 2-minute video to see how Empath improves therapy sessions
            </p>
          </motion.div>

          {/* Video Section */}
          <motion.div
            variants={fadeIn}
            className="max-w-3xl mx-auto rounded-xl overflow-hidden shadow-lg mb-10 aspect-video bg-gray-100 relative"
          >
            <div className="relative w-full h-full">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/qkCoQ4t7HsQ?enablejsapi=1&controls=0&rel=0&modestbranding=1&showinfo=0" 
                title="Empath Explainer Video" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
                id="explainerVideo"
              ></iframe>
              
              {/* Play button overlay - visible when video is paused */}
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
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#1281dd]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              {/* Pause button - only visible on hover when playing */}
              <div 
                className={`absolute inset-0 flex items-center justify-center cursor-pointer z-10 opacity-0 hover:opacity-100 transition-opacity duration-300 ${!isPlaying ? 'pointer-events-none' : ''}`}
                onClick={() => {
                  const iframe = document.getElementById('explainerVideo') as HTMLIFrameElement;
                  if (iframe && iframe.contentWindow) {
                    iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                    setIsPlaying(false);
                    posthog.capture('explainer_video_paused');
                  }
                }}
              >
                <div className="w-12 h-12 bg-white bg-opacity-80 rounded-full flex items-center justify-center shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#1281dd]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Value Proposition Banner */}
          <motion.div 
            variants={fadeIn}
            className="max-w-3xl mx-auto bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-4 mb-8 border border-teal-100 shadow-sm"
          >
            <div className="text-center">
              <p className="text-gray-700 mt-1" dangerouslySetInnerHTML={{ __html: valuePropBanner[selectedVariant] }} />
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={fadeIn}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-6"
          >
            {isInvited ? (
              <button
                className="px-6 py-4 bg-[#1281dd] text-white rounded-full hover:shadow-lg shadow-md transition-all duration-300 transform font-semibold text-center text-lg flex items-center justify-center focus:outline-none"
                onClick={() => {
                  setShowFlowModal(true);
                  posthog.capture('connect_to_therapist_clicked', { variant: selectedVariant });
                }}
              >
                <Smartphone className="w-5 h-5 mr-2" /> {therapistName ? `Connect to ${therapistName}` : 'Connect to your Therapist'}
              </button>
            ) : (
              <>
                <button
                  className="px-6 py-4 bg-[#1281dd] text-white rounded-full hover:shadow-lg shadow-md transition-all duration-300 transform font-semibold text-center text-lg flex items-center justify-center focus:outline-none"
                  onClick={() => {
                    setShowInviteModal(true);
                    posthog.capture('start_on_mobile_clicked', { variant: selectedVariant });
                  }}
                >
                  <Smartphone className="w-5 h-5 mr-2" /> Start on Mobile App
                </button>
                <div className="flex flex-col items-center">
                  <button
                    className="px-6 py-4 bg-white text-[#1281dd] rounded-full shadow-md hover:shadow-lg border border-[#1281dd]/20 transition-all duration-300 font-semibold text-center text-lg flex items-center justify-center"
                    onClick={() => {
                      setShowCallModal(true);
                      posthog.capture('call_to_journal_clicked', { variant: selectedVariant });
                    }}
                  >
                    <Phone className="w-5 h-5 mr-2" /> Just Call to Journal
                  </button>
                </div>
              </>
            )}
          </motion.div>
          
          {/* Privacy Banner */}
          <motion.div
            variants={fadeIn}
            className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border border-blue-100 p-3 flex items-center"
          >
            <Shield className="text-[#1281dd] w-5 h-5 mr-2 flex-shrink-0" />
            <p className="text-sm text-gray-600">
              <span className="font-medium">HIPAA-grade privacy:</span> Your therapist sees your entries only before your appointment—not in real-time.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* 2. The Math - Value Comparison */}
      <motion.section
        className="py-12 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            variants={fadeIn}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-8 text-gray-800">
              Here's exactly what you get:
            </h2>

            {/* Session comparison visualization */}
            <div className="bg-gray-50 p-6 rounded-xl mb-8">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="flex flex-col items-center w-full md:w-80">
                  <div className="text-gray-700 mb-2 font-medium">Without Empath</div>
                  <div className="w-full h-16 flex overflow-hidden rounded-lg">
                    <div className="w-[50%] bg-gray-300 flex items-center justify-center text-xs text-gray-700 font-medium px-2">
                      20 min of "how was your week?"
                    </div>
                    <div className="w-[50%] bg-teal-900 flex items-center justify-center text-xs text-white font-medium">
                      ~30 min: Real progress
                    </div>
                  </div>
                </div>
                
                <div className="text-xl font-bold text-gray-400">vs</div>
                
                <div className="flex flex-col items-center w-full md:w-80">
                  <div className="text-[#1281dd] mb-2 font-medium">With Empath</div>
                  <div className="w-full h-16 flex overflow-hidden rounded-lg">
                    <div className="w-[11%] bg-gray-300 flex items-center justify-center text-xs text-gray-700 font-medium px-2">
                      5 min catch -up
                    </div>
                    <div className="w-[89%] bg-[#1281dd] flex items-center justify-center text-xs text-white font-medium">
                      ~45 min: Real breakthroughs
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-center mt-6 text-gray-700 font-medium">
                That's <span className="text-[#1281dd] font-bold">125% more productive therapy time</span> from the same session.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-teal-100 p-5">
                <div className="text-2xl font-bold text-[#1281dd] mb-2 flex items-center justify-center">
                  Save +$600
                  <div className="relative group ml-2">
                    <Info className="w-4 h-4 text-gray-400" />
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                      Based on saving 15-20 min per session at the U.S. average $175/50-min private-pay rate. Your exact value scales with your therapist's fee.
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">Value of therapy time reclaimed over 10 sessions</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-teal-100 p-5">
                <div className="text-2xl font-bold text-[#1281dd] mb-2 text-center">3x Faster</div>
                <p className="text-gray-600">Progress through therapy goals and breakthroughs</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-teal-100 p-5">
                <div className="text-2xl font-bold text-[#1281dd] mb-2 text-center">Zero Prep</div>
                <p className="text-gray-600">Just speak or text as thoughts occur</p>
              </div>
            </div>

          </motion.div>
        </div>
      </motion.section>

      {/* 3. Micro-story */}
      <motion.section
        className="py-12 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            variants={fadeIn}
            className="text-3xl font-bold text-center mb-8 text-gray-800"
          >
            A Thursday meltdown shouldn't fade by Tuesday afternoon.
          </motion.h2>
          
          <motion.div 
            variants={fadeIn}
            className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6"
          >
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full mr-4">
                  <Calendar className="text-blue-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-blue-700 mb-1">Thu – 9 PM: Snap at your partner</h3>
                  <p className="text-gray-600">
                    Anger, shame, racing heart. <span className="italic text-gray-500">Four days pass...</span>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-purple-100 p-2 rounded-full mr-4">
                  <Brain className="text-purple-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-purple-700 mb-1">Sun – 11 PM: Anxious spiral</h3>
                  <p className="text-gray-600">
                    Looping thoughts keep you awake. <span className="italic text-gray-500">Memory starts to blur...</span>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-teal-100 p-2 rounded-full mr-4">
                  <Clock className="text-teal-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-teal-700 mb-1">Tue – 1 PM: Therapy starts</h3>
                  <p className="text-gray-600">
                    You grasp for details; only a vague story surfaces.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-center text-gray-700">
                <span className="font-medium">Insight hits in real life, not on your calendar.</span><br />
                <span className="italic">Capture it with Empath — so Tuesday feels as clear as Thursday night.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* 4. How Empath Works */}
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
            How Empath Works
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div variants={fadeIn} className="bg-white rounded-xl shadow-md p-6 border-t-4 border-blue-400">
              <div className="text-blue-500 font-bold text-xl mb-3 flex items-center">
                <span className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center mr-2 text-blue-700">1</span>
                Capture the moment when it happens
              </div>
              <p className="text-gray-600 mb-4">
                Speak, type, or let your Apple Watch share sleep & heart-rate.
              </p>
              <div className="flex justify-center gap-3 mt-4">
                <div className="p-2 bg-blue-50 rounded-full">
                  <Mic className="w-5 h-5 text-blue-600" />
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <Smartphone className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={fadeIn} className="bg-white rounded-xl shadow-md p-6 border-t-4 border-teal-400">
              <div className="text-teal-500 font-bold text-xl mb-3 flex items-center">
                <span className="bg-teal-100 w-8 h-8 rounded-full flex items-center justify-center mr-2 text-teal-700">2</span>
                We distill the noise
              </div>
              <p className="text-gray-600">
              Our secure and encrypted system turns raw entries into a 3-minute digest only your therapist sees before you meet.
              </p>
              <div className="text-xs text-gray-500 mt-3 italic">
                Not a live feed—your therapist reviews just before your session
              </div>
            </motion.div>
            
            <motion.div variants={fadeIn} className="bg-white rounded-xl shadow-md p-6 border-t-4 border-purple-400">
              <div className="text-purple-500 font-bold text-xl mb-3 flex items-center">
                <span className="bg-purple-100 w-8 h-8 rounded-full flex items-center justify-center mr-2 text-purple-700">3</span>
                Walk in 100 % understood
              </div>
              <p className="text-gray-600">
                Your session opens on breakthroughs—not "So, how was your week?"
              </p>
            </motion.div>
          </div>
          
          <motion.p 
            variants={fadeIn}
            className="text-center text-sm italic text-gray-500 mt-6 max-w-3xl mx-auto"
          >
            *No Watch? No problem—voice & text work on any phone.
          </motion.p>
        </div>
      </motion.section>

      {/* 5. Why You'll Feel the Difference */}
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
            Why You'll Feel the Difference
          </motion.h2>
          
          <motion.div 
            variants={fadeIn}
            className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 text-[#00B9B0] mr-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
              </div>
              <p className="text-gray-700"><span className="font-semibold">More therapy value</span> – 15-20 extra productive minutes each session.</p>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 text-[#00B9B0] mr-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
              </div>
              <p className="text-gray-700"><span className="font-semibold">Feel fully heard</span> – even the 2 a.m. thoughts you forget to mention.</p>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 text-[#00B9B0] mr-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
              </div>
              <p className="text-gray-700"><span className="font-semibold">Deeper breakthroughs, faster</span> – therapist dives straight into patterns.</p>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 text-[#00B9B0] mr-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
              </div>
              <p className="text-gray-700"><span className="font-semibold">No extra homework</span> – a quick voice note is enough.</p>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 text-[#00B9B0] mr-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
              </div>
              <p className="text-gray-700"><span className="font-semibold">HIPAA-grade privacy</span> – your data is encrypted and seen only by your therapist.</p>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 text-[#00B9B0] mr-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
              </div>
              <p className="text-gray-700"><span className="font-semibold">Double your progress</span> – by transforming catch-up time into breakthrough time.</p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* 6. Choose Your Lane */}
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
            Choose Your Lane
          </motion.h2>
          {isInvited ? (
            <motion.div variants={fadeIn} className="max-w-4xl mx-auto flex flex-col gap-8">
              <button
                className="px-6 py-4 bg-[#1281dd] text-white rounded-full hover:shadow-lg shadow-md transition-all duration-300 transform font-semibold text-center text-lg flex items-center justify-center focus:outline-none mb-6 mx-auto w-full md:w-1/2"
                onClick={() => {
                  setShowFlowModal(true);
                  posthog.capture('connect_to_therapist_clicked', { variant: selectedVariant });
                }}
              >
                <Smartphone className="w-5 h-5 mr-2" /> {therapistName ? `Connect to ${therapistName}` : 'Connect to your Therapist'}
              </button>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Mobile App Card */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 shadow-md border border-teal-100 flex flex-col">
                  <h3 className="text-2xl font-bold text-[#1281dd] mb-6 text-center flex items-center justify-center">
                    <Smartphone className="w-6 h-6 mr-2" /> Mobile App
                  </h3>
                  {/* No download button for invited users */}
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <CheckCircle className="text-[#00B9B0] w-5 h-5 mr-3 flex-shrink-0 mt-1" />
                      <span>Mood check-ins & journals</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-[#00B9B0] w-5 h-5 mr-3 flex-shrink-0 mt-1" />
                      <span>Health-data sync</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-[#00B9B0] w-5 h-5 mr-3 flex-shrink-0 mt-1" />
                      <span>Insight dashboards</span>
                    </li>
                  </ul>
                </div>
                {/* Call to Journal Card */}
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 shadow-md border border-purple-100 flex flex-col">
                  <h3 className="text-2xl font-bold text-purple-700 mb-6 text-center flex items-center justify-center">
                    <Phone className="w-6 h-6 mr-2" /> Call to Journal
                  </h3>
                  {/* No call button for invited users */}
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <CheckCircle className="text-purple-500 w-5 h-5 mr-3 flex-shrink-0 mt-1" />
                      <span>No app download needed</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-purple-500 w-5 h-5 mr-3 flex-shrink-0 mt-1" />
                      <span>Call or Text to record thoughts in the moment</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-purple-500 w-5 h-5 mr-3 flex-shrink-0 mt-1" />
                      <span>Perfect for journling on a walk or commute</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              variants={fadeIn}
              className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8"
            >
              {/* Mobile App Card */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 shadow-md border border-teal-100 flex flex-col">
                <h3 className="text-2xl font-bold text-[#1281dd] mb-6 text-center flex items-center justify-center">
                  <Smartphone className="w-6 h-6 mr-2" /> Start on Mobile App
                </h3>
                <button
                  className="flex-1 px-3 py-2 bg-[#1281dd] text-white rounded-full text-sm font-medium text-center flex items-center justify-center mb-4 w-full focus:outline-none hover:bg-[#0e6bb8] transition"
                  onClick={() => {
                    setShowInviteModal(true);
                    posthog.capture('start_on_mobile_clicked', { variant: selectedVariant });
                  }}
                >
                  <Smartphone className="w-4 h-4 mr-1" /> Start on Mobile App
                </button>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="text-[#00B9B0] w-5 h-5 mr-3 flex-shrink-0 mt-1" />
                    <span>Mood check-ins & journals</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-[#00B9B0] w-5 h-5 mr-3 flex-shrink-0 mt-1" />
                    <span>Health-data sync</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-[#00B9B0] w-5 h-5 mr-3 flex-shrink-0 mt-1" />
                    <span>Insight dashboards</span>
                  </li>
                </ul>
              </div>
              {/* Call to Journal Card */}
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 shadow-md border border-purple-100 flex flex-col">
                <h3 className="text-2xl font-bold text-purple-700 mb-6 text-center flex items-center justify-center">
                  <Phone className="w-6 h-6 mr-2" /> Call to Journal
                </h3>
                <button
                  className="flex-1 px-3 py-2 bg-purple-600 text-white rounded-full text-sm font-medium text-center flex items-center justify-center mb-4 w-full focus:outline-none hover:bg-purple-700 transition"
                  onClick={() => {
                    setShowCallModal(true);
                    posthog.capture('call_to_journal_clicked', { variant: selectedVariant });
                  }}
                >
                  <Phone className="w-4 h-4 mr-1" /> Call to Journal
                </button>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="text-purple-500 w-5 h-5 mr-3 flex-shrink-0 mt-1" />
                    <span>No app download needed</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-purple-500 w-5 h-5 mr-3 flex-shrink-0 mt-1" />
                    <span>Call or Text to record thoughts in the moment</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-purple-500 w-5 h-5 mr-3 flex-shrink-0 mt-1" />
                    <span>Perfect for journling on a walk or commute</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* 7. Therapists Love It */}
      <motion.section
        className="py-16 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
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

      {/* Fixed bottom CTA on mobile */}
      {!signUpUrl && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-3 flex gap-2 z-50">
          <button
            className="flex-1 px-3 py-2 bg-[#1281dd] text-white rounded-full text-sm font-medium text-center flex items-center justify-center focus:outline-none"
            onClick={() => {
              setShowInviteModal(true);
            }}
          >
            <Smartphone className="w-4 h-4 mr-1" /> Start on Mobile App
          </button>
          <div className="flex flex-col items-center flex-1">
            <button
              className="w-full px-3 py-2 bg-white text-[#1281dd] rounded-full border border-[#1281dd]/20 text-sm font-medium text-center flex items-center justify-center"
              onClick={() => setShowCallModal(true)}
            >
              <Phone className="w-4 h-4 mr-1" /> Call to Journal
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 