import { type NextRequest, NextResponse } from "next/server"

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json({ error: "ID do pedido é obrigatório" }, { status: 400 })
    }

    const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL!
    const response = await fetch(`${backendUrl}/pedidos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
  if (response.status === 404) {
    return NextResponse.json({ error: "Pedido não encontrado" }, { status: 404 })
  }
  throw new Error(`Erro do backend: ${response.status}`)
}

return NextResponse.json({ message: "Pedido deletado com sucesso" }, { status: 200 })
  } catch (error) {
    console.error("Erro ao deletar pedido:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
