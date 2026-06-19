import { getStatsLastUpdatedLabel, getVerifiedStatsSnapshot } from "@/services/stats";

export function SourceStrip({ className = "" }: { className?: string }) {
  const snapshot = getVerifiedStatsSnapshot();
  return (
    <div className={`rounded-full border border-white/10 bg-black/25 px-4 py-2 text-[10px] uppercase tracking-[0.26em] text-white/60 ${className}`}>
      Last Updated {getStatsLastUpdatedLabel()} · Sources {snapshot.verifiedSources.join(" · ")}
    </div>
  );
}
