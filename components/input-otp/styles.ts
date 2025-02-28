//---------------------------------------------------------------------------------
/* File: /screens/otp-input/styles.ts */
//---------------------------------------------------------------------------------

import { Color, Font, FontSize, Margin } from "@/assets/theme";
import { StyleSheet } from "react-native";

//---------------------------------------------------------------------------------

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: Color.White,
    // marginHorizontal: 3,
    // paddingHorizontal: 15,
    // position: "relative",
    // borderWidth: 1,
    // borderColor: "red",
  },
  imageContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
    // borderColor: "blue",
  },
  welcomeImage: {
    width: 208,
    height: 208,
  },

  welcomeTextImage: {
    width: 184,
    height: 90,
    position: "relative",
    bottom: Margin.InterElementsSpaceLarge,
    // marginTop: -18,
    // backgroundColor: Color.Transparent,
  },

  containerShadow: {
    width: "100%",
    backgroundColor: Color.White,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
    // borderColor: "blue",
  },

  subtitle: {
    // fontSize: 18,
    // color: Color.Black,
    // marginBottom: 40,
  },
  verificationText: {
    // fontSize: 14,
    // color: "#000",
    // marginBottom: 20,
  },
  // signInButton: {
  //   width: "80%",
  //   height: 50,
  //   backgroundColor: "#ff7f50",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   borderRadius: 8,
  //   marginBottom: 20,
  // },
  // signInButtonText: {
  //   color: "#fff",
  //   fontSize: 18,
  //   fontWeight: "bold",
  // },
  signUpText: {
    color: Color.Blue,
    fontSize: FontSize.SmallCopy,
    fontFamily: Font.Regular,
    marginLeft: Margin.InterElementsSpaceSmall,
  },
  // otpText: {
  //   color: "#212121",
  //   fontSize: 14,
  //   marginLeft: 12,
  //   alignSelf: "flex-start",
  //   width: "100%",
  //   marginBottom: 11,
  // },
  otpCont: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Margin.InterElementsSpaceSmall,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: Margin.InterElementsSpaceLarge,
  },
  // otpInput: {
  //   width: 45,
  //   height: 45,
  //   borderWidth: 1,
  //   borderColor: "#212121",
  //   borderRadius: 10,
  //   textAlign: "center",
  //   fontSize: FontSize.BodyCopy,
  // },
  cell: {
    width: 45,
    height: 45,
    fontSize: FontSize.Heading,
    textAlign: "center",
    textAlignVertical: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: Margin.InterElementsSpaceSmall,
    borderColor: "#DFE0E7",
    borderWidth: 1,
    borderRadius: 10,
    fontFamily: Font.Regular,
    backgroundColor: Color.VeryLightGrey,
    color: Color.Black,
  },
  cellText: {
    fontSize: FontSize.BodyCopy,
    // fontFamily: Font.SemiBold,
    color: "#212121",
  },
  focusCell: {
    borderColor: Color.Purple,
  },
  footerContainer: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    // marginTop: -8,
    marginBottom: Margin.InterElementsSpaceSmall,
  },
  // btnContainer: {
  //   width: "100%",
  // },
  headerContainer: {
    // position: "absolute",
    // left: 0,
    // borderWidth: 1,
    width: "100%",
  },
});

//---------------------------------------------------------------------------------
