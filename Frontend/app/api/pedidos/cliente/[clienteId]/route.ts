// app/api/pedidos/cliente/[clienteId]/route.ts
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { clienteId: string } }) {
  try {
    const { clienteId } = params

    if (!clienteId) {
      return NextResponse.json({ error: "Cliente ID é obrigatório" }, { status: 400 })
    }

    // Fazer requisição para o backend Express
    const backendUrl = process.env.BACKEND_URL || "http://localhost:3001"
    const response = await fetch(`${backendUrl}/pedidos/cliente/${clienteId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json([]) // Retornar array vazio se não encontrar pedidos
      }
      throw new Error(`Erro do backend: ${response.status}`)
    }

    const pedidos = await response.json()
    return NextResponse.json(pedidos)
  } catch (error) {
    console.error("Erro ao buscar pedidos do cliente:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
