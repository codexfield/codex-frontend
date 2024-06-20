import DEFAULT_COVER from '@/images/default_cover.jpeg';
import {
  Box,
  Center,
  Flex,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuItemProps,
  MenuList,
  Spinner,
} from '@chakra-ui/react';
import { useAccount } from 'wagmi';
import { useGetBlogList } from '../../hooks/useGetBlogList';
import { DYMTimeAsObject, getBlogSpaceName } from '@/shared/utils';
import { useGetAccountDetails } from '@/shared/hooks/contract/useGetAccountDetails';
import { EmptyBlog } from './EmptyBlog';
import { useGetSpUrlByBucket } from '@/shared/hooks/gnfd/useGetSpUrlByBucket';
import { useRouter } from 'next/router';
import { VisibilityBadge } from '@/shared/components/VisibilityBadge';
import { ShareButton } from './ShareButton';
import { MoreActionIcon } from '@/shared/icons/MoreActionIcon';
import { ObjectMeta } from 'node_modules/@bnb-chain/greenfield-js-sdk/dist/esm/types/sp/Common';
import NiceModal from '@ebay/nice-modal-react';
import { EditBlog } from './model/edit';

interface IProps {
  address?: `0x${string}`;
}

export const BlogList: React.FC<IProps> = ({ address }) => {
  const { address: accountAddress } = useAccount();
  const router = useRouter();
  const { data: userInfo } = useGetAccountDetails(address as `0x${string}`);
  const {
    data: blogList,
    isLoading,
    refetch: refetchBlogList,
  } = useGetBlogList({
    bucketName: getBlogSpaceName(userInfo?.id || BigInt(0)),
  });

  console.log('blogList', blogList);

  const bucketName = getBlogSpaceName(userInfo?.id || BigInt(0));

  const { data: endpoint } = useGetSpUrlByBucket(bucketName);

  const isOwner = accountAddress === address;

  const handleChangeVisibility = async (blog: ObjectMeta) => {
    NiceModal.show(EditBlog, {
      objectInfo: blog,
      bucketName,
    });
  };

  if (isLoading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <Box>
      {blogList?.length === 0 ? (
        <EmptyBlog />
      ) : (
        <Box>
          {blogList?.map((blog) => {
            const createdAt = DYMTimeAsObject(blog.ObjectInfo.CreateAt);

            const blogUrl = `/dashboard/blog/${blog.ObjectInfo.ObjectName}?b=${bucketName}&v=${blog.ObjectInfo.Visibility}`;

            return (
              <Box key={blog.ObjectInfo.Id} py="40px">
                <Box fontSize="24px" mb="8px" fontWeight="700">
                  <Box as="span" color="#FFF" mr="6px">
                    {createdAt.m} {createdAt.d}
                  </Box>
                  <Box as="span" color="#5F5F5F">
                    {createdAt.y}
                  </Box>
                </Box>
                <Box bg="#1C1C1E" borderRadius="8px" overflow="hidden">
                  <Box
                    w="960px"
                    h="400px"
                    cursor="pointer"
                    onClick={() => {
                      if (isOwner || blog.ObjectInfo.Visibility === 1) {
                        router.push(blogUrl);
                      }
                    }}
                  >
                    <Image
                      w="100%"
                      h="100%"
                      objectFit={'cover'}
                      src={`${endpoint}/view/${bucketName}/cover/${blog.ObjectInfo.ObjectName}`}
                      fallbackSrc={DEFAULT_COVER.src}
                    />
                  </Box>
                  <Flex alignItems="center" justifyContent="space-between" p="30px">
                    <Flex alignItems="center" gap="15px">
                      <Box fontWeight="500" fontSize="28px">
                        {blog.ObjectInfo.ObjectName}
                      </Box>
                      <VisibilityBadge visibility={blog.ObjectInfo.Visibility} />
                    </Flex>

                    <Flex>
                      {blog.ObjectInfo?.Visibility === 1 && (
                        <ShareButton url={`${window.location.origin}${blogUrl}`} />
                      )}

                      {/* {isOwner && (
                        <Menu placement="bottom-end">
                          <MenuButton
                            as={IconButton}
                            icon={<MoreActionIcon />}
                            variant="unstyled"
                          />
                          <MenuList bg="#1C1C1E">
                            <StyledMenuItem
                              onClick={() => {
                                handleChangeVisibility(blog);
                              }}
                            >
                              Change Visibility
                            </StyledMenuItem>
                          </MenuList>
                        </Menu>
                      )} */}
                    </Flex>
                  </Flex>
                </Box>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

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
