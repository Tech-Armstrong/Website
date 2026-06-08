type MapEmbedOptions =
  | { query: string }
  | { lat: number; lng: number };

export function buildMapEmbedUrl(options: MapEmbedOptions): string | null {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) return null;

  const url = new URL("https://www.google.com/maps/embed/v1/place");
  url.searchParams.set("key", apiKey);
  url.searchParams.set("zoom", "15");

  if ("query" in options) {
    url.searchParams.set("q", options.query);
  } else {
    url.searchParams.set("q", `${options.lat},${options.lng}`);
  }

  return url.toString();
}

export function buildMapSearchUrl(address: string): string {
  const url = new URL("https://www.google.com/maps/search/");
  url.searchParams.set("api", "1");
  url.searchParams.set("query", address);
  return url.toString();
}
