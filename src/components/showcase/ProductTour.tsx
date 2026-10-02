"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Activity, Calendar, MessageSquare, ShieldCheck, BarChart3, Check, Users2 } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { latestDocsHref } from "@/lib/docs/paths";

type TourTab = {
  id: string;
  name: string;
  image: string | null;
  heading: string;
  description: string;
  notes: string[];
};

const TOUR_TABS: TourTab[] = [
  {
    id: "incidents",
    name: "Incidents",
    image: "/v2-incidents-list.png",
    heading: "One list for what is open.",
    description:
      "Incoming webhooks become incidents. You acknowledge, assign, and resolve. Related alerts can share a fingerprint so one person is not paged for every downstream symptom.",
    notes: [
      "Open, acknowledged, and resolved in one place",
      "Filter by service, urgency, and who is assigned",
      "Write the postmortem from the timeline — OpsKnight does not invent a report",
      "Ack from a phone by installing the PWA; same login as desktop",
    ],
  },
  {
    id: "schedules",
    name: "Schedules",
    image: "/v2-on-call-schedules.png",
    heading: "Who is covering this week.",
    description:
      "Rotations, timezones, and last-minute swaps. When something fires, the active layer is who gets the first message.",
    notes: [
      "Primary and secondary layers",
      "Overrides without rebuilding the rotation",
      "The escalation policy decides who is next if nobody answers",
    ],
  },
  {
    id: "slack",
    name: "Slack rooms",
    image: "/slack-chatops.png",
    heading: "A dedicated channel for that incident.",
    description:
      "From 2.0, OpsKnight opens a dedicated Slack channel, invites the people on call, and lets you acknowledge or resolve from the message. Up to 3 Slack destinations per service.",
    notes: [
      "Channel named for the incident",
      "Ack, assign, and resolve from Slack",
      "Up to 3 Slack destinations per service",
      "Participant sync and optional video bridge",
    ],
  },
  {
    id: "teams",
    name: "MS Teams",
    image: "/v2-teams-chatops-war-room.png",
    heading: "A Teams war room for that incident.",
    description:
      "From 2.0, OpsKnight opens a Microsoft Teams war room, sends Adaptive Cards with ack/resolve actions, links user identities, and syncs participant membership.",
    notes: [
      "Entra app + Azure Bot installation",
      "Adaptive Cards with interactive incident actions",
      "War rooms with participant synchronization",
      "Up to 3 Teams destinations per service",
    ],
  },
  {
    id: "escalation",
    name: "Escalation",
    image: "/v2-escalation-policies.png",
    heading: "If they miss it, the next person is paged.",
    description:
      "Steps with delays. Email, SMS, voice paging (Twilio trigger-only), push, Slack, Teams, WhatsApp, or a webhook.",
    notes: [
      "You set the wait before the next step",
      "SMS via Twilio or AWS SNS; Voice via Twilio",
      "Incident SLA policies and support-hours conditions",
    ],
  },
  {
    id: "services",
    name: "Services",
    image: "/v2-services.png",
    heading: "What you page for.",
    description:
      "Each service has an escalation policy and the integrations that create incidents. Status for customers is one page you configure — not unlimited separate sites.",
    notes: [
      "Ownership and the policy that pages",
      "Inbound integrations hang off the service",
      "One public or private status page per install (v3)",
    ],
  },
];

export function ProductTour() {
  const [activeTab, setActiveTab] = useState("incidents");
  const currentTab = TOUR_TABS.find((t) => t.id === activeTab) || TOUR_TABS[0];

  return (
    <section id="product-tour" className="border-b border-slate-200 bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-3 font-mono text-[11px] font-medium tracking-wide text-slate-500">
            The product
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-[#111827] sm:text-4xl">
            Screens from a real install.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#4b5563]">
            Same sequence as the night: list, schedule, Slack & Teams, policy, service. Status is one page. Ack from a phone is the PWA on the home screen — no extra app-store product.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Product feature screens"
          className="mt-10 flex flex-wrap gap-2"
        >
          {TOUR_TABS.map((tab) => {
            const Icon =
              tab.id === "incidents"
                ? Activity
                : tab.id === "schedules"
                  ? Calendar
                  : tab.id === "slack"
                    ? MessageSquare
                    : tab.id === "teams"
                      ? Users2
                      : tab.id === "escalation"
                        ? ShieldCheck
                        : BarChart3;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tour-tab-${tab.id}`}
                role="tab"
                aria-selected={isActive}
                aria-controls={`tour-tabpanel-${tab.id}`}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 rounded-[10px] border px-3.5 py-2 text-sm font-medium ${
                  isActive
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.name}
              </button>
            );
          })}
        </div>

        <div
          id={`tour-tabpanel-${currentTab.id}`}
          role="tabpanel"
          aria-labelledby={`tour-tab-${currentTab.id}`}
          tabIndex={0}
          className="mt-8 overflow-hidden rounded-[14px] border border-slate-200 bg-slate-50"
        >
          <div className="grid lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,1fr)]">
            <div className="bg-[#0f172a] p-4 sm:p-6">
              {currentTab.image ? (
                <Image
                  src={currentTab.image}
                  alt={currentTab.heading}
                  width={1600}
                  height={900}
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="h-auto w-full rounded-[12px] border border-slate-700"
                />
              ) : null}
            </div>
            <div className="border-t border-slate-200 bg-white p-6 lg:border-t-0 lg:border-l md:p-8">
              <h3 className="text-xl font-semibold tracking-tight text-[#111827]">{currentTab.heading}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#4b5563]">{currentTab.description}</p>
              <ul className="mt-5 space-y-2">
                {currentTab.notes.map((note) => (
                  <li key={note} className="flex items-start gap-2 text-sm text-slate-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#d21a1b]" strokeWidth={2} />
                    {note}
                  </li>
                ))}
              </ul>
              {currentTab.id === "services" ? (
                <Link
                  href={BRAND.links.status}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#d21a1b] hover:underline"
                >
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#059669]" />
                  Live status example
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
