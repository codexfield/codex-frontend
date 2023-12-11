import { Button, Input, InputLeftElement, Textarea } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const StyledButton = styled(Button)`
  height: 40px;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  border-radius: 10px;
  box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.25);
`;

export const StyledInput = styled(Input)`
  border-color: #5f5f5f;
  border-radius: 8px;
  background-color: #000;
  ::placeholder {
    color: #8d8d99;
    font-weight: 800;
  }
`;

export const StyleTextarea = styled(Textarea)`
  border-color: #5f5f5f;
  border-radius: 8px;
  background-color: #000;
  ::placeholder {
    color: #8d8d99;
    font-weight: 800;
  }
`;

export const StyledInputElement = styled(InputLeftElement)`
  pointer-events: none;
  border: 1px solid #5f5f5f;
  background: #1e1e1e;
  border-radius: 8px 0 0 8px;
`;
