import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL!
    const response = await fetch(`${backendUrl}/pedidos/hoje/receita`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Erro do backend: ${response.status}`)
    }

    const receita = await response.json()
    return NextResponse.json(receita)
  } catch (error) {
    console.error("Erro ao buscar receita de hoje:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}