import { AvatarComponent } from '@rainbow-me/rainbowkit';
import { MetaMaskAvatar } from 'react-metamask-avatar';

export const CustomAvatar: AvatarComponent = ({ address, size }) => {
  // const color = generateColorFromAddress(address);

  // const color = '#1e1e1e';
  return <MetaMaskAvatar address={address} size={size} />;
};
