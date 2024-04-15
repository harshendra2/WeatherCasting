import CountryNameTable from "./components/CountryTable"
import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const CountryTable = ({ cities, setCities }:any) => {
  return (
     <div>
       <CountryNameTable cities={cities} setCities={setCities} />
       <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />
     </div>
  );
 };

export default CountryTable