import { GNFD_CHAINID } from '@/env';
import { useDeleteBucket } from '@/shared/hooks/gnfd/useDeleteBucket';
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useFormik } from 'formik';
import { BucketMetaWithVGF } from 'node_modules/@bnb-chain/greenfield-js-sdk/dist/esm/types/sp/Common';
import { useAccount, useSwitchChain } from 'wagmi';
import { StyledButton } from '../forms';

interface IProps {
  bucketInfo: BucketMetaWithVGF['BucketInfo'];
  onSuccess: () => void;
}

export const DeleteRepo = NiceModal.create<IProps>(({ bucketInfo, onSuccess }) => {
  const { address } = useAccount();
  const modal = useModal();
  const { switchChain } = useSwitchChain();
  const { mutateAsync: deleteBucket, isPending } = useDeleteBucket();

  const deleteFormik = useFormik({
    initialValues: {
      visible: bucketInfo.Visibility,
    },
    onSubmit: async (values) => {
      // console.log('values', values);
      switchChain?.({
        chainId: GNFD_CHAINID,
      });
      if (!address) return;

      const res = await deleteBucket({
        bucketName: bucketInfo.BucketName,
        address,
      });

      if (res.code === 0) {
        onSuccess?.();
      }
    },
  });

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
          <ModalHeader color="#CA1414" textAlign="center">
            <Text fontSize="20px">Delete Repo</Text>
          </ModalHeader>
          <Box as="form" onSubmit={deleteFormik.handleSubmit}>
            <Text fontSize="18px" textAlign="center">
              Are you sure to delete this repo?
            </Text>

            <ModalFooter gap="20px" justifyContent="center" mt="20px">
              <StyledButton
                type="submit"
                bg="hsla(259, 100%, 62%, 1)"
                _hover={{
                  bg: 'hsla(259, 100%, 62%, 0.8)',
                }}
                _active={{
                  bg: 'hsla(259, 100%, 58%, 0.6)',
                }}
                disabled={!isPending}
                isLoading={isPending}
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
                onClick={modal.hide}
              >
                Cancel
              </StyledButton>
            </ModalFooter>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});
