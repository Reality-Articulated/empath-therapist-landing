import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logo from '../../public/empath-logo.png';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';
import posthog from 'posthog-js';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

export default function TherapyValueCalculatorDirect() {
  // Calculator state
  const [cost, setCost] = useState('175');
  const [length, setLength] = useState('50');
  const [frequency, setFrequency] = useState('4');

  // Invite modal state
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [therapistEmail, setTherapistEmail] = useState('');
  const [inviteSubmitted, setInviteSubmitted] = useState(false);
  const [inviteError, setInviteError] = useState('');
  const [noTherapist, setNoTherapist] = useState(false);

  // Empath value assumptions
  const minutesSaved = 20; // per session
  const costNum = parseFloat(cost) || 0;
  const lengthNum = parseFloat(length) || 0;
  const freqNum = parseFloat(frequency) || 0;
  const valuePerMinute = lengthNum > 0 ? costNum / lengthNum : 0;
  const dollarsSavedPerSession = valuePerMinute * minutesSaved;
  const monthlyDollarsSaved = dollarsSavedPerSession * freqNum;
  const yearlyDollarsSaved = monthlyDollarsSaved * 12;
  const extraBreakthroughHoursPerYear = (minutesSaved * freqNum * 12) / 60;

  // Analytics: page view for direct variant
  useEffect(() => {
    posthog.capture('therapy_calculator_direct_page_viewed');
  }, []);

  // Invite form submit handler
  const handleInviteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInviteError('');
    setInviteSubmitted(false);
    if (!userEmail) {
      setInviteError('Please enter your email.');
      return;
    }
    if (!noTherapist && !therapistEmail) {
      setInviteError("Please enter your therapist's email or check the box if you don't have a therapist.");
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
          source: 'Therapy Calculator Direct',
          time: new Date().toLocaleString(),
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

  // Handler for opening invite modal (with analytics for direct variant)
  const handleOpenInviteModal = () => {
    setShowInviteModal(true);
    posthog.capture('calculator_direct_invite_modal_opened');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-teal-50/30 to-white flex flex-col items-center justify-center py-12 px-4">
      {/* Invite Modal */}
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
              }}
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            
            <h3 className="text-xl font-bold mb-2 text-[#1281dd]">Connect with Your Therapist</h3>
            
            {inviteSubmitted ? (
              <div className="text-green-600 font-medium text-center py-4">Thank you! We'll reach out to your therapist and let you know when you're connected.</div>
            ) : (
              <>
                <p className="mb-4 text-gray-600 text-sm">
                  To unlock Empath's full therapy features, we need to contact your therapist and get them set up with Empath.
                </p>
                
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
                      placeholder={noTherapist ? 'Not required' : 'therapist@example.com'}
                    />
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <input
                      id="no-therapist"
                      type="checkbox"
                      checked={noTherapist}
                      onChange={e => setNoTherapist(e.target.checked)}
                      className="h-4 w-4 text-[#1281dd] border-gray-300 rounded focus:ring-[#1281dd] mt-1"
                    />
                    <label htmlFor="no-therapist" className="text-sm text-gray-700 select-none">
                      I don't currently have a therapist
                    </label>
                  </div>
                  
                  {inviteError && <div className="text-red-600 text-sm">{inviteError}</div>}
                  
                  <button
                    type="submit"
                    className="w-full bg-[#1281dd] text-white rounded-full py-2 font-semibold hover:bg-[#0e6bb8] transition"
                  >
                    Submit
                  </button>
                </form>
                
                {/* New messaging about using Empath independently */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                    <span className="text-2xl mr-2">✨</span>
                    Don't want to wait? Start journaling today!
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    You don't need a therapist to start discovering yourself. Use Empath to journal independently and uncover your own patterns.
                  </p>
                  
                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <h5 className="font-semibold text-blue-900 mb-2">
                      📱 Start journaling in 30 seconds - no app required
                    </h5>
                    
                    <div className="flex gap-3 mb-3">
                      <a
                        href="tel:+18883663082"
                        className="flex-1 bg-[#1281dd] text-white rounded-full py-2 font-semibold text-center text-sm shadow hover:bg-[#0e6bb8] transition"
                        onClick={() => {
                          posthog.capture('calculator_direct_call_to_journal_initiated');
                        }}
                      >
                        Call to Journal
                      </a>
                      <a
                        href="sms:+18883663082"
                        className="flex-1 bg-white text-[#1281dd] border border-[#1281dd] rounded-full py-2 font-semibold text-center text-sm shadow hover:bg-blue-50 transition"
                        onClick={() => {
                          posthog.capture('calculator_direct_text_to_journal_initiated');
                        }}
                      >
                        Text to Journal
                      </a>
                    </div>
                    
                    <p className="text-sm text-gray-700">
                      Share your thoughts or emotions anytime. We'll save your voice notes or texts as timestamped journal entries. Once you've made an entry, download the app and log in with your phone number to see your insights.
                    </p>
                  </div>
                  
                  <p className="text-xs text-gray-500 italic">
                    🔒 Your entries are encrypted end-to-end and private. When you connect with a therapist later, everything will already be organized.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 border border-blue-100"
      >
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Empath Logo" className="w-14 h-14 mb-2" />
          <h1 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-teal-500 mb-2">Your Personal Therapy ROI</h1>
          <p className="text-gray-600 text-center max-w-md">Calculate exactly how much Empath saves you per session:</p>
        </div>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">How much do you pay per session? <span className="text-gray-400">(USD)</span></label>
            <input
              type="number"
              min="0"
              step="1"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1281dd]"
              value={cost}
              onChange={e => setCost(e.target.value)}
              placeholder="e.g. 175"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">How long is each session? <span className="text-gray-400">(minutes)</span></label>
            <input
              type="number"
              min="1"
              step="1"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1281dd]"
              value={length}
              onChange={e => setLength(e.target.value)}
              placeholder="e.g. 50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">How many sessions per month?</label>
            <input
              type="number"
              min="1"
              step="1"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1281dd]"
              value={frequency}
              onChange={e => setFrequency(e.target.value)}
              placeholder="e.g. 4"
            />
          </div>
        </form>
        <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-5 border border-green-100 shadow-sm">
          <h2 className="text-xl font-bold text-green-800 mb-3 text-center">🎉 Your Empath Savings:</h2>
          <ul className="space-y-3 text-gray-700 text-base">
            <li className="flex justify-between"><span>Time saved per session:</span><span className="font-bold text-green-700">{minutesSaved} minutes</span></li>
            <li className="flex justify-between"><span>Money saved per session:</span><span className="font-bold text-green-700">${dollarsSavedPerSession.toFixed(2)}</span></li>
            <li className="flex justify-between"><span>Monthly savings:</span><span className="font-bold text-green-700">${monthlyDollarsSaved.toFixed(0)}</span></li>
            <li className="flex justify-between border-t pt-2"><span className="font-semibold">Annual savings:</span><span className="font-bold text-green-700 text-lg">${yearlyDollarsSaved.toLocaleString(undefined, {maximumFractionDigits:0})}</span></li>
            <li className="flex justify-between bg-blue-50 p-2 rounded"><span className="font-semibold">Extra breakthrough time/year:</span><span className="font-bold text-blue-700">{extraBreakthroughHoursPerYear.toFixed(1)} hours</span></li>
          </ul>
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-700 text-sm mb-3 font-medium">Ready to stop wasting money on catch-up time?</p>
          <button
            type="button"
            onClick={handleOpenInviteModal}
            className="inline-block bg-gradient-to-r from-green-600 to-[#1281dd] text-white rounded-full px-8 py-4 font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            💸 Start Saving Today
          </button>
        </div>
      </motion.div>
    </div>
  );
} 