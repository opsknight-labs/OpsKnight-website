import { Radio, PhoneCall, MessageSquare, FileCheck, Layers } from "lucide-react";
import { BRAND } from "@/lib/brand";

const steps = [
  {
    n: "01",
    icon: Radio,
    title: "Something fires",
    body: `Monitoring tools send a webhook. OpsKnight understands ${BRAND.integrationCountLabel} of those out of the box, plus generic JSON.`,
  },
  {
    n: "02",
    icon: Layers,
    title: "Noise is grouped",
    body: "Related alerts become one incident, so one person is not messaged for every downstream symptom.",
  },
  {
    n: "03",
    icon: PhoneCall,
    title: "Voice call & paging",
    body: "The active rotation gets direct automated voice phone calls with keypress ack, plus SMS, push, Slack, Teams, and WhatsApp.",
  },
  {
    n: "04",
    icon: MessageSquare,
    title: "The team gathers",
    body: "A Slack or Microsoft Teams war room is opened for that incident. Optional video link. Work stays on one timeline.",
  },
  {
    n: "05",
    icon: FileCheck,
    title: "You close it out",
    body: "Resolve, update the status page, and write what happened — with follow-up tasks if you need them.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-slate-200 bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-3 font-mono text-[11px] font-medium tracking-wide text-slate-500">
            The night, in order
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-[#111827] sm:text-4xl">
            Alert, page, talk, write it down.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#4b5563]">
            The same sequence most teams already run. OpsKnight is the place
            that sequence lives — on your network.
          </p>
        </div>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-[14px] border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <li key={step.n} className="bg-white p-6">
                <div className="mb-4 flex items-center justify-between">
                  <Icon className="h-5 w-5 text-[#d21a1b]" strokeWidth={1.75} />
                  <span className="font-mono text-[11px] text-slate-400">{step.n}</span>
                </div>
                <h3 className="text-base font-semibold text-[#111827]">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4b5563]">{step.body}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
