import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CalendarDays, Check, Clock3, X } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import SEO from '../components/SEO';
import TherapistHeader from '../components/therapist/TherapistHeader';
import TherapistFooter from '../components/therapist/TherapistFooter';
import DemoRequestForm, { DEMO_CHAT_PREFILL } from '../components/therapist/DemoRequestForm';
import { openSupportChat } from '../utils/supportChat';
import posthog from 'posthog-js';

function toAnchorId(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

// Shared type styles, matching the home page and /therapist.
const EYEBROW = 'text-xs font-semibold uppercase tracking-[0.18em] text-[#1b8af1]';
const RAIL_LABEL = 'text-xs font-semibold uppercase tracking-[0.18em] text-stone-400';

export default function BlogPostPage() {
  const { slug } = useParams();
  const [copied, setCopied] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const post = blogPosts.find((entry) => entry.slug === slug);

  const articleUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/blog/${slug ?? ''}`
      : `https://myempath.co/blog/${slug ?? ''}`;
  const twitterShare = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    articleUrl
  )}&text=${encodeURIComponent(post?.title ?? 'Empath Blog')}`;
  const linkedInShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    articleUrl
  )}`;

  const sectionsWithId = useMemo(() => {
    if (!post) return [];
    return post.sections.map((section) => ({
      ...section,
      id: toAnchorId(section.heading),
    }));
  }, [post]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post, slug]);

  const schemas = useMemo(() => {
    if (!post) return { article: null, faq: null };
    const origin =
      typeof window !== 'undefined' ? window.location.origin : 'https://myempath.co';
    const parsedDate = Date.parse(post.date);
    const publishDate = Number.isNaN(parsedDate) ? post.date : new Date(parsedDate).toISOString();
    const article = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.seoTitle,
      description: post.metaDescription,
      datePublished: publishDate,
      author: { '@type': 'Organization', name: post.author },
      mainEntityOfPage: `${origin}/blog/${post.slug}`,
      keywords: [post.keyword, post.category, 'mental health'],
    };
    const faq = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: post.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    };
    return { article, faq };
  }, [post]);

  const keyTakeaways = useMemo(() => {
    if (!post) return [];
    return [
      `${post.keyword} works best when you keep entries short and consistent.`,
      'Bring 1 to 2 clear patterns into therapy so your session gets focused faster.',
      'Use self-reflection tools as support, then validate decisions with your therapist.',
    ];
  }, [post]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  if (!post) {
    return (
      <div className="flex-grow bg-[#FAF9F6] text-stone-900 font-sans">
        <SEO
          title="Article Not Found | Empath Blog"
          description="This article may have moved or is still being prepared."
          path={`/blog/${slug ?? ''}`}
          noIndex
        />
        <TherapistHeader />
        <div className="container mx-auto px-4 max-w-2xl text-center py-28">
          <h1 className="font-serif text-3xl font-medium tracking-tight text-stone-900 mb-3">Article not found</h1>
          <p className="text-stone-600 mb-8">
            This article may have moved or is still being prepared.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center px-6 py-3 rounded-full bg-stone-900 text-white hover:bg-[#1b8af1] transition-colors text-sm font-semibold"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to blog
          </Link>
        </div>
        <TherapistFooter />
      </div>
    );
  }

  return (
    <div className="flex-grow bg-[#FAF9F6] text-stone-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <SEO
        title={post.seoTitle}
        description={post.metaDescription}
        path={`/blog/${post.slug}`}
        ogType="article"
        keywords={[post.keyword, post.category, 'mental health'].join(', ')}
      />
      {schemas.article && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.article) }}
        />
      )}
      {schemas.faq && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }}
        />
      )}
      {/* Demo request modal: same form as /therapist */}
      {showCalendar && (
        <div
          className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="calendar-modal-title"
        >
          <div className="bg-white rounded-3xl border border-stone-200 shadow-lift p-6 md:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 id="calendar-modal-title" className="text-2xl font-medium text-stone-900 font-serif">Get a 15-minute demo</h2>
              <button
                type="button"
                onClick={() => setShowCalendar(false)}
                className="text-stone-400 hover:text-stone-900 rounded-full p-2 transition-colors cursor-pointer"
                aria-label="Close demo request"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <DemoRequestForm
              source="therapist_blog"
              onChat={() => {
                posthog.capture('therapist_demo_chat_clicked');
                setShowCalendar(false);
                openSupportChat(DEMO_CHAT_PREFILL);
              }}
            />
          </div>
        </div>
      )}

      <TherapistHeader />

      <div className="container mx-auto px-4 pt-12 pb-24 md:pt-16">
        <div className="relative">
          {/* One reading column: back link, title, intro and body share a left edge. */}
          <article className="mx-auto max-w-2xl">
            <Link
              to="/blog"
              className="inline-flex items-center text-sm text-stone-500 hover:text-stone-900 font-medium mb-10 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
              All articles
            </Link>

            <header>
              <p className={EYEBROW}>{post.category}</p>
              <h1 className="mt-4 font-serif text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] text-stone-900">
                {post.title}
              </h1>
              <p className="mt-6 text-xl text-stone-600 leading-relaxed">{post.excerpt}</p>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-stone-500">
                <span className="font-medium text-stone-700">{post.author}</span>
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="w-3.5 h-3.5" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock3 className="w-3.5 h-3.5" />
                  {post.readTime}
                </span>
              </div>
            </header>

            {/* Intro */}
            <p className="mt-12 border-t border-stone-200 pt-10 text-[1.125rem] leading-[1.8] text-stone-700">
              {post.intro}
            </p>

            {/* Table of contents below xl; the sticky rail takes over on wide screens */}
            <nav className="mt-10 border-t border-stone-200 pt-6 xl:hidden" aria-label="In this article">
              <p className={RAIL_LABEL}>In this article</p>
              <ul className="mt-4 space-y-2.5 text-stone-600">
                {sectionsWithId.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className="hover:text-[#1b8af1] transition-colors leading-snug">
                      {section.heading}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#faq" className="hover:text-[#1b8af1] transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </nav>

            {/* Key takeaways: between hairlines, no card */}
            <section className="mt-10 border-y border-stone-200 py-8">
              <h2 className={RAIL_LABEL}>What you'll learn</h2>
              <ul className="mt-5 space-y-3.5">
                {keyTakeaways.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-stone-700 leading-relaxed">
                    <Check className="w-4 h-4 text-[#1b8af1] mt-1.5 flex-shrink-0" strokeWidth={2.5} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Sections */}
            {sectionsWithId.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="font-serif text-3xl font-medium tracking-tight mt-14 mb-5 text-stone-900">
                  {section.heading}
                </h2>
                <div className="space-y-6 text-[1.125rem] leading-[1.8] text-stone-700">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}

            {/* FAQ: divided list */}
            <section id="faq" className="mt-16 border-t border-stone-200 pt-12 scroll-mt-28">
              <h2 className="font-serif text-3xl font-medium tracking-tight text-stone-900">
                Frequently asked questions
              </h2>
              <div className="mt-6 divide-y divide-stone-200">
                {post.faq.map((item) => (
                  <div key={item.question} className="py-6">
                    <h3 className="font-serif text-xl font-medium text-stone-900">{item.question}</h3>
                    <p className="mt-3 text-stone-700 leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* The one CTA on the page */}
            <section className="mt-14 rounded-3xl bg-stone-900 px-8 py-12 text-center text-white md:px-12">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">Empath for Therapists</p>
              <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight leading-[1.15]">
                Bring AI memory and pattern insight into every session
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-stone-300 leading-relaxed">
                Empath surfaces client trends between sessions so you can spend less time catching up and
                more time delivering high-impact care.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
                <button
                  type="button"
                  onClick={() => setShowCalendar(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-stone-900 transition-colors hover:bg-stone-100"
                >
                  Book a 15-Min Demo <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="https://app.empathdash.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-stone-300 transition-colors hover:text-white"
                >
                  Sign in
                </a>
              </div>
            </section>

            {/* Share + onward links */}
            <footer className="mt-12 border-t border-stone-200 pt-8">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                <span className={RAIL_LABEL}>Share</span>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="font-medium text-stone-600 transition-colors hover:text-stone-900"
                >
                  {copied ? 'Copied!' : 'Copy link'}
                </button>
                <a
                  href={twitterShare}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-stone-600 transition-colors hover:text-stone-900"
                >
                  X
                </a>
                <a
                  href={linkedInShare}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-stone-600 transition-colors hover:text-stone-900"
                >
                  LinkedIn
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium">
                <Link to="/blog" className="inline-flex items-center gap-1.5 text-stone-700 transition-colors hover:text-[#1b8af1]">
                  Browse more articles <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link to="/science" className="inline-flex items-center gap-1.5 text-stone-700 transition-colors hover:text-[#1b8af1]">
                  Visit science page <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <p className="mt-8 text-xs text-stone-500 leading-relaxed">
                Medical note: This article is educational and not a substitute for
                professional diagnosis or treatment.
              </p>
            </footer>
          </article>

          {/* Sticky contents rail in the right margin (xl and up). Plain text, no card. */}
          <aside className="absolute inset-y-0 left-[calc(50%+24rem)] hidden w-56 xl:block" aria-label="In this article">
            <nav className="sticky top-28 border-l border-stone-200 pl-5">
              <p className={RAIL_LABEL}>In this article</p>
              <ul className="mt-4 space-y-2.5 text-sm text-stone-500">
                {sectionsWithId.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className="block leading-snug hover:text-stone-900 transition-colors">
                      {section.heading}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#faq" className="block hover:text-stone-900 transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </nav>
          </aside>
        </div>
      </div>

      <TherapistFooter />
    </div>
  );
}
