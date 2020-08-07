
import {getTimeTicks, getPriceTicks, unixToTimePassed, findLowValue, findHighValue} from '../util'
import sampleChart from './mocks/testChart'

test('unixToTimePassed', () => {
  expect(unixToTimePassed(Date.now()-1000)).toBe("Just now")
  expect(unixToTimePassed(Date.now()-6000)).toBe("Moments ago")
  expect(unixToTimePassed(Date.now()-91000)).toBe("1 minute ago")
  expect(unixToTimePassed(Date.now()-121000)).toBe("2 minutes ago")
  expect(unixToTimePassed(Date.now()-3601000)).toBe("1 hour ago")
  expect(unixToTimePassed(Date.now()-7201000)).toBe("2 hours ago")
  expect(unixToTimePassed(Date.now()-86401000)).toBe("1 day ago")
  expect(unixToTimePassed(Date.now()-172801000)).toBe("2 days ago")
})

const testChart1 = [
  {
    "date": "2020-07-23",
    "minute": "09:34",
    "label": "09:34 AM",
    "high": 38.7,
    "low": 38.42,
    "open": 38.46,
    "close": 38.73,
    "average": 38.779,
    "volume": 1346,
    "notional": 50489.6,
    "numberOfTrades": 11
},
{
    "date": "2020-07-23",
    "minute": "09:35",
    "label": "09:35 AM",
    "high": 40.36,
    "low": 38.73,
    "open": 39.96,
    "close": 39.3,
    "average": 40.429,
    "volume": 3860,
    "notional": 144841.15,
    "numberOfTrades": 32
},
{
    "date": "2020-07-23",
    "minute": "09:36",
    "label": "09:36 AM",
    "high": 39,
    "low": 39.02,
    "open": 40.288,
    "close": 39.55,
    "average": 38.901,
    "volume": 5491,
    "notional": 207520.1,
    "numberOfTrades": 45
},
{
    "date": "2020-07-23",
    "minute": "09:37",
    "label": "09:37 AM",
    "high": 39.56,
    "low": 38.39,
    "open": 38.396,
    "close": 39.262,
    "average": 38.272,
    "volume": 7683,
    "notional": 293817.19,
    "numberOfTrades": 64
}
]

const testChart2 = [
  {
    "date": "2020-07-23",
    "minute": "09:34",
    "label": "09:34 AM",
    "high": 38.7,
    "low": 38.42,
    "open": 38.46,
    "close": 38.73,
    "average": 40.779,
    "volume": 1346,
    "notional": 50489.6,
    "numberOfTrades": 11
},
{
    "date": "2020-07-23",
    "minute": "09:35",
    "label": "09:35 AM",
    "high": 40.36,
    "low": 38.73,
    "open": 39.96,
    "close": 39.3,
    "average": 20.429,
    "volume": 3860,
    "notional": 144841.15,
    "numberOfTrades": 32
},
{
    "date": "2020-07-23",
    "minute": "09:36",
    "label": "09:36 AM",
    "high": 39,
    "low": 39.02,
    "open": 40.288,
    "close": 39.55,
    "average": 60.901,
    "volume": 5491,
    "notional": 207520.1,
    "numberOfTrades": 45
},
{
    "date": "2020-07-23",
    "minute": "09:37",
    "label": "09:37 AM",
    "high": 39.56,
    "low": 38.39,
    "open": 38.396,
    "close": 39.262,
    "average": 38.272,
    "volume": 7683,
    "notional": 293817.19,
    "numberOfTrades": 64
},
{
  "date": "2020-07-23",
  "minute": "09:36",
  "label": "09:36 AM",
  "high": 39,
  "low": 39.02,
  "open": 40.288,
  "close": 39.55,
  "average": 33.901,
  "volume": 5491,
  "notional": 207520.1,
  "numberOfTrades": 45
}
]

const testChart3 = [
  {
    "date": "2020-07-23",
    "minute": "09:34",
    "label": "09:34 AM",
    "high": 38.7,
    "low": 38.42,
    "open": 38.46,
    "close": 38.73,
    "average": 20.779,
    "volume": 1346,
    "notional": 50489.6,
    "numberOfTrades": 11
},
{
    "date": "2020-07-23",
    "minute": "09:35",
    "label": "09:35 AM",
    "high": 40.36,
    "low": 38.73,
    "open": 39.96,
    "close": 39.3,
    "average": 70.429,
    "volume": 3860,
    "notional": 144841.15,
    "numberOfTrades": 32
},
{
    "date": "2020-07-23",
    "minute": "09:36",
    "label": "09:36 AM",
    "high": 39,
    "low": 39.02,
    "open": 40.288,
    "close": 39.55,
    "average": 23.901,
    "volume": 5491,
    "notional": 207520.1,
    "numberOfTrades": 45
},
{
  "date": "2020-07-23",
  "minute": "09:36",
  "label": "09:36 AM",
  "high": 39,
  "low": 39.02,
  "open": 40.288,
  "close": 39.55,
  "average": 24.901,
  "volume": 5491,
  "notional": 207520.1,
  "numberOfTrades": 45
},
{
    "date": "2020-07-23",
    "minute": "09:37",
    "label": "09:37 AM",
    "high": 39.56,
    "low": 38.39,
    "open": 38.396,
    "close": 39.262,
    "average": 22.272,
    "volume": 7683,
    "notional": 293817.19,
    "numberOfTrades": 64
}
]

test('findHighValue', () => {
  expect(findHighValue(testChart1)).toBe(40.429)
  expect(findHighValue(testChart2)).toBe(60.901)
  expect(findHighValue(testChart3)).toBe(70.429)
})

test('findLowValue', () => {
  expect(findLowValue(testChart1)).toBe(38.272)
  expect(findLowValue(testChart2)).toBe(20.429)
  expect(findLowValue(testChart3)).toBe(20.779)
})

const res1 = ["09:30 AM", "09:35 AM",  "09:40 AM", "09:45 AM", "09:50 AM", "09:55 AM","10 AM"]
const res2 = ["09:30 AM",  "10:30 AM",  "11:30 AM", "12:30 PM", "1:30 PM", "2:30 PM",  "3:30 PM",  "4:30 PM",  "5:30 PM"]
const res3 = ["Jul 16", "Jul 17" , "Jul 20" , "Jul 21" , "Jul 22"]
const res4 = ["Jun 23", "Jul 1" , "Jul 10" , "Jul 20" ]
const res5 = [ "Jul 23, 19", "Jan 21, 20", "Jul 20, 20"]
const res6 = ["Jul 23, 15", "Jan 8, 18", "Apr 29, 20"]
const res7 = ["Jul 24, 15", "Jan 22, 18" , "Jul 22, 20"]
test('getTimeTicks', () => {
  //expect(getTimeTicks(testChart1, '1D')).toStrictEqual(res1)
  expect(getTimeTicks(sampleChart.oneday, '1D')).toStrictEqual(res2)
  expect(getTimeTicks(sampleChart.fiveday, '5D')).toStrictEqual(res3)
  expect(getTimeTicks(sampleChart.onemonth, '1M')).toStrictEqual(res4)
  expect(getTimeTicks(sampleChart.oneyear, '1Y')).toStrictEqual(res5)
  expect(getTimeTicks(sampleChart.fiveyear, '5Y')).toStrictEqual(res6)
  expect(getTimeTicks(sampleChart.max, 'MAX')).toStrictEqual(res7)
})

const price1 = [ "38.00","38.45","38.90","39.35","39.80","40.25","40.70","41.15","41.60","42.05"]
const price2 = ["36.00","36.35","36.70","37.05","37.40","37.75","38.10","38.45","38.80","39.15"]
const price3 = ["28.00","30.00","32.00","34.00","36.00","38.00","40.00","42.00","44.00","46.00"]
const price4 = ["22.00","26.00","30.00","34.00","38.00","42.00","46.00","50.00","54.00","58.00"]
const price5 = [ "14.00","18.00","22.00","26.00","30.00","34.00","38.00","42.00","46.00","50.00"]
const price6 = [ "14.00","18.00","22.00","26.00","30.00","34.00","38.00","42.00","46.00","50.00"]

test('getPriceTicks', () => {
  
  expect(getPriceTicks(sampleChart.oneday, 10)).toStrictEqual(price1)
  expect(getPriceTicks(sampleChart.fiveday, 10)).toStrictEqual(price2)
  expect(getPriceTicks(sampleChart.onemonth,10)).toStrictEqual(price3)
  expect(getPriceTicks(sampleChart.oneyear, 10)).toStrictEqual(price4)
  expect(getPriceTicks(sampleChart.fiveyear, 10)).toStrictEqual(price5)
  expect(getPriceTicks(sampleChart.max, 10)).toStrictEqual(price6)
})