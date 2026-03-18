import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  ArrowUpRight,
  BookOpenText,
  ChevronRight,
  Compass,
  Search,
  Sparkles,
} from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

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

export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    document.title =
      'Mental Health Guides, Prompts, and Therapy Resources | Empath Blog';
    const description = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement | null;
    if (description) {
      description.content =
        'Explore practical mental health guides, therapy prep checklists, journal prompts, and psychology resources from Empath.';
    }
  }, []);

  const categories = useMemo(() => {
    const set = new Set(blogPosts.map((post) => post.category));
    return ['All', ...Array.from(set)];
  }, []);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const search = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !search ||
        post.title.toLowerCase().includes(search) ||
        post.excerpt.toLowerCase().includes(search);
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const featuredPost = blogPosts[0];
  const spotlightPosts = blogPosts.slice(1, 4);
  const isDefaultView = !searchTerm && selectedCategory === 'All';
  const gridPosts = isDefaultView ? filteredPosts.slice(1) : filteredPosts;

  const blogSchema = useMemo(() => {
    const origin =
      typeof window !== 'undefined' ? window.location.origin : 'https://myempath.co';
    const toDateValue = (value: string) => {
      const parsed = Date.parse(value);
      return Number.isNaN(parsed) ? value : new Date(parsed).toISOString();
    };
    return {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Empath Blog',
      description:
        'Mental health guides, therapy resources, and journaling articles.',
      blogPost: blogPosts.map((post) => ({
        '@type': 'BlogPosting',
        headline: post.seoTitle,
        description: post.metaDescription,
        datePublished: toDateValue(post.date),
        author: {
          '@type': 'Organization',
          name: post.author,
        },
        url: `${origin}/blog/${post.slug}`,
        keywords: [post.keyword, post.category, 'mental health'],
      })),
    };
  }, []);

  return (
    <div className="flex-grow overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

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
                Empath Blog
              </motion.p>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-10 leading-tight">
                <motion.div
                  className="relative mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="text-slate-900 font-bold tracking-tight">
                    Clear, Practical
                  </span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="text-slate-600 font-light tracking-tight text-3xl sm:text-4xl md:text-5xl">
                    Mental Health Guides
                  </span>
                </motion.div>
              </h1>

              <motion.p
                className="text-xl sm:text-2xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                Evidence-informed articles on journaling, anxiety, therapy preparation, and
                skills you can{' '}
                <span className="text-slate-900 font-medium">actually use between sessions</span>.
              </motion.p>

              {/* Search */}
              <motion.div
                className="max-w-xl mx-auto relative"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search topics, prompts, or guides..."
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-lg shadow-slate-200/50 text-lg"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </motion.div>

              {/* Stats */}
              <motion.div
                className="flex justify-center gap-8 mt-8 text-sm text-slate-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
              >
                <span>{blogPosts.length} long-form articles</span>
                <span className="text-slate-300">|</span>
                <span>{categories.length - 1} focused categories</span>
                <span className="text-slate-300">|</span>
                <span>Updated March 2026</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Featured + Spotlight */}
      {isDefaultView ? (
        <AnimatedSection className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.5fr,1fr] gap-8">
              {/* Featured */}
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 md:p-10 shadow-xl border border-slate-700 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 text-blue-300 text-sm uppercase tracking-wide font-medium mb-6">
                    <Sparkles className="w-4 h-4" />
                    Featured Guide
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-slate-300 leading-relaxed mb-6 font-light text-lg">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400 mb-8">
                    <span>{featuredPost.author}</span>
                    <span className="text-slate-600">·</span>
                    <span>{featuredPost.date}</span>
                    <span className="text-slate-600">·</span>
                    <span>{featuredPost.readTime}</span>
                  </div>
                  <Link
                    to={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-slate-900 font-medium hover:bg-slate-100 transition-all group/btn"
                  >
                    Read featured article
                    <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.article>

              {/* Spotlight */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 shadow-lg">
                <div className="inline-flex items-center gap-2 text-sm uppercase tracking-wide text-slate-500 font-medium mb-6">
                  <Compass className="w-4 h-4" />
                  Start Here
                </div>
                <div className="space-y-4">
                  {spotlightPosts.map((post) => (
                    <Link
                      key={post.id}
                      to={`/blog/${post.slug}`}
                      className="block rounded-lg border border-slate-200 p-5 hover:border-blue-300 hover:bg-blue-50/30 hover:shadow-md transition-all duration-300 group"
                    >
                      <p
                        className={`inline-flex text-xs font-semibold px-2.5 py-1 rounded-full border mb-2.5 ${getCategoryBadgeColor(
                          post.category
                        )}`}
                      >
                        {post.category}
                      </p>
                      <h3 className="text-base font-semibold text-slate-900 leading-snug mb-1.5 group-hover:text-blue-700 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-slate-500">{post.readTime}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      ) : null}

      {/* Category Filter + Grid */}
      <AnimatedSection className={`${isDefaultView ? 'pb-24' : 'py-16'} bg-gradient-to-b from-white to-gray-50`}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Category Pills */}
            <div className="mb-10">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`px-5 py-2.5 rounded-lg whitespace-nowrap text-sm font-medium border transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Posts Grid */}
            {gridPosts.length === 0 ? (
              <div className="rounded-xl border-2 border-dashed border-slate-300 bg-white p-16 text-center">
                <p className="text-slate-500 text-lg">
                  No posts matched your filter. Try another category or keyword.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gridPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100/30 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10">
                      <p
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold border mb-4 ${getCategoryBadgeColor(
                          post.category
                        )}`}
                      >
                        {post.category}
                      </p>
                      <h3 className="text-xl font-semibold text-slate-900 leading-snug mb-3 group-hover:text-blue-700 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed mb-5">
                        {post.excerpt}
                      </p>
                      <div className="text-sm text-slate-400 mb-5">
                        {post.author} · {post.date} · {post.readTime}
                      </div>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors group/link"
                      >
                        Read article
                        <ArrowUpRight className="w-4 h-4 ml-1 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
