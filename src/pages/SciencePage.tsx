import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  ArrowUpRight,
  Brain,
  ChevronRight,
  FlaskConical,
  LineChart,
  Lock,
  Microscope,
  Shield,
  BookOpen,
  Users,
  Beaker,
} from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

interface AnimatedSectionProps {
  children: React.ReactNode;
  className: string;
  delay?: number;
}

const AnimatedSection = ({ children, className, delay = 0 }: AnimatedSectionProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { delay, duration: 0.6, ease: 'easeOut' },
        },
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

const evidenceSources = [
  {
    title: 'Digital Mental Health Improves Outcomes',
    takeaway:
      'Meta-analyses suggest digital and app-supported interventions can produce meaningful improvements for common mental health symptoms.',
    source: 'Firth et al., World Psychiatry',
    year: '2017',
    href: 'https://pubmed.ncbi.nlm.nih.gov/28127929/',
    icon: BookOpen,
  },
  {
    title: 'Guided Digital Interventions Show Stronger Effects',
    takeaway:
      'Evidence indicates outcomes are typically stronger when digital tools are paired with clinician guidance and accountability.',
    source: 'Linardon et al., World Psychiatry',
    year: '2019',
    href: 'https://pubmed.ncbi.nlm.nih.gov/30600604/',
    icon: Users,
  },
  {
    title: 'Journaling + Reflection Supports Emotional Processing',
    takeaway:
      'Structured expressive writing and reflection are associated with better emotional processing and reduced symptom burden for many users.',
    source: 'Smyth, Journal of Clinical Psychology',
    year: '1998',
    href: 'https://pubmed.ncbi.nlm.nih.gov/9631344/',
    icon: Beaker,
  },
];

const sciencePillars = [
  {
    title: 'Continuous Signal Capture',
    description:
      'We combine session context with between-session journaling to reduce recall gaps and surface trends over time.',
    icon: Brain,
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    title: 'Pattern-Finding Models',
    description:
      'AI-assisted analysis organizes themes, detects trajectories, and helps clinicians prioritize what to explore next.',
    icon: LineChart,
    gradient: 'from-indigo-500 to-indigo-600',
  },
  {
    title: 'Clinical Safeguards',
    description:
      'Product decisions are guided by therapist feedback loops, privacy-first defaults, and clear boundaries around model use.',
    icon: Lock,
    gradient: 'from-purple-500 to-purple-600',
  },
];

const researchRoadmap = [
  {
    title: 'Outcome Tracking',
    description: 'Measuring symptom severity, attendance consistency, and therapeutic alliance strength.',
  },
  {
    title: 'Therapist Workflow Studies',
    description: 'Focused on prep time reduction and treatment planning quality improvements.',
  },
  {
    title: 'Subgroup Analyses',
    description: 'Identifying who benefits most from specific guidance and journaling patterns.',
  },
];

const principles = [
  {
    icon: Shield,
    title: 'Privacy by Default',
    description: 'Client data is encrypted, access-controlled, and never used for model training without explicit consent.',
  },
  {
    icon: Users,
    title: 'Clinician in the Loop',
    description: 'AI surfaces patterns and suggestions. The therapist always makes the clinical decision.',
  },
  {
    icon: Microscope,
    title: 'Evidence Over Hype',
    description: 'Every feature maps to peer-reviewed research. We publish what works and what doesn\'t.',
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
    <div className="flex-grow overflow-x-hidden">
      {/* Hero */}
      <AnimatedSection className="bg-gradient-to-b from-slate-50 via-gray-50 to-white py-32 relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="w-96 h-96 bg-blue-100/30 rounded-full absolute -top-20 -left-20 blur-3xl" />
          <div className="w-96 h-96 bg-indigo-100/25 rounded-full absolute top-40 -right-20 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.p
                className="text-lg md:text-xl text-slate-500 font-light mb-6 tracking-wide uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Science at Empath
              </motion.p>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-10 leading-tight">
                <motion.div
                  className="relative mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="text-slate-900 font-bold tracking-tight">
                    Built on Evidence,
                  </span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="text-slate-600 font-light tracking-tight text-3xl sm:text-4xl md:text-5xl">
                    Not Hype
                  </span>
                </motion.div>
              </h1>

              <motion.p
                className="text-xl sm:text-2xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                We design Empath around{' '}
                <span className="text-slate-900 font-medium">peer-reviewed findings</span> in
                digital mental health, behavior change, and clinician-guided care — then validate
                outcomes in real-world practice.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row justify-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <Link
                  to="/blog"
                  className="px-8 py-4 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center group font-light tracking-wide"
                >
                  Read the Research Blog
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="mailto:karan@myempath.co?subject=Science%20and%20Research%20Inquiry"
                  className="px-8 py-4 bg-white text-slate-900 rounded-lg border-2 border-slate-900 hover:bg-slate-50 transition-all duration-300 flex items-center justify-center group font-medium tracking-wide"
                >
                  Partner on Research
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Core Principles */}
      <AnimatedSection className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div variants={fadeIn} className="text-center mb-16">
              <p className="text-lg text-slate-500 font-light mb-4 tracking-wide uppercase">
                Our Approach
              </p>
              <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-6">
                Three Principles That Guide Every Decision
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {principles.map((principle, index) => (
                <motion.div
                  key={principle.title}
                  className="bg-white rounded-xl p-8 shadow-lg border border-slate-200 relative overflow-hidden group hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/50 to-transparent rounded-full blur-2xl" />
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-6 shadow-lg">
                      <principle.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">
                      {principle.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">{principle.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Evidence Snapshot */}
      <AnimatedSection className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div variants={fadeIn} className="text-center mb-16">
              <p className="text-lg text-slate-500 font-light mb-4 tracking-wide uppercase">
                Peer-Reviewed Research
              </p>
              <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-6">
                The Evidence Behind Our Features
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed">
                Every product decision at Empath connects back to published clinical research.
                Here's a snapshot of the literature that informs our approach.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {evidenceSources.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  className="group bg-white rounded-xl p-8 shadow-lg border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-100/40 to-transparent rounded-full blur-2xl" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow">
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm font-medium text-indigo-600 tracking-wide">
                        {item.year}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed mb-6">{item.takeaway}</p>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
                    >
                      {item.source} <ArrowUpRight className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* How We Apply This */}
      <AnimatedSection className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div variants={fadeIn} className="text-center mb-16">
              <p className="text-lg text-slate-500 font-light mb-4 tracking-wide uppercase">
                From Research to Product
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                How We Apply This at Empath
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed">
                Our approach blends behavioral data, clinical context, and human oversight so
                therapists get{' '}
                <span className="text-slate-900 font-medium">usable insight</span> without
                losing the nuance of care.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {sciencePillars.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="bg-white rounded-xl p-8 shadow-lg border border-slate-200 relative overflow-hidden group hover:shadow-xl transition-all duration-300"
                  whileHover={{ y: -4 }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-slate-100/50 to-transparent rounded-full blur-2xl" />
                  <div className="relative z-10">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${pillar.gradient} flex items-center justify-center mb-6 shadow-lg`}
                    >
                      <pillar.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">{pillar.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{pillar.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Research Roadmap */}
      <AnimatedSection className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 md:p-12 shadow-xl border border-slate-700 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 text-blue-300 text-sm font-medium mb-5 tracking-wide uppercase">
                  <FlaskConical className="w-4 h-4" />
                  Ongoing Research Roadmap
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                  What We're Measuring Next
                </h2>
                <p className="text-slate-300 text-lg font-light leading-relaxed mb-10 max-w-2xl">
                  We're committed to transparency about what we know and what we're still
                  learning. These are the studies we're actively running or designing.
                </p>

                <div className="space-y-6">
                  {researchRoadmap.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                      className="flex items-start gap-5"
                    >
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center font-bold text-lg flex-shrink-0 mt-0.5 border border-blue-500/30">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                        <p className="text-slate-300 leading-relaxed">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-12 flex flex-wrap gap-4">
                  <Link
                    to="/blog"
                    className="px-6 py-3 bg-white text-slate-900 rounded-lg font-medium hover:bg-slate-100 transition-all duration-300 flex items-center group"
                  >
                    Read the Blog
                    <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <a
                    href="mailto:karan@myempath.co?subject=Science%20and%20Research%20Inquiry"
                    className="px-6 py-3 border border-white/30 text-white rounded-lg hover:bg-white/10 transition-all duration-300 flex items-center group"
                  >
                    Partner on Research
                    <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
