import { AvatarComponent } from '@rainbow-me/rainbowkit';

export const CustomAvatar: AvatarComponent = ({ address, size }) => {
  // const color = generateColorFromAddress(address);
  const color = '#1e1e1e';
  // return ensImage ? (
  //   <img src={ensImage} width={size} height={size} style={{ borderRadius: 999 }} />
  // ) : (
  return (
    <div
      style={{
        backgroundColor: color,
        borderRadius: 999,
        height: size,
        width: size,
      }}
    ></div>
  );
  // );
};
