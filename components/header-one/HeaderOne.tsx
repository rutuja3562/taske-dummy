//---------------------------------------------------------------------------------
// File: /components/header-one/HeaderOne.tsx
//---------------------------------------------------------------------------------

import { useNavigation, useRouter } from "expo-router";
import { styles } from "./styles";
import { Text, TouchableOpacity, View } from "react-native";
import BackIcon from "@/assets/svg-icons/BackIcon";
import { Styles } from "@/assets/theme";

//---------------------------------------------------------------------------------

function HeaderOne({
  title,
  setAuthClientState,
  stateToUpdate,
  onRightIconPress,
  onLeftIconPress,
  screenTitle,
}: {
  title?: string;
  setAuthClientState?: any;
  stateToUpdate?: any;
  onRightIconPress?: () => void;
  onLeftIconPress: () => void;
  screenTitle?: string;
}) {
  const navigation = useNavigation();
  const router = useRouter();

  return (
    <View style={[styles.header]}>
      <TouchableOpacity
        style={styles.backArrow}
        onPress={() => onLeftIconPress()}
      >
        <BackIcon />
      </TouchableOpacity>
      {screenTitle && <Text style={styles.screenTitleText}>{screenTitle}</Text>}
      {title && (
        <TouchableOpacity style={styles.skipButton} onPress={onRightIconPress}>
          <Text style={styles.title}>{title ?? ""}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

//---------------------------------------------------------------------------------

export default HeaderOne;

//---------------------------------------------------------------------------------
