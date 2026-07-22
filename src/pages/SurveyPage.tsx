import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import posthog from 'posthog-js';

// ─────────────────────────────────────────────────────────────────────────────
// Empath User Feedback Survey. Designed to be loaded inside the iOS
// marketing-campaign bottom sheet (or any in-app browser), so it renders no
// site chrome and stays compact. No login; name/email are optional at the end.
// Responses are NOT stored server-side — every interaction is a PostHog event
// and analytics are computed entirely in PostHog:
//   funnel  survey_viewed → survey_completed          = completion rate
//   trend   survey_answer broken down by `answer`,
//           filtered by `question_id`                 = per-question results
// Matrix questions fire one survey_answer per row with question_id
// `<id>.<row_slug>`. Bump SURVEY_ID when changing questions so results don't
// mix across versions.
// ─────────────────────────────────────────────────────────────────────────────

const SURVEY_ID = 'user_feedback_2026_07';

const FEATURES = [
  'Written journaling',
  'Voice journaling',
  'Call to journal',
  'AI chat',
  'Mood tracking',
  'Deeper Insights',
  'Journal search',
  'Reminders',
  'Therapist sharing',
];

interface FollowUp {
  id: string;
  question: string;
  showIf?: (answer: string) => boolean;
}

interface SurveyQuestion {
  id: string;
  type: 'single' | 'multi' | 'matrix';
  question: string;
  helper?: string;
  options?: string[];
  maxSelections?: number;
  exclusiveOptions?: string[]; // picking one of these clears all other picks
  rows?: string[];
  scale?: string[];
  followUp?: FollowUp;
}

const questions: SurveyQuestion[] = [
  {
    id: 'journaling_frequency',
    type: 'single',
    question: 'How often do you currently journal in Empath?',
    options: [
      'Every day',
      'A few times a week',
      'About once a week',
      'Less than once a week',
      'I have only used it once',
      'I have not created a journal yet',
    ],
  },
  {
    id: 'journal_methods',
    type: 'multi',
    question: 'How do you usually create journals in Empath?',
    helper: 'Select all that apply',
    options: [
      'Typing',
      'Voice recording',
      'Calling Empath',
      'AI chat',
      'Importing or sharing content',
      'Other',
      'I have not created a journal yet',
    ],
    exclusiveOptions: ['I have not created a journal yet'],
  },
  {
    id: 'open_triggers',
    type: 'multi',
    question: 'What usually prompts you to open Empath?',
    helper: 'Select up to three',
    maxSelections: 3,
    options: [
      'I feel overwhelmed or emotional',
      'I want to process something that happened',
      'I want to capture a memory or thought',
      'I want to understand my mood or behavior',
      'I am preparing for therapy',
      'I receive a reminder',
      'Journaling is part of my routine',
      'Other',
    ],
  },
  {
    id: 'features_used',
    type: 'multi',
    question: 'Which Empath features have you used?',
    helper: 'Select all that apply',
    options: [...FEATURES, 'Other'],
  },
  {
    id: 'most_missed_feature',
    type: 'single',
    question: 'Which one Empath feature would you miss most if it were removed?',
    options: [...FEATURES, 'Other'],
  },
  {
    id: 'journaling_friction',
    type: 'multi',
    question: 'What makes journaling in Empath difficult or less enjoyable?',
    helper: 'Select all that apply',
    options: [
      'I do not know what to write',
      'It takes too long',
      'I forget to journal',
      'The prompts do not feel relevant',
      'AI does not understand me well',
      'Voice or call journaling does not work as expected',
      'I have privacy concerns',
      'The app is difficult to navigate',
      'I do not get enough value after journaling',
      'Nothing currently gets in the way',
      'Other',
    ],
    exclusiveOptions: ['Nothing currently gets in the way'],
  },
  {
    id: 'empath_benefits',
    type: 'multi',
    question: 'How has Empath helped you so far?',
    helper: 'Select all that apply',
    options: [
      'I understand my emotions better',
      'I notice recurring patterns',
      'I feel calmer after journaling',
      'I can express myself more easily',
      'I remember important experiences',
      'I feel more prepared for therapy',
      'I have developed a journaling habit',
      'It has not helped me yet',
      'Other',
    ],
    exclusiveOptions: ['It has not helped me yet'],
  },
  {
    id: 'feature_usefulness',
    type: 'matrix',
    question: 'How useful are the following Empath features?',
    rows: [
      'Written journaling',
      'Voice journaling',
      'Call to journal',
      'AI chat',
      'Mood tracking',
      'Deeper Insights',
    ],
    scale: ['Very useful', 'Somewhat useful', 'Slightly useful', 'Not useful', 'Haven’t used'],
  },
  {
    id: 'feature_needs_improvement',
    type: 'single',
    question: 'Which current feature needs the most improvement?',
    options: [
      'Written journaling',
      'Voice journaling',
      'Call to journal',
      'AI chat',
      'Mood tracking',
      'Deeper Insights',
      'Journal search',
      'Reminders',
      'None',
      'Other',
    ],
    followUp: {
      id: 'feature_improvement_detail',
      question: 'What would you improve about this feature?',
      showIf: answer => answer !== 'None',
    },
  },
  {
    id: 'desired_additions',
    type: 'multi',
    question: 'Which additions would make Empath more useful to you?',
    helper: 'Select up to three',
    maxSelections: 3,
    options: [
      'Personalized journaling prompts',
      'Better AI conversations',
      'Weekly or monthly summaries',
      'More detailed emotional patterns',
      'Connections between mood, sleep, activity, weather, or location',
      'Actionable recommendations',
      'Guided exercises for difficult emotions',
      'Therapy-preparation reports',
      'Goals and habit tracking',
      'Better journal search',
      'More customizable reminders',
      'Other',
    ],
  },
  {
    id: 'therapist_sharing_interest',
    type: 'single',
    question: 'How interested would you be in sharing selected information from Empath with a therapist?',
    options: [
      'Very interested',
      'Somewhat interested',
      'Not sure',
      'Not very interested',
      'Not interested',
      'I do not currently see a therapist',
    ],
    followUp: {
      id: 'sharing_controls_needed',
      question: 'What controls would you need before sharing information?',
    },
  },
  {
    id: 'data_comfort',
    type: 'multi',
    question: 'Which types of information would you be comfortable allowing Empath to use to identify patterns?',
    helper: 'Select all that apply',
    options: [
      'General location, such as city',
      'Specific location',
      'Weather',
      'Sleep',
      'Steps or physical activity',
      'Calendar events',
      'Screen time',
      'Menstrual cycle information',
      'None of these',
      'Other',
    ],
    exclusiveOptions: ['None of these'],
  },
  {
    id: 'usage_hesitations',
    type: 'single',
    question: 'What, if anything, makes you hesitant to use Empath more often?',
    options: [
      'Privacy or data security',
      'How AI uses my journals',
      'AI responses do not feel accurate',
      'I do not want to share personal information',
      'I do not understand how my data is used',
      'The product does not provide enough value',
      'The experience feels too complicated',
      'Nothing makes me hesitant',
      'Other',
    ],
  },
  {
    id: 'payment_intent',
    type: 'single',
    question: 'Imagine Empath offered unlimited AI journaling, advanced insights, weekly summaries, and therapy-preparation reports. Which best describes you?',
    options: [
      'I would pay for this',
      'I might pay depending on the price',
      'I would only use Empath if it were free',
      'I need to use Empath more before deciding',
      'I would not use these features',
    ],
  },
];

// EmpathColors.xcassets values, mirrored from the iOS marketing-campaign sheet
// (see empath-admin/src/app/marketing-campaign/page.tsx). Keeps the page
// looking native when the sheet loads it. `?theme=dark|light` overrides the
// system preference.
const THEMES = {
  light: { background: '#F0F0F0', text: '#181818', muted: '#6B6B6B', tint: '#0077E6', card: '#FFFFFF', border: '#E2E2E2' },
  dark: { background: '#181818', text: '#DEE2E6', muted: '#9BA1A6', tint: '#4DA3FF', card: '#242424', border: '#333333' },
} as const;

const slug = (label: string) => label.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');

export default function SurveyPage() {
  const location = useLocation();
  const [step, setStep] = useState(0); // 0..questions.length-1, then contact step
  const [answers, setAnswers] = useState<Record<string, string | string[] | Record<string, string>>>({});
  const [done, setDone] = useState(false);

  // Per-screen state, reset on step change
  const [singleSel, setSingleSel] = useState<string | null>(null);
  const [multiSel, setMultiSel] = useState<string[]>([]);
  const [matrixSel, setMatrixSel] = useState<Record<string, string>>({});
  const [otherText, setOtherText] = useState('');
  const [followUpText, setFollowUpText] = useState('');
  const [followUpTexts, setFollowUpTexts] = useState<Record<string, string>>({});
  const [otherTexts, setOtherTexts] = useState<Record<string, string>>({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const theme = useMemo(() => {
    const param = new URLSearchParams(location.search).get('theme');
    if (param === 'dark' || param === 'light') return THEMES[param];
    const prefersDark = typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    return prefersDark ? THEMES.dark : THEMES.light;
  }, [location.search]);

  const isContactStep = step === questions.length;
  const q = isContactStep ? null : questions[step];
  const totalSteps = questions.length + 1;
  const progress = done ? 1 : step / totalSteps;

  useEffect(() => {
    posthog.capture('survey_viewed', { survey_id: SURVEY_ID });
  }, []);

  // Long questions leave the viewport scrolled down when advancing
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step, done]);

  const resetScreenState = () => {
    setSingleSel(null);
    setMultiSel([]);
    setMatrixSel({});
    setOtherText('');
    setFollowUpText('');
  };

  const followUpVisible = (question: SurveyQuestion, answer: string | null) =>
    !!question.followUp && answer !== null && (!question.followUp.showIf || question.followUp.showIf(answer));

  const needsExtraInput = (question: SurveyQuestion, answer: string | null) =>
    answer === 'Other' || followUpVisible(question, answer);

  const captureAnswer = (
    question: SurveyQuestion,
    answer: string | string[],
    extras: { other?: string; followUp?: string } = {},
  ) => {
    const other = answer === 'Other' || (Array.isArray(answer) && answer.includes('Other')) ? extras.other?.trim() : undefined;
    // Multi-selects fire one event per selected option — PostHog breakdowns
    // can't split array properties, so `answer` must always be a scalar.
    const selections = Array.isArray(answer) ? answer : [answer];
    selections.forEach(option => {
      posthog.capture('survey_answer', {
        survey_id: SURVEY_ID,
        question_id: question.id,
        question_index: step,
        answer: option,
        ...(Array.isArray(answer) ? { answer_list: answer } : {}),
        ...(other && option === 'Other' ? { other_text: other } : {}),
        ...(extras.followUp?.trim() ? { follow_up_text: extras.followUp.trim() } : {}),
      });
    });
    setAnswers(prev => ({ ...prev, [question.id]: answer }));
    if (other) setOtherTexts(prev => ({ ...prev, [question.id]: other }));
    if (question.followUp && extras.followUp?.trim()) {
      setFollowUpTexts(prev => ({ ...prev, [question.followUp!.id]: extras.followUp!.trim() }));
    }
  };

  const advance = () => {
    resetScreenState();
    setStep(prev => prev + 1);
  };

  const handleSingleSelect = (question: SurveyQuestion, option: string) => {
    setSingleSel(option);
    if (needsExtraInput(question, option)) return; // wait for Continue
    setTimeout(() => {
      captureAnswer(question, option);
      advance();
    }, 300);
  };

  const handleSingleContinue = (question: SurveyQuestion) => {
    if (!singleSel) return;
    captureAnswer(question, singleSel, { other: otherText, followUp: followUpText });
    advance();
  };

  const handleMultiToggle = (question: SurveyQuestion, option: string) => {
    setMultiSel(prev => {
      if (prev.includes(option)) return prev.filter(o => o !== option);
      const isExclusive = question.exclusiveOptions?.includes(option);
      if (isExclusive) return [option];
      const withoutExclusive = prev.filter(o => !question.exclusiveOptions?.includes(o));
      if (question.maxSelections && withoutExclusive.length >= question.maxSelections) return withoutExclusive;
      return [...withoutExclusive, option];
    });
  };

  const handleMultiContinue = (question: SurveyQuestion) => {
    if (multiSel.length === 0) return;
    captureAnswer(question, multiSel, { other: otherText });
    advance();
  };

  const handleMatrixContinue = (question: SurveyQuestion) => {
    if (!question.rows!.every(row => matrixSel[row])) return;
    question.rows!.forEach(row => {
      posthog.capture('survey_answer', {
        survey_id: SURVEY_ID,
        question_id: `${question.id}.${slug(row)}`,
        question_index: step,
        answer: matrixSel[row],
      });
    });
    setAnswers(prev => ({ ...prev, [question.id]: matrixSel }));
    advance();
  };

  const handleSubmit = () => {
    const flat: Record<string, unknown> = {};
    questions.forEach(question => {
      const answer = answers[question.id];
      if (answer === undefined) return;
      if (question.type === 'matrix') {
        Object.entries(answer as Record<string, string>).forEach(([row, rating]) => {
          flat[`${question.id}.${slug(row)}`] = rating;
        });
      } else {
        flat[question.id] = answer;
      }
    });
    Object.entries(otherTexts).forEach(([id, text]) => { flat[`${id}_other`] = text; });
    Object.entries(followUpTexts).forEach(([id, text]) => { flat[id] = text; });

    posthog.capture('survey_completed', {
      survey_id: SURVEY_ID,
      ...flat,
      respondent_name: name.trim() || null,
      respondent_email: email.trim() || null,
    });
    setDone(true);
  };

  const optionButton = (label: string, isSelected: boolean, onClick: () => void) => (
    <button
      key={label}
      onClick={onClick}
      className="w-full text-left py-3 px-4 rounded-xl font-semibold text-sm transition-colors"
      style={{
        backgroundColor: isSelected ? theme.tint : theme.card,
        color: isSelected ? '#FFFFFF' : theme.text,
        border: `1px solid ${isSelected ? theme.tint : theme.border}`,
      }}
    >
      {label}
    </button>
  );

  const textInputStyle = {
    backgroundColor: theme.card,
    color: theme.text,
    border: `1px solid ${theme.border}`,
  };

  const continueButton = (enabled: boolean, onClick: () => void, label = 'Continue') => (
    <button
      onClick={onClick}
      disabled={!enabled}
      className="w-full mt-5 py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-opacity"
      style={{ backgroundColor: theme.tint, opacity: enabled ? 1 : 0.4 }}
    >
      {label} <ArrowRight className="w-4 h-4" />
    </button>
  );

  const otherInput = (visible: boolean) => visible && (
    <input
      type="text"
      value={otherText}
      onChange={e => setOtherText(e.target.value)}
      placeholder="Please specify (optional)"
      className="w-full mt-3 rounded-xl p-3 text-sm outline-none"
      style={textInputStyle}
    />
  );

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center px-5 py-6"
      style={{ backgroundColor: theme.background, color: theme.text }}
    >
      <Helmet>
        <title>Empath User Feedback Survey</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="w-full max-w-md">
        {/* Progress bar */}
        {!done && (
          <div className="h-1 w-full rounded-full mb-6 overflow-hidden" style={{ backgroundColor: theme.border }}>
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: theme.tint }}
              initial={{ width: 0 }}
              animate={{ width: `${Math.max(progress * 100, 4)}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}

        <AnimatePresence mode="wait">
          {done ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-10"
            >
              <CheckCircle className="w-12 h-12 mx-auto mb-4" style={{ color: theme.tint }} />
              <h1 className="text-xl font-bold mb-2">Thank you!</h1>
              <p className="text-sm" style={{ color: theme.muted }}>
                Your feedback shapes what we build next.
              </p>
            </motion.div>
          ) : isContactStep ? (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
            >
              <h1 className="text-lg font-bold mb-1">Almost done</h1>
              <p className="text-sm mb-4" style={{ color: theme.muted }}>
                Optionally leave your name or email if you’re open to us following up. No account needed.
              </p>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Name (optional)"
                className="w-full rounded-xl p-3 text-sm outline-none mb-3"
                style={textInputStyle}
              />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email (optional)"
                className="w-full rounded-xl p-3 text-sm outline-none"
                style={textInputStyle}
              />
              {continueButton(true, handleSubmit, 'Submit')}
            </motion.div>
          ) : q!.type === 'matrix' ? (
            <motion.div
              key={q!.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
            >
              <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: theme.muted }}>
                {step + 1} of {questions.length}
              </p>
              <h1 className="text-lg font-bold mb-5">{q!.question}</h1>
              <div className="flex flex-col gap-5">
                {q!.rows!.map(row => (
                  <div key={row}>
                    <p className="text-sm font-bold mb-2">{row}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {q!.scale!.map(rating => {
                        const isSelected = matrixSel[row] === rating;
                        return (
                          <button
                            key={rating}
                            onClick={() => setMatrixSel(prev => ({ ...prev, [row]: rating }))}
                            className="text-xs font-semibold px-2.5 py-1.5 rounded-full transition-colors"
                            style={{
                              backgroundColor: isSelected ? theme.tint : theme.card,
                              color: isSelected ? '#FFFFFF' : theme.text,
                              border: `1px solid ${isSelected ? theme.tint : theme.border}`,
                            }}
                          >
                            {rating}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              {continueButton(q!.rows!.every(row => !!matrixSel[row]), () => handleMatrixContinue(q!))}
            </motion.div>
          ) : q!.type === 'multi' ? (
            <motion.div
              key={q!.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
            >
              <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: theme.muted }}>
                {step + 1} of {questions.length}
              </p>
              <h1 className="text-lg font-bold mb-1">{q!.question}</h1>
              {q!.helper && <p className="text-sm mb-4" style={{ color: theme.muted }}>{q!.helper}</p>}
              <div className="flex flex-col gap-2.5">
                {q!.options!.map(option =>
                  optionButton(option, multiSel.includes(option), () => handleMultiToggle(q!, option)),
                )}
              </div>
              {otherInput(multiSel.includes('Other'))}
              {continueButton(multiSel.length > 0, () => handleMultiContinue(q!))}
            </motion.div>
          ) : (
            <motion.div
              key={q!.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
            >
              <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: theme.muted }}>
                {step + 1} of {questions.length}
              </p>
              <h1 className="text-lg font-bold mb-5">{q!.question}</h1>
              <div className="flex flex-col gap-2.5">
                {q!.options!.map(option =>
                  optionButton(option, singleSel === option, () => handleSingleSelect(q!, option)),
                )}
              </div>
              {otherInput(singleSel === 'Other')}
              {followUpVisible(q!, singleSel) && (
                <div className="mt-4">
                  <p className="text-sm font-bold mb-2">{q!.followUp!.question}</p>
                  <textarea
                    value={followUpText}
                    onChange={e => setFollowUpText(e.target.value)}
                    rows={3}
                    placeholder="Optional"
                    className="w-full rounded-xl p-3 text-sm outline-none resize-none"
                    style={textInputStyle}
                  />
                </div>
              )}
              {needsExtraInput(q!, singleSel) && continueButton(!!singleSel, () => handleSingleContinue(q!))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
