import '@testing-library/jest-dom';
import "@testing-library/jest-dom/extend-expect";
import { cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Chart from '../components/Chart';
import { getPriceTicks, getTimeTicks } from '../util.js';
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

const oneDayTimeTicks = getTimeTicks(newState.chart, '1D')
const fiveDayTimeTicks = getTimeTicks(newState.coldChart.fiveday, '5D')
const oneMonthTimeTicks = getTimeTicks(newState.coldChart.onemonth, '1M')
const oneYearTimeTicks = getTimeTicks(newState.coldChart.oneyear, '1Y')
const fiveYearTimeTicks = getTimeTicks(newState.coldChart.fiveyear, '5Y')
const maxTimeTicks = getTimeTicks(newState.coldChart.max, 'MAX')



const oneDayPriceTicks = getPriceTicks(newState.chart, 10)
const fiveDayPriceTicks = getPriceTicks(newState.coldChart.fiveday, 10)
const oneMonthPriceTicks = getPriceTicks(newState.coldChart.onemonth, 10)
const oneYearPriceTicks = getPriceTicks(newState.coldChart.oneyear, 10)
const fiveYearPriceTicks = getPriceTicks(newState.coldChart.fiveyear, 10)
const maxPriceTicks = getPriceTicks(newState.coldChart.max, 10)

const mockStore = configureMockStore();
const initialStore = mockStore(initialState);
const newStockStore = mockStore(newState)

const renderWithStore = (store) => {
    return render(
        <Provider store={store}>
            <Chart />
        </Provider>
    );
};


// The purpose of this test is NOT to test whether the x-axis ticks are "correct". We test for that in util.test.js when we test functions like getTimeTicks directly
// The purpose here is: assuming the computed ticks are correct, are they 1) being displayed, and 2) being updated when the user picks a different range
describe('x-axis ticks', () => {
    afterEach(cleanup);

    it('displays the correct x-axis ticks on 1D', () => {
        const { getAllByText, getByText, debug } = renderWithStore(newStockStore)

        fireEvent.click(getByText('1D'))
        const lastTime = stock.chart[stock.chart.length-1].label
        for (let i = 0; i < oneDayTimeTicks.length; i++) {
            const tick = oneDayTimeTicks[i]
            if(parseInt(lastTime.substring(3,5),10)<parseInt(tick.substring(3,5),10))
                break;
            getAllByText(tick)
        }
    })

    it('displays the correct x-axis ticks on 5D', () => {
        const { getAllByText, getByText, debug } = renderWithStore(newStockStore)

        fireEvent.click(getByText('5D'))

        for (let i = 0; i < fiveDayTimeTicks.length; i++) {
            const tick = fiveDayTimeTicks[i]
            getAllByText(tick)
        }
    })

    it('displays the correct x-axis ticks on 1M', () => {
        const { getAllByText, getByText, debug } = renderWithStore(newStockStore)

        fireEvent.click(getByText('1M'))

        for (let i = 0; i < oneMonthTimeTicks.length; i++) {
            const tick = oneMonthTimeTicks[i]
            getAllByText(tick)
        }
    })

    it('displays the correct x-axis ticks on 1Y', () => {
        const { getAllByText, getByText, debug } = renderWithStore(newStockStore)

        fireEvent.click(getByText('1Y'))

        for (let i = 0; i < oneYearTimeTicks.length; i++) {
            const tick = oneYearTimeTicks[i]
            getAllByText(tick)
        }
    })

    it('displays the correct x-axis ticks on 5Y', () => {
        const { getAllByText, getByText, debug } = renderWithStore(newStockStore)

        fireEvent.click(getByText('5Y'))

        for (let i = 0; i < fiveYearTimeTicks.length; i++) {
            const tick = fiveYearTimeTicks[i]
            getAllByText(tick)
        }
    })

    it('displays the correct x-axis ticks on MAX', () => {
        const { getAllByText, getByText, debug } = renderWithStore(newStockStore)

        fireEvent.click(getByText('MAX'))

        for (let i = 0; i < maxTimeTicks.length; i++) {
            const tick = maxTimeTicks[i]
            getAllByText(tick)
        }
    })


})

describe('y-axis ticks', () => {
    afterEach(cleanup);

    it('displays the correct y-axis ticks on 1D', () => {
        const { getAllByText, getByText, debug } = renderWithStore(newStockStore)

        fireEvent.click(getByText('1D'))

        for (let i = 0; i < oneDayPriceTicks.length; i++) {
            const tick = oneDayPriceTicks[i]
            getAllByText(tick)
        }
    })

    it('displays the correct x-axis ticks on 5D', () => {
        const { getAllByText, getByText, debug } = renderWithStore(newStockStore)

        fireEvent.click(getByText('5D'))

        for (let i = 0; i < fiveDayPriceTicks.length; i++) {
            const tick = fiveDayPriceTicks[i]
            getAllByText(tick)
        }
    })

    it('displays the correct x-axis ticks on 1M', () => {
        const { getAllByText, getByText, debug } = renderWithStore(newStockStore)

        fireEvent.click(getByText('1M'))

        for (let i = 0; i < oneMonthPriceTicks.length; i++) {
            const tick = oneMonthPriceTicks[i]
            getAllByText(tick)
        }
    })

    it('displays the correct x-axis ticks on 1Y', () => {
        const { getAllByText, getByText, debug } = renderWithStore(newStockStore)

        fireEvent.click(getByText('1Y'))

        for (let i = 0; i < oneYearPriceTicks.length; i++) {
            const tick = oneYearPriceTicks[i]
            getAllByText(tick)
        }
    })

    it('displays the correct x-axis ticks on 5Y', () => {
        const { getAllByText, getByText, debug } = renderWithStore(newStockStore)

        fireEvent.click(getByText('5Y'))

        for (let i = 0; i < fiveYearPriceTicks.length; i++) {
            const tick = fiveYearPriceTicks[i]
            getAllByText(tick)
        }
    })

    it('displays the correct x-axis ticks on MAX', () => {
        const { getAllByText, getByText, debug } = renderWithStore(newStockStore)

        fireEvent.click(getByText('MAX'))

        for (let i = 0; i < maxPriceTicks.length; i++) {
            const tick = maxPriceTicks[i]
            getAllByText(tick)
        }
    })

})


describe('chart buttons', () => {
    afterEach(cleanup);

    it('has all the range buttons', () => {
        const { getByText } = renderWithStore(initialStore)
        getByText('1D')
        getByText('5D')
        getByText('1M')
        getByText('1Y')
        getByText('5Y')
        getByText('MAX')
        expect(getByText('1D')).toHaveStyle('color: white')
        expect(getByText('5D')).toHaveStyle('color: #beccdc')
        expect(getByText('1M')).toHaveStyle('color: #beccdc')
        expect(getByText('1Y')).toHaveStyle('color: #beccdc')
        expect(getByText('5Y')).toHaveStyle('color: #beccdc')
        expect(getByText('MAX')).toHaveStyle('color: #beccdc')
    })

    it('disables the buttons when there is no data (i.e. at startup)', () => {
        const { getByText } = renderWithStore(initialStore)
        expect(getByText('5D')).toBeDisabled();
        expect(getByText('1M')).toBeDisabled();
        expect(getByText('1Y')).toBeDisabled();
        expect(getByText('5Y')).toBeDisabled();
        expect(getByText('MAX')).toBeDisabled();
    })

    it('enables all the buttons when there is data', () => {
        const { getByText } = renderWithStore(newStockStore)
        expect(getByText('1D')).not.toBeDisabled();
        expect(getByText('5D')).not.toBeDisabled();
        expect(getByText('1M')).not.toBeDisabled();
        expect(getByText('1Y')).not.toBeDisabled();
        expect(getByText('5Y')).not.toBeDisabled();
        expect(getByText('MAX')).not.toBeDisabled();
    })

    it('changes the button styling appropriately as the user clicks around', () => {
        const { getByText } = renderWithStore(newStockStore)

        expect(getByText('1D')).toHaveStyle('color: white')
        fireEvent.click(getByText('5D'))
        expect(getByText('1D')).toHaveStyle('color: #beccdc')

        fireEvent.click(getByText('1M'))
        expect(getByText('1M')).toHaveStyle('color: white')
        expect(getByText('1D')).toHaveStyle('color: #beccdc')
        expect(getByText('MAX')).toHaveStyle('color: #beccdc')

        // Clicking twice shouldn't switch styles and then back again..
        fireEvent.click(getByText('5Y'))
        fireEvent.click(getByText('5Y'))
        expect(getByText('5Y')).toHaveStyle('color: white')

        // Alternating..
        fireEvent.click(getByText('5D'))
        fireEvent.click(getByText('1D'))
        fireEvent.click(getByText('5D'))
        expect(getByText('5D')).toHaveStyle('color: white')
        expect(getByText('1D')).toHaveStyle('color: #beccdc')
    })


})