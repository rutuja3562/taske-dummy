import * as React from "react";
import Svg, { Path } from "react-native-svg";
const MenuIcon = (props: any) => (
  <Svg
    width={30}
    height={30}
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M6.25 8.75H16.25M6.25 15H23.75M13.75 21.25H23.75"
      stroke="black"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default MenuIcon;
