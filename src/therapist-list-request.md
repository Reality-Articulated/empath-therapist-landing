### Therapist marketplace + “join practice” requests (Frontend API guide)

## Goal
This doc explains how a frontend app can:
- Fetch a list of **existing Empath therapists** (marketplace)
- Let a **client select a therapist**
- Send the therapist a **request to join their practice** (client → therapist invitation)

This is based on:
- `backend/controllers/therapists/therapistsController.js`
- `backend/services/inviteService.js`
- `backend/controllers/clients/clientTherapistInviteController.js`
- `backend/controllers/therapists/therapistInviteController.js` (related but separate flow)
- `frontend/src/services/clientTherapistInviteService.ts`

---

## Auth / session requirements
Most endpoints in this flow are protected by `verifyToken`.

### How auth is sent from the frontend
The frontend Axios client (`frontend/src/lib/api.ts`) is configured to:
- send cookies (`withCredentials: true`)
- add `Authorization: Bearer <token>` if a `token` cookie (or `localStorage.token`) exists

So, a frontend must ensure the user is logged in and has a valid token before calling these endpoints.

### Base URL note (to avoid double `/api`)
Backend routes are mounted under `/api/...` (e.g. `/api/therapists/marketplace`). If your frontend code calls paths that already start with `/api/`, set your HTTP client base URL to the backend **origin** (e.g. `http://localhost:4900`) rather than `.../api`, otherwise you can accidentally call `/api/api/...`.

---

## 1) List existing therapists (marketplace)

### Endpoint
- **GET** `/api/therapists/marketplace`

### Auth
- **Required** (`verifyToken`)

### Query params
- **`search`** *(optional)*: free-text filter against therapist name/email/title/specialties

Example:
- `/api/therapists/marketplace?search=trauma`

### Response (200)
Returns a single object:

- **`therapists`**: array of therapist cards, already shaped for frontend use

Each therapist includes:
- **`id`**: therapist id (`therapist_id`)
- **`name`**
- **`email`**
- **`phone`**
- **`title`**
- **`specialties`**: array (parsed from JSON/string)
- **`education`**
- **`yearsOfExperience`**
- **`languages`**: array (parsed from JSON/string)
- **`sessionType`**
- **`sessionFee`**
- **`slidingScale`**: boolean
- **`acceptingClients`**: boolean
- **`schedulingLink`**
- **`profilePicture`**: signed URL (or null)
- **`branding`** *(nullable)*:
  - `practiceName`
  - `practiceEmail`
  - `practicePhone`
  - `practiceAddress`
  - `logoUrl`

Notes:
- Branding is only included if the therapist practice record is **verified**.
- The backend sorts by therapist name.

### Errors
- **500**: `{ message: "Error fetching therapists", error }`

---

## 2) Client selects therapist (frontend data you should store)
When a client taps “Request to join”, you typically only need:
- **`therapistId`** (from marketplace `therapists[i].id`)
- **Optional**: `therapistName` (for UI copy)
- **Optional**: `message` (client’s note to therapist)

You do *not* need therapist email to send a request if you already have the `therapistId`.

---

## 3) Client sends a request to join therapist’s practice

### Endpoint
- **POST** `/api/client-therapist-invites/send`

### Auth
- **Required** (`verifyToken`) as a **client** user

### Request body
The frontend service currently sends:
- **`therapistId`** *(required for marketplace flow)*
- **`message`** *(optional)*

Example:
```json
{
  "therapistId": "<therapist_uuid>",
  "message": "Hi! I’d like to work with you and join your practice on Empath."
}
```

Backend note (supported but not used by the current frontend service):
- The backend also supports inviting by **`therapistEmail`** when `therapistId` is not provided.
- If the email belongs to an existing Empath therapist, the backend responds with a **409** and includes the therapist’s id, telling the frontend to use the marketplace selection.

### Response (200)
```json
{
  "message": "Invitation sent successfully",
  "invitationToken": "<uuid>",
  "expiresAt": "<date>"
}
```

### What happens server-side
- A row is created in `client_therapist_invitations` with status **`pending`** and an expiry (currently **7 days**).
- The therapist receives an email notifying them that the client requested to join their practice.

### Errors to handle
- **400**
  - missing therapist identifier
  - already associated with therapist
  - invalid therapist email (if using email-based invites)
- **404**: `{ message: "Therapist not found" }`
- **409**
  - `{ message: "You already have a pending request with this therapist." }`
  - or (email-based invites) `{ message: "This therapist already has an Empath account. Please select them from the marketplace.", therapistId, therapistName }`
- **429**: `{ message: "You have reached the maximum number of outstanding requests..." }` (max pending invites per client)
- **500**: `{ message: "Internal server error" }`

---

## 4) Client views / withdraws their pending requests

### Get current client pending invitations
- **GET** `/api/client-therapist-invites/client`
- **Auth**: required (client)

Response:
```json
{
  "invitations": [
    {
      "invitation_token": "...",
      "client_id": "...",
      "therapist_id": "...",
      "therapist_email": "...",
      "therapist_name": "...",
      "status": "pending",
      "expires_at": "...",
      "created_at": "...",
      "message": "..."
    }
  ]
}
```

Notes:
- This endpoint returns rows where `status = 'pending'` and does **not** filter by `expires_at`. The frontend should treat an invite as expired if `expires_at` is in the past.

### Withdraw an invitation
- **POST** `/api/client-therapist-invites/withdraw`
- **Auth**: required (client)

Body:
```json
{ "invitationToken": "<uuid>" }
```

Response (200):
```json
{ "message": "Invitation withdrawn successfully" }
```

Common errors:
- **400**: only pending invitations can be withdrawn
- **403**: client does not own that invite
- **404**: invitation not found

---

## 5) Therapist receives and responds to join requests

### Therapist views pending join requests (“notifications”)
- **GET** `/api/client-therapist-invites/notifications`
- **Auth**: required (therapist)

Response:
```json
{ "invitations": [ /* pending invites */ ] }
```

This list includes invites addressed to either:
- the therapist’s `therapist_id`, or
- the therapist’s email (for invites created before the therapist claimed an account / or email-based invites)

### Therapist accepts an invitation
- **POST** `/api/client-therapist-invites/accept`
- **Auth**: required (therapist)

Body:
```json
{ "invitationToken": "<uuid>" }
```

Response (200):
```json
{
  "message": "Invitation accepted successfully",
  "clientId": "...",
  "clientName": "..."
}
```

### Therapist declines an invitation
- **POST** `/api/client-therapist-invites/decline`
- **Auth**: required (therapist)

Body:
```json
{ "invitationToken": "<uuid>" }
```

Response (200):
```json
{ "message": "Invitation declined successfully" }
```

---

## 6) Frontend integration (recommended wiring)

### Use the existing frontend service
`frontend/src/services/clientTherapistInviteService.ts` already wraps the join-request endpoints:
- `sendInvite(therapistId: string, message?: string)` → POST `/api/client-therapist-invites/send`
- `getClientInvitations()` → GET `/api/client-therapist-invites/client`
- `withdrawInvitation(invitationToken: string)` → POST `/api/client-therapist-invites/withdraw`
- `getTherapistNotifications()` → GET `/api/client-therapist-invites/notifications`
- `acceptInvitation(invitationToken: string)` → POST `/api/client-therapist-invites/accept`
- `declineInvitation(invitationToken: string)` → POST `/api/client-therapist-invites/decline`
- (therapist-only) denied consent helpers: `getDeniedConsents()`, `deleteDeniedConsent(...)`

### Minimal client-side UX flow
1. **Load marketplace**
   - Call `GET /api/therapists/marketplace` (optionally with `search`).
2. **Select therapist**
   - Store `therapist.id` and optionally `therapist.name` for UI.
3. **Send request**
   - Call `clientTherapistInviteService.sendInvite(therapistId, message)`.
4. **Show status**
   - Poll or refresh `clientTherapistInviteService.getClientInvitations()` to show pending requests.
5. **Allow withdraw**
   - Call `clientTherapistInviteService.withdrawInvitation(invitationToken)`.

### Minimal therapist-side UX flow
1. **Show join requests**
   - Call `clientTherapistInviteService.getTherapistNotifications()`.
2. **Accept/Decline**
   - Call `acceptInvitation(invitationToken)` or `declineInvitation(invitationToken)`.

---

## Related but separate: therapist → therapist collaboration invites
If you also need the “invite another therapist to collaborate on a client” flow (not the same as a client requesting to join a practice), it lives at:
- Base path: `/api/therapist-invites` (see `backend/routes/therapists/therapistInvites.js`)
- Example endpoints:
  - `POST /api/therapist-invites/send`
  - `GET /api/therapist-invites/sent`
  - `GET /api/therapist-invites/notifications`
  - `POST /api/therapist-invites/accept-from-dashboard`

That flow includes **client approval** before the invited therapist can accept.
