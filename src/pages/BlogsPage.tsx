import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

function getCategoryBadgeColor(category: string) {
  const styles: Record<string, string> = {
    'Clinical Practice': 'bg-blue-50 text-blue-700 border-blue-200',
    'Research Insights': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'AI + Clinical Practice': 'bg-violet-50 text-violet-700 border-violet-200',
    'Practice Management': 'bg-amber-50 text-amber-700 border-amber-200',
  };
  return styles[category] ?? 'bg-slate-50 text-slate-700 border-slate-200';
}

export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title =
      'Clinical Insights for Therapists | Empath Blog';
    const description = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement | null;
    if (description) {
      description.content =
        'Evidence-based articles on between-session data, measurement-based care, AI in therapy, and clinical practice — written by clinicians, for clinicians.';
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
        author: { '@type': 'Organization', name: post.author },
        url: `${origin}/blog/${post.slug}`,
        keywords: [post.keyword, post.category, 'mental health'],
      })),
    };
  }, []);

  return (
    <div className="flex-grow">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      {/* Header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="container mx-auto px-4 max-w-5xl py-12 md:py-16">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-3">
            Empath Blog
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            Clinical Insights for Therapists
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mb-8">
            Evidence-based articles on between-session data, measurement-based care, AI in clinical practice,
            and strategies to improve outcomes — written by clinicians, for clinicians.
          </p>

          {/* Search */}
          <div className="max-w-md relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-colors"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
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
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
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
        <div className="border-b border-slate-200 bg-slate-50">
          <div className="container mx-auto px-4 max-w-5xl py-10">
            <Link
              to={`/blog/${featuredPost.slug}`}
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
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight mb-3 group-hover:text-blue-700 transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <span className="font-medium text-slate-700">{featuredPost.author}</span>
                    <span>·</span>
                    <span>{featuredPost.date}</span>
                    <span>·</span>
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
                <div className="hidden md:flex justify-end">
                  <div className="w-full max-w-sm aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg border border-slate-200 flex items-center justify-center">
                    <span className="text-sm text-slate-400 font-medium">Featured</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* Articles Grid */}
      <div className="bg-white">
        <div className="container mx-auto px-4 max-w-5xl py-10 md:py-12">
          {gridPosts.length === 0 ? (
            <div className="rounded-lg border border-dashed border-slate-300 p-12 text-center">
              <p className="text-slate-500">
                No posts matched your filter. Try another category or keyword.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-200">
              {gridPosts.map((post) => (
                <article key={post.id} className="py-6 first:pt-0 last:pb-0">
                  <Link
                    to={`/blog/${post.slug}`}
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
                          <span className="text-xs text-slate-400">{post.readTime}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-1.5 group-hover:text-blue-700 transition-colors leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-2">
                          {post.excerpt}
                        </p>
                        <div className="text-xs text-slate-400">
                          {post.author} · {post.date}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors flex-shrink-0 mt-2" />
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
