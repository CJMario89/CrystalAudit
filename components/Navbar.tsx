import {
  Box,
  Container,
  Flex,
  HStack,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { BsInstagram, BsTelegram, BsTwitter } from "react-icons/bs";
import logo from "../public/image/logo.png";
const Navbar = (props: any) => {
  const { threeRef, setOnPage } = props;

  return (
    <Container
      maxW="1440px"
      w="100%"
      mx="auto"
      px="28px"
      position="fixed"
      top="0px"
      left="50%"
      transform="translateX(-50%)"
      zIndex="5"
    >
      <Flex w="full" justifyContent="space-between">
        <Flex
          alignItems="center"
          columnGap="5px"
          cursor="pointer"
          onClick={() => {
              threeRef.current.setOnMain();
              setOnPage("main");
          }}
        >
          <Image alt="" src={logo.src} w="46px" mb="2px" />

          <Text
            fontSize="30px"
            fontFamily="Cinzel"
            fontWeight="normal"
            color="#e9e9ff"
          >
            CrystalGuard
          </Text>
        </Flex>
        <HStack flexDirection="row" spacing="48px">
          <HStack spacing="24px">
            <IconButton
              aria-label=""
              icon={<BsTwitter color="#e9e9ff" size="24" />}
              border="none"
              backgroundColor="transparent"
              cursor="pointer"
            ></IconButton>
            <IconButton
              aria-label=""
              icon={<BsTelegram color="#e9e9ff" size="24" />}
              border="none"
              backgroundColor="transparent"
              cursor="pointer"
            ></IconButton>
            <IconButton
              aria-label=""
              icon={<BsInstagram color="#e9e9ff" size="24" />}
              border="none"
              backgroundColor="transparent"
              cursor="pointer"
            ></IconButton>
          </HStack>
          <Box
            border="none"
            px="56px"
            py="8px"
            color="#7010b0"
            borderRadius="30px"
            fontSize="18px"
            cursor="pointer"
            tabIndex={0}
            fontFamily="Source Serif Pro"
            fontWeight="bold"
            _hover={{
              color: "#8020c0",
            }}
            onClick={() => {
              threeRef.current.setOnAudit();
              setOnPage("audit");
            }}
          >
            Audit
          </Box>
          <Box
            border="none"
            backgroundColor="#7010b0"
            boxShadow="0 0px 5px #7010b0"
            px="56px"
            py="8px"
            borderRadius="30px"
            fontSize="18px"
            cursor="pointer"
            tabIndex={0}
            fontFamily="Source Serif Pro"
            fontWeight="bold"
            _hover={{
              backgroundColor: "#8020c0",
            }}
            onClick={() => {
              threeRef.current.setOnRequest();
              setOnPage("request");
            }}
          >
            Request
          </Box>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
