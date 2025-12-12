import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, CheckCircle, Shield, Phone, Download } from 'lucide-react';
import logo from '../../public/empath-logo.png';
import toast, { Toaster } from 'react-hot-toast';
import posthog from 'posthog-js';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function TherapyValueCalculator() {
  // Email gate state
  const [hasEnteredEmail, setHasEnteredEmail] = useState(false);
  const [leadEmail, setLeadEmail] = useState('');
  const [emailSubmitting, setEmailSubmitting] = useState(false);

  // Calculator state
  const [cost, setCost] = useState('175');
  const [length, setLength] = useState('50');
  const [frequency, setFrequency] = useState('4');

  // Invite modal state
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [therapistEmail, setTherapistEmail] = useState('');
  const [inviteSubmitted, setInviteSubmitted] = useState(false);
  const [inviteError, setInviteError] = useState('');
  const [noTherapist, setNoTherapist] = useState(false);

  // Simplified state
  const [userCount] = useState(2847);
  const [isMobile, setIsMobile] = useState(false);

  // Calculator logic
  const minutesSaved = 20;
  const costNum = parseFloat(cost) || 0;
  const lengthNum = parseFloat(length) || 0;
  const freqNum = parseFloat(frequency) || 0;
  const valuePerMinute = lengthNum > 0 ? costNum / lengthNum : 0;
  const dollarsSavedPerSession = valuePerMinute * minutesSaved;
  const monthlyDollarsSaved = dollarsSavedPerSession * freqNum;
  const yearlyDollarsSaved = monthlyDollarsSaved * 12;

  const hasCalculatorData = costNum > 0 && lengthNum > 0 && freqNum > 0;

  useEffect(() => {
    posthog.capture('therapy_calculator_page_viewed');
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadEmail) return;
    
    setEmailSubmitting(true);
    posthog.capture('calculator_email_captured', { email: leadEmail });

    try {
      const response = await fetch('/api/client-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: leadEmail,
          therapistEmail: null,
          noTherapist: true,
          variant: 'therapy_calculator_email_gate',
          source: 'Therapy Value Calculator',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }
      
      setHasEnteredEmail(true);
      posthog.capture('calculator_access_granted', { email: leadEmail });
      toast.success('Welcome! Here\'s your calculator.');
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setEmailSubmitting(false);
    }
  };

  const handleInviteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInviteError('');
    
    if (!noTherapist && !therapistEmail) {
      setInviteError("Please enter your therapist's email or check the box if you don't have a therapist.");
      return;
    }
    
    try {
      const response = await fetch('/api/client-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: leadEmail,
          therapistEmail: noTherapist ? null : therapistEmail,
          noTherapist,
          variant: 'therapy_calculator_invite',
          source: 'Therapy Value Calculator',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }
      
      toast.success('Thank you! We will be in touch.');
      setInviteSubmitted(true);
      setTherapistEmail('');
      setNoTherapist(false);
    } catch (err) {
      toast.error('Failed to submit. Please try again.');
      setInviteError('Something went wrong. Please try again.');
    }
  };

  // Simple email gate
  if (!hasEnteredEmail) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <Toaster position="top-center" />
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <img src={logo} alt="Empath Logo" className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Are You Getting Full Value from Therapy?
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              See how much more value you can unlock in 30 seconds
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter your email to access the calculator
                </label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={leadEmail}
                  onChange={e => setLeadEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={emailSubmitting}
                className="w-full bg-blue-600 text-white rounded-lg py-3 font-semibold hover:bg-blue-700 transition disabled:opacity-50"
              >
                {emailSubmitting ? 'Loading...' : 'Access Calculator →'}
              </button>
            </form>
            
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                Used by {userCount.toLocaleString()}+ therapy clients
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Main calculator page
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-center" />
      
      {/* Simple header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center">
          <img src={logo} alt="Empath Logo" className="w-10 h-10 mr-3" />
          <h1 className="text-xl font-semibold text-gray-900">Therapy ROI Calculator</h1>
        </div>
      </div>

      {/* Invite Modal - Simplified */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Get Started with Empath</h3>
              
              {inviteSubmitted ? (
                <div className="text-center py-4">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <p className="text-gray-600 mb-4">Thanks! We'll be in touch soon.</p>
                  <div className="flex gap-3">
                    <a
                      href="tel:+18883663082"
                      className="flex-1 bg-blue-600 text-white rounded-lg py-3 text-center font-semibold"
                    >
                      Call to Try
                    </a>
                    <a
                      href="sms:+18883663082"
                      className="flex-1 border border-gray-300 rounded-lg py-3 text-center font-semibold"
                    >
                      Text to Try
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleInviteSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Therapist's Email
                    </label>
                    <input
                      type="email"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={therapistEmail}
                      onChange={e => setTherapistEmail(e.target.value)}
                      placeholder="therapist@example.com"
                      disabled={noTherapist}
                      required={!noTherapist}
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="noTherapist"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                      checked={noTherapist}
                      onChange={e => {
                        setNoTherapist(e.target.checked);
                        if (e.target.checked) setTherapistEmail('');
                      }}
                    />
                    <label htmlFor="noTherapist" className="ml-2 text-sm text-gray-700">
                      I don't have a therapist yet
                    </label>
                  </div>
                  
                  {inviteError && <div className="text-red-600 text-sm">{inviteError}</div>}
                  
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowInviteModal(false)}
                      className="flex-1 border border-gray-300 rounded-lg py-2 font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 text-white rounded-lg py-2 font-semibold"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          {/* Simple intro */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Calculate Your Potential Value
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how much time and value Empath could unlock in therapy sessions
            </p>
          </div>

          {/* Calculator and Results */}
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Calculator */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-xl font-semibold mb-6">Your Therapy Details</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cost per session (USD)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={cost}
                    onChange={e => setCost(e.target.value)}
                    placeholder="175"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Session length (minutes)
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={length}
                    onChange={e => setLength(e.target.value)}
                    placeholder="50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sessions per month
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={frequency}
                    onChange={e => setFrequency(e.target.value)}
                    placeholder="4"
                  />
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              {hasCalculatorData ? (
                <>
                  <h3 className="text-xl font-semibold mb-6 text-green-700">Value Unlocked with Empath</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Time reclaimed per session:</span>
                      <span className="font-semibold">{minutesSaved} minutes</span>
                    </div>
                    
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Value unlocked per session:</span>
                      <span className="font-semibold">${dollarsSavedPerSession.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Monthly value gained:</span>
                      <span className="font-semibold">${monthlyDollarsSaved.toFixed(0)}</span>
                    </div>
                    
                    <div className="flex justify-between py-3 bg-green-50 rounded-lg px-4">
                      <span className="font-semibold text-green-800">Annual value gained:</span>
                      <span className="font-bold text-green-700 text-xl">
                        ${yearlyDollarsSaved.toLocaleString(undefined, {maximumFractionDigits:0})}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => setShowInviteModal(true)}
                      className="w-full bg-blue-600 text-white rounded-lg py-3 font-semibold hover:bg-blue-700 transition mb-3"
                    >
                      Get Started - Unlock ${yearlyDollarsSaved.toFixed(0)}/year
                    </button>
                    
                    <div className="flex gap-3">
                      <a
                        href="tel:+18883663082"
                        className="flex-1 border border-gray-300 rounded-lg py-2 text-center font-semibold hover:bg-gray-50"
                      >
                        📞 Call
                      </a>
                      <a
                        href="sms:+18883663082"
                        className="flex-1 border border-gray-300 rounded-lg py-2 text-center font-semibold hover:bg-gray-50"
                      >
                        💬 Text
                      </a>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-4xl mb-4">💰</div>
                  <h3 className="text-lg font-medium text-gray-600 mb-2">Enter your details</h3>
                  <p className="text-gray-500">Fill out the form to see your potential savings</p>
                </div>
              )}
            </div>
          </div>

          {/* Simple FAQ */}
          <div className="mt-16 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-8">Common Questions</h3>
            
            <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
              <div className="p-6">
                <h4 className="font-semibold mb-2">How does Empath add value?</h4>
                <p className="text-gray-600">Empath eliminates the 15-20 minutes typically spent catching your therapist up each session, so that time goes toward actual therapeutic work instead.</p>
              </div>
              
              <div className="p-6">
                <h4 className="font-semibold mb-2">Is this calculator accurate?</h4>
                <p className="text-gray-600">The calculator uses conservative estimates based on reported time savings from our users. Most sessions spend significant time on updates.</p>
              </div>
              
              <div className="p-6">
                <h4 className="font-semibold mb-2">How much does Empath cost?</h4>
                <p className="text-gray-600">Empath is free for clients when your therapist uses our platform. The value you save far exceeds any cost.</p>
              </div>
            </div>
          </div>

          {/* Simple security note */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 text-gray-600">
              <Shield className="w-5 h-5" />
              <span className="text-sm">HIPAA-compliant and secure</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Simple mobile CTA */}
      {isMobile && hasCalculatorData && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <button
            onClick={() => setShowInviteModal(true)}
            className="w-full bg-blue-600 text-white rounded-lg py-3 font-semibold"
          >
            Unlock ${yearlyDollarsSaved.toFixed(0)}/year
          </button>
        </div>
      )}

      {/* Padding for mobile CTA */}
      {isMobile && hasCalculatorData && <div className="h-20"></div>}
    </div>
  );
}

// Declare global types for Twitter tracking
declare global {
  interface Window {
    twq?: (...args: any[]) => void;
  }
} 