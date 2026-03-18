import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Activity,
  Brain,
  ChevronRight,
  FlaskConical,
  LineChart,
  Lock,
  Microscope,
  Shield,
  BookOpen,
  Users,
  Smartphone,
  Heart,
} from 'lucide-react';

const evidenceSources = [
  {
    title: 'Therapeutic Alliance Predicts Outcomes Across All Modalities',
    takeaway:
      'This landmark meta-analysis of 295 studies and over 30,000 patients found a robust correlation (r = .278, d = .579) between therapeutic alliance quality and treatment outcomes across all therapy modalities. Empath strengthens alliance by giving therapists richer context before each session, enabling more attuned, personalized conversations that deepen the client-therapist bond.',
    source: 'Flückiger, Del Re, Wampold & Horvath — Psychotherapy',
    year: '2018',
    href: 'https://pubmed.ncbi.nlm.nih.gov/29792475/',
    icon: Heart,
  },
  {
    title: 'Between-Session "Sudden Gains" Account for Half of Therapy Improvement',
    takeaway:
      'Tang & DeRubeis discovered that many therapy patients experience large symptom improvements in single between-session intervals — "sudden gains" averaging 11 BDI points and accounting for 50% of total improvement. Empath captures what happens between sessions so therapists can identify and build on these critical breakthroughs rather than missing them.',
    source: 'Tang & DeRubeis — J Consulting & Clinical Psychology',
    year: '1999',
    href: 'https://pubmed.ncbi.nlm.nih.gov/10596511/',
    icon: LineChart,
  },
  {
    title: 'Between-Session Homework Quality and Quantity Predict Therapy Outcomes',
    takeaway:
      'This meta-analysis of 2,312 CBT clients found strong effect sizes (d = 0.78 for quality, 0.79 for quantity) linking between-session homework engagement to treatment outcomes. Empath\'s journaling and mood logging functions as structured between-session engagement, and AI-generated summaries help therapists track compliance without relying on patient recall.',
    source: 'Kazantzis, Whittington & Dattilio — Behavior Therapy',
    year: '2016',
    href: 'https://pubmed.ncbi.nlm.nih.gov/27816086/',
    icon: BookOpen,
  },
  {
    title: 'Real-Time Data Capture Eliminates Recall Bias in Clinical Assessment',
    takeaway:
      'Shiffman, Stone & Hufford established that real-time sampling of behaviors and experiences in natural environments minimizes recall bias, maximizes ecological validity, and reveals microprocesses invisible to retrospective reporting. Empath operationalizes EMA principles by capturing mood, triggers, and experiences in the moment rather than asking clients to remember them days later.',
    source: 'Shiffman, Stone & Hufford — Annual Rev Clinical Psychology',
    year: '2008',
    href: 'https://pubmed.ncbi.nlm.nih.gov/18509902/',
    icon: Smartphone,
  },
  {
    title: 'Expressive Writing Homework Enhances Psychotherapy Outcomes',
    takeaway:
      'Clients assigned expressive writing homework showed significantly greater reductions in anxiety and depressive symptoms and greater overall progress in psychotherapy compared to controls. Empath\'s guided journaling brings the expressive writing paradigm into a digital, therapist-connected format — capturing therapeutic benefit between appointments.',
    source: 'Graf, Gaudiano & Geller — Psychotherapy Research',
    year: '2008',
    href: 'https://pubmed.ncbi.nlm.nih.gov/18815991/',
    icon: BookOpen,
  },
  {
    title: 'App-Based Adjuncts Add Measurable Benefit to Therapy',
    takeaway:
      'This meta-analysis of 46 RCTs (4,869 participants) found that app-based tools used alongside therapy produced additive benefits for depression (g = 0.17), anxiety (g = 0.80), and mania symptoms — especially when monitored data was shared with a therapist. Empath is designed precisely as this kind of adjunctive tool: enhancing existing therapy rather than replacing it.',
    source: 'Miralles et al. — J Affective Disorders',
    year: '2024',
    href: 'https://pubmed.ncbi.nlm.nih.gov/38225971/',
    icon: Smartphone,
  },
  {
    title: 'Therapist-Guided Digital Tools Produce Nearly Double the Effect Size',
    takeaway:
      'Guided self-help (with therapist support) produced nearly double the effect size of unguided self-help for depression (d = 1.14 vs d = 0.66). This validates Empath\'s clinician-in-the-loop model: AI surfaces insights, but the therapist remains the decision-maker, maximizing both efficacy and safety.',
    source: 'Berger, Hämmerli, Gubser et al. — Behaviour Research & Therapy',
    year: '2011',
    href: 'https://pubmed.ncbi.nlm.nih.gov/22060248/',
    icon: Shield,
  },
  {
    title: 'Wearable Sleep and Circadian Data Predict Mood Episodes',
    takeaway:
      'Using wearable data from 168 patients, researchers achieved AUCs of 0.80, 0.98, and 0.95 for predicting depressive, manic, and hypomanic episodes respectively, with circadian phase shifts as the strongest predictors. Empath\'s wearable integration connects this exact type of sleep and activity data to mood patterns, giving therapists physiological context unavailable through conversation alone.',
    source: 'Park et al. — Translational Psychiatry',
    year: '2024',
    href: 'https://pubmed.ncbi.nlm.nih.gov/39557997/',
    icon: Activity,
  },
  {
    title: 'NLP Sentiment Analysis Validly Assesses Emotional Tone in Therapy',
    takeaway:
      'Using transformer-based NLP on therapy transcripts, researchers found that automated sentiment analysis validly assessed emotional tone, with sentiments significantly correlating with self- and therapist-reported emotions and predicting better outcomes. Empath uses similar AI pattern recognition on client journals and mood logs to surface emotional patterns therapists can act on.',
    source: 'Ewbank et al. — Psychotherapy Research',
    year: '2024',
    href: 'https://pubmed.ncbi.nlm.nih.gov/38415369/',
    icon: Brain,
  },
  {
    title: 'ML and NLP Effectively Extract Clinical Insights From Text',
    takeaway:
      'This systematic review of 58 studies found that ML and NLP can effectively extract symptoms, classify illness severity, and detect treatment response from clinical text — with applications in depression detection, suicide risk assessment, and outcome prediction. Empath applies these AI capabilities to client-generated data, making pattern detection accessible to everyday clinical practice.',
    source: 'Le Glaz et al. — J Medical Internet Research',
    year: '2021',
    href: 'https://pubmed.ncbi.nlm.nih.gov/33944788/',
    icon: Brain,
  },
  {
    title: 'Routine Outcome Monitoring Doubles Improvement for At-Risk Clients',
    takeaway:
      'Lambert et al. found that feeding back patient progress data to therapists reduced deterioration rates and nearly doubled clinically significant improvement for at-risk clients. Empath automates this feedback loop — continuously collecting client data and delivering AI-synthesized summaries so therapists arrive at every session already informed.',
    source: 'Lambert, Whipple & Kleinstäuber — Psychotherapy',
    year: '2018',
    href: 'https://pubmed.ncbi.nlm.nih.gov/30335463/',
    icon: LineChart,
  },
  {
    title: 'Measurement-Based Care Dramatically Improves Remission Rates',
    takeaway:
      'Patients receiving measurement-based care achieved dramatically higher response rates (86.9% vs 62.7%) and remission rates (73.8% vs 28.8%) compared to standard treatment for major depression. Empath enables continuous measurement-based care by providing therapists with ongoing, structured patient data rather than relying on periodic in-session check-ins alone.',
    source: 'Guo et al. — American J Psychiatry',
    year: '2015',
    href: 'https://pubmed.ncbi.nlm.nih.gov/26315978/',
    icon: Microscope,
  },
];

const sciencePillars = [
  {
    title: 'Between-Session Intelligence',
    description:
      'Research shows that up to 50% of therapy improvement happens between sessions (Tang & DeRubeis, 1999). Empath captures real-time journaling, mood, and health data so these critical moments are visible to therapists — not lost to recall bias or forgotten by the next appointment.',
    icon: LineChart,
  },
  {
    title: 'Alliance-First Design',
    description:
      'The therapeutic alliance is the single strongest predictor of treatment outcomes across all modalities (Flückiger et al., 2018). Every Empath feature is designed to strengthen — never replace — the human relationship at the center of effective therapy.',
    icon: Heart,
  },
  {
    title: 'AI Pattern Recognition',
    description:
      'NLP and ML can validly assess emotional tone, detect symptom patterns, and surface treatment-relevant insights from clinical text (Le Glaz et al., 2021). Empath applies these capabilities to client-generated data so therapists spend less time searching for patterns and more time acting on them.',
    icon: Brain,
  },
  {
    title: 'Clinician-in-the-Loop',
    description:
      'Guided digital interventions produce nearly double the effect size of unguided ones (Berger et al., 2011). Empath surfaces AI insights as suggestions for therapist review — never as autonomous clinical decisions. The therapist always makes the call.',
    icon: Shield,
  },
  {
    title: 'Measurement-Based Care',
    description:
      'Continuous outcome monitoring nearly doubles clinically significant improvement for at-risk clients (Lambert et al., 2018) and dramatically improves remission rates (Guo et al., 2015). Empath automates this feedback loop with structured, ongoing patient data collection.',
    icon: Microscope,
  },
  {
    title: 'Mind-Body Integration',
    description:
      'Wearable sleep and circadian data can predict mood episodes with AUCs above 0.80 (Park et al., 2024). Empath connects Apple Health data to journaling patterns so therapists see the physiological context behind emotional shifts — insights impossible to get from conversation alone.',
    icon: Activity,
  },
];

const researchRoadmap = [
  {
    title: 'Alliance Impact Measurement',
    description:
      'Measuring whether therapists with access to Empath\'s between-session data report stronger working alliance scores (WAI-SR) and whether clients feel more understood. We hypothesize that richer context leads to more attuned sessions and stronger therapeutic relationships.',
  },
  {
    title: 'Between-Session Capture & Sudden Gains',
    description:
      'Tracking whether Empath\'s real-time data capture helps therapists identify and leverage "sudden gains" — the large between-session improvements that account for up to 50% of total therapy benefit but are often missed without continuous monitoring.',
  },
  {
    title: 'Session Prep Efficiency',
    description:
      'Quantifying how AI-generated session summaries affect clinician prep time, session utilization, and treatment planning quality. Early pilot data focuses on whether therapists who review Empath summaries spend more session time on therapeutic work vs. information gathering.',
  },
  {
    title: 'Wearable-Mood Correlation Validation',
    description:
      'Validating the predictive relationship between Apple Health data (sleep, activity, heart rate) and self-reported mood in Empath\'s user population. We are testing whether physiological signals can reliably flag at-risk periods before clients or therapists notice them.',
  },
  {
    title: 'Journaling Dose-Response',
    description:
      'Analyzing whether a dose-response curve exists for guided journaling frequency and clinical outcomes. We are investigating which prompting strategies produce the most therapeutically useful reflections and what minimum engagement level drives measurable benefit.',
  },
  {
    title: 'Safety Signal Detection',
    description:
      'Developing and validating our approach to detecting risk signals in journal entries — including symptom escalation, crisis language, and disengagement patterns. Building transparent reporting protocols to document both benefits and any unintended effects.',
  },
];

const principles = [
  {
    icon: Heart,
    title: 'Alliance First',
    description:
      'Technology should strengthen the therapeutic relationship, never compete with it. Every feature is designed to give therapists better context so they can be more present, more attuned, and more effective — not to replace the human connection that drives lasting change.',
  },
  {
    icon: Users,
    title: 'Clinician in the Loop',
    description:
      'AI surfaces patterns and suggestions. The therapist always makes the clinical decision. Empath never delivers diagnoses, treatment plans, or crisis interventions autonomously — because guided interventions produce nearly double the effect size of unguided ones.',
  },
  {
    icon: Shield,
    title: 'Privacy by Default',
    description:
      'Client data is encrypted at rest and in transit, HIPAA-compliant, and never used for model training. Clients control what is shared with their therapist versus kept private. Therapists see only their own clients\' data.',
  },
];

export default function SciencePage() {
  useEffect(() => {
    document.title = 'Science & Research | Empath — Evidence-Based Therapy Technology';
    const description = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (description) {
      description.content =
        'Learn how Empath builds therapy technology grounded in peer-reviewed research on digital mental health, behavior change, and clinician-guided care.';
    }
  }, []);

  return (
    <div className="flex-grow">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="container mx-auto px-4 max-w-5xl py-16 md:py-24">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-4">
            Science &amp; Research
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6 leading-tight">
            Built on Evidence, Not Hype
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl">
            We design Empath around peer-reviewed findings in digital mental health,
            behavior change, and clinician-guided care — then validate outcomes in
            real-world practice.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              to="/blog"
              className="inline-flex items-center px-5 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors group"
            >
              Read the Blog
              <ChevronRight className="ml-1.5 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a
              href="mailto:karan@myempath.co?subject=Science%20and%20Research%20Inquiry"
              className="inline-flex items-center px-5 py-2.5 border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
            >
              Partner on Research
            </a>
          </div>
        </div>
      </div>

      {/* Core Principles */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4 max-w-5xl py-16">
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">
            Our Approach
          </h2>
          <p className="text-2xl md:text-3xl font-bold text-slate-900 mb-10">
            Three Principles That Guide Every Decision
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {principles.map((principle) => (
              <div
                key={principle.title}
                className="bg-white rounded-lg border border-slate-200 p-6"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center mb-4">
                  <principle.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {principle.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Evidence Sources */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 max-w-5xl py-16">
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">
            Peer-Reviewed Research
          </h2>
          <p className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            The Evidence Behind Our Features
          </p>
          <p className="text-slate-600 mb-10 max-w-2xl">
            Every product decision at Empath connects back to published clinical research.
            Here are {evidenceSources.length} peer-reviewed studies that inform our approach.
          </p>

          <div className="space-y-0 divide-y divide-slate-200 border-t border-slate-200">
            {evidenceSources.map((item, index) => (
              <div key={item.title} className="py-6 grid md:grid-cols-[auto,1fr,auto] gap-4 md:gap-6 items-start">
                <div className="flex items-center gap-3 md:w-32 flex-shrink-0">
                  <span className="text-sm font-mono text-slate-400">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-sm font-medium text-slate-500">{item.year}</span>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-900 mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-2">
                    {item.takeaway}
                  </p>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium"
                  >
                    {item.source}
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                  </a>
                </div>
                <div className="hidden md:flex w-9 h-9 rounded-lg bg-slate-100 items-center justify-center flex-shrink-0">
                  <item.icon className="w-4.5 h-4.5 text-slate-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How We Apply This */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4 max-w-5xl py-16">
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">
            From Research to Product
          </h2>
          <p className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            How We Apply This at Empath
          </p>
          <p className="text-slate-600 mb-10 max-w-2xl">
            Our approach blends behavioral data, clinical context, and human oversight so
            therapists get usable insight without losing the nuance of care.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {sciencePillars.map((pillar) => (
              <div
                key={pillar.title}
                className="bg-white rounded-lg border border-slate-200 p-6"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center mb-4">
                  <pillar.icon className="w-5 h-5 text-slate-700" />
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">
                  {pillar.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Research Roadmap */}
      <div className="bg-white">
        <div className="container mx-auto px-4 max-w-5xl py-16">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">
            <FlaskConical className="w-4 h-4" />
            Ongoing Research
          </div>
          <p className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            What We're Measuring Next
          </p>
          <p className="text-slate-600 mb-10 max-w-2xl">
            We're committed to transparency about what we know and what we're still
            learning. These are the studies we're actively running or designing.
          </p>

          <div className="space-y-0 divide-y divide-slate-200 border-t border-b border-slate-200">
            {researchRoadmap.map((item, index) => (
              <div key={item.title} className="py-5 flex items-start gap-4">
                <span className="text-sm font-mono text-slate-400 mt-0.5 w-6 flex-shrink-0">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-slate-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mt-10">
            <Link
              to="/blog"
              className="inline-flex items-center px-5 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors group"
            >
              Read the Blog
              <ChevronRight className="ml-1.5 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a
              href="mailto:karan@myempath.co?subject=Science%20and%20Research%20Inquiry"
              className="inline-flex items-center px-5 py-2.5 border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
            >
              Partner on Research
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
