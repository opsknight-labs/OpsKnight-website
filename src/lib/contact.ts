import { BRAND } from "@/lib/brand";
export function enquiryHref(subject: string) {
  return `mailto:${BRAND.links.email}?subject=${encodeURIComponent(subject)}`;
}
