---
title: Configuration
description: Configure the minimum required environment safely, then add production settings deliberately.
order: 4
---

# Configuration

Start with the smallest valid configuration, verify the incident workflow, and only then add production-specific providers, SSO, public URLs, retention, and deployment controls.

## Minimum local configuration

For the Docker Compose quickstart, create `.env` from the repository example:

```bash
cp env.example .env
```

Generate secrets outside the dotenv file:

```bash
openssl rand -base64 32
openssl rand -hex 32
```

Set the local application URLs and generated values:

```dotenv
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_SECRET=PASTE_BASE64_OUTPUT
ENCRYPTION_KEY=PASTE_64_HEX_CHARACTER_OUTPUT
```

Dotenv files do not execute shell substitutions. Generate values first and paste the resulting strings.

## Configuration principles

For production environments:

- use a secret manager or orchestrator secret object instead of committing `.env` files;
- use strong, unique values for authentication and encryption secrets;
- set application URLs to the canonical externally reachable HTTPS origin;
- keep database credentials scoped to the OpsKnight deployment;
- configure provider credentials only for notification or integration channels you actually use;
- document which team owns each external credential and its rotation process;
- validate configuration changes with a synthetic incident before relying on them for paging.

## Database configuration

The Docker Compose stack builds the container-side database connection from the PostgreSQL settings provided by the Compose environment. For the local quickstart, you should not need to rewrite the host-development database example merely to start the bundled stack.

Production database sizing, pooling, persistence, backups, and high availability depend on your deployment platform. Treat those as operational deployment choices rather than first-run requirements.

## Public URLs

When OpsKnight is exposed outside localhost, set the application URL values to the externally reachable HTTPS origin used by responders and integrations. Mismatched public URLs can cause authentication callbacks, generated links, or integration behavior to point at the wrong host.

## Notification and integration secrets

Add provider credentials only after the core UI incident flow works. This makes failures easier to isolate:

1. verify OpsKnight starts;
2. verify a manual incident can be opened, acknowledged, and resolved;
3. add one provider or integration;
4. test that capability independently;
5. continue one dependency at a time.

## Full reference

This v1.5 section is intentionally focused on first-run configuration. Until the complete v1.5 environment reference is published, use the [v1.4 configuration reference](/docs/v1.4/getting-started/configuration) for the exhaustive variable list and deployment-specific settings.

## Next step

Return to [Getting Started](./README) and complete the first incident workflow.