import { useGetAccountDetails } from '@/hooks/contract/useGetAccountDetails';
import { getCloneUrlByBucketName } from '@/utils';
import { Box, Link, VStack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useAccount } from 'wagmi';

interface IProps {
  name: string;
}

export const EmptyRepo = (props: IProps) => {
  const { name } = props;
  const cloneUrl = getCloneUrlByBucketName(name);

  return (
    <Container>
      <Box>
        <Title as="h3">Empty repository — set up your repository using gitd</Title>
        <Section as="p">
          You can download and build gitd from{' '}
          <Link color="#a276ff" href="https://github.com/codexfield/gitd" target="_blank">
            here
          </Link>
          . Set up your environment by exporting the chain ID and your private key. Please ensure
          that your account has enough balance on Greenfield.
        </Section>
      </Box>

      <Box>
        <Title as="h3">…create a new repository on the command line</Title>
        <CodeBlock>
          <Section as="p">{'echo "# test" >> README.md'}</Section>
          <Section as="p">gitd init</Section>
          <Section as="p">gitd add README.md</Section>
          <Section as="p">{'gitd commit -m "first commit"'}</Section>
          <Section as="p">gitd remote add origin {cloneUrl}</Section>
          <Section as="p">gitd push origin main -f</Section>
        </CodeBlock>
      </Box>

      <Box>
        <Title as="h3">…or push an existing repository from the command line</Title>
        <CodeBlock>
          <Section as="p">gitd remote add origin {cloneUrl}</Section>
          <Section as="p">gitd push origin main -f</Section>
        </CodeBlock>
      </Box>
    </Container>
  );
};

const Container = styled(VStack)`
  gap: 20px;
  align-items: flex-start;
  padding: 30px;
`;

const Title = styled(Box)`
  font-size: 24px;
  font-weight: 800;
`;

const CodeBlock = styled(Box)`
  padding: 10px;
  margin-top: 10px;
  background-color: #232323;
  color: #efefef;
  font-size: 16px;
  border-radius: 8px;
`;

const Section = styled(Box)`
  line-height: 1.8;
  font-size: 18px;
`;
