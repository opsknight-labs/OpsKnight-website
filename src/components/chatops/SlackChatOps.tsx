"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Headphones, 
  Bell, 
  Search, 
  UserPlus, 
  Plus, 
  ExternalLink,
  Video,
  Check
} from "lucide-react";

export function SlackChatOps() {
  const [status, setStatus] = useState<"OPEN" | "ACKNOWLEDGED" | "RESOLVED">("OPEN");
  const [assignee, setAssignee] = useState<string>("Unassigned");
  const [pinnedNote, setPinnedNote] = useState<boolean>(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleAcknowledge = () => {
    setStatus("ACKNOWLEDGED");
    setAssignee("Alex Vance (You)");
    showToast("Acknowledge event synced to OpsKnight Command Center.");
  };

  const handleAssignToMe = () => {
    setAssignee("Alex Vance (You)");
    showToast("Assigned incident commander to Alex Vance.");
  };

  const handleResolve = () => {
    setStatus("RESOLVED");
    showToast("Incident marked RESOLVED in OpsKnight & War Room closed.");
  };

  const handlePinEmoji = () => {
    setPinnedNote(!pinnedNote);
    if (!pinnedNote) {
      showToast("📌 Pinned message to Command Center Incident Timeline.");
    }
  };

  return (
    <section id="chatops" className="py-24 bg-[#0f172a] text-slate-200 border-t border-white/5 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold mb-4">
            Slack & Microsoft Teams War Rooms
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Automated Slack & Teams War Rooms.
          </h2>
          <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Every critical alert automatically spins up a dedicated channel — in Slack or Microsoft Teams — invites on-call responders, attaches video bridges, sends Adaptive Cards with 1-click triage actions, and syncs status bi-directionally.
          </p>
        </div>

        {/* Pixel-Accurate Slack Dark Mode Window */}
        <div className="max-w-4xl mx-auto rounded-2xl border border-white/10 bg-[#1a1d21] shadow-2xl overflow-hidden flex flex-col font-sans">
          
          {/* Slack Channel Header */}
          <div className="h-14 border-b border-[#2c3136] bg-[#1a1d21] px-4 flex items-center justify-between">
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-bold text-xs">☆</span>
                <span className="font-extrabold text-white text-sm"># inc-y5hh7q-opsknight</span>
              </div>
              <div className="text-[11px] text-slate-400 truncate flex items-center gap-1.5 mt-0.5">
                <span>🚨 High-EC2-CPUUtilization | HIGH |</span>
                <span className="text-red-400 hover:underline cursor-pointer">https://opsknight.com/incidents/...</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-400">
              <button className="flex items-center gap-1.5 px-3 py-1 bg-[#222529] hover:bg-[#2c3136] rounded-md text-xs font-medium text-white border border-white/10 transition-colors">
                <UserPlus size={13} />
                <span className="hidden sm:inline">Invite teammates</span>
              </button>
              <div className="p-1.5 hover:bg-[#222529] rounded-md cursor-pointer text-slate-300">
                <Headphones size={15} />
              </div>
              <div className="p-1.5 hover:bg-[#222529] rounded-md cursor-pointer text-slate-300">
                <Bell size={15} />
              </div>
              <div className="p-1.5 hover:bg-[#222529] rounded-md cursor-pointer text-slate-300">
                <Search size={15} />
              </div>
            </div>
          </div>

          {/* Slack Tabs */}
          <div className="h-9 border-b border-[#2c3136] bg-[#1a1d21] px-4 flex items-center gap-6 text-xs font-semibold">
            <span className="text-white border-b-2 border-white pb-2 pt-2 cursor-pointer">Messages</span>
            <span className="text-slate-400 hover:text-slate-200 pb-2 pt-2 cursor-pointer flex items-center gap-1">
              Add canvas
            </span>
            <span className="text-slate-400 hover:text-slate-200 cursor-pointer">
              <Plus size={14} />
            </span>
          </div>

          {/* Slack Message Feed */}
          <div className="p-5 space-y-4 bg-[#1a1d21] text-xs leading-relaxed overflow-y-auto max-h-[600px]">
            
            {/* System Message 1 */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.7c0 4.67-3.13 9.04-7 10.18-3.87-1.14-7-5.51-7-10.18V6.3l7-3.12z"/>
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-white text-[13px]">OpsKnight</span>
                  <span className="px-1 py-0.2 bg-[#2c3136] text-[9px] text-slate-400 font-bold rounded">APP</span>
                  <span className="text-slate-500 text-[11px]">14:30</span>
                </div>
                <div className="text-slate-300 text-xs mt-0.5">
                  joined #inc-y5hh7q-opsknight.
                </div>
              </div>
            </div>

            {/* System Message 2 */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.7c0 4.67-3.13 9.04-7 10.18-3.87-1.14-7-5.51-7-10.18V6.3l7-3.12z"/>
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-white text-[13px]">OpsKnight</span>
                  <span className="px-1 py-0.2 bg-[#2c3136] text-[9px] text-slate-400 font-bold rounded">APP</span>
                  <span className="text-slate-500 text-[11px]">14:30</span>
                </div>
                <div className="text-slate-300 text-xs mt-0.5">
                  set the channel topic: 🚨 High-EC2-CPUUtilization | HIGH | <span className="text-red-400 hover:underline">https://opsknight.com/incidents/cmsx07k9q00w4cq1iu5y5hh7q</span>
                </div>
              </div>
            </div>

            {/* New Divider */}
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-red-500/40"></div>
              <span className="flex-shrink mx-4 text-red-400 text-[10px] font-bold uppercase tracking-wider">New</span>
            </div>

            {/* User Added Message */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-slate-800 border border-white/10 flex items-center justify-center font-bold text-xs text-white shrink-0">
                AV
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-white text-[13px]">Alex Vance</span>
                  <span>🔭</span>
                  <span className="text-slate-500 text-[11px]">14:30</span>
                </div>
                <div className="text-slate-300 text-xs mt-0.5">
                  has been added to #inc-y5hh7q-opsknight by OpsKnight.
                </div>
              </div>
            </div>

            {/* Main Incident Card Message */}
            <div className="flex items-start gap-3 pt-2">
              <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.7c0 4.67-3.13 9.04-7 10.18-3.87-1.14-7-5.51-7-10.18V6.3l7-3.12z"/>
                </svg>
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-white text-[13px]">OpsKnight</span>
                  <span className="px-1 py-0.2 bg-[#2c3136] text-[9px] text-slate-400 font-bold rounded">APP</span>
                  <span className="text-slate-500 text-[11px]">14:30</span>
                </div>

                {/* Incident Summary Card */}
                <div className="space-y-3">
                  <div>
                    <h4 className="font-bold text-white text-sm flex items-center gap-2">
                      <span>🚨 Incident Triggered: High-EC2-CPUUtilization</span>
                    </h4>
                    <p className="text-slate-400 text-xs mt-0.5">OpsKnight | 17 August at 14:30</p>
                  </div>

                  {/* 2-Column Fields Grid */}
                  <div className="grid grid-cols-2 gap-y-2 gap-x-6 text-xs max-w-md pt-1">
                    <div>
                      <span className="text-slate-400 block font-medium">Service:</span>
                      <span className="text-white font-semibold">OpsKnight</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Status:</span>
                      <span className={`font-bold ${
                        status === "OPEN" ? "text-red-400" : status === "ACKNOWLEDGED" ? "text-amber-400" : "text-emerald-400"
                      }`}>
                        {status}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Urgency:</span>
                      <span className="text-white font-semibold">HIGH</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Assignee:</span>
                      <span className="text-white font-semibold">{assignee}</span>
                    </div>
                  </div>

                  {/* Video Bridge Note */}
                  <div className="pt-2 text-xs text-slate-300">
                    <span className="text-slate-400 block font-medium mb-0.5">Note:</span>
                    <div className="flex items-center gap-1.5">
                      <Video size={14} className="text-slate-400" />
                      <span>Video Bridge: </span>
                      <span className="text-red-400 hover:underline cursor-pointer">https://meet.jit.si/opsknight-inc-u5y5hh7q</span>
                    </div>
                  </div>

                  {/* Interactive Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    <button
                      onClick={handleAcknowledge}
                      className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 border ${
                        status === "ACKNOWLEDGED"
                          ? "bg-emerald-950/60 border-emerald-500 text-emerald-400"
                          : "bg-[#222529] hover:bg-[#2c3136] border-emerald-500/60 text-emerald-400"
                      }`}
                    >
                      <span>👀</span>
                      <span>Acknowledge</span>
                    </button>

                    <button
                      onClick={handleAssignToMe}
                      className="px-3 py-1.5 bg-[#222529] hover:bg-[#2c3136] border border-white/20 text-white rounded-md text-xs font-bold transition-all flex items-center gap-1.5"
                    >
                      <span>🙋</span>
                      <span>Assign to Me</span>
                    </button>

                    <button
                      onClick={handleResolve}
                      className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 border ${
                        status === "RESOLVED"
                          ? "bg-emerald-900 border-emerald-400 text-white"
                          : "bg-[#222529] hover:bg-[#2c3136] border-emerald-500/60 text-emerald-400"
                      }`}
                    >
                      <span>✅</span>
                      <span>Resolve</span>
                    </button>

                    <button
                      onClick={() => showToast("Opening incident detail modal...")}
                      className="px-3 py-1.5 bg-[#222529] hover:bg-[#2c3136] border border-white/20 text-slate-300 rounded-md text-xs font-medium transition-all flex items-center gap-1"
                    >
                      <span>View Details</span>
                      <ExternalLink size={12} />
                    </button>

                    <button
                      onClick={handlePinEmoji}
                      className={`px-2.5 py-1.5 rounded-md text-xs font-medium border transition-all flex items-center gap-1 ${
                        pinnedNote
                          ? "bg-amber-500/20 border-amber-400 text-amber-300"
                          : "bg-[#222529] hover:bg-[#2c3136] border-white/10 text-slate-400 hover:text-white"
                      }`}
                      title="React with 📌 to pin this message to Command Center timeline"
                    >
                      <span>📌</span>
                      <span className="text-[11px]">{pinnedNote ? "Pinned to Timeline" : "Pin Note"}</span>
                    </button>
                  </div>

                  {/* Jitsi Video Bridge Unfurl Box */}
                  <div className="border-l-4 border-l-red-500 pl-3 py-1.5 bg-[#222529]/60 rounded-r-lg max-w-lg space-y-1">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                      <div className="w-3.5 h-3.5 bg-red-500 rounded-sm flex items-center justify-center text-[9px] text-white font-bold">J</div>
                      <span>meet.jit.si</span>
                    </div>
                    <div className="font-bold text-red-400 text-xs hover:underline cursor-pointer">
                      Jitsi Meet
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Join a WebRTC video conference powered by the Jitsi Videobridge
                    </div>
                  </div>

                  {/* War Room Welcome Guide */}
                  <div className="pt-2 text-xs space-y-1.5 text-slate-300 border-t border-[#2c3136] max-w-xl">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <span>👋</span>
                      <span>Welcome to your Incident War Room!</span>
                    </div>
                    <p className="text-slate-400 text-[11px]">
                      This channel was automatically provisioned to coordinate resolution for <strong>High-EC2-CPUUtilization</strong>.
                    </p>
                    <div className="text-[11px] text-slate-400 space-y-0.5 pt-1">
                      <div className="text-amber-400 font-semibold flex items-center gap-1">
                        <span>⚡</span>
                        <span>War Room Power Features:</span>
                      </div>
                      <div>• <strong>1-Click Action Buttons:</strong> Use Acknowledge, Assign to Me, or Resolve on the card above.</div>
                      <div>• <strong>📌 Emoji Pin:</strong> React with 📌 to any message to instantly add it to the Command Center incident timeline.</div>
                      <div>• <strong>Slash Commands:</strong> Use <code>/incident update</code>, <code>/incident escalate</code>, or <code>/incident note</code>.</div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>

          {/* Slack Toast Notification */}
          {toast && (
            <div className="bg-slate-900 border-t border-white/10 px-4 py-2 text-xs text-emerald-400 font-medium flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Check size={14} className="text-emerald-400" />
                <span>{toast}</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">Bi-directional Webhook Active</span>
            </div>
          )}

          {/* Slack Input Box Footer */}
          <div className="p-3 bg-[#222529] border-t border-[#2c3136]">
            <div className="bg-[#1a1d21] border border-white/10 rounded-lg p-2.5 text-slate-400 text-xs flex items-center justify-between">
              <span className="text-slate-500">Send message or run <code className="text-red-400 font-mono">/incident</code> command to #inc-y5hh7q-opsknight...</span>
              <div className="flex items-center gap-2 text-slate-500">
                <span className="text-xs">⚡</span>
                <span className="text-xs">Aa</span>
                <span className="text-xs">😀</span>
              </div>
            </div>
          </div>

        </div>

        {/* Microsoft Teams Showcase Panel */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-indigo-400">New in 2.0.0</span>
              <h3 className="text-xl font-bold text-white mt-1">Native Microsoft Teams ChatOps</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">Entra App + Azure Bot</span>
          </div>
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <div className="rounded-xl border border-white/10 bg-[#1e293b] p-3 overflow-hidden shadow-xl">
              <p className="text-[11px] font-mono text-slate-400 mb-2 font-medium">Adaptive Card · Interactive Actions</p>
              <Image
                src="/v2-teams-incident-card.png"
                alt="OpsKnight Microsoft Teams incident Adaptive Card with triage actions"
                width={902}
                height={866}
                className="w-full h-auto rounded-lg border border-white/5"
              />
            </div>
            <div className="rounded-xl border border-white/10 bg-[#1e293b] p-3 overflow-hidden shadow-xl">
              <p className="text-[11px] font-mono text-slate-400 mb-2 font-medium">War Room Channel · Member Sync</p>
              <Image
                src="/v2-teams-chatops-war-room.png"
                alt="OpsKnight Microsoft Teams dedicated incident war room"
                width={2164}
                height={1462}
                className="w-full h-auto rounded-lg border border-white/5"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
