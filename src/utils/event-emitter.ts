/* eslint-disable @typescript-eslint/no-explicit-any */

const EventEmitter = {
  events: {} as any,
  dispatch<T>(event: string, data: T) {
    if (!this.events[event]) return
    this.events[event].forEach((callback: (arg0: T) => any) => callback(data))
  },
  subscribe<T>(event: string, callback: (data: T) => any) {
    if (!this.events[event]) this.events[event] = []
    this.events[event].push(callback)
  },
  unsubscribe(event: string) {
    if (!this.events[event]) return
    delete this.events[event]
  }
}

export default EventEmitter
