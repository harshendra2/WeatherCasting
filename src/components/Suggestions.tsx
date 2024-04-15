import { Dispatch, SetStateAction } from 'react';
import { optionType } from './../types/index';

type componentProps = {
 options: optionType[];
 onSelect: (option: optionType) => void | Dispatch<SetStateAction<string>>; 
 searchTerm: string;
}

const Suggestions = ({ options, onSelect, searchTerm }: componentProps): JSX.Element => {
 
 const filteredOptions = searchTerm.length > 0 ? options.filter(option => option.name.toLowerCase().includes(searchTerm.toLowerCase())) : [];

 return (
    <div className="absolute top-9 bg-white ml-1 rounded-b-md mt-8 max-w-48 max-h-64 overflow-y-auto">
      <ul className="">
        {filteredOptions.map((option: optionType, index: number) => (
          <li key={option.name + '-' + index}>
            <button
              className="text-left text-sm w-full hover:bg-zinc-700 hover:text-white px-2 py-1 cursor-pointer"
              onClick={() => onSelect(option)}
            >
              {option.name}, {option.cou_name_en}
            </button>
          </li>
        ))}
      </ul>
    </div>
 );
}

export default Suggestions;



