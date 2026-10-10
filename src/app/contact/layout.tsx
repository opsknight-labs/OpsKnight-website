import { siteMetadata } from "@/lib/site-metadata";
export const metadata = siteMetadata({
  title: "Contact",
  description:
    "Contact OpsKnight for community, commercial support, implementation, private security reports and corporate or security questionnaires.",
  alternates: { canonical: "/contact/" },
});
export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
