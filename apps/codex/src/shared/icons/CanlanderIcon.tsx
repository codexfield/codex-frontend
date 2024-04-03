import { Icon, IconProps } from '@chakra-ui/react';

export const CanlanderIcon = (props: IconProps) => {
  return (
    <Icon viewBox="0 0 30 36" width="30px" height="36px" {...props}>
      <rect width="24" height="34" transform="translate(3 0.5)" />
      <g filter="url(#filter0_d_3525_2649)">
        <path
          d="M9.51272 11.9999H20.3984M8.76987 5.99994V7.80016M20.9984 5.99994V7.79994M24.5984 10.7999L24.5984 24C24.5984 25.6569 23.2553 27 21.5984 27H8.39844C6.74158 27 5.39844 25.6569 5.39844 24.0001V10.7999C5.39844 9.14308 6.74158 7.79994 8.39844 7.79994H21.5984C23.2553 7.79994 24.5984 9.14308 24.5984 10.7999Z"
          stroke="#5F5F5F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          shapeRendering="crispEdges"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_3525_2649"
          x="0.398438"
          y="4.99994"
          width="29.1992"
          height="31.0001"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3525_2649" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_3525_2649"
            result="shape"
          />
        </filter>
      </defs>
    </Icon>
  );
};
