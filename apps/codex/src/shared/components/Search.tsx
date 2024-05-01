import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useOutsideClick,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useAccount } from 'wagmi';
import { useGetAccountDetailsByName } from '../hooks/contract/useGetAccountDetailsByName';
import { MetaMaskAvatar } from 'react-metamask-avatar';

export const Search = () => {
  const ref = useRef(null);
  const router = useRouter();
  const [kw, setKw] = useState('');

  const [open, setOpen] = useState(false);
  useOutsideClick({
    ref: ref,
    handler: () => setOpen(false),
  });

  const { data: searchUserData } = useGetAccountDetailsByName(kw);

  const handleSearch = (e: any) => {
    e.preventDefault();

    setOpen(true);

    const target = e.target as HTMLInputElement;
    if (!target.value) return;

    if (e.key === 'Enter') {
      setOpen(false);
      router.push(`/profile/${target.value}`);
      return;
    }

    setKw(target.value);
  };

  const handleFocus = () => {
    if (!kw) return;
    setOpen(true);
  };

  return (
    <Box h="46px" minW="560px" pos="relative" ref={ref}>
      <InputGroup>
        <Input
          placeholder="Enter by Address / Profile"
          sx={{
            border: 'none',
            bg: '#1e1e1e',
            color: '#5F5F5F',
          }}
          onKeyUp={handleSearch}
          onFocus={handleFocus}
        />
        <InputRightElement bg="#7A3CFF" borderRadius="0 8px 8px 0">
          <SearchIcon />
        </InputRightElement>
      </InputGroup>

      {open && (
        <Box
          pos="absolute"
          p="10px"
          borderRadius="8px"
          mt="5px"
          bg="#1C1C1E"
          minW="560px"
          right="0"
        >
          <Tabs variant="unstyled">
            <TabList>
              {/* <Type _selected={{ bg: '#7A3CFF' }}>Addresses</Type> */}
              <Type _selected={{ bg: '#7A3CFF' }}>Profile</Type>
            </TabList>
            <TabPanels p="0">
              {/* <TabPanel>
              <p>one!</p>
            </TabPanel> */}
              <TabPanel px="0" py="5px">
                {searchUserData && searchUserData.id !== BigInt(0) && (
                  <>
                    <Flex
                      gap="4px"
                      cursor="pointer"
                      bg="#000"
                      border="1px solid #5F5F5F"
                      borderRadius="8px"
                      p="8px"
                      fontSize="12px"
                      alignItems="center"
                      onClick={() => {
                        setOpen(false);
                        router.push(`/profile/${searchUserData.account}`);
                      }}
                    >
                      <MetaMaskAvatar address={searchUserData.account} />
                      {`${window.location.origin}/profile/${searchUserData.account}`}
                    </Flex>
                  </>
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      )}
    </Box>
  );
};

const Type = styled(Tab)`
  height: 24px;
  border-radius: 12px;
  font-size: 12px;
`;
