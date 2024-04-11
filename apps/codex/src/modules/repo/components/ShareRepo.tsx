import { ShareIcon } from '@/shared/icons/ShareIcon';
import { CopyIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  IconButton,
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
import { useEffect } from 'react';

interface IProps {
  url: string;
}

export const SharePopver = (props: IProps) => {
  const { url } = props;
  // const cloneUrl = getCloneUrlByBucketName(buckname);
  const { onCopy, value, hasCopied } = useClipboard(url);
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
    <Flex>
      <Popover placement="bottom-end">
        <PopoverTrigger>
          <IconButton
            icon={<ShareIcon />}
            aria-label="share"
            variant="unstyled"
            _hover={{
              bg: 'rgba(0, 0, 0, 0.1)',
            }}
          />
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
            </Flex>
            <Box as="p" color="#5F5F5F" fontSize="14px">
              Use gitd to work with this web URL
            </Box>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};
