//---------------------------------------------------------------------------------
/* File: /components/header-one/styles.ts */
//---------------------------------------------------------------------------------

import { Color, Font, FontSize, Margin } from "@/assets/theme";
import { StyleSheet } from "react-native";

//---------------------------------------------------------------------------------

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Color.White,
    fontFamily: Font.Regular,
    fontSize: FontSize.SmallCopy,
  },
  backArrow: {
    marginTop: Margin.InterElementsSpaceLarge,
    marginBottom: Margin.InterElementsSpaceLarge,
  },
  skipButton: {
    borderWidth: 1,
    borderColor: Color.Purple,
    height: 42,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingHorizontal: 5,
    width: 60,
  },
  title: {
    fontFamily: Font.Regular,
    fontSize: FontSize.Regular,
    color: Color.Purple,
  },
  screenTitleText: {
    fontSize: FontSize.Heading,
    fontFamily: Font.SemiBold,
    color: Color.Black,
  },
});

//---------------------------------------------------------------------------------
