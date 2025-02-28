import { Color, Font, FontSize } from "@/assets/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  completeProfileText: {
    fontSize: FontSize.Heading,
    fontFamily: Font.SemiBold,
    color: Color.Black,
  },
  userProfile: {
    // marginLeft: 30,
    // backgroundColor: "red",
    position: "relative",
    left: 3,
  },
});
