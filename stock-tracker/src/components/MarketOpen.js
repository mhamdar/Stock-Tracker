import React from "react";
import { Sun } from '@styled-icons/boxicons-regular/Sun'
import { RealTimePriceDate, MarketStatus } from '../styled-components/text.js'
import { Row, Col } from '../styled-components/wrappers.js'
const MarketOpen = () => {
    return (
        <div>
            <Row columnGap='15px' >
                <Col hideWidth='950px'>
                    <RealTimePriceDate>Real-Time Price as of August 7, 2020, 9:30AM EST</RealTimePriceDate>
                </Col>
                <Col >
                    <MarketStatus> <Sun color='#ffbb5e' height='14px'/> Market Open </MarketStatus>
                </Col>
            </Row>
        </div>
    )
}

export default MarketOpen;