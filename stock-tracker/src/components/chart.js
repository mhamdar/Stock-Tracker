
import React, {useState, useEffect} from "react"
import './components.css';
import { getPriceTicks, getTimeTicks } from '../util.js'
import {  useSelector } from 'react-redux'
import { AreaChart, XAxis, YAxis, Label, Tooltip, Area, CartesianGrid, ReferenceLine, ResponsiveContainer } from "recharts";
import { Row } from '../styled-components/wrappers.js'
import { ChartButton } from '../styled-components/buttons.js'



const Chart = () => {
    const chartData = useSelector(state => state.chart)
    const coldchartData = useSelector(state => state.coldChart)
    const currentPrice = useSelector(state => state.price)
    const [active,setActive] = useState('1D');
    const [currentChart,setCurrentChart] = useState(chartData);
    const [lineDisplay,setLineDisplay] = useState('block')
    const [XTicks,setXTicks] = useState();
    const [YTicks,setYTicks] = useState([0]);
   
    useEffect(()=>{
        if(active==='1D'){
            setCurrentChart(chartData)
            setYTicks(getPriceTicks(chartData, 10))
            setXTicks(getTimeTicks(chartData, 0))
            setLineDisplay('block')
            
        }
        if(active==='5D'){
            setCurrentChart(coldchartData.fiveday)
            setYTicks(getPriceTicks(coldchartData.fiveday, 10))
            setXTicks(getTimeTicks(coldchartData.fiveday, 1))
            setLineDisplay('none')
            
        }
        if(active==='1M'){
            setCurrentChart(coldchartData.onemonth)
            setYTicks(getPriceTicks(coldchartData.onemonth, 10))
            setXTicks(getTimeTicks(coldchartData.onemonth, 2))
            setLineDisplay('none')
            
        }
        if(active==='1Y'){
            setCurrentChart(coldchartData.oneyear)
            setYTicks(getPriceTicks(coldchartData.oneyear, 10))
            setXTicks(getTimeTicks(coldchartData.oneyear, 3))
            setLineDisplay('none')
            
        }
        if(active==='5Y'){
            setCurrentChart(coldchartData.fiveyear)
            setYTicks(getPriceTicks(coldchartData.fiveyear, 10))
            setXTicks(getTimeTicks(coldchartData.fiveyear, 4))
            setLineDisplay('none')
            
        }
        if(active==='MAX'){
            setCurrentChart(coldchartData.max)
            setYTicks(getPriceTicks(coldchartData.max, 10))
            setXTicks(getTimeTicks(coldchartData.max, 5))
            setLineDisplay('none')         
        }
    },[active, coldchartData])

    return (

        <div>
          <Row columnGap='0px' justifyContent='flex-end'>
            <ChartButton onClick={()=>setActive('1D')} isActive={active==='1D'}> 1D </ChartButton>
            <ChartButton onClick={()=>setActive('5D')} isActive={active==='5D'} disabled={coldchartData.oneday===undefined}> 5D </ChartButton>
            <ChartButton onClick={()=>setActive('1M')} isActive={active==='1M'} disabled={coldchartData.oneday===undefined}> 1M </ChartButton>
            <ChartButton onClick={()=>setActive('1Y')} isActive={active==='1Y'} disabled={coldchartData.oneday===undefined}> 1Y </ChartButton>
            <ChartButton onClick={()=>setActive('5Y')} isActive={active==='5Y'} disabled={coldchartData.oneday===undefined}> 5Y </ChartButton>
            <ChartButton onClick={()=>setActive('MAX')} isActive={active==='MAX'} disabled={coldchartData.oneday===undefined}> MAX </ChartButton>
          </ Row> 
          
          <ResponsiveContainer width="99%" aspect={2}>
            <AreaChart
                width={500}
                height={500}
                data={currentChart}
                margin={{ top: 30, left: 30, bottom: 30 }}
            >
 
                    <Tooltip cursor={false} />
                    <ReferenceLine y={currentPrice} stroke="#e95656" strokeDasharray="3 3" display={lineDisplay}>
                        <Label
                            value={'     ' + currentPrice}
                            position="right"
                            style={{ fill: "#e95656", fontSize: "13px"  }} 
                            display={lineDisplay}/>
                    </ReferenceLine>
 
 
                    <CartesianGrid
                        stroke="#344968"
                        opacity="0.5"
                    />
                    <defs>
                        <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.5} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                    </defs>
 
                    <XAxis
                        dataKey="label"
                        stroke="transparent"
                        style={{ fill: "#beccdc", fontSize: "13px" }}
                        // Following line avoids times like "9:17 AM" to be ticks
                        ticks={XTicks}
                        interval={"preserveStart"}
                    >
                    </ XAxis>
 
                    <YAxis
                        dataKey="close"
                        domain={ [ Number(YTicks[0]), Number(YTicks[YTicks.length - 1]) ] }
                        orientation="right"
                        stroke="transparent"
                        style={{ fill: "#beccdc", fontSize: "13px" }}
                        ticks={YTicks}
                    >
                    </ YAxis>
 
                    <Area
                        isAnimationActive={false}
                        dataKey="close"
                        connectNulls={true}
                        stroke="#7FB3FF"
                        fillOpacity={1}
                        fill="url(#lineGradient)"
                    />
                </AreaChart>
              </ResponsiveContainer>
        </div>
        
        

    );
}

export default Chart;