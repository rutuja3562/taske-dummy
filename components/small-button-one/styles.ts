import { StyleSheet } from "react-native";
import { BorderRadius, Color, Font, FontSize, Padding } from "@/assets/theme";

export const styles = StyleSheet.create({
  button: {
    width: 130, // 25% bigger
    height: 40,
    borderRadius: BorderRadius.CommonBorderRadius,
    borderColor: Color.Purple,
    borderWidth: 1,
    paddingVertical: Padding.InterElementsSpaceSmall, // 25% bigger
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPressed: {
    backgroundColor: Color.Orange,
  },
  buttonText: {
    color: Color.Purple,
    textAlign: "center",
    fontFamily: Font.SemiBold,
    fontSize: FontSize.SmallCopy,
    // marginLeft: 5,
  },
});
