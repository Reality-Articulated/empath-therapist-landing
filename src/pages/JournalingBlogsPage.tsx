import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  CalendarCheck,
  Compass,
  Cpu,
  FlaskConical,
  HeartPulse,
  Search,
  Star,
} from 'lucide-react';
import { journalingBlogPosts } from '../data/journalingBlogPosts';
import logo from '../../public/empath-logo.png';
import posthog from 'posthog-js';
import SEO from '../components/SEO';
import { getCategoryColor } from '../utils/blogCategoryColors';

function toIsoDate(value: string) {
  const parsed = Date.parse(`${value} UTC`);
  return Number.isNaN(parsed) ? value : new Date(parsed).toISOString().split('T')[0];
}

function getCategoryIcon(category: string) {
  const icons: Record<string, typeof BookOpen> = {
    'App Reviews': Star,
    'Getting Started': Compass,
    'Science & Research': FlaskConical,
    'Habits & Routines': CalendarCheck,
    'AI & Technology': Cpu,
    'Mental Wellness': HeartPulse,
  };
  return icons[category] ?? BookOpen;
}

export default function JournalingBlogsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hasTrackedSearch, setHasTrackedSearch] = useState(false);
  const APP_STORE_URL = 'https://apps.apple.com/us/app/myempath/id6472873287';

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

  const featuredPosts = useMemo(() => {
    const flagged = journalingBlogPosts.filter((post) => post.featured).slice(0, 2);
    return flagged.length > 0 ? flagged : [journalingBlogPosts[0]];
  }, []);

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
    const set = new Set(journalingBlogPosts.map((post) => post.category));
    return ['All', ...Array.from(set)];
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
      name: 'Featured journaling articles',
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
      <div className="bg-[#FAF9F6] border-b border-stone-200 py-4 sticky top-0 z-40">
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
              className="text-sm font-bold text-[#1b8af1] transition-colors hidden md:block"
            >
              Blog
            </Link>
            <button
              onClick={handleAppStoreClick}
              className="px-4 py-2 bg-stone-900 text-white rounded-lg font-bold text-sm hover:bg-[#1b8af1] transition-colors"
            >
              Download
            </button>
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <div className="border-b border-stone-200 bg-[#FAF9F6]">
        <div className="container mx-auto px-4 max-w-5xl py-12 md:py-16">
          <p className="text-sm font-bold text-[#1b8af1] uppercase tracking-wider mb-3">
            Empath Blog
          </p>
          <h1 className="text-3xl md:text-5xl font-black text-stone-900 tracking-tight mb-4 font-serif">
            Journaling Guides &amp; Resources
          </h1>
          <p className="text-lg text-stone-600 leading-relaxed max-w-2xl mb-8 font-medium">
            Expert guides on journaling apps, techniques, and habits to help you
            build a practice that actually sticks.
          </p>

          {/* Search */}
          <div className="max-w-md relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-stone-200 rounded-lg text-sm font-medium text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 focus:shadow-[3px_3px_0px_0px_#1b8af1] transition-all"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mt-6">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => handleCategorySelect(category)}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-bold border-2 transition-all ${
                  selectedCategory === category
                    ? 'bg-stone-900 text-white border-stone-900 shadow-[3px_3px_0px_0px_#1b8af1]'
                    : 'bg-white text-stone-600 border-stone-200 hover:border-stone-900'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Posts */}
      {isDefaultView && (
        <div className="border-b border-stone-200 bg-white">
          <div className="container mx-auto px-4 max-w-5xl py-10">
            <div
              className={`grid gap-6 ${featuredPosts.length > 1 ? 'md:grid-cols-2' : ''}`}
            >
              {featuredPosts.map((post, index) => {
                const colors = getCategoryColor(post.category);
                const Icon = getCategoryIcon(post.category);
                return (
                  <Link
                    key={post.id}
                    to={`/app/blog/${post.slug}`}
                    className="block group h-full"
                    onClick={() =>
                      handleArticleClick(post.slug, 'featured', post.category, index + 1)
                    }
                  >
                    <div className="flex flex-col h-full bg-[#FAF9F6] rounded-xl border-2 border-stone-900 shadow-[8px_8px_0px_0px_rgba(28,25,23,1)] group-hover:shadow-[6px_6px_0px_0px_#1b8af1] group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all p-6 md:p-8">
                      <div
                        className={`hidden md:flex h-28 mb-6 bg-gradient-to-br ${colors.gradient} rounded-xl border-2 border-stone-900 items-center justify-center`}
                      >
                        <div className="w-14 h-14 bg-white rounded-2xl border-2 border-stone-900 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] flex items-center justify-center">
                          <Icon className="w-7 h-7" style={{ color: colors.shadow }} />
                        </div>
                      </div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="inline-flex px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-stone-900 text-white border-2 border-stone-900">
                          Featured
                        </span>
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-bold border-2 ${colors.bg} ${colors.text} ${colors.border}`}
                        >
                          {post.category}
                        </span>
                      </div>
                      <h2 className="text-2xl font-black text-stone-900 leading-tight mb-3 group-hover:text-[#1b8af1] transition-colors font-serif">
                        {post.title}
                      </h2>
                      <p className="text-stone-600 leading-relaxed mb-4 font-medium">
                        {post.excerpt}
                      </p>
                      <div className="mt-auto flex items-center gap-3 text-sm text-stone-500 font-medium">
                        <span className="font-bold text-stone-700">{post.author}</span>
                        <span>·</span>
                        <span>{post.date}</span>
                        <span>·</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Articles List */}
      <div className="bg-[#FAF9F6]">
        <div className="container mx-auto px-4 max-w-5xl py-10 md:py-12">
          {gridPosts.length === 0 ? (
            <div className="rounded-xl border-2 border-dashed border-stone-300 p-12 text-center">
              <p className="text-stone-500 font-medium">
                No posts matched your filter. Try another category or keyword.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-5">
              {gridPosts.map((post) => {
                const colors = getCategoryColor(post.category);
                return (
                  <article key={post.id}>
                    <Link
                      to={`/app/blog/${post.slug}`}
                      className="flex flex-col h-full bg-white rounded-xl border-2 border-stone-200 p-5 hover:border-stone-900 hover:shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] transition-all group"
                      onClick={() => handleArticleClick(post.slug, 'grid', post.category)}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className={`inline-flex px-2.5 py-0.5 rounded-lg text-xs font-bold border-2 ${colors.bg} ${colors.text} ${colors.border}`}
                        >
                          {post.category}
                        </span>
                        <span className="text-xs text-stone-400 font-medium">{post.readTime}</span>
                      </div>
                      <h3 className="text-lg font-bold text-stone-900 mb-2 group-hover:text-[#1b8af1] transition-colors leading-snug font-serif">
                        {post.title}
                      </h3>
                      <p className="text-stone-600 text-sm leading-relaxed line-clamp-2 mb-4 font-medium">
                        {post.excerpt}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-xs text-stone-400 font-medium">
                          {post.author} · {post.date}
                        </span>
                        <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-[#1b8af1] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
