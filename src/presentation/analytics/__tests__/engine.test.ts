import { GTagDriver } from '../../../infra/analytics/driver-gtag'
import { AnalyticsEngine } from '../engine'

describe('Analytics engine tests', () => {
  const mockDate = new Date()
  const spy = jest
    .spyOn(global, 'Date')
    .mockImplementation(() => mockDate as unknown as string)

  const mockedLogDriver = new GTagDriver({
    customFields: 'produtoName, produtoSku',
    dataLayer: [],
    trackingID: '9999999999'
  })
  const mockedEngine = new AnalyticsEngine(mockedLogDriver, 'bu1', 'customer1')

  const mockedProdutoEdit = jest.fn()
  mockedEngine.produtoEdit = mockedProdutoEdit

  beforeEach(() => (mockedProdutoEdit.mock.calls = []))

  it('should call produtoEdit with correct params', () => {
    const produto = { nome: 'produto1', sku: '123456' }
    mockedEngine.produtoEdit(produto)

    expect(mockedProdutoEdit.mock.calls.length).toEqual(1)
    expect(mockedProdutoEdit.mock.calls[0].length).toEqual(1)
    expect(mockedProdutoEdit.mock.calls[0][0]).toEqual(produto)
    expect(mockedEngine.produtoEdit).toBeCalledWith(produto)
  })

  spy.mockRestore()
})
