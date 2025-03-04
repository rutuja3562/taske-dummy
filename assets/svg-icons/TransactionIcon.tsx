import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
const TransactionIcon = (props: any) => (
  <Svg
    width={12}
    height={11}
    viewBox="0 0 12 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#clip0_27_82)">
      <Path
        d="M0 4.18C0 3.8192 0.285915 3.52 0.630694 3.52H9.53609L7.24877 1.1264C7.0049 0.871197 7.0049 0.448797 7.24877 0.193597C7.49264 -0.0616027 7.89629 -0.0616027 8.14015 0.193597L11.5039 3.7136C11.6804 3.8984 11.7393 4.1888 11.6384 4.4352C11.5375 4.6816 11.3104 4.84 11.0582 4.84H0.630694C0.285915 4.84 0 4.5408 0 4.18ZM11.3777 6.16H0.630694C0.378416 6.16 0.142957 6.3184 0.0504555 6.5648C-0.0420462 6.8112 0.00840925 7.0928 0.185003 7.2864L3.5487 10.8064C3.67484 10.9384 3.83462 11 3.99439 11C4.15417 11 4.31395 10.9384 4.44008 10.8064C4.68395 10.5512 4.68395 10.1288 4.44008 9.8736L2.15277 7.48H11.3693C11.7141 7.48 12 7.1808 12 6.82C12 6.4592 11.7141 6.16 11.3693 6.16H11.3777Z"
        fill="#003896"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_27_82">
        <Rect width={12} height={11} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default TransactionIcon;
