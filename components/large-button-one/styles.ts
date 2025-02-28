//---------------------------------------------------------------------------------
/* File: /components/large-button-one/styles.ts */
//---------------------------------------------------------------------------------
import { BorderRadius, Color, Font, FontSize, Margin } from "@/assets/theme";
import { StyleSheet } from "react-native";

//---------------------------------------------------------------------------------

export const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: Margin.WidgetHeaderToWidgetElements,
  },
  button: {
    backgroundColor: Color.Purple,
    height: 52,
    borderRadius: BorderRadius.CommonBorderRadius,
    alignItems: "center",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
  },
  buttonText: {
    color: Color.White,
    fontFamily: Font.Regular,
    fontSize: FontSize.BodyCopy,
  },
  buttonValid: {
    backgroundColor: Color.Purple,
  },
  buttonInvalid: {
    backgroundColor: Color.LightPurple,
  },
});

//---------------------------------------------------------------------------------
