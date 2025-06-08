import { NextRequest, NextResponse } from "next/server";
import Database from "better-sqlite3";

// SQLite DBファイルへのパス（プロジェクト直下の db/products.db）
const db = new Database("db/products.db");

// テーブルがなければ作る（初回のみ実行される）
db.prepare(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price INTEGER NOT NULL
  )
`).run();

// GET: 商品一覧取得
export async function GET() {
  const products = db.prepare("SELECT * FROM products").all();
  return NextResponse.json(products);
}

// POST: 商品追加
export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.name || !body.price) {
    return NextResponse.json({ error: "nameとpriceは必須です" }, { status: 400 });
  }

  const stmt = db.prepare("INSERT INTO products (name, price) VALUES (?, ?)");
  const info = stmt.run(body.name, body.price);

  const newProduct = {
    id: info.lastInsertRowid,
    name: body.name,
    price: body.price,
  };

  return NextResponse.json(newProduct, { status: 201 });
}
