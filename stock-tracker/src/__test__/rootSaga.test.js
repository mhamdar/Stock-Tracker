import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { getNewStockData, getPossibleData, pollPrice, rootSaga, searchEnteredHandler, searchSubmittedHandler } from '../sagas/rootSaga';
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
    peer: [],
    possible: []
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

const samplePossible = [
    {"symbol":"AAPL","securityName":"lc.npepI A","securityType":"cs","region":"US","exchange":"NAS"},
    {"symbol":"AAPL-MM","securityName":".I pclAepn","securityType":"cs","region":"MX","exchange":"XME"}
]

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
    peer: stock.peers,
    possible : samplePossible
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

describe('search entered handler', () => {
    it('gets possible symbols and dispatches it to the reducer', () => {
        return expectSaga(searchEnteredHandler, { type: 'SEARCH_ENTERED', payload: "ARBITRARY_SYMBOL" }) 
            .provide([
                [matchers.call.fn(getPossibleData), samplePossible],
            ])
            .put({
                type: 'POSSIBLE_RECEIVED',
                payload: samplePossible
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
        .takeLatest('SEARCH_ENTERED', searchEnteredHandler)
        .next()
        .isDone()
    })
})