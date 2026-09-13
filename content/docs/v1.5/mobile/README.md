---
order: 9
title: Mobile & PWA
description: Use OpsKnight on phones and installed PWAs with secure sessions, push actions, and conflict-safe offline responder workflows.
---

# Mobile & PWA

OpsKnight v1.5 provides a responder-focused mobile experience under `/m`. It uses the same users, roles, authorization rules, incident lifecycle, and authentication implementation as the desktop application rather than maintaining a separate mobile security model.

Use mobile for active incident response, notification triage, on-call checks, and operational read views. Use desktop for configuration workflows that do not expose a mobile editor.

Start with [Mobile setup](./setup), then read [PWA reliability and offline behavior](./reliability) before enabling mobile response for a production on-call team.

## One authentication path

Mobile and desktop use the same canonical sign-in page. `/m/login` exists only as a compatibility route for older bookmarks and installed PWAs; it renders the normal OpsKnight login implementation.

For credential sign-in, ordinary browser sessions use the standard bounded session policy. When OpsKnight is running as an installed standalone PWA, the canonical login recognizes that explicit installation context as a trusted responder-device context and defaults the longer **Trusted responder device** session on. The control remains visible so the responder can turn it off on a shared or unmanaged device.

This is not mobile user-agent detection: opening OpsKnight in a normal phone browser does not silently extend the session just because the browser looks mobile. The installed-PWA signal comes from standalone display mode (including the iOS Home Screen standalone mode). OIDC sessions continue to follow the configured enterprise SSO session policy.

The trusted credential session is bounded to the configured long-lived responder window (90 days by default in v1.5). Logout, password/security revocation, user disablement, token-version invalidation, and normal session-expiry enforcement remain authoritative.

## Responsive behavior

The v1.5 PWA manifest does not force portrait orientation. The mobile shell is expected to adapt across common phone widths and portrait or landscape orientation.

The installed app starts at `/m` and provides shortcuts for:

- active incidents;
- on-call schedules; and
- notifications.

OpsKnight's browser CI covers representative Chromium/Android-style and WebKit/iPhone-style mobile viewports. A separate production-PWA lane builds the application, starts the production server, verifies the generated service worker controls the app, verifies dynamic/authenticated routes stay out of CacheStorage, and proves an allowed static asset can be served through the worker offline. Real-device acceptance testing is still required because installation, notification presentation, background execution, and operating-system permission behavior are platform controlled.

## Core mobile routes

| Route | Primary use | Connectivity boundary |
| --- | --- | --- |
| `/m` | Responder dashboard, on-call context, recent incidents | Live operational data is authoritative |
| `/m/incidents` | Filter incidents and perform supported quick status actions | Supported quick actions can enter the offline queue |
| `/m/incidents/[id]` | Inspect an incident and perform full incident response | Treat detail-page writes as online unless the UI explicitly says they were queued |
| `/m/services` | Inspect services and related incidents | Configuration remains a desktop workflow |
| `/m/notifications` | Review alerts and notification state | Some notification-state writes can be queued |
| `/m/schedules` | Inspect current on-call and rotations | Schedule editing remains a desktop workflow |
| `/m/policies` | Inspect escalation policy steps and targets | Policy editing remains a desktop workflow |
| `/m/teams` | Inspect teams and members | Team administration remains a desktop workflow |
| `/m/users` | Inspect responders and memberships | User administration remains a desktop workflow |
| `/m/more` | PWA, push, theme, app-lock, help, and desktop-mode controls | Some controls depend on browser capability |

Route visibility never grants authorization. Server-side permission checks remain authoritative for every action.

## Push notifications

OpsKnight Web Push is delivered through the PWA service worker and does not require the mobile page to remain open in the foreground.

Notification permission is requested only after a user action. Browsers can permanently suppress repeat permission prompts after a denial, so enable notifications deliberately from the OpsKnight mobile controls and manage blocked permissions from browser or operating-system settings.

Incident push payloads use a versioned contract. Current workers validate deep links as same-origin and disable action buttons for unknown future payload versions rather than executing semantics they do not understand.

For supported incident notifications, the worker can expose **View** and **Acknowledge** actions. Acknowledge is sent through the same canonical incident-status API used by the application and carries an idempotency key plus the expected incident state. This prevents a retry from creating duplicate lifecycle side effects and detects when another responder changed the incident first.

Browser notification action support varies. When an action is unavailable, opening the notification remains the fallback path.

## Offline responder actions

Offline support is deliberately narrow and explicit. OpsKnight is not a fully offline incident-management system.

Supported incident-list status actions use a durable IndexedDB queue with states including:

```text
PENDING → SENDING → SUCCEEDED
                    ↘ CONFLICT
                    ↘ AUTH_REQUIRED
                    ↘ FAILED
```

An action marked **queued** is not committed. The mobile shell keeps the last confirmed incident state visible and displays a responder-action notice until the server confirms the mutation.

The queue is designed for unreliable mobile networks:

- a request that fails before any server response is treated as an ambiguous outcome;
- the exact same idempotency key is persisted for replay, because the server may already have committed the first attempt;
- interrupted `SENDING` entries are recovered after a lease timeout instead of remaining stuck forever;
- retryable failures use bounded backoff and honor `Retry-After` for rate limiting;
- authorization failures and state conflicts stop automatic FIFO progression so later dependent actions do not leapfrog an unresolved action; and
- after successful reauthentication, eligible `AUTH_REQUIRED` entries return to `PENDING` and re-enter the same ordered/idempotent replay path. `CONFLICT` and terminal `FAILED` entries are not revived automatically.

After reconnecting, confirm the incident timeline before treating a queued response as complete.

## Service-worker updates

OpsKnight does not force a newly downloaded service worker to take over an in-progress responder workflow. When an update is waiting, the mobile shell displays **OpsKnight update ready** and lets the responder choose when to reload.

Dynamic authenticated pages, RSC responses, and API requests use network-only service-worker handling. Static application assets can be cached, but an authenticated HTML response or API response must not be served as stale authority after sign-out or account changes.

## Device security

Treat an installed OpsKnight PWA like any other authenticated operations application:

- use a device passcode or biometric screen lock;
- do not share an authenticated installation between responders;
- keep **Trusted responder device** enabled only on a device you control;
- turn the trusted-device option off when signing in on a shared or unmanaged installation;
- sign out before transferring or retiring a device;
- clear site data when decommissioning the installation; and
- use MDM, device encryption, and remote wipe where your organization requires them.

The local mobile app-lock feature is an additional privacy screen. It does not replace OpsKnight authentication, server-side session revocation, device security, or enterprise device management.

## Related topics

- [Mobile setup](./setup)
- [PWA reliability and offline behavior](./reliability)
- [Getting Started](../getting-started/README)
- [First Steps](../getting-started/first-steps)
- [v1.4 notification-provider reference](/docs/v1.4/administration/notifications)
