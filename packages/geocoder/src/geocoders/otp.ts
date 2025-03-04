// Prettier does not support typescript annotation
// eslint-disable-next-line prettier/prettier
import type { AutocompleteQuery, MultiGeocoderResponse } from "./types";

import Geocoder from "./abstract-geocoder";
import { OTPGeocoderResponse } from "../apis/otp";

/**
 * Allows fetching results from OTP instance with the geocoder endpoint enabled
 */
export default class OTPGeocoder extends Geocoder {
  getAutocompleteQuery(query: AutocompleteQuery): AutocompleteQuery {
    const {
      baseUrl,
    } = this.geocoderConfig;
    return {
      url: baseUrl,
      ...query
    };
  }


  rewriteAutocompleteResponse(response: OTPGeocoderResponse): MultiGeocoderResponse {
    const generateLabel = stop => stop.code ? `${stop.name} (${stop.code})` : stop.name

    return {
        features: response?.results?.map(stop => ({
            geometry: { type: "Point", coordinates: [stop.coordinate.lon, stop.coordinate.lat] },
            id: stop.id, 
            // TODO: if non-stops are supported, these need to be detected here and 
            // this layer property updated accordingly
            properties: { layer: "stops", source: "otp", modes: stop.modes, name: stop.name, label: generateLabel(stop) }, 
            type: "Feature"
        })),
      type: "FeatureCollection"
    };
  }

}
