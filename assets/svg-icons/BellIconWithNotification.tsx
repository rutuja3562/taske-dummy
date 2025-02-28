import * as React from "react";
import Svg, { Path } from "react-native-svg";
const BellIconWithNotification = (props: any) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M19 17V11.8C18.5 11.9 18 12 17.5 12H17V18H7V11C7 8.2 9.2 6 12 6C12.1 4.7 12.7 3.6 13.5 2.7C13.2 2.3 12.6 2 12 2C10.9 2 10 2.9 10 4V4.3C7 5.2 5 7.9 5 11V17L3 19V20H21V19L19 17ZM10 21C10 22.1 10.9 23 12 23C13.1 23 14 22.1 14 21H10ZM21 6.5C21 8.4 19.4 10 17.5 10C15.6 10 14 8.4 14 6.5C14 4.6 15.6 3 17.5 3C19.4 3 21 4.6 21 6.5Z"
      fill="black"
    />
  </Svg>
);
export default BellIconWithNotification;
