// Returns the visitor's country as seen by Vercel's edge network
// (`x-vercel-ip-country`, populated automatically on every request — no
// third-party geo API needed). Used client-side to gate US-only CTAs
// (e.g. the phone-call button) without ever showing them to non-US
// visitors, even briefly.
interface GeoRequest {
  headers: Record<string, string | string[] | undefined>;
}
interface GeoResponse {
  setHeader(name: string, value: string): void;
  status(code: number): { json(body: unknown): void };
}

export default function handler(req: GeoRequest, res: GeoResponse) {
  const countryHeader = req.headers['x-vercel-ip-country'];
  const country = (Array.isArray(countryHeader) ? countryHeader[0] : countryHeader) || null;
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({ country });
}
