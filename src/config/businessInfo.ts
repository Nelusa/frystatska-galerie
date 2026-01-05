export interface OpeningHoursDay {
  label: string;
  hours: string;
}

export const openingHours: OpeningHoursDay[] = [
  { label: "Po-Pá", hours: "9:30 - 16:30" },
  { label: "So", hours: "Zavřeno" },
  { label: "Ne", hours: "Zavřeno" }
];

export function getShortOpeningHours(): string {
  const workDays = openingHours.find(day => day.label === "Po-Pá");
  return workDays ? `${workDays.label}: ${workDays.hours}` : "";
}

export function getFullOpeningHours(): string[] {
  return openingHours.map(day => `${day.label}: ${day.hours}`);
}

export const businessInfo = {
  address: {
    street: "Fryštátská 57",
    city: "733 01 Karviná 1-Fryštát",
    full: "Fryštátská 57, 733 01 Karviná 1-Fryštát"
  },
  phone: {
    display: "+420 605 416 666",
    href: "tel:+420605416666"
  },
  email: {
    display: "info@frystatskagalerie.cz",
    href: "mailto:info@frystatskagalerie.cz"
  },
  openingHours
};

