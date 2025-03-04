import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { BorderRadius, Color, Margin } from "@/assets/theme";
import { InputPhoneNumber } from "@/components/input-phone-number/InputPhoneNumber";
import { InputOtp } from "@/components/input-otp/InputOtp";
import { InputPersonName } from "@/components/input-person-name/InputPersonName";
import { InputTnC } from "@/components/input-tnc/InputTnC";
import { InputEntriesFromPhoneBook } from "@/components/input-entries-from-phone-book/InputEntriesFromPhoneBook";
import { InputImageFile } from "@/components/input-image-file/InputImageFile";
import { InputDocFile } from "@/components/input-doc-file/InputDocFile";
import { ViewDay } from "@/components/view-day/ViewDay";
import { InputSchedule } from "@/components/input-schedule/InputSchedule";
import { ViewMonth } from "@/components/View-month/ViewMonth";
import {
  getFirstDayOfPreviousMonth,
  getLastDayOfNextMonth,
} from "@/utility-functions/utilities";
import { OldInputProfessionsAndServices } from "@/components/input-profession-and-services/OldInputProfessionsAndServices";
import { InputYearsAndMonth } from "@/components/input-years-and-month/InputYearsAndMonth";
import { InputCountryCode } from "@/components/input-country-code/InputCountryCode";
import Otp from "@/components/input-otp/Otp";

import {
  professionsAndServicesData,
  vendorSchedule,
  calendarReadyData,
  servicesData,
} from "@/components/input-profession-and-services/professionData";
import InputProfessionsAndServices from "@/components/input-profession-and-services/InputProfessionsAndServices";

export default function HomeScreen() {
  // --------------------------------------------------------------------------------
  const [phoneValue, setPhoneValue] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [years, setYears] = useState(0);
  const [months, setMonths] = useState(0);
  const [selectedContacts, setSelectedContacts] = useState<
    { name: string; phone: string }[]
  >([]);

  const [uploadedImageFile, setUploadedImageFile] = useState<{
    fileName: string;
    fileUri: string;
  } | null>(null);

  const [uploadedDocFile, setUploadedDocFile] = useState<{
    fileName: string;
    fileUri: string;
  } | null>(null);

  const [firstDayOfPreviousMonth, setFirstDayOfPreviousMonth] =
    useState<string>(getFirstDayOfPreviousMonth(new Date()));

  const [lastDayOfNextMonth, setLastDayOfNextMonth] = useState<string>(
    getLastDayOfNextMonth(new Date())
  );

  const [calendarMonth, setCalendarMonth] = useState<number>(
    new Date().getMonth()
  );

  const [yearsOfExperience, setYearsOfExperience] = useState(0);

  // ---------------------------------------------------------------------------

  useEffect(() => {
    // console.log("Updated selected contacts:", selectedContacts);
  }, [selectedContacts]);

  useEffect(() => {
    // console.log("work experience:", years, " .", months);
  }, [years, months]);

  // ---------------------------------------------------------------------------

  // Handlers

  const handlePhoneChange = (phone: string) => {
    setPhoneValue(phone);
    // console.log("Phone changed to:", phone);
  };

  const handleInputPersonChange = (name: string) => setNameValue(name);

  const handleInputOtpChange = (otp: string) => setOtpValue(otp);

  const handlePhoneFromPhoneBook = (
    contacts: { name: string; phone: string }[]
  ) => setSelectedContacts(contacts);

  const handleImageFileUploadSuccess = (fileName: string, fileUri: string) =>
    setUploadedImageFile({ fileName, fileUri });

  const handleDocFileUploadSuccess = (fileName: string, fileUri: string) =>
    setUploadedDocFile({ fileName, fileUri });

  const handleClearPhone = () => {
    setPhoneValue("");
  };

  const handleClearName = () => {
    setNameValue("");
  };

  const handleSaveScheduledCalenderData = (
    standardAvailability: any,
    customAvailability: any,
    job: any
  ) => {
    // console.log(
    //   "standardAvailability",
    //   standardAvailability,
    //   "customAvailability",
    //   customAvailability,
    //   "job",
    //   job
    // );
  };

  const handleSaveProfessionAndServices = ({
    services,
    phone,
    profession,
    meta,
  }: any) => {
    console.log(
      "profession>>>",
      profession,
      "services>>>",
      JSON.stringify(services)
    );
  };

  const handleCountryCodeChange = () => {
    setCountryCode(countryCode);
  };

  const handleFocusInput = () => {
    setIsFocused(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.inputContainer}>
          <Text>Select your Profession and services</Text>
          {/* <OldInputProfessionsAndServices
            data={servicesData}
            onSaveProfessionAndServices={handleSaveProfessionAndServices}
          /> */}
          <InputProfessionsAndServices
            professionsAndServicesData={professionsAndServicesData}
            onProfessionAndServicesChange={handleSaveProfessionAndServices}
          />
        </View>
        {/* <View style={styles.inputContainer}>
          <View style={styles.CountryCodeAndPhoneInputContainer}>
            <InputCountryCode
              setCountryCode={setCountryCode}
              countryCode={countryCode}
              onChangeountryCode={handleCountryCodeChange}
              isFocused={isFocused}
            />
            <InputPhoneNumber
              phoneValue={phoneValue}
              onPhoneChange={handlePhoneChange}
              clearPhone={handleClearPhone}
              onFocusInput={handleFocusInput}
              isFocused={isFocused}
              setIsFocused={setIsFocused}
            />
          </View>
        </View> */}
        {/* <View style={styles.inputContainer}>
          <InputOtp
            otpValue={otpValue}
            handleOtpChange={handleInputOtpChange}
          />
        </View> */}
        {/* <View style={styles.inputContainer}>
          <InputPersonName
            nameValue={nameValue}
            onNameChange={handleInputPersonChange}
            clearName={handleClearName}
          />
        </View> */}
        {/* <View style={styles.inputContainer}>
          <InputTnC
            text="By creating an account you agree to our"
            checkBoxText="Terms & Conditions"
          />
        </View> */}
        {/* <View style={styles.inputContainer}>
          <InputImageFile onUploadSuccess={handleImageFileUploadSuccess} />
        </View> */}
        {/* <View style={styles.inputContainer}>
          <InputDocFile onUploadSuccess={handleDocFileUploadSuccess} />
        </View> */}
        {/* <View style={styles.inputContainer}>
          <ViewDay
            date="2023-08-01"
            vendorId=""
            calendarReadyData={vendorSchedule}
          />
        </View> */}
        {/* <View style={styles.inputContainer}>
          <InputSchedule
            vendorId=""
            calendarReadyData={vendorSchedule}
            fromDate=""
            toDate=""
            onSaveScheduledCalenderData={handleSaveScheduledCalenderData}
          />
        </View> */}
        {/* <View style={styles.inputContainer}>
          <ViewMonth
            vendorId=""
            calendarReadyData={calendarReadyData}
            fromDate=""
            toDate=""
            setFirstDayOfPreviousMonth={setFirstDayOfPreviousMonth}
            setLastDayOfNextMonth={setLastDayOfNextMonth}
            calendarMonth={calendarMonth}
            setCalendarMonth={setCalendarMonth}
            // calendarReadyData={calendarReadyData}
            containerStyle={{
              backgroundColor: "#F5F5F5", // Light gray background
              borderRadius: 10, // Optional: rounded corners
              marginBottom: 15, // Optional: add some bottom margin
              paddingVertical: 10, // Optional: add some vertical padding
              paddingHorizontal: 10, // Optional: add some horizontal padding
            }}
          />
        </View> */}
        {/* <View style={styles.inputContainer}>
          <InputYearsAndMonth
            setYears={setYears}
            setMonths={setMonths}
            years={years}
            months={months}
          />
        </View>
        <View style={styles.inputContainer}>
          <Otp />
        </View> */}
      </ScrollView>
      {/* <View style={[styles.inputContainer, styles.inputContactContainer]}>
        <InputEntriesFromPhoneBook onImportPhone={handlePhoneFromPhoneBook} />
      </View> */}
    </View>
  );
}

// ------------------------------------------------------------------------------
// Styles

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: Margin.InterElementsSpaceSmall,
    marginHorizontal: Margin.InterElementsSpaceLarge,
    // borderWidth: 1,
  },
  CountryCodeAndPhoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: BorderRadius.countryCodeBorderRadius,
    width: "100%",
  },
  container: { backgroundColor: Color.White },
  inputContactContainer: { height: 380 },
});
