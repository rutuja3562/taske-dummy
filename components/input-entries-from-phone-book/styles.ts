//---------------------------------------------------------------------------------
/* File: /screens/contact-list/styles.ts */
//---------------------------------------------------------------------------------

import { BorderRadius, Color, Font, FontSize, Margin } from "@/assets/theme";
import { StyleSheet } from "react-native";

//---------------------------------------------------------------------------------

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: FontSize.Heading,
    fontFamily: Font.SemiBold,
    marginBottom: 20,
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 84,
    // paddingHorizontal: 10,
  },
  contactRowOdd: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 84,
    backgroundColor: Color.VeryLightGrey,
    paddingHorizontal: 10,
  },
  contactName: {
    fontSize: FontSize.BodyCopy,
    fontFamily: Font.SemiBold,
  },
  contactNumber: {
    fontSize: FontSize.BodyCopy,
    fontFamily: Font.Regular,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#5B67F1",
  },
  headerContainer: {
    width: "100%",
    paddingHorizontal: 15,
    backgroundColor: Color.White,
  },
  addContactButton: {
    alignItems: "flex-end",
    marginBottom: 10,
  },
  profileAndName: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  profileAndNameOdd: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    backgroundColor: Color.VeryLightGrey,
  },
  nameAndNumberContainer: {
    flex: 1,
  },
  checkboxContainer: {
    width: 24,
    height: 24,
    borderRadius: 4, // Rounded corners
    borderWidth: 2,
    borderColor: Color.Cyan,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.Cyan, // Custom background color
    marginLeft: 10,
  },
  checkboxContainerNotSelected: {
    width: 24,
    height: 24,
    borderRadius: 4, // Rounded corners
    borderWidth: 2,
    borderColor: Color.LightGrey,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.White, // Custom background color
    marginLeft: 10,
  },
  initialText: {
    fontSize: FontSize.SmallCopy,
    fontFamily: Font.Regular,
    color: Color.White,
  },
  searchContainer: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    borderColor: Color?.LightGrey,
    borderWidth: 1,
    fontSize: FontSize?.BodyCopy,
    fontFamily: Font?.Regular,
    backgroundColor: Color?.VeryLightGrey,
    color: Color?.Black,
    marginBottom: Margin.InterElementsSpaceLarge,
  },
  searchInput: {
    height: 52,
    borderColor: Color?.LightGrey,
    borderWidth: 1,
    borderRadius: BorderRadius?.countryCodeBorderRadius,
    paddingLeft: Margin.InterElementsSpaceSmall,
    fontSize: FontSize?.BodyCopy,
    fontFamily: Font?.Regular,
    backgroundColor: Color?.VeryLightGrey,
    color: Color?.Black,
  },
  closeIcon: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  closeCircle: {
    position: "absolute",
    right: Margin.InterElementsSpaceSmall,
  },
  clearText: {},
  doneButton: {},
  contactInfo: {},
  selectedContact: {},
  selectedContactRow: {},
  doneButtonText: {
    fontSize: FontSize.Heading,
    fontFamily: Font.SemiBold,
    marginBottom: 20,
  },
});

//---------------------------------------------------------------------------------
