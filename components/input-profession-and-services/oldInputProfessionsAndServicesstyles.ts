import { Color, Font, FontSize, Margin } from "@/assets/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
  },

  scrollContainer: {
    width: "100%",
  },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Margin.InterElementsSpaceLarge,
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: Color.Purple,
    paddingTop: Margin.InterElementsSpaceLarge,
  },
  checkboxChildContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
    width: "100%",
    marginBottom: Margin.InterElementsSpaceLarge,
  },
  timeInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingVertical: 5,
    marginBottom: Margin.InterElementsSpaceLarge,
    marginRight: Margin.InterElementsSpaceLarge + 10,
  },
  childContainer: {
    // paddingLeft: 20, // Add indentation for children
  },
  childCheckbox: {
    // paddingLeft: 20, // Apply more left padding to the child checkboxes
  },
  checkboxText: {
    flex: 1,
    color: "#22172A",
    fontFamily: Font.Regular,
    fontSize: FontSize.BodyCopy,
  },
  priceInput: {
    height: 24,
    width: 75,
    borderColor: Color.LightGrey,
    borderWidth: 1,
    paddingHorizontal: 10,
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 6,
    marginRight: Margin.InterElementsSpaceSmall,
    marginLeft: 5,
    paddingVertical: 0,
    paddingTop: 0,
    lineHeight: 24,
  },
  copyIcon: {
    marginRight: Margin.InterElementsSpaceSmall,
  },
  topBorder: {
    borderTopWidth: 1,
    borderTopColor: Color.Purple,
    marginBottom: Margin.InterElementsSpaceSmall,
  },
  checkboxTextParent: {
    flex: 1,
    color: "#000",
    fontSize: FontSize.BodyCopy,
    fontFamily: Font.SemiBold,
    width: "100%",
  },
  checkbox: {
    backgroundColor: "transparent",
    borderColor: "transparent",
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
  },
  close: {
    marginRight: Margin.InterElementsSpaceSmall,
  },
});
