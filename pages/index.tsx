import { Box, Container } from "@chakra-ui/react";
import { useRef, useState } from "react";
import Audit from "../components/Audit";
import Main from "../components/Main";
import Navbar from "../components/Navbar";
import Request from "../components/Request";
import Three from "../components/Three";

const index = () => {
  const threeRef = useRef(null);
  const [onPage, setOnPage] = useState("main");
  const pages = [
    {
      id: "main",
      component: <Main />,
    },
    {
      id: "request",
      component: <Request />,
    },
    {
      id: "audit",
      component: <Audit />,
    },
  ];
  return (
    <Container maxW="1440px" w="100%" h="auto" mx="auto">
      <Navbar threeRef={threeRef} setOnPage={setOnPage}/>
      {pages.map((page) => {
        return (
          <Box
            opacity={`${page.id === onPage ? "1" : "0"}`}
            transition="all"
            transitionDuration="3s"
            key={page.id}
          >
            {page.component}
          </Box>
        );
      })}
      <Three ref={threeRef} />
    </Container>
  );
};

export default index;
