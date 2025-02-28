import React, { useEffect, useState } from "react";

import { Text, View, ViewStyle } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { SubHeader } from "../sub-header/SubHeader";
import { Color, Font, Styles } from "@/assets/theme";
// import SmallButtonOne from "../small-button-one/SmallButtonOne";
// import {
//   AvailabilityType,
//   CalendarClientData_Ready,
//   CalendarClientStates,
//   loadCalendar,
//   useCalendarClientData_Ready,
//   useCalendarClientState,
//   useIsCalendarClientState_Authorised,
//   VendorCustomDayAvailability,
//   VendorDayAvailability,
// } from "@/actors/calendar-client";
// import { getUserId } from "@/actors/auth-client";
import LoadingSpinner from "../loading-spinner/LoadingSpinner";
import {
  AvailabilityType,
  getDatesForDays,
  reduceDatesToMarkedDatesFormat,
  VendorCustomDayAvailability,
} from "@/utility-functions/utilities";
import { useRouter } from "expo-router";
import { Screens } from "@/utility-functions/types";
import { styles } from "./styles";
import SmallButtonOne from "../small-button-one/SmallButtonOne";

interface ViewMonthProps {
  fromDate: string; // Optional property
  toDate: string; // Optional property
  vendorId: string; // Optional property
  //   calendarReadyData: CalendarClientData_Ready | undefined;
  calendarReadyData: any;
  setFirstDayOfPreviousMonth: React.Dispatch<React.SetStateAction<string>>;
  setLastDayOfNextMonth: React.Dispatch<React.SetStateAction<string>>;
  calendarMonth: number;
  setCalendarMonth: React.Dispatch<React.SetStateAction<number>>;
  containerStyle?: ViewStyle;
}

export const ViewMonth: React.FC<ViewMonthProps> = ({
  fromDate,
  toDate,
  vendorId,
  calendarReadyData,
  setFirstDayOfPreviousMonth,
  setLastDayOfNextMonth,
  calendarMonth,
  setCalendarMonth,
  containerStyle,
}) => {
  const router = useRouter();
  //   const calendarClientState = useCalendarClientState();
  // const calendarReadyData: any = useCalendarClientData_Ready();
  // const calendarAuthorised = useIsCalendarClientState_Authorised();

  const [datesForNormalSchedule, setDatesForNormalSchedule] = useState<
    | {
        [key: string]: {
          selected: boolean;
          marked: boolean;
          selectedColor: string;
        };
      }
    | undefined
  >(undefined);

  // useEffect(() => {
  //   if (calendarAuthorised && fromDate && toDate && vendorId)
  //     loadCalendar(fromDate, toDate, vendorId);
  // }, [calendarAuthorised, fromDate, toDate, vendorId]);

  useEffect(() => {
    let datesForCalendarMapping: {
      [key: string]: {
        selected: boolean;
        marked: boolean;
        selectedColor: string;
      };
    } = {};
    if (
      (calendarReadyData as any)?.vendorSchedule?.dayAvailability &&
      (calendarReadyData as any)?.vendorSchedule?.dayAvailability.length > 0
    ) {
      const dates = getDatesForDays(
        (calendarReadyData as any)?.vendorSchedule?.dayAvailability
      );
      // alert(JSON.stringify(dates));
      datesForCalendarMapping = reduceDatesToMarkedDatesFormat(dates);
      // alert(JSON.stringify(datesForCalendarMapping));
    }
    if (
      (calendarReadyData as any)?.vendorSchedule?.customAvailability &&
      (calendarReadyData as any)?.vendorSchedule?.customAvailability.length > 0
    ) {
      const customAvailabilityRecords: VendorCustomDayAvailability[] = (
        calendarReadyData as any
      )?.vendorSchedule?.customAvailability;
      let customAvailableDates: string[] = [];
      let customUnavailableDates: string[] = [];
      customAvailabilityRecords.map((item) => {
        if (item.type === AvailabilityType.Unavailable)
          customUnavailableDates.push(item.date.toString());
        else customAvailableDates.push(item.date.toString());
      });
      // alert(customUnavailableDates);
      customUnavailableDates.forEach((date) => {
        if (datesForCalendarMapping[date]) {
          // datesForCalendarMapping[date].selectedColor = "#008000";
          delete datesForCalendarMapping[date];
        }
        // else {
        //   datesForCalendarMapping[date] = {
        //     selected: true,
        //     marked: true,
        //     selectedColor: "#FFA07A",
        //   };
        // }
      });
      customAvailableDates.forEach((date) => {
        if (datesForCalendarMapping[date]) {
          datesForCalendarMapping[date].selectedColor = "#008000";
        }
      });
    }
    setDatesForNormalSchedule(datesForCalendarMapping);
  }, [calendarReadyData]);

  // alert(JSON.stringify(datesForNormalSchedule));

  // console.log(">>> Calendar", JSON.stringify(calendarReadyData));
  // console.log("111 Calendar state", calendarClientState);
  const defaultContainerStyle = {
    backgroundColor: "#F5F5F5", // Light gray background
    borderRadius: 10, // Optional: rounded corners
    marginBottom: 15, // Optional: add some bottom margin
    paddingVertical: 10, // Optional: add some vertical padding
    paddingHorizontal: 10, // Optional: add some horizontal padding
  };
  const handleMonthChange = (month: { dateString: string }) => {
    console.log("Month changed to:", month.dateString, fromDate, toDate); // Log the new month
    const newMonth = month.dateString;
    const currentMonth = "2024-12-01";
    const currentDate = new Date(currentMonth);
    const newDate = new Date(newMonth);

    // Determine if the next or previous button was pressed
    if (newDate > currentDate) {
      console.log("Next button pressed");
    } else if (newDate < currentDate) {
      console.log("Previous button pressed");
    }
  };

  const render = () => {
    // switch (calendarClientState.state) {
    //   case CalendarClientStates.Ready:
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: "#F5F5F5" },
          containerStyle || defaultContainerStyle, // Apply additional custom styles
        ]}
      >
        <View style={{ marginTop: 10 }}>
          <View style={[styles.noCustomerButtonContainer]}></View>
        </View>
        <View style={styles.header}></View>
        <Calendar
          enableSwipeMonths={true}
          current={new Date().toISOString().split("T")[0]}
          onDayPress={(day: DateData) => {
            console.log("Selected date:", day.dateString); // Log the selected date
            if (
              datesForNormalSchedule &&
              !datesForNormalSchedule[day.dateString]
            ) {
              alert("Seems like no schedule is set for the day");
            } else {
              //   router.push({
              //     pathname: Screens.VendorViewDay as any,
              //     params: {
              //       // date: new Date().toISOString().split("T")[0],
              //       date: day.dateString,
              //       vendorId,
              //       calendarReadyData: JSON.stringify(calendarReadyData),
              //     },
              //   });
            }
          }}
          // markedDates={{
          //   "2024-12-06": {
          //     selected: true,
          //     marked: true,
          //     selectedColor: "#87CEFA", // Light blue for selected dates
          //   },
          //   "2024-12-09": {
          //     selected: true,
          //     marked: true,
          //     selectedColor: "#87CEFA",
          //   },
          //   "2024-12-23": {
          //     selected: true,
          //     marked: true,
          //     selectedColor: "#FFA07A", // Light orange for the other selected date
          //   },
          // }}
          markedDates={datesForNormalSchedule ?? {}}
          onMonthChange={handleMonthChange}
          theme={{
            backgroundColor: Color.White,
            calendarBackground: Color.White,
            textSectionTitleColor: "#B6C1CD",
            selectedDayBackgroundColor: "#87CEFA", // Same as marked dates
            selectedDayTextColor: "#FFFFFF",
            todayTextColor: "#FFA07A",
            dayTextColor: "#2D4150",
            textDisabledColor: "#D9E1E8",
            arrowColor: "#000000", // Color for arrows
            monthTextColor: "#000000",
            indicatorColor: "#000000",
            textDayFontWeight: "500",
            textMonthFontWeight: "700",
            textDayHeaderFontWeight: "600",
            textDayFontSize: 16,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 14,
          }}
          style={styles.calendar}
        />
      </View>
    );
    //   default:
    //     return <LoadingSpinner />;
    // }
  };

  return render();
};
