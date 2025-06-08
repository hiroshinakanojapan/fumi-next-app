"use client";

import { useState, useEffect } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  const addProduct = async () => {
    if (!name || !price) return;

    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price: parseInt(price, 10) }),
    });

    setName("");
    setPrice("");
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">商品リスト</h1>
      <ul className="space-y-2 mb-8">
        {products.map((p) => (
          <li
            key={p.id}
            className="border rounded-lg px-4 py-2 flex justify-between"
          >
            <span>{p.name}</span>
            <span className="text-gray-500">{p.price}円</span>
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mb-2">商品を追加</h2>
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="商品名"
          className="border p-2 rounded w-1/2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="価格"
          className="border p-2 rounded w-1/4"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button
          onClick={addProduct}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          追加
        </button>
      </div>
    </main>
  );
}
