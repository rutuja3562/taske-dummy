import { StyleSheet } from "react-native";
import { BorderRadius, Color, Font, FontSize, Margin } from "@/assets/theme"; // Ensure these exist

export const styles = StyleSheet.create({
  input: {
    height: 52,
    borderColor: Color?.LightGrey,
    borderWidth: 1,
    borderRadius: BorderRadius?.countryCodeBorderRadius,
    paddingHorizontal: BorderRadius?.countryCodeBorderRadius,
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
