import { shortAddress, shortName } from '@/shared/utils';
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
        rankInfo.result.map((item, index) => {
          return (
            <Flex gap="15px" justifyContent="space-between" key={index}>
              <Box width="15px">{item.rank}</Box>
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
  );
};
