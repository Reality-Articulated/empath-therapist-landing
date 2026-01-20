import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import logo from '../../public/empath-logo.png';
import toast, { Toaster } from 'react-hot-toast';
import posthog from 'posthog-js';

// Quiz questions with scoring - professional tone for clinicians
const questions = [
  {
    id: 'client_ai_usage',
    question: "Have clients mentioned using AI for mental health?",
    options: [
      { label: "Not that I'm aware of", score: 0, insight: "low_awareness" },
      { label: "Occasionally", score: 1, insight: "emerging" },
      { label: "Several have mentioned it", score: 2, insight: "growing" },
      { label: "It comes up regularly", score: 3, insight: "high_awareness" }
    ]
  },
  {
    id: 'between_session_context',
    question: "How much context do you have between sessions?",
    options: [
      { label: "Limited to what's shared in session", score: 3, insight: "blind_spot" },
      { label: "Intake and session notes", score: 2, insight: "limited" },
      { label: "Client tracks specific items", score: 1, insight: "partial" },
      { label: "Ongoing visibility into their week", score: 0, insight: "strong" }
    ]
  },
  {
    id: 'catchup_time',
    question: "Session time spent on status updates?",
    options: [
      { label: "Under 5 minutes", score: 0, insight: "efficient" },
      { label: "5–10 minutes", score: 1, insight: "moderate" },
      { label: "10–20 minutes", score: 2, insight: "significant" },
      { label: "Over 20 minutes", score: 3, insight: "extensive" }
    ]
  },
  {
    id: 'pattern_confidence',
    question: "Confidence in identifying behavioral patterns?",
    options: [
      { label: "High confidence", score: 0, insight: "strong" },
      { label: "Moderate confidence", score: 1, insight: "moderate" },
      { label: "Limited confidence", score: 2, insight: "limited" },
      { label: "Insufficient data to assess", score: 3, insight: "blind" }
    ]
  },
  {
    id: 'client_perception',
    question: "Do clients compare your value to AI tools?",
    options: [
      { label: "No indication of this", score: 0, insight: "secure" },
      { label: "Possibly, not explicitly", score: 1, insight: "uncertain" },
      { label: "Likely, given current trends", score: 2, insight: "likely" },
      { label: "Yes, clients have mentioned it", score: 3, insight: "confirmed" }
    ]
  },
  {
    id: 'competitive_edge',
    question: "Your primary advantage over AI?",
    options: [
      { label: "Therapeutic relationship", score: 1, insight: "human_only" },
      { label: "Clinical judgment", score: 1, insight: "expertise_only" },
      { label: "Human insight with data support", score: 0, insight: "combined" },
      { label: "Difficult to articulate", score: 3, insight: "unclear" }
    ]
  }
];

// Result tiers
const getResultTier = (score: number): 'leader' | 'prepared' | 'exposed' | 'vulnerable' => {
  if (score <= 5) return 'leader';
  if (score <= 10) return 'prepared';
  if (score <= 14) return 'exposed';
  return 'vulnerable';
};

const resultContent = {
  leader: {
    title: "AI-Ready Leader",
    score: "A",
    color: "from-emerald-400 to-teal-500",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    textColor: "text-emerald-600",
    description: "You're ahead of the curve. Your clients get both human connection AND data-driven care.",
    recommendation: "Maintain your edge with tools that scale these advantages as AI capabilities grow."
  },
  prepared: {
    title: "Well Positioned",
    score: "B",
    color: "from-blue-400 to-indigo-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-600",
    description: "Solid foundation with room to strengthen. Most therapists are in this category.",
    recommendation: "Focus on better visibility into clients' lives between sessions — that's where AI has the edge."
  },
  exposed: {
    title: "Gaps Emerging",
    score: "C",
    color: "from-amber-400 to-orange-500",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    textColor: "text-amber-600",
    description: "Clients may be quietly comparing what you offer to AI tools. The gaps are noticeable.",
    recommendation: "Prioritize tools that give continuous client context so your human skills can shine."
  },
  vulnerable: {
    title: "Action Needed",
    score: "D",
    color: "from-red-400 to-rose-500",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    textColor: "text-red-600",
    description: "The AI comparison isn't working in your favor. Clients notice when they repeat themselves.",
    recommendation: "Close the gap on memory and patterns. Then your irreplaceable human qualities shine."
  }
};

export default function AIReadinessQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, { label: string; score: number; insight: string }>>({});
  const [leadEmail, setLeadEmail] = useState('');
  const [leadName, setLeadName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const totalQuestions = questions.length;
  const isIntro = currentStep === 0;
  const isEmailStep = currentStep === totalQuestions + 1;
  const isResults = currentStep === totalQuestions + 2;
  const currentQuestion = !isIntro && !isEmailStep && !isResults ? questions[currentStep - 1] : null;

  const totalScore = Object.values(answers).reduce((sum, a) => sum + a.score, 0);
  const maxScore = totalQuestions * 3;
  const resultTier = getResultTier(totalScore);
  const result = resultContent[resultTier];
  const scorePercentage = Math.round(((maxScore - totalScore) / maxScore) * 100);

  useEffect(() => {
    posthog.capture('ai_readiness_quiz_viewed');
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setSelectedOption(null);
  }, [currentStep]);

  const handleAnswer = (option: { label: string; score: number; insight: string }, index: number) => {
    if (!currentQuestion) return;

    setSelectedOption(index);
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: option
    }));

    posthog.capture('ai_readiness_quiz_answer', {
      question_id: currentQuestion.id,
      answer: option.label,
      score: option.score
    });

    setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, 400);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadEmail) {
      toast.error('Please enter your email');
      return;
    }

    setIsSubmitting(true);

    // Track in PostHog
    posthog.capture('ai_readiness_quiz_completed', {
      email: leadEmail,
      name: leadName,
      totalScore,
      resultTier,
      answers: Object.entries(answers).map(([id, a]) => ({
        question: id,
        answer: a.label,
        score: a.score
      }))
    });

    // Save to Google Sheets
    const GOOGLE_SHEETS_WEBHOOK = 'https://script.google.com/macros/s/AKfycbxs9dttPWNj9fnEObu9oJMeS0t9y_I6Vj7axAXWZ3h3SAslTROos3tn1yCeUscd_v_DAA/exec';

    try {
      await fetch(GOOGLE_SHEETS_WEBHOOK, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Apps Script
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadName,
          email: leadEmail,
          score: `${scorePercentage}%`,
          resultTier,
          answers: Object.entries(answers).map(([id, a]) => `${id}: ${a.label}`).join(' | ')
        }),
      });
    } catch (err) {
      console.log('Sheets webhook error:', err);
    } finally {
      setIsSubmitting(false);
      setShowResults(true);
      setCurrentStep(totalQuestions + 2);
    }
  };

  const goBack = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] selection:bg-blue-100">
      <Toaster position="top-center" />

      {/* Subtle background pattern */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Header */}
      <div className="relative z-10 border-b border-stone-200 bg-[#FAF9F6]/80 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Empath" className="w-8 h-8" />
            <span className="font-semibold text-stone-800">Empath</span>
          </div>
          {!isIntro && !isResults && (
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {questions.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 w-6 rounded-full transition-all duration-300 ${
                      i < currentStep ? 'bg-stone-800' :
                      i === currentStep - 1 ? 'bg-stone-800' : 'bg-stone-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="relative z-10 max-w-xl mx-auto px-6 py-12 md:py-20">
        <AnimatePresence mode="wait">

          {/* Intro Screen */}
          {isIntro && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              {/* Visual mark */}
              <div className="mb-10 flex justify-center">
                <div className="relative w-28 h-28">
                  {/* Decorative rings */}
                  <div className="absolute inset-0 rounded-full border-2 border-stone-200" />
                  <div className="absolute inset-3 rounded-full border-2 border-stone-200" />
                  {/* Center logo */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-stone-800 to-stone-900 shadow-xl flex items-center justify-center">
                      <img src={logo} alt="" className="w-10 h-10" />
                    </div>
                  </div>
                  {/* Accent dot */}
                  <div className="absolute top-0 right-2 w-4 h-4 rounded-full bg-[#1b8af1] shadow-md" />
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4 tracking-tight">
                AI Readiness
                <br />
                <span className="text-stone-400">Assessment</span>
              </h1>

              <p className="text-lg text-stone-500 mb-10 max-w-sm mx-auto">
                Where do you stand as clients compare therapy to AI?
              </p>

              <div className="bg-white rounded-2xl p-5 mb-8 border border-stone-200 text-left">
                <div className="space-y-3">
                  {[
                    "Your competitive position",
                    "Gaps clients might notice",
                    "How to stand out"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-md bg-stone-100 flex items-center justify-center text-xs font-semibold text-stone-400">
                        {i + 1}
                      </div>
                      <span className="text-stone-600 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setCurrentStep(1)}
                className="w-full md:w-auto px-10 py-4 bg-stone-900 text-white rounded-xl font-semibold hover:bg-stone-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 mx-auto group"
              >
                Start
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-sm text-stone-400 mt-5">
                6 questions · 2 min
              </p>
            </motion.div>
          )}

          {/* Question Screens */}
          {currentQuestion && (
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={goBack}
                className="flex items-center gap-1.5 text-stone-400 hover:text-stone-600 mb-10 transition group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium">Back</span>
              </button>

              <div className="mb-8">
                <span className="inline-block px-3 py-1 bg-stone-100 text-stone-500 text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
                  {currentStep} of {totalQuestions}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-stone-900 leading-tight">
                  {currentQuestion.question}
                </h2>
              </div>

              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedOption === index;
                  const letters = ['A', 'B', 'C', 'D'];
                  return (
                    <motion.button
                      key={index}
                      onClick={() => handleAnswer(option, index)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center gap-4 group ${
                        isSelected
                          ? 'bg-stone-900 border-stone-900 text-white shadow-lg'
                          : 'bg-white border-stone-200 hover:border-stone-300 hover:shadow-md'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-semibold text-sm transition-colors ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-stone-100 text-stone-400 group-hover:bg-stone-200 group-hover:text-stone-500'
                      }`}>
                        {letters[index]}
                      </div>
                      <span className={`font-medium ${isSelected ? 'text-white' : 'text-stone-700'}`}>
                        {option.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Email Capture Screen */}
          {isEmailStep && !showResults && (
            <motion.div
              key="email"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <button
                onClick={goBack}
                className="flex items-center gap-1.5 text-stone-400 hover:text-stone-600 mb-10 transition group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium">Back</span>
              </button>

              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 mb-6 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-stone-900 mb-2">
                  Your results are ready
                </h2>
                <p className="text-stone-500 text-sm">
                  Enter your email to see your score
                </p>
              </div>

              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full bg-white border-2 border-stone-200 rounded-xl px-4 py-4 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-400 transition-colors"
                    value={leadName}
                    onChange={e => setLeadName(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full bg-white border-2 border-stone-200 rounded-xl px-4 py-4 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-400 transition-colors"
                    value={leadEmail}
                    onChange={e => setLeadEmail(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-stone-900 text-white rounded-xl font-semibold hover:bg-stone-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      See My Results
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <p className="text-xs text-center text-stone-400 mt-6">
                We respect your inbox. No spam, ever.
              </p>
            </motion.div>
          )}

          {/* Results Screen */}
          {isResults && showResults && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Score Visual */}
              <div className="text-center mb-10">
                <motion.div
                  className={`inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br ${result.color} mb-6 shadow-xl`}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <span className="text-5xl font-bold text-white">{result.score}</span>
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-1">
                  {result.title}
                </h2>
                <p className={`text-sm font-medium ${result.textColor}`}>
                  {scorePercentage}% AI-Ready
                </p>

                {/* Score bar */}
                <div className="max-w-xs mx-auto mt-6">
                  <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${result.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${scorePercentage}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </div>
                </div>
              </div>

              {/* Main Result Card */}
              <div className={`${result.bgColor} rounded-2xl p-5 mb-5 border ${result.borderColor}`}>
                <p className="text-stone-700 text-sm leading-relaxed mb-3">
                  {result.description}
                </p>
                <div className="bg-white/60 rounded-xl p-3">
                  <p className="text-sm text-stone-600">
                    <strong className="text-stone-800">Next step:</strong> {result.recommendation}
                  </p>
                </div>
              </div>

              {/* Key Insights */}
              <div className="bg-white rounded-2xl p-5 mb-5 border border-stone-200">
                <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-4">
                  Key insights
                </h3>
                <div className="space-y-3">
                  {answers.catchup_time && answers.catchup_time.score >= 2 && (
                    <div className="flex gap-3 items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                      <p className="text-stone-600 text-sm">
                        <strong className="text-stone-800">Catch-up time</strong> — {answers.catchup_time.label.toLowerCase()} per session reduces time for deep work.
                      </p>
                    </div>
                  )}
                  {answers.between_session_context && answers.between_session_context.score >= 2 && (
                    <div className="flex gap-3 items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                      <p className="text-stone-600 text-sm">
                        <strong className="text-stone-800">Visibility gap</strong> — You're missing 167 of 168 hours in your client's week.
                      </p>
                    </div>
                  )}
                  {answers.pattern_confidence && answers.pattern_confidence.score >= 2 && (
                    <div className="flex gap-3 items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                      <p className="text-stone-600 text-sm">
                        <strong className="text-stone-800">Pattern recognition</strong> — Without continuous data, you're working from fragments.
                      </p>
                    </div>
                  )}
                  {answers.client_ai_usage && answers.client_ai_usage.score >= 2 && (
                    <div className="flex gap-3 items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                      <p className="text-stone-600 text-sm">
                        <strong className="text-stone-800">AI comparison</strong> — Clients are already using AI tools and making comparisons.
                      </p>
                    </div>
                  )}
                  {Object.values(answers).every(a => a.score < 2) && (
                    <div className="flex gap-3 items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                      <p className="text-stone-600 text-sm">
                        <strong className="text-stone-800">Strong position</strong> — You've minimized major gaps. Maintain your advantage.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Solution Card */}
              <div className="bg-gradient-to-br from-stone-900 to-stone-800 rounded-2xl p-6 mb-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <img src={logo} alt="Empath" className="w-8 h-8" />
                  <span className="font-semibold">How Empath Helps</span>
                </div>
                <p className="text-stone-300 text-sm mb-6 leading-relaxed">
                  Empath gives you AI-level memory and pattern recognition — so the comparison becomes:
                </p>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <p className="text-stone-400 text-sm mb-1">ChatGPT alone</p>
                  <p className="text-stone-500 text-xs mb-3">vs.</p>
                  <p className="text-xl font-bold">
                    You <span className="text-[#1b8af1]">+</span> AI superpowers
                  </p>
                  <p className="text-stone-400 text-xs mt-2">
                    Your irreplaceable human value becomes the clear advantage
                  </p>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-3">
                <a
                  href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3ciL9GVqgrLt07RkxMMYq-0szLXts_yaQ6M7oa0l6Egx-c1gM_1ayZa6kBmPgtXZZgZDs69oxz?gv=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 bg-[#1b8af1] text-white rounded-xl font-semibold hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl text-center"
                  onClick={() => posthog.capture('ai_readiness_quiz_demo_clicked', { resultTier })}
                >
                  See How Empath Works →
                </a>
                <a
                  href="/"
                  className="block w-full py-4 bg-white text-stone-700 rounded-xl font-semibold hover:bg-stone-50 transition-all text-center border border-stone-200"
                >
                  Learn More
                </a>
              </div>

              <p className="text-xs text-center text-stone-400 mt-8">
                A detailed report has been sent to {leadEmail}
              </p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="relative z-10 border-t border-stone-200">
        <div className="max-w-2xl mx-auto px-6 py-6 text-center">
          <p className="text-sm text-stone-400">
            🔒 Your responses are confidential
          </p>
        </div>
      </div>
    </div>
  );
}
