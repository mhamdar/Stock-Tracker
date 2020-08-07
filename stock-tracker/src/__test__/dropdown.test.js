import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import sampleData from './mocks/sampleData'
import { render, screen} from '@testing-library/react'
import DropDown from '../components/Dropdown';

const mockStore = configureStore([]);

let store;

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
    previousClose: sampleData.previousClose,
    iexVolume: sampleData.iexVolume,
    marketCap: sampleData.marketCap,
    peRatio: sampleData.peRatio,
    week52Low: sampleData.week52Low,
    week52High: sampleData.week52High,
    avgTotalVolume: sampleData.avgTotalVolume,
    dividendYield: sampleData.stats.dividendYield,
    ttmEPS: sampleData.stats.ttmEPS,
    low: sampleData.low,
    high: sampleData.high,
    open: sampleData.open
}

const initialStore = mockStore(initialState)
const samplePossible = [
    {"symbol":"AAPL","securityName":"lc.npepI A","securityType":"cs","region":"US","exchange":"NAS"},
    {"symbol":"AAPL-MM","securityName":".I pclAepn","securityType":"cs","region":"MX","exchange":"XME"}
]

const newState = {
    symbol: sampleData.symbol,
    companyName: sampleData.companyName,
    overview: sampleData.overview,
    price: sampleData.latestPrice,
    priceChange: sampleData.change,
    priceChangePercent: sampleData.changePercent,
    chart: sampleData.chart,
    coldChart: sampleData.coldcharts,
    news: sampleData.news,
    keyStats: keyStats,
    peer: sampleData.peers,
    possible: samplePossible
}

store = mockStore(newState);


const component = (store) => {
    return render(
        <Provider store={store}>
            <DropDown />
        </Provider>
    );
};



describe('Dropdown Component', () => {
    
    /*
    it('should render empty for initial state',()=>{
        const container = component(initialStore)
        expect(container.baseElement.firstChild.firstChild).toHaveClass('no-options')
    })
    */
   
    it('should render first possible option', () => {
        component(store)
        const name = screen.getByText('AAPL').closest('li').children[1].children[0]
        const exchange = screen.getByText('AAPL').closest('li').children[1].children[1]
        expect(name.innerHTML).toBe(samplePossible[0].securityName);
        expect(exchange.innerHTML).toBe(samplePossible[0].exchange);
    });

    it('should render second possible option', () => {
        component(store)
        const name = screen.getByText('AAPL-MM').closest('li').children[1].children[0]
        const exchange = screen.getByText('AAPL-MM').closest('li').children[1].children[1]
        expect(name.innerHTML).toBe(samplePossible[1].securityName);
        expect(exchange.innerHTML).toBe(samplePossible[1].exchange);
    });
   
  });