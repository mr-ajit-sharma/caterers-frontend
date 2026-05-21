// app/caterers/components/Stars.jsx
export default function Stars({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;

  return (
    <span style={{ display: "inline-flex", gap: 2 }} aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill={i <= full ? "#E9A800" : i === full + 1 && half ? "url(#half)" : "none"}
          stroke="#E9A800"
          strokeWidth="1.5"
        >
          {i === full + 1 && half && (
            <defs>
              <linearGradient id="half">
                <stop offset="50%" stopColor="#E9A800" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
          )}
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </span>
  );
}