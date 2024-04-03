import { Icon, IconProps } from '@chakra-ui/react';

export const CompanyIcon = (props: IconProps) => {
  return (
    <Icon viewBox="0 0 24 24" width="24px" height="24px" {...props}>
      <path
        d="M2.39844 9.24369C2.39844 8.84967 2.59899 8.48001 2.93665 8.25167L11.2566 2.62515C11.7008 2.32482 12.2961 2.32482 12.7402 2.62515L21.0602 8.25167C21.3979 8.48001 21.5984 8.84967 21.5984 9.24369V19.774C21.5984 20.7824 20.7388 21.5999 19.6784 21.5999H4.31844C3.25805 21.5999 2.39844 20.7824 2.39844 19.774V9.24369Z"
        stroke="white"
        strokeWidth="2"
      />
    </Icon>
  );
};
