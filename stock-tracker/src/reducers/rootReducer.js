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
    possible:[],
    isLoading: false
}

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'STOCK_RECEIVED':
            const stock = action.payload
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
            return {
                ...state,
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
                isLoading: false
            }
        case 'SEARCH_SUBMITTED':
            return {
                ...state,
                isLoading: true,
                possible: []
            }
            
        case 'NEWS_RECEIVED':
            return {
                ...state,
                news: action.payload
            }
        case 'PRICE_RECEIVED':
            return {
                ...state,
                price: action.payload.price,
                priceChange: action.payload.priceChange,
                priceChangePercent: action.payload.priceChangePercent,
                chart: action.payload.chart
            }

        case 'POSSIBLE_RECEIVED':
            return {
                ...state,
                possible: action.payload
            }
        case 'STOCK_NOT_FOUND':
            return {
                ...state,
                isLoading: false
            }
        default:
            return state;
    }
}