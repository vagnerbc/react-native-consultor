export interface Parser {
  parse<T>(token: string): T
}
