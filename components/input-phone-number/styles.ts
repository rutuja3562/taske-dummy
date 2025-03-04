import { BorderRadius, Color, Font, FontSize, Margin } from "@/assets/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  PhoneInputContainer: {
    width: "82%",
  },
  input: {
    height: 52,
    borderColor: Color?.LightGrey,
    borderWidth: 1,
    borderRadius: BorderRadius?.countryCodeBorderRadius,
    borderLeftWidth: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    paddingLeft: Margin.InterElementsSpaceSmall,
    fontSize: FontSize?.BodyCopy,
    fontFamily: Font?.Regular,
    backgroundColor: Color?.VeryLightGrey,
    color: Color?.Black,
  },
  closeCircle: {
    position: "absolute",
    right: Margin.InterElementsSpaceSmall,
    top: Margin.InterElementsSpaceLarge,
  },
});
