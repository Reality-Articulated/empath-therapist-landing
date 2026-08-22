import { useEffect, useState } from 'react';

const CACHE_KEY = 'empath_geo_country';

function readCachedCountry(): string | null {
  try {
    return sessionStorage.getItem(CACHE_KEY);
  } catch {
    return null;
  }
}

/**
 * Whether the visitor is in the US, via /api/geo (Vercel's edge geo header —
 * no third-party call). Defaults to false until confirmed: US-only CTAs
 * (e.g. the phone-call button) must never flash for a non-US visitor, so
 * "unknown" and "not US" render identically until this resolves.
 */
export function useIsUSVisitor(): boolean {
  const [isUS, setIsUS] = useState(() => readCachedCountry() === 'US');

  useEffect(() => {
    if (readCachedCountry() !== null) return;
    fetch('/api/geo')
      .then((res) => res.json())
      .then((data: { country?: string | null }) => {
        const country = data.country ?? '';
        try {
          sessionStorage.setItem(CACHE_KEY, country);
        } catch {
          // sessionStorage unavailable (private mode etc.) — just skip caching.
        }
        setIsUS(country === 'US');
      })
      .catch(() => {
        // Leave hidden on failure — default-safe, not default-visible.
      });
  }, []);

  return isUS;
}
