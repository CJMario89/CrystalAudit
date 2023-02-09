import { Container, Flex, Text } from "@chakra-ui/react";

const Main = () => {
  return (
    <>
      <Container
        maxW="1440px"
        w="100%"
        h="calc(100vh)"
        mx="auto"
        px="28px"
        position="fixed"
        zIndex="2"
      >
        <Flex
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="center"
          position="relative"
          w="full"
          h="full"
          backgroundColor="transparent"
          zIndex="1"
        >
          <Text
            fontSize="70px"
            fontFamily="Cinzel"
            position="absolute"
            top="135px"
            left="9%"
            letterSpacing="1px"
          >
            Crystalize
          </Text>
          <Text
            fontSize="38px"
            fontFamily="Cinzel"
            position="absolute"
            top="308px"
            left="11%"
            letterSpacing="1px"
          >
            smart contract
          </Text>
          <Text
            fontSize="70px"
            fontFamily="Cinzel"
            position="absolute"
            top="370px"
            left="11.5%"
            letterSpacing="1px"
          >
            security
          </Text>
          <Text
            fontFamily="Source Serif Pro"
            fontSize="20px"
            w="36%"
            position="absolute"
            left="7%"
            top="600px"
          >
            We provide thorough and professional evaluations of smart contracts
            to ensure their security and reliability. We use cutting-edge
            technology and industry-standard methodologies to thoroughly test
            and analyze smart contracts for potential vulnerabilities and
            weaknesses and give you peace of mind in the fast-paced world of
            blockchain technology.
          </Text>
        </Flex>
      </Container>
    </>
  );
};

export default Main;
