import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import { journalingBlogPosts } from '../data/journalingBlogPosts';
import logo from '../../public/empath-logo.png';
import posthog from 'posthog-js';
import SEO from '../components/SEO';
import { AppleIcon } from '../components/ChannelIcons';
import { openSupportChat } from '../utils/supportChat';
import { SMS_ENABLED } from '../utils/channels';

function toIsoDate(value: string) {
  const parsed = Date.parse(`${value} UTC`);
  return Number.isNaN(parsed) ? value : new Date(parsed).toISOString().split('T')[0];
}

export default function JournalingBlogsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hasTrackedSearch, setHasTrackedSearch] = useState(false);
  const APP_STORE_URL = 'https://apps.apple.com/us/app/myempath/id6472873287';
  const PHONE_MAIN = '+18883663082';
  const WHATSAPP_NUMBER = '18883663082';
  const TELEGRAM_USERNAME = 'MyEmpathBot';

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    if (value.trim() && !hasTrackedSearch) {
      setHasTrackedSearch(true);
      posthog.capture('journaling_blog_search_used');
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    posthog.capture('journaling_blog_category_selected', { category });
  };

  const handleArticleClick = (
    slug: string,
    source: 'featured' | 'grid',
    category: string,
    position?: number
  ) => {
    posthog.capture('journaling_blog_article_clicked', { slug, source, category, position });
  };

  // The Top 7: posts pinned via featuredRank, in rank order.
  const featuredPosts = useMemo(() => {
    const ranked = journalingBlogPosts
      .filter((post) => typeof post.featuredRank === 'number')
      .sort((a, b) => (a.featuredRank ?? 99) - (b.featuredRank ?? 99))
      .slice(0, 7);
    return ranked.length > 0 ? ranked : [journalingBlogPosts[0]];
  }, []);
  const leadPost = featuredPosts[0];
  const rankedPosts = featuredPosts.slice(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    posthog.capture('journaling_blog_page_viewed');
    posthog.capture('journaling_blog_featured_impression', {
      slugs: featuredPosts.map((post) => post.slug),
    });
    document.title = 'Journaling Blog: Tips, Apps & Guides | Empath';
    const description = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement | null;
    if (description) {
      description.content =
        'Explore expert guides on journaling apps, techniques, and habits. Learn how to start journaling, build a routine, and use AI to understand yourself better.';
    }
  }, [featuredPosts]);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    journalingBlogPosts.forEach((post) => {
      counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
    });
    const sorted = Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([category]) => category);
    return ['All', ...sorted];
  }, []);

  const filteredPosts = useMemo(() => {
    return journalingBlogPosts.filter((post) => {
      const search = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !search ||
        post.title.toLowerCase().includes(search) ||
        post.excerpt.toLowerCase().includes(search) ||
        post.keyword.toLowerCase().includes(search);
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const isDefaultView = !searchTerm && selectedCategory === 'All';
  const featuredSlugs = useMemo(
    () => new Set(featuredPosts.map((post) => post.slug)),
    [featuredPosts]
  );
  const gridPosts = isDefaultView
    ? filteredPosts.filter((post) => !featuredSlugs.has(post.slug))
    : filteredPosts;

  const blogSchema = useMemo(() => {
    const origin =
      typeof window !== 'undefined' ? window.location.origin : 'https://www.empathdash.com';
    return {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Empath Journaling Blog',
      description:
        'Expert guides on journaling apps, techniques, habits, and AI-powered self-reflection.',
      blogPost: journalingBlogPosts.map((post) => ({
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.metaDescription,
        abstract: post.answerSummary,
        datePublished: toIsoDate(post.date),
        dateModified: toIsoDate(post.date),
        author: { '@type': 'Organization', name: post.author },
        url: `${origin}/app/blog/${post.slug}`,
        keywords: [post.keyword, post.category, 'journaling'],
        citation: post.sources?.map((source) => source.url),
        inLanguage: 'en-US',
        isAccessibleForFree: true,
      })),
    };
  }, []);

  const featuredSchema = useMemo(() => {
    const origin =
      typeof window !== 'undefined' ? window.location.origin : 'https://www.empathdash.com';
    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Top 7 journaling guides',
      itemListElement: featuredPosts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: post.seoTitle,
        url: `${origin}/app/blog/${post.slug}`,
      })),
    };
  }, [featuredPosts]);

  const handleAppStoreClick = () => {
    posthog.capture('journaling_blog_app_store_clicked');
    // Plain new-tab open; a windowFeatures string opens a popup that blockers
    // reject and mobile Safari shows as an error page.
    const newWindow = window.open(APP_STORE_URL, '_blank');
    if (newWindow) newWindow.opener = null;
  };

  return (
    <div className="flex-grow bg-[#FAF9F6] text-stone-900">
      <SEO
        title="Journaling Blog | Empath - Tips, Reviews & Guides"
        description="Guides to journaling apps, mood tracking, mental wellness, and getting more out of your daily reflection practice."
        path="/app/blog"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(featuredSchema) }}
      />

      {/* Header / Navbar */}
      <header className="sticky top-0 z-40 border-b border-stone-200/70 bg-[#FAF9F6]/85 backdrop-blur-md">
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
              className="hidden text-sm font-medium text-stone-900 transition-colors md:block"
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

      {/* Page Header */}
      <div className="container mx-auto px-4 max-w-6xl pt-16 md:pt-24 pb-12">
        <p className="text-xs font-semibold text-[#1b8af1] uppercase tracking-[0.18em] mb-4">
          The Empath Journal
        </p>
        <h1 className="font-serif text-5xl md:text-6xl font-medium leading-[1.05] tracking-tight text-stone-900 mb-5">
          Journaling, understood.
        </h1>
        <p className="text-lg text-stone-600 leading-relaxed max-w-2xl">
          Honest app reviews, research-backed techniques, and guides to building a
          reflection habit that actually sticks.
        </p>
      </div>

      {/* The Top 7 */}
      {isDefaultView && leadPost && (
        <div className="container mx-auto px-4 max-w-6xl pb-14">
          <div className="flex items-baseline justify-between border-b border-stone-200 pb-4 mb-8">
            <h2 className="font-serif text-2xl md:text-3xl font-medium tracking-tight text-stone-900">
              The Top 7
            </h2>
            <p className="text-sm text-stone-500 hidden sm:block">
              The guides our readers find most useful
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-12">
            {/* Lead story */}
            <Link
              to={`/app/blog/${leadPost.slug}`}
              className="lg:col-span-7 group"
              onClick={() => handleArticleClick(leadPost.slug, 'featured', leadPost.category, 1)}
            >
              <article className="flex h-full flex-col">
                <div className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em]">
                  <span className="text-[#1b8af1]">№ 1</span>
                  <span className="text-stone-300">·</span>
                  <span className="text-stone-500">{leadPost.category}</span>
                </div>
                <h3 className="mb-5 font-serif text-4xl font-medium leading-[1.1] tracking-tight text-stone-900 transition-colors group-hover:text-[#1b8af1] md:text-5xl">
                  {leadPost.title}
                </h3>
                <p className="mb-6 max-w-xl text-lg leading-relaxed text-stone-600">
                  {leadPost.excerpt}
                </p>
                <p className="mb-6 inline-flex items-center gap-1.5 font-semibold text-[#1b8af1]">
                  Read the guide <ArrowRight className="h-4 w-4" />
                </p>
                <p className="mt-auto text-sm text-stone-500">
                  {leadPost.date} · {leadPost.readTime}
                </p>
              </article>
            </Link>

            {/* Ranked list 2–7 */}
            <ol className="lg:col-span-5 divide-y divide-stone-200 border-t border-stone-200 lg:border-t-0">
              {rankedPosts.map((post, index) => {
                const rank = index + 2;
                return (
                  <li key={post.id}>
                    <Link
                      to={`/app/blog/${post.slug}`}
                      className="flex gap-5 py-5 group items-start"
                      onClick={() =>
                        handleArticleClick(post.slug, 'featured', post.category, rank)
                      }
                    >
                      <span className="font-serif text-3xl leading-none text-stone-300 group-hover:text-[#1b8af1] transition-colors w-10 flex-shrink-0 pt-0.5 tabular-nums">
                        {String(rank).padStart(2, '0')}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-serif text-lg font-medium leading-snug text-stone-900 group-hover:text-[#1b8af1] transition-colors">
                          {post.title}
                        </span>
                        <span className="block text-sm text-stone-500 mt-1.5">
                          {post.readTime}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      )}

      {/* Quiet CTA strip: one line, one button, text links */}
      {isDefaultView && (
        <div className="container mx-auto px-4 max-w-6xl pb-14">
          <div className="flex flex-col gap-4 border-y border-stone-200 py-5 md:flex-row md:items-center md:gap-8">
            <p className="leading-relaxed text-stone-600 md:flex-1">
              <span className="font-semibold text-stone-900">
                Written by the team behind Empath
              </span>
              , the journal you can call or message. Free to try.
            </p>
            <div className="flex flex-shrink-0 flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium">
              <button
                onClick={handleAppStoreClick}
                className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-5 py-2 font-semibold text-white transition-colors hover:bg-[#1b8af1]"
              >
                <AppleIcon className="h-4 w-4" /> Get the app
              </button>
              {SMS_ENABLED && (
                <a
                  href={`sms:${PHONE_MAIN}`}
                  onClick={() => posthog.capture('journaling_blog_text_clicked')}
                  title="Text (888) 366-3082"
                  className="text-stone-600 transition-colors hover:text-stone-900"
                >
                  Text
                </a>
              )}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => posthog.capture('journaling_blog_whatsapp_clicked')}
                title="Message Empath on WhatsApp"
                className="text-stone-600 transition-colors hover:text-stone-900"
              >
                WhatsApp
              </a>
              <a
                href={`https://t.me/${TELEGRAM_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => posthog.capture('journaling_blog_telegram_clicked')}
                title="Message Empath on Telegram"
                className="text-stone-600 transition-colors hover:text-stone-900"
              >
                Telegram
              </a>
            </div>
          </div>
        </div>
      )}

      {/* All Articles */}
      <div className="container mx-auto px-4 max-w-6xl pb-20">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4 border-b border-stone-200 pb-4 mb-6">
          <h2 className="font-serif text-2xl md:text-3xl font-medium tracking-tight text-stone-900">
            All articles
          </h2>
          <div className="relative sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-stone-200 rounded-full text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-[#1b8af1] focus:ring-2 focus:ring-[#1b8af1]/15 transition-all"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => handleCategorySelect(category)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-stone-900 text-white'
                  : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-400'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {gridPosts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-stone-300 p-12 text-center">
            <p className="text-stone-500">
              No posts matched your filter. Try another category or keyword.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {gridPosts.map((post) => {
              return (
                <article key={post.id}>
                  <Link
                    to={`/app/blog/${post.slug}`}
                    className="flex flex-col h-full bg-white rounded-3xl border border-stone-200 p-6 hover:shadow-soft transition-shadow duration-200 group"
                    onClick={() => handleArticleClick(post.slug, 'grid', post.category)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1b8af1]">
                        {post.category}
                      </span>
                      <span className="text-xs text-stone-400">{post.readTime}</span>
                    </div>
                    <h3 className="text-lg font-medium text-stone-900 mb-2 group-hover:text-[#1b8af1] transition-colors leading-snug font-serif">
                      {post.title}
                    </h3>
                    <p className="text-stone-600 text-sm leading-relaxed line-clamp-2 mb-5">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-xs text-stone-400">{post.date}</span>
                      <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-[#1b8af1] transition-colors flex-shrink-0" />
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
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
