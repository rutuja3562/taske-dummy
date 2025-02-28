import React, { useCallback, useEffect, useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";

import { Color, Font, Styles } from "@/assets/theme";

import { useOnHardwareBackAction } from "@/utils/modulo-hooks";
import { useRouter } from "expo-router";
import { styles } from "./styles";
import {
  getCustomAvailableSlots,
  getDayFromDate,
  getTimeSlotsForDay,
} from "@/utility-functions/utilities";
import LoadingSpinner from "../loading-spinner/LoadingSpinner";

interface ViewDayProps {
  date: string;
  vendorId: string; // Optional property
  calendarReadyData: any;
  //   calendarReadyData: CalendarClientData_Ready;
}

export const ViewDay: React.FC<ViewDayProps> = ({
  date,
  vendorId,
  calendarReadyData,
}) => {
  const router = useRouter();
  const [day, setDay] = useState<string>("");
  const [availableSlots, setAvailableSlots] =
    useState<{ title: string; start: string; end: string }[]>();
  const scrollViewRef = useRef<ScrollView>(null);

  const goBack = useCallback(() => {
    router.back();
    return true;
  }, []);
  useOnHardwareBackAction(goBack);

  const hours = Array.from(
    { length: 24 },
    (_, i) => `${i.toString().padStart(2, "0")}:00`
  );

  const hourHeight = 60;
  const minuteHeight = hourHeight / 60;

  const timeToPosition = (time: any) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * hourHeight + minutes * minuteHeight;
  };

  const calculateHeight = (start: any, end: any) => {
    const startPosition = timeToPosition(start);
    const endPosition = timeToPosition(end);
    return Math.max(endPosition - startPosition, 0);
  };

  useEffect(() => {
    if (calendarReadyData) {
      setDay(getDayFromDate(date));
    }
  }, [calendarReadyData]);

  useEffect(() => {
    if (day && date) {
      const customAvailability = calendarReadyData?.customAvailability;
      const customSlots = getCustomAvailableSlots(date, customAvailability);
      if (customSlots.length > 0) {
        setAvailableSlots(customSlots);
      } else {
        setAvailableSlots(getTimeSlotsForDay(day, calendarReadyData));
      }
    }
  }, [day, date]);

  useEffect(() => {
    if (availableSlots && availableSlots.length > 0) {
      const firstSlotTop = timeToPosition(availableSlots[0].start) + 0; // Calculate top position
      scrollViewRef.current?.scrollTo({ y: firstSlotTop, animated: true }); // Scroll to the first slot
    }
  }, [availableSlots]);

  const render = () => {
    return (
      <>
        {!availableSlots ? (
          <View style={[styles.container, Styles.screen]}>
            <LoadingSpinner />
          </View>
        ) : (
          <View style={[styles.container]}>
            <View style={styles.dateContainer}>
              <View style={styles.innerDateContainer}>
                <View style={styles.verticalLine} />
                <Text style={styles.dateText}>
                  {day ? day.charAt(0).toUpperCase() + day.slice(1, 3) : ""}
                </Text>
                <Text style={styles.dateText}>
                  {date ? date.split("-")[2] : ""}
                </Text>
              </View>
            </View>
            <ScrollView
              ref={scrollViewRef}
              contentContainerStyle={styles.scrollContainer}
            >
              <View style={styles.verticalLine} />
              {hours.map((hour, index) => (
                <View key={index} style={styles.hourContainer}>
                  <Text style={styles.hourText}>{hour}</Text>
                  <View style={styles.hourLineContainer}>
                    <View style={styles.hourLine} />
                  </View>
                </View>
              ))}
              {availableSlots &&
                availableSlots?.map((event, index) => {
                  const top = timeToPosition(event.start) + 10; // Start position
                  const height = calculateHeight(event.start, event.end) - 5; // Correct height calculation

                  return (
                    <View
                      key={index}
                      style={[
                        styles.event,
                        styles.regularlyAvailableSlot,
                        {
                          top, // Proper position
                          height, // Proper height
                        },
                      ]}
                    >
                      <Text style={styles.eventText}>{event.title}</Text>
                    </View>
                  );
                })}
              {/* {customAvailableSlots.map((event, index) => {
              const top = timeToPosition(event.start) + 10; // Start position
              const height = calculateHeight(event.start, event.end) - 5; // Correct height calculation

              return (
                <View
                  key={index}
                  style={[
                    styles.event,
                    styles.customAvailableSlot,
                    {
                      top, // Proper position
                      height, // Proper height
                    },
                  ]}
                >
                  <Text style={styles.eventText}>{event.title}</Text>
                </View>
              );
            })} */}
              {/* {jobSlots.map((event, index) => {
              const top = timeToPosition(event.start) + 10; // Start position
              const height = calculateHeight(event.start, event.end) - 5; // Correct height calculation

              return (
                <View
                  key={index}
                  style={[
                    styles.event,
                    styles.jobSlot,
                    {
                      top, // Proper position
                      height, // Proper height
                    },
                  ]}
                >
                  <Text style={styles.eventText}>{event.title}</Text>
                </View>
              );
            })} */}
            </ScrollView>
          </View>
        )}
      </>
    );
  };

  return render();
};
