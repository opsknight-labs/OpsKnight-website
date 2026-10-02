"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  PhoneCall, 
  PhoneIncoming, 
  Volume2, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Clock, 
  DollarSign,
  RotateCcw
} from "lucide-react";
import { latestDocsHref } from "@/lib/docs/paths";

export function VoiceCallingSpotlight() {
  const [callState, setCallState] = useState<"ringing" | "connected" | "acknowledged" | "escalated">("ringing");
  const [feedback, setFeedback] = useState<string | null>(null);

  const handlePress1 = () => {
    setCallState("acknowledged");
    setFeedback("Key 1 received! Incident #INC-8492 acknowledged by on-call engineer. Escalation halted.");
  };

  const handlePress2 = () => {
    setCallState("escalated");
    setFeedback("Key 2 received! Escalating incident to secondary on-call rotation.");
  };

  const handleReset = () => {
    setCallState("ringing");
    setFeedback(null);
  };

  return (
    <section id="voice-calling" className="relative overflow-hidden border-b border-slate-200 bg-[#0f172a] py-20 text-slate-200 md:py-28">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-red-600/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-emerald-600/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3.5 py-1 text-xs font-semibold text-red-400">
            <PhoneCall className="h-3.5 w-3.5" />
            <span>Automated Voice Calling · New in 2.0.0</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Wake up to a real phone call. Not a silent notification.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
            At 3 AM, push alerts and Slack pings are easily silenced or slept through. OpsKnight dials your on-call responders directly over voice phone calls with interactive keypad acknowledgment.
          </p>
        </div>

        {/* Two-column layout: Interactive Call Simulator & Key Benefits */}
        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-center">
          
          {/* Left Column: Interactive Phone Call Simulation */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm rounded-[24px] border border-white/10 bg-slate-900/90 p-6 shadow-2xl shadow-black/60 backdrop-blur-xl">
              
              {/* Call Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="relative flex h-3 w-3">
                    <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
                      callState === "acknowledged" 
                        ? "bg-emerald-400" 
                        : callState === "escalated" 
                          ? "bg-amber-400" 
                          : "bg-red-400"
                    }`} />
                    <span className={`relative inline-flex h-3 w-3 rounded-full ${
                      callState === "acknowledged" 
                        ? "bg-emerald-500" 
                        : callState === "escalated" 
                          ? "bg-amber-500" 
                          : "bg-red-500"
                    }`} />
                  </div>
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {callState === "ringing" && "Incoming Urgent Call"}
                    {callState === "connected" && "Call Connected · 00:12"}
                    {callState === "acknowledged" && "Incident Acknowledged"}
                    {callState === "escalated" && "Escalation In Progress"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                  title="Reset simulation"
                  aria-label="Reset simulation"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>

              {/* Caller Card */}
              <div className="my-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20 text-[#d21a1b] ring-4 ring-red-500/10">
                  <PhoneIncoming className="h-8 w-8 animate-bounce" />
                </div>
                <h3 className="mt-3 text-lg font-bold text-white">OpsKnight Incident Command</h3>
                <p className="font-mono text-xs text-slate-400">+1 (555) 019-9000 · Twilio Voice</p>
                
                {/* Incident Details Tag */}
                <div className="mt-3 inline-block rounded-lg border border-red-500/30 bg-red-950/40 px-3 py-1.5 text-left text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-red-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                    P1 CRITICAL · #INC-8492
                  </div>
                  <div className="text-slate-300">Checkout Service · 502 Bad Gateway</div>
                </div>
              </div>

              {/* Synthesized Voice Audio Prompt Bubble */}
              <div className="rounded-xl border border-slate-700/80 bg-slate-800/80 p-3.5 text-xs leading-relaxed text-slate-200">
                <div className="mb-1.5 flex items-center gap-1.5 font-semibold text-slate-300">
                  <Volume2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Synthesized Voice Message:</span>
                </div>
                <p className="italic text-slate-300">
                  &ldquo;OpsKnight alert for Checkout Service: 502 Bad Gateway rate exceeded 15%. Press 1 to acknowledge this incident, or press 2 to escalate.&rdquo;
                </p>
              </div>

              {/* Interactive Keypad Buttons */}
              <div className="mt-5 space-y-2.5">
                <button
                  type="button"
                  onClick={handlePress1}
                  disabled={callState === "acknowledged"}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-xs font-semibold transition-all ${
                    callState === "acknowledged"
                      ? "border border-emerald-500/40 bg-emerald-950/60 text-emerald-300 cursor-default"
                      : "border border-slate-700 bg-slate-800 text-white hover:border-red-500/50 hover:bg-slate-700/90 active:scale-[0.98]"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-700 font-mono font-bold text-slate-200">
                      1
                    </span>
                    <span>Press 1 to Acknowledge</span>
                  </span>
                  {callState === "acknowledged" ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <span className="font-mono text-[11px] text-slate-400">Claims Incident</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handlePress2}
                  disabled={callState === "escalated"}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-xs font-semibold transition-all ${
                    callState === "escalated"
                      ? "border border-amber-500/40 bg-amber-950/60 text-amber-300 cursor-default"
                      : "border border-slate-700 bg-slate-800 text-white hover:border-amber-500/50 hover:bg-slate-700/90 active:scale-[0.98]"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-700 font-mono font-bold text-slate-200">
                      2
                    </span>
                    <span>Press 2 to Escalate</span>
                  </span>
                  <span className="font-mono text-[11px] text-slate-400">Pages Secondary</span>
                </button>
              </div>

              {/* Status Outcome Banner */}
              {feedback && (
                <div className={`mt-4 rounded-lg p-2.5 text-xs font-medium ${
                  callState === "acknowledged"
                    ? "border border-emerald-500/30 bg-emerald-950/50 text-emerald-300"
                    : "border border-amber-500/30 bg-amber-950/50 text-amber-300"
                }`}>
                  {feedback}
                </div>
              )}

              {/* Cryptographic Footnote */}
              <div className="mt-4 border-t border-slate-800/80 pt-3 text-center font-mono text-[10px] text-slate-500">
                Validated with HMAC-SHA256 (X-Twilio-Signature)
              </div>
            </div>
          </div>

          {/* Right Column: Why Teams Love Voice Paging */}
          <div className="space-y-6 lg:col-span-7">
            
            <div className="grid gap-4 sm:grid-cols-2">
              
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-sm">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/10 text-[#d21a1b]">
                  <PhoneCall className="h-5 w-5" />
                </div>
                <h3 className="mt-3.5 text-base font-semibold text-white">
                  Bypasses Do Not Disturb
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                  Push notifications and SMS are routinely silenced by phone focus modes. Direct telephone calls ring aloud to wake the on-call engineer during mission-critical outages.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-sm">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="mt-3.5 text-base font-semibold text-white">
                  1-Key DTMF Acknowledgment
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                  No need to open a laptop or find your password in the dark. Pressing <strong>1</strong> acknowledges the alert immediately, halting downstream escalations.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-sm">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                  <Clock className="h-5 w-5" />
                </div>
                <h3 className="mt-3.5 text-base font-semibold text-white">
                  Multi-Tier Escalation Ladder
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                  If the primary engineer doesn&apos;t pick up within your configured window, OpsKnight automatically dials the secondary rotation, SRE lead, or incident commander.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-sm">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                  <DollarSign className="h-5 w-5" />
                </div>
                <h3 className="mt-3.5 text-base font-semibold text-white">
                  Wholesale Twilio Pricing
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                  Plug in your own Twilio account. Pay pennies per call directly to Twilio instead of the $30 to $49 per user monthly fees charged by commercial SaaS vendors.
                </p>
              </div>

            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href={latestDocsHref("integrations/communication/voice")}
                className="inline-flex h-11 items-center justify-center rounded-[12px] bg-[#d21a1b] px-6 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#b41516]"
              >
                Voice Calling Setup Guide
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/compare"
                className="inline-flex h-11 items-center justify-center rounded-[12px] border border-white/10 bg-slate-800/80 px-5 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
              >
                Compare with PagerDuty &amp; Opsgenie
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
