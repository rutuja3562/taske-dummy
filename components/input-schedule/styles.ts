import { Color, Font, FontSize, Margin } from "@/assets/theme";
import { StyleSheet } from "react-native";

//---------------------------------------------------------------------------------

export const styles = StyleSheet.create({
  inputScheduleContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Color.White,
    // padding: 15,
    marginTop: 10,
  },
  dayRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    minHeight: 45,
    backgroundColor: Color.VeryLightGrey,
    padding: 5,
  },
  dayRow1: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 45,
    backgroundColor: Color.VeryLightGrey,
    padding: 5,
    paddingTop: 10,
  },
  dayText: {
    fontSize: 14,
    marginRight: 10,
    textAlign: "center",
    width: 30,
  },
  slotsContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    // marginBottom: 5,
  },
  slotRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    borderRadius: 5,
    backgroundColor: Color.VeryLightGrey,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  pickerDiv: {
    flexDirection: "row",
    flex: 2,
    alignItems: "center",
  },
  RNpickerContainer: {
    flexDirection: "row",
    alignItems: "center", // Ensures vertical alignment within the container
  },
  downArrowIcon: {
    position: "absolute",
    right: 1,
    top: 10,
  },
  actionButtons: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "transparent",
    padding: 2,
    borderRadius: 50,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: Color.Black,
  },
  disableButton: {
    backgroundColor: "transparent",
    padding: 2,
    // borderRadius: 50,
    marginLeft: 10,
    // borderWidth: 1,
    // borderColor: Color.Black,
  },
  addButtonIcon: {
    backgroundColor: "transparent",
    padding: 2,
    borderRadius: 50,
    marginLeft: 17,
    borderWidth: 1,
    borderColor: Color.Black,
  },
  picker: {
    flex: 2,
    backgroundColor: Color.White,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  dash: {
    fontSize: 18,
    fontWeight: "bold",
  },
  iconButton: {
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 16,
  },
  copyButton: {
    marginLeft: 10,
  },
  unavailableContainer: {
    flexDirection: "row",
    flex: 2,
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: Color.VeryLightGrey,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  unavailableTextDiv: {
    flexDirection: "row",
    flex: 3,
  },
  unavailableText: {
    color: Color.DarkGrey,
  },
  addButtonContainer: {
    flexDirection: "row",
    flex: 1,
  },
  input: {
    width: 75,
    borderRadius: 8,
    // paddingHorizontal: 10,
    height: 40,
    color: "#000",
    backgroundColor: Color.LightPurple,
  },
  addEditHeaderContainer: {
    width: "100%",
    // paddingHorizontal: 15,
    backgroundColor: Color.White,
  },
  calendar: {},
  calendarContainer: {
    // position: "absolute",
    // top: 50, // You can adjust the position as per your layout
    // left: 0,
    // right: 0,
    // backgroundColor: "white",
    // borderRadius: 10,
    // elevation: 5, // For Android shadow
    // shadowColor: "#000", // For iOS shadow
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // zIndex: 999, // Ensures the popup stays on top of other elements
    // padding: 10, // Optional padding inside the container
  },
  dayTextInput: {
    borderColor: Color.DarkGrey,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    color: "#000",
    backgroundColor: Color.LightPurple,
    marginTop: -5,
    marginLeft: 5,
    // marginRight: 5,
  },
});
