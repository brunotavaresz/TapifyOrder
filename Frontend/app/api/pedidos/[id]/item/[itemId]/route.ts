// app/api/pedidos/[id]/item/[itemId]/route.ts

import { type NextRequest, NextResponse } from "next/server"

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; itemId: string } }
) {
  try {
    const { id, itemId } = params

    if (!id || !itemId) {
      return NextResponse.json({ error: "ID do pedido e item são obrigatórios" }, { status: 400 })
    }

    const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL! || "http://localhost:3001"

    const response = await fetch(`${backendUrl}/pedidos/${id}/item/${itemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: "Pedido ou item não encontrado" }, { status: 404 })
      }
      throw new Error(`Erro do backend: ${response.status}`)
    }

    const result = await response.json()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Erro ao remover item do pedido:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; itemId: string } }
) {
  try {
    const { id, itemId } = params
    const body = await request.json()

    if (!id || !itemId) {
      return NextResponse.json({ error: "ID do pedido e item são obrigatórios" }, { status: 400 })
    }

    const backendUrl = process.env.BACKEND_URL || "http://localhost:3001"
    const response = await fetch(`${backendUrl}/pedidos/${id}/item/${itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: "Pedido ou item não encontrado" }, { status: 404 })
      }
      if (response.status === 400) {
        return NextResponse.json({ error: "Quantidade inválida" }, { status: 400 })
      }
      throw new Error(`Erro do backend: ${response.status}`)
    }

    const pedido = await response.json()
    return NextResponse.json(pedido)
  } catch (error) {
    console.error("Erro ao alterar quantidade do item:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}