// App screenshot in a calm phone frame. Sources live in public/app-screens
// as 660px-wide webp (1290x2796 originals), so the frame keeps that ratio.
export default function PhoneScreenshot({
  src,
  alt,
  className = '',
  eager = false,
}: {
  /** Path under public/, e.g. "/app-screens/home-mood.webp" */
  src: string;
  alt: string;
  className?: string;
  /** Load immediately (above the fold) instead of lazily. */
  eager?: boolean;
}) {
  return (
    <div className={`rounded-[2.25rem] border border-stone-200 bg-white p-2 shadow-lift ${className}`}>
      <img
        src={src}
        alt={alt}
        width={660}
        height={1430}
        loading={eager ? 'eager' : 'lazy'}
        className="block aspect-[1290/2796] w-full rounded-[1.75rem] object-cover object-top"
      />
    </div>
  );
}
