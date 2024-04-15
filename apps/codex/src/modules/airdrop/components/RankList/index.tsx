import { shortAddress, shortName } from '@/shared/utils';
import { Box, Flex, Spinner, Stack } from '@chakra-ui/react';
import { useQueryRank } from '../../hooks/useQueryRank';

export const RankList: React.FC = () => {
  const { isLoading, data: rankInfo } = useQueryRank();

  return (
    <Box
      maxH="1200px"
      overflowY="auto"
      py="15px"
      sx={{
        '::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <Stack gap="8px">
        {isLoading && <Spinner />}

        {!rankInfo ? (
          <></>
        ) : (
          rankInfo.result.map((item, index) => {
            return (
              <Flex
                gap="15px"
                justifyContent="space-between"
                key={index}
                bg="#000"
                p="10px"
                borderRadius="18px"
              >
                <Box /* width="15px" */>{item.rank}</Box>
                <Box flex="1" title={item.twitter_name}>
                  {shortName(item.twitter_name)}
                </Box>
                <Box>{shortAddress(item.address)}</Box>
                <Box>{item.points.toLocaleString()}</Box>
              </Flex>
            );
          })
        )}
      </Stack>
    </Box>
  );
};
