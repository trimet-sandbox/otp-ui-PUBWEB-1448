/* eslint-disable react/button-has-type */
import React, { useRef } from "react";
import { Popup } from "react-map-gl";
import { action } from "@storybook/addon-actions";
import { text } from "@storybook/addon-knobs";

import BaseMap, { MarkerWithPopup, LayerWrapper } from ".";
import AllVehiclesOverlay from "../__mocks__/AllVehicles";
import ContextMenuDemo from "../__mocks__/ContextMenuDemo";

import "maplibre-gl/dist/maplibre-gl.css";

export default {
  title: "BaseMap",
  component: BaseMap
};

const center: [number, number] = [45.522862, -122.667837];

const samplePopup = (
  <div>
    <h1>Popup Title</h1>
    <p>
      Sample <span style={{ color: "purple" }}>popup</span> content.
    </p>
  </div>
);

const sampleMarkers = (
  <MarkerWithPopup
    tooltipContents={samplePopup}
    position={center}
  ></MarkerWithPopup>
);

const onClick = action("onClick");
const onContextMenu = action("onContextMenu");
const onViewportChanged = action("onViewportChanged");
const a11yOverrideParameters = {
  a11y: { config: { rules: [{ id: "color-contrast", reviewOnFail: true }] } }
};

export const clickAndViewportchangedEvents = () => (
  <BaseMap
    center={center}
    forceMaxHeight
    onClick={onClick}
    onContextMenu={onContextMenu}
    onViewportChanged={onViewportChanged}
  ></BaseMap>
);

export const zoomed = () => (
  <BaseMap center={center} forceMaxHeight zoom={17} />
);
export const clickToSetBounds = () => {
  const ref = useRef();
  const bbox = [
    [-79, 43],
    [-73, 45]
  ];

  return (
    <div>
      <button
        onClick={
          () =>
            // @ts-expect-error we know the ref will be a map
            ref.current.fitBounds(bbox, {
              duration: 300,
              padding: { top: 10, bottom: 25, left: 15, right: 5 }
            })
          // eslint-disable-next-line react/jsx-curly-newline
        }
      >
        Set the bounds
      </button>
      <BaseMap passedRef={ref} center={center} forceMaxHeight zoom={17} />
    </div>
  );
};

export const maxZoom = () => (
  <BaseMap center={center} forceMaxHeight maxZoom={18} zoom={30} />
);

export const withCustomBaseLayer = () => {
  const maptilerToken = text("Your MapTiler token", "my_token");

  return (
    <BaseMap
      baseLayer={`https://api.maptiler.com/maps/voyager/style.json?key=${maptilerToken}`}
      center={center}
      forceMaxHeight
    />
  );
};

export const withSampleMarkers = () => (
  <BaseMap center={center} forceMaxHeight>
    {sampleMarkers}
  </BaseMap>
);

export const overlayWithLargeDataSet = () => (
  <div>
    <div>Do not add Storybook overhead on layers with large dataset...</div>
    <BaseMap center={center} forceMaxHeight>
      <AllVehiclesOverlay />
    </BaseMap>
  </div>
);

export const customLocationPopupContent = () => (
  <BaseMap center={center} forceMaxHeight>
    <Popup longitude={center[1]} latitude={center[0]}>
      {samplePopup}
    </Popup>
  </BaseMap>
);
export const optionalLayers = () => (
  <BaseMap center={center} forceMaxHeight>
    <LayerWrapper
      visible
      name="This layer has a name prop, the second one doesn't"
      id="layer-1"
    >
      <MarkerWithPopup position={[center[0], center[1]]} />
      <MarkerWithPopup position={[center[0] + 0.01, center[1]]} />
    </LayerWrapper>
    <AllVehiclesOverlay id="layer-2" />
  </BaseMap>
);
// Custom styling for this story only, not in production
customLocationPopupContent.parameters = a11yOverrideParameters;

export const onContextMenuPopup = () => <ContextMenuDemo />;
