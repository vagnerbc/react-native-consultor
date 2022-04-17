import { IAnalyticsDriver } from '../../presentation/analytics/driver'

export class NoopAnalyticsDriver implements IAnalyticsDriver {
  logEvent(): void {
    // eslint-disable-next-line no-void
    return void 0
  }
}
