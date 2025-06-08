'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
  };

  const addProduct = async (e: any) => {
    e.preventDefault();
    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price: Number(price) }),
    });
    setName('');
    setPrice('');
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main>
      <h1>商品リスト</h1>
      <ul>
        {products.map((p: any) => (
          <li key={p.id}>
            {p.name} - {p.price}円
          </li>
        ))}
      </ul>
      <h2>商品を追加</h2>
      <form onSubmit={addProduct}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="商品名" required />
        <input value={price} onChange={e => setPrice(e.target.value)} placeholder="価格" type="number" required />
        <button type="submit">追加</button>
      </form>
    </main>
  );
}
