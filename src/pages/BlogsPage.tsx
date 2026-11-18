import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import SEO from '../components/SEO';
import TherapistHeader from '../components/therapist/TherapistHeader';
import TherapistFooter from '../components/therapist/TherapistFooter';

// Shared type styles, matching the home page and /therapist.
const EYEBROW = 'text-xs font-semibold uppercase tracking-[0.18em] text-[#1b8af1]';

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
        'Evidence-based articles on between-session data, measurement-based care, AI in therapy, and clinical practice, written by clinicians, for clinicians.';
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
    <div className="flex-grow bg-[#FAF9F6] text-stone-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <SEO
        title="Empath Blog | Research & Practice Insights for Therapists"
        description="Evidence-based articles on between-session data, therapeutic alliance, AI in clinical practice, and the science of therapy outcomes."
        path="/blog"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <TherapistHeader />

      {/* Header */}
      <div className="container mx-auto px-4 max-w-5xl pt-16 pb-12 md:pt-24">
        <p className={EYEBROW}>Empath Blog</p>
        <h1 className="mt-4 font-serif text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] text-stone-900">
          Clinical Insights for Therapists
        </h1>
        <p className="mt-6 text-lg text-stone-600 leading-relaxed max-w-2xl">
          Evidence-based articles on between-session data, measurement-based care, AI in clinical practice,
          and strategies to improve outcomes, written by clinicians, for clinicians.
        </p>

        {/* Search */}
        <div className="mt-10 max-w-md relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search articles..."
            className="w-full pl-11 pr-5 py-3 bg-white border border-stone-200 rounded-full text-sm text-stone-800 placeholder:text-stone-400 focus:border-[#1b8af1] focus:outline-none transition-colors"
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
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                selectedCategory === category
                  ? 'bg-stone-900 text-white border-stone-900'
                  : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400 hover:text-stone-900'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Post */}
      {isDefaultView && (
        <div className="container mx-auto px-4 max-w-5xl pb-6">
          <Link
            to={`/blog/${featuredPost.slug}`}
            className="block group rounded-3xl border border-stone-200 bg-white p-8 md:p-12 shadow-soft"
          >
            <p className={EYEBROW}>{featuredPost.category}</p>
            <h2 className="mt-4 max-w-3xl font-serif text-3xl md:text-4xl font-medium tracking-tight leading-[1.15] text-stone-900 group-hover:text-[#1b8af1] transition-colors">
              {featuredPost.title}
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-stone-600 leading-relaxed">
              {featuredPost.excerpt}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-stone-500">
              <span className="font-medium text-stone-700">{featuredPost.author}</span>
              <span>·</span>
              <span>{featuredPost.date}</span>
              <span>·</span>
              <span>{featuredPost.readTime}</span>
            </div>
          </Link>
        </div>
      )}

      {/* Articles Grid */}
      <div className="container mx-auto px-4 max-w-5xl pt-6 pb-24">
        {gridPosts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-stone-300 p-12 text-center">
            <p className="text-stone-500">
              No posts matched your filter. Try another category or keyword.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {gridPosts.map((post) => (
              <article key={post.id}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-stone-200 bg-white p-7 transition-shadow hover:shadow-soft"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className={EYEBROW}>{post.category}</p>
                    <span className="text-xs text-stone-400 whitespace-nowrap">{post.readTime}</span>
                  </div>
                  <h3 className="mt-4 font-serif text-xl font-medium tracking-tight leading-snug text-stone-900 group-hover:text-[#1b8af1] transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-stone-600 text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto flex items-center justify-between gap-4 pt-6 text-xs text-stone-400">
                    <span>
                      {post.author} · {post.date}
                    </span>
                    <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-[#1b8af1] transition-colors flex-shrink-0" />
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>

      <TherapistFooter />
    </div>
  );
}
