import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Copy,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

function toAnchorId(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

interface MarketingCardProps {
  compact?: boolean;
}

function MarketingCard({ compact = false }: MarketingCardProps) {
  return (
    <div
      className={`rounded-xl border border-blue-200 bg-gradient-to-b from-blue-50 to-white shadow-sm ${
        compact ? 'p-5' : 'p-6'
      }`}
    >
      <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-blue-700 mb-2">
        <Sparkles className="w-3.5 h-3.5" />
        Try Empath Free
      </p>
      <h3
        className={`${compact ? 'text-lg' : 'text-xl'} font-semibold text-slate-900 mb-2`}
      >
        Turn journaling into therapy-ready insights
      </h3>
      <p className="text-slate-600 text-sm leading-6 mb-4">
        Capture reflections, track patterns, and prepare better for every therapy session.
      </p>
      <div className="flex flex-wrap gap-2.5">
        <a
          href="https://app.empathdash.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium hover:shadow-md hover:shadow-blue-200 transition-all"
        >
          Try it free <ArrowUpRight className="w-4 h-4 ml-1.5" />
        </a>
        <a
          href="https://app.empathdash.com/login"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm hover:bg-slate-50 transition-colors"
        >
          Sign in
        </a>
      </div>
    </div>
  );
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const [copied, setCopied] = useState(false);
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
    if (!post) {
      return [];
    }
    return post.sections.map((section) => ({
      ...section,
      id: toAnchorId(section.heading),
    }));
  }, [post]);

  useEffect(() => {
    if (!post) {
      document.title = 'Article Not Found | Empath Blog';
      return;
    }
    document.title = post.seoTitle;
    const description = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement | null;
    if (description) {
      description.content = post.metaDescription;
    }
  }, [post]);

  const schemas = useMemo(() => {
    if (!post) {
      return { article: null, faq: null };
    }
    const origin =
      typeof window !== 'undefined'
        ? window.location.origin
        : 'https://myempath.co';
    const parsedDate = Date.parse(post.date);
    const publishDate = Number.isNaN(parsedDate)
      ? post.date
      : new Date(parsedDate).toISOString();
    const article = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.seoTitle,
      description: post.metaDescription,
      datePublished: publishDate,
      author: {
        '@type': 'Organization',
        name: post.author,
      },
      mainEntityOfPage: `${origin}/blog/${post.slug}`,
      keywords: [post.keyword, post.category, 'mental health'],
    };
    const faq = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: post.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    };
    return { article, faq };
  }, [post]);

  const keyTakeaways = useMemo(() => {
    if (!post) {
      return [];
    }
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
      <div className="flex-grow bg-gradient-to-b from-slate-50 via-gray-50 to-white pt-32 pb-20 relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="w-96 h-96 bg-blue-100/20 rounded-full absolute -top-20 -left-20 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto rounded-xl bg-white border border-slate-200 p-12 text-center shadow-lg">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
              Article not found
            </h1>
            <p className="text-slate-600 mb-8 text-lg">
              This article may have moved or is still being prepared.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-all font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow overflow-x-hidden">
      {schemas.article ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.article) }}
        />
      ) : null}
      {schemas.faq ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }}
        />
      ) : null}

      {/* Article Header */}
      <div className="bg-gradient-to-b from-slate-50 via-gray-50 to-white pt-28 pb-12 relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="w-96 h-96 bg-blue-100/20 rounded-full absolute -top-20 -left-20 blur-3xl" />
          <div className="w-96 h-96 bg-indigo-100/15 rounded-full absolute top-20 -right-20 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
        </div>
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <Link
            to="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to all articles
          </Link>

          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span
              className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border mb-5 ${getCategoryBadgeColor(
                post.category
              )}`}
            >
              {post.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-5 leading-tight">
              {post.title}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-6 font-light">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <span className="font-medium text-slate-700">{post.author}</span>
              <span className="flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock3 className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>
          </motion.header>
        </div>
      </div>

      {/* Article Body */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr),280px]">
            {/* Main Content */}
            <article className="order-1">
              <div className="space-y-10">
                <section>
                  <p className="text-slate-700 leading-8 text-lg">{post.intro}</p>
                </section>

                <section className="rounded-xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-6 shadow-sm">
                  <h2 className="text-lg font-semibold text-slate-900 mb-4">
                    What you'll learn
                  </h2>
                  <ul className="space-y-3">
                    {keyTakeaways.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-slate-700"
                      >
                        <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {sectionsWithId.map((section, index) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-28"
                  >
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                      {section.heading}
                    </h2>
                    <div className="space-y-4 text-slate-700 leading-8 text-lg">
                      {section.body.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>

                    {index === 1 ? (
                      <div className="mt-8">
                        <MarketingCard />
                      </div>
                    ) : null}
                  </section>
                ))}

                {/* FAQ */}
                <section
                  id="faq"
                  className="pt-8 border-t border-slate-200 scroll-mt-28"
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">
                    Frequently asked questions
                  </h2>
                  <div className="space-y-5">
                    {post.faq.map((item) => (
                      <div
                        key={item.question}
                        className="rounded-lg border border-slate-200 bg-slate-50/50 p-5"
                      >
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">
                          {item.question}
                        </h3>
                        <p className="text-slate-700 leading-7">
                          {item.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Bottom CTA */}
                <section className="pt-8 border-t border-slate-200">
                  <MarketingCard />
                </section>

                {/* Footer Links */}
                <section className="pt-8 border-t border-slate-200">
                  <p className="text-sm text-slate-500 mb-6">
                    Medical note: This article is educational and not a
                    substitute for professional diagnosis or treatment.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      to="/blog"
                      className="inline-flex items-center px-5 py-2.5 rounded-lg border border-slate-300 text-slate-800 hover:bg-slate-50 transition-colors font-medium"
                    >
                      Browse more articles
                    </Link>
                    <Link
                      to="/science"
                      className="inline-flex items-center px-5 py-2.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-all font-medium group"
                    >
                      Visit science page
                      <ChevronRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <a
                      href="mailto:karan@myempath.co?subject=Empath%20Blog%20Question"
                      className="inline-flex items-center px-5 py-2.5 rounded-lg border border-slate-300 text-slate-800 hover:bg-slate-50 transition-colors font-medium"
                    >
                      Ask a question
                    </a>
                  </div>
                </section>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="order-2 space-y-5 lg:sticky lg:top-28 lg:self-start">
              <MarketingCard compact />

              {/* Table of Contents */}
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-4">
                  In this article
                </p>
                <ul className="space-y-2.5 text-sm text-slate-600">
                  {sectionsWithId.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="hover:text-blue-600 transition-colors block py-0.5"
                      >
                        {section.heading}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href="#faq"
                      className="hover:text-blue-600 transition-colors block py-0.5"
                    >
                      Frequently asked questions
                    </a>
                  </li>
                </ul>
              </div>

              {/* Share */}
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-4">
                  Share
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5 mr-1.5" />
                    {copied ? 'Copied!' : 'Copy link'}
                  </button>
                  <a
                    href={twitterShare}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    X <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                  </a>
                  <a
                    href={linkedInShare}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-700 hover:bg-slate-50 transition-colors"
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

function getCategoryBadgeColor(category: string) {
  const styles: Record<string, string> = {
    'Journal Prompts': 'bg-blue-50 text-blue-700 border-blue-200',
    'How-To Guides': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Templates: 'bg-violet-50 text-violet-700 border-violet-200',
    'Mental Health Skills': 'bg-amber-50 text-amber-700 border-amber-200',
    'AI + Mental Health': 'bg-indigo-50 text-indigo-700 border-indigo-200',
  };

  return styles[category] ?? 'bg-slate-50 text-slate-700 border-slate-200';
}
