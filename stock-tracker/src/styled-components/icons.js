import styled from 'styled-components'
import { SearchAlt2 } from '@styled-icons/boxicons-regular/SearchAlt2'
import { Percent } from '@styled-icons/evaicons-solid/Percent'
import { UpArrowAlt } from '@styled-icons/boxicons-regular/UpArrowAlt'
import { DownArrowAlt } from '@styled-icons/boxicons-regular/DownArrowAlt'
import { Dollar } from '@styled-icons/boxicons-regular/Dollar'

export const SearchIcon = styled(SearchAlt2)`
    height: ${prop => prop.iconSize ? prop.iconSize+'px' : '50px'};
    width: auto;
    @media (max-width: ${prop => prop.breakpoint ? prop.breakpoint : '0px'}) {
        height: ${prop => prop.iconSize ? (3 * prop.iconSize) / 4+'px' : '50px'};
        width: auto;
    }
    @media (max-width: ${prop => prop.smallBreakpoint ? prop.smallBreakpoint : '0px'}) {
        height: ${prop => prop.iconSize ? prop.iconSize / 2 +'px' : '50px'};
        width: auto;
    }
    color: #7fb3ff;
    transform: translateY(25%);
`

export const DollarIcon = styled(Dollar)`
    height: ${prop => prop.iconSize ? prop.iconSize / 2 +'px' : '50px'};
    width: auto;
    transform: translateY(-50%);
    @media (max-width: ${prop => prop.breakpoint ? prop.breakpoint : '0px'}) {
        height: ${prop => prop.iconSize ? (3 * prop.iconSize / 8) +'px' : '50px'};
        width: auto;
    }
    @media (max-width: ${prop => prop.smallBreakpoint ? prop.smallBreakpoint : '0px'}) {
        height: ${prop => prop.iconSize ? prop.iconSize / 4 +'px' : '50px'};
        width: auto;
    }
    
`

export const UpArrowIcon = styled(UpArrowAlt)`
    height: ${prop => prop.iconSize ? prop.iconSize / 2 +'px' : '50px'};
    width: auto;
    transform: translateY(-50%);
    @media (max-width: ${prop => prop.breakpoint ? prop.breakpoint : '0px'}) {
        height: ${prop => prop.iconSize ? (3 * prop.iconSize / 8) +'px' : '50px'};
        width: auto;
    }
    @media (max-width: ${prop => prop.smallBreakpoint ? prop.smallBreakpoint : '0px'}) {
        height: ${prop => prop.iconSize ? prop.iconSize / 4 +'px' : '50px'};
        width: auto;
    }
    
`

export const DownArrowIcon = styled(DownArrowAlt)`
    height: ${prop => prop.iconSize ? prop.iconSize / 2 +'px' : '50px'};
    width: auto;
    transform: translateY(-50%);
    @media (max-width: ${prop => prop.breakpoint ? prop.breakpoint : '0px'}) {
        height: ${prop => prop.iconSize ? (3 * prop.iconSize / 8) +'px' : '50px'};
        width: auto;
    }
    @media (max-width: ${prop => prop.smallBreakpoint ? prop.smallBreakpoint : '0px'}) {
        height: ${prop => prop.iconSize ? prop.iconSize / 4 +'px' : '50px'};
        width: auto;
    }
    
`

export const PercentIcon = styled(Percent)`
    height: ${prop => prop.iconSize ? prop.iconSize / 2 +'px' : '50px'};
    width: auto;
    transform: translateY(-50%);
    @media (max-width: ${prop => prop.breakpoint ? prop.breakpoint : '0px'}) {
        height: ${prop => prop.iconSize ? (3 * prop.iconSize / 8) +'px' : '50px'};
        width: auto;
    }
    @media (max-width: ${prop => prop.smallBreakpoint ? prop.smallBreakpoint : '0px'}) {
        height: ${prop => prop.iconSize ? prop.iconSize / 4 +'px' : '50px'};
        width: auto;
    }
    
`