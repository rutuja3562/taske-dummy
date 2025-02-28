//---------------------------------------------------------------------------------
/* File: /components/large-button/styles.ts */
//---------------------------------------------------------------------------------

import { StyleSheet } from "react-native";
import {
  Color,
  Font,
  FontSize,
  ButtonShadow,
  Margin,
  BorderRadius,
} from "@/assets/theme";

export const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    padding: Margin.InterElementsSpaceSmall,
    height: 52,
    borderRadius: BorderRadius.CommonBorderRadius,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    shadowColor: Color.Purple,
    shadowOffset: { width: 0, height: 30 },
    shadowOpacity: 2.5,
    shadowRadius: 3.84,
    elevation: ButtonShadow.elevation,
  },
  buttonValid: {
    backgroundColor: Color.Purple,
  },
  buttonInvalid: {
    backgroundColor: Color.LightPurple,
  },
  buttonFallback: {
    backgroundColor: Color.Purple,
  },
  buttonText: {
    width: "100%",
    textAlign: "center",
    fontFamily: Font.Regular,
    fontSize: FontSize.BodyCopy,
  },
  buttonTextWhite: {
    color: Color.White,
  },
  buttonTextDark: {
    color: Color.VeryDarkGrey,
  },
});
