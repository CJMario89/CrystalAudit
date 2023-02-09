import {
  Button,
  Container,
  Flex,
} from "@chakra-ui/react";
import { SyntheticEvent, useRef } from "react";
import FormInput from "./FormInput";

const Request = () => {
  const projectInfo = useRef({
    name: '',
    description: '',
    website_URL: '',
    verified_contract_address: '',
  })

  const onProjectInfoChange = (e:SyntheticEvent)=>{
    const target = e.target as HTMLInputElement
    projectInfo.current = {...projectInfo.current, [target.name]: target.value}
  }


  const infos = [
    {
      title: 'Name',
      name: 'name',
      value: projectInfo.current.name,
    },
    {
      title: 'Description',
      name: 'description',
      value: projectInfo.current.description,
    },
    {
      title: 'Website URL',
      name: 'website_URL',
      value: projectInfo.current.website_URL,
    },
   
    {
      title: 'Verified Smart Contract',
      name: 'verified_contract_address',
      value: projectInfo.current.verified_contract_address,
    },
  ]
  return (
    <>
      <Container
        maxW="1440px"
        w="100%"
        h="calc(100vh)"
        mx="auto"
        px="28px"
        position='fixed'
        zIndex='2'
      >
        <form>
          <Flex flexDirection='column' position='absolute' left='30%' 
          top="50%"
        transform='translate(-50%, -50%)'>
          {infos.map((info, i)=>{
            return(
              <FormInput key={i} title={info.title} name={info.name} value={info.value} onProjectInfoChange={onProjectInfoChange}></FormInput>
            )
          })}
          <Button mt='50px'
            bgColor='rgba(255, 255, 255, 0.1)'
            px='12px'
            py='12px'
            border='rgba(255, 255, 255, 0.2)'
            borderRadius='6px'
            _hover={{
              border:'rgba(200, 200, 200, 0.2)',
              bgColor: 'rgba(200, 200, 200, 0.3)'
            }}
            w='300px'
            color='#eeeeff'
            fontSize='18px'
            fontFamily='Source Serif Pro'
            cursor='pointer'
          >
            Submit
          </Button>
          </Flex>
        </form>
      </Container>
    </>
  );
};

export default Request;
