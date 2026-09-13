---
order: 1
title: Mobile setup
description: Install OpsKnight as a trusted responder PWA, enable push, and verify the end-to-end incident path.
---

# Mobile setup

Set up one responder device first, prove the complete notification and response path, and then repeat the same acceptance test for the rest of the on-call team.

## Before you start

Ask an OpsKnight administrator to confirm:

- the deployment is served over HTTPS;
- production PWA generation is enabled (`DISABLE_PWA` is not `true`);
- `/manifest.webmanifest`, `/sw.js`, and `/custom-sw.js` are reachable;
- Web Push has a valid VAPID public/private key pair; and
- your account is a valid target for a synthetic incident through the intended service and escalation policy.

Keep the device operating system and browser current and enable the device screen lock.

## 1. Open the mobile experience

Open:

```text
https://YOUR_OPSKNIGHT_HOST/m
```

Sign in using the same OpsKnight account or OIDC provider used on desktop. `/m/login` is only a compatibility entry point; the actual login UI and policy are shared with the normal `/login` route.

In an ordinary browser, credential sign-in uses the standard bounded session unless you explicitly choose **Remember me**. After OpsKnight is installed and launched in standalone PWA mode, the same login automatically recognizes that installation as a responder-device context and defaults **Trusted responder device** on. That credential session can remain valid for up to 90 days by default. The option remains visible—turn it off before signing in on a shared or unmanaged device.

This behavior is based on installed standalone PWA state, not a mobile user agent. OIDC sign-in continues to follow the workspace's configured enterprise SSO session policy.

## 2. Install the PWA

### iPhone or iPad

Add OpsKnight to the Home Screen, then launch the installed web app before enabling push. Web Push on iOS/iPadOS is associated with Home Screen web apps.

### Android

Open `/m` in a Chromium-based browser and use **Install app** or **Add to Home Screen** when offered. Launch OpsKnight from the installed icon before validating the trusted responder-device session behavior.

### Desktop

Desktop installation is optional. The same PWA can be installed where the browser supports it, while `/m` remains the responder-focused interface.

OpsKnight does not force portrait orientation in v1.5. Verify both portrait and landscape on the devices your team actually uses.

## 3. Enable push notifications

Open **More → Push Notifications** and enable notifications from an explicit user action. Accept the browser or operating-system permission prompt.

If permission is already denied, OpsKnight cannot force the browser to display the prompt again. Change the permission from site, browser, or operating-system settings and retry.

Use the built-in notification test, but do not stop there. A successful test proves only the browser subscription path.

## 4. Prove a real incident notification

1. Trigger a synthetic incident for a service routed to this responder.
2. Put the PWA in the background or close its visible window.
3. Confirm the push notification arrives.
4. Open **View** and verify the notification lands on the intended OpsKnight incident.
5. For a supported triggered notification, test **Acknowledge**.
6. Confirm the server-side incident timeline records the acknowledgement exactly once.
7. Resolve the synthetic incident from OpsKnight and confirm the final timeline.

The notification action uses the normal authenticated incident-status contract. If the OpsKnight session has expired, the worker does not pretend the acknowledgement succeeded; it directs the responder back through sign-in.

## 5. Test an unreliable connection

Use a synthetic incident and briefly take the device offline.

1. From the mobile incident list, perform a supported status action.
2. Confirm OpsKnight says the action is **queued** rather than displaying it as committed.
3. Reconnect the device.
4. Use **Retry** if the queue does not synchronize immediately.
5. Open the incident and confirm the server timeline before considering the response complete.

Also test the authentication-recovery path: allow a queued action to encounter an expired session, confirm it becomes **Sign-in required**, sign in successfully, and verify the operation re-enters the ordered replay path using its original command identity. Then test one conflict case by changing the incident on another browser before replay. A conflict must remain visible for manual resolution instead of being automatically revived after sign-in.

## 6. Test an application update

When a new PWA service worker is available during a session, OpsKnight should display **OpsKnight update ready** rather than reloading the responder automatically.

Finish or save the current operational work, then select **Reload** to activate the waiting worker.

## Device acceptance record

For every browser/device combination you intend to support, record:

- operating system and version;
- browser and version;
- portrait and landscape result;
- installation result;
- trusted responder-device session result;
- notification permission result;
- synthetic incident ID and trigger time;
- push arrival and deep-link result;
- notification acknowledgement result;
- offline queue/reconnect and reauthentication result; and
- update/reload result.

Repeat the acceptance test after major OpsKnight upgrades, browser upgrades, certificate/proxy changes, or VAPID key rotation.

## Common failures

**No install option**

Verify HTTPS, the manifest, the generated service worker, and the browser's own install requirements. Development builds and deployments with `DISABLE_PWA=true` intentionally do not provide the production PWA flow.

**Trusted responder device is not selected**

Confirm that OpsKnight was launched from the installed standalone PWA rather than a normal browser tab. A phone user agent alone does not enable the longer session.

**No notification prompt**

Check whether permission was already allowed or denied. Notification permission must be initiated by a user action and can be blocked by browser or operating-system policy.

**Push test works but incidents do not page**

Check the service escalation policy, active schedule, responder notification preferences, Notification History, and provider delivery logs. A browser subscription does not decide who receives an incident.

**Acknowledge opens sign-in**

The authenticated OpsKnight session is no longer valid. Sign in, open the incident, inspect its current status, and act from the latest server state. Eligible queued `AUTH_REQUIRED` operations are made pending again only after authenticated mobile state is restored.

**Queued action remains unresolved**

Open the mobile queue notice. Authentication-required and conflict states intentionally stop automatic dependent replay. Successful sign-in can resume eligible authentication-blocked operations; a conflict still requires the responder to inspect current server state and decide what to do.

## Next steps

- Read [Mobile & PWA](./README).
- Read [PWA reliability and offline behavior](./reliability).
- Complete the production workflow in [First Steps](../getting-started/first-steps).
