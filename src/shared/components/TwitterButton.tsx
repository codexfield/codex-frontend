import { useQueryUser } from '@/modules/airdrop/hooks/useQueryUser';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Box, Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useAccount } from 'wagmi';
import { TwitterIcon } from '../icons/TwitterIcon';

export const TwitterButton = () => {
  const { address } = useAccount();
  const { data: userInfo } = useQueryUser(address);

  if (!userInfo?.result) {
    return null;
  }

  const hasRefUser = userInfo.result.reference.telegram_name !== '';

  return (
    <Menu placement="bottom-end">
      <MenuButton
        variant="unstyled"
        as={Button}
        h="46px"
        lineHeight="46px"
        px="15px"
        fontWeight="500"
        color="#FFF"
        fontSize="16px"
        bg="#1e1e1e"
        borderRadius="12px"
        _hover={{
          bg: '#333',
        }}
        leftIcon={<TwitterIcon />}
        rightIcon={hasRefUser ? <ChevronDownIcon /> : <></>}
        sx={{
          '.chakra-button__icon': {
            verticalAlign: '-2px',
          },
        }}
      >
        @ {userInfo?.result.user.twitter_name}
      </MenuButton>
      {hasRefUser && (
        <MenuList bg="#1E1E1E" border="none">
          <MenuItem h="56px" bg="#1E1E1E">
            <Box>
              Invited by <Box as="span">{userInfo.result.reference.telegram_name}</Box>
            </Box>
          </MenuItem>
        </MenuList>
      )}
    </Menu>
  );
};
