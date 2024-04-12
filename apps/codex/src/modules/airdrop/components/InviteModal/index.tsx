import { StyledButton } from '@/modules/dashboard/components/modals/forms';
import {
  Box,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  PinInput,
  PinInputField,
  Text,
} from '@chakra-ui/react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface IProps {
  // bucketInfo: BucketMetaWithVGF['BucketInfo'];
  // onSuccess: () => void;
}

export const InviteModal = NiceModal.create<IProps>(() => {
  const modal = useModal();
  const router = useRouter();
  const [code, setCode] = useState('');

  const handleSkip = () => {
    modal.hide();
  };

  const handleOk = () => {
    router.push({
      ...router,
      query: {
        ...router.query,
        code,
      },
    });
    modal.hide();
  };

  return (
    <Modal
      isCentered
      isOpen={modal.visible}
      onClose={() => {
        modal.hide();
      }}
      size="2xl"
    >
      <ModalOverlay backdropFilter="blur(7px)" boxShadow="0px 14px 40px 0px #000" />
      <ModalContent
        bg="#1C1C1E"
        borderRadius="10px"
        border="1px solid rgba(255, 255, 255, 0.15)"
        pt="40px"
        pb="40px"
      >
        <ModalCloseButton />
        <ModalBody pl="70px" pr="70px">
          <ModalHeader textAlign="center">
            <Text fontSize="32px">Invitation Code</Text>
          </ModalHeader>
          <Box /* as="form" onSubmit={deleteFormik.handleSubmit} */ fontWeight="bold">
            <Text fontSize="16px" textAlign="center">
              You will{' '}
              <Text
                bgClip="text"
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                as="span"
                fontSize="24px"
                mx="5px"
                verticalAlign="-2px"
              >
                20% boost
              </Text>
              get on your rewards by using a invitation code
            </Text>

            <HStack my="56px" justifyContent="center" gap="44px">
              <PinInput size="lg" type="alphanumeric" onChange={setCode}>
                <CodexPinInputField />
                <CodexPinInputField />
                <CodexPinInputField />
                <CodexPinInputField />
                <CodexPinInputField />
                <CodexPinInputField />
              </PinInput>
            </HStack>

            <ModalFooter gap="20px" justifyContent="center" mt="20px">
              <StyledButton
                // type="submit"
                bg="hsla(259, 100%, 62%, 1)"
                _hover={{
                  bg: 'hsla(259, 100%, 62%, 0.8)',
                }}
                _active={{
                  bg: 'hsla(259, 100%, 58%, 0.6)',
                }}
                // disabled={!isPending}
                // isLoading={isPending}
                onClick={handleOk}
              >
                Confirm
              </StyledButton>
              <StyledButton
                variant="outline"
                _hover={{
                  bg: 'hsla(259, 100%, 62%, 0.8)',
                }}
                _active={{
                  bg: 'hsla(259, 100%, 58%, 0.6)',
                }}
                onClick={handleSkip}
              >
                Skip
              </StyledButton>
            </ModalFooter>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});

const CodexPinInputField = styled(PinInputField)`
  height: 70px;
  width: 56px;
  font-size: 36px;
  font-weight: bold;
  border: 1px solid #5f5f5f;
`;
