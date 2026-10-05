import { metadata as installMetadata } from "../install/page";
export { default } from "../install/page";
export const metadata = {
  ...installMetadata,
  alternates: { canonical: "/deploy/" },
  openGraph: { ...installMetadata.openGraph, url: "/deploy/" },
};
