import { BorderRadius, Color, Font, FontSize, Margin } from "@/assets/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    // borderRadius: 15,
    // elevation: 4, // For shadow effect
    // borderWidth: 1,
    // borderColor: "red",
    // justifyContent: "center",
    // marginLeft: 0,
    // alignItems: "center",
    // alignSelf: "center",
  },
  header: {},
  calendar: {
    flex: 1,
    width: "100%",
    borderTopWidth: 1,
    // paddingTop: 5,
    borderWidth: 1,
    borderColor: Color.VeryLightGrey,
    borderRadius: BorderRadius.borderRadius,
    height: 350,
    padding: Margin.InterElementsSpaceSmall,
    margin: Margin.InterElementsSpaceSmall,
    shadowColor: Color.Purple,
    shadowOffset: { width: 0, height: 5 }, // Reduced height for smoother shadow
    shadowOpacity: 0.2, // Lower opacity for a softer shadow
    shadowRadius: 8, // Increase radius for a smoother shadow spread
    elevation: 3,

    marginLeft: 0,

    // justifyContent: "center",
    // // alignItems: "center",
  },

  noCustomerButtonContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  noCustomerButtonInnerContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
  },
});
