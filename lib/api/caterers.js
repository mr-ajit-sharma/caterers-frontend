

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000" || "https://caterers-ji.onrender.com";
const CATERERS_ENDPOINT = `${BASE_URL}/api/caterers`;

// ─── Shared fetch wrapper ──────────────────────────────────────────────────
async function apiFetch(url, options = {}) {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.message || `Request failed with status ${res.status}`);
  }

  return res.json();
}

// ─── GET /api/caterers ─────────────────────────────────────────────────────
/**
 * Fetch all caterers.
 * @returns {Promise<Caterer[]>}
 */
export async function getAllCaterers() {
  const response = await apiFetch(CATERERS_ENDPOINT);
  return Array.isArray(response) ? response : [];
}

// ─── GET /api/caterers/:id ─────────────────────────────────────────────────
/**
 * Fetch a single caterer by ID.
 * @param {string|number} id
 * @returns {Promise<Caterer>}
 */
export async function getCatererById(id) {
  return apiFetch(`${CATERERS_ENDPOINT}/${id}`);
}

// ─── POST /api/caterers ────────────────────────────────────────────────────
/**
 * Create a new caterer.
 * @param {CatererInput} data
 * @returns {Promise<Caterer>}
 */
export async function createCaterer(data) {
  return apiFetch(CATERERS_ENDPOINT, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * @typedef {Object} Caterer
 * @property {string|number} id
 * @property {string}        name
 * @property {string}        location
 * @property {number}        pricePerPlate
 * @property {string[]}      cuisines
 * @property {number}        rating
 * @property {number}        [reviewCount]
 *
 * @typedef {Omit<Caterer, 'id'>} CatererInput
 */
