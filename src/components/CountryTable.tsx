import { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import getFormattedCityData from "../Services/CountryNameService";
import { City } from "../types";
import Suggestions from "./Suggestions";
import {formatToLocalTime} from "../Services/CountryNameService";
import { toast } from "react-toastify";

interface CountryTableProps {
 cities: City[];
 setCities: React.Dispatch<React.SetStateAction<City[]>>;
}

const CountryNameTable = ({ cities, setCities }: CountryTableProps): JSX.Element => {
 const [searchTerm, setSearchTerm] = useState("");
 const [page, setPage] = useState(1); 
 const [sortColumn, setSortColumn] = useState<string | null>(null);
 const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

 
 const [hasMore, setHasMore] = useState(true);

 const handleCityClick = (latAndLon: { lat: number; lon: number }) => {
    const cityName = 'yourCityName'; 
    const url = `/weather/${cityName}?lat=${latAndLon.lat}&lon=${latAndLon.lon}`;
    window.open(url);
 };

 const handleSelectOption = (option: any) => {
    setSearchTerm(`${option.name},${option.cou_name_en}`);
 };

 const filteredCities = cities.filter(
    (city) =>
      `${city.name},${city.cou_name_en}`.toLowerCase().includes(searchTerm.toLowerCase())
 );

 const renderRows = () => {
    return sortedCities.map((temp, index) => (
      <tr key={index} className={index % 2 === 0 ? "odd:bg-gray-100" : "even:bg-gray-100"}>
        <td className="px-4 py-2 text-sm" onClick={() => {
          handleCityClick({ lat: temp.lat, lon: temp.lon });
        }}>{temp.name.split(' ')[0]}</td>
        <td className="px-4 py-2 text-sm">{temp.cou_name_en}</td>
        <td className="px-4 py-2 text-sm">  {formatToLocalTime(temp.timezone)}</td>
        <td className="px-4 py-2 text-sm">{temp.temp ? `${temp.temp}°` : `Not Viewed`}</td>
        <td className="px-4 py-2 text-sm">{temp.humidity ? `${temp.humidity}%` : `Not Viewed`}</td>
        <td className="px-4 py-2 text-sm">{temp.wind ? `${temp.wind}km/h` : `Not Viewed`}</td>
      </tr>
    ));
 };

 useEffect(() => {
    async function fetchCountryData() {
      let data = await getFormattedCityData();
      if (data.length > 0 && page<2) {
       
        setCities([...cities, ...data]);
        setPage(page + 1);
        
      } else {
        setHasMore(false);
      }
    }
    fetchCountryData();
 }, [page]);


 const handleSort = (column: string) => {
  if (sortColumn === column) {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    toast.success(
      `Table column Successfully sorted`
    )
  } else {
    setSortColumn(column);
    setSortOrder("asc");
    toast.success(
      `Table column Successfully sorted`
    )
  }
};

const sortedCities = [...filteredCities].sort((a, b) => {
  if (!sortColumn) return 0;

  const factor = sortOrder === "asc" ? 1 : -1;

  switch (sortColumn) {
    case "name":
      return a.name.localeCompare(b.name) * factor;
    case "cou_name_en":
      return a.cou_name_en.localeCompare(b.cou_name_en) * factor;
    case "timezone":
      return formatToLocalTime(a.timezone).localeCompare(formatToLocalTime(b.timezone)) * factor;
    case "temp":
      return (a.temp || 0) - (b.temp || 0) * factor;
    case "humidity":
      return (a.humidity || 0) - (b.humidity || 0) * factor;
    case "wind":
      return (a.wind || 0) - (b.wind || 0) * factor;
    default:
      return 0;
  }
});

 return (
    <div className="bg-cover bg-center h-screen bg-fixed" style={{ backgroundImage: 'url(https://media.gettyimages.com/id/1330405373/photo/extreme-weather-on-earth-background.jpg?s=1024x1024&w=gi&k=20&c=TvJDjOedDyEYm_mcj7cgC4puAZhdRkXmNIii6UxMdqE=)' }}>
      <div className="z-10 flex flex-col items-center h-full overflow-x-auto">
        <div className="max-w-3xl w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 focus:outline-none capitalize placeholder:lowercase rounded-lg mt-6"
          />
          <Suggestions options={filteredCities} onSelect={handleSelectOption} searchTerm={searchTerm} />
          <InfiniteScroll
            dataLength={filteredCities.length}
            next={() => setPage(page + 1)}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
          >
            <table className="bg-white bg-opacity-50 p-4 rounded-lg shadow-lg w-full">
            <thead>
              <tr>
                <th className="px-4 py-2" onClick={() => handleSort("name")}>City</th>
                <th className="px-4 py-2" onClick={() => handleSort("cou_name_en")}>Country</th>
                <th className="px-4 py-2" onClick={() => handleSort("timezone")}>TimeZone</th>
                <th className="px-4 py-2" onClick={() => handleSort("temp")}>Temperature</th>
                <th className="px-4 py-2" onClick={() => handleSort("humidity")}>Humidity</th>
                <th className="px-4 py-2" onClick={() => handleSort("wind")}>Wind</th>
              </tr>
            </thead>
              <tbody>{renderRows()}</tbody>
            </table>
          </InfiniteScroll>
        </div>
      </div>
    </div>
 );
};

export default CountryNameTable;




