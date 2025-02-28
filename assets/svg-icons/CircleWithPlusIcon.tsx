import * as React from "react";
import Svg, { G, Circle, Path, Defs } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const CircleWithPlusIcon = (props: any) => (
  <Svg
    width={59}
    height={70}
    viewBox="0 0 59 70"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G filter="url(#filter0_d_11_1433)">
      <Circle cx={35} cy={31} r={20} fill="#FE467D" />
    </G>
    <Path
      d="M35 24V38M28 31H42"
      stroke="white"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Defs></Defs>
  </Svg>
);
export default CircleWithPlusIcon;
