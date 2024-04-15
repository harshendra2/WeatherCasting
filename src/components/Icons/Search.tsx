
const SearchIcon = ({ onClicks }: { onClicks: () => void }): JSX.Element => (
  <svg
    width="60"
    height="60"
    viewBox="0 0 24 24"
    fill="white"
    xmlns="http://www.w3.org/2000/svg"
    className=" cursor-pointer transition ease-out hover:scale-125"
    onClick={onClicks}
  >
    <path
      d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 10-.71.71l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
      fill="white"
    />
  </svg>

  

);

export default SearchIcon;
