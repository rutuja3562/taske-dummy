import * as React from "react";
import Svg, { Path } from "react-native-svg";
const Clear = ({ color, ...props }: any) => (
  <Svg
    width={14}
    height={14}
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M6.99999 12.8333C10.2083 12.8333 12.8333 10.2083 12.8333 6.99996C12.8333 3.79163 10.2083 1.16663 6.99999 1.16663C3.79166 1.16663 1.16666 3.79163 1.16666 6.99996C1.16666 10.2083 3.79166 12.8333 6.99999 12.8333Z"
      stroke="#90C9FF"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5.34921 8.65091L8.65088 5.34924"
      stroke="#90C9FF"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8.65088 8.65091L5.34921 5.34924"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default Clear;
