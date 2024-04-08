import styled from '@emotion/styled';
import { Flex, Heading, Spinner, Stat, StatNumber } from '@chakra-ui/react';
import RankImage from '@/images/rank.png';
import StarImage from '@/images/star.png';
import { useAccount } from 'wagmi';
import { useQueryUser } from '../../hooks/useQueryUser';

export const User = () => {
  const { address } = useAccount();

  const { data: userInfo } = useQueryUser(address);

  return (
    <Flex gap="30px">
      <Show>
        <Heading
          textAlign="center"
          fontSize="24px"
          h="48px"
          lineHeight="48px"
          bg={`#7A3CFF url(${StarImage.src}) no-repeat 10px 14px`}
          bgSize="contain"
        >
          Your Points
        </Heading>
        <StatNumber textAlign="center" h="58px" lineHeight="58px" color="#7a3cff" as="div">
          {(userInfo && userInfo.result?.user.points.toLocaleString()) || '0'}
        </StatNumber>
      </Show>
      <Show>
        <Heading
          textAlign="center"
          fontSize="24px"
          h="48px"
          lineHeight="48px"
          bg={`#A276FF url(${RankImage.src}) no-repeat 15px 14px`}
          bgSize="contain"
        >
          Rank
        </Heading>
        <StatNumber textAlign="center" h="58px" lineHeight="58px" color="#A276FF">
          {(userInfo && userInfo.result?.user.rank.toLocaleString()) || '0'}
        </StatNumber>
      </Show>
    </Flex>
  );
};

const Show = styled(Stat)`
  border-radius: 10px;
  overflow: hidden;
  background-color: #282829;
`;
