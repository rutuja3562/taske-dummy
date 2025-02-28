import * as React from "react";
import Svg, { Path } from "react-native-svg";
const TickMark = (props: any) => (
  <Svg
    width={40}
    height={30}
    viewBox="0 0 47 47"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M22.1875 33.5805L35.4293 17.0267L33.0373 15.1131L21.7459 29.2228L13.748 22.5589L11.7853 24.9141L22.1875 33.5836V33.5805Z"
      fill="#ffffff"
    />
  </Svg>
);
export default TickMark;
