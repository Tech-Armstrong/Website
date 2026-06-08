export type GeoLocation = {
  lat: number;
  lng: number;
  formattedAddress?: string;
};

type GeocodeResponse = {
  status: string;
  results?: Array<{
    formatted_address: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  }>;
};

export async function geocodeAddress(
  address: string,
): Promise<GeoLocation | null> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) return null;

  const url = new URL("https://maps.googleapis.com/maps/api/geocode/json");
  url.searchParams.set("address", address);
  url.searchParams.set("key", apiKey);

  try {
    const response = await fetch(url, { next: { revalidate: 86400 } });
    if (!response.ok) return null;

    const data = (await response.json()) as GeocodeResponse;
    const result = data.results?.[0];
    if (data.status !== "OK" || !result) return null;

    return {
      lat: result.geometry.location.lat,
      lng: result.geometry.location.lng,
      formattedAddress: result.formatted_address,
    };
  } catch {
    return null;
  }
}
