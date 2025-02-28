import * as React from "react";
import Svg, { Path, Mask, G, Defs } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const SliderIcon = (props: any) => (
  <Svg
    width={38}
    height={38}
    viewBox="0 0 38 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M3.00049 17C3.00049 8.16344 10.1639 1 19.0005 1C27.837 1 35.0005 8.16344 35.0005 17C35.0005 25.8366 27.837 33 19.0005 33C10.1639 33 3.00049 25.8366 3.00049 17Z"
      fill="white"
    />
    <Mask
      id="mask0_7_860"
      style={{
        maskType: "luminance",
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={39}
      height={38}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M38.0005 0H0.000488281V38H38.0005V0ZM19.0005 1C10.1639 1 3.00049 8.16344 3.00049 17C3.00049 25.8366 10.1639 33 19.0005 33C27.837 33 35.0005 25.8366 35.0005 17C35.0005 8.16344 27.837 1 19.0005 1Z"
        fill="white"
      />
    </Mask>
    <G mask="url(#mask0_7_860)">
      <G filter="url(#filter0_f_7_860)">
        <Path
          d="M4.00049 18C4.00049 9.71573 10.7162 3 19.0005 3C27.2848 3 34.0005 9.71573 34.0005 18C34.0005 26.2843 27.2848 33 19.0005 33C10.7162 33 4.00049 26.2843 4.00049 18Z"
          fill="#002329"
          fillOpacity={0.16}
        />
      </G>
      <G filter="url(#filter1_f_7_860)">
        <Path
          d="M4.00049 19C4.00049 10.7157 10.7162 4 19.0005 4C27.2848 4 34.0005 10.7157 34.0005 19C34.0005 27.2843 27.2848 34 19.0005 34C10.7162 34 4.00049 27.2843 4.00049 19Z"
          fill="#002329"
          fillOpacity={0.16}
        />
      </G>
    </G>
    <G filter="url(#filter2_d_7_860)">
      <Path
        d="M3.00049 17C3.00049 8.16344 10.1639 1 19.0005 1C27.837 1 35.0005 8.16344 35.0005 17C35.0005 25.8366 27.837 33 19.0005 33C10.1639 33 3.00049 25.8366 3.00049 17Z"
        fill="white"
      />
    </G>
    <Path
      d="M8.99854 17C8.99854 11.4772 13.4757 7 18.9985 7C24.5214 7 28.9985 11.4772 28.9985 17C28.9985 22.5228 24.5214 27 18.9985 27C13.4757 27 8.99854 22.5228 8.99854 17Z"
      fill="#278DE5"
    />
    <Defs></Defs>
  </Svg>
);
export default SliderIcon;
