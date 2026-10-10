"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const GlobalCommandPalette = dynamic(
  () =>
    import("@/components/navigation/GlobalCommandPalette").then(
      (mod) => mod.GlobalCommandPalette,
    ),
  { ssr: false },
);
export function ClientCommandPalette() {
  const [activated, setActivated] = useState(false);
  useEffect(() => {
    if (activated) return;
    function activate(event: Event) {
      if (event.type === "keydown") {
        const key = event as KeyboardEvent;
        if (!(key.metaKey || key.ctrlKey) || key.key !== "k") return;
        key.preventDefault();
      }
      setActivated(true);
    }
    window.addEventListener("keydown", activate);
    window.addEventListener("open-global-search", activate);
    return () => {
      window.removeEventListener("keydown", activate);
      window.removeEventListener("open-global-search", activate);
    };
  }, [activated]);
  return activated ? <GlobalCommandPalette initialOpen /> : null;
}
