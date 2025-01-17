import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  // @ts-ignore
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
    next: { revalidate: 3600 },
  });
  const pokemon = await res.json();
  return NextResponse.json(pokemon);
}
