import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle,
  Clock3,
  ExternalLink,
} from 'lucide-react';
import { journalingBlogPosts, JournalingBlogPost } from '../data/journalingBlogPosts';
import logo from '../../public/empath-logo.png';
import posthog from 'posthog-js';
import SEO from '../components/SEO';
import BlogChart from '../components/BlogChart';
import { WhatsAppIcon, AppleIcon } from '../components/ChannelIcons';
import { openSupportChat } from '../utils/supportChat';
import { SMS_ENABLED } from '../utils/channels';

function toAnchorId(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function toIsoDate(value: string) {
  const parsed = Date.parse(`${value} UTC`);
  return Number.isNaN(parsed) ? value : new Date(parsed).toISOString().split('T')[0];
}

/**
 * The article's single promotion: one dark card at the end of the reading
 * column. App Store is the button; every channel is a quiet text link.
 */
function EndCta() {
  const APP_STORE_URL = 'https://apps.apple.com/us/app/myempath/id6472873287';
  const PHONE_MAIN = '+18883663082';
  const WHATSAPP_NUMBER = '18883663082';
  const TELEGRAM_USERNAME = 'MyEmpathBot';

  const quietLinks = [
    {
      key: 'call',
      label: 'Call',
      href: `tel:${PHONE_MAIN}`,
      event: 'journaling_blog_post_call_clicked',
      external: false,
    },
    {
      key: 'text',
      label: 'Text',
      href: `sms:${PHONE_MAIN}`,
      event: 'journaling_blog_post_text_clicked',
      external: false,
    },
    {
      key: 'telegram',
      label: 'Telegram',
      href: `https://t.me/${TELEGRAM_USERNAME}`,
      event: 'journaling_blog_post_telegram_clicked',
      external: true,
    },
  ].filter((channel) => channel.key !== 'text' || SMS_ENABLED);

  return (
    <div className="rounded-3xl bg-stone-900 px-7 py-10 text-center text-white md:px-10 md:py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1b8af1]">Try Empath Free</p>
      <h2 className="mt-4 font-serif text-3xl font-medium leading-[1.15] tracking-tight">
        Your AI Journaling Assistant
      </h2>
      <p className="mx-auto mt-4 max-w-md leading-relaxed text-stone-300">
        Call or message your thoughts. Empath captures everything and helps you
        understand yourself better over time.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => posthog.capture('journaling_blog_post_app_store_clicked')}
          className="inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-7 py-3.5 font-semibold text-stone-900 transition-colors hover:bg-stone-100"
        >
          <AppleIcon className="h-5 w-5" />
          Download on App Store
        </a>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => posthog.capture('journaling_blog_post_whatsapp_clicked')}
          className="inline-flex items-center gap-2 font-medium text-stone-300 transition-colors hover:text-white"
        >
          <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
          WhatsApp
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-stone-400">
        {quietLinks.map(({ key, label, href, event, external }) => (
          <a
            key={key}
            href={href}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            onClick={() => posthog.capture(event)}
            className="underline decoration-stone-600 underline-offset-4 transition-colors hover:text-white"
          >
            {label}
          </a>
        ))}
      </div>
      <p className="mt-5 text-xs text-stone-500">
        One number for everything: +1 (888) 366-3082. No app required.
      </p>
    </div>
  );
}

export default function JournalingBlogPostPage() {
  const { slug } = useParams();
  const [copied, setCopied] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const post = journalingBlogPosts.find((entry) => entry.slug === slug);
  const APP_STORE_URL = 'https://apps.apple.com/us/app/myempath/id6472873287';

  const articleUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/app/blog/${slug ?? ''}`
      : `https://www.empathdash.com/app/blog/${slug ?? ''}`;
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
  }, [post, slug]);

  useEffect(() => {
    if (!post) return;
    posthog.capture('journaling_blog_post_viewed', {
      slug: post.slug,
      title: post.title,
      category: post.category,
    });
  }, [post]);

  // Reading progress bar under the sticky header.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        setReadingProgress(
          scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0
        );
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, [slug]);

  // Scroll-depth milestones (25/50/75/100), fired once each per article.
  useEffect(() => {
    if (!post) return;
    const fired = new Set<number>();
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const pct = (window.scrollY / scrollable) * 100;
      for (const threshold of [25, 50, 75, 100]) {
        if (pct >= threshold && !fired.has(threshold)) {
          fired.add(threshold);
          posthog.capture('journaling_blog_scroll_depth', {
            slug: post.slug,
            depth: threshold,
          });
        }
      }
      if (fired.size === 4) window.removeEventListener('scroll', onScroll);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [post]);

  const schemas = useMemo(() => {
    if (!post) return { article: null, faq: null, breadcrumb: null };
    const origin =
      typeof window !== 'undefined' ? window.location.origin : 'https://www.empathdash.com';
    const canonicalUrl = `${origin}/app/blog/${post.slug}`;
    const wordCount = [
      post.answerSummary,
      post.intro,
      ...post.sections.flatMap((section) => section.body),
      ...post.faq.flatMap((item) => [item.question, item.answer]),
    ]
      .filter(Boolean)
      .join(' ')
      .trim()
      .split(/\s+/).length;
    const article = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.seoTitle,
      description: post.metaDescription,
      abstract: post.answerSummary,
      datePublished: toIsoDate(post.date),
      dateModified: toIsoDate(post.date),
      author: { '@type': 'Organization', name: post.author, url: origin },
      publisher: {
        '@type': 'Organization',
        name: 'Empath',
        url: origin,
        logo: { '@type': 'ImageObject', url: `${origin}/empath-logo.png` },
      },
      url: canonicalUrl,
      mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
      keywords: [post.keyword, post.category, 'journaling'],
      citation: post.sources?.map((source) => source.url),
      wordCount,
      inLanguage: 'en-US',
      isAccessibleForFree: true,
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
    const breadcrumb = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Empath', item: `${origin}/app` },
        { '@type': 'ListItem', position: 2, name: 'Journaling Blog', item: `${origin}/app/blog` },
        { '@type': 'ListItem', position: 3, name: post.title, item: canonicalUrl },
      ],
    };
    return { article, faq, breadcrumb };
  }, [post]);

  const handleShare = (channel: string) => {
    posthog.capture('journaling_blog_share_clicked', {
      slug: post?.slug ?? slug,
      channel,
    });
  };

  const handleTocClick = (section: string, placement: 'mobile' | 'sidebar') => {
    posthog.capture('journaling_blog_toc_clicked', {
      slug: post?.slug ?? slug,
      section,
      placement,
    });
  };

  const handleRelatedClick = (toSlug: string) => {
    posthog.capture('journaling_blog_related_clicked', {
      from_slug: post?.slug ?? slug,
      to_slug: toSlug,
    });
  };

  const handleCopyLink = async () => {
    handleShare('copy_link');
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
    // Plain new-tab open; a windowFeatures string opens a popup that blockers
    // reject and mobile Safari shows as an error page.
    const newWindow = window.open(APP_STORE_URL, '_blank');
    if (newWindow) newWindow.opener = null;
  };

  // Related posts: explicit picks via relatedSlugs, otherwise the newest posts.
  const relatedPosts = useMemo(() => {
    if (!post) return [];
    if (post.relatedSlugs?.length) {
      return post.relatedSlugs
        .map((relatedSlug) => journalingBlogPosts.find((p) => p.slug === relatedSlug))
        .filter((p): p is JournalingBlogPost => p !== undefined && p.id !== post.id)
        .slice(0, 3);
    }
    return journalingBlogPosts
      .filter((p) => p.id !== post.id)
      .slice(0, 3);
  }, [post]);

  if (!post) {
    return (
      <div className="flex-grow bg-[#FAF9F6] text-stone-900 font-sans pt-32 pb-20">
        <SEO
          title="Article Not Found | Empath Journaling Blog"
          description="This article may have moved or is still being prepared."
          path={`/app/blog/${slug ?? ''}`}
          noIndex
        />
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-stone-900 mb-4 font-serif">
              Article not found
            </h1>
            <p className="text-stone-600 mb-8 text-lg">
              This article may have moved or is still being prepared.
            </p>
            <Link
              to="/app/blog"
              className="inline-flex items-center px-7 py-3.5 bg-stone-900 text-white rounded-full font-semibold hover:bg-[#1b8af1] transition-colors gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back to blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow bg-[#FAF9F6] text-stone-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <SEO
        title={post.seoTitle}
        description={post.metaDescription}
        path={`/app/blog/${post.slug}`}
        ogType="article"
        keywords={[post.keyword, post.category, 'journaling'].join(', ')}
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
      {schemas.breadcrumb && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumb) }}
        />
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-stone-200/70 bg-[#FAF9F6]/85 backdrop-blur-md">
        <div
          className="absolute bottom-[-1px] left-0 h-[2px] bg-[#1b8af1] transition-[width] duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
          aria-hidden="true"
        />
        <div className="container mx-auto flex items-center justify-between px-4 py-3.5">
          <Link to="/app" className="flex items-center gap-0">
            <div className="flex h-10 w-10 items-center justify-center">
              <img src={logo} alt="Empath Logo" className="h-full w-full object-contain" />
            </div>
            <span className="text-lg tracking-tight text-stone-900">Empath</span>
          </Link>
          <nav className="flex items-center gap-8">
            <Link
              to="/app#features"
              className="hidden text-sm font-medium text-stone-600 transition-colors hover:text-stone-900 md:block"
            >
              Features
            </Link>
            <Link
              to="/app#faq"
              className="hidden text-sm font-medium text-stone-600 transition-colors hover:text-stone-900 md:block"
            >
              FAQ
            </Link>
            <Link
              to="/app/blog"
              className="hidden text-sm font-medium text-stone-600 transition-colors hover:text-stone-900 md:block"
            >
              Blog
            </Link>
            <button
              onClick={handleAppStoreClick}
              className="rounded-full bg-stone-900 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1b8af1]"
            >
              Download
            </button>
          </nav>
        </div>
      </header>

      {/* Article: one centered reading column. Title, intro, and body share
          the same left edge; the table of contents sits in the right margin
          on xl screens and inline (after the intro) below that. */}
      <div className="container mx-auto px-4 pb-20 pt-14">
        <div className="mx-auto max-w-2xl">
          <Link
            to="/app/blog"
            className="mb-10 inline-flex items-center gap-1.5 text-sm font-medium text-stone-500 transition-colors hover:text-stone-900"
          >
            <ArrowLeft className="h-4 w-4" /> Back to all articles
          </Link>

          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#1b8af1]">
              {post.category}
            </p>
            <h1 className="mb-6 font-serif text-4xl font-medium leading-[1.1] tracking-tight text-stone-900 md:text-5xl">
              {post.title}
            </h1>
            <p className="mb-7 text-lg leading-relaxed text-stone-600 md:text-xl">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-stone-500">
              <span className="font-semibold text-stone-700">{post.author}</span>
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" /> {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock3 className="h-4 w-4" /> {post.readTime}
              </span>
            </div>
          </motion.header>
        </div>

        <div className="relative mt-12">
          {/* Table of contents rail (xl and up): plain text in the right margin */}
          <aside className="absolute left-[calc(50%+24rem)] top-0 hidden h-full w-56 xl:block">
            <nav className="sticky top-28 border-l border-stone-200 pl-5" aria-label="In this article">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
                In this article
              </p>
              <ul className="space-y-2.5 text-sm text-stone-500">
                {sectionsWithId.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      onClick={() => handleTocClick(section.heading, 'sidebar')}
                      className="block py-0.5 transition-colors hover:text-[#1b8af1]"
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
                {post.sources && post.sources.length > 0 && (
                  <li>
                    <a
                      href="#sources"
                      onClick={() => handleTocClick('Sources', 'sidebar')}
                      className="block py-0.5 transition-colors hover:text-[#1b8af1]"
                    >
                      Sources and further reading
                    </a>
                  </li>
                )}
                <li>
                  <a
                    href="#faq"
                    onClick={() => handleTocClick('FAQ', 'sidebar')}
                    className="block py-0.5 transition-colors hover:text-[#1b8af1]"
                  >
                    Frequently asked questions
                  </a>
                </li>
              </ul>
            </nav>
          </aside>

          <article className="mx-auto max-w-2xl">
            {post.answerSummary && (
              <section id="quick-answer" className="border-l-2 border-[#1b8af1] pl-6">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#1b8af1]">
                  Quick answer
                </p>
                <p className="font-serif text-xl leading-9 text-stone-900 md:text-2xl md:leading-10">
                  {post.answerSummary}
                </p>
              </section>
            )}

            <section className="mt-10">
              <p className="text-[1.125rem] leading-[1.8] text-stone-700">{post.intro}</p>
            </section>

            {/* Inline table of contents (below xl) */}
            <nav className="mt-10 border-t border-stone-200 pt-6 xl:hidden" aria-label="In this article">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
                In this article
              </p>
              <ul className="space-y-2.5 text-sm text-stone-600">
                {sectionsWithId.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      onClick={() => handleTocClick(section.heading, 'mobile')}
                      className="block py-0.5 transition-colors hover:text-[#1b8af1]"
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
                {post.sources && post.sources.length > 0 && (
                  <li>
                    <a
                      href="#sources"
                      onClick={() => handleTocClick('Sources', 'mobile')}
                      className="block py-0.5 transition-colors hover:text-[#1b8af1]"
                    >
                      Sources and further reading
                    </a>
                  </li>
                )}
                <li>
                  <a
                    href="#faq"
                    onClick={() => handleTocClick('FAQ', 'mobile')}
                    className="block py-0.5 transition-colors hover:text-[#1b8af1]"
                  >
                    Frequently asked questions
                  </a>
                </li>
              </ul>
            </nav>

            {/* Key takeaways: between two hairlines, no card */}
            <section className="mt-10 border-y border-stone-200 py-8">
              <h2 className="mb-5 font-serif text-xl font-medium tracking-tight text-stone-900">
                {post.keyTakeaways ? 'Key takeaways' : "What you'll learn"}
              </h2>
              <ul className="space-y-3.5">
                {(
                  post.keyTakeaways ??
                  post.sections.slice(0, 3).map((section) => section.heading)
                ).map((takeaway) => (
                  <li key={takeaway} className="flex items-start gap-3 leading-7 text-stone-700">
                    <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-[#1b8af1]" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </section>

            {sectionsWithId.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="mb-5 mt-14 font-serif text-3xl font-medium tracking-tight text-stone-900">
                  {section.heading}
                </h2>
                <div className="space-y-6 text-[1.125rem] leading-[1.8] text-stone-700">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                {section.chart && <BlogChart chart={section.chart} />}

                {section.table && (
                  <div className="mt-10">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#1b8af1]">
                      Side by side
                    </p>
                    <h3 className="mb-4 font-serif text-xl font-medium tracking-tight text-stone-900">
                      {section.table.title}
                    </h3>
                    <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
                      <div className="overflow-x-auto">
                        <table className="w-full min-w-[560px] border-collapse text-left">
                          <thead>
                            <tr className="border-b border-stone-200">
                              <th className="w-[26%] px-5 py-3" aria-label="Feature" />
                              <th className="w-[37%] px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#1b8af1]">
                                Empath
                              </th>
                              <th className="w-[37%] px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
                                {section.table.competitorName}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {section.table.rows.map((row) => (
                              <tr key={row.feature} className="border-b border-stone-100 last:border-b-0">
                                <th
                                  scope="row"
                                  className="px-5 py-4 align-top text-sm font-semibold text-stone-900"
                                >
                                  {row.feature}
                                </th>
                                <td className="px-5 py-4 align-top text-sm leading-6 text-stone-800">
                                  {row.empath}
                                </td>
                                <td className="px-5 py-4 align-top text-sm leading-6 text-stone-600">
                                  {row.competitor}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {section.table.caption && (
                      <p className="mt-3 text-xs leading-5 text-stone-500">{section.table.caption}</p>
                    )}
                  </div>
                )}

                {section.callout && (
                  <Link
                    to={`/app/blog/${section.callout.slug}`}
                    onClick={() =>
                      posthog.capture('journaling_blog_callout_clicked', {
                        from_slug: post.slug,
                        to_slug: section.callout?.slug,
                      })
                    }
                    className="group mt-8 block border-l-2 border-stone-300 pl-6 transition-colors hover:border-[#1b8af1]"
                  >
                    <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                      Related reading
                    </span>
                    <span className="block leading-7 text-stone-700">{section.callout.text}</span>
                    <span className="mt-1.5 inline-flex items-center gap-1.5 font-semibold text-[#1b8af1] underline-offset-4 group-hover:underline">
                      {section.callout.linkText}
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                )}
              </section>
            ))}

            {post.sources && post.sources.length > 0 && (
              <section id="sources" className="mt-14 scroll-mt-28 border-t border-stone-200 pt-10">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#1b8af1]">
                  Research notes
                </p>
                <h2 className="mb-3 font-serif text-2xl font-medium tracking-tight text-stone-900">
                  Sources and further reading
                </h2>
                <p className="mb-6 leading-7 text-stone-600">
                  These references support the distinctions between reflective and repetitive
                  thought, if-then planning, and action-oriented approaches discussed above.
                </p>
                <ol className="list-decimal space-y-4 pl-5 marker:text-sm marker:text-stone-400">
                  {post.sources.map((source) => (
                    <li key={source.url} className="pl-1.5">
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-start gap-1.5 font-medium leading-6 text-stone-900 underline decoration-stone-300 underline-offset-4 hover:text-[#1b8af1] hover:decoration-[#1b8af1]"
                      >
                        {source.title}
                        <ExternalLink className="mt-1 h-3.5 w-3.5 flex-none" />
                      </a>
                      <p className="mt-1 text-sm leading-6 text-stone-600">
                        {source.authors}. <em>{source.publication}</em> ({source.year}).
                      </p>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* FAQ */}
            <section id="faq" className="mt-14 scroll-mt-28 border-t border-stone-200 pt-10">
              <h2 className="mb-2 font-serif text-3xl font-medium tracking-tight text-stone-900">
                Frequently asked questions
              </h2>
              <div className="divide-y divide-stone-200">
                {post.faq.map((item) => (
                  <div key={item.question} className="py-6">
                    <h3 className="mb-2 text-lg font-medium text-stone-900">{item.question}</h3>
                    <p className="leading-7 text-stone-600">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Share: a plain row of text links */}
            <section className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-stone-200 pt-6 text-sm">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">Share</span>
              <button
                type="button"
                onClick={handleCopyLink}
                className="font-medium text-stone-600 transition-colors hover:text-[#1b8af1]"
              >
                {copied ? 'Copied!' : 'Copy link'}
              </button>
              <a
                href={twitterShare}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleShare('x')}
                className="font-medium text-stone-600 transition-colors hover:text-[#1b8af1]"
              >
                X
              </a>
              <a
                href={linkedInShare}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleShare('linkedin')}
                className="font-medium text-stone-600 transition-colors hover:text-[#1b8af1]"
              >
                LinkedIn
              </a>
            </section>

            {/* The article's one CTA */}
            <section className="mt-12">
              <EndCta />
            </section>

            <section className="mt-10">
              <p className="text-sm leading-6 text-stone-500">
                Disclaimer: This article is for educational purposes and is not a substitute for
                professional mental health advice.
              </p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
                <Link to="/app/blog" className="text-stone-600 transition-colors hover:text-stone-900">
                  Browse more articles
                </Link>
                <Link
                  to="/app"
                  onClick={() =>
                    posthog.capture('journaling_blog_post_learn_more_clicked', {
                      slug: post.slug,
                    })
                  }
                  className="inline-flex items-center gap-1.5 text-[#1b8af1] hover:underline"
                >
                  Learn about Empath <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </section>
          </article>
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="mx-auto mt-20 max-w-5xl border-t border-stone-200 pt-12">
            <h2 className="mb-6 font-serif text-3xl font-medium tracking-tight text-stone-900">
              Keep reading
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  to={`/app/blog/${related.slug}`}
                  onClick={() => handleRelatedClick(related.slug)}
                  className="group rounded-3xl border border-stone-200 bg-white p-6 transition-shadow hover:shadow-soft"
                >
                  <span className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1b8af1]">
                    {related.category}
                  </span>
                  <h3 className="mb-2 font-serif text-lg font-medium leading-snug text-stone-900 transition-colors group-hover:text-[#1b8af1]">
                    {related.title}
                  </h3>
                  <p className="text-sm text-stone-500">{related.readTime}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-[#FAF9F6] py-14">
        <div className="container mx-auto flex flex-col items-center gap-8 px-4 md:flex-row md:justify-between">
          <Link to="/" className="flex items-center gap-0">
            <img src={logo} alt="Empath" className="h-9 w-9 object-contain" />
            <span className="text-lg tracking-tight text-stone-900">Empath</span>
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-stone-500">
            <Link to="/app/blog" className="transition-colors hover:text-stone-900">Blog</Link>
            <Link to="/therapist" className="transition-colors hover:text-stone-900">For Therapists</Link>
            <Link to="/privacy" className="transition-colors hover:text-stone-900">Privacy Policy</Link>
            <Link to="/terms" className="transition-colors hover:text-stone-900">Terms of Service</Link>
            <button
              type="button"
              onClick={() => openSupportChat()}
              className="font-medium transition-colors hover:text-stone-900"
            >
              Support
            </button>
          </div>
          <p className="text-xs text-stone-400">© {new Date().getFullYear()} Reality Articulated Inc.</p>
        </div>
      </footer>
    </div>
  );
}
