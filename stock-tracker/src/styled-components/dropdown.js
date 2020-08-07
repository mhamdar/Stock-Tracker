import styled from 'styled-components'

export const DropdownBody = styled.div`
   width:100%; 
   position:relative;
   top:7px;
   margin-bottom:22px;
`
export const OptionList = styled.ul`
    margin:0;
    border-top: 2px solid #7fb3ff;
    position:absolute;
    padding-left: 0px;
    top:0;
    list-style: none;
    width: 100%;
    overflow:hidden;
    z-index:200;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    background-image: linear-gradient(to bottom, #001330 2%, rgba(0, 8, 19, 0.8) 177%);
`
export const Option = styled.li`
    height:40px;
    padding-left: 1%;
    &:hover {
        background-color: #1c395d
    }
    cursor: pointer;
`

export const SymbolTag = styled.label`
    width: 47px;
    height: 22px;
    font-family: Lato;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #7fb3ff;
    position:relative;
    top:8px;
    cursor: pointer;
`
export const NameTag = styled.label`
    width:600px;
    height: 22px;
    text-overflow: ellipsis; 
    font-family: Lato;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #ffffff;
    position:relative;
    top:5px;
    @media (max-width: ${prop => prop.breakpoint ? prop.breakpoint : '0px'}) {
        font-size:12px;
      }
      cursor: pointer;
`
export const ExchangeTag = styled.p`
    width: 76px;
    height: 22px;
    opacity: 0.13;
    border-radius: 2px;
    background-color: #80b4ff;
    display: inline-block;
    margin:0;
    position: relative;
    left:20px;
    top:10px;
    @media (max-width: ${prop => prop.breakpoint ? prop.breakpoint : '0px'}) {
        display:none;
      }
      cursor: pointer;
`

export const ExchangeText = styled.label`
    width: 60px;
    height: 17px;
    opacity: 0.5;
    font-family: Lato;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff;
    position: relative;
    left:72px;
    top:5px;
    @media (max-width: ${prop => prop.breakpoint ? prop.breakpoint : '0px'}) {
        display:none;
      }
      cursor: pointer;
`

export const TagContainer = styled.label`
    position:absolute;
    left:150px;
    cursor: pointer;
`