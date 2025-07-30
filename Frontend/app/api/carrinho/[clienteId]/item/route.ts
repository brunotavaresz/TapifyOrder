// app/api/carrinho/[clienteId]/item/route.ts
import { NextResponse } from "next/server"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL! || 'http://localhost:3001' // Default to local if env variable is not set


export async function POST(request: Request, { params }: { params: { clienteId: string } }) {
  try {
    const body = await request.json()

    const response = await fetch(`${API_BASE_URL}/carrinho/${params.clienteId}/item`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Erro ao adicionar/atualizar item no carrinho:", error)
    return NextResponse.json({ error: "Erro ao adicionar/atualizar item no carrinho" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { clienteId: string; itemId: string } }) {
  try {
    const response = await fetch(`${API_BASE_URL}/carrinho/${params.clienteId}/item/${params.itemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return NextResponse.json({ message: "Item removido do carrinho" })
  } catch (error) {
    console.error("Erro ao remover item do carrinho:", error)
    return NextResponse.json({ error: "Erro ao remover item do carrinho" }, { status: 500 })
  }
}
