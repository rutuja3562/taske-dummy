import { StyleSheet } from "react-native";
import { BorderRadius, Color, Font, FontSize, Margin } from "@/assets/theme"; // Ensure these exist

export const styles = StyleSheet.create({
  tncText: {
    fontSize: FontSize?.BodyCopy,
  },
  checkBoxContainer: {
    marginVertical: Margin.InterElementsSpaceSmall,
    flexDirection: "row",
    alignItems: "center",
  },
  checkBoxText: {
    fontSize: FontSize?.BodyCopy,
    fontFamily: Font?.Regular,
    color: Color?.Black,
    marginLeft: Margin.InterElementsSpaceSmall,
  },
});
