import { StyleSheet } from "react-native";

export enum Color {
  Black = "#000000",
  White = "#FFFFFF",
  VeryLightGrey = "#F5F5FF",
  LightGrey = "#CBCED5",
  MediumGrey = "#D9D9D9",
  DarkGrey = "#818EAB",
  VeryDarkGrey = "#535252",
  // DarkGray = "#333",
  // Purple = "#5B67F1",
  Purple = "#FE467D",
  LightPurple = "#FF80D0",
  // LightPurple = "#AFB4F8",
  Blue = "#25C7E8",
  Cyan = "#4B96F9",
  Orange = "#FFB286",
  // Transparent = "transparent",
  // CheckBoxBorder = "#DFE0E7",
  // CheckBoxUncheckedFill = "#F5F5FF",
  // countryCodeBackground = "#E9E9FF",
  // Red = "red",
  // HelpText = "#6f6f6f",
  // InvalidPurple = "#CBCFFF",
  // SmokyGray = "#8A898F",
  // CharcoalViolet = "#22172A",
  // LightRed = "#c00",
  // smokyBlue = "#7C86A2",
  // SoftGray = "#E1E1E1",
}

// Use font sizes from figma
export enum FontSize {
  // Larger = 24,
  // Large = 22,
  // MediumLarge = 20,
  // Medium = 15,
  // SmallMedium = 14,
  // Small = 12,
  // Font24 = 24,
  // Font23 = 23,
  // Font22 = 22,
  // Font21 = 21,
  // Font20 = 20,
  // Font19 = 19,
  // Font18 = 18,
  // Font16 = 16,
  // Font15 = 15,
  // Font14 = 14,
  // Font13 = 13,
  // Font12 = 12,
  // Font11 = 11,
  // Font10 = 10,

  Heading = 22,
  BodyCopy = 15,
  Regular = 12,
  SmallCopy = 11,
}

// export enum FontSizeType {
//   Heading = 22,
//   BodyCopy = 15,
//   Regular = 12,
//   SmallCopy = 11,
// }

// Left right gap gutter pageMargin...
// export enum Padding {
//   containerPadding = 15,
// }
export enum Padding {
  InterElementsSpaceSmall = 10, // Check
  InterElementsSpaceLarge = 15,
}
export enum Margin {
  Gutter = 10,
  InterElementsSpaceSmall = 10, // Check
  InterElementsSpaceLarge = 15,
  ScreenLeftRightMargin = 15,
  WidgetHeaderToWidgetElements = 20,
  FirstElementFromHeader = 30,
  WidgetInterSectionElement = 30,
  WidgetToWidget = 40,
  // getGoingTextMBottom = 5,
  // inputContainerMarginTop = 15,
  // inputContainerMarginBottom = 20,
  // closeCircleRightMargin = 11,
  // closeCircleTopMargin = 35,
  // containerHorizontalMargin = 15,
  // containerVerticalMargin = 10,
  // commonHighMarginBetweenElements = 15,
  // commonLessMarginBetweenElements = 10,
  // commonHigherMediumMarginBetweenElements = 25,
  // commonHigherMarginBetweenElements = 40,
}

// export enum PaddingHorizontal {
//   paddingHorizontal = 10,
//   commonHorizontalPadding = 15,
// }

export enum BorderRadius {
  borderRadius = 15,
  countryCodeBorderRadius = 10,
  progressBarBorderRadius = 4,
  CommonBorderRadius = 10,
  commonHigherBorderRadius = 20,
  commonLargeBorderRadius = 50,
}

export enum LineHeight {
  helpTextLineHeight = 20,
}

export enum ButtonShadow {
  elevation = 25,
}

// export enum LargeButton {
//   height = 52,
// }

// export enum titleAndSubtitleGap {
//   marginTop = -8,
// }
// export enum backArrowAndTitleGap {
//   marginTop = 30,
// }
// export enum headerLeftSideGap {
//   marginLeft = -4,
//   marginLeftSide = 6,
// }
// export enum subtitleAndContentGap {
//   marginBottom = 20,
// }

export enum Font {
  // Black = "Black",
  // BlackItalic = "BlackItalic",
  // Bold = "Bold",
  // BoldItalic = "BoldItalic",
  // ExtraBold = "ExtraBold",
  // ExtraBoldItalic = "ExtraBoldItalic",
  // ExtraLight = "ExtraLight",
  // ExtraLightItalic = "ExtraLightItalic",
  // Italic = "Italic",
  // Light = "Light",
  // LightItalic = "LightItalic",
  // Medium = "Medium",
  // MediumItalic = "MediumItalic",
  Regular = "Regular",
  SemiBold = "SemiBold",
  // SemiBoldItalic = "SemiBoldItalic",
  // Thin = "Thin",
  // ThinItalic = "ThinItalic",
}

export enum IconSize {
  Header = 30,
  Medium = 24,
  Small = 20,
}

export const Styles = StyleSheet.create({
  debug: {
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "green",
    opacity: 0.8,
  },
  debugBlue: {
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "blue",
    opacity: 0.8,
  },
  debugRed: {
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "red",
    opacity: 0.8,
  },
  screen: {
    // marginTop: 50,
    // marginBottom: 10,
    paddingLeft: Margin.ScreenLeftRightMargin,
    paddingRight: Margin.ScreenLeftRightMargin,
    flex: 1,
    backgroundColor: Color.White,

    // overflow: "visible", // Ensure shadow is not cut off
  },

  screenNoMargin: {
    flex: 1,
    backgroundColor: Color.White,
    // overflow: "visible", // Ensure shadow is not cut off
  },
  expand: {
    flex: 1,
  },
  centralize: {
    alignItems: "center",
    justifyContent: "center",
  },
  mobileWidth: {
    maxWidth: 500,
  },

  scrollViewStyle: {
    marginRight: -Margin.ScreenLeftRightMargin,
    marginLeft: -Margin.ScreenLeftRightMargin,
  },
  scrollViewContentContainerStyle: {
    paddingRight: Margin.ScreenLeftRightMargin,
    paddingLeft: Margin.ScreenLeftRightMargin,
  },
});
