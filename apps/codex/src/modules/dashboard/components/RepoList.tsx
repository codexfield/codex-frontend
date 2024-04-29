import { NewRepo } from '@/modules/dashboard/components/NewRepo';
import { SharePopver } from '@/modules/repo/components/ShareRepo';
import { VisibilityBadge } from '@/shared/components/VisibilityBadge';
import { useGetAccountDetails } from '@/shared/hooks/contract/useGetAccountDetails';
import { useGetRepoList } from '@/shared/hooks/gnfd/useGetRepoList';
import { CanlanderIcon } from '@/shared/icons/CanlanderIcon';
import { MoreActionIcon } from '@/shared/icons/MoreActionIcon';
import { RepoIcon } from '@/shared/icons/RepoIcon';
import { DYMTimeAsObject, getRepoName } from '@/shared/utils';
import {
  Box,
  Center,
  Flex,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuItemProps,
  MenuList,
  Spinner,
  VStack,
} from '@chakra-ui/react';
import NiceModal from '@ebay/nice-modal-react';
import styled from '@emotion/styled';
import NextLink from 'next/link';
import { BucketMetaWithVGF } from 'node_modules/@bnb-chain/greenfield-js-sdk/dist/esm/types/sp/Common';
import { DeleteRepo } from './modals/repo/delete';
import { EditRepo } from './modals/repo/edit';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';
import { VisibilityType } from '@bnb-chain/greenfield-cosmos-types/greenfield/storage/common';

interface IProps {
  address?: `0x${string}`;
}

export const RepoList = (props: IProps) => {
  const router = useRouter();
  const { address } = props;
  const { address: accountAddress } = useAccount();
  const { data: repoList, isLoading, refetch: refetchRepoList } = useGetRepoList(address);

  // console.log('repoList', repoList);
  const { data: userInfo } = useGetAccountDetails(address as `0x${string}`);

  // const { data } = useGetUserListed({
  //   address,
  //   limit: 10n,
  //   offset: 0n,
  // });
  // console.log('data', data);

  const isOwner = accountAddress === address;

  const handleChangeVisibility = (repo: BucketMetaWithVGF) => {
    NiceModal.show(EditRepo, {
      bucketInfo: repo.BucketInfo,
      onSuccess: () => {
        refetchRepoList();
        NiceModal.hide(EditRepo);
      },
    });
  };

  const handleDeleteRepo = (repo: BucketMetaWithVGF) => {
    NiceModal.show(DeleteRepo, {
      bucketInfo: repo.BucketInfo,
      onSuccess: () => {
        refetchRepoList();
        NiceModal.hide(DeleteRepo);
      },
    });
  };

  return (
    <Box>
      {isLoading ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        <RepoListContainer
          background={`${
            repoList?.length !== 0 &&
            'linear-gradient(to right, transparent 14px, #5f5f5f 15px, transparent 1px)'
          }`}
        >
          {repoList?.length === 0 && (
            <Center p="40px">
              <VStack gap="20px">
                <Box as="h2" fontWeight="800" fontSize="20px">
                  Create Your First Repo
                </Box>
                <NewRepo />
              </VStack>
            </Center>
          )}
          {repoList &&
            userInfo &&
            repoList?.map((repo) => {
              const createdAt = DYMTimeAsObject(repo.BucketInfo.CreateAt);

              console.log('isOwner', isOwner);

              const isRepoPublic =
                repo.BucketInfo.Visibility === VisibilityType.VISIBILITY_TYPE_PUBLIC_READ;

              return (
                <Box key={repo.BucketInfo.BucketName} mb="20px">
                  <RepoDate>
                    <Box as="span" color="#FFF" mr="6px">
                      {createdAt.m} {createdAt.d}
                    </Box>
                    <Box as="span" color="#5F5F5F">
                      {createdAt.y}
                    </Box>
                  </RepoDate>
                  <Flex alignItems="center" gap="16px">
                    <Box>
                      <CanlanderIcon />
                    </Box>
                    <RepoItem
                      flex="1"
                      _hover={{
                        bg: '#282829',
                      }}
                    >
                      <Link
                        as={NextLink}
                        // href={isOwner ? `/repo/${repo?.BucketInfo?.BucketName}?type=tree` : '#'}
                        href="#"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isOwner || isRepoPublic) {
                            router.push(`/repo/${repo?.BucketInfo?.BucketName}?type=tree`);
                          }
                        }}
                        pointerEvents={isOwner || isRepoPublic ? 'auto' : 'none'}
                        display="flex"
                        padding="18px"
                        alignItems="center"
                        gap="6px"
                        flex={1}
                        _hover={{
                          textDecoration: 'none',
                        }}
                      >
                        <RepoIcon mr="8px" />
                        {getRepoName(repo.BucketInfo.BucketName, userInfo.id)}
                        <VisibilityBadge visibility={repo.BucketInfo?.Visibility || -1} />
                      </Link>

                      {repo.BucketInfo?.Visibility === 1 && (
                        <SharePopver
                          url={`${window.location.origin}/repo/${repo?.BucketInfo?.BucketName}?type=tree`}
                        />
                      )}

                      {isOwner && (
                        <Menu placement="bottom-end">
                          <MenuButton
                            as={IconButton}
                            icon={<MoreActionIcon />}
                            variant="unstyled"
                          />
                          <MenuList bg="#1C1C1E">
                            <StyledMenuItem
                              onClick={() => {
                                handleChangeVisibility(repo);
                              }}
                            >
                              Change Visibility
                            </StyledMenuItem>
                            {/* <StyledMenuItem
                            color="#CA1414"
                            onClick={() => {
                              handleDeleteRepo(repo);
                            }}
                          >
                            Delete Repo
                          </StyledMenuItem> */}
                            {/* <StyledMenuItem
                            onClick={() => {
                              handleListRepo(repo);
                            }}
                          >
                            List
                          </StyledMenuItem> */}
                          </MenuList>
                        </Menu>
                      )}
                    </RepoItem>
                  </Flex>
                </Box>
              );
            })}
        </RepoListContainer>
      )}
    </Box>
  );
};

const RepoListContainer = styled(Box)`
  border-radius: 8px;
  overflow: hidden;
`;

const RepoDate = styled(Box)`
  background-color: #000;
  font-size: 24px;
  font-weight: 600;
`;

const RepoItem = styled(Flex)`
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #1c1c1e;
  color: #a276ff;
  font-size: 16px;
  font-weight: 800;
  border: 1px solid #282829;
  align-items: center;
  justify-content: space-between;
  padding-right: 24px;
  border-radius: 8px;
`;

const StyledMenuItem = (props: MenuItemProps) => (
  <MenuItem
    fontSize="14px"
    sx={{
      bg: '#1c1c1e',
      _hover: {
        bg: '#1f1f1e',
      },
    }}
    {...props}
  />
);
