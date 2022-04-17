import { IAnalyticsDriver } from './driver'
import { Tags, EventKey, TagArgTypes } from './tags'

type Exactly<T, U> = T & Record<Exclude<keyof T, keyof U>, never>

export class AnalyticsEngine {
  private readonly driver: IAnalyticsDriver
  private readonly bu: string
  private readonly roles: string

  constructor(driver: IAnalyticsDriver, bu: string, roles: string) {
    this.driver = driver
    this.bu = bu
    this.roles = roles
  }

  produtoEdit(produto: { nome: string; sku: string }): void {
    const args = this.getProdutoArgs(produto)
    this.logEvent('produto_edit', args)
  }

  private getProdutoArgs(produto: { nome: string; sku: string }) {
    return {
      produtoSku: produto.sku,
      produtoName: produto.nome,
      businessUnit: this.bu
    }
  }

  private logEvent<K extends EventKey, A extends Exactly<TagArgTypes[K], A>>(
    key: K,
    args: A
  ) {
    const { category, label } = Tags[key]
    const argsWithRoles = { userRole: this.roles, ...args }
    this.driver.logEvent(key, category, label, argsWithRoles)
  }
}
