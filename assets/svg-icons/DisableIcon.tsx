import * as React from "react";
import Svg, { Path } from "react-native-svg";
const DisabledIcon = (props: any) => (
  <Svg
    fill="#000000"
    width={24}
    height={24}
    viewBox="-1 0 19 19"
    xmlns="http://www.w3.org/2000/svg"
    className="cf-icon-svg"
    {...props}
  >
    <Path d="M16.417 9.583A7.917 7.917 0 1 1 8.5 1.666a7.917 7.917 0 0 1 7.917 7.917zm-5.267 6.274a6.766 6.766 0 0 0 1.756-1.084L3.31 5.177a6.81 6.81 0 0 0 7.84 10.68zm3.624-3.624a6.808 6.808 0 0 0-10.68-7.84l9.596 9.596a6.77 6.77 0 0 0 1.084-1.756z" />
  </Svg>
);
export default DisabledIcon;
