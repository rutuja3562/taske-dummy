import { Font, FontSize, Margin } from "@/assets/theme";
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {},
  sliderContainer: {
    marginVertical: Margin.InterElementsSpaceSmall,
  },
  slider: {
    width: "100%",
    height: 40,
    padding: 0,
    marginLeft: -Margin.InterElementsSpaceSmall,
  },
});
export default styles;
