import * as React from "react";
import Svg, { Mask, Path, G } from "react-native-svg";
const SolidImageCropIcon = (props: any) => (
  <Svg
    width={30}
    height={30}
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Mask
      id="mask0_11_1183"
      style={{
        maskType: "luminance",
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={4}
      width={30}
      height={22}
    >
      <Path
        d="M11.515 6.58625C11.7464 6.37029 12.051 6.25012 12.3675 6.25H26.25C26.5815 6.25 26.8995 6.3817 27.1339 6.61612C27.3683 6.85054 27.5 7.16848 27.5 7.5V22.5C27.5 22.8315 27.3683 23.1495 27.1339 23.3839C26.8995 23.6183 26.5815 23.75 26.25 23.75H12.3675C12.051 23.7499 11.7464 23.6297 11.515 23.4138L2.5 15L11.515 6.58625Z"
        fill="white"
        stroke="white"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M22.5 11.875L16.25 18.125M16.25 11.875L22.5 18.125"
        stroke="black"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Mask>
    <G mask="url(#mask0_11_1183)">
      <Path d="M0 0H30V30H0V0Z" fill="#5B67F1" />
    </G>
  </Svg>
);
export default SolidImageCropIcon;
