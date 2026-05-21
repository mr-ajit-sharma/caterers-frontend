"use client";

/**
 * app/caterers/page.jsx
 * Route: /caterers
 */

import { useCaterers, PRICE_FILTERS } from "@/hooks/useCaterers";

import CatererCard from "../components/CatererCard";
import SkeletonCard from "../components/SkeletonCard";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";

export default function CaterersPage() {
  const {
    caterers,
    loading,
    error,
    search,
    setSearch,
    priceFilterIndex,
    setPriceFilterIndex,
  } = useCaterers();

  return (
    <>
      <style>{`
  *, *::before, *::after { 
    box-sizing: border-box; 
    margin: 0; 
    padding: 0; 
  }

  .page-root {
    min-height: 100vh;
    background: #F7F5F0;
    font-family: 'DM Sans', system-ui, sans-serif;
    color: #1C1A17;
  }

  /* Header */
  .page-header {
    background: #1C1A17;
    padding: 40px 24px 36px;
    position: relative;
    overflow: hidden;
  }
  .page-header::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 60% 80% at 80% 50%, #3D2B1F 0%, transparent 70%);
    pointer-events: none;
  }
  .header-inner { 
    max-width: 1100px; 
    margin: 0 auto; 
    position: relative; 
    z-index: 1; 
  }
  .header-eyebrow {
    font-size: 11px; 
    letter-spacing: 0.15em; 
    text-transform: uppercase;
    color: #C8A96E; 
    margin-bottom: 10px; 
    font-weight: 500;
  }
  .header-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(28px, 5vw, 48px); 
    font-weight: 700;
    color: #FAF8F4; 
    line-height: 1.1; 
    margin-bottom: 10px;
  }
  .header-title span { 
    color: #C8A96E; 
  }
  .header-subtitle { 
    font-size: 15px; 
    color: #A09A8E; 
    max-width: 460px; 
    line-height: 1.6; 
  }

  /* Controls */
  .controls-bar {
    background: #fff;
    border-bottom: 1px solid #EAE8E2;
    padding: 16px 24px;
    position: sticky;
    top: 0;
    z-index: 10;
  }
  .controls-inner {
    max-width: 1100px; 
    margin: 0 auto;
    display: flex; 
    gap: 12px; 
    align-items: center; 
    flex-wrap: wrap;
  }
  .search-wrap { 
    position: relative; 
    flex: 1; 
    min-width: 200px; 
  }
  .search-icon {
    position: absolute; 
    left: 12px; 
    top: 50%;
    transform: translateY(-50%); 
    color: #A09A8E; 
    pointer-events: none;
  }
  .search-input {
    width: 100%; 
    height: 42px; 
    padding: 0 12px 0 38px;
    border: 1.5px solid #EAE8E2; 
    border-radius: 10px;
    font-size: 14px; 
    font-family: inherit; 
    color: #1C1A17;
    background: #FAFAF8; 
    outline: none; 
    transition: border-color 0.15s;
  }
  .search-input::placeholder { 
    color: #BFBBB3; 
  }
  .search-input:focus { 
    border-color: #C8A96E; 
    background: #fff; 
  }

  .filter-label { 
    font-size: 13px; 
    color: #6B6560; 
    white-space: nowrap; 
    font-weight: 500; 
  }
  .price-pills { 
    display: flex; 
    gap: 6px; 
    flex-wrap: wrap; 
  }
  .price-pill {
    padding: 6px 14px; 
    border-radius: 20px; 
    font-size: 13px;
    font-family: inherit; 
    font-weight: 500; 
    cursor: pointer;
    border: 1.5px solid #EAE8E2; 
    background: transparent;
    color: #6B6560; 
    transition: all 0.15s; 
    white-space: nowrap;
  }
  .price-pill:hover { 
    border-color: #C8A96E; 
    color: #1C1A17; 
  }
  .price-pill.active { 
    background: #1C1A17; 
    border-color: #1C1A17; 
    color: #FAF8F4; 
  }

  /* Results meta */
  .results-meta {
    max-width: 1100px; 
    margin: 0 auto;
    padding: 20px 24px 8px; 
    font-size: 13px; 
    color: #A09A8E;
  }
  .results-meta strong { 
    color: #1C1A17; 
    font-weight: 600; 
  }

  /* Grid */
  .caterers-grid {
    max-width: 1100px; 
    margin: 0 auto;
    padding: 12px 24px 60px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 18px;
  }

  /* Card */
  .caterer-card {
    background: #fff; 
    border: 1px solid #EAE8E2; 
    border-radius: 16px;
    padding: 20px; 
    display: flex; 
    flex-direction: column;
    transition: transform 0.18s, box-shadow 0.18s, border-color 0.18s;
  }
  .caterer-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(28,26,23,0.09);
    border-color: #D4C9A8;
  }
  .card-header { 
    display: flex; 
    gap: 14px; 
    align-items: flex-start; 
    margin-bottom: 14px; 
  }
  .avatar {
    width: 48px; 
    height: 48px; 
    border-radius: 12px;
    background: linear-gradient(135deg, #C8A96E 0%, #E8C98E 100%);
    color: #fff; 
    font-size: 15px; 
    font-weight: 700;
    display: flex; 
    align-items: center; 
    justify-content: center;
    flex-shrink: 0; 
    letter-spacing: 0.02em;
  }
  .card-title-group { 
    flex: 1; 
    min-width: 0; 
  }
  .caterer-name {
    font-size: 15px; 
    font-weight: 600; 
    color: #1C1A17;
    line-height: 1.3; 
    white-space: nowrap;
    overflow: hidden; 
    text-overflow: ellipsis;
  }
  .caterer-location { 
    font-size: 12.5px; 
    color: #A09A8E; 
    margin-top: 3px; 
  }

  .cuisine-tags { 
    display: flex; 
    flex-wrap: wrap; 
    gap: 6px; 
    margin-bottom: 16px; 
  }
  .cuisine-tag {
    background: #F5F2EA; 
    color: #6B6560; 
    font-size: 11.5px;
    font-weight: 500; 
    padding: 4px 10px; 
    border-radius: 6px;
    border: 1px solid #EAE8E2;
  }

  .card-footer {
    display: flex; 
    align-items: center; 
    justify-content: space-between;
    padding-top: 14px; 
    border-top: 1px solid #F0EDE5; 
    margin-top: auto;
  }
  .rating-group { 
    display: flex; 
    align-items: center; 
    gap: 5px; 
  }
  .rating-number { 
    font-size: 13px; 
    font-weight: 600; 
    color: #1C1A17; 
  }
  .price-group { 
    display: flex; 
    flex-direction: column; 
    align-items: flex-end; 
  }
  .price-label { 
    font-size: 11px; 
    color: #A09A8E; 
    line-height: 1; 
    margin-bottom: 2px; 
  }
  .price-value {
    font-size: 18px; 
    font-weight: 700; 
    color: #C8A96E;
    font-feature-settings: "tnum"; 
    letter-spacing: -0.01em;
  }

  /* Skeleton */
  .skeleton {
    background: linear-gradient(90deg, #EAE8E2 25%, #F5F2EA 50%, #EAE8E2 75%);
    background-size: 200% 100%;
    animation: shimmer 1.4s infinite;
    border-radius: 6px;
  }
  @keyframes shimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  /* Empty / Error */
  .empty-state, .error-state {
    grid-column: 1 / -1; 
    text-align: center; 
    padding: 64px 24px;
  }
  .empty-icon, .error-icon { 
    font-size: 48px; 
    margin-bottom: 16px; 
    opacity: 0.4; 
  }
  .empty-state h3, .error-state h3 {
    font-size: 18px; 
    color: #6B6560; 
    margin-bottom: 8px;
  }
  .error-state h3 { 
    color: #E24B4A; 
  }
  .empty-state p, .error-state p { 
    font-size: 14px; 
    color: #A09A8E; 
  }

  /* Responsive */
  @media (max-width: 640px) {
    .controls-inner { 
      flex-direction: column; 
      align-items: stretch; 
    }
    .price-pill { 
      font-size: 12px; 
      padding: 5px 10px; 
    }
    .caterers-grid { 
      padding: 12px 16px 48px; 
    }
    .page-header { 
      padding: 28px 16px 24px; 
    }
    .controls-bar { 
      padding: 12px 16px; 
    }
    .results-meta { 
      padding: 16px 16px 6px; 
    }
  }
`}</style>

      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />

      <div className="page-root">
        {/* Header */}
        <header className="page-header">
          <div className="header-inner">
            <p className="header-eyebrow">Find your perfect match</p>
            <h1 className="header-title">Discover <span>Caterers</span></h1>
            <p className="header-subtitle">
              Browse top-rated catering services for weddings, corporate events, and celebrations.
            </p>
          </div>
        </header>

        {/* Controls */}
        <div className="controls-bar" role="search" aria-label="Caterer filters">
          <div className="controls-inner">
            <div className="search-wrap">
              <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="search"
                className="search-input"
                placeholder="Search by caterer name…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search caterers by name"
              />
            </div>

            <span className="filter-label">Price:</span>
            <div className="price-pills" role="group" aria-label="Filter by price">
              {PRICE_FILTERS.map((f, i) => (
                <button
                  key={f.label}
                  className={`price-pill${priceFilterIndex === i ? " active" : ""}`}
                  onClick={() => setPriceFilterIndex(i)}
                  aria-pressed={priceFilterIndex === i}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Meta */}
        {!loading && !error && (
          <p className="results-meta" aria-live="polite">
            Showing <strong>{caterers.length}</strong> caterer{caterers.length !== 1 ? "s" : ""}
            {search && <> for &ldquo;<strong>{search}</strong>&rdquo;</>}
          </p>
        )}

        {/* Grid */}
        <main>
          <div className="caterers-grid">
            {error ? (
              <ErrorState message={error} />
            ) : loading ? (
              Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            ) : caterers.length === 0 ? (
              <EmptyState search={search} />
            ) : (
              caterers.map((c) => <CatererCard key={c.id} caterer={c} />)
            )}
          </div>
        </main>
      </div>
    </>
  );
}