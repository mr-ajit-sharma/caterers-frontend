// app/caterers/components/EmptyState.jsx
export default function EmptyState({ search }) {
  return (
    <div className="empty-state">
      <div className="empty-icon" aria-hidden="true">🍽️</div>
      <h3>No caterers found</h3>
      <p>
        {search
          ? `No results for "${search}". Try a different name or adjust the price filter.`
          : "Try adjusting your price filter."}
      </p>
    </div>
  );
}