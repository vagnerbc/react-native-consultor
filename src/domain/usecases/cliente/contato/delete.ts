export interface Delete {
  exec(contatoId: number): Promise<number>
}
