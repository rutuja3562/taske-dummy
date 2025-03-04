import axios from "axios";
import { DocumentPickerAsset } from "expo-document-picker";
// --------------------------------------------------------------------------------------------

// Enums
export enum DayOfWeek {
  Sunday = "sunday",
  Monday = "monday",
  Tuesday = "tuesday",
  Wednesday = "wednesday",
  Thursday = "thursday",
  Friday = "friday",
  Saturday = "saturday",
}

export enum AvailabilityType {
  Available = "available",
  Unavailable = "unavailable",
}

//-----------------------------------------------------------------------------------------------------------

// Types
export type Vendor = {
  id: string;
  name: string;
};

export type Customer = {
  id: string;
  name: string;
};

export type VendorDayAvailability = {
  id: string;
  vendor: Vendor;
  day: DayOfWeek;
  startTime: string;
  endTime: string;
};

export type JobSchedule = {
  id: string;
  vendor: Vendor;
  customer: Customer;
  job: any;
  date: Date;
  startTime: string;
  endTime: string;
};

export type VendorCustomDayAvailability = {
  id?: string;
  type: AvailabilityType;
  vendor: Vendor;
  // date: Date;
  date: string;
  startTime?: string;
  endTime?: string;
};

// --------------------------------------------------------------------------------------------

export type CalendarClientData_Ready = {
  fromDate: Date;
  toDate: Date;
  vendorId: string;
  dayAvailability: Array<VendorDayAvailability>;
  customAvailability: Array<VendorCustomDayAvailability>;
  jobs: Array<JobSchedule>;
};

// --------------------------------------------------------------------------------------------

export async function sendFileToServerForProcess(
  file: DocumentPickerAsset,
  phoneAndDocumentId: string
) {
  const baseUrl = "http://localhost:3000";
  const formData = new FormData();

  console.log("File details", file, phoneAndDocumentId);

  if (file.mimeType === "application/pdf") {
    (formData as any).append("document", {
      uri: file.uri,
      name: "document.pdf",
      type: "application/pdf",
    });

    (formData as any).append("phoneAndDocumentId", phoneAndDocumentId);

    try {
      const res = await axios({
        method: "post",
        url: `${baseUrl}/upload-document`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status !== 200) {
        console.log("Failed to upload document");
        return false;
      }

      if (res.status === 200) {
        console.log("response", res.data, res.status);
        return res.data;
      }
    } catch (error) {
      console.log("Error is", error);
      return false;
    }
  }

  if (file.mimeType === "image/jpeg" || file.mimeType === "image/png") {
    (formData as any).append("photo", {
      uri: file.uri,
      name: `photo.${file.mimeType.split("/")[1]}`, // Set name based on mimeType
      type: file.mimeType,
    });

    (formData as any).append("phoneAndDocumentId", phoneAndDocumentId);

    try {
      const res = await axios({
        method: "post",
        url: `${baseUrl}/upload-image`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status !== 200) {
        console.log("Failed to upload image");
        return false;
      }

      if (res.status === 200) {
        console.log("response", res.data, res.status);
        return res.data;
      }
    } catch (error) {
      console.log("Error is", error);
      return false;
    }
  }

  // (formData as any).append("photo", {
  //   uri: imageDetails.uri,
  //   name: "photo.jpg",
  //   type: "image/jpeg",
  // });

  // try {
  //   const res = await axios({
  //     method: "post",
  //     url: `${baseUrl}/upload-document?type=${type}`,
  //     data: formData,
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   });

  //   if (res.status !== 200) {
  //     console.log("Failed to upload image");
  //     return false;
  //   }

  //   if (res.status === 200) {
  //     console.log("response", res.data, res.status);
  //     return res.data;
  //   }
  // } catch (error) {
  //   console.log("Error is", error);
  //   return false;
  // }
}

// --------------------------------------------------------------------------------------------

export const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const getInitials = (name: string) => {
  const nameParts = name.split(" ");
  const initials = nameParts
    .map((part) => part[0] && part[0].toUpperCase())
    .join("");
  return initials;
};

// --------------------------------------------------------------------------------------------

export function convertPercentageToDecimal(percentage: number): number {
  if (isNaN(percentage)) {
    throw new Error("Input must be a valid number.");
  }
  return percentage / 100;
}

// --------------------------------------------------------------------------------------------

export function removePdfExtension(str: string) {
  if (str.endsWith(".pdf")) {
    return str.slice(0, -4); // Removes the last 4 characters
  }
  return str;
}

// --------------------------------------------------------------------------------------------

export function getDatesForDays(
  dayAvailability: VendorDayAvailability[]
): string[] {
  const dayMapping: { [key: string]: number } = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };

  const targetDays = dayAvailability.map(
    (item) => dayMapping[item?.day?.toLowerCase() as keyof typeof dayMapping]
  );

  const resultDates: string[] = [];
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let day = today.getDate(); day <= daysInMonth; day++) {
    const date = new Date(Date.UTC(year, month, day));
    const dayOfWeek = date.getUTCDay();

    if (targetDays.includes(dayOfWeek)) {
      resultDates.push(date.toISOString().split("T")[0]);
    }
  }

  return resultDates;
}

// --------------------------------------------------------------------------------------------

export function reduceDatesToMarkedDatesFormat(dates: string[]): {
  [key: string]: {
    selected: boolean;
    marked: boolean;
    selectedColor: string;
  };
} {
  return dates.reduce<{
    [key: string]: {
      selected: boolean;
      marked: boolean;
      selectedColor: string;
    };
  }>((acc, item) => {
    acc[item.toString()] = {
      // Correctly map the date to the desired object structure
      selected: true,
      marked: true,
      selectedColor: "#87CEFA", // Light blue for selected dates
    };
    return acc;
  }, {});
}

// --------------------------------------------------------------------------------------------

export function getFirstDayOfPreviousMonth(date: Date) {
  let year = date.getFullYear();
  let month = date.getMonth(); // 0-indexed (0 = January, 11 = December)

  if (month === 0) {
    // January
    year -= 1; // Go to the previous year
    month = 11; // Set to December
  } else {
    month -= 1; // Just go to the previous month
  }

  // return new Date(year, month, 1).toISOString(); // Return the first day of the month
  return new Date(Date.UTC(year, month, 1)).toISOString().split("T")[0]; // Return the first day of the month
}

// --------------------------------------------------------------------------------------------

export function getLastDayOfNextMonth(date: Date) {
  let year = date.getFullYear();
  let month = date.getMonth(); // 0-indexed

  if (month === 11) {
    // December
    year += 1; // Go to the next year
    month = 0; // Set to January
  } else {
    month += 1; // Just go to the next month
  }

  // Create a date for the first day of the next month and subtract one day
  // return new Date(year, month + 1, 0).toISOString(); // Last day of the month
  return new Date(Date.UTC(year, month + 1, 0)).toISOString().split("T")[0]; // Last day of the month
}

// --------------------------------------------------------------------------------------------

export function getDayFromDate(dateString: string): string {
  const date = new Date(dateString);
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  const dayIndex = date.getDay();

  return days[dayIndex];
}
export function getTimeSlotsForDay(
  day: string,
  vendorSchedule: { dayAvailability: VendorDayAvailability[] }
): {
  title: string;
  start: string;
  end: string;
}[] {
  const slots: { title: string; start: string; end: string }[] = [];
  let slotCounter = 1;

  // Helper function to convert time
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes;
    const formattedHours = Math.floor(totalMinutes / 60)
      .toString()
      .padStart(2, "0");
    const formattedMinutes = (totalMinutes % 60).toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}`;
  };

  // Filter day availability
  const dayAvailability = vendorSchedule.dayAvailability.filter(
    (slot: { day: string }) => slot.day.toLowerCase() === day.toLowerCase()
  );

  // Create slots from dayAvailability
  dayAvailability.forEach(
    (availability: { startTime: string; endTime: string }) => {
      slots.push({
        title: `Slot ${slotCounter++}`,
        start: formatTime(availability.startTime),
        end: formatTime(availability.endTime),
      });
    }
  );

  return slots;
}

// --------------------------------------------------------------------------------------------

export function getCustomAvailableSlots(
  dateString: string,
  scheduleArray: VendorCustomDayAvailability[]
): {
  title: string;
  start: string;
  end: string;
}[] {
  // Filter the array to find entries that match the given date and are of type "available"
  const availableEntries = scheduleArray?.filter(
    (entry) =>
      entry.date.toString() === dateString && entry.type === "available"
  );

  // Map each entry to a slot with the required format
  const slots = availableEntries?.map((entry, index) => ({
    title: `Slot ${index + 1}`,
    start: entry?.startTime ?? "",
    end: entry?.endTime ?? "",
  }));

  return slots;
}
// --------------------------------------------------------------------------
interface InputServiceSchema {
  name: string;
  price: number;
  quantity: number;
  selected: boolean;
  serviceId: string;
}

interface OutputServiceSchema {
  item: string;
  description: string;
  gst: string;
  quantity: string;
  unit: string;
  amount: string;
  cgst: string;
  sgst: string;
  total: string;
}

export function transformServiceForCreateQuotation(
  input: InputServiceSchema[]
): OutputServiceSchema[] {
  const GST_RATE = 0.18; // 18% GST

  return input.map((service) => {
    const { name, price, quantity } = service;
    const amount = price * quantity;
    const gstAmount = amount * GST_RATE;
    const cgst = gstAmount / 2; // 50% of GST is CGST
    const sgst = gstAmount / 2; // 50% of GST is SGST
    const total = amount + gstAmount;

    return {
      item: name,
      // description: `Service ID: ${service.serviceId}`,
      description: ``,
      gst: gstAmount.toFixed(2),
      quantity: quantity.toString(),
      unit: price.toFixed(2),
      amount: amount.toFixed(2),
      cgst: cgst.toFixed(2),
      sgst: sgst.toFixed(2),
      total: total.toFixed(2),
    };
  });
}

// --------------------------------------------------------------------------------------------
