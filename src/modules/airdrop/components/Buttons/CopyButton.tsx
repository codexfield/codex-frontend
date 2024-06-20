import { useClipboard } from '@chakra-ui/react';
import { GreenButton } from '.';

interface ICopyButtonProps {
  value: string;
}
export const CopyButton = (props: ICopyButtonProps) => {
  const { hasCopied, onCopy } = useClipboard(props.value);

  return <GreenButton onClick={onCopy}>{hasCopied ? 'URL copied!' : 'Copy URL'}</GreenButton>;
};
