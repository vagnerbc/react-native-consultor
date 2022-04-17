import { IAnalyticsDriver } from '../../presentation/analytics/driver'
import { EventKey, TagArgTypes } from '../../presentation/analytics/tags'

type TGtagOptions = {
  trackingID: string
  customFields: string
  dataLayer: unknown[]
}

export class GTagDriver implements IAnalyticsDriver {
  private trackingID: string
  private customFields: (readonly [string, number])[]
  private dataLayer: unknown[]

  constructor(options: TGtagOptions) {
    this.trackingID = options.trackingID
    this.customFields = options.customFields
      .split(',')
      .map(tagIndex => tagIndex.split('-') as [string, string])
      .map(([tag, index]) => [tag, Number.parseInt(index)] as const)
    this.dataLayer = options.dataLayer
    this.config(new Date())
  }

  public logEvent<T extends EventKey>(
    eventKey: T,
    eventCategory: string,
    eventLabel: string,
    args: TagArgTypes[T]
  ): void {
    const sanitizedArgs = this.sanitizeArgs(args, eventKey)
    this._gtag('event', eventKey, {
      event_category: eventCategory,
      event_label: eventLabel,
      ...sanitizedArgs
    })
  }

  private config(date: Date) {
    const customMap: Record<string, string> = {}

    for (const [field, index] of this.customFields) {
      customMap[`dimension${index}`] = field
    }

    this._gtag('js', date)
    this._gtag('config', this.trackingID, { custom_map: customMap })
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _gtag(...args: unknown[]) {
    // eslint-disable-next-line prefer-rest-params
    this.dataLayer.push(arguments)
  }

  private sanitizeArgs<T extends EventKey>(args: TagArgTypes[T], eventKey: T) {
    const sanitizedArgs: Record<string, unknown> = {
      value: 1
    }

    for (const field in args) {
      const element = args[field]
      if (element == null) {
        // eslint-disable-next-line no-console
        console.warn(
          `Custom field ${field} is needed for tag ${eventKey} but is not provided for current call`
        )
        sanitizedArgs[field] = '-'
      } else if (
        (Array.isArray(element) || typeof element === 'string') &&
        element.length === 0
      ) {
        sanitizedArgs[field] = '-'
      } else {
        sanitizedArgs[field] = element
      }
    }
    return sanitizedArgs
  }
}
