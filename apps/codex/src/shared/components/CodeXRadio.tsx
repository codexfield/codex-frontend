import { Box, RadioProps, useRadio, useRadioGroup } from '@chakra-ui/react';

export const CodeXRadio = (props: RadioProps) => {
  const { getInputProps } = useRadio(props);

  const input = getInputProps();
  return (
    <Box as="label">
      <input {...input} />

      {props.children}
    </Box>
  );
};

interface IProps {
  data: {
    label: string;
    value: string;
  }[];
}

export const CodeXRadioList = (props: IProps) => {
  const { getRootProps, getRadioProps } = useRadioGroup();

  const group = getRootProps();

  return (
    <Box {...group}>
      {props.data.map((item) => {
        const radio = getRadioProps({ value: item.value });

        return (
          <CodeXRadio key={item.value} value={item.value} {...radio}>
            {item.label}
          </CodeXRadio>
        );
      })}
    </Box>
  );
};
