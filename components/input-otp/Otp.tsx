import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { styles } from "./styles";
// @ts-ignore
import welcomeImage from "../../assets/images/HERO-IMAGE.png";
// @ts-ignore
// import splashNoBg from "../../assets/images/splash-no-bg.png";
// @ts-ignore
import welcomeTextImage from "../../assets/images/task-e.png";
import {
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

import { Color, Styles } from "@/assets/theme";
import HeaderOne from "@/components/header-one/HeaderOne";

import LoadingSpinner from "@/components/loading-spinner/LoadingSpinner";
import { InputOtp } from "./InputOtp";

const otpValidationSchema = Yup.object().shape({
  otp: Yup.string()
    .length(6, "OTP must be exactly 6 digits")
    .required("OTP is required"),
});

const Otp = () => {
  // const toastRef = useRef<Toast>(null); // Create a ref for Toast

  const [showToast, setShowToast] = useState(false);

  const handleShowToast = () => {
    setShowToast(true);
  };

  const handleDismissToast = () => {
    setOtpResendSuccessMessage("");
  };

  const CELL_COUNT = 6;
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [otpValidationError, setOtpValidationError] = useState<string>("");

  const [otpResendSuccessMessage, setOtpResendSuccessMessage] =
    useState<string>();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleVerify = async (values: { otp: string }) => {
    // try {
    //   if (authClientState.state === AuthClientStates.WaitForRegisterOtp) {
    //     validateRegisterOtp((unAuthorisedData as any)?.phone, values.otp);
    //   }
    //   if (authClientState.state === AuthClientStates.WaitForLoginOtp) {
    //     validateLoginOtp((unAuthorisedData as any)?.phone, values.otp);
    //   }
    // } catch (error) {
    //   if (error instanceof Yup.ValidationError) {
    //     console.log("Validation Error:", error.message);
    //     setOtpValidationError(error.message);
    //   } else {
    //     console.log("Unexpected Error:", error);
    //     setOtpValidationError(error as string);
    //   }
    // }
  };

  const resendOTP = async () => {
    // if (authClientState.state === AuthClientStates.WaitForRegisterOtp) {
    //   resendRegisterOtp((unAuthorisedData as any)?.phone);
    // }
    // if (authClientState.state === AuthClientStates.WaitForLoginOtp) {
    //   resendLoginOtp((unAuthorisedData as any)?.phone);
    // }
    // handleShowToast();
  };

  const onBackPress = () => {
    // if (authClientState.state === AuthClientStates.WaitForRegisterOtp) {
    //   cancelRegisterOtp();
    // }
    // if (authClientState.state === AuthClientStates.WaitForLoginOtp) {
    //   cancelLoginOtp();
    // }
    // cancelRegisterOtp();
  };

  return (
    <>
      <Formik
        // initialValues={{ otp: "454545" }}
        initialValues={{ otp: "" }}
        validationSchema={otpValidationSchema}
        onSubmit={handleVerify}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => {
          const ref = useBlurOnFulfill({
            value: values.otp,
            cellCount: CELL_COUNT,
          });
          const [props, getCellOnLayoutHandler] = useClearByFocusCell({
            value: values.otp,
            setValue: (otp: string) => {
              setFieldValue("otp", otp);
              if (otp.length < CELL_COUNT) {
                setOtpValidationError("");
              }
            },
          });

          // Function to handle button press
          const handleButtonPress = () => {
            //   console.log("VALUES????", values);
            //   if (values.otp.length === 0) {
            //     setOtpValidationError("OTP is required.");
            //   } else if (values.otp.length < CELL_COUNT) {
            //     setOtpValidationError("OTP must be exactly 6 digits.");
            //   } else {
            //     setOtpValidationError("");
            //     handleSubmit();
            //   }
          };

          return (
            <View>
              <InputOtp
                ref={ref}
                props={props}
                otpValue={values.otp}
                handleOtpChange={handleChange("otp")}
                cellCount={CELL_COUNT}
                getCellOnLayoutHandler={getCellOnLayoutHandler}
              />
            </View>
          );
        }}
      </Formik>
    </>
  );
};

export default Otp;
