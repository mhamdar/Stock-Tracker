import styled from 'styled-components'

export const Grid = styled.div`
    position: relative;
    padding-top: 2%;
    padding-bottom: 0;
    padding-right: 10%;
    padding-left: 10%;
    @media (max-width: ${prop => prop.breakpoint ? prop.breakpoint : '15300px'}) {
        padding-right: 5%;
        padding-left: 5%;
    }
    @media (max-width: ${prop => prop.smallBreakpoint ? prop.smallBreakpoint : '950px'}) {
        padding-right: 3%;
        padding-left: 3%;
    }
`

export const Row = styled.div`
    @media (max-width: ${prop => prop.maxWidth ? prop.maxWidth : '0px'}) {
        flex-direction: column;
    }
    @media (max-width: ${prop => prop.hideWidth ? prop.hideWidth : '0px'}) {
        display: none;
    }
    @media (min-width: ${prop => prop.minWidth ? prop.minWidth : '900000px'}) {
        display: none;
    }
    background-image: ${prop => prop.BackgroundImage ? prop.BackgroundImage : 'transparent'};
    display: flex;
    overflow: hidden;
    padding: ${prop => prop.Padding ? prop.Padding : '0 0 0 0'};
    margin-bottom: ${prop => prop.marginBottom ? prop.marginBottom : 'none'};
    margin-top: ${prop => prop.marginTop ? prop.marginTop : 'none'};
    column-gap: ${prop => prop.columnGap ? prop.columnGap : '50px'};
    justify-content: ${prop => prop.justifyContent ? prop.justifyContent : 'flex-start'};
    border-right: ${prop => prop.BorderRight ? prop.BorderRight : 'none'}
`    

export const Col = styled.div`
    flex: ${(props) => props.size};
    @media (max-width: ${prop => prop.hideWidth ? prop.hideWidth : '0px'}) {
        display: none;
    }
    font-size: ${prop => prop.fontSize ? prop.hideWidth : 'default'};
    margin: ${prop => prop.margin ? prop.margin : '0 0 0 0'};
    padding: ${prop => prop.Padding ? prop.Padding : '0 0 0 0'};
    border-right: ${prop => prop.BorderRight ? prop.BorderRight : 'none'};
    border-color: ${prop => prop.BorderColor ? prop.BorderColor : 'none'};
    align-items: center;
`