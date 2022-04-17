import AsyncStorage from '@react-native-async-storage/async-storage'

import { SetStorage, GetStorage, RemoveStorage } from '../../data/cache'

export class LocalStorageAdapter
  implements SetStorage, GetStorage, RemoveStorage
{
  set(key: string, value: string): void {
    if (value) {
      AsyncStorage.setItem(key, value)
    } else {
      localStorage.removeItem(key)
    }
  }

  get(key: string): string | null {
    return localStorage.getItem(key)
  }

  remove(key: string): void {
    localStorage.removeItem(key)
  }
}
