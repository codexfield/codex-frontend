import { NewRepo } from '@/modules/dashboard/components/NewRepo';
import { RegisterModal } from '@/modules/dashboard/components/modals/users/register';
import { Side } from '@/shared/components/Side';
import { useGetAccountDetails } from '@/shared/hooks/contract/useGetAccountDetails';
import { useIsMounted } from '@/shared/hooks/useIsMounted';
import { Box, Button, Flex, HStack, Stack } from '@chakra-ui/react';
import NiceModal from '@ebay/nice-modal-react';
import styled from '@emotion/styled';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAccount } from 'wagmi';

interface IPorps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<IPorps> = ({ children }) => {
  const router = useRouter();
  const { address } = useAccount();
  const { data: userInfo, isError, isLoading } = useGetAccountDetails(address);
  const userIsRegister = userInfo !== undefined && userInfo.id !== BigInt(0);

  const isActiveUrl = (url: string) => router.pathname === url;

  return (
    <Flex gap="20px" w="1360px" ml="auto" mr="auto">
      <Stack gap="40px">
        <Flex justifyContent="space-between">
          <HStack
            sx={{
              '.active': {
                color: '#FFF',
                fontWeight: 800,
              },
            }}
          >
            <TabTitle
              as={NextLink}
              shallow
              href="/dashboard"
              className={isActiveUrl('/dashboard') && 'active'}
            >
              My Repos
            </TabTitle>
            <TabTitle
              as={NextLink}
              shallow
              href="/dashboard/blogs"
              className={isActiveUrl('/dashboard/blogs') && 'active'}
            >
              My Posts
            </TabTitle>
          </HStack>

          {router.pathname === '/dashboard' && (
            <React.Fragment>
              {userIsRegister ? (
                <NewRepo />
              ) : (
                <RegisterButton
                  color="#FFF"
                  _hover={{
                    bg: 'rgba(122, 60, 255, 0.8)',
                  }}
                  _disabled={{
                    bg: '#1E1E1E',
                    color: '#5F5F5F',
                    boxShadow: 'none',
                  }}
                  onClick={() => NiceModal.show(RegisterModal)}
                >
                  Register
                </RegisterButton>
              )}
            </React.Fragment>
          )}
        </Flex>

        <Box w="960px">{children}</Box>
      </Stack>

      <Side address={address} />
    </Flex>
  );
};

const TabTitle = styled(Box)`
  font-size: 24px;
  color: #5f5f5f;
`;

const RegisterButton = styled(Button)`
  font-size: 14px;
  background: #7a3cff;
  box-shadow: 0px 0px 51.6px 0px #874eff, 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  height: 30px;
  border-radius: 10px;
`;
