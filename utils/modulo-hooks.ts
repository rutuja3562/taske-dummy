//-----------------------------------------------------------------------------------------------------------
// File: src/utils/modulo-hooks.ts
//-----------------------------------------------------------------------------------------------------------

import { useEffect } from "react";
import { BackHandler } from "react-native";

//-----------------------------------------------------------------------------------------------------------

/* Return true in the callback if hardware back action should not be prevented */
export const useOnHardwareBackAction = (callback: () => boolean | void) => {
  useEffect(() => {
    const backAction = () => {
      let result = callback();
      return !result;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => backHandler.remove(); // Clean up the event listener
  }, [callback]);
};

//-----------------------------------------------------------------------------------------------------------
