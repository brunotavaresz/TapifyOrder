import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL!
    const response = await fetch(`${backendUrl}/pedidos/hoje`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Erro do backend: ${response.status}`)
    }

    const pedidos = await response.json()
    return NextResponse.json(pedidos)
  } catch (error) {
    console.error("Erro ao buscar pedidos de hoje:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}