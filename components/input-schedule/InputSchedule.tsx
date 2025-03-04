import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { SubHeader } from "../../components/sub-header/SubHeader";
import { Color, Font, Styles } from "@/assets/theme";
import LoadingSpinner from "../../components/loading-spinner/LoadingSpinner";
import DownwardArrowIcon from "@/assets/svg-icons/DownwardArrowIcon";
import { styles } from "./styles";
import AddIcon from "@/assets/svg-icons/AddIcon";
import LargeButtonOne from "@/components/large-button-one/LargeButtonOne";
import RNPickerSelect from "react-native-picker-select";
import DisabledIcon from "@/assets/svg-icons/DisableIcon";
import CopyIcon from "@/assets/svg-icons/CopyIcon";
import { useOnHardwareBackAction } from "@/utils/modulo-hooks";
import { useRouter } from "expo-router";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import CircleWithPlusIcon from "@/assets/svg-icons/CircleWithPlusIcon";
import {
  VendorCustomDayAvailability,
  VendorDayAvailability,
} from "@/utility-functions/utilities";

interface InputScheduleProps {
  vendorId: string; // Optional property
  calendarReadyData: any;
  //   calendarReadyData: CalendarClientData_Ready;
  fromDate: string;
  toDate: string;
  onSaveScheduledCalenderData: (
    standardAvailability: any,
    customAvailability: any,
    job: any
  ) => void;
}

enum DayOfWeek {
  Sunday = "sunday",
  Monday = "monday",
  Tuesday = "tuesday",
  Wednesday = "wednesday",
  Thursday = "thursday",
  Friday = "friday",
  Saturday = "saturday",
}

enum AvailabilityType {
  Available = "available",
  Unavailable = "unavailable",
}

const dayShortForms = (day: string) =>
  ({
    sunday: "Sun",
    monday: "Mon",
    tuesday: "Tue",
    wednesday: "Wed",
    thursday: "Thu",
    friday: "Fri",
    saturday: "Sat",
  }[day]);

type Slot = {
  id: string;
  startTime: string; // Format: hh:mm
  endTime: string;
};

type DayAvailability = {
  day: DayOfWeek;
  slots: Array<Slot>;
  vendor: any; // Added vendor to keep track of vendor info
};

type CustomDayAvailability = {
  date: string;
  slots: Array<Slot>;
  vendor: any; // Added vendor to keep track of vendor info
};

const formatDate = (value: Date) => {
  const dateParts = value?.toISOString()?.split("T")[0].split("-"); // Correctly format the date
  const formattedDate = `${dateParts[0]}-${dateParts[1].padStart(
    2,
    "0"
  )}-${dateParts[2].padStart(2, "0")}`; // Format to "yyyy-MM-dd"
  return formattedDate;
};

const defaultVendorDayAvailability: Array<VendorDayAvailability> = [
  {
    day: DayOfWeek.Monday,
    id: "",
    vendor: { id: "", name: "" },
    startTime: "09:00",
    endTime: "17:00",
  },
  {
    day: DayOfWeek.Tuesday,
    id: "",
    vendor: { id: "", name: "" },
    startTime: "09:00",
    endTime: "17:00",
  },
  {
    day: DayOfWeek.Wednesday,
    id: "",
    vendor: { id: "", name: "" },
    startTime: "09:00",
    endTime: "17:00",
  },
  {
    day: DayOfWeek.Thursday,
    id: "",
    vendor: { id: "", name: "" },
    startTime: "09:00",
    endTime: "17:00",
  },
  {
    day: DayOfWeek.Friday,
    id: "",
    vendor: { id: "", name: "" },
    startTime: "09:00",
    endTime: "17:00",
  },
];

const mapVendorDayAvailabilityToDayAvailability = (
  input: Array<VendorDayAvailability>
): Array<DayAvailability> => {
  // Create a DayAvailability for each day of the week
  const daysOfWeek: DayOfWeek[] = [
    DayOfWeek.Sunday,
    DayOfWeek.Monday,
    DayOfWeek.Tuesday,
    DayOfWeek.Wednesday,
    DayOfWeek.Thursday,
    DayOfWeek.Friday,
    DayOfWeek.Saturday,
  ];

  const dayAvailability: Array<DayAvailability> = daysOfWeek.map((day) => {
    // Find the availability for the current day from the input
    const availabilityForDay = input.filter((item) => item.day === day);

    // If there is availability for the day, create slots for each one
    const slots: Slot[] = availabilityForDay.map((availability) => ({
      id: generateSlotId(), // Generate unique ID for each slot
      startTime: availability.startTime,
      endTime: availability.endTime,
    }));

    // Assuming vendor is the same for all availability for a day
    const vendor =
      availabilityForDay.length > 0 ? availabilityForDay[0].vendor : null;

    return {
      day,
      slots,
      vendor,
    };
  });

  return dayAvailability;
};

const mapDayAvailabilityToVendorDayAvailability = (
  input: Array<DayAvailability>
): Array<VendorDayAvailability> => {
  const vendorDayAvailability: Array<VendorDayAvailability> = [];

  input.forEach((dayAvailability) => {
    dayAvailability.slots.forEach((slot) => {
      vendorDayAvailability.push({
        id: "",
        vendor: dayAvailability.vendor,
        day: dayAvailability.day,
        startTime: slot.startTime,
        endTime: slot.endTime,
      });
    });
  });

  return vendorDayAvailability;
};

/**
 * Maps an array of VendorCustomDayAvailability to an array of CustomDayAvailability.
 *
 * @param {Array<VendorCustomDayAvailability>} input - Array of VendorCustomDayAvailability.
 * @returns {Array<CustomDayAvailability>} - Array of CustomDayAvailability.
 */
const mapVendorCustomDayAvailabilityToDayAvailability = (
  input: Array<VendorCustomDayAvailability>
) => {
  // Create a map to group slots by date
  const dateAvailabilityMap: Record<string, CustomDayAvailability> = {};

  input.forEach((item) => {
    const { date, startTime, endTime, vendor } = item;

    if (!dateAvailabilityMap[date.toString()]) {
      dateAvailabilityMap[date.toString()] = {
        date: date.toString(),
        slots: [],
        vendor,
      };
    }

    dateAvailabilityMap[date.toString()].slots.push({
      id: generateSlotId(), // Generate a unique ID for the slot
      startTime: startTime ?? "",
      endTime: endTime ?? "",
    });
  });

  // Convert the map to an array of CustomDayAvailability objects
  return Object.values(dateAvailabilityMap);
};

/**
 * Maps an array of CustomDayAvailability to an array of VendorCustomDayAvailability.
 *
 * @param {Array<CustomDayAvailability>} input - Array of CustomDayAvailability.
 * @returns {Array<VendorCustomDayAvailability>} - Array of VendorCustomDayAvailability.
 */
const mapDayAvailabilityToVendorCustomDayAvailability = (
  input: Array<CustomDayAvailability>
) => {
  const vendorCustomDayAvailability: Array<VendorCustomDayAvailability> = [];

  input.forEach((dayAvailability) => {
    const { date, slots, vendor } = dayAvailability;

    slots.forEach((slot) => {
      vendorCustomDayAvailability.push({
        date,
        startTime: slot.startTime,
        endTime: slot.endTime,
        vendor,
        type: AvailabilityType.Available, // Defaulting type to "Available"
      });
    });
  });

  return vendorCustomDayAvailability;
};

const timeOptions = [
  "00:00",
  "00:30",
  "01:00",
  "01:30",
  "02:00",
  "02:30",
  "03:00",
  "03:30",
  "04:00",
  "04:30",
  "05:00",
  "05:30",
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
  "24:00",
];

const startIndex = timeOptions.indexOf("07:00");

const findNextSlot = (slotValue: string, increment: number) => {
  const currentIndex = timeOptions.indexOf(slotValue);
  if (currentIndex === -1) return timeOptions[startIndex];
  const nextIndex = currentIndex + increment;
  return nextIndex < timeOptions.length
    ? timeOptions[nextIndex]
    : timeOptions[timeOptions.length - 1];
};

const generateSlotId = () => `${new Date().getTime()}-${Math.random()}`;

export const InputSchedule: React.FC<InputScheduleProps> = ({
  vendorId,
  calendarReadyData,
  fromDate,
  toDate,
  onSaveScheduledCalenderData,
}) => {
  const textInputRef = useRef<TextInput>(null);

  const router = useRouter();
  const goBack = useCallback(() => {
    router.back();
    return true;
  }, []);
  useOnHardwareBackAction(goBack);

  const [standardAvailability, setStandardAvailability] =
    useState<DayAvailability[]>();
  const [customAvailability, setCustomAvailability] =
    useState<CustomDayAvailability[]>();
  // mapVendorCustomDayAvailabilityToDayAvailability(
  //   defaultVendorCustomDayAvailability,
  // ),
  useEffect(() => {
    if (calendarReadyData) {
      setStandardAvailability(
        mapVendorDayAvailabilityToDayAvailability(
          calendarReadyData?.dayAvailability
        )
      );
      setCustomAvailability(
        mapVendorCustomDayAvailabilityToDayAvailability(
          calendarReadyData?.customAvailability
        )
      );
    }
  }, [calendarReadyData]);

  const addStandardSlot = (day: string): void => {
    setStandardAvailability((prev) =>
      prev?.map((item) =>
        item.day === day
          ? {
              ...item,
              slots:
                item.slots.length === 0 ||
                timeOptions.indexOf(item.slots[item.slots.length - 1].endTime) <
                  timeOptions.length - 2
                  ? [
                      ...item.slots,
                      {
                        id: generateSlotId(),
                        startTime:
                          item.slots.length < 1
                            ? timeOptions[startIndex]
                            : findNextSlot(
                                item.slots[item.slots.length - 1].endTime,
                                1
                              ),
                        endTime:
                          item.slots.length < 1
                            ? timeOptions[startIndex + 2]
                            : findNextSlot(
                                item.slots[item.slots.length - 1].endTime,
                                3
                              ),
                      },
                    ]
                  : item.slots,
            }
          : item
      )
    );
  };

  const copyStandardSlotToOthers = (day: string): void => {
    const slotsToCopy =
      standardAvailability?.find((item) => item.day === day)?.slots || [];
    setStandardAvailability((prev) =>
      prev?.map((item) =>
        item.day !== day
          ? {
              ...item,
              slots: [
                // ...item.slots,
                ...slotsToCopy.map((slot) => ({
                  ...slot,
                  id: generateSlotId(),
                })),
              ],
            }
          : item
      )
    );
  };

  const updateStandardSlot = (
    day: string,
    slotId: string,
    type: "startTime" | "endTime",
    value: string
  ): void => {
    setStandardAvailability((prev) =>
      prev?.map((item) =>
        item.day === day
          ? {
              ...item,
              slots: item.slots.map((slot) => {
                if (slot.id === slotId) {
                  // Always make sure to copy the existing slot data first
                  const updatedSlot = { ...slot };

                  // Update either the start or end time, but keep the other intact
                  updatedSlot[type] = value;

                  const startTime = updatedSlot.startTime;
                  const endTime = updatedSlot.endTime;

                  // Ensure start and end are both set before performing validation
                  if (startTime && endTime) {
                    if (
                      timeOptions.indexOf(startTime) >=
                      timeOptions.indexOf(endTime)
                    ) {
                      updatedSlot.endTime = findNextSlot(startTime, 1);
                    }
                  }

                  return updatedSlot;
                }
                return slot;
              }),
            }
          : item
      )
    );
  };

  const deleteStandardSlot = (day: string, slotId: string): void => {
    setStandardAvailability((prev) =>
      prev?.map((item) =>
        item.day === day
          ? { ...item, slots: item.slots.filter((slot) => slot.id !== slotId) }
          : item
      )
    );
  };

  const renderStandardSlot = (
    day: string,
    slot: Slot,
    index: number
  ): JSX.Element => {
    // Get the index of the selected start time
    const startTimeIndex = timeOptions.indexOf(slot.startTime);

    // Filter logical end times based on the selected start time
    const logicalEndTimes = timeOptions.filter(
      (time, index) => index > startTimeIndex
    );

    return (
      <View style={styles.slotRow} key={slot.id}>
        <View style={styles.pickerDiv}>
          <View style={styles.RNpickerContainer}>
            <RNPickerSelect
              value={slot.startTime}
              onValueChange={(value) => {
                updateStandardSlot(day, slot.id, "startTime", value);
                // Reset end time if the new start time is set
                if (logicalEndTimes.length === 0) {
                  alert(
                    "No logical end times available for the selected start time."
                  );
                  updateStandardSlot(day, slot.id, "endTime", ""); // Reset end time
                }
              }}
              items={timeOptions.map((time) => ({ label: time, value: time }))}
              // placeholder={{ label: "Start Time", value: null, color: "black" }}
              style={{
                inputAndroid: {
                  ...styles.input,
                },
                inputIOS: {
                  ...styles.input,
                },
                placeholder: {
                  color: Color.Black,
                },
              }}
              useNativeAndroidPickerStyle={false}
              Icon={() => (
                <View>
                  <DownwardArrowIcon style={styles.downArrowIcon} />
                </View>
              )}
            />
          </View>
          <Text style={styles.dash}> – </Text>
          <View style={styles.RNpickerContainer}>
            <RNPickerSelect
              value={slot.endTime}
              onValueChange={(value) =>
                updateStandardSlot(day, slot.id, "endTime", value)
              }
              items={logicalEndTimes.map((time) => ({
                label: time,
                value: time,
              }))}
              // placeholder={{ label: "End Time", value: null, color: "black" }}
              style={{
                inputAndroid: {
                  ...styles.input,
                },
                inputIOS: {
                  ...styles.input,
                },
                placeholder: {
                  color: Color.Black,
                },
              }}
              useNativeAndroidPickerStyle={false}
              Icon={() => (
                <View>
                  <DownwardArrowIcon style={styles.downArrowIcon} />
                </View>
              )}
            />
          </View>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            onPress={() => deleteStandardSlot(day, slot.id)}
            style={styles.disableButton}
          >
            <DisabledIcon />
          </TouchableOpacity>
          {index === 0 && (
            <TouchableOpacity
              onPress={() => addStandardSlot(day)}
              style={styles.addButton}
            >
              <AddIcon />
            </TouchableOpacity>
          )}
          {index === 0 && (
            <TouchableOpacity
              onPress={() => copyStandardSlotToOthers(day)}
              style={styles.copyButton}
            >
              <CopyIcon />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const renderStandard = ({ item }: { item: DayAvailability }): JSX.Element => (
    <View style={styles.dayRow}>
      <View>
        <Text style={styles.dayText}>{dayShortForms(item.day)}</Text>
      </View>
      <View style={styles.slotsContainer}>
        {item.slots.length > 0 ? (
          item.slots.map((slot, index) =>
            renderStandardSlot(item.day, slot, index)
          )
        ) : (
          <View style={styles.unavailableContainer}>
            <View style={styles.unavailableTextDiv}>
              <Text style={styles.unavailableText}>Unavailable</Text>
            </View>
            <View style={styles.addButtonContainer}>
              <TouchableOpacity
                onPress={() => addStandardSlot(item.day)}
                style={styles.addButtonIcon}
              >
                <AddIcon />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );

  const addCustomDay = (): void => {
    setCustomAvailability((prev) => {
      // If no previous availability, start with the current date
      const lastItem = prev && prev.length > 0 ? prev[prev.length - 1] : null;

      // Calculate the next date safely
      const nextDate = formatDate(
        lastItem
          ? new Date(new Date(lastItem.date).getTime() + 86400000)
          : new Date()
      );

      return [
        ...(prev || []),
        {
          date: nextDate,
          slots: [
            {
              id: generateSlotId(),
              startTime: timeOptions[startIndex] || timeOptions[0],
              endTime:
                timeOptions[startIndex + 2] ||
                timeOptions[timeOptions.length - 1],
            },
          ],
          vendor: lastItem?.vendor || null, // Safely handle vendor
        },
      ];
    });
  };

  const deleteCustomDay = (date: string) => {
    setCustomAvailability((prev) => prev?.filter((item) => item.date !== date));
  };

  const updateCustomDate = (date: string, newDate: string) => {
    setCustomAvailability((prev) =>
      prev?.map((item) =>
        item.date === date
          ? { ...item, date: newDate } // Update the date while keeping slots and vendor
          : item
      )
    );
  };

  const addCustomSlot = (date: string): void => {
    setCustomAvailability((prev) =>
      prev?.map((item) =>
        item.date === date
          ? {
              ...item,
              slots:
                item.slots.length === 0 ||
                timeOptions.indexOf(item.slots[item.slots.length - 1].endTime) <
                  timeOptions.length - 2
                  ? [
                      ...item.slots,
                      {
                        id: generateSlotId(),
                        startTime:
                          item.slots.length < 1
                            ? timeOptions[startIndex]
                            : findNextSlot(
                                item.slots[item.slots.length - 1].endTime,
                                1
                              ),
                        endTime:
                          item.slots.length < 1
                            ? timeOptions[startIndex + 2]
                            : findNextSlot(
                                item.slots[item.slots.length - 1].endTime,
                                3
                              ),
                      },
                    ]
                  : item.slots,
            }
          : item
      )
    );
  };

  const copyCustomSlotToOthers = (date: string): void => {
    const slotsToCopy =
      customAvailability?.find((item) => item.date === date)?.slots || [];
    setCustomAvailability((prev) =>
      prev?.map((item) =>
        item.date !== date
          ? {
              ...item,
              slots: [
                // ...item.slots,
                ...slotsToCopy.map((slot) => ({
                  ...slot,
                  id: generateSlotId(),
                })),
              ],
            }
          : item
      )
    );
  };

  const updateCustomSlot = (
    date: string,
    slotId: string,
    type: "startTime" | "endTime",
    value: string
  ): void => {
    setCustomAvailability((prev) =>
      prev?.map((item) =>
        item.date === date
          ? {
              ...item,
              slots: item.slots.map((slot: Slot) => {
                if (slot.id === slotId) {
                  const updatedSlot = { ...slot, [type]: value };

                  const startTime =
                    type === "startTime" ? value : updatedSlot.startTime;
                  const endTime =
                    type === "endTime" ? value : updatedSlot.endTime;

                  if (
                    timeOptions.indexOf(startTime) <
                    timeOptions.indexOf(endTime)
                  ) {
                    return updatedSlot;
                  }
                }
                return slot;
              }),
            }
          : item
      )
    );
  };

  const deleteCustomSlot = (date: string, slotId: string): void => {
    setCustomAvailability((prev) =>
      prev?.map((item) =>
        item.date === date
          ? {
              ...item,
              slots: item.slots.filter((slot: Slot) => slot.id !== slotId),
            }
          : item
      )
    );
  };

  const renderCustomSlot = (
    date: string,
    slot: Slot,
    index: number
  ): JSX.Element => {
    // Get the index of the selected start time
    const startTimeIndex = timeOptions.indexOf(slot.startTime);

    // Filter logical end times based on the selected start time
    const logicalEndTimes = timeOptions.filter(
      (time, index) => index > startTimeIndex
    );

    return (
      <View style={styles.slotRow} key={slot.id}>
        <View style={styles.pickerDiv}>
          <View style={styles.RNpickerContainer}>
            <RNPickerSelect
              value={slot.startTime}
              onValueChange={(value) => {
                updateCustomSlot(date, slot.id, "startTime", value);
                // Reset end time if the new start time is set
                if (logicalEndTimes.length === 0) {
                  alert(
                    "No logical end times available for the selected start time."
                  );
                  updateCustomSlot(date, slot.id, "endTime", ""); // Reset end time
                }
              }}
              items={timeOptions.map((time) => ({ label: time, value: time }))}
              placeholder={{ label: "Start Time", value: null, color: "black" }}
              style={{
                inputAndroid: {
                  ...styles.input,
                },
                inputIOS: {
                  ...styles.input,
                },
                placeholder: {
                  color: "black", // Placeholder text color
                },
              }}
              useNativeAndroidPickerStyle={false}
              Icon={() => (
                <View>
                  <DownwardArrowIcon style={styles.downArrowIcon} />
                </View>
              )}
            />
          </View>
          <Text style={styles.dash}> – </Text>
          <View style={styles.RNpickerContainer}>
            <RNPickerSelect
              value={slot.endTime}
              onValueChange={(value) =>
                updateCustomSlot(date, slot.id, "endTime", value)
              }
              items={logicalEndTimes.map((time) => ({
                label: time,
                value: time,
              }))}
              placeholder={{ label: "End Time", value: null, color: "black" }}
              style={{
                inputAndroid: {
                  ...styles.input,
                },
                inputIOS: {
                  ...styles.input,
                },
                placeholder: {
                  color: "black", // Placeholder text color
                },
              }}
              useNativeAndroidPickerStyle={false}
              Icon={() => (
                <View>
                  <DownwardArrowIcon style={styles.downArrowIcon} />
                </View>
              )}
            />
          </View>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            onPress={() => deleteCustomSlot(date, slot.id)}
            style={styles.disableButton}
          >
            <DisabledIcon />
          </TouchableOpacity>
          {index === 0 && (
            <TouchableOpacity
              onPress={() => addCustomSlot(date)}
              style={styles.addButton}
            >
              <AddIcon />
            </TouchableOpacity>
          )}
          {index === 0 && (
            <TouchableOpacity
              onPress={() => copyCustomSlotToOthers(date)}
              style={styles.copyButton}
            >
              <CopyIcon />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const renderCustom = ({
    item,
  }: {
    item: CustomDayAvailability;
  }): JSX.Element => {
    return (
      <View style={{ marginBottom: 10 }}>
        <View style={styles.dayRow1}>
          <TextInput
            ref={textInputRef}
            style={styles.dayTextInput}
            value={item.date}
            onChangeText={(text) => {
              updateCustomDate(item.date, text);
              textInputRef.current?.focus();
            }}
            onBlur={() => {
              // Optionally handle any logic when the input loses focus
            }}
            onSubmitEditing={({ nativeEvent }) => {
              if (nativeEvent.text) {
                updateCustomDate(item.date, nativeEvent.text);
              }
            }}
            returnKeyType="done" // Ensures the keyboard shows a "Done" button
          />
          <TouchableOpacity
            onPress={() => deleteCustomDay(item.date)}
            style={styles.disableButton}
          >
            <DisabledIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.dayRow1}>
          <View style={styles.slotsContainer}>
            {item.slots.length > 0 ? (
              item.slots.map((slot, index) =>
                renderCustomSlot(item.date, slot, index)
              )
            ) : (
              <View style={styles.unavailableContainer}>
                <View style={styles.unavailableTextDiv}>
                  <Text style={styles.unavailableText}>Unavailable</Text>
                </View>
                <View style={styles.addButtonContainer}>
                  <TouchableOpacity
                    onPress={() => addCustomSlot(item.date)}
                    style={styles.addButtonIcon}
                  >
                    <AddIcon />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <GestureHandlerRootView style={[styles.inputScheduleContainer]}>
      <View style={styles.addEditHeaderContainer}>
        <SubHeader title="Update Availability" />
      </View>
      <ScrollView style={[styles.container]}>
        <SubHeader title="Standard" />
        <FlatList
          data={standardAvailability}
          renderItem={renderStandard}
          keyExtractor={(item) => item.day}
        />
        <SubHeader
          title="Custom"
          iconComponent={<CircleWithPlusIcon />}
          onButtonPress={addCustomDay}
        />
        <FlatList
          data={customAvailability}
          renderItem={renderCustom}
          keyExtractor={(item) => item.date}
        />
      </ScrollView>
      <LargeButtonOne
        buttonText="Save"
        onButtonPress={() => {
          const dayAvailabilities = mapDayAvailabilityToVendorDayAvailability(
            standardAvailability ?? []
          );
          const customDayAvailabilities =
            mapDayAvailabilityToVendorCustomDayAvailability(
              customAvailability ?? []
            );
          const jobs = calendarReadyData?.jobs;
          onSaveScheduledCalenderData(
            dayAvailabilities,
            customDayAvailabilities,
            jobs
          );
        }}
      />
    </GestureHandlerRootView>
  );
};
