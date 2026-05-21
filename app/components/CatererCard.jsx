// app/caterers/components/CatererCard.jsx
import Stars from "./Stars";

export default function CatererCard({ caterer }) {
  const { name, location, pricePerPlate, cuisines, rating } = caterer;

  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <article className="caterer-card">
      <div className="card-header">
        <div className="avatar" aria-hidden="true">{initials}</div>
        <div className="card-title-group">
          <h3 className="caterer-name">{name}</h3>
          <p className="caterer-location">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" style={{ display: "inline", verticalAlign: "-1px", marginRight: 4 }}>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {location}
          </p>
        </div>
      </div>

      <div className="cuisine-tags">
        {cuisines.map((c) => (
          <span key={c} className="cuisine-tag">{c}</span>
        ))}
      </div>

      <div className="card-footer">
        <div className="rating-group">
          <Stars rating={rating} />
          <span className="rating-number">{rating}</span>
        </div>
        <div className="price-group">
          <span className="price-label">per plate</span>
          <span className="price-value">₹{pricePerPlate.toLocaleString()}</span>
        </div>
      </div>
    </article>
  );
}