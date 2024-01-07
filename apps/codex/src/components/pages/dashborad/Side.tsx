import { EditAccountModal } from '@/components/modals/edit';
import { CustomAvatar } from '@/components/ui/avatars';
import { useGetAccountDetails } from '@/hooks/contract/useGetAccountDetails';
import { useIsMounted } from '@/hooks/useIsMounted';
import { CompanyIcon } from '@/icons/CompanyIcon';
import { LocationIcon } from '@/icons/LocationIcon';
import { LinkIcon } from '@chakra-ui/icons';
import { Box, Button, Center, Flex, Link, Spinner, VStack } from '@chakra-ui/react';
import NiceModal from '@ebay/nice-modal-react';
import styled from '@emotion/styled';
import { useAccount } from 'wagmi';

export const Side = () => {
  const { address } = useAccount();
  const isMounted = useIsMounted();
  const { data: userInfo, isError, isLoading } = useGetAccountDetails(address);

  const showEditAccountModal = () => {
    NiceModal.show(EditAccountModal);
  };

  if (!isMounted) return null;

  return (
    <Container>
      {!isLoading && userInfo && (
        <>
          <UserInfo>
            <Box>
              {address && (
                <Box>
                  <CustomAvatar address={address} size={128} />
                </Box>
              )}
            </Box>
            <UserDesc>
              <Box>{userInfo.name}</Box>
            </UserDesc>
            <Box color="#5F5F5F" fontSize="20px" mt="10px">
              ID: {String(userInfo.id)}
            </Box>

            <Box mt="26px">
              <Button
                w="100%"
                borderRadius="10px"
                border="1px solid rgba(255, 255, 255, 0.15);"
                bg="rgba(30, 30, 30, 1)"
                boxShadow="0px 4px 6px 0px rgba(0, 0, 0, 0.25);"
                color="#FFF"
                fontSize="14px"
                _hover={{
                  bg: 'rgba(30, 30, 30, 0.8)',
                }}
                onClick={showEditAccountModal}
              >
                Edit Profile
              </Button>
            </Box>

            <Follow alignItems="center">
              <Box>
                <Box as="span">{String(userInfo.followingNumber)}</Box>
                Following
              </Box>
              <Box>
                <Box as="span">{String(userInfo.followerNumber)}</Box>
                Followers
              </Box>
            </Follow>

            <Bio>{userInfo.bio}</Bio>

            <VStack mt="10px" gap="12px" alignItems="flex-start">
              <Compony>
                <CompanyIcon mt="4px" />
                {userInfo.company && <Box>{userInfo.company}</Box>}
              </Compony>
              <Website>
                <LinkIcon mt="4px" />
                {userInfo.website && (
                  <Link href={userInfo.website} target="_blank" rel="noreferrer" color="#A276FF">
                    {userInfo.website}
                  </Link>
                )}
              </Website>
              <Location>
                <LocationIcon mt="4px" />
                {userInfo.location && <Box>{userInfo.location}</Box>}
              </Location>
            </VStack>
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
  /* background: #1c1c1e; */
  padding: 15px 18px;
  border-radius: 8px;
`;
const UserDesc = styled(Box)`
  margin-top: 20px;
  color: #fff;
  font-size: 32px;
  font-weight: 800;
`;

const Follow = styled(Flex)`
  margin-top: 12px;
  gap: 32px;
  font-size: 20px;
  color: #5f5f5f;

  & span {
    color: #a276ff;
    margin-right: 6px;
  }
`;

const Bio = styled(Box)`
  margin-top: 12px;
  font-size: 16px;
  font-size: 20px;
  line-height: 1.6;
`;

const InfoItem = `
  align-items: center;
  gap: 6px;
  font-size: 20px;
`;

const Website = styled(Flex)`
  ${InfoItem}
`;

const Location = styled(Flex)`
  ${InfoItem}
`;

const Compony = styled(Flex)`
  ${InfoItem}
`;
