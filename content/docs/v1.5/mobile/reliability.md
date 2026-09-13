---
order: 2
title: PWA reliability and offline behavior
description: Understand service-worker caching, queued responder actions, retries, conflicts, authentication failures, and PWA update safety.
---

# PWA reliability and offline behavior

OpsKnight v1.5 treats mobile response actions as operational commands, not as optimistic UI gestures. The design favors explicit state, idempotency, and conflict detection over pretending an offline action succeeded.

## Authoritative data boundaries

Dynamic authenticated pages, React Server Component traffic, and API requests are handled as network-only traffic by the production service worker. They are not used as long-lived service-worker authority after sign-out, role changes, or account revocation.

Static application assets can still be cached for performance. Selected mobile lists can also keep a separate last-known browser cache for usability, but those records are informational and can be stale.

When the network is available, the server remains authoritative.

## What can be queued

The mobile incident list can queue supported status mutations such as acknowledgement, snooze, and resolution. Some notification-state operations can also use the offline request queue.

Do not assume that every mobile write is queueable. Incident creation, notes, assignment changes, administrative changes, and other workflows require an online server response unless the UI explicitly reports that the action was queued.

## Queued does not mean committed

The user-facing states are intentionally different:

- **Committed** — OpsKnight received an authoritative successful server response.
- **Queued** — the browser stored an operation that still needs server confirmation.
- **Conflict** — the server state no longer matches the state the action expected.
- **Sign-in required** — the current authentication state cannot authorize replay.
- **Failed** — the queued request reached a terminal non-retryable failure.

The mobile UI should not permanently display a queued status mutation as if the incident were already changed on the server.

## Ambiguous network failures

A mobile request can fail at the browser after the server has already committed it. For example, the radio can change networks or a proxy can reset the connection after the request reached OpsKnight but before the response returned.

For supported status mutations, OpsKnight treats this as an ambiguous outcome:

1. the first request receives a unique idempotency key;
2. if the browser cannot confirm the response, it stores the same request with the same key;
3. replay sends the same key again;
4. the server can return the previously completed result instead of applying duplicate lifecycle side effects.

This is why a network error should not be retried by creating a brand-new command immediately.

## Expected-state conflicts

Supported incident status commands carry the state the responder acted on when that state is known.

Example:

```text
Responder A sees OPEN
Responder B acknowledges the incident
Responder A's delayed OPEN → RESOLVED command reaches the server
```

OpsKnight can reject the stale transition as a conflict rather than overwriting the newer state silently. The responder must open the incident, inspect the latest state and timeline, and decide what action is still appropriate.

## FIFO replay and dependent actions

The queue is processed in creation order. This matters because responder commands can depend on previous state transitions.

If an earlier item enters `CONFLICT` or `AUTH_REQUIRED`, OpsKnight stops automatic progression instead of allowing later commands to leapfrog a state that was never established.

When a responder successfully signs in again and the authenticated mobile shell is restored, eligible `AUTH_REQUIRED` entries are moved back to `PENDING`. They keep their original idempotency key, expected state, body, and creation order, then pass through the same normal replay loop. `CONFLICT` and terminal `FAILED` entries are not reset by authentication recovery.

## Retry policy

Transient failures remain retryable. The queue uses bounded exponential backoff and honors `Retry-After` for rate limiting.

A queued request is marked `SENDING` while an attempt is active. If a browser or worker is terminated during that attempt, OpsKnight recovers a stale `SENDING` lease back to `PENDING` so the action does not remain stuck forever.

## Background Sync is an enhancement

Browsers do not provide identical background-execution capabilities. OpsKnight can replay through Background Sync where supported, but foreground recovery remains important.

The mobile coordinator also reacts when the browser comes online and exposes queue status to the responder. An online **Retry** action is available when pending items remain. Re-entering the authenticated mobile shell also resumes eligible authentication-blocked entries.

Never base an incident-response process on the assumption that a mobile operating system will wake a background web app at a particular time.

## Push action reliability

Current incident push messages include a versioned action contract, a stable notification identity, the incident state, and a same-origin destination.

For a supported **Acknowledge** action:

- the worker sends the canonical incident-status request;
- the request has a stable idempotency key derived from the notification delivery identity;
- the known incident state is used as an expected-state condition when possible;
- `401` sends the responder through sign-in;
- `403` is reported as unauthorized;
- `409` is reported as a state conflict; and
- a transport failure can be persisted for later replay using the same idempotency key.

Unknown future push-contract versions are display-only for action purposes. The worker opens the incident instead of executing action semantics it does not understand.

## Trusted installed-PWA sessions

OpsKnight does not infer trust from a mobile user agent. A normal browser uses the standard credential-session policy unless the user explicitly selects **Remember me**.

When the canonical login is running inside an installed standalone PWA, OpsKnight recognizes that explicit application context and defaults **Trusted responder device** on for credential sign-in. The responder can turn it off before authenticating. The trusted responder session is bounded to the configured long-lived credential window (90 days by default in v1.5), while logout and server-side revocation controls remain authoritative.

OIDC sessions continue to follow enterprise SSO policy rather than using the credential trusted-device duration.

## Safe PWA updates

OpsKnight does not call `skipWaiting()` automatically for a newly installed service worker during an active responder session.

A waiting update is surfaced in the mobile UI. The responder chooses **Reload** when it is safe to replace the current worker and document.

This avoids upgrading the application underneath an in-progress acknowledgement, resolution note, or investigation workflow.

## Last-known browser data

Some mobile list views can retain last-known data in browser storage. Treat it as a convenience snapshot only:

- it can be stale;
- browser storage can be cleared or evicted;
- it does not prove a current incident state;
- it does not replace the server-side timeline; and
- browser-side encryption is not a substitute for device encryption or MDM.

For acknowledgement, ownership, and resolution decisions, reconnect and verify the live incident whenever possible.

## Operational acceptance checklist

Before declaring the PWA production-ready for a responder group:

- [ ] Authenticated pages and APIs are not served from a stale service-worker runtime cache.
- [ ] Login is shared with the desktop authentication implementation.
- [ ] Installed standalone PWAs default to the trusted responder credential policy without using mobile user-agent detection.
- [ ] The trusted-device control remains visible and can be disabled on a shared device.
- [ ] Push permission is requested from an explicit user action.
- [ ] Push deep links stay on the OpsKnight origin.
- [ ] A notification acknowledgement produces one server lifecycle change even after a retry.
- [ ] Offline incident actions are visibly queued, not shown as committed.
- [ ] Reconnect replay succeeds on representative Android and iPhone devices.
- [ ] `AUTH_REQUIRED` actions resume safely after successful sign-in with the original idempotency key.
- [ ] Conflicts remain blocked for responder review after reauthentication.
- [ ] A production-build browser test exercises the generated service worker rather than only `next dev`.
- [ ] A worker update waits for responder approval before activation.
- [ ] Portrait and landscape layouts have no blocking horizontal overflow.

## Related topics

- [Mobile & PWA](./README)
- [Mobile setup](./setup)
- [First Steps](../getting-started/first-steps)
