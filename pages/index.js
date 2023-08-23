import axios from "axios";
import { useState } from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { Button, Flex, Box, Heading, Divider,chakra } from "@chakra-ui/react";

const MotivationalQuote = () => {
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchQuote = () => {
    setLoading(true);
    axios.get("https://api.adviceslip.com/advice")
      .then((data) => {
        setQuote(data.data.slip.advice);
      })
      .catch((error) => {
        setQuote("error while generating quote");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const [text] = useTypewriter({
    words: [quote],
    loop: false,
    typeSpeed: 50,
    deleteSpeed: 10,
    delaySpeed: 5000,
  });

  return (
    <Flex justifyContent="center" alignItems="center"minHeight="50vh">
      <Box
        width="700px"
        color="black"
        mx="auto"
        border="1px blue.700"
        fontSize="md"
      >
        <Flex justifyContent="center" alignItems="center" direction={"column"}
              gap={5}>
        <Heading as="h2"mt={2} >Motivational quote generator</Heading>
        <Divider />
        <chakra.p color="violet" fontSize="lg"fontWeight="extrabold">{text}
        <Cursor
         cursorBlinking="true"
         cursorStyle="|"
         cursorColor="blue"/></chakra.p>
        <Button onClick={fetchQuote} isLoading={loading} loadingText={loading?"generating":"" }spinnerPlacement="end"  colorScheme="blue" borderRadius={10}>
          Generate Quote
        </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default MotivationalQuote;
