"use client";

import dynamic from "next/dynamic";

export const DateCalendar = dynamic(
  () => import("@mui/x-date-pickers").then((mod) => mod.DateCalendar),
  { ssr: false }
);

export const MultiSectionDigitalClock = dynamic(
  () =>
    import("@mui/x-date-pickers").then((mod) => mod.MultiSectionDigitalClock),
  { ssr: false }
);

export const YearCalendar = dynamic(
  () => import("@mui/x-date-pickers").then((mod) => mod.YearCalendar),
  { ssr: false }
);

export const DateTimePicker = dynamic(
  () => import("@mui/x-date-pickers").then((mod) => mod.DateTimePicker),
  { ssr: false }
);

export const TimePicker = dynamic(
  () => import("@mui/x-date-pickers").then((mod) => mod.TimePicker),
  { ssr: false }
);

export const CalendarIcon = dynamic(
  () => import("@mui/x-date-pickers").then((mod) => mod.CalendarIcon),
  { ssr: false }
);
