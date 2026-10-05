"use client";

import { usePathname } from "next/navigation";
import { SiteNavigation } from "@/components/site/SiteNavigation";

export function ConditionalNavbar() {
    const pathname = usePathname();
    const isDocs = pathname?.startsWith("/docs");

    if (isDocs) return null;

    return <SiteNavigation />;
}
