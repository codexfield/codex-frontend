import { getCloneUrl } from '@/utils';
import { ChevronDownIcon, CopyIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useClipboard,
  useToast,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useEffect } from 'react';

interface IProps {
  buckname: string;
}

export const ClonePopver = (props: IProps) => {
  const { buckname } = props;
  const cloneUrl = getCloneUrl(buckname);
  const { onCopy, value, hasCopied } = useClipboard(cloneUrl);
  const toast = useToast();

  useEffect(() => {
    if (hasCopied) {
      toast({
        position: 'bottom',
        title: 'Copy success',
        status: 'success',
        duration: 1000,
        isClosable: true,
      });
    }
  }, [hasCopied, toast]);

  return (
    <CloneContainer>
      <Popover placement="bottom-end">
        <PopoverTrigger>
          <Button
            rightIcon={<ChevronDownIcon />}
            fontSize="14px"
            color="#FFF"
            height="28px"
            p="5px 15px"
            bg="rgba(122, 60, 255, 1)"
            boxShadow="0px 4px 6px 0px rgba(0, 0, 0, 0.25);"
            _hover={{
              bg: 'rgba(122, 60, 255, 0.8)',
            }}
          >
            Clone
          </Button>
        </PopoverTrigger>
        <PopoverContent
          w="480px"
          bg="#1C1C1E"
          border="1px solid rgba(255, 255, 255, 0.15)"
          p="20px"
          boxShadow="0px 14px 40px 0px #000"
        >
          <PopoverHeader color="#A276FF" fontSize="14px" fontWeight="800" borderBottom="none">
            HTTPS
          </PopoverHeader>
          <PopoverBody>
            <Flex mb={2}>
              <InputGroup
                size="sm"
                bg="#000"
                borderRadius="8px"
                sx={{
                  border: '1px solid #5F5F5F',
                }}
              >
                <Input
                  disabled
                  value={value}
                  _disabled={{
                    color: '#d9d9d9',
                  }}
                />
                <InputRightElement>
                  <CopyIcon cursor="pointer" onClick={onCopy} color="#FFF" />
                </InputRightElement>
              </InputGroup>
              {/* {hasCopied ? 'Copied!' : 'Copy'} */}
            </Flex>
            <Box as="p" color="#5F5F5F" fontSize="14px">
              Use Gitd or checkout with SVN using the web URL.
            </Box>
            {/* <Box
          borderTop="1px solid #282829"
          bg="#282829"
          boxShadow="0px 0px 12px 0px rgba(0, 0, 0, 0.25)"
        >
          Download ZIP
        </Box> */}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </CloneContainer>
  );
};

const CloneContainer = styled(Flex)``;
