import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import { journalingBlogPosts } from '../data/journalingBlogPosts';
import logo from '../../public/empath-logo.png';
import posthog from 'posthog-js';

function getCategoryBadgeColor(category: string) {
  const styles: Record<string, string> = {
    'App Reviews': 'bg-blue-50 text-blue-700 border-blue-200',
    'Getting Started': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Science & Research': 'bg-violet-50 text-violet-700 border-violet-200',
    'Habits & Routines': 'bg-amber-50 text-amber-700 border-amber-200',
    'AI & Technology': 'bg-indigo-50 text-indigo-700 border-indigo-200',
    'Mental Wellness': 'bg-rose-50 text-rose-700 border-rose-200',
  };
  return styles[category] ?? 'bg-stone-50 text-stone-700 border-stone-200';
}

export default function JournalingBlogsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const APP_STORE_URL = 'https://apps.apple.com/us/app/myempath/id6472873287';

  useEffect(() => {
    posthog.capture('journaling_blog_page_viewed');
    document.title = 'Journaling Blog: Tips, Apps & Guides | Empath';
    const description = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement | null;
    if (description) {
      description.content =
        'Explore expert guides on journaling apps, techniques, and habits. Learn how to start journaling, build a routine, and use AI to understand yourself better.';
    }
  }, []);

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

  const featuredPost = journalingBlogPosts[0];
  const isDefaultView = !searchTerm && selectedCategory === 'All';
  const gridPosts = isDefaultView ? filteredPosts.slice(1) : filteredPosts;

  const blogSchema = useMemo(() => {
    const origin =
      typeof window !== 'undefined' ? window.location.origin : 'https://myempath.co';
    return {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Empath Journaling Blog',
      description:
        'Expert guides on journaling apps, techniques, habits, and AI-powered self-reflection.',
      blogPost: journalingBlogPosts.map((post) => ({
        '@type': 'BlogPosting',
        headline: post.seoTitle,
        description: post.metaDescription,
        datePublished: post.date,
        author: { '@type': 'Organization', name: post.author },
        url: `${origin}/app/blog/${post.slug}`,
        keywords: [post.keyword, post.category, 'journaling'],
      })),
    };
  }, []);

  const handleAppStoreClick = () => {
    posthog.capture('journaling_blog_app_store_clicked');
    window.open(APP_STORE_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex-grow bg-[#FAF9F6] text-stone-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
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
          <p className="text-sm font-bold text-stone-500 uppercase tracking-wider mb-3">
            Empath Blog
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-stone-900 tracking-tight mb-4">
            Journaling Guides &amp; Resources
          </h1>
          <p className="text-lg text-stone-600 leading-relaxed max-w-2xl mb-8">
            Expert guides on journaling apps, techniques, and habits to help you
            build a practice that actually sticks.
          </p>

          {/* Search */}
          <div className="max-w-md relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-lg text-sm text-stone-800 placeholder:text-stone-400 focus:ring-2 focus:ring-[#1b8af1] focus:border-[#1b8af1] transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mt-6">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  selectedCategory === category
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50 hover:border-stone-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Post */}
      {isDefaultView && (
        <div className="border-b border-stone-200 bg-white">
          <div className="container mx-auto px-4 max-w-5xl py-10">
            <Link
              to={`/app/blog/${featuredPost.slug}`}
              className="block group"
            >
              <div className="grid md:grid-cols-[1fr,1.2fr] gap-6 items-center">
                <div>
                  <span
                    className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold border mb-3 ${getCategoryBadgeColor(
                      featuredPost.category
                    )}`}
                  >
                    {featuredPost.category}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-stone-900 leading-tight mb-3 group-hover:text-[#1b8af1] transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-stone-600 leading-relaxed mb-4">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-sm text-stone-500">
                    <span className="font-medium text-stone-700">{featuredPost.author}</span>
                    <span>·</span>
                    <span>{featuredPost.date}</span>
                    <span>·</span>
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
                <div className="hidden md:flex justify-end">
                  <div className="w-full max-w-sm aspect-[4/3] bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-stone-200 flex items-center justify-center">
                    <span className="text-sm text-stone-400 font-medium">Featured</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* Articles List */}
      <div className="bg-[#FAF9F6]">
        <div className="container mx-auto px-4 max-w-5xl py-10 md:py-12">
          {gridPosts.length === 0 ? (
            <div className="rounded-lg border border-dashed border-stone-300 p-12 text-center">
              <p className="text-stone-500">
                No posts matched your filter. Try another category or keyword.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-stone-200">
              {gridPosts.map((post) => (
                <article key={post.id} className="py-6 first:pt-0 last:pb-0">
                  <Link
                    to={`/app/blog/${post.slug}`}
                    className="block group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span
                            className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border ${getCategoryBadgeColor(
                              post.category
                            )}`}
                          >
                            {post.category}
                          </span>
                          <span className="text-xs text-stone-400">{post.readTime}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-stone-900 mb-1.5 group-hover:text-[#1b8af1] transition-colors leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-stone-600 text-sm leading-relaxed line-clamp-2 mb-2">
                          {post.excerpt}
                        </p>
                        <div className="text-xs text-stone-400">
                          {post.author} · {post.date}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-[#1b8af1] transition-colors flex-shrink-0 mt-2" />
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
