import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CheckCircle,
  Clock3,
  Copy,
  ExternalLink,
  Sparkles,
  Phone,
  MessageSquare,
} from 'lucide-react';
import { journalingBlogPosts } from '../data/journalingBlogPosts';
import logo from '../../public/empath-logo.png';
import posthog from 'posthog-js';

function toAnchorId(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function getCategoryColor(category: string) {
  const styles: Record<string, { bg: string; text: string; border: string; shadow: string }> = {
    'App Reviews': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-900', shadow: '#1b8af1' },
    'Getting Started': { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-900', shadow: '#16a34a' },
    'Science & Research': { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-900', shadow: '#9333ea' },
    'Habits & Routines': { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-900', shadow: '#f59e0b' },
    'AI & Technology': { bg: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-900', shadow: '#6366f1' },
    'Mental Wellness': { bg: 'bg-rose-100', text: 'text-rose-800', border: 'border-rose-900', shadow: '#e11d48' },
  };
  return styles[category] ?? { bg: 'bg-stone-100', text: 'text-stone-800', border: 'border-stone-900', shadow: '#1c1917' };
}

function MarketingCard({ compact = false }: { compact?: boolean }) {
  const APP_STORE_URL = 'https://apps.apple.com/us/app/myempath/id6472873287';
  const PHONE_MAIN = '+18883663082';
  const WEB_APP_URL = 'https://www.empathdash.com/atman/';
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div
      className={`bg-white rounded-xl border-2 border-stone-900 shadow-[6px_6px_0px_0px_#1b8af1] ${
        compact ? 'p-5' : 'p-6 md:p-8'
      }`}
    >
      <div className="inline-flex items-center gap-2 text-[#1b8af1] text-xs font-bold uppercase tracking-wider mb-3">
        <Sparkles className="w-4 h-4" /> Try Empath Free
      </div>
      <h3 className={`${compact ? 'text-lg' : 'text-xl'} font-black text-stone-900 mb-2 font-serif`}>
        Your AI Journaling Assistant
      </h3>
      <p className="text-stone-600 text-sm leading-relaxed mb-4 font-medium">
        Call, text, or type your thoughts. Empath captures everything and helps you understand
        yourself better over time.
      </p>
      {isMobile ? (
        <div className="space-y-2.5">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => posthog.capture('journaling_blog_post_app_store_clicked')}
            className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-stone-900 text-white text-sm font-bold border-2 border-stone-900 hover:bg-[#1b8af1] transition-all shadow-[3px_3px_0px_0px_#1b8af1] hover:shadow-[2px_2px_0px_0px_#1b8af1] gap-1.5"
          >
            Download on App Store <ArrowUpRight className="w-4 h-4" />
          </a>
          <div className="grid grid-cols-2 gap-2.5">
            <a
              href={`tel:${PHONE_MAIN}`}
              onClick={() => posthog.capture('journaling_blog_post_call_clicked')}
              className="inline-flex items-center justify-center px-3 py-2.5 rounded-lg border-2 border-stone-200 text-stone-700 text-sm font-bold hover:border-stone-900 transition-colors gap-1.5"
            >
              <Phone className="w-4 h-4" /> Call
            </a>
            <a
              href={`sms:${PHONE_MAIN}`}
              onClick={() => posthog.capture('journaling_blog_post_text_clicked')}
              className="inline-flex items-center justify-center px-3 py-2.5 rounded-lg border-2 border-stone-200 text-stone-700 text-sm font-bold hover:border-stone-900 transition-colors gap-1.5"
            >
              <MessageSquare className="w-4 h-4" /> Text
            </a>
          </div>
          <p className="text-xs text-stone-500 font-medium">
            Free to download. Call or text to start journaling right away.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <a
            href={WEB_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => posthog.capture('journaling_blog_post_web_app_clicked')}
            className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-stone-900 text-white text-sm font-bold border-2 border-stone-900 hover:bg-[#1b8af1] transition-all shadow-[3px_3px_0px_0px_#1b8af1] hover:shadow-[2px_2px_0px_0px_#1b8af1] gap-1.5"
          >
            Open Web Dashboard <ArrowUpRight className="w-4 h-4" />
          </a>
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => posthog.capture('journaling_blog_post_app_store_clicked')}
            className="inline-flex items-center px-4 py-2.5 rounded-lg border-2 border-stone-200 text-stone-700 text-sm font-bold hover:border-stone-900 transition-colors gap-1.5"
          >
            Download iOS App <ArrowUpRight className="w-4 h-4" />
          </a>
          <div className="rounded-lg border border-stone-200 bg-stone-50 px-3.5 py-3">
            <p className="text-xs uppercase tracking-wide text-stone-500 font-bold mb-1">
              Prefer phone?
            </p>
            <p className="text-sm font-bold text-stone-900">{PHONE_MAIN}</p>
            <p className="text-xs text-stone-600 font-medium">
              Text or call this number to start journaling without downloading the app.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function JournalingBlogPostPage() {
  const { slug } = useParams();
  const [copied, setCopied] = useState(false);
  const post = journalingBlogPosts.find((entry) => entry.slug === slug);
  const APP_STORE_URL = 'https://apps.apple.com/us/app/myempath/id6472873287';

  const articleUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/app/blog/${slug ?? ''}`
      : `https://myempath.co/app/blog/${slug ?? ''}`;
  const twitterShare = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    articleUrl
  )}&text=${encodeURIComponent(post?.title ?? 'Empath Journaling Blog')}`;
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
    if (!post) {
      document.title = 'Article Not Found | Empath Journaling Blog';
      return;
    }
    document.title = post.seoTitle;
    const description = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement | null;
    if (description) {
      description.content = post.metaDescription;
    }
  }, [post, slug]);

  const schemas = useMemo(() => {
    if (!post) return { article: null, faq: null };
    const origin =
      typeof window !== 'undefined' ? window.location.origin : 'https://myempath.co';
    const article = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.seoTitle,
      description: post.metaDescription,
      datePublished: post.date,
      author: { '@type': 'Organization', name: post.author },
      mainEntityOfPage: `${origin}/app/blog/${post.slug}`,
      keywords: [post.keyword, post.category, 'journaling'],
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

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const handleAppStoreClick = () => {
    posthog.capture('journaling_blog_post_app_store_clicked');
    window.open(APP_STORE_URL, '_blank', 'noopener,noreferrer');
  };

  // Related posts (same category, excluding current)
  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return journalingBlogPosts
      .filter((p) => p.id !== post.id)
      .slice(0, 3);
  }, [post]);

  if (!post) {
    return (
      <div className="flex-grow bg-[#FAF9F6] text-stone-900 font-sans pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-xl border-2 border-stone-900 shadow-[8px_8px_0px_0px_rgba(28,25,23,1)] p-12 text-center">
            <h1 className="text-3xl font-black text-stone-900 mb-4 font-serif">
              Article not found
            </h1>
            <p className="text-stone-600 mb-8 text-lg font-medium">
              This article may have moved or is still being prepared.
            </p>
            <Link
              to="/app/blog"
              className="inline-flex items-center px-6 py-3 bg-stone-900 text-white rounded-xl font-bold border-2 border-stone-900 shadow-[4px_4px_0px_0px_#1b8af1] hover:bg-[#1b8af1] transition-all gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back to blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const colors = getCategoryColor(post.category);

  return (
    <div className="flex-grow bg-[#FAF9F6] text-stone-900 font-sans selection:bg-blue-200 selection:text-blue-900">
      {/* Noise Texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
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

      {/* Header */}
      <div className="bg-[#FAF9F6]/90 backdrop-blur-sm border-b-2 border-stone-200 py-4 sticky top-0 z-40">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/app" className="flex items-center gap-0">
            <div className="w-10 h-10 flex items-center justify-center">
              <img src={logo} alt="Empath Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-stone-900 tracking-tight hidden sm:block text-lg">Empath</span>
          </Link>
          <nav className="flex items-center gap-8">
            <Link
              to="/app#features"
              className="text-sm font-bold text-stone-600 hover:text-[#1b8af1] transition-colors hidden md:block"
            >
              Features
            </Link>
            <Link
              to="/app#how-it-works"
              className="text-sm font-bold text-stone-600 hover:text-[#1b8af1] transition-colors hidden md:block"
            >
              How It Works
            </Link>
            <Link
              to="/app#faq"
              className="text-sm font-bold text-stone-600 hover:text-[#1b8af1] transition-colors hidden md:block"
            >
              FAQ
            </Link>
            <Link
              to="/app/blog"
              className="text-sm font-bold text-stone-600 hover:text-[#1b8af1] transition-colors hidden md:block"
            >
              Blog
            </Link>
            <button
              onClick={handleAppStoreClick}
              className="px-4 py-2 bg-stone-900 text-white rounded-lg font-bold text-sm hover:bg-[#1b8af1] transition-colors border-2 border-stone-900"
            >
              Download
            </button>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <div className="pt-12 pb-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            to="/app/blog"
            className="inline-flex items-center text-[#1b8af1] hover:text-stone-900 font-bold mb-8 transition-colors gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" /> Back to all articles
          </Link>

          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span
              className={`inline-flex px-3 py-1 rounded-lg text-xs font-bold border-2 mb-5 ${colors.bg} ${colors.text} ${colors.border}`}
              style={{ boxShadow: `3px 3px 0px 0px ${colors.shadow}` }}
            >
              {post.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-stone-900 mb-5 leading-tight font-serif">
              {post.title}
            </h1>
            <p className="text-lg md:text-xl text-stone-600 leading-relaxed mb-6 font-medium">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-stone-500 font-medium">
              <span className="font-bold text-stone-700">{post.author}</span>
              <span className="flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4" /> {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock3 className="w-4 h-4" /> {post.readTime}
              </span>
            </div>
          </motion.header>
        </div>
      </div>

      {/* Article Body */}
      <div className="pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr),280px]">
            {/* Main Content */}
            <article className="order-1">
              <div className="space-y-10">
                <section className="bg-white rounded-xl border-2 border-stone-200 p-6 md:p-8">
                  <p className="text-stone-700 leading-8 text-lg font-medium">{post.intro}</p>
                </section>

                {/* Key Takeaways */}
                <section className="bg-white rounded-xl border-2 border-stone-900 shadow-[6px_6px_0px_0px_rgba(28,25,23,1)] p-6">
                  <h2 className="text-lg font-black text-stone-900 mb-4 font-serif">
                    What you'll learn
                  </h2>
                  <ul className="space-y-3">
                    {post.sections.slice(0, 3).map((section) => (
                      <li key={section.heading} className="flex items-start gap-3 text-stone-700 font-medium">
                        <CheckCircle className="w-5 h-5 text-[#1b8af1] mt-0.5 flex-shrink-0" />
                        <span>{section.heading}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {sectionsWithId.map((section, index) => (
                  <section key={section.id} id={section.id} className="scroll-mt-28">
                    <h2 className="text-2xl md:text-3xl font-black text-stone-900 mb-4 font-serif">
                      {section.heading}
                    </h2>
                    <div className="space-y-4 text-stone-700 leading-8 text-lg font-medium">
                      {section.body.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>

                    {index === 1 && (
                      <div className="mt-8">
                        <MarketingCard />
                      </div>
                    )}
                  </section>
                ))}

                {/* FAQ */}
                <section id="faq" className="pt-8 border-t-2 border-stone-200 scroll-mt-28">
                  <h2 className="text-2xl font-black text-stone-900 mb-6 font-serif">
                    Frequently asked questions
                  </h2>
                  <div className="space-y-4">
                    {post.faq.map((item) => (
                      <div
                        key={item.question}
                        className="bg-white rounded-xl border-2 border-stone-200 p-5 hover:border-stone-900 hover:shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] transition-all"
                      >
                        <h3 className="text-lg font-bold text-stone-900 mb-2">{item.question}</h3>
                        <p className="text-stone-700 leading-7 font-medium">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Bottom CTA */}
                <section className="pt-8 border-t-2 border-stone-200">
                  <MarketingCard />
                </section>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <section className="pt-8 border-t-2 border-stone-200">
                    <h2 className="text-2xl font-black text-stone-900 mb-6 font-serif">
                      Keep reading
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {relatedPosts.map((related) => {
                        const relatedColors = getCategoryColor(related.category);
                        return (
                          <Link
                            key={related.id}
                            to={`/app/blog/${related.slug}`}
                            className="bg-white rounded-xl border-2 border-stone-200 p-5 hover:border-stone-900 hover:shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] transition-all group"
                          >
                            <span
                              className={`inline-flex px-2.5 py-0.5 rounded-lg text-xs font-bold border-2 mb-3 ${relatedColors.bg} ${relatedColors.text} ${relatedColors.border}`}
                            >
                              {related.category}
                            </span>
                            <h3 className="text-base font-bold text-stone-900 leading-snug mb-2 group-hover:text-[#1b8af1] transition-colors font-serif">
                              {related.title}
                            </h3>
                            <p className="text-sm text-stone-500 font-medium">{related.readTime}</p>
                          </Link>
                        );
                      })}
                    </div>
                  </section>
                )}

                {/* Footer Links */}
                <section className="pt-8 border-t-2 border-stone-200">
                  <p className="text-sm text-stone-500 mb-6 font-medium">
                    Disclaimer: This article is for educational purposes and is not a substitute for
                    professional mental health advice.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      to="/app/blog"
                      className="inline-flex items-center px-5 py-2.5 rounded-lg border-2 border-stone-200 text-stone-800 hover:border-stone-900 hover:shadow-[3px_3px_0px_0px_rgba(28,25,23,1)] transition-all font-bold"
                    >
                      Browse more articles
                    </Link>
                    <Link
                      to="/app"
                      className="inline-flex items-center px-5 py-2.5 rounded-lg bg-stone-900 text-white border-2 border-stone-900 hover:bg-[#1b8af1] transition-all font-bold gap-1.5"
                    >
                      Learn about Empath <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </section>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="order-2 space-y-5 lg:sticky lg:top-28 lg:self-start">
              <MarketingCard compact />

              {/* Table of Contents */}
              <div className="bg-white rounded-xl border-2 border-stone-200 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-4">
                  In this article
                </p>
                <ul className="space-y-2.5 text-sm text-stone-600 font-medium">
                  {sectionsWithId.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="hover:text-[#1b8af1] transition-colors block py-0.5"
                      >
                        {section.heading}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a href="#faq" className="hover:text-[#1b8af1] transition-colors block py-0.5">
                      Frequently asked questions
                    </a>
                  </li>
                </ul>
              </div>

              {/* Share */}
              <div className="bg-white rounded-xl border-2 border-stone-200 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-4">
                  Share
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg border-2 border-stone-200 text-xs text-stone-700 font-bold hover:border-stone-900 hover:shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] transition-all"
                  >
                    <Copy className="w-3.5 h-3.5 mr-1.5" />
                    {copied ? 'Copied!' : 'Copy link'}
                  </button>
                  <a
                    href={twitterShare}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1.5 rounded-lg border-2 border-stone-200 text-xs text-stone-700 font-bold hover:border-stone-900 hover:shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] transition-all"
                  >
                    X <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                  </a>
                  <a
                    href={linkedInShare}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1.5 rounded-lg border-2 border-stone-200 text-xs text-stone-700 font-bold hover:border-stone-900 hover:shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] transition-all"
                  >
                    LinkedIn <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
