import { BRAND } from "@/lib/brand";

export function enquiryHref(subject: string, body?: string) {
  const params = new URLSearchParams();
  params.set("subject", subject);
  if (body) {
    params.set("body", body);
  }
  return `mailto:${BRAND.links.email}?${params.toString()}`;
}
