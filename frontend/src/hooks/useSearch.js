import { useState, useEffect } from "react";
function useSearch(items, query) {
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    if (query.trim() !== "") {
      const results = items
        .filter((item) => item.toLowerCase().includes(query.toLowerCase()))
        .sort((a, b) => {
          // Bubble up the words that start with the query
          const aStartsWith = a.toLowerCase().startsWith(query.toLowerCase());
          const bStartsWith = b.toLowerCase().startsWith(query.toLowerCase());

          if (aStartsWith && !bStartsWith) return -1; // a comes before b
          if (!aStartsWith && bStartsWith) return 1; // b comes before a
          return 0;
        });
      setFilteredItems(results);
    } else {
      setFilteredItems([]);
    }
  }, [query, items]);

  return filteredItems;
}
export default useSearch;
