// app/caterers/components/SkeletonCard.jsx
export default function SkeletonCard() {
  return (
    <div className="caterer-card skeleton-card" aria-hidden="true">
      <div className="card-header">
        <div className="skeleton" style={{ width: 48, height: 48, borderRadius: "50%", flexShrink: 0 }} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
          <div className="skeleton" style={{ height: 18, width: "60%" }} />
          <div className="skeleton" style={{ height: 13, width: "40%" }} />
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
        {[90, 80, 70].map((w) => (
          <div key={w} className="skeleton" style={{ height: 26, width: w, borderRadius: 20 }} />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
        <div className="skeleton" style={{ height: 16, width: 120 }} />
        <div className="skeleton" style={{ height: 20, width: 60 }} />
      </div>
    </div>
  );
}