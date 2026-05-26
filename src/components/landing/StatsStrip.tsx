import { copy } from "@/lib/copy";

export function StatsStrip() {
  return (
    <section className="stats-strip" aria-label="Live crew stats">
      <div className="stats-strip__inner">
        <div className="stat-pill">
          <span className="stat-pill__value">{copy.statsStrip.shipping}</span>
        </div>
        <div className="stat-pill stat-pill--warn">
          <span className="stat-pill__value">{copy.statsStrip.overboard}</span>
        </div>
        <div className="stat-pill stat-pill--gold">
          <span className="stat-pill__value">{copy.statsStrip.spots}</span>
        </div>
      </div>
    </section>
  );
}
