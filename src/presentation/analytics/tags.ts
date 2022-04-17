export type EventCategory = 'produto' | 'Carrinho' | 'Finalização'

export type TagObject = {
  label: string
  category: EventCategory
}

export type EventArgs = {
  businessUnit: string
}

export type ProdutoArgs = EventArgs & {
  produtoSku: string
  produtoName: string
}

export type TagArgTypes = {
  ['produto_edit']: ProdutoArgs
}

export type EventKey = keyof TagArgTypes

export const Tags: Readonly<Record<EventKey, TagObject>> = Object.freeze({
  produto_edit: {
    label: 'produto editado',
    category: 'produto'
  }
})
