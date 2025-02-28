import * as React from "react";
import Svg, { Path } from "react-native-svg";
const BackArrow = (props: any) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M2 10.25H17M2 10.25L8.25 4M2 10.25L8.25 16.5"
      stroke="#003896"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default BackArrow;
