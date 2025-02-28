import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { Color, Margin } from "@/assets/theme";
import { InputPhoneNumber } from "@/components/input-phone-number/InputPhoneNumber";
import { InputOtp } from "@/components/input-otp/InputOtp";
import { InputPersonName } from "@/components/input-person-name/InputPersonName";
import { InputTnC } from "@/components/input-tnc/InputTnC";
import InputEntriesFromPhoneBook from "@/components/input-entries-from-phone-book/InputEntriesFromPhoneBook";
import { InputImageFile } from "@/components/input-image-file/InputImageFile";
import { InputDocFile } from "@/components/input-doc-file/InputDocFile";
import { ViewDay } from "@/components/view-day/ViewDay";
import { InputSchedule } from "@/components/input-schedule/InputSchedule";
import { ViewMonth } from "@/components/View-month/ViewMonth";
import {
  getFirstDayOfPreviousMonth,
  getLastDayOfNextMonth,
} from "@/utility-functions/utilities";

export default function HomeScreen() {
  const [phoneValue, setPhoneValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [otpValue, setOtpValue] = useState("");
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
  // Handlers
  const handlePhoneChange = (phone: string) => setPhoneValue(phone);
  const handleInputPersonChange = (name: string) => setNameValue(name);
  const handleInputOtpChange = (otp: string) => setOtpValue(otp);
  const handlePhoneFromPhoneBook = (
    contacts: { name: string; phone: string }[]
  ) => setSelectedContacts(contacts);
  const handleImageFileUploadSuccess = (fileName: string, fileUri: string) =>
    setUploadedImageFile({ fileName, fileUri });
  const handleDocFileUploadSuccess = (fileName: string, fileUri: string) =>
    setUploadedDocFile({ fileName, fileUri });

  useEffect(() => {
    console.log("Updated selected contacts:", selectedContacts);
  }, [selectedContacts]);

  const vendorSchedule = {
    fromDate: "2024-12-01",
    toDate: "2024-12-05",
    vendorId: "v1",
    dayAvailability: [
      {
        vendor: { id: "v1", name: "Virat" },
        day: "sunday",
        startTime: "09:00",
        endTime: "11:00",
      },
      {
        vendor: { id: "v1", name: "Virat" },
        day: "sunday",
        startTime: "14:00",
        endTime: "16:00",
      },
      {
        vendor: { id: "v1", name: "Virat" },
        day: "monday",
        startTime: "09:00",
        endTime: "16:00",
      },
      {
        vendor: { id: "v1", name: "Virat" },
        day: "tuesday",
        startTime: "12:00",
        endTime: "16:00",
      },
      {
        vendor: { id: "v1", name: "Virat" },
        day: "wednesday",
        startTime: "09:00",
        endTime: "12:00",
      },
    ],
    customAvailability: [
      {
        type: "available",
        vendor: { id: "v1", name: "Virat" },
        date: "2024-12-04",
        startTime: "09:00",
        endTime: "17:00",
      },
      {
        type: "unavailable",
        vendor: { id: "v1", name: "Virat" },
        date: "2024-12-05",
        startTime: "",
        endTime: "",
      },
    ],
    jobs: [
      {
        vendor: { id: "v1", name: "Virat" },
        customer: { id: "c1", name: "Kirat" },
        job: { id: "j1", name: "Wiring" },
        date: "2024-12-02",
        startTime: "14:00",
        endTime: "15:00",
      },
    ],
  };
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
    console.log(
      "standardAvailability",
      standardAvailability,
      "customAvailability",
      customAvailability,
      "job",
      job
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.inputContainer}>
          <InputPhoneNumber
            phoneValue={phoneValue}
            onPhoneChange={handlePhoneChange}
            clearPhone={handleClearPhone}
          />
        </View>
        <View style={styles.inputContainer}>
          <InputOtp
            otpValue={otpValue}
            handleOtpChange={handleInputOtpChange}
          />
        </View>
        <View style={styles.inputContainer}>
          <InputPersonName
            nameValue={nameValue}
            onNameChange={handleInputPersonChange}
            clearName={handleClearName}
          />
        </View>
        <View style={styles.inputContainer}>
          <InputTnC
            text="By creating an account you agree to our"
            checkBoxText="Terms & Conditions"
          />
        </View>

        <View style={styles.inputContainer}>
          <InputImageFile onUploadSuccess={handleImageFileUploadSuccess} />
        </View>
        <View style={styles.inputContainer}>
          <InputDocFile onUploadSuccess={handleDocFileUploadSuccess} />
        </View>

        <View style={styles.inputContainer}>
          <ViewDay
            date="2023-08-01"
            vendorId=""
            calendarReadyData={vendorSchedule}
          />
        </View>
        <View style={styles.inputContainer}>
          <InputSchedule
            vendorId=""
            calendarReadyData={vendorSchedule}
            fromDate=""
            toDate=""
            onSaveScheduledCalenderData={handleSaveScheduledCalenderData}
          />
        </View>
        <View style={styles.inputContainer}>
          <ViewMonth
            vendorId=""
            calendarReadyData={vendorSchedule}
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
        </View>
      </ScrollView>
      {/* <View style={[styles.inputContainer, styles.inputContactContainer]}>
        <InputEntriesFromPhoneBook onImportPhone={handlePhoneFromPhoneBook} />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: Margin.InterElementsSpaceSmall,
    marginHorizontal: 30,
    //  Margin.InterElementsSpaceLarge,
  },
  container: { backgroundColor: Color.White },
  inputContactContainer: { height: 380 },
  uploadedFileContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
});
