import { CustomAvatar } from '@/components/ui/avatars';
import { useGetAccountDetails } from '@/hooks/contract/useGetAccountDetails';
import { useIsMounted } from '@/hooks/useIsMounted';
import { Box, Center, Flex, Spinner } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useAccount } from 'wagmi';

export const Side = () => {
  const { address } = useAccount();
  const isMounted = useIsMounted();
  const { data, isError, isLoading } = useGetAccountDetails(address);

  if (!isMounted) return null;

  return (
    <Container>
      {!isLoading && data && (
        <>
          <UserInfo>
            <Flex gap="16px">
              {address && (
                <Box>
                  <CustomAvatar address={address} size={128} />
                </Box>
              )}
              <UserDesc as="div">
                <Box>{data[1]}</Box>
                {/* <Box>Owner</Box> */}
              </UserDesc>
            </Flex>

            <Box>
              <Bio>{data[3]}</Bio>
            </Box>
          </UserInfo>
        </>
      )}
    </Container>
  );
};

const Container = styled(Box)`
  flex: 1;
`;
const UserInfo = styled(Box)`
  background: #1c1c1e;
  padding: 15px 18px;
  border-radius: 8px;
`;
const UserDesc = styled(Center)`
  color: #fff;
  font-size: 20px;
  font-weight: 800;
`;
const Bio = styled(Box)`
  margin-top: 12px;
  font-size: 16px;
  font-size: 16px;
`;
