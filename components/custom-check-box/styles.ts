import { Color, Font, FontSize } from "@/assets/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // marginVertical: 10,
    // marginRight: -15,
    // padding: 5,
    color: "#F5F5FF",
  },
  checkboxText: {
    fontSize: FontSize.Regular,
    fontFamily: Font.Regular,
    color: Color.Black,
  },
  checkbox: {
    padding: 0,
    margin: 0,
  },
  customCheckbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    // marginRight: 10,
  },
});
