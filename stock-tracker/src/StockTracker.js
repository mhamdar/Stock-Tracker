import React from 'react';
import LoadingOverlay from 'react-loading-overlay';
import { useSelector } from 'react-redux';
import './App.css';
import logo from './assets/images/adaptive.png';
import Chart from './components/Chart.js';
import DropDown from './components/Dropdown';
import HeaderTabs from './components/HeaderTabs';
import Keystats from './components/KeyStats.js';
import MarketOpen from './components/MarketOpen';
import News from './components/News';
import Overview from './components/Overview';
import Peers from './components/Peers';
import Price from './components/Price.js';
import SearchBar from './components/SearchBar.js';
import StockTags from './components/StockTags';
import { SearchIcon } from './styled-components/icons.js';
import { FooterSectionTitle, FooterStockSymbol } from './styled-components/text';
import { Col, Grid, Row } from './styled-components/wrappers.js';
import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  @import url('http://fonts.googleapis.com/css?family=Lato:300,400,700,900');
  p {
    font-family: 'Lato', sans-serif;
  }
`

function StockTracker() {
    const isLoading = useSelector(state => state.isLoading)
    return (
        <LoadingOverlay
            active={isLoading}
            spinner
            text='Getting stock information...'
        >
            <GlobalStyles />
            <Grid>

                <Row justifyContent='space-between' marginBottom='3%'>
                    <Col>
                        <img src={logo} alt='logo' height='40px' />
                    </Col>
                    <Col hideWidth='950px'>
                        <HeaderTabs />
                    </Col>
                </Row>

                <Row justifyContent='space-between' columnGap='5px'>
                    <Col>
                        <SearchIcon iconSize={40} breakpoint='1200px' smallBreakpoint='950px' />
                    </Col>
                    <Col size={1}>
                        <SearchBar />
                    </Col>
                    <Col size={1} hideWidth='650px'>
                        <Price fontSize='40' breakpoint='1200px' smallBreakpoint='950px' />
                    </Col>
                </Row>

                <DropDown xlgbreakpoint='1530px' lgbreakpoint='1200px' breakpoint='950px' smallBreakpoint='600px' />

                <Row justifyContent='start' minWidth='651px' marginBottom='3%'>
                    <Price fontSize='20' justifyContent='space-between' />
                </Row>





                <Row justifyContent='space-between' hideWidth='650px' marginBottom='1%'>
                    <Col >
                        <StockTags />
                    </Col>
                    <Col >
                        <MarketOpen />
                    </Col>
                </Row>

                <Row maxWidth='1530px'>
                    <Col size={2}>
                        <Chart />
                    </Col>
                    <Col size={1}>
                        <News />
                    </Col>
                </Row>

                <Row marginBottom='2%' maxWidth='1530px'>
                    <Col size={2} Padding='0 0 0 0'>
                        <Keystats />
                    </Col>
                    <Col size={1}>
                        <Overview />
                        <Peers breakpoint='450px' />
                    </Col>
                </Row>



            </Grid>

            <Row BackgroundImage='linear-gradient(to bottom, #00265d, #00204f);' Padding='0 3% 0 3%' >
                <Col size={1} BorderRight='solid 1px rgba(255, 255, 255, 0.1)' Padding='10px 0px 10px 30px' hideWidth='1900px'>

                    <Row marginBottom='1%'>
                        <FooterSectionTitle> MARKETS </FooterSectionTitle>
                    </Row>

                    <Row>
                        <Col>
                            <Row columnGap='15px'>
                                <FooterStockSymbol>NYSE</FooterStockSymbol> <Price fontSize='15' />
                            </Row>
                        </Col>
                        <Col>
                            <Row columnGap='15px'>
                                <FooterStockSymbol>NASDAQ</FooterStockSymbol> <Price fontSize='15' />
                            </Row>
                        </Col>
                        <Col>
                            <Row columnGap='15px'>
                                <FooterStockSymbol>DJIA</FooterStockSymbol> <Price fontSize='15' />
                            </Row>
                        </Col>
                    </Row>
                </Col>

                <Col size={1} Padding='10px 0 10px 0' hideWidth='1400px'>

                    <Row marginBottom='1%'>
                        <FooterSectionTitle> FAVORITES </FooterSectionTitle>
                    </Row>

                    <Row >
                        <Col>
                            <Row columnGap='15px'>
                                <FooterStockSymbol>AMZN</FooterStockSymbol> <Price fontSize='15' />
                            </Row>
                        </Col>
                        <Col>
                            <Row columnGap='15px'>
                                <FooterStockSymbol>MSFT</FooterStockSymbol> <Price fontSize='15' />
                            </Row>
                        </Col>
                        <Col>
                            <Row columnGap='15px'>
                                <FooterStockSymbol>MSFT</FooterStockSymbol> <Price fontSize='15' />
                            </Row>
                        </Col>
                    </Row>

                </Col>
            </Row>
        </ LoadingOverlay>
    )
}

export default StockTracker