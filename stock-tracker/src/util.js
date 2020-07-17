export function unixToTimePassed(someDateInThePast) {
    var difference = Date.now() - someDateInThePast;
  
    if (difference < 5 * 1000) {
      return "just now";
    } else if (difference < 90 * 1000) {
      return "moments ago";
    }
    //it has minutes
  
    if (difference / 1000 > 60 && difference / 1000 < 3600) {
      var result = "";
      if (Math.floor((difference / 1000 / 60) % 60) > 0) {
        let s = Math.floor((difference / 1000 / 60) % 60) === 1 ? "" : "s";
        result = `${Math.floor((difference / 1000 / 60) % 60)} minute${s} `;
      }
      return result + " ago";
    }
  
    //it has hours
    if (difference / 1000 > 3600 && difference / 1000 < 3600 * 24) {
      result = "";
  
      if (Math.floor((difference / 1000 / 60 / 60) % 24) > 0) {
        let s = Math.floor((difference / 1000 / 60 / 60) % 24) === 1 ? "" : "s";
        result =
          `${Math.floor((difference / 1000 / 60 / 60) % 24)} hour${s}${
            result === "" ? "" : ","
          } ` + result;
      }
      return result + " ago";
    }
  
    //it has days
    if (difference / 1000 > 3600 * 24) {
      result = "";
      if (Math.floor(difference / 1000 / 60 / 60 / 24) > 0) {
        let s = Math.floor(difference / 1000 / 60 / 60 / 24) === 1 ? "" : "s";
        result =
          `${Math.floor(difference / 1000 / 60 / 60 / 24)} day${s}${
            result === "" ? "" : ","
          } ` + result;
      }
      return result + " ago";
    }
  }