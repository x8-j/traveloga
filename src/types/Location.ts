import type { FlightType } from '~/components/BookingUI/BookingReducer';

export type Location = Record<FlightType, RegionGroup[]>;

export interface RegionGroup {
  region: string;
  location: LocationMap;
}

export type LocationMap = Record<string, string[]>;
