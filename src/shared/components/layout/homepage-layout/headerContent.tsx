import { useMedia } from '@/shared/hooks/useMedia';
import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRef } from 'react';

const NAVS = [
  {
    title: 'Docs',
    href: 'https://docs.codexfield.com/',
  },
  {
    title: 'Github',
    href: 'https://github.com/codexfield',
  },
  {
    title: 'Twitter',
    href: 'https://twitter.com/CodexField',
  },
  {
    title: 'Community',
    href: 'https://t.me/CodexField',
  },
];

const HeaderContent = () => {
  const media = useMedia();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  return (
    <Flex alignItems={'center'} justifyContent={'end'} flex="1">
      {media === 'PC' ? (
        <>
          {NAVS.map((nav) => (
            <NavText target="_blank" href={nav.href} key={nav.title}>
              <Text fontWeight="900">{nav.title}</Text>
            </NavText>
          ))}
        </>
      ) : (
        <>
          <IconButton
            variant="unstyled"
            ref={btnRef}
            onClick={onOpen}
            icon={<HamburgerIcon boxSize="24px" />}
            aria-label={'open menu'}
          />
          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
            size="full"
          >
            <DrawerOverlay />
            <DrawerContent bg="rgba(0,0,0,0.9)" py="100px">
              <DrawerCloseButton />

              <DrawerBody p="0">
                <Box borderTop="1px solid #FFF" mx="24px">
                  {NAVS.map((nav) => (
                    <Box key={nav.title} py="32px" borderBottom="1px solid #FFF">
                      <NavText target="_blank" href={nav.href}>
                        <Text fontWeight="900">{nav.title}</Text>
                      </NavText>
                    </Box>
                  ))}
                </Box>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      )}
    </Flex>
  );
};

export default HeaderContent;

const NavText = styled(Link)`
  font-size: 24px;
  @media (min-width: ${(props: any) => props.theme.breakpoints.md}) {
    font-size: 20px;
    margin-right: 45px;
  }
  font-weight: 600;
  color: #fff;
`;
