import { Box, Flex } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { CustomAvatar } from './avatars';
import { HConnectButton } from './button';

export const CustomConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted;
        const connected = ready && account && chain;

        // console.log('chain', chain);

        return (
          <Box
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <HConnectButton onClick={openConnectModal} type="button">
                    Connect Wallet
                  </HConnectButton>
                );
              }

              if (chain.unsupported) {
                return (
                  <HConnectButton onClick={openChainModal} type="button">
                    Wrong network
                  </HConnectButton>
                );
              }

              return (
                <div style={{ display: 'flex', gap: 12 }}>
                  <Flex>
                    {/* <HConnectButton
                      pl="0"
                      borderRadius="23px"
                      onClick={openChainModal}
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      {chain.hasIcon && (
                        <Box
                          style={{
                            background: chain.iconBackground,
                            width: 42,
                            height: 42,
                            borderRadius: 999,
                            overflow: 'hidden',
                            marginRight: 4,
                          }}
                        >
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? 'Chain icon'}
                              src={chain.iconUrl}
                              style={{ width: 42, height: 42 }}
                            />
                          )}
                        </Box>
                      )}

                      <Box ml="11px">
                        {chain.name}
                      </Box>
                    </HConnectButton> */}
                  </Flex>

                  <HConnectButton
                    borderRadius="12px"
                    pl="35px"
                    pr="35px"
                    onClick={openAccountModal}
                    type="button"
                  >
                    {account.displayName}
                    {/* {account.displayBalance ? ` (${account.displayBalance})` : ''} */}
                  </HConnectButton>

                  <CustomAvatar address={account.address} size={46} />
                </div>
              );
            })()}
          </Box>
        );
      }}
    </ConnectButton.Custom>
  );
};
