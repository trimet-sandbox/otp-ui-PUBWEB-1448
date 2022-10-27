import React from "react";
import { ClassicModeIcon } from "@opentripplanner/icons";

import vehicleData from "../__mocks__/seattle.json";
import { withMap } from "../../../.storybook/base-map-wrapper";

import TransitVehicleOverlay, {
  CircleWithCaret,
  RouteNumberIcon,
  RotatingCircle,
  withRouteColorBackground,
  withRouteColorBackgroundOnHover
} from ".";

const SEATTLE: [number, number] = [47.6, -122.3];

const vehicles: TransitVehicle[] = vehicleData.vehiclePositions;

export const CustomIconSize = () => (
  <TransitVehicleOverlay iconPixels={25} vehicles={vehicles} />
);

export const RotatingIcons = () => (
  <TransitVehicleOverlay IconContainer={RotatingCircle} vehicles={vehicles} />
);

export const CustomModeIcon = () => (
  <TransitVehicleOverlay ModeIcon={ClassicModeIcon} vehicles={vehicles} />
);

export const RouteColorBackground = () => (
  <TransitVehicleOverlay
    IconContainer={withRouteColorBackground(CircleWithCaret)}
    vehicles={vehicles}
  />
);

export const RouteColorBackgroundOnHover = () => (
  <TransitVehicleOverlay
    IconContainer={withRouteColorBackgroundOnHover(CircleWithCaret)}
    vehicles={vehicles}
  />
);

export const DefaultRouteColorWhenVehicleRouteColorAbsent = () => (
  <TransitVehicleOverlay
    IconContainer={withRouteColorBackground(CircleWithCaret, "#00FF00")}
    vehicles={vehicles.map(v => {
      const { routeColor, ...vehicleProps } = v;
      return vehicleProps;
    })}
  />
);

export const RouteNumbersOnly = () => (
  <TransitVehicleOverlay VehicleIcon={RouteNumberIcon} vehicles={vehicles} />
);

export default {
  title: "TransitVehicleOverlay",
  component: TransitVehicleOverlay,
  decorators: [withMap(SEATTLE, 12)]
};
