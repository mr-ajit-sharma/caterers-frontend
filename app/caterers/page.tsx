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
    gap: 16px; 
    align-items: center; 
    flex-wrap: wrap;
  }
  .search-wrap { 
    position: relative; 
    flex: 1; 
    min-width: 220px; 
  }
  .search-icon {
    position: absolute; 
    left: 14px; 
    top: 50%;
    transform: translateY(-50%); 
    color: #A09A8E; 
    pointer-events: none;
  }
  .search-input {
    width: 100%; 
    height: 46px; 
    padding: 0 14px 0 42px;
    border: 1.5px solid #EAE8E2; 
    border-radius: 10px;
    font-size: 15px; 
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
    gap: 8px; 
    flex-wrap: wrap; 
  }
  .price-pill {
    padding: 8px 16px; 
    border-radius: 9999px; 
    font-size: 13.5px;
    font-family: inherit; 
    font-weight: 500; 
    cursor: pointer;
    border: 1.5px solid #EAE8E2; 
    background: transparent;
    color: #6B6560; 
    transition: all 0.15s; 
    white-space: nowrap;
    min-height: 38px;
    display: flex;
    align-items: center;
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
    font-size: 13.5px; 
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
    gap: 20px;
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

  /* ==================== RESPONSIVE ==================== */

  /* Tablet */
  @media (max-width: 1024px) {
    .caterers-grid {
      gap: 18px;
      padding: 12px 20px 50px;
    }
  }

  /* Mobile Large (≤768px) */
  @media (max-width: 768px) {
    .page-header {
      padding: 32px 20px 28px;
    }
    .header-title {
      font-size: clamp(26px, 6vw, 38px);
    }
    .controls-bar {
      padding: 14px 20px;
    }
    .controls-inner {
      gap: 12px;
    }
    .search-input {
      height: 44px;
      font-size: 15px;
    }
  }

  /* Mobile Small (≤640px) */
  @media (max-width: 640px) {
    .controls-inner { 
      flex-direction: column; 
      align-items: stretch; 
    }
    
    .search-wrap {
      min-width: auto;
    }

    .price-pills { 
      gap: 6px;
    }
    .price-pill { 
      font-size: 13px; 
      padding: 7px 14px; 
      min-height: 36px;
    }

    .caterers-grid { 
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      padding: 12px 16px 40px;
      gap: 16px;
    }

    .page-header { 
      padding: 28px 16px 24px; 
    }
    .controls-bar { 
      padding: 12px 16px; 
    }
    .results-meta { 
      padding: 16px 16px 8px; 
      font-size: 13px;
    }

    .caterer-card {
      padding: 18px;
    }
  }

  /* Very Small Phones (≤480px) */
  @media (max-width: 480px) {
    .caterers-grid {
      grid-template-columns: 1fr;
      padding: 12px 14px 32px;
    }

    .header-subtitle {
      font-size: 14px;
    }

    .price-pill {
      padding: 6px 12px;
      font-size: 12.5px;
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