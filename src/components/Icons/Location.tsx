
const LocationIcon = ({ onClicks }: { onClicks: () => void }): JSX.Element => (
  <svg
    width="60"
    height="40"
    viewBox="0 0 24 45"
    fill="white"
    xmlns="http://www.w3.org/2000/svg"
    className=" cursor-pointer transition ease-out hover:scale-125"
    onClick={onClicks}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20 0C12.268 0 6.25 5.731 6.25 12.829C6.25 19.348 11.443 32.148 20 50C28.557 32.148 33.75 19.348 33.75 12.829C33.75 5.731 27.732 0 20 0ZM20 18.75C16.317 18.75 13.125 15.558 13.125 11.875C13.125 8.19198 16.317 5 20 5C23.683 5 26.875 8.19198 26.875 11.875C26.875 15.558 23.683 18.75 20 18.75Z"
    />
  </svg>
);

export default LocationIcon;
