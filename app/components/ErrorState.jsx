// app/caterers/components/ErrorState.jsx
export default function ErrorState({ message }) {
  return (
    <div className="error-state" role="alert">
      <div className="error-icon" aria-hidden="true">⚠️</div>
      <h3>Could not load caterers</h3>
      <p>{message}</p>
    </div>
  );
}