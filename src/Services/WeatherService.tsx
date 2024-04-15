import { DateTime } from "luxon";

const API_KEY="";

const BASE_URL="https://api.openweathermap.org/data/2.5";
const BASE_URLS="https://api.openweathermap.org/data/3.0"

const getWeatherData =(infoType:string,searchParams:object)=>{
    const url=new URL(BASE_URL +"/"+infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY }).toString();

     return fetch(url).then((res)=>res.json())
}

const getDailyWeatherData =(infoType:string,searchParams:object)=>{
    const url=new URL(BASE_URLS +"/"+infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY }).toString();

     return fetch(url).then((res)=>res.json())
}

const formatCurrentWeather=(data:any)=>{
    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed },
      } = data;

      const { main: details, icon } = weather[0];

      return {
        lat,
        lon,
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity,
        name,
        dt,
        country,
        sunrise,
        sunset,
        details,
        icon,
        speed,
      };
}




export interface WeatherData {
    timezone: string;
    daily: {
      dt: number;
      temp: { day: number };
      weather: { icon: string }[];
    }[];
    hourly: {
      dt: number;
      temp: number;
      weather: { icon: string }[];
    }[];
  }




const formatForecastWeather =(data: WeatherData) => {
    let { timezone, daily, hourly } = data;
  const formattedDaily = daily.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "ccc"),
      temp: d.temp.day,
      icon: d.weather[0].icon,
    };
  });

  const formattedHourly = hourly.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
      temp: d.temp,
      icon: d.weather[0].icon,
    };
  });

  return { timezone, daily: formattedDaily, hourly: formattedHourly };
  };


const getFormattedWeatherData=async(searchParams:any)=>{
    const formattedCurrentWeather=await getWeatherData('weather',searchParams).then(formatCurrentWeather);
    const {lat,lon}=formattedCurrentWeather;
    const formattedForecastWeather = await getDailyWeatherData('onecall', {
        lat,
        lon,
        exclude: "current,minutely,alerts",
        units: searchParams.units,
      }).then(formatForecastWeather);


  return {...formattedCurrentWeather, ...formattedForecastWeather};
}


const formatToLocalTime = (secs:number,zone:string,format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
  
  const iconUrlFromCode = (code:string) =>
    `http://openweathermap.org/img/wn/${code}@2x.png`;

  
    export default getFormattedWeatherData;
  
  export { formatToLocalTime, iconUrlFromCode };




