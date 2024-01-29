import { useRegister } from '@/hooks/contract/useRegister';
import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { FormikProps, useFormik } from 'formik';
import { useCallback } from 'react';
import { useAccount, useSwitchNetwork } from 'wagmi';
import { StyledButton, StyledInput } from '../../forms';
import { fullFormRegistModal } from './fullForm';
import { BSC_CHAIN } from '@/env';
import { useGetAccountDetails } from '@/hooks/contract/useGetAccountDetails';

export const RegisterModal = NiceModal.create(() => {
  const toast = useToast();
  const modal = useModal();
  const { address } = useAccount();
  const { switchNetwork } = useSwitchNetwork();
  const { refetch: refetchAccountDetails } = useGetAccountDetails(address);

  const registerFormik: FormikProps<IRegister> = useFormik<IRegister>({
    initialValues: {
      name: '',
      avatar: '',
      bio: '',
      company: '',
      location: '',
      website: '',
      socialAccounts: [],
    },
    onSubmit: (values) => {
      switchNetwork?.(BSC_CHAIN.id);
      write?.();
    },
  });

  const onSuccess = useCallback(() => {
    modal.hide();
    refetchAccountDetails();
  }, [modal, refetchAccountDetails]);

  const onError = useCallback(
    (error: Error | null) => {
      toast({
        title: 'Error',
        description: error?.message.split('\n')[0],
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
    [toast],
  );

  const { write, isLoading, isRightChain } = useRegister(
    address as `0x{string}`,
    registerFormik.values,
    onSuccess,
    onError,
  );

  return (
    <Modal isCentered isOpen={modal.visible} onClose={() => {}} size={'md'}>
      <ModalOverlay backdropFilter="blur(7px)" boxShadow="0px 14px 40px 0px #000" />
      <ModalContent
        bg="#1C1C1E"
        borderRadius="10px"
        border="1px solid rgba(255, 255, 255, 0.15)"
        pt="40px"
        pb="40px"
      >
        <ModalHeader textAlign="center" fontSize="20px" fontWeight={700} color="#A276FF" p="0">
          How to call you?
        </ModalHeader>

        <ModalBody pl="70px" pr="70px">
          <Box as="form" onSubmit={registerFormik.handleSubmit} mt="40px">
            <StyledInput
              name="name"
              placeholder="Type a nickname"
              value={registerFormik.values.name}
              onChange={registerFormik.handleChange}
            />

            <Box mt="40px">
              <Flex direction="column" gap="8px">
                <StyledButton
                  type="submit"
                  bg="hsla(259, 100%, 62%, 1)"
                  _hover={{
                    bg: 'hsla(259, 100%, 62%, 0.8)',
                  }}
                  _active={{
                    bg: 'hsla(259, 100%, 58%, 0.6)',
                  }}
                  disabled={!write || isLoading}
                  isLoading={isLoading}
                >
                  {isRightChain ? 'Name only' : 'Switch Network'}
                </StyledButton>

                <StyledButton
                  bg="hsla(130, 94%, 26%, 1)"
                  _hover={{
                    bg: 'hsla(130, 94%, 26%, 0.8)',
                  }}
                  _active={{
                    bg: 'hsla(130, 94%, 26%, 0.6)',
                  }}
                  onClick={() => {
                    NiceModal.show(fullFormRegistModal);
                  }}
                  disabled={!write || isLoading}
                  isLoading={isLoading}
                >
                  Complete your profile
                </StyledButton>
              </Flex>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});
