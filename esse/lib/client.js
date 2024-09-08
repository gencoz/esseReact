import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = sanityClient({
  projectId: "gawoz6q1",
  dataset: "production",
  apiVersion: "2024-01-17",
  useCdn: true,
  token: import.meta.env.VITE_APP_SANITY_PUBLIC_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
export default client;
