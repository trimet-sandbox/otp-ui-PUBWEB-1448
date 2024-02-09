import * as StyledRectangle from "./styled";
import * as utils from "../../../utils";

/**
 * Gets a marker size ([width, height]) for a given zoom level.
 * Used with rectangular vehicle shapes.
 */
function getRectangleSize(zoom) {
  const zoomToCorrectedWidth = {
    9: 2.7,
    10: 3.59,
    11: 4.49,
    12: 6,
    13: 7.19,
    14: 17.07,
    15: 22.46,
    16: 31.44,
    17: 40,
    18: 67.38,
    19: 89.84,
    20: 116.79
  };

  const spriteWidth = zoomToCorrectedWidth[zoom] || zoom;

  return [spriteWidth, spriteWidth]; // Assuming square icons for simplicity
}
export const LightRailVehicleRectangle = utils.makeRotatedMarker(
  utils.makeBasicVehicleShape(
    StyledRectangle.LgShape,
    StyledRectangle.LgTrackedShape
  ),
  getRectangleSize
);

export const BusRectangle = utils.makeRotatedMarker(
  utils.makeBasicVehicleShape(
    StyledRectangle.Shape,
    StyledRectangle.TrackedShape
  ),
  getRectangleSize
);

export const DetailedRectangle = utils.makeRotatedMarker(
  ({ color, highlightColor, isTracked, routeType }) => {
    return utils.makeVehicleIcon(
      StyledRectangle,
      routeType,
      color,
      highlightColor,
      isTracked
    );
  },
  getRectangleSize
);

// Rename styled components for export
export { StyledRectangle as Styled };
