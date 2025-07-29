import { type NextRequest, NextResponse } from "next/server"

export async function GET(
  request: NextRequest,
  { params }: { params: { status: string } }
) {
  try {
    const { status } = params

    if (!status) {
      return NextResponse.json({ error: "Status é obrigatório" }, { status: 400 })
    }

    const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL!
    const response = await fetch(`${backendUrl}/pedidos/status/${status}`, {
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
    console.error("Erro ao buscar pedidos por status:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}