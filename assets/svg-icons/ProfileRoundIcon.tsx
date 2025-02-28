import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const ProfileRoundIcon = (props: any) => (
  <Svg
    width={35}
    height={34}
    viewBox="0 0 35 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={17.2595} cy={16.8767} r={16.8767} fill="white" />
    <Path
      d="M17.7156 16.4206C20.2347 16.4206 22.2768 14.3784 22.2768 11.8593C22.2768 9.34019 20.2347 7.29803 17.7156 7.29803C15.1964 7.29803 13.1543 9.34019 13.1543 11.8593C13.1543 14.3784 15.1964 16.4206 17.7156 16.4206Z"
      stroke="#003896"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M25.5519 25.5431C25.5519 22.0127 22.0397 19.1573 17.7157 19.1573C13.3916 19.1573 9.87939 22.0127 9.87939 25.5431"
      stroke="#003896"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default ProfileRoundIcon;
