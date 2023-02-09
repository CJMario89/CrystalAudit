import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { ChangeEventHandler, SyntheticEvent, useState } from "react";
interface PROPS {
  title: string;
  name: string;
  value: string;
  onProjectInfoChange: ChangeEventHandler;
}

const FormInput = (props: PROPS) => {
  const { title, name, value, onProjectInfoChange } = props;
  const [input, setInput] = useState<string | null>(null)

  const handleInputChange = (e:SyntheticEvent) => setInput((e.target as HTMLInputElement).value)

  const isError = input === ''
  console.log(isError)
  return (
    <FormControl mt="20px" isRequired isInvalid={isError}>
      <FormLabel
        fontSize="18px"
        fontFamily="Source Serif Pro"
        letterSpacing="0.5px"
      >
        {title}
      </FormLabel>
      <Input
        type="text"
        name={name}
        defaultValue={value}
        onChange={(e)=>{
          onProjectInfoChange(e)
          handleInputChange(e)
        }}
        bgColor="rgba(255, 255, 255, 0.1)"
        px="12px"
        py="12px"
        mt="10px"
        borderRadius="6px"
        w="300px"
        color="#eeeeff"
        fontSize="16px"
        fontFamily="Source Serif Pro"
        border={isError ? 'rgb(255, 150, 150) 1px solid' : 'rgba(255, 255, 255, 0.2) 1px solid'}
      />
      {isError &&
        <FormErrorMessage mt='5px' color='rgb(255, 150, 150)'>{title} must be filled.</FormErrorMessage>
      }
    </FormControl>
  );
};

export default FormInput;
