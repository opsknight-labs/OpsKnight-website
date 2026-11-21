import { ClipboardCheck, KeyRound, ScrollText, SlidersHorizontal } from "lucide-react";
import { productDocs } from "@/lib/product";
import { HomeInstall } from "@/components/site/HomeInstall";
import { SectionIntro, TextLink } from "@/components/site/Primitives";

// Commands copied from docs/v2.2.0/guides/mcp/clients (Claude Code and Cursor).
const CONNECT = `# Claude Code
claude mcp add --scope user --transport http opsknight \\
  'https://ops.your-company.com/mcp'

# Cursor: ~/.cursor/mcp.json
{
  "mcpServers": {
    "opsknight": { "url": "https://ops.your-company.com/mcp" }
  }
}`;

// Requests from docs/v2.2.0/guides/mcp/what-to-ask.md.
const ASKS = [
  "What did I miss overnight, and what paged me?",
  "Who is on call for payments, and who's next?",
  "Investigate incident #A1B2C: what happened, what changed, anything related?",
  "Acknowledge it and add a note that I'm looking at the database.",
] as const;

// Backed by docs/v2.2.0/guides/mcp/README.md, self-hosted-setup.md and security-and-data.md.
const SAFETY = [
  [KeyRound, "Per-person OAuth", "Each person signs in as themselves. The assistant gets that person's current permissions, never more."],
  [SlidersHorizontal, "Scoped capabilities", "Administrators set the permission ceiling. People approve what each assistant may do, or connect it view-only."],
  [ClipboardCheck, "Reviewed writes", "Changes are off until an administrator allows them. Configuration changes and runbook runs wait for a human reviewer."],
  [ScrollText, "Audited", "Consent, revocations, approvals, committed changes and sensitive reads are recorded in the audit log."],
] as const;

export function HomeMcp() {
  return (
    <section id="mcp" className="site-section site-light-alt home-mcp home-chapter">
      <div className="site-container">
        <div className="home-mcp-grid">
          <div className="home-mcp-copy">
            <SectionIntro
              eyebrow="New in 2.2 · AI assistants (MCP)"
              title="Ask your incident platform, from the assistant you already use."
            >
              OpsKnight is a Model Context Protocol server. Connect Claude,
              ChatGPT, Cursor, VS Code or any MCP client to read incidents,
              on-call and services, and to take changes your team reviews.
            </SectionIntro>
            <ul className="home-mcp-asks" aria-label="Example requests">
              {ASKS.map((ask) => (
                <li key={ask}>“{ask}”</li>
              ))}
            </ul>
            <div className="home-mcp-links">
              <TextLink href={productDocs("guides/mcp/README")}>Read the MCP guide</TextLink>
              <TextLink href="/product/mcp/">How MCP works in OpsKnight</TextLink>
            </div>
          </div>
          <HomeInstall command={CONNECT} label="Connect an assistant" codeLabel="MCP connection commands for Claude Code and Cursor">
            <p className="home-install-next">
              Use the server URL from <strong>Settings → Integrations &amp; ChatOps → MCP</strong>,
              then sign in to OpsKnight in the browser and approve the connection.
            </p>
            <div className="home-install-foot">
              <span>Guides for Claude, ChatGPT, VS Code, Codex CLI, Gemini CLI and Windsurf.</span>
              <TextLink href={productDocs("guides/mcp/clients/README")}>Client setup</TextLink>
            </div>
          </HomeInstall>
        </div>
        <dl className="home-mcp-safety">
          {SAFETY.map(([Icon, term, body]) => (
            <div key={term}>
              <dt>
                <span className="home-icon" aria-hidden="true"><Icon size={16} /></span>
                {term}
              </dt>
              <dd>{body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
