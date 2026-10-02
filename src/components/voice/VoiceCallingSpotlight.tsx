import Link from "next/link";
import { PhoneCall, Volume2, Coins, ArrowRight } from "lucide-react";
import { latestDocsHref } from "@/lib/docs/paths";

export function VoiceCallingSpotlight() {
  return (
    <section id="voice-calling" className="border-b border-slate-200 bg-[#f8fafc] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-3 font-mono text-[11px] font-medium tracking-wide text-slate-500">
            Voice paging · New in 2.0.0
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-[#111827] sm:text-4xl">
            Phone calls that wake the on-call engineer.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#4b5563]">
            At 3 AM, push alerts and chat pings are easy to sleep through. OpsKnight dials your active on-call rotation directly over telephone with keypad acknowledgment.
          </p>
        </div>

        {/* 3 Simple Feature Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <div className="rounded-[14px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-[#d21a1b]">
              <PhoneCall className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <h3 className="text-base font-semibold text-[#111827]">Bypasses Do Not Disturb</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#4b5563]">
              Rings as a real telephone call so critical alerts aren&apos;t silenced by mobile focus modes or sleep schedules.
            </p>
          </div>

          <div className="rounded-[14px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-[#d21a1b]">
              <Volume2 className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <h3 className="text-base font-semibold text-[#111827]">Keypad Acknowledgment</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#4b5563]">
              Press <strong>1</strong> on the phone keypad to claim the incident right on the call. Press <strong>2</strong> to escalate immediately.
            </p>
          </div>

          <div className="rounded-[14px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-[#d21a1b]">
              <Coins className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <h3 className="text-base font-semibold text-[#111827]">Direct Twilio Rates</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#4b5563]">
              Connect your own Twilio account. Pay pennies per call directly to Twilio with no per-user markup or telephony fees.
            </p>
          </div>
        </div>

        {/* Minimal Call Flow Strip */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-[14px] border border-slate-200 bg-white px-6 py-4 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs text-slate-500">Keypad actions:</span>
            <span className="inline-flex items-center gap-1.5 rounded border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-xs text-slate-700">
              <span className="font-bold text-[#d21a1b]">1</span> Acknowledge
            </span>
            <span className="inline-flex items-center gap-1.5 rounded border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-xs text-slate-700">
              <span className="font-bold text-slate-800">2</span> Escalate
            </span>
          </div>
          <Link
            href={latestDocsHref("integrations/communication/voice")}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#d21a1b] hover:underline"
          >
            Voice calling documentation
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
