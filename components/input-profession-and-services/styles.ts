import { Color, Font, FontSize, Margin } from "@/assets/theme";
import { StyleSheet } from "react-native";

// Styles
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  professionsContainer: {
    backgroundColor: "#F1F7FF",
    marginBottom: 15,
    // borderWidth: 1,
  },
  professionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F1FBFF",
    padding: 15,
    borderRadius: 10,
    // marginBottom: 10,
    // borderWidth: 1,
  },
  professionSelected: {
    backgroundColor: "#BFDFFF",
  },
  professionExpanded: {
    backgroundColor: "#90C9FF", // Change background when expanded
    marginBottom: 15,
    // borderWidth: 1,
  },
  professionTextExpanded: {
    color: "#FFF", // Change text color to white when expanded
  },
  professionText: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    marginLeft: 10,
  },
  subcategoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    // marginTop: 5,
    borderRadius: 8,
    marginHorizontal: 15,
    marginBottom: 15,
    // borderWidth: 1,
  },
  subcategoryExpanded: {
    marginBottom: 15,
    backgroundColor: "#90C9FF",
    // borderWidth: 1,
  },
  subcategoryText: {
    fontSize: 14,
    flex: 1,
    marginLeft: 10,
  },
  childCategoriesContainer: {
    marginHorizontal: 15,
    backgroundColor: "#ffffff",
    borderBottomWidth: 2,
    borderBottomColor: "#E8F0FF",
  },

  childCategoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginVertical: 2,
    borderRadius: 8,
    // marginHorizontal: 15,
    // borderWidth: 1,
  },
  childCategoryText: {
    fontSize: 13,
    flex: 1,
    marginLeft: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginBottom: 15,
    // borderWidth: 1,
  },
  costContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
    // borderWidth: 1,
  },
  currencyContainer: {
    flex: 1,
    backgroundColor: "#E8F0FF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
  },

  currency: {
    fontSize: FontSize.BodyCopy,
    fontFamily: Font.Regular,
  },
  cost: {
    fontSize: FontSize.BodyCopy,
    fontFamily: Font.Regular,
    marginLeft: 4,
  },
  serviceTimeContainer: { marginLeft: 7 },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeBox: {
    backgroundColor: "#E8F0FF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  timeText: {
    fontSize: FontSize.BodyCopy,
    fontFamily: Font.Regular,
  },
  helpingLabel: {
    fontSize: FontSize.SmallCopy,
    fontFamily: Font.Regular,
    marginVertical: 4,
    color: "#9C999E",
  },
  timeLabel: {
    fontSize: FontSize.BodyCopy,
    fontFamily: Font.Regular,
    marginHorizontal: 4,
  },
  iconButton: {
    marginLeft: 8,
  },
  costInput: {
    fontSize: FontSize.BodyCopy,
    fontFamily: Font.Regular,
    textAlign: "center",
    // borderWidth: 1,
  },

  timeInput: {
    fontSize: FontSize.BodyCopy,
    fontFamily: Font.Regular,
    textAlign: "center",
    width: 27,
  },
});
