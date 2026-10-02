import { Metadata } from "next";
import { ChangelogView } from "@/components/changelog/ChangelogView";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "What shipped in each OpsKnight release — new integrations, Slack & Teams war rooms, voice paging, security, and tagged GHCR images.",
};

export default function ChangelogPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <ChangelogView />
    </main>
  );
}
