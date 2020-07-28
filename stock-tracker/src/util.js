export function getTimeTicks(chartData, active) {
  let ticks = []
  if(active === 0){
    
      let currentHour = chartData[chartData.length-1]?.label.substring(0,2)
      if(currentHour==='09'){
        ticks = ["09:30 AM", "09:35 AM",  "09:40 AM", "09:45 AM", "09:50 AM", "09:55 AM","10 AM"]
      }else{
        ticks = ["09:30 AM",  "10:30 AM",  "11:30 AM", "12:30 PM", "1:30 PM", "2:30 PM",  "3:30 PM",  "4:30 PM",  "5:30 PM"]
      }
    
  
  }
  if(active === 1){
    chartData.forEach(item => ticks.push(item.label))
  }
  if(active === 2){
    ticks=[chartData[0].label,chartData[6].label,chartData[12].label,chartData[18].label]
  }

  if(active === 3){
    ticks=[chartData[0].label,chartData[125].label,chartData[250].label]
  }

  if(active === 4){
    ticks=[chartData[0].label,chartData[620].label,chartData[1200].label]
  }

  if(active === 5){
    let len = chartData.length
    
    ticks=[chartData[1].label,chartData[len%2===0?(len/2):(len-1)/2].label,chartData[len-1].label]
  }
  
  return ticks;
}

export function getPriceTicks(chartData, nbOfTicks) {
    if(chartData[0]===undefined) return [0]
    const minPrice = chartData.reduce((min, dataPoint) => (dataPoint.close !== null && dataPoint.close < min) ? dataPoint.close : min, Number.MAX_SAFE_INTEGER);
    const maxPrice = chartData.reduce((max, dataPoint) => dataPoint.close > max ? dataPoint.close : max, Number.MIN_SAFE_INTEGER);

    const minRoundedToEven = 2 * Math.floor(minPrice/ 2); // first label

    const spread = maxPrice - minRoundedToEven;
    const step = spread / (nbOfTicks - 1);

    let stepRounded;
    if (0.5 < step && step <= 1) {
        stepRounded = 1;
    }
    if (step <= 0.5) {
        stepRounded = (Math.ceil(step * 20) / 20).toFixed(2); // round to upper  0.05
    }
    else {
        stepRounded = 2 * Math.ceil(step / 2); // round to upper even number
    }

    const ticks = Array(nbOfTicks).fill(0).map((tick, index) => ((index * stepRounded) + minRoundedToEven).toFixed(2));
    
    return ticks;
}

export function unixToTimePassed(someDateInThePast) {
    let difference = Date.now() - someDateInThePast;
  
    if (difference < 5 * 1000) {
      return "just now";
    } else if (difference < 90 * 1000) {
      return "moments ago";
    }
    //it has minutes
  
    if (difference / 1000 > 90 && difference / 1000 < 3600) {
      var result = "";
      if (Math.floor((difference / 1000 / 60) % 60) > 0) {
        let s = Math.floor((difference / 1000 / 60) % 60) === 1 ? "" : "s";
        result = `${Math.floor((difference / 1000 / 60) % 60)} minute${s}`;
      }
      return result + " ago";
    }
  
    //it has hours
    if (difference / 1000 > 3600 && difference / 1000 < 3600 * 24) {
      result = "";
  
      if (Math.floor((difference / 1000 / 60 / 60) % 24) > 0) {
        let s = Math.floor((difference / 1000 / 60 / 60) % 24) === 1 ? "" : "s";
        result =
          `${Math.floor((difference / 1000 / 60 / 60) % 24)} hour${s}`;
      }
      return result + " ago";
    }
  
    //it has days
    if (difference / 1000 > 3600 * 24) {
      result = "";
      if (Math.floor(difference / 1000 / 60 / 60 / 24) > 0) {
        let s = Math.floor(difference / 1000 / 60 / 60 / 24) === 1 ? "" : "s";
        result =
          `${Math.floor(difference / 1000 / 60 / 60 / 24)} day${s}`;
      }
      return result + " ago";
    }
  }

export function findHighValue(chart){
    let max = 0; 
    chart.forEach(point => {
        if(point.average>max){
            max= point.average
        }
   });
   return max;
}

export function findLowValue(chart){
    let min = Number.MAX_VALUE; 
    
    chart.forEach(point => {
        if(point.average<min&&point.average!==null){
            min= point.average
        }
   });
   return min;
}