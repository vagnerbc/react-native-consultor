import { ProdutoArgs } from '../../../presentation/analytics/tags'
import { GTagDriver } from '../driver-gtag'

describe('GTag driver tests', () => {
  const mockDate = new Date()
  const spy = jest
    .spyOn(global, 'Date')
    .mockImplementation(() => mockDate as unknown as string)

  const gtagOptions = {
    customFields: 'produtoSku, produtoName, businessUnit',
    dataLayer: [],
    trackingID: '9999999999'
  }
  const gtagDriver = new GTagDriver(gtagOptions)

  jest.spyOn(gtagDriver, '_gtag').mockImplementation(jest.fn())

  const mockedLogEvent = jest.fn()
  gtagDriver.logEvent = mockedLogEvent

  beforeEach(() => (mockedLogEvent.mock.calls = []))

  it('should call gtag event', () => {
    const args: ProdutoArgs = {
      produtoSku: 'produtoSku1',
      produtoName: 'produtoName1',
      businessUnit: 'businessUnit1'
    }
    gtagDriver.logEvent('produto_edit', 'produto', 'test_label', args)

    expect(mockedLogEvent.mock.calls.length).toEqual(1)
    expect(mockedLogEvent.mock.calls[0].length).toEqual(4)
    expect(mockedLogEvent.mock.calls[0][0]).toEqual('produto_edit')
    expect(mockedLogEvent.mock.calls[0][2]).toEqual('test_label')
    expect(mockedLogEvent.mock.calls[0][3]).toEqual(args)
    expect(gtagDriver.logEvent).toBeCalledWith(
      'produto_edit',
      'produto',
      'test_label',
      args
    )
  })

  spy.mockRestore()
})
