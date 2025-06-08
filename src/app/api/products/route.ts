let products = [
  { id: 1, name: 'リンゴ', price: 100 },
  { id: 2, name: 'みかん', price: 80 },
];

export async function GET() {
  return Response.json(products);
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.name || !body.price) {
    return new Response(JSON.stringify({ error: 'nameとpriceは必須' }), { status: 400 });
  }

  const newProduct = { id: Date.now(), ...body };
  products.push(newProduct);
  return Response.json(newProduct, { status: 201 });
}
