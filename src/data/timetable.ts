export type TimetableItem = {
  area: string;
  start: string;
  end: string;
  artist: string;
  isLive?: boolean;
  areaLabel?: string;
};

export const AREAS = ["area.97", "area.01", "area.07", "area.14", "area.22", "area.24"] as const;

export const timetable: TimetableItem[] = [
  { area: "area.97", start: "13:00", end: "14:30", artist: "TWIENA" },
  { area: "area.97", start: "14:30", end: "16:00", artist: "Beste Hira & Lobster" },
  { area: "area.97", start: "16:00", end: "17:45", artist: "ANNĒ & Ben Sims" },
  { area: "area.97", start: "17:45", end: "19:30", artist: "Anetha & Pegassi" },
  { area: "area.97", start: "19:30", end: "21:30", artist: "Ben UFO & Four Tet" },
  { area: "area.97", start: "21:30", end: "23:00", artist: "Nina Kraviz" },

  { area: "area.01", start: "13:00", end: "14:45", artist: "Remma & Thoms Traxx" },
  { area: "area.01", start: "14:45", end: "16:15", artist: "Cio D’Or & Claudio PRC" },
  { area: "area.01", start: "16:15", end: "18:00", artist: "Abstract Division & JakoJako" },
  { area: "area.01", start: "18:00", end: "19:30", artist: "LSD: Luke Slater, Steve Bicknell and Function", isLive: true },
  { area: "area.01", start: "19:30", end: "21:00", artist: "Ignez & Rødhåd", isLive: true },
  { area: "area.01", start: "21:00", end: "23:00", artist: "Freddy K & Marrøn" },

  { area: "area.07", start: "13:00", end: "15:00", artist: "Alycia Bezgo" },
  { area: "area.07", start: "15:00", end: "16:45", artist: "Faster Horses & Stef de Haan" },
  { area: "area.07", start: "16:45", end: "17:45", artist: "The Tunegirl", isLive: true },
  { area: "area.07", start: "17:45", end: "19:30", artist: "Adrián Mills" },
  { area: "area.07", start: "19:30", end: "21:15", artist: "Ciara Cuvé" },
  { area: "area.07", start: "21:15", end: "23:00", artist: "Azyr & Charlie Sparks" },

  { area: "area.14", start: "13:00", end: "14:30", artist: "Kyra Khaldi" },
  { area: "area.14", start: "14:30", end: "15:45", artist: "Aldonna" },
  { area: "area.14", start: "15:45", end: "17:00", artist: "Main phase" },
  { area: "area.14", start: "17:00", end: "18:30", artist: "Milion" },
  { area: "area.14", start: "18:30", end: "20:00", artist: "Emvae & Moxes" },
  { area: "area.14", start: "20:00", end: "21:30", artist: "Helena Lauwaert" },
  { area: "area.14", start: "21:30", end: "23:00", artist: "Sam Alfred" },

  { area: "area.22", areaLabel: "house", start: "13:00", end: "14:45", artist: "Hannecart" },
  { area: "area.22", areaLabel: "house", start: "14:45", end: "16:30", artist: "Rene Wise" },
  { area: "area.22", areaLabel: "house", start: "16:30", end: "17:30", artist: "Paranoid London", isLive: true },
  { area: "area.22", areaLabel: "house", start: "17:30", end: "19:15", artist: "Freddy K" },
  { area: "area.22", areaLabel: "house", start: "19:15", end: "21:15", artist: "Doudou MD & Jennifer Loveless" },
  { area: "area.22", areaLabel: "house", start: "21:15", end: "23:00", artist: "DJ Sweet6teen" },

  { area: "area.24", start: "13:00", end: "14:30", artist: "Karina Schneider" },
  { area: "area.24", start: "14:30", end: "16:15", artist: "JSPRV35 & Toobris" },
  { area: "area.24", start: "16:15", end: "17:15", artist: "UFO95", isLive: true },
  { area: "area.24", start: "17:15", end: "19:00", artist: "Kameliia & Setaoc Mass" },
  { area: "area.24", start: "19:00", end: "20:30", artist: "Colin Benders & Dasha Rush", isLive: true },
  { area: "area.24", start: "20:30", end: "23:00", artist: "Jeans & Spekki Webu & Woody92" }
];
