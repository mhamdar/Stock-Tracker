import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import sampleData from './mocks/sampleData'
import Overview from '../components/Overview';
import { render, screen } from '@testing-library/react'

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
    peer: []
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
    peer: sampleData.peers
}

store = mockStore(newState);


const component = (store) => {
    return render(
        <Provider store={store}>
            <Overview />
        </Provider>
    );
};






describe('Overview Component', () => {   
    it('should render empty for initial state',()=>{
        component(initialStore)
        const ininame = screen.getByTestId('company-name')
        const iniwebsite = screen.getByTestId('website')
        const inidescription = screen.getByTestId('description')
        expect(ininame.innerHTML).toBe("");
        expect(iniwebsite.innerHTML).toBe("");
        expect(inidescription.innerHTML).toBe("");
    })
    
    it('should render correct value for company name', () => {
        component(store)
        const name = screen.getByText('COMPANY OVERVIEW').closest('div').children[2]
      expect(name.innerHTML).toBe(newState.companyName+' ('+newState.symbol+')');
    });

    it('should render correct value for website', () => {
        component(store)
        const website = screen.getByText('COMPANY OVERVIEW').closest('div').children[3]
        expect(website.innerHTML).toBe(newState.overview.website);
    });

    it('should render correct value for description', () => {
        component(store)
        const description = screen.getByText('COMPANY OVERVIEW').closest('div').children[4]
        expect(description.innerHTML).toBe(newState.overview.description);
    });

   
  });