import { getVisibility } from '@/shared/utils';
import { Badge } from '@chakra-ui/react';
import { VisibilityType } from '@bnb-chain/greenfield-cosmos-types/greenfield/storage/common';

interface IProps {
  visibility: VisibilityType;
}

export const VisibilityBadge = (props: IProps) => {
  const { visibility } = props;
  const vis = getVisibility(visibility || -1);
  const color = vis === 'Public' ? '#13E735' : '#FF7A00';

  return (
    <Badge
      mt="3px"
      padding="3px 10px 2px 11px"
      fontSize="12px"
      variant="outline"
      textTransform="none"
      sx={{
        borderRadius: '10px',
        color,
        border: `1px solid ${color}`,
      }}
    >
      {vis}
    </Badge>
  );
};
