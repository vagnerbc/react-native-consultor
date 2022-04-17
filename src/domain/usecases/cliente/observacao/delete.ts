export interface Delete {
  exec(observacaoId: number): Promise<number>
}
