import React from "react";
import { useSelector } from 'react-redux'
import { SectionTitle, CompanyName, CompanyWebsite, CompanyDescription } from '../styled-components/text.js'
import { BlueLine } from '../styled-components/lines.js'

const Overview = () => {
    const overview = useSelector(state => state.overview);
    return (
        <div>
           <SectionTitle>COMPANY OVERVIEW</SectionTitle>
           <BlueLine />
           <CompanyName data-testid="company-name">{(overview.companyName && overview.symbol) ? overview.companyName+' ('+overview.symbol+')' : ''}</CompanyName> 
            <CompanyWebsite data-testid="website">{overview.website}</CompanyWebsite>
            <CompanyDescription data-testid="description">{overview.description}</CompanyDescription>
        </div>
    );
}

export default Overview;