export interface Location {
  bbox: Array<number>;
  geometry: { type: string; coordinates: Array<number> };
  properties: LocationProperties;
}

interface LocationProperties {
  address_line1: string;
  address_line2: string;
  category: string;
  city: string;
  country: string;
  country_code: string;
  county: string;
  datasource: DataSource;
  lat: number;
  lon: number;
  name: string;
  place_id: string;
  plus_code: string;
  rank: Rank;
  result_type: string;
  state: string;
  state_code: string;
  state_district: string;
  timezone: Timezone;
  village: string;
}

interface DataSource {
  attribution: string;
  license: string;
  sourcename: string;
  url: string;
}

interface Rank {
  importance: number;
  confidence: number;
  confidence_city_level: number;
  match_type: string;
}

interface Timezone {
  abbreviation_DST: string;
  abbreviation_STD: string;
  name: string;
  offset_STD: string;
  offset_STD_seconds: number;
  offset_DST: string;
  offset_DST_seconds: number;
}
