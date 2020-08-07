import React from "react";
import { useSelector } from 'react-redux';
import { DollarIcon, DownArrowIcon, PercentIcon, UpArrowIcon } from '../styled-components/icons';
import { PriceChange, StyledPrice } from '../styled-components/price.js';
import { Col, Row } from '../styled-components/wrappers.js';

const Price = (props) => {
    const price = useSelector(state => state.price);
    const priceChange = useSelector(state => state.priceChange)
    const priceChangeDisplay = Math.abs(priceChange).toFixed(2)
    const priceChangePercent = useSelector(state => state.priceChangePercent)
    const priceChangePercentDisplay = Math.abs(priceChangePercent).toFixed(2)
    let arrowIcon;

    if (priceChange < 0) {
        arrowIcon = <DownArrowIcon iconSize={props.fontSize} breakpoint={props.breakpoint} smallBreakpoint={props.smallBreakpoint} />
    }
    else {
        arrowIcon = <UpArrowIcon iconSize={props.fontSize} breakpoint={props.breakpoint} smallBreakpoint={props.smallBreakpoint} />
    }

    return (
        <Row justifyContent={props.justifyContent ? props.justifyContent : 'flex-end'} columnGap='10px'>

            <Row columnGap='0px'>
                <Col>
                    <StyledPrice breakpoint={props.breakpoint} smallBreakpoint={props.smallBreakpoint} fontSize={props.fontSize + 'px'}> <DollarIcon iconSize={props.fontSize} breakpoint={props.breakpoint} smallBreakpoint={props.smallBreakpoint} />  </StyledPrice>
                </Col>
                <Col>
                    <StyledPrice breakpoint={props.breakpoint} smallBreakpoint={props.smallBreakpoint} fontSize={props.fontSize + 'px'}>  {price.toFixed(2)}  </StyledPrice>
                </Col>
            </Row>

            <Row columnGap='0px'>
                <Col Padding='0 0 0 0'>
                    <PriceChange change={priceChange} breakpoint={props.breakpoint} smallBreakpoint={props.smallBreakpoint} fontSize={props.fontSize + 'px'}>   {arrowIcon}   </PriceChange>
                </ Col>

                <Col BorderRight='solid 1.5px' Padding='0 10px 0 0' BorderColor={priceChange >= 0 ? 'rgba(145, 228, 165, 0.5)' : 'rgba(233, 86, 86, 0.5)'}>
                    <PriceChange change={priceChange} breakpoint={props.breakpoint} smallBreakpoint={props.smallBreakpoint} fontSize={props.fontSize + 'px'}>  {priceChangeDisplay}   </PriceChange>
                </ Col>
            </Row>

            <Row columnGap='0px'>
                <Col>
                    <PriceChange change={priceChange} breakpoint={props.breakpoint} smallBreakpoint={props.smallBreakpoint} fontSize={props.fontSize + 'px'} >   {priceChangePercentDisplay}   </PriceChange>
                </Col>
                <Col>
                    <PriceChange change={priceChange} breakpoint={props.breakpoint} smallBreakpoint={props.smallBreakpoint} fontSize={props.fontSize + 'px'} >   <PercentIcon iconSize={props.fontSize} breakpoint={props.breakpoint} smallBreakpoint={props.smallBreakpoint} />   </PriceChange>
                </Col>
            </Row>
        </Row>
    );
}

export default Price;