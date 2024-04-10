import { Button, useClipboard } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const PurpleButton = styled(Button)`
  background: #7a3cff;
  border-radius: 10px;
  color: #ffffff;
  /* width: 85px; */
  width: object-fit;
  min-width: 85px;
  font-size: 14px;
  height: 28px;
  &:hover {
    background: #7a5cff;
  }
`;

export const GreenButton = styled(Button)`
  background: #048118;
  border-radius: 10px;
  color: #ffffff;
  width: 85px;
  font-size: 14px;
  height: 28px;

  &:hover {
    background: #049118;
  }
`;
