//---------------------------------------------------------------------------------
/* File: /screens/phone-input/styles.ts */
//---------------------------------------------------------------------------------

import {
  BorderRadius,
  Color,
  Font,
  FontSize,
  LineHeight,
  Margin,
} from "@/assets/theme";
import { StyleSheet } from "react-native";

//---------------------------------------------------------------------------------

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.White,
  },
  dateContainer: {
    height: 60,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#F7EDEB",
  },
  innerDateContainer: {
    width: 50,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  dateText: {
    color: "#555",
    fontWeight: "bold",
  },
  scrollContainer: {
    position: "relative",
  },
  hourContainer: {
    height: 60,
    flexDirection: "row",
  },
  hourText: {
    width: 45,
    color: "#555",
  },
  hourLineContainer: {
    borderWidth: 0,
    borderColor: "transparent",
    flex: 1,
  },
  hourLine: {
    marginTop: 10,
    height: 1,
    backgroundColor: "#E3E3E3",
  },
  verticalLine: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: "#E3E3E3",
    left: 55, // Adjust as per the horizontal alignment of your time labels
  },
  event: {
    position: "absolute", // To position based on top and height
    left: 55, // Horizontal positioning to the right of time labels
    right: 20, // Adds padding from the right edge
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  regularlyAvailableSlot: {
    // backgroundColor: "#69B4FF",
    backgroundColor: Color.Blue,
  },
  customAvailableSlot: {
    backgroundColor: Color.Cyan,
  },
  jobSlot: {
    backgroundColor: Color.Purple,
    left: 80,
  },
  eventText: {
    color: "#fff",
    fontWeight: "bold",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: "#FFC4AB",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  addEditHeaderContainer: {
    width: "100%",
    paddingHorizontal: 15,
    backgroundColor: Color.White,
  },
});
//---------------------------------------------------------------------------------
