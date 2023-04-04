import { SvgIcon, SvgIconProps } from '../components/forms';

const GhanaFlag = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <g clipPath="url(#clip0_5566_15219)">
        <path fillRule="evenodd" clipRule="evenodd" d="M-6 -2V22H26V-2H-6Z" fill="#FECA00" />
        <mask
          id="mask0_5566_15219"
          style={{
            maskType: 'alpha',
          }}
          maskUnits="userSpaceOnUse"
          x="-6"
          y="-2"
          width="32"
          height="24"
        >
          <path fillRule="evenodd" clipRule="evenodd" d="M-6 -2V22H26V-2H-6Z" fill="white" />
        </mask>
        <g mask="url(#mask0_5566_15219)">
          <path fillRule="evenodd" clipRule="evenodd" d="M-6 -2V6H26V-2H-6Z" fill="#FE3434" />
          <path fillRule="evenodd" clipRule="evenodd" d="M-6 14V22H26V14H-6Z" fill="#5AB92D" />
        </g>
        <path
          d="M10 6.59998L10.7858 9.01842H13.3287L11.2714 10.5131L12.0572 12.9315L10 11.4369L7.94275 12.9315L8.72855 10.5131L6.6713 9.01842H9.2142L10 6.59998Z"
          fill="black"
          stroke="black"
          strokeLinejoin="bevel"
        />
      </g>
      <path
        d="M10 19C5.02944 19 1 14.9706 1 10H-1C-1 16.0751 3.92487 21 10 21V19ZM19 10C19 14.9706 14.9706 19 10 19V21C16.0751 21 21 16.0751 21 10H19ZM10 1C14.9706 1 19 5.02944 19 10H21C21 3.92487 16.0751 -1 10 -1V1ZM10 -1C3.92487 -1 -1 3.92487 -1 10H1C1 5.02944 5.02944 1 10 1V-1Z"
        fill="#0F3363"
        fillOpacity="0.3"
      />
      <defs>
        <clipPath id="clip0_5566_15219">
          <path
            d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z"
            fill="white"
          />
        </clipPath>
      </defs>
    </SvgIcon>
  );
};

export default GhanaFlag;
