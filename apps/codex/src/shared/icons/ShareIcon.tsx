import { Icon, IconProps } from '@chakra-ui/react';

export const ShareIcon = (props: IconProps) => {
  return (
    <Icon viewBox="0 0 20 20" width="20px" height="20px" {...props}>
      <path
        d="M3 13.1822V16.2705C3 16.7385 3.18437 17.1873 3.51256 17.5183C3.84075 17.8492 4.28587 18.0352 4.75 18.0352H15.25C15.7141 18.0352 16.1592 17.8492 16.4874 17.5183C16.8156 17.1873 17 16.7385 17 16.2705V13.1822M10.0361 12.9629L10.0361 2.96289M10.0361 2.96289L6.03613 6.78385M10.0361 2.96289L14.0361 6.78385"
        stroke="white"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};
