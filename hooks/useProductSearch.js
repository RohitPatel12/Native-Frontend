import { useState, useEffect } from "react";

const BASE_URL = "http://192.168.1.3:8083";

async function fetchProducts(query = "") {
  try {
    const url = query
      ? `${BASE_URL}/products/search?query=${encodeURIComponent(query)}`
      : `${BASE_URL}/products`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();
    return data.content || [];
  } catch (err) {
    console.error("API Error:", err);
    return [];
  }
}

/**
 * useProductSearch hook
 * @param {string} query - current search query
 */
export function useProductSearch(query) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController(); // cancel previous requests if needed
    const signal = controller.signal;

    const fetchData = async () => {
      setLoading(true);
      const data = await fetchProducts(query);
      if (!signal.aborted) setProducts(data); // only set if not aborted
      setLoading(false);
    };

    const debounce = setTimeout(fetchData, 300); // debounce API calls

    return () => {
      clearTimeout(debounce);
      controller.abort(); // cancel previous API call
    };
  }, [query]);

  return { products, loading, setProducts };
}
