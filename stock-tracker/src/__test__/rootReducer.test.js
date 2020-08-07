import { rootReducer } from '../reducers/rootReducer.js'
import stock from './mocks/newStockMock'

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
    possible:[]
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
    possible:[]
}

describe('root reducer', () => {
    it('should return the initial state', () => {
        expect(rootReducer(undefined, "UNDEFINED_ACTION"))
        .toMatchObject(initialState);
    });

    it('should handle STOCK_RECEIVED', () => {
        expect(rootReducer(initialState, { type: 'STOCK_RECEIVED', payload: stock }))
        .toMatchObject(newState);
    });

    /*
    it('should handle PRICE_RECEIVED', () => {
        expect(rootReducer(initialState, { type: 'PRICE_RECEIVED', payload: stock }))
        .toMatchObject({
            ...initialState, 
            price: stock.latestPrice,
            priceChange: stock.change,
            priceChangePercent: stock.changePercent,
            chart: stock.chart
        });
    });
    */

    it('should handle NEWS_RECEIVED', () => {
        expect(rootReducer(initialState, { type: 'NEWS_RECEIVED', payload: stock.news }))
        .toMatchObject({
            ...initialState,
            news: stock.news
        });
    });

    it('should handle POSSIBLE_RECEIVED', () => {
        expect(rootReducer(initialState, { type: 'POSSIBLE_RECEIVED', payload: samplePossible }))
        .toMatchObject({
            ...initialState,
            possible: samplePossible
        });
    });
});