import type { JournalingBlogChart } from '../data/journalingBlogPosts';

const ACCENT = '#1b8af1';
const MUTED = '#a8a29e'; // stone-400, de-emphasis context bars only, always direct-labeled

/**
 * Dependency-free horizontal bar chart for blog articles. Single accent hue
 * (optionally a muted gray for reference/context bars), bars grow from a
 * hairline baseline with a rounded data-end, and every bar is direct-labeled
 * so nothing relies on color alone.
 */
export default function BlogChart({ chart }: { chart: JournalingBlogChart }) {
  const max = chart.maxValue ?? Math.max(...chart.data.map((d) => d.value));
  // Cap bar width so the longest bar still leaves room for its value label.
  const widthPct = (value: number) => Math.max((value / max) * 74, 1.5);

  return (
    <figure className="my-10 rounded-2xl border border-stone-200 bg-white p-6 md:p-7">
      <p className="text-lg md:text-xl font-medium tracking-tight text-stone-900 mb-5 font-serif">
        {chart.title}
      </p>
      <div
        role="img"
        aria-label={`${chart.title}. ${chart.data
          .map((d) => `${d.label}: ${d.display}`)
          .join('. ')}.`}
        className="border-l border-stone-300"
      >
        <div className="space-y-4 py-1">
          {chart.data.map((d) => (
            <div key={d.label} className="pl-3" title={`${d.label}: ${d.display}`}>
              <p className="text-sm font-medium text-stone-700 mb-1.5 leading-snug">{d.label}</p>
              <div className="flex items-center">
                <div
                  className="h-5 rounded-r shrink-0"
                  style={{
                    width: `${widthPct(d.value)}%`,
                    backgroundColor: d.muted ? MUTED : ACCENT,
                  }}
                />
                <span className="ml-2 text-sm font-semibold text-stone-900 whitespace-nowrap">
                  {d.display}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <figcaption>
        <p className="text-sm text-stone-500 mt-5 leading-6">{chart.caption}</p>
        <p className="text-xs text-stone-400 mt-2">{chart.source}</p>
      </figcaption>
    </figure>
  );
}
