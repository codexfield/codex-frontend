import { Button, ButtonProps } from "@chakra-ui/react"

export const BaseButton = (props: ButtonProps) => {
  return <Button
    h="60px"
    borderRadius="30px"
    bg="#EFF0F3"
    color="#000000"
    fontSize="20px"
    fontWeight="700"
    _hover={{
      bg: "#aeb0b4"
    }}
    {...props}
  />
}
