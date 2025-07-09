// app/api/carrinho/[clienteId]/item/[itemId]/route.ts
import { NextResponse } from 'next/server'

const API_BASE_URL = 'http://localhost:3001'

export async function DELETE(
  request: Request,
  { params }: { params: { clienteId: string; itemId: string } }
) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/carrinho/${params.clienteId}/item/${params.itemId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return NextResponse.json({ message: 'Item removido do carrinho' })
  } catch (error) {
    console.error('Erro ao remover item do carrinho:', error)
    return NextResponse.json(
      { error: 'Erro ao remover item do carrinho' },
      { status: 500 }
    )
  }
}