import { EventCategory, TagArgTypes, EventKey } from './tags'

export interface IAnalyticsDriver {
  logEvent(
    eventKey: EventKey,
    category: EventCategory,
    label: string,
    args: TagArgTypes[EventKey]
  ): void
}
