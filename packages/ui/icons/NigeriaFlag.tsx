import { SvgIcon, SvgIconProps } from '../components/forms';

const NigeriaFlag = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <g clipPath="url(#clip0_5566_11795)">
        <path fillRule="evenodd" clipRule="evenodd" d="M-6 -2H26V22H-6V-2Z" fill="#F7FCFF" />
        <path fillRule="evenodd" clipRule="evenodd" d="M14 -2H25V22H14V-2Z" fill="#009933" />
        <path fillRule="evenodd" clipRule="evenodd" d="M-5 -2H6V22H-5V-2Z" fill="#009933" />
      </g>
      <path
        d="M10 19C5.02944 19 1 14.9706 1 10H-1C-1 16.0751 3.92487 21 10 21V19ZM19 10C19 14.9706 14.9706 19 10 19V21C16.0751 21 21 16.0751 21 10H19ZM10 1C14.9706 1 19 5.02944 19 10H21C21 3.92487 16.0751 -1 10 -1V1ZM10 -1C3.92487 -1 -1 3.92487 -1 10H1C1 5.02944 5.02944 1 10 1V-1Z"
        fill="#0F3363"
        fillOpacity="0.3"
      />
      <defs>
        <clipPath id="clip0_5566_11795">
          <path
            d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z"
            fill="white"
          />
        </clipPath>
      </defs>
    </SvgIcon>
  );
};

export default NigeriaFlag;
