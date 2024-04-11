import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useGetAccountDetailsByName } from '../hooks/contract/useGetAccountDetailsByName';

export const Search = () => {
  const router = useRouter();
  const [kw, setKw] = useState('');
  const { address } = useAccount();

  const { isLoading, data: searchUserData } = useGetAccountDetailsByName(kw, address);

  // console.log('data', searchUserData);

  const handleSearch = (e: any) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    if (!target.value) return;

    if (e.key === 'Enter') {
      router.push(`/profile/${target.value}`);
    }

    setKw(target.value);
  };

  return (
    <Box h="46px" minW="560px" pos="relative">
      <InputGroup>
        <Input
          placeholder="Enter by Address / Profile"
          sx={{
            border: 'none',
            bg: '#1e1e1e',
            color: '#5F5F5F',
          }}
          onKeyUp={handleSearch}
        />
        <InputRightElement bg="#7A3CFF" borderRadius="0 8px 8px 0">
          <SearchIcon />
        </InputRightElement>
      </InputGroup>

      {kw && (
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
                    <Box
                      cursor="pointer"
                      bg="#000"
                      border="1px solid #5F5F5F"
                      borderRadius="8px"
                      p="8px"
                      fontSize="12px"
                      onClick={() => {
                        router.push(`/profile/${searchUserData.account}`);
                      }}
                    >
                      {`${window.location.origin}/profile/${searchUserData.account}`}
                    </Box>
                  </>
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
          )
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
