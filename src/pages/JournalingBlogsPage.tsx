import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  Sparkles,
  BookOpen,
  ArrowRight,
  ChevronDown,
  Star,
  Brain,
  Shield,
} from 'lucide-react';
import { journalingBlogPosts } from '../data/journalingBlogPosts';
import logo from '../../public/empath-logo.png';
import posthog from 'posthog-js';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

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
    <div className="flex-grow bg-[#FAF9F6] text-stone-900 font-sans selection:bg-blue-200 selection:text-blue-900">
      {/* Noise Texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

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
              className="text-sm font-bold text-[#1b8af1] transition-colors hidden md:block"
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

      {/* Hero */}
      <motion.section
        className="relative pt-24 pb-20 overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
          <motion.div
            variants={fadeIn}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 text-blue-800 border-2 border-blue-900 rounded-lg text-xs font-bold uppercase tracking-wider mb-8 shadow-[4px_4px_0px_0px_#1b8af1]"
          >
            <BookOpen className="w-4 h-4" /> Journaling Blog
          </motion.div>

          <motion.h1
            variants={fadeIn}
            className="text-5xl md:text-7xl font-black tracking-tighter text-stone-900 mb-8 leading-[0.95] font-serif"
          >
            Write Better. <br />
            <span className="relative inline-block px-4">
              <span className="absolute inset-0 bg-[#1b8af1] -rotate-1 rounded-sm shadow-[4px_4px_0px_0px_rgba(28,25,23,1)]" />
              <span className="relative text-white">Feel Better.</span>
            </span>
          </motion.h1>

          <motion.p
            variants={fadeIn}
            className="text-xl md:text-2xl text-stone-600 mb-12 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Expert guides on journaling apps, techniques, and habits to help you
            build a practice that actually sticks.
          </motion.p>

          {/* Search */}
          <motion.div variants={fadeIn} className="max-w-xl mx-auto relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="text"
              placeholder="Search journaling guides..."
              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-stone-900 rounded-xl text-stone-800 placeholder:text-stone-400 focus:ring-2 focus:ring-[#1b8af1] focus:border-[#1b8af1] shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] text-lg font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeIn}
            className="flex justify-center gap-6 text-sm text-stone-500 font-medium"
          >
            <span>{journalingBlogPosts.length} in-depth guides</span>
            <span className="text-stone-300">|</span>
            <span>{categories.length - 1} categories</span>
            <span className="text-stone-300">|</span>
            <span>Updated March 2026</span>
          </motion.div>
        </div>
      </motion.section>

      {/* Trust Badges */}
      <section className="py-6 bg-white border-y-2 border-stone-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <div className="flex items-center gap-2 text-stone-700">
              <Shield className="w-5 h-5 text-[#1b8af1]" />
              <span className="font-bold text-sm">HIPAA Secure</span>
            </div>
            <span className="text-stone-300">•</span>
            <div className="flex items-center gap-2 text-stone-700">
              <Brain className="w-5 h-5 text-[#1b8af1]" />
              <span className="font-bold text-sm">AI-Powered Insights</span>
            </div>
            <span className="text-stone-300">•</span>
            <div className="flex items-center gap-2 text-stone-700">
              <Star className="w-5 h-5 text-[#1b8af1]" />
              <span className="font-bold text-sm">Loved by Thousands</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {isDefaultView && (
        <section className="py-16 bg-[#FAF9F6]">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <Link to={`/app/blog/${featuredPost.slug}`}>
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-white p-8 md:p-12 rounded-xl border-2 border-stone-900 shadow-[8px_8px_0px_0px_rgba(28,25,23,1)] hover:shadow-[8px_8px_0px_0px_#1b8af1] transition-all group"
                >
                  <div className="grid md:grid-cols-[1fr,auto] gap-8 items-center">
                    <div>
                      <div className="inline-flex items-center gap-2 text-[#1b8af1] text-xs font-bold uppercase tracking-wider mb-4">
                        <Sparkles className="w-4 h-4" /> Featured Guide
                      </div>
                      <span
                        className={`inline-flex px-3 py-1 rounded-lg text-xs font-bold border-2 mb-4 ${
                          getCategoryColor(featuredPost.category).bg
                        } ${getCategoryColor(featuredPost.category).text} ${
                          getCategoryColor(featuredPost.category).border
                        }`}
                      >
                        {featuredPost.category}
                      </span>
                      <h2 className="text-2xl md:text-4xl font-black text-stone-900 mb-4 tracking-tight font-serif group-hover:text-[#1b8af1] transition-colors">
                        {featuredPost.title}
                      </h2>
                      <p className="text-lg text-stone-600 mb-6 leading-relaxed font-medium">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-stone-500 font-medium mb-6">
                        <span>{featuredPost.author}</span>
                        <span className="text-stone-300">·</span>
                        <span>{featuredPost.date}</span>
                        <span className="text-stone-300">·</span>
                        <span>{featuredPost.readTime}</span>
                      </div>
                      <span className="inline-flex items-center px-6 py-3 bg-stone-900 text-white rounded-xl font-bold border-2 border-stone-900 shadow-[4px_4px_0px_0px_#1b8af1] group-hover:bg-[#1b8af1] transition-all gap-2">
                        Read article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                    <div className="hidden md:flex w-48 h-48 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl border-2 border-stone-200 items-center justify-center">
                      <BookOpen className="w-20 h-20 text-[#1b8af1]/40" />
                    </div>
                  </div>
                </motion.article>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-8 bg-[#FAF9F6]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 rounded-lg whitespace-nowrap text-sm font-bold border-2 transition-all ${
                    selectedCategory === category
                      ? 'bg-stone-900 text-white border-stone-900 shadow-[4px_4px_0px_0px_#1b8af1]'
                      : 'bg-white text-stone-700 border-stone-200 hover:border-stone-900 hover:shadow-[2px_2px_0px_0px_rgba(28,25,23,1)]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="pb-24 bg-[#FAF9F6]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {gridPosts.length === 0 ? (
              <div className="bg-white rounded-xl border-2 border-dashed border-stone-300 p-16 text-center">
                <p className="text-stone-500 text-lg font-medium">
                  No posts matched your filter. Try another category or keyword.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {gridPosts.map((post, index) => {
                  const colors = getCategoryColor(post.category);
                  return (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <Link
                        to={`/app/blog/${post.slug}`}
                        className="block bg-white rounded-xl border-2 border-stone-200 p-6 hover:border-stone-900 hover:shadow-[6px_6px_0px_0px_rgba(28,25,23,1)] hover:-translate-y-1 transition-all group h-full"
                      >
                        <span
                          className={`inline-flex px-3 py-1 rounded-lg text-xs font-bold border-2 mb-4 ${colors.bg} ${colors.text} ${colors.border}`}
                          style={{ boxShadow: `3px 3px 0px 0px ${colors.shadow}` }}
                        >
                          {post.category}
                        </span>
                        <h3 className="text-xl font-bold text-stone-900 mb-3 leading-snug group-hover:text-[#1b8af1] transition-colors font-serif">
                          {post.title}
                        </h3>
                        <p className="text-stone-600 leading-relaxed mb-5 font-medium">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-stone-400 font-medium">
                            {post.date} · {post.readTime}
                          </span>
                          <span className="inline-flex items-center text-[#1b8af1] font-bold text-sm gap-1 group-hover:gap-2 transition-all">
                            Read <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </Link>
                    </motion.article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white border-t-2 border-stone-200">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-[#FAF9F6] p-8 md:p-12 rounded-xl border-2 border-stone-900 shadow-[8px_8px_0px_0px_rgba(28,25,23,1)]">
              <h2 className="text-3xl md:text-4xl font-black text-stone-900 mb-4 tracking-tight font-serif">
                Ready to Start Journaling?
              </h2>
              <p className="text-lg text-stone-600 mb-8 font-medium leading-relaxed">
                Empath makes journaling effortless. Call, text, or type your thoughts and let AI
                help you understand yourself better.
              </p>
              <button
                onClick={handleAppStoreClick}
                className="px-8 py-4 bg-stone-900 text-white rounded-xl font-bold text-lg border-2 border-stone-900 shadow-[6px_6px_0px_0px_#1b8af1] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#1b8af1] transition-all inline-flex items-center gap-3"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                </svg>
                Download Empath Free
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
