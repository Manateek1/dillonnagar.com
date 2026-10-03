import type { Metadata } from "next";
import CountdownConsole from "./CountdownConsole";

export const metadata: Metadata = {
  title: "The 8 PM Countdown",
  description:
    "A highly official GreetMe timekeeping desk counting down to 8 PM Pacific, with hourly audio nonsense.",
};

export default function CountdownPage() {
  return <CountdownConsole />;
}
