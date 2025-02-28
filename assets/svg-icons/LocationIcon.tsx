import * as React from "react";
import Svg, { Path } from "react-native-svg";
const LocationIcon = (props: any) => (
  <Svg
    width={15}
    height={15}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M7.4998 10.9C8.57676 10.9 9.4498 10.027 9.4498 8.95C9.4498 7.87304 8.57676 7 7.4998 7C6.42285 7 5.5498 7.87304 5.5498 8.95C5.5498 10.027 6.42285 10.9 7.4998 10.9Z"
      stroke="#FB6D49"
    />
    <Path
      d="M2.26256 6.05625C3.49381 0.643751 11.5126 0.650002 12.7376 6.0625C13.4563 9.2375 11.4813 11.925 9.75006 13.5875C8.49381 14.8 6.50631 14.8 5.24381 13.5875C3.51881 11.925 1.54381 9.23125 2.26256 6.05625Z"
      stroke="#FB6D49"
    />
  </Svg>
);
export default LocationIcon;
