import { v1 } from 'uuid'
export class IDFactory {
  public static createID() {
    return v1
  }
  public static generateID() {
    return v1()
  }
}

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
  }[Keys]
