export type optionType = {
  name: string
  cou_name_en: string
}

export type forecastType = {
  name: string
  country: string
  list: [
    {
      dt: number
      main: {
        feels_like: number
        humidity: number
        pressure: number
        temp: number
        temp_max: number
        temp_min: number
      }
      weather: [
        {
          main: string
          icon: string
          description: string
        }
      ]
      wind: {
        speed: number
        gust: number
        deg: number
      }
      clouds: {
        all: number
      }
      pop: number
      visibility: number
    }
  ]
  sunrise: number
  sunset: number
}



export interface City {
  name: string;
  ascii_name: string;
  population: number;
  timezone: string;
    lon: number;
    lat: number;
  cou_name_en: string;
  temp:number;
  humidity:number;
  wind:number;
  feels_like:number;
}

export interface Location{
  lat:number;
  lon:number
}

interface WeatherItem {
  title: string;
  icon: string;
  temp: number;
}

export interface ForecastProps {
  title: string;
  items: WeatherItem[];
}


export interface Weather{ 
  details:string,
  icon:string,
  temp:number,
  temp_min:number,
  temp_max:number,
  sunrise:number,
  sunset:number,
  speed:number,
  humidity:number,
  feels_like:string,
  timezone:string     
}
