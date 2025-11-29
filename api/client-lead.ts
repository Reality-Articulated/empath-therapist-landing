// Serverless function to log client interest into Airtable
// and trigger an email notification via Resend.
//
// Environment variables required (configure in Vercel dashboard or your .env):
// - AIRTABLE_API_KEY
// - AIRTABLE_BASE_ID
// - AIRTABLE_TABLE_NAME  (e.g. "Client Leads")
// - RESEND_API_KEY
// - NOTIFY_EMAIL_TO      (where you want to receive notifications)
// - NOTIFY_EMAIL_FROM    (verified sender in Resend, e.g. "Empath <noreply@myempath.co>")

const airtableApiKey = process.env.AIRTABLE_API_KEY;
const airtableBaseId = process.env.AIRTABLE_BASE_ID;
const airtableTableName = process.env.AIRTABLE_TABLE_NAME;

if (!airtableApiKey || !airtableBaseId || !airtableTableName) {
  console.warn('Airtable env vars are not fully set. Airtable logging will be disabled.');
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      userEmail,
      therapistEmail,
      noTherapist,
      variant,
      source,
      ...extra
    } = req.body || {};

    if (!userEmail || typeof userEmail !== 'string') {
      return res.status(400).json({ error: 'userEmail is required' });
    }

    const timestamp = new Date().toISOString();

    // Create record in Airtable (if configured)
    let airtableOk = false;
    if (airtableApiKey && airtableBaseId && airtableTableName) {
      const airtableUrl = `https://api.airtable.com/v0/${airtableBaseId}/${encodeURIComponent(
        airtableTableName
      )}`;

      const airtableResponse = await fetch(airtableUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            'User Email': userEmail,
            'Therapist Email': noTherapist ? 'No therapist' : therapistEmail || '',
            'No Therapist': noTherapist ? 'Yes' : 'No',
            Variant: variant || 'control',
            Source: source || 'Client Info Page',
            SubmittedAt: timestamp,
            ...(Object.keys(extra).length
              ? { 'Additional Data': JSON.stringify(extra, null, 2) }
              : {}),
          },
        }),
      });

      airtableOk = airtableResponse.ok;

      if (!airtableOk) {
        console.error('Failed to create Airtable record', await airtableResponse.text());
      }
    }

    // Respond back to the client
    return res.status(200).json({
      success: true,
      airtableLogged: airtableOk,
    });
  } catch (error) {
    console.error('Error in client-lead handler:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

