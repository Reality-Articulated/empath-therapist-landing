import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Shield, Clock, Phone, Smartphone, MessageSquare, Lock, Zap, ChevronDown, Star, DollarSign, TrendingUp, Mic, UserCheck, Brain } from 'lucide-react';
import logo from '../../public/empath-logo.png';
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

// FAQ Accordion Item Component
const FAQItem = ({ question, answer }: { question: string; answer: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b-2 border-stone-200 last:border-b-0">
      <button
        className="w-full py-5 flex justify-between items-center text-left text-lg font-bold text-stone-900 hover:text-[#1b8af1] transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        <ChevronDown className={`w-5 h-5 text-stone-900 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="pb-6 text-stone-600 leading-relaxed font-medium">
        {answer}
      </div>
      </motion.div>
    </div>
  );
};

const ValueCalculator = () => {
  const [sessionCost, setSessionCost] = useState(175);
  const percentage = 0.25;
  const recoveredPerSession = Math.round(sessionCost * percentage);
  const recoveredPerYear = Math.round(recoveredPerSession * 48); // 48 weeks

  return (
    <section className="py-24 bg-[#F5F4F1]">
        <div className="container mx-auto px-4 text-center max-w-3xl">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 text-blue-800 border-2 border-blue-900 rounded-lg text-xs font-bold uppercase tracking-wider mb-8 shadow-[4px_4px_0px_0px_#1b8af1]">
                <DollarSign className="w-4 h-4" /> Therapy ROI
             </div>
             <h2 className="text-3xl md:text-5xl font-black text-stone-900 mb-6 tracking-tight font-serif">Get More Out of Every Dollar</h2>
             <p className="text-lg text-stone-600 mb-12 font-medium max-w-2xl mx-auto">
                Don't spend valuable session time on "recaps." Empath helps you start deep work from minute one.
             </p>

             <div className="bg-[#FAF9F6] border-2 border-stone-900 shadow-[8px_8px_0px_0px_rgba(28,25,23,1)] p-8 md:p-10 rounded-xl relative">
                <div className="mb-10">
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-4">Your Cost Per Session</label>
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <span className="text-xl font-bold text-stone-400">$50</span>
                        <input 
                            type="range" 
                            min="50" 
                            max="350" 
                            step="5" 
                            value={sessionCost} 
                            onChange={(e) => setSessionCost(Number(e.target.value))}
                            className="w-full h-2 bg-stone-200 rounded-none appearance-none cursor-pointer accent-[#1b8af1] border border-stone-300"
                        />
                        <span className="text-xl font-bold text-stone-400">$350+</span>
                    </div>
                    <div className="text-6xl font-black text-stone-900 tracking-tighter">${sessionCost}</div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 border-2 border-stone-200 rounded-lg">
                        <div className="flex items-center justify-center gap-2 text-stone-800 font-bold mb-2 uppercase text-xs tracking-wider">
                             <Clock className="w-4 h-4 text-[#1b8af1]" /> Productive Time
                        </div>
                        <div className="text-4xl font-black text-stone-900">+${recoveredPerSession}</div>
                        <p className="text-xs text-stone-500 mt-2 font-medium">Value added per session</p>
                    </div>
                    <div className="bg-stone-900 p-6 border-2 border-stone-900 rounded-lg text-white relative overflow-hidden">
                        <div className="absolute -right-4 -top-4 w-16 h-16 bg-[#1b8af1] rounded-full blur-2xl opacity-20"></div>
                        <div className="flex items-center justify-center gap-2 text-stone-300 font-bold mb-2 uppercase text-xs tracking-wider relative z-10">
                             <TrendingUp className="w-4 h-4 text-[#1b8af1]" /> Yearly Impact
                        </div>
                         <div className="text-4xl font-black text-white relative z-10">${recoveredPerYear.toLocaleString()}</div>
                         <p className="text-xs text-stone-400 mt-2 font-medium relative z-10">Worth of extra deep work/year</p>
                    </div>
                </div>
                
                <div className="mt-8 pt-8 border-t-2 border-stone-100">
                     <p className="text-stone-400 text-xs font-medium italic">
                        *Estimates based on reclaiming the typical 15-20 minutes spent updating your therapist on "what happened this week."
                     </p>
                </div>
             </div>
        </div>
    </section>
  );
};

export default function ClientInfoPage() {
  // State
  const [isPlaying, setIsPlaying] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [therapistEmail, setTherapistEmail] = useState('');
  const [inviteSubmitted, setInviteSubmitted] = useState(false);
  const [inviteError, setInviteError] = useState('');
  const [noTherapist, setNoTherapist] = useState(false);
  const [signUpUrl, setSignUpUrl] = useState<string | null>(null);
  const [therapistName, setTherapistName] = useState<string | null>(null);
  const [showFlowModal, setShowFlowModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  
  // Constants
  const PHONE_MAIN = '+18883663082';
  
  // Initialization
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const signUpToken = params.get('signUpToken');
      const token = params.get('token');
      const therapistNameParam = params.get('therapistName');
      
      if (signUpToken && token) {
        setSignUpUrl(`https://empath-793bdf3d3ee1.herokuapp.com/sign-up-client/${signUpToken}/${token}`);
        
        // Identify invited user in PostHog
        posthog.identify(token, {
          signUpToken: signUpToken,
          therapistName: therapistNameParam ? decodeURIComponent(therapistNameParam) : null,
          userType: 'invited_client',
          inviteUrl: window.location.href,
          invitedAt: new Date().toISOString()
        });
        
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
    posthog.capture('client_info_page_viewed');
  }, []);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight * 0.6;
      setShowFloatingCTA(scrollPosition > heroHeight);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // YouTube API
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

  // Invite Logic
  const handleInviteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInviteError('');
    setInviteSubmitted(false);
    
    // PostHog Variant (Keeping simplified logic for continuity)
    const variantRaw = posthog.getFeatureFlag('client-info-copy-experiment');
    const variant = typeof variantRaw === 'string' ? variantRaw : 'control';
    
    posthog.capture('invite_form_submitted', { 
      user_email: userEmail, 
      therapist_email: therapistEmail, 
      no_therapist: noTherapist,
      variant 
    });
    
    if (!userEmail) {
      setInviteError('Please enter your email.');
      return;
    }
    if (!noTherapist && !therapistEmail) {
      setInviteError('Please enter your therapist\'s email.');
      return;
    }

    try {
      const response = await fetch('/api/client-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail,
          therapistEmail: noTherapist ? null : therapistEmail,
          noTherapist,
          variant,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      toast.success('Request sent! We will be in touch shortly.');
      if (window.twq) {
        window.twq('event', 'tw-onbx0-onbx0', {
          user_email: userEmail,
          therapist_email: noTherapist ? 'No therapist' : therapistEmail,
          no_therapist: noTherapist ? 'Yes' : 'No',
          variant
        });
      }
      setInviteSubmitted(true);
      setUserEmail('');
      setTherapistEmail('');
    } catch (err) {
      toast.error('Failed to submit. Please try again.');
      setInviteError('Something went wrong. Please try again.');
    }
  };

  const isInvited = !!signUpUrl;
  
  const variantRaw = useFeatureFlagVariantKey('client-info-copy-experiment');
  const variant = typeof variantRaw === 'string' ? variantRaw : 'control';

  return (
    <div className="flex-grow bg-[#FAF9F6] text-stone-900 font-sans selection:bg-blue-200 selection:text-blue-900">
      <Toaster position="top-center" />
      
      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 mix-blend-multiply" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* --- HEADER / TRUST BAR --- */}
      <div className="bg-[#FAF9F6]/90 backdrop-blur-sm border-b-2 border-stone-200 py-4 sticky top-0 z-40">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* Logo restored to original colors, removed grayscale/brightness filters */}
            <div className="w-10 h-10 flex items-center justify-center">
                <img src={logo} alt="Empath Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-black text-stone-900 tracking-tight hidden sm:block text-lg">Empath</span>
                </div>
          <div className="flex items-center gap-6 text-xs sm:text-sm font-bold text-stone-600 uppercase tracking-wide">
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-[#1b8af1]" /> HIPAA Secure</span>
            <span className="hidden sm:flex items-center gap-1.5"><Star className="w-4 h-4 text-[#1b8af1]" /> Trusted by Therapists</span>
                </div>
              </div>
                  </div>
                  
      {/* --- HERO SECTION --- */}
      <motion.section 
        className="relative pt-24 pb-32 overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
          {isInvited && therapistName && (
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-white text-stone-900 rounded-lg text-sm font-bold border-2 border-stone-900 shadow-[4px_4px_0px_0px_#1b8af1]">
              👋 {therapistName} invited you to Empath
            </motion.div>
          )}

          <motion.h1 variants={fadeIn} className="text-6xl md:text-8xl font-black tracking-tighter text-stone-900 mb-8 leading-[0.95] font-serif">
            Make Every <br/>
            <span className="relative inline-block px-4">
                <span className="absolute inset-0 bg-[#1b8af1] -rotate-1 rounded-sm shadow-[4px_4px_0px_0px_rgba(28,25,23,1)]"></span>
                <span className="relative text-white">Session Count.</span>
            </span>
          </motion.h1>

          <motion.p variants={fadeIn} className="text-xl md:text-2xl text-stone-600 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            Capture your thoughts, feelings, and moments between sessions. Give your therapist the full picture so you can grow faster.
          </motion.p>

          <motion.div variants={fadeIn} className="flex flex-col items-center gap-4 mb-16 max-w-md mx-auto">
            {isInvited ? (
              <>
                <button
                  className="w-full px-8 py-5 bg-stone-900 text-white rounded-xl font-bold text-lg border-2 border-stone-900 shadow-[6px_6px_0px_0px_#1b8af1] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#1b8af1] transition-all duration-200 flex items-center justify-center gap-2 group"
                  onClick={() => {
                    setShowFlowModal(true);
                    posthog.capture('hero_primary_cta_clicked', { variant, isInvited: true });
                  }}
                >
                  {therapistName ? `Accept Invite from ${therapistName}` : 'Connect With Therapist'} 
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
                <p className="text-sm text-stone-500 text-center flex items-center gap-2 font-medium">
                  <CheckCircle className="w-4 h-4 text-[#1b8af1]" /> Free for you (covered by your therapist)
                </p>
              </>
            ) : (
              <>
                <button
                  className="w-full px-8 py-5 bg-stone-900 text-white rounded-xl font-bold text-lg border-2 border-stone-900 shadow-[6px_6px_0px_0px_#1b8af1] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#1b8af1] transition-all duration-200 flex items-center justify-center gap-2 group"
                  onClick={() => {
                    setShowInviteModal(true);
                    posthog.capture('hero_primary_cta_clicked', { variant, isInvited: false });
                  }}
                >
                  Use with My Therapist 
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
                
                <div className="flex items-center gap-4 w-full">
                  <a
                    href={`tel:${PHONE_MAIN}`}
                    className="flex-1 px-6 py-4 bg-white text-stone-900 rounded-xl border-2 border-stone-200 hover:border-blue-500 hover:text-[#1b8af1] hover:bg-blue-50 transition-all duration-200 font-bold flex items-center justify-center shadow-sm gap-2"
                    onClick={() => {
                      posthog.capture('hero_call_clicked', { variant });
                    }}
                  >
                    <Phone className="w-4 h-4" /> Call
                  </a>
                  <a
                    href={`sms:${PHONE_MAIN}`}
                    className="flex-1 px-6 py-4 bg-white text-stone-900 rounded-xl border-2 border-stone-200 hover:border-blue-500 hover:text-[#1b8af1] hover:bg-blue-50 transition-all duration-200 font-bold flex items-center justify-center shadow-sm gap-2"
                    onClick={() => {
                      posthog.capture('hero_text_clicked', { variant });
                    }}
                  >
                    <MessageSquare className="w-4 h-4" /> Text
                  </a>
                </div>
                
                <p className="text-sm text-stone-500 text-center font-medium">
                  Try it now: No app download required.
                </p>
              </>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* --- THE PROBLEM (Visual) --- */}
      <section className="py-24 bg-white border-y-2 border-stone-200">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-black text-stone-900 mb-6 font-serif tracking-tight">Don't Let Moments Fade</h2>
                <p className="text-lg text-stone-600 font-medium">Life happens between sessions. Ensure nothing gets lost.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-stretch">
              {/* The Old Way */}
              <div className="bg-[#FAF9F6] p-8 rounded-xl border-2 border-stone-200 relative overflow-hidden flex flex-col grayscale opacity-80 hover:opacity-100 transition-opacity">
                  <div className="mb-8">
                    <span className="inline-block px-3 py-1 bg-stone-200 text-stone-600 text-xs font-bold uppercase tracking-wider rounded mb-4">
                        Without Empath
                    </span>
                    <h3 className="text-2xl font-bold text-stone-900 mb-2">The "Recap" Trap</h3>
                    <p className="text-stone-600 font-medium leading-relaxed">
                        You spend the first 20 minutes just trying to remember and explain what happened last week.
                    </p>
                  </div>
                  
                  <div className="flex-grow space-y-4">
                    <div className="p-4 bg-white rounded border-2 border-stone-100 border-dashed">
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded bg-stone-200 flex-shrink-0"></div>
                            <div className="space-y-2 w-full">
                                <div className="h-2 w-1/3 bg-stone-200 rounded"></div>
                                <div className="h-2 w-full bg-stone-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-stone-100 rounded border-l-4 border-stone-400">
                        <p className="text-stone-600 font-medium italic text-sm">
                            "I know I felt terrible on Tuesday, but I can't remember exactly what triggered it..."
                        </p>
                    </div>
                  </div>
              </div>
              
              {/* The New Way */}
              <div className="bg-white p-8 rounded-xl border-2 border-stone-900 shadow-[8px_8px_0px_0px_#1b8af1] relative overflow-hidden flex flex-col transform md:-translate-y-4">
                   <div className="mb-8">
                    <span className="inline-block px-3 py-1 bg-[#1b8af1] text-white text-xs font-bold uppercase tracking-wider rounded mb-4">
                        With Empath
                    </span>
                    <h3 className="text-2xl font-bold text-stone-900 mb-2">Continuous Growth</h3>
                    <p className="text-stone-600 font-medium leading-relaxed">
                        Your therapist already knows the context. You dive straight into the deep work that drives change.
                    </p>
                   </div>

                   <div className="flex-grow space-y-4">
                        <div className="p-5 bg-[#FAF9F6] rounded border-2 border-blue-200">
                             <div className="flex gap-3 mb-2">
                                <Zap className="w-5 h-5 text-[#1b8af1] fill-[#1b8af1]" />
                                <span className="font-bold text-stone-900 text-sm uppercase tracking-wide">Insight Unlocked</span>
                             </div>
                             <p className="text-stone-800 font-medium text-sm leading-relaxed border-l-2 border-blue-500 pl-3">
                                "I saw your note about the anxiety spike on Tuesday. Let's explore that specific trigger."
                             </p>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                             <div className="bg-stone-50 p-3 rounded border border-stone-200 text-center">
                                <span className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Mood</span>
                                <span className="block text-xl font-black text-stone-800">📈</span>
                             </div>
                             <div className="bg-stone-50 p-3 rounded border border-stone-200 text-center">
                                <span className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Sleep</span>
                                <span className="block text-xl font-black text-stone-800">😴</span>
                             </div>
                             <div className="bg-stone-50 p-3 rounded border border-stone-200 text-center">
                                <span className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Focus</span>
                                <span className="block text-xl font-black text-stone-800">🎯</span>
                             </div>
                        </div>
                   </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS (3 Steps) --- */}
      <section className="py-24 bg-stone-900 text-[#FAF9F6]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-20 font-serif tracking-tight">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {[
              {
                icon: <Smartphone className="w-8 h-8 text-stone-900" />,
                step: "01",
                title: "Capture The Moment",
                desc: "Feeling anxious? Had a win? Just journal using the app or text/call Empath. It takes seconds."
              },
              {
                icon: <Zap className="w-8 h-8 text-stone-900" />,
                step: "02",
                title: "We Organize It",
                desc: "Our AI securely organizes your scattered thoughts into a clear, clinical summary."
              },
              {
                icon: <UserCheck className="w-8 h-8 text-stone-900" />,
                step: "03",
                title: "Better Sessions",
                desc: "Your therapist reviews the summary before you meet, so they are fully prepared to help you."
              }
            ].map((step, i) => (
              <div key={i} className="relative group text-left">
                <div className="w-16 h-16 bg-[#FAF9F6] rounded-xl flex items-center justify-center mb-8 border-2 border-stone-500 shadow-[4px_4px_0px_0px_#1b8af1]">
                    {step.icon}
                </div>
                <div className="pl-2 border-l-2 border-stone-700">
                    <span className="text-stone-500 font-bold text-sm tracking-widest uppercase mb-2 block">Step {step.step}</span>
                    <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-stone-400 leading-relaxed font-medium">{step.desc}</p>
                </div>
              </div>
            ))}
            </div>
          
          {/* Video Embed */}
          <div className="mt-24 max-w-4xl mx-auto rounded-xl overflow-hidden shadow-[8px_8px_0px_0px_#1b8af1] bg-black aspect-video relative border-2 border-stone-700 group">
             {!isPlaying ? (
                <div className="absolute inset-0 bg-black/60 hover:bg-black/50 transition-colors flex flex-col items-center justify-center cursor-pointer z-10"
                  onClick={() => {
                    const iframe = document.getElementById('explainerVideo') as HTMLIFrameElement;
                    if (iframe && iframe.contentWindow) {
                      iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                      setIsPlaying(true);
                      posthog.capture('explainer_video_played');
                    }
                     }}>
                   <div className="w-24 h-24 bg-[#FAF9F6] rounded-full flex items-center justify-center group-hover:scale-105 transition-all duration-300 border-4 border-blue-500 shadow-[0_0_20px_rgba(27,138,241,0.5)]">
                     <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[22px] border-l-orange-600 border-b-[12px] border-b-transparent ml-2"></div>
                  </div>
                   <p className="text-[#FAF9F6] mt-6 font-bold text-xl tracking-wide uppercase">Watch Demo</p>
                </div>
             ) : null}
             <iframe 
                id="explainerVideo"
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/qkCoQ4t7HsQ?enablejsapi=1&controls=1&rel=0&modestbranding=1" 
                title="Empath Demo"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
             ></iframe>
              </div>
            </div>
      </section>

      {/* --- VALUE CALCULATOR --- */}
      <ValueCalculator />

      {/* --- THE OFFER STACK (Grand Slam) --- */}
      <section className="py-24 bg-white border-y-2 border-stone-200">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-stone-900 font-serif">Premium Care, Included.</h2>
            <p className="text-xl text-stone-600 font-medium">
              Your therapist has invested in Empath to provide you with the best possible care.
            </p>
                </div>
                
          <div className="max-w-5xl mx-auto bg-[#FAF9F6] border-2 border-stone-900 rounded-xl p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(28,25,23,1)]">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <h3 className="text-2xl font-black text-stone-900 mb-8 pb-4 border-b-2 border-stone-200 uppercase tracking-tight">What's Included:</h3>
                
                <ul className="space-y-5">
                  {[
                    "Unlimited Voice & Text Journaling",
                    "Secure HIPAA-Compliant Vault",
                    "Personal Progress Tracking",
                    "Direct Integration with Your Therapist",
                    "Mobile App (iOS) + SMS/Phone Access"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 group">
                      <div className="w-6 h-6 rounded border-2 border-stone-900 bg-stone-900 flex items-center justify-center flex-shrink-0 group-hover:bg-[#1b8af1] group-hover:border-blue-500 transition-colors">
                        <CheckCircle className="w-4 h-4 text-[#FAF9F6]" />
                </div>
                      <span className="text-lg font-bold text-stone-700">{item}</span>
                    </li>
                  ))}
                </ul>
            </div>

              <div className="bg-white rounded-xl p-8 text-center border-2 border-stone-200">
                <p className="text-stone-400 uppercase tracking-widest text-xs font-bold mb-4">YOUR PRICE</p>
                <div className="flex justify-center items-baseline gap-2 mb-2">
                    <span className="text-6xl font-black text-stone-900">$0</span>
                    <span className="text-stone-400 text-xl font-bold">/mo</span>
                </div>
                <p className="text-blue-700 text-xs font-bold mb-8 bg-blue-100 inline-block px-4 py-2 rounded-full border border-blue-200">
                    PAID BY YOUR THERAPIST
                </p>
                
              <button
                  className="w-full py-4 bg-stone-900 text-white rounded-xl font-bold text-lg hover:bg-[#1b8af1] transition-colors shadow-lg"
                onClick={() => {
                  if (isInvited) {
                    setShowFlowModal(true);
                      posthog.capture('offer_stack_cta_clicked', { variant, isInvited: true });
                  } else {
                    setShowInviteModal(true);
                      posthog.capture('offer_stack_cta_clicked', { variant, isInvited: false });
                  }
                }}
              >
                  {isInvited ? 'Accept Invitation' : 'Get Access Now'}
              </button>
                <p className="mt-4 text-xs text-stone-400 font-medium">Secure setup takes 30 seconds.</p>
        </div>
                      </div>
                    </div>
                    </div>
      </section>

      {/* --- SOCIAL PROOF --- */}
      <section className="py-24 bg-[#FAF9F6]">
        <div className="container mx-auto px-4">
           <div className="text-center mb-16">
                <h2 className="text-3xl font-black text-stone-900 mb-4 font-serif">Real Stories</h2>
                <div className="flex justify-center gap-1 text-[#1b8af1] mb-2">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-stone-500 font-medium uppercase tracking-wide text-sm">Trusted by thousands of clients</p>
           </div>
           
           <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  quote: "I realized Instagram knew me better than my therapist. Empath fixed that. Now my therapist sees the real me.",
                  author: "Sarah M.",
                  role: "Client"
                },
                {
                  quote: "I used to spend half the session remembering what happened. Now we dive deep in the first 5 minutes.",
                  author: "James K.",
                  role: "Client"
                },
                {
                  quote: "Finally, a way to capture my anxiety spiraling at 2 AM without waking anyone up. My therapist gets the full picture.",
                  author: "Elena R.",
                  role: "Client"
                }
              ].map((t, i) => (
                <div key={i} className="bg-white p-8 rounded-none border-l-4 border-stone-900 shadow-sm flex flex-col hover:bg-blue-50 hover:border-blue-500 transition-colors">
                  <p className="text-stone-700 mb-6 leading-relaxed font-serif text-lg italic flex-grow">"{t.quote}"</p>
                  <div>
                    <p className="font-bold text-stone-900">{t.author}</p>
                    <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">{t.role}</p>
                    </div>
                    </div>
              ))}
                  </div>
                </div>
      </section>

      {/* --- FAQ / OBJECTIONS --- */}
      <section className="py-24 bg-white border-t-2 border-stone-200">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-black text-center text-stone-900 mb-12 font-serif">Questions?</h2>
          <div className="space-y-4">
            <FAQItem 
              question="Is my data safe?" 
              answer="Yes. Empath is fully HIPAA compliant, which means we meet the strictest standards for data protection in healthcare. Your data is encrypted and only accessible to you and your therapist." 
            />
            <FAQItem 
              question="Does this replace my therapy sessions?" 
              answer="Not at all. Empath makes your existing sessions better. It's a tool to help you communicate more effectively with your therapist between visits." 
            />
            <FAQItem 
              question="Do I need to download an app?" 
              answer="You can, but you don't have to! You can use Empath entirely through text messaging or phone calls if you prefer. We do have an iOS app for a richer experience." 
            />
            <FAQItem 
              question="Who pays for this?" 
              answer="Empath is free for clients. Your therapist pays a subscription fee to use the platform as part of their practice." 
            />
                      </div>
                    </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#FAF9F6] border-t-2 border-stone-200 py-16">
        <div className="container mx-auto px-4 text-center">
            <div className="inline-block p-4 bg-stone-900 rounded-lg mb-8">
                <img src={logo} alt="Empath" className="w-8 h-8 object-contain" />
            </div>
          <div className="flex justify-center gap-8 text-stone-500 font-bold text-sm mb-8 uppercase tracking-widest">
            <Link to="/privacy" className="hover:text-stone-900 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-stone-900 transition-colors">Terms of Service</Link>
            <a href="mailto:support@myempath.co" className="hover:text-stone-900 transition-colors">Support</a>
                      </div>
          <p className="text-stone-400 text-xs font-medium">© {new Date().getFullYear()} Reality Articulated Inc.</p>
                    </div>
      </footer>

      {/* --- MODALS (Retained Functionality) --- */}

      {/* Invite Modal (For uninvited users) */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/90 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#FAF9F6] rounded-xl shadow-2xl p-8 w-full max-w-md relative border-2 border-stone-900"
          >
                <button
              onClick={() => setShowInviteModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-900"
            >
              ✕
                </button>

            <h3 className="text-2xl font-black text-stone-900 mb-2 font-serif">Get Early Access</h3>
            <p className="text-stone-600 mb-6 font-medium">Connect with your therapist to start using Empath.</p>

            {inviteSubmitted ? (
              <div className="text-center py-8 bg-blue-100 rounded-xl border-2 border-blue-200">
                <CheckCircle className="w-12 h-12 text-[#1b8af1] mx-auto mb-4" />
                <h4 className="font-bold text-stone-900 mb-2">Request Sent!</h4>
                <p className="text-stone-600 text-sm">We'll contact your therapist.</p>
              </div>
            ) : (
              <form onSubmit={handleInviteSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-1">Your Email</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white border-2 border-stone-200 focus:border-blue-500 outline-none font-medium transition-colors"
                    placeholder="you@example.com"
                    value={userEmail}
                    onChange={e => setUserEmail(e.target.value)}
                  />
              </div>
                
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-1">Therapist's Email</label>
                  <input
                    type="email"
                    required={!noTherapist}
                    disabled={noTherapist}
                    className="w-full px-4 py-3 rounded-lg bg-white border-2 border-stone-200 focus:border-blue-500 outline-none font-medium transition-colors disabled:bg-stone-100 disabled:text-stone-400"
                    placeholder="therapist@example.com"
                    value={therapistEmail}
                    onChange={e => setTherapistEmail(e.target.value)}
                  />
              </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="noTherapist"
                    className="w-4 h-4 text-[#1b8af1] rounded border-stone-300 focus:ring-blue-600"
                    checked={noTherapist}
                    onChange={e => {
                      setNoTherapist(e.target.checked);
                      if(e.target.checked) setTherapistEmail('');
                    }}
                  />
                  <label htmlFor="noTherapist" className="ml-2 text-sm font-medium text-stone-600">
                    I don't have a therapist right now
                  </label>
          </div>
          
                {inviteError && <p className="text-red-600 font-bold text-sm">{inviteError}</p>}

                <button
                  type="submit"
                  className="w-full py-3 bg-stone-900 text-white rounded-lg font-bold hover:bg-[#1b8af1] transition-colors border-2 border-stone-900 shadow-[4px_4px_0px_0px_#1b8af1] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                >
                  Request Access
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}

      {/* Flow Modal (For Invited Users / Next Steps) */}
      {showFlowModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/90 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#FAF9F6] rounded-xl shadow-2xl p-8 w-full max-w-md relative border-2 border-stone-900"
          >
            <button 
              onClick={() => setShowFlowModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-900"
            >
              ✕
            </button>

            <h3 className="text-2xl font-black text-stone-900 mb-6 font-serif">One Last Step</h3>
            
            <ol className="space-y-6 mb-8 relative border-l-2 border-stone-200 ml-3 pl-8">
              <li className="relative">
                <span className="absolute -left-[41px] w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-bold border-4 border-[#FAF9F6]">1</span>
                <h4 className="font-bold text-stone-900 text-lg">Create your secure account</h4>
                <p className="text-sm text-stone-500 font-medium mt-1">We'll link you to {therapistName || 'your therapist'}.</p>
              </li>
              <li className="relative">
                <span className="absolute -left-[41px] w-8 h-8 rounded-full bg-stone-200 text-stone-500 flex items-center justify-center text-sm font-bold border-4 border-[#FAF9F6]">2</span>
                <h4 className="font-bold text-stone-900 text-lg">Start journaling</h4>
                <p className="text-sm text-stone-500 font-medium mt-1">Download the app or just use SMS/Phone.</p>
              </li>
            </ol>

            <button
              onClick={() => {
                if (signUpUrl) {
                  window.open(signUpUrl, '_blank', 'noopener,noreferrer');
                  posthog.capture('signup_redirect_initiated', { variant });
                  setShowFlowModal(false);
                } else {
                  setShowInviteModal(true);
                  setShowFlowModal(false);
                }
              }}
              className="w-full py-4 bg-stone-900 text-white rounded-xl font-bold text-lg hover:bg-[#1b8af1] transition-colors shadow-lg border-2 border-stone-900 shadow-[4px_4px_0px_0px_#1b8af1] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
            >
              Continue to Secure Sign Up →
            </button>
          </motion.div>
        </div>
      )}

      {/* Call to Journal Modal */}
      {showCallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/90 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#FAF9F6] rounded-xl shadow-2xl p-8 w-full max-w-md relative text-center border-2 border-stone-900"
          >
            <button
              onClick={() => setShowCallModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-900"
            >
              ✕
            </button>
            
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-blue-200">
              <Phone className="w-8 h-8 text-[#1b8af1]" />
            </div>

            <h3 className="text-2xl font-black text-stone-900 mb-2 font-serif">Journal Instantly</h3>
            <p className="text-stone-600 mb-8 font-medium">No app needed. Just call or text our secure line to start.</p>

            <div className="grid grid-cols-2 gap-4">
                <a
                  href={`tel:${PHONE_MAIN}`}
                  className="flex flex-col items-center justify-center p-6 bg-white rounded-xl border-2 border-stone-200 hover:border-blue-500 hover:bg-blue-50 transition-all group shadow-sm"
                  onClick={() => posthog.capture('call_modal_call_clicked')}
              >
                <Phone className="w-8 h-8 text-stone-700 group-hover:text-[#1b8af1] mb-3" />
                <span className="font-bold text-stone-900">Call Now</span>
                </a>
                <a
                  href={`sms:${PHONE_MAIN}`}
                className="flex flex-col items-center justify-center p-6 bg-white rounded-xl border-2 border-stone-200 hover:border-blue-500 hover:bg-blue-50 transition-all group shadow-sm"
                onClick={() => posthog.capture('call_modal_text_clicked')}
              >
                <MessageSquare className="w-8 h-8 text-stone-700 group-hover:text-[#1b8af1] mb-3" />
                <span className="font-bold text-stone-900">Text Now</span>
              </a>
            </div>
            
            <div className="mt-6 pt-6 border-t-2 border-stone-100">
                <p className="text-xs text-stone-400 font-medium">
                    If you don't have an account, we'll create one for you automatically using your phone number.
                </p>
        </div>
          </motion.div>
        </div>
      )}

      {/* Sticky Mobile CTA */}
      {showFloatingCTA && (
        <motion.div
            initial={{ y: 100 }} 
            animate={{ y: 0 }}
            className="fixed bottom-0 left-0 right-0 bg-[#FAF9F6] border-t-2 border-stone-200 p-4 z-40 md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.1)]"
        >
                <button
                className="w-full py-3 bg-stone-900 text-white rounded-lg font-bold shadow-lg border-2 border-stone-900"
                  onClick={() => {
                    if (isInvited) {
                        setShowFlowModal(true);
                    } else {
                    setShowInviteModal(true);
                    }
                  }}
                >
                {isInvited ? 'Accept Invitation' : 'Get Started Free'}
                </button>
        </motion.div>
      )}

       {/* Floating Desktop CTA */}
      {showFloatingCTA && (
        <motion.div
            initial={{ y: -100 }} 
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 bg-[#FAF9F6]/90 backdrop-blur-md border-b-2 border-stone-200 p-4 z-50 hidden md:flex justify-between items-center shadow-sm"
        >
            <div className="flex items-center gap-3 container mx-auto px-4">
                <div className="w-8 h-8 bg-stone-900 rounded-lg flex items-center justify-center overflow-hidden">
                    <img src={logo} className="w-full h-full object-contain" alt="Logo" />
                </div>
                <span className="font-black text-stone-900 text-lg">Empath</span>
                <div className="flex-grow"></div>
              <button
                    className="px-6 py-2 bg-stone-900 text-white rounded-lg font-bold shadow hover:bg-[#1b8af1] transition border-2 border-stone-900"
                onClick={() => {
                        if (isInvited) {
                  setShowFlowModal(true);
                        } else {
                            setShowInviteModal(true);
                        }
                }}
              >
                    {isInvited ? 'Accept Invitation' : 'Get Started Free'}
              </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}