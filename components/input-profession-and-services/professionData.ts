export type Child = {
  id: string;
  name: string;
  selected: boolean;
  price?: any;
  timeInHours?: any;
};

export type Subcategory = {
  id: string;
  name: string;
  expanded: boolean; // Ensure 'expanded' is included
  selected: boolean;
  children: Child[];
};

export type Profession = {
  id: string;
  name: string;
  expanded: boolean; // Ensure 'expanded' is included
  selected: boolean;
  subcategories: Subcategory[];
};

export const professionsAndServicesData = [
  {
    id: "carpenter",
    name: "Carpenter",
    expanded: false,
    selected: false,
    subcategories: [
      {
        id: "assembly",
        name: "Assembly",
        expanded: false,
        selected: false,
        children: [
          {
            id: "bed",
            name: "Bed Assembly",
            selected: false,
            price: 0,
            timeInHours: 0,
          },
          {
            id: "furniture",
            name: "Furniture Assembly",
            selected: false,
            price: 0,
            timeInHours: 0,
          },
          {
            id: "chair",
            name: "Chair Assembly",
            selected: false,
            price: 0,
            timeInHours: 0,
          },
        ],
      },
      {
        id: "hanging",
        name: "Hanging",
        expanded: false,
        selected: false,
        children: [
          {
            id: "Paintings Hanging",
            name: "Paintings Hanging",
            selected: false,
            price: 0,
            timeInHours: 0,
          },
          {
            id: "Lamp Hanging",
            name: "Lamp Hanging",
            selected: false,
            price: 0,
            timeInHours: 0,
          },
        ],
      },
    ],
  },
  {
    id: "cleaner",
    name: "Cleaner",
    expanded: false,
    selected: false,
    subcategories: [
      {
        id: "House Cleaning",
        name: "House Cleaning",
        expanded: false,
        selected: false,
        children: [
          {
            id: "Kitchen",
            name: "Kitchen",
            selected: false,
            price: 0,
            timeInHours: 0,
          },
          {
            id: "Bathroom",
            name: "Bathroom",
            selected: false,
            price: 0,
            timeInHours: 0,
          },
        ],
      },
      {
        id: "hanging",
        name: "Hanging",
        expanded: false,
        selected: false,
        children: [
          {
            id: "Hanging 1",
            name: "Hanging 1",
            selected: false,
            price: 0,
            timeInHours: 0,
          },
          {
            id: "Hanging 2",
            name: "Hanging 2",
            selected: false,
            price: 0,
            timeInHours: 0,
          },
        ],
      },
    ],
  },
];

export const vendorSchedule = {
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

export const calendarReadyData = {
  vendorSchedule: {
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
  },
};

export const servicesData = {
  phone: "8075720035",
  profession: "p1",
  meta: {
    canSkip: {
      services: true,
      documents: true,
      certificates: true,
      experience: true,
    },
    services: [
      {
        id: "ps1",
        name: "Replacement",
        price: 170,
        parentServiceId: null,
        instruction: "Replace faulty parts with new ones.",
      },
      {
        id: "s1",
        name: "Switch Replacement",
        price: 170,
        parentServiceId: "ps1",
        instruction: "Replace the switch with a new one.",
      },
      {
        id: "s2",
        name: "Socket Replacement",
        price: 170,
        parentServiceId: "ps1",
        instruction: "Replace the socket with a new one.",
      },
      {
        id: "s3",
        name: "Switchboard Replacement",
        price: 170,
        parentServiceId: "ps1",
        instruction: "Replace the switchboard with a new one.",
      },
      {
        id: "s4",
        name: "AC Switchbox Replacement",
        price: 170,
        parentServiceId: "ps1",
        instruction: "Replace the AC switchbox with a new one.",
      },
      {
        id: "s5",
        name: "Fan Replacement",
        price: 170,
        parentServiceId: "ps1",
        instruction: "Replace the fan with a new one.",
      },
      {
        id: "s6",
        name: "Exhaust Fan Replacement",
        price: 170,
        parentServiceId: "ps1",
        instruction: "Replace the exhaust fan with a new one.",
      },
      {
        id: "s7",
        name: "Fan regulator Replacement",
        price: 170,
        parentServiceId: "ps1",
        instruction: "Replace the fan regulator with a new one.",
      },
      {
        id: "s8",
        name: "Ceiling light Replacement",
        price: 170,
        parentServiceId: "ps1",
        instruction: "Replace the ceiling light with a new one.",
      },
      {
        id: "s9",
        name: "False ceiling light Replacement",
        price: 170,
        parentServiceId: "ps1",
        instruction: "Replace the false ceiling light with a new one.",
      },
      {
        id: "ps2",
        name: "Repair",
        price: 170,
        parentServiceId: null,
        instruction: "Repair faulty parts.",
      },
      {
        id: "s10",
        name: "Switch Repair",
        price: 170,
        parentServiceId: "ps2",
        instruction: "Repair the switch.",
      },
      {
        id: "s11",
        name: "Socket Repair",
        price: 170,
        parentServiceId: "ps2",
        instruction: "Repair the socket.",
      },
      {
        id: "s12",
        name: "Switchboard Repair",
        price: 170,
        parentServiceId: "ps2",
        instruction: "Repair the switchboard.",
      },
      {
        id: "s13",
        name: "AC Switchbox Repair",
        price: 170,
        parentServiceId: "ps2",
        instruction: "Repair the AC switchbox.",
      },
      {
        id: "s14",
        name: "Fan Repair",
        price: 170,
        parentServiceId: "ps2",
        instruction: "Repair the fan.",
      },
      {
        id: "s15",
        name: "Exhaust Fan Repair",
        price: 170,
        parentServiceId: "ps2",
        instruction: "Repair the exhaust fan.",
      },
      {
        id: "s16",
        name: "Fan regulator Repair",
        price: 170,
        parentServiceId: "ps2",
        instruction: "Repair the fan regulator.",
      },
      {
        id: "s17",
        name: "Ceiling light Repair",
        price: 170,
        parentServiceId: "ps2",
        instruction: "Repair the ceiling light.",
      },
      {
        id: "s18",
        name: "False ceiling light Repair",
        price: 170,
        parentServiceId: "ps2",
        instruction: "Repair the false ceiling light.",
      },
    ],
    documents: [
      { id: "d1", name: "Aadhar" },
      { id: "d2", name: "Driving License" },
    ],
    certificates: [
      { id: "c1", name: "Certificate 1" },
      { id: "c2", name: "Certificate 2" },
    ],
  },
};

// const handleCopyPrice = (id: string) => {
//   const valueToCopy = priceValues[id] || "";
//   Clipboard.setString(valueToCopy);

//   const updatedPriceValues = { ...priceValues };
//   console.log("updatedPriceValues>>>", updatedPriceValues);
//   // checkedChildren.forEach((childId) => {
//   //   updatedPriceValues[childId] = valueToCopy;
//   // });
//   // alert("copyCode...");
//   setPriceValues(updatedPriceValues);
//   console.log("priceValues...", priceValues);
// };
