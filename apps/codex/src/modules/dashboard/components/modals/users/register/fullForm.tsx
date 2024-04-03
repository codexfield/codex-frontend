import { useRegister } from '@/shared/hooks/contract/useRegister';
import { CompanyIcon } from '@/shared/icons/CompanyIcon';
import { LocationIcon } from '@/shared/icons/LocationIcon';
import { WebsiteIcon } from '@/shared/icons/WebSiteIcon';
import {
  Box,
  FormControl,
  FormLabel,
  InputGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
  useToast,
} from '@chakra-ui/react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import styled from '@emotion/styled';
import { useFormik } from 'formik';
import { useCallback } from 'react';
import { useAccount, useSwitchNetwork } from 'wagmi';
import { RegisterModal } from '.';
import { StyleTextarea, StyledButton, StyledInput, StyledInputElement } from '../../forms';
import { BSC_CHAIN } from '@/env';

export const fullFormRegistModal = NiceModal.create(() => {
  const toast = useToast();
  const modal = useModal();
  const { address } = useAccount();
  const { switchNetwork } = useSwitchNetwork();

  const registerFormik = useFormik({
    initialValues: {
      account: '',
      name: '',
      avatar: '',
      bio: '',
      company: '',
      location: '',
      website: '',
      socialAccounts: [''],
    },
    onSubmit: (values) => {
      switchNetwork?.(BSC_CHAIN.id);
      write?.();
    },
  });

  const onSuccess = useCallback(() => {
    modal.hide();
    NiceModal.hide(RegisterModal);
  }, [modal]);

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
    <Modal isCentered isOpen={modal.visible} onClose={() => {}} size="2xl">
      <ModalOverlay backdropFilter="blur(7px)" boxShadow="0px 14px 40px 0px #000" />
      <ModalContent
        bg="#1C1C1E"
        borderRadius="10px"
        border="1px solid rgba(255, 255, 255, 0.15)"
        pt="40px"
        pb="40px"
      >
        <ModalBody pl="70px" pr="70px">
          <Stack>
            <Box as="form" onSubmit={registerFormik.handleSubmit}>
              <FormControl mt="16px">
                <StyledFormLabel>Paste image link for avatar</StyledFormLabel>
                <StyledInput
                  name="avatar"
                  type="url"
                  placeholder="https://"
                  onChange={registerFormik.handleChange}
                />
              </FormControl>
              <FormControl mt="16px">
                <StyledFormLabel>Name</StyledFormLabel>
                <StyledInput
                  type="text"
                  name="name"
                  placeholder="Kick"
                  onChange={registerFormik.handleChange}
                />
              </FormControl>
              <FormControl mt="16px">
                <StyledFormLabel>Bio</StyledFormLabel>
                <StyleTextarea
                  name="bio"
                  type="text"
                  placeholder="Add a bio"
                  onChange={registerFormik.handleChange}
                />
              </FormControl>
              <FormControl mt="16px">
                <InputGroup>
                  <StyledInputElement>
                    <CompanyIcon fill="#1e1e1e" />
                  </StyledInputElement>
                  <StyledInput
                    name="company"
                    type="text"
                    placeholder="Company"
                    pl="3em"
                    onChange={registerFormik.handleChange}
                  />
                </InputGroup>
              </FormControl>
              <FormControl mt="16px">
                <InputGroup>
                  <StyledInputElement>
                    <LocationIcon fill="#1e1e1e" />
                  </StyledInputElement>
                  <StyledInput
                    name="location"
                    type="text"
                    placeholder="Location"
                    pl="3em"
                    onChange={registerFormik.handleChange}
                  />
                </InputGroup>
              </FormControl>
              <FormControl mt="16px">
                <InputGroup>
                  <StyledInputElement>
                    <WebsiteIcon fill="#1e1e1e" />
                  </StyledInputElement>
                  <StyledInput
                    name="website"
                    type="text"
                    placeholder="Website"
                    pl="3em"
                    onChange={registerFormik.handleChange}
                  />
                </InputGroup>
              </FormControl>
              <FormControl mt="16px">
                <StyledFormLabel>Social accounts</StyledFormLabel>
                <Stack gap="4px">
                  <InputGroup>
                    <StyledInputElement>
                      <WebsiteIcon fill="#1e1e1e" />
                    </StyledInputElement>
                    <StyledInput
                      name="socialAccounts[0]"
                      type="text"
                      placeholder="Website"
                      pl="3em"
                      onChange={registerFormik.handleChange}
                    />
                  </InputGroup>
                  <InputGroup>
                    <StyledInputElement>
                      <WebsiteIcon fill="#1e1e1e" />
                    </StyledInputElement>
                    <StyledInput
                      name="socialAccounts[1]"
                      type="text"
                      placeholder="Website"
                      pl="3em"
                      onChange={registerFormik.handleChange}
                    />
                  </InputGroup>
                  <InputGroup>
                    <StyledInputElement>
                      <WebsiteIcon fill="#1e1e1e" />
                    </StyledInputElement>
                    <StyledInput
                      name="socialAccounts[2]"
                      type="text"
                      placeholder="Website"
                      pl="3em"
                      onChange={registerFormik.handleChange}
                    />
                  </InputGroup>
                  <InputGroup>
                    <StyledInputElement>
                      <WebsiteIcon fill="#1e1e1e" />
                    </StyledInputElement>
                    <StyledInput
                      name="socialAccounts[3]"
                      type="text"
                      placeholder="Website"
                      pl="3em"
                      onChange={registerFormik.handleChange}
                    />
                  </InputGroup>
                </Stack>
              </FormControl>

              <Stack mt="12px">
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
                  {isRightChain ? 'Register' : 'Switch Network'}
                </StyledButton>

                <Box
                  textAlign="center"
                  as="a"
                  href="#"
                  fontSize="16px"
                  color="#5F5F5F"
                  _hover={{
                    color: '#9f9f9f',
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    modal.hide();
                    NiceModal.show(RegisterModal);
                  }}
                >
                  Back
                </Box>
              </Stack>
            </Box>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});

const StyledFormLabel = styled(FormLabel)`
  font-size: 16px;
  font-weight: 700;
  color: #d9d9d9;
`;
