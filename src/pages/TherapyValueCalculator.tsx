import React, { useState } from 'react';
import { motion } from 'framer-motion';
import logo from '../../public/empath-logo.png';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

export default function TherapyValueCalculator() {
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-teal-50/30 to-white flex flex-col items-center justify-center py-12 px-4">
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
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 border border-blue-100"
      >
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Empath Logo" className="w-14 h-14 mb-2" />
          <h1 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-teal-500 mb-2">Therapy Value Calculator</h1>
          <p className="text-gray-600 text-center max-w-md">See how much more value you get from therapy with Empath. Enter your details below:</p>
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
        <div className="mt-8 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-5 border border-teal-100 shadow-sm">
          <h2 className="text-xl font-bold text-[#1281dd] mb-2 text-center">With Empath, you save:</h2>
          <ul className="space-y-2 text-gray-700 text-base">
            <li><span className="font-semibold text-[#1281dd]">{minutesSaved} minutes</span> per session</li>
            <li><span className="font-semibold text-[#1281dd]">${dollarsSavedPerSession.toFixed(2)}</span> per session</li>
            <li><span className="font-semibold text-[#1281dd]">${monthlyDollarsSaved.toFixed(0)}</span> per month</li>
            <li><span className="font-semibold text-[#1281dd]">${yearlyDollarsSaved.toLocaleString(undefined, {maximumFractionDigits:0})}</span> per year</li>
            <li><span className="font-semibold text-[#1281dd]">{extraBreakthroughHoursPerYear.toFixed(1)} hours</span> of extra breakthrough time per year</li>
          </ul>
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm mb-2">Ready to get more from therapy?</p>
          <button
            type="button"
            onClick={() => setShowInviteModal(true)}
            className="inline-block bg-[#1281dd] text-white rounded-full px-6 py-3 font-semibold shadow hover:bg-[#0e6bb8] transition"
          >
            Try Empath Now
          </button>
        </div>
      </motion.div>
    </div>
  );
} 