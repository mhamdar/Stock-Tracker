import { select, put, call, takeLatest, cancelled, delay, all } from 'redux-saga/effects'
import { NEW_STOCK_ENDPOINT_URL, NEWS_ENDPOINT_URL, PRICE_ENDPOINT_URL, POSSIBLE_SYMBOL_URL } from '../config/config.js'

export const getNewStockData = (url, controller) => fetch(url, { signal: controller.signal })
    .then(response => {
        if(response.status===404){
            console.debug('Stock symbol does not exist!')
        }
        if (!response.ok) {
            throw Error(response.statusText)
        }
        return response.json()
    })
    .catch(error => console.error(error.name, error.message))

export const getPossibleData = (url) => fetch(url)
.then(response => {
    if(response.status===404){
        console.debug('Stock symbol does not exist!')
    }
    if (!response.ok) {
        throw Error(response.statusText)
    }
    return response.json()
})
.catch(error => console.error(error.name, error.message))

export function* pollPrice(symbol) {
    const controller = new AbortController();
    const requestParameters = `{"symbol":"${symbol}", "range":"1d"}`;
    try {
        while (true) {
            yield delay(3000)
            const news = yield call(getNewStockData, PRICE_ENDPOINT_URL + requestParameters, controller)
            yield put({ type: 'PRICE_RECEIVED', payload: news })
        }
    }
    finally {
        if (yield cancelled()) {
            controller.abort();
        }
    }
}

export function* pollNews(symbol) {
    const controller = new AbortController();
    const requestParameters = `{"symbol":"${symbol}", "range":"1d"}`;
    try {
        while (true) {
            yield delay(3000)
            const news = yield call(getNewStockData, NEWS_ENDPOINT_URL + requestParameters, controller)
            yield put({ type: 'NEWS_RECEIVED', payload: news })
        }
    }
    finally {
        if (yield cancelled()) {
            controller.abort();
        }
    }
}

export function* searchSubmittedHandler(action) {
    // Previous and new stock symbols
    const currentSymbol = yield select(state => state.symbol)
    const symbol = action.payload;
    // If search for the same stock as current one, do nothing
    if (currentSymbol === symbol) {
        return;
    }
    // Fetch the new stock data
    const requestParameters = `{"symbol":"${symbol}", "range":"1d"}`;
    const controller = new AbortController();
    const stockData = yield call(getNewStockData, NEW_STOCK_ENDPOINT_URL + requestParameters, controller);
    if (stockData === undefined) {
        yield put({ type: 'STOCK_NOT_FOUND'})
        return;
    }

    yield put({ type: 'STOCK_RECEIVED', payload: stockData }) // this orchestrates the ongoing polls

    yield all([
        call(pollPrice, symbol),
        call(pollNews, symbol),
    ])  
}

export function* searchEnteredHandler(action) {
    const symbol = action.payload
    if(symbol === ""){
        yield put({ type: 'POSSIBLE_RECEIVED', payload: [] })
        return 
    }
    const possibleSymbol = yield call(getPossibleData, POSSIBLE_SYMBOL_URL + symbol);
    if (possibleSymbol === undefined) {
        return;
    }

    yield put({ type: 'POSSIBLE_RECEIVED', payload: possibleSymbol })
}

export function* rootSaga() {
    yield takeLatest('SEARCH_SUBMITTED', searchSubmittedHandler);
    yield takeLatest('SEARCH_ENTERED', searchEnteredHandler);
}