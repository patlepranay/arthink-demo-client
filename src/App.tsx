import {  useCallback, useState } from "react";
import "./App.css";

interface Product {
  name: string;
  value: number;
  id: number;
  distributor: string;
}
function App() {
  const [products, setProducts] = useState<Product[]>([]);
  let id: number;
  const fetchProducts = useCallback(async (query: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/products?query=${query}`
      );
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  }, []);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (id) {
      clearTimeout(id);
    }

    id = setTimeout(async () => {
      if (value) {
        fetchProducts(value);
      } else {
        setProducts([]);
      }
    }, 200);
  };

  return (
    <div style={{ width: "500px", margin: "0 auto", position: "relative" }}>
      <input
        type="text"
        onChange={handleInputChange}
        placeholder="Search..."
        style={{
          width: "100%",
          height: "40px",
          padding: "10px",
        }}
      />
      {products.length > 0 && (
        <ul
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
          }}
        >
          {products.map((product) => (
            <li
              key={product.id}
              style={{
                padding: "10px",
                cursor: "pointer",
              }}
            >
              {product.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
