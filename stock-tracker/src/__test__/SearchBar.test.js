import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import SearchBar from '../components/SearchBar';
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

const mockStore = configureMockStore();
const initialStore = mockStore(initialState);
const newStockStore = mockStore(newState)

const renderWithStore = (store) => {
    return render(
        <Provider store={store}>
            <SearchBar />
        </Provider>
    );
};

describe('search bar', () => {
    afterEach(cleanup);

    it('renders', () => {
        const { container } = renderWithStore(initialStore);
        expect(container).toBeInTheDocument();
    })

    it('initializes with the correct placeholder', () => {
        const { getByPlaceholderText } = renderWithStore(initialStore);
        getByPlaceholderText('Please enter a stock symbol');
    })

    it('displays the correct placeholder when we have some stock data', () => {
        const { getByPlaceholderText } = renderWithStore(newStockStore);
        getByPlaceholderText('Amazon.com, Inc. (AMZN)');
    })

    it('clears search if search for current stock submitted again', () => {
        const { getByPlaceholderText } = renderWithStore(newStockStore);
        const searchBar = getByPlaceholderText('Amazon.com, Inc. (AMZN)')
        fireEvent.change(searchBar, { target: { value: 'amzn' } })
        fireEvent.submit(searchBar)
        expect(searchBar.value).toBe('');
    })

})
