import { shortAddress } from '@/shared/utils';
import { Box, Flex, Spinner, Stack } from '@chakra-ui/react';
import { useQueryRank } from '../../hooks/useQueryRank';

export const RankList: React.FC = () => {
  const { isLoading, data: rankInfo } = useQueryRank();

  return (
    <Stack gap="8px">
      {isLoading && <Spinner />}

      {!rankInfo ? (
        <></>
      ) : (
        rankInfo.result.map((item) => {
          return (
            <Flex justifyContent="space-between" key={item.rank}>
              <Box>{item.rank}</Box>
              <Box>{item.twitter_name}</Box>
              <Box>{shortAddress(item.address)}</Box>
              <Box>{item.points.toLocaleString()}</Box>
            </Flex>
          );
        })
      )}
    </Stack>
  );
};
