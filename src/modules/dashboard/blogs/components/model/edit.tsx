import { GNFD_CHAINID } from '@/env';
import { StyledButton } from '@/modules/dashboard/components/modals/forms';
import { useUpdateObject } from '@/shared/hooks/gnfd/useUpdateObject';
import {
  Box,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Select,
  Stack,
} from '@chakra-ui/react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import styled from '@emotion/styled';
import { useFormik } from 'formik';
import { ObjectMeta } from 'node_modules/@bnb-chain/greenfield-js-sdk/dist/esm/types/sp/Common';
import { useAccount, useSwitchChain } from 'wagmi';

interface IProps {
  bucketName: string;
  objectInfo: ObjectMeta;
  onSuccess: () => void;
}

export const EditBlog = NiceModal.create<IProps>(({ bucketName, objectInfo, onSuccess }) => {
  const { address } = useAccount();
  const modal = useModal();
  const { switchChain } = useSwitchChain();
  const { mutateAsync: updateObject, isPending } = useUpdateObject();

  const editFormik = useFormik({
    initialValues: {
      visible: objectInfo.ObjectInfo.Visibility,
    },
    onSubmit: async (values) => {
      // console.log('values', values);
      switchChain?.({
        chainId: GNFD_CHAINID,
      });
      if (!address) return;

      const res = await updateObject({
        bucketName,
        objectName: objectInfo.ObjectInfo.ObjectName,
        visibility: Number(values.visible),
        addr: address,
      });

      onSuccess?.();
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
          <Stack>
            <Box as="form" onSubmit={editFormik.handleSubmit}>
              <FormControl mt="16px">
                <StyledFormLabel>Visibility</StyledFormLabel>
                <Select
                  name="visible"
                  // placeholder="Select Visibility"
                  value={editFormik.values.visible}
                  onChange={editFormik.handleChange}
                >
                  <option value={1}>Public</option>
                  <option value={2}>Private</option>
                </Select>
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
                  disabled={!isPending}
                  isLoading={isPending}
                >
                  Change Visibility
                </StyledButton>
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
