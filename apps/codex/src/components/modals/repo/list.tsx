import { createGroup } from '@/apis/createGroup';
import { mirrorGroup } from '@/apis/mirrorGroup';
import { policyBucket } from '@/apis/policyBucket';
import { GreenfieldClient } from '@/config/GnfsClient';
import {
  Box,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import styled from '@emotion/styled';
import { useFormik } from 'formik';
import { BucketMetaWithVGF } from 'node_modules/@bnb-chain/greenfield-js-sdk/dist/esm/types/sp/Common';
import { useMemo, useState } from 'react';
import { formatEther, parseEther } from 'viem';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';
import { StyledButton, StyledInput } from '../forms';
import { BSC_CHAIN, GNFD_CHAINID } from '@/env';
import { useList } from '@/hooks/contract/useList';
import { useHeadGroup } from '@/hooks/gnfd/useHeadGroup';
import { getGroupInfo } from '@/apis/getGroupInfo';

interface IProps {
  bucketInfo: BucketMetaWithVGF['BucketInfo'];
  onSuccess: () => void;
}

export const ListRepo = NiceModal.create<IProps>(({ bucketInfo, onSuccess }) => {
  const { address } = useAccount();
  const modal = useModal();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const groupName = `CodeX-b-${bucketInfo.BucketName}` + 'v1';

  const [groupId, setGroupId] = useState(0);
  const listFormik = useFormik({
    initialValues: {
      price: '',
      desc: '',
    },
    onSubmit: async (values, { setFieldValue }) => {
      // console.log('values', values);
      if (!address) return;

      // const { groupInfo } = await getGroupInfo(groupName, address);

      // if (groupInfo) {
      //   alert('group already exists');
      //   return;
      // }

      // await handleInitList();

      // switchNetwork?.(BSC_CHAIN.id);

      // await handleList();

      console.log('doList', write, isLoading, isRightChain);
      write?.();
    },
  });

  const { write, isLoading, isRightChain } = useList(
    {
      groupId: BigInt(groupId),
      price: BigInt(listFormik.values.price),
    },
    () => {
      alert('success');
    },
    () => {},
  );

  const handleInitList = async () => {
    if (!address) return;

    const { price, desc } = listFormik.values;

    // console.log('handleInitList', { groupName, extra });
    const extra = JSON.stringify({
      desc: desc,
      price: price ? parseEther(price).toString() : '0',
    });

    const createTx = await createGroup({
      creator: address,
      extra,
      groupName,
    });

    const mirrorTx = await mirrorGroup(groupName, '0', address);

    const policyBucketTx = await policyBucket(address, bucketInfo.BucketName, groupName);

    const multiTx = await GreenfieldClient.txClient.multiTx([createTx, mirrorTx, policyBucketTx]);

    const simulateInfo = await multiTx.simulate({
      denom: 'BNB',
    });

    return await multiTx.broadcast({
      denom: 'BNB',
      gasLimit: Number(simulateInfo.gasLimit) * 2,
      gasPrice: simulateInfo.gasPrice,
      payer: address as string,
      granter: '',
    });
  };

  const handleList = async () => {
    if (!address) return;

    const { groupInfo } = await GreenfieldClient.group.headGroup(groupName, address);

    console.log('groupInfo', groupInfo);
    if (!groupInfo) return;

    const { id } = groupInfo;
    let { extra } = groupInfo;

    extra = JSON.parse(extra);
    const { price } = extra as any;

    setGroupId(parseInt(id));
  };

  // useList({
  //   groupId: '',
  //   price: listData.extra.pr
  // });

  // console.log('listFormik', listFormik.values);

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
            <Box as="form" onSubmit={listFormik.handleSubmit}>
              <FormControl mt="16px">
                <StyledFormLabel>GroupName</StyledFormLabel>
                <StyledInput disabled value={groupName} />
              </FormControl>
              <FormControl mt="16px">
                <StyledFormLabel>Price</StyledFormLabel>
                <StyledInput
                  name="price"
                  placeholder="price"
                  value={listFormik.values.price}
                  onChange={listFormik.handleChange}
                />
              </FormControl>
              <FormControl mt="16px">
                <StyledFormLabel>Description</StyledFormLabel>
                <StyledInput
                  name="desc"
                  placeholder="repo description"
                  value={listFormik.values.desc}
                  onChange={listFormik.handleChange}
                />
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
                  // disabled={!isLoading || !headGroupLoading || !isPending}
                  // isLoading={isLoading || headGroupLoading || isPending}
                >
                  list
                </StyledButton>

                {chain?.id === GNFD_CHAINID && (
                  <StyledButton
                    type="submit"
                    bg="hsla(259, 100%, 62%, 1)"
                    _hover={{
                      bg: 'hsla(259, 100%, 62%, 0.8)',
                    }}
                    _active={{
                      bg: 'hsla(259, 100%, 58%, 0.6)',
                    }}
                    // disabled={!isLoading || !headGroupLoading || !isPending}
                    // isLoading={isLoading || headGroupLoading || isPending}
                  >
                    list
                  </StyledButton>
                )}

                {chain?.id === BSC_CHAIN.id && (
                  <StyledButton
                    bg="hsla(259, 100%, 62%, 1)"
                    _hover={{
                      bg: 'hsla(259, 100%, 62%, 0.8)',
                    }}
                    _active={{
                      bg: 'hsla(259, 100%, 58%, 0.6)',
                    }}
                    onClick={() => {
                      switchNetwork?.(GNFD_CHAINID);
                    }}
                  >
                    Switch to Greenfield
                  </StyledButton>
                )}
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
