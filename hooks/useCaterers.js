
"use client";

import { useState, useEffect, useMemo } from "react";
import { getAllCaterers } from "@/lib/api/caterers";

// ─── Price filter buckets (edit freely) ───────────────────────────────────
export const PRICE_FILTERS = [
  { label: "All prices",    min: 0,    max: Infinity },
  { label: "Under ₹500",   min: 0,    max: 499      },
  { label: "₹500 – ₹800",  min: 500,  max: 800      },
  { label: "₹800 – ₹1,200",min: 801,  max: 1200     },
  { label: "Above ₹1,200", min: 1201, max: Infinity  },
];

export function useCaterers() {
  // ── Raw data from API ────────────────────────────────────────────────────
  const [caterers, setCaterers]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);

  // ── Filter state ─────────────────────────────────────────────────────────
  const [search, setSearch]             = useState("");
  const [priceFilterIndex, setPriceFilterIndex] = useState(0);

  // ── Fetch on mount ───────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    getAllCaterers()
      .then((data) => {
        if (!cancelled) setCaterers(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Failed to load caterers.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; }; // cleanup on unmount
  }, []);

  // ── Filtered list (memoised — only recomputes when deps change) ──────────
  const filtered = useMemo(() => {
    const { min, max } = PRICE_FILTERS[priceFilterIndex];
    const q = search.trim().toLowerCase();

    return caterers.filter(
      (c) =>
        (!q || c.name.toLowerCase().includes(q)) &&
        c.pricePerPlate >= min &&
        c.pricePerPlate <= max
    );
  }, [caterers, search, priceFilterIndex]);

  return {
    // data
    caterers: filtered,
    totalCount: caterers.length,
    // status
    loading,
    error,
    // filter controls
    search,
    setSearch,
    priceFilterIndex,
    setPriceFilterIndex,
  };
}
