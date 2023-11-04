import {Box, Flex, Text} from '@chakra-ui/react'
import styled from '@emotion/styled';
// import { useWalletModal } from '../../hooks/useWalletModal';
import Logo from '../../images/logo.png';


import {
  ForwardedRef,
  ReactNode,
  forwardRef,
  useCallback,
  useState,
  useRef,
} from 'react';
import { useAccount, useDisconnect, useSwitchNetwork, useNetwork } from 'wagmi';
import { useRouter } from 'next/router';
import Link from 'next/link';



const Header = () => {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const { address, isConnecting, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  // const { handleModalOpen } = useWalletModal();
  const handleShowDropDown = useCallback(() => {
    setDropDownOpen((preState) => !preState);
  }, []);
  const ref = useRef(null);

  // useOutsideClick({
  //   ref,
  //   handler: () => {
  //     if (dropDownOpen) {
  //       setTimeout(() => {
  //         setDropDownOpen(false);
  //       }, 50);
  //     }
  //   },
  // });

  // const navigate = useNavigate();
  // const { onClose, onToggle } = useDisclosure();
  const { switchNetwork } = useSwitchNetwork();

  const { chain } = useNetwork();

  const router = useRouter()

  return (
    <HeaderFlex
      justifyContent={'space-between'}
      alignItems={'center'}
      padding={'0px 24px 0'}
      height={80}
      left="0"
      right="0"
    >
      
      <LeftCon gap={42} alignItems={'center'}>
        <Box>
          <img
            height="40"
            onClick={() => {
              router.push('/')
            }}
            src={Logo.src}
            alt="codex logo"
          />
        </Box>
      </LeftCon>

      <RightFunCon alignItems={'center'} justifyContent={'center'} gap={18}>
        <>
        
          <Link href="/explore">
            <Text fontWeight="900" fontSize="16" mr="45">
              Explore
            </Text>
          </Link>

          <Link href="/dashboard">
            <Text fontWeight="900" fontSize="16" mr="35">
              Dashboard
            </Text>
          </Link>
          {/* <Button
            onClick={() => {
              if (!isConnecting && !isConnected) handleModalOpen();
              navigate('/profile?tab=collections');
            }}
            variant="text"
          >
            List My Data
          </Button> */}
        </>
        {/* {address && (
          // <Menu placement="bottom-end">
          //   <MenuButton
          //     onClick={() => {
          //       onToggle();
          //     }}
          //     as={CustomMenuButton}
          //   >
          //     {chain && chain.id === BSC_CHAIN_ID
          //       ? 'BNB Smart Chain'
          //       : 'BNB Greenfield'}
          //   </MenuButton>
          //   <MenuList w={206}>
          //     <MenuItem
          //       icon={<BSCLogo />}
          //       onClick={() => {
          //         switchNetwork?.(BSC_CHAIN_ID);
          //         onClose();
          //       }}
          //     >
          //       BNB Smart Chain
          //     </MenuItem>
          //     <MenuItem
          //       icon={<BSCLogo />}
          //       onClick={() => {
          //         switchNetwork?.(GF_CHAIN_ID);
          //         onClose();
          //       }}
          //     >
          //       BNB Greenfield
          //     </MenuItem>
          //   </MenuList>
          // </Menu>
        )} */}
      </RightFunCon>
    </HeaderFlex>
  );
};

export default Header;

const HeaderFlex = styled(Flex)`
  position: fixed;
  z-index: 100;
  font-size: 15px;
  background-color: rgba(0,0,0,0.25);
  /* border-bottom: 1px #2f3034 solid; */
`;
const LeftCon = styled(Flex)`
  img {
    /* width: 268px; */
    height: 40px;
    cursor: pointer;
  }
`;

const ButtonWrapper = styled.div`
  position: relative;
`;

const DropDown = styled.div`
  position: absolute;
  top: calc(100% - 4px);
  right: 0;
  margin-top: 4px;
  border-radius: 12px;
  width: 300px;
  height: 330px;
  background: ${(props: any) => props.theme.colors.bg?.middle};
  box-shadow: ${(props: any) => props.theme.shadows.normal};
  z-index: 11;
`;

const AddressWrapper = styled.div`
  padding: 12px;
  margin-top: 46px;
`;

const Address = styled(Flex)`
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const Disconnect = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  text-align: left;
  padding: 8px 12px;
  border-radius: 8px;
  &:hover {
    cursor: pointer;
    background: ${(props: any) => props.theme.colors.bg.bottom};
  }
`;

const ProfileWrapper = styled(Flex)`
  align-items: center;
  gap: 10px;
`;

const Profile = styled(Flex)`
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  border: 1px solid ${(props: any) => props.theme.colors.readable.border};
`;

const ImageWrapper = styled(Flex)`
  position: absolute;
  justify-content: center;
  align-items: center;
  top: 62px;
  right: 50%;
  transform: translateX(50%);
  background: ${(props: any) => props.theme.colors.bg.middle};
  width: 68px;
  height: 68px;
  border-radius: 50%;
`;

const MenuElement = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  text-align: left;
  padding: 8px 12px;
  border-radius: 8px;
  &:hover {
    cursor: pointer;
    background: ${(props: any) => props.theme.colors.bg.bottom};
  }
`;

const RightFunCon = styled(Flex)``;

const ConnectProfile = styled(Flex)`
  align-items: center;
  cursor: pointer;
  width: 100%;
  max-width: 158px;
  height: 44px;
  font-family: Space Grotesk;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  border-radius: 200px;
  border: 1px solid ${(props: any) => props.theme.colors.readable.border};
  &:hover {
    background: ${(props: any) => props.theme.colors.read?.normal};
  }
`;