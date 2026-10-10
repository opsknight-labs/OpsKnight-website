"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/site/SiteNavigation";

export function ConditionalFooter() {
    const pathname = usePathname();
    const isDocs = pathname?.startsWith("/docs");

    if (isDocs) return null;

    return <SiteFooter />;
}
