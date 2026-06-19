import statsSnapshot from "@/data/stats.json";

export type StatsSnapshot = typeof statsSnapshot;
export type FormatKey = keyof StatsSnapshot["formats"];

export function getVerifiedStatsSnapshot() {
  return statsSnapshot;
}

export function getFormatStats<T extends FormatKey>(format: T): StatsSnapshot["formats"][T] {
  return statsSnapshot.formats[format];
}

export function getStatsLastUpdatedLabel() {
  return new Date(statsSnapshot.lastUpdated).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
