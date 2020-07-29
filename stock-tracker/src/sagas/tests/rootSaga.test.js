import { searchSubmittedHandler, getNewStockData, pollPrice, rootSaga } from '../rootSaga'
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import stock from './mocks/newStockMock';

const initialState = {
    symbol: "",
    companyName: "",
    overview: "",
    price: 0,
    priceChange: 0,
    priceChangePercent: 0,
    chart: [],
    coldChart: {},
    news: [],
    keyStats: {},
    peer: []
}

const keyStats = {
    previousClose: stock.previousClose,
    iexVolume: stock.iexVolume,
    marketCap: stock.marketCap,
    peRatio: stock.peRatio,
    week52Low: stock.week52Low,
    week52High: stock.week52High,
    avgTotalVolume: stock.avgTotalVolume,
    dividendYield: stock.stats.dividendYield,
    ttmEPS: stock.stats.ttmEPS,
    low: stock.low,
    high: stock.high,
    open: stock.open
}

const newState = {
    symbol: stock.symbol,
    companyName: stock.companyName,
    overview: stock.overview,
    price: stock.latestPrice,
    priceChange: stock.change,
    priceChangePercent: stock.changePercent,
    chart: stock.chart,
    coldChart: stock.coldcharts,
    news: stock.news,
    keyStats: keyStats,
    peer: stock.peers
}

describe('search submitted handler', () => {
    it('gets new stock data and dispatches it to the reducer', () => {
        return expectSaga(searchSubmittedHandler, { type: 'SEARCH_SUBMITTED', payload: "ARBITRARY_SYMBOL" }) // symbol is arbitrary because fetch is being mocked anyway
            .withState(initialState)
            .provide([
                [matchers.call.fn(getNewStockData), stock],
                [matchers.call.fn(pollPrice), undefined]
            ])
            .put({
                type: 'STOCK_RECEIVED',
                payload: stock
            })
            .run();
    })

    it('does not dispatch data if the fetch returns undefined', () => {
        return expectSaga(searchSubmittedHandler, { type: 'SEARCH_SUBMITTED', payload: "ARBITRARY_SYMBOL" }) // symbol is arbitrary because fetch is being mocked anyway
            .withState(initialState)
            .provide([
                [matchers.call.fn(getNewStockData), undefined]
            ])
            .not.put({
                type: 'STOCK_RECEIVED',
                payload: stock
            })
            .run();
    })
})

describe('root saga', () => {
    it('takes the latest SEARCH_SUBMITTED and calls searchSubmittedHandler', () => {
        testSaga(rootSaga)
        .next()
        .takeLatest('SEARCH_SUBMITTED', searchSubmittedHandler)
        .next()
        .isDone()
    })
})