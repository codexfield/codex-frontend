import { ShareIcon } from '@/shared/icons/ShareIcon';
import { IconButton, useClipboard, useToast } from '@chakra-ui/react';
import { useEffect } from 'react';

interface IProps {
  url: string;
}

export const ShareButton = (props: IProps) => {
  const { url } = props;
  const { onCopy, value, hasCopied } = useClipboard(url);
  const toast = useToast();

  useEffect(() => {
    if (hasCopied) {
      toast({
        position: 'bottom',
        title: 'Copy success',
        status: 'success',
        duration: 1000,
        isClosable: true,
      });
    }
  }, [hasCopied, toast]);

  return (
    <IconButton
      onClick={onCopy}
      icon={<ShareIcon />}
      aria-label="share"
      variant="unstyled"
      _hover={{
        bg: 'rgba(0, 0, 0, 0.1)',
      }}
    />
  );
};
