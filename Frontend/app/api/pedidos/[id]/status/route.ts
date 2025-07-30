import { type NextRequest, NextResponse } from "next/server"

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()

    if (!id) {
      return NextResponse.json({ error: "ID do pedido é obrigatório" }, { status: 400 })
    }

    const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL! || "http://localhost:3001"
    const response = await fetch(`${backendUrl}/pedidos/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: "Pedido não encontrado" }, { status: 404 })
      }
      if (response.status === 400) {
        return NextResponse.json({ error: "Status inválido" }, { status: 400 })
      }
      throw new Error(`Erro do backend: ${response.status}`)
    }

    const pedido = await response.json()
    return NextResponse.json(pedido)
  } catch (error) {
    console.error("Erro ao atualizar status do pedido:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
