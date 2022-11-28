import {
  Box,
  Button,
  Flex,
  FormControl,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuOptionGroup,
  MenuList,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SearchIcon } from "@chakra-ui/icons";
import Navigation from "../components/NavigationBar";
import { categories } from "../components/category";
import other from "../assets/4square.png";

const Home = () => {
  const [keywordHandler, setKeywordHandler] = useState("");
  const [order, setOrder] = useState("");

  return (
    <Box bgColor={"#81B29A"} height={"932px"}>
      <Box
        height={"70px"}
        paddingTop={"15px"}
        position={"fixed"}
        top={"0"}
        bgColor={"#81B29A"}
        right={"0"}
        left={"0"}
      >
        <Flex>
          <Box w="80%">
            <FormControl>
              <InputGroup width={"100%"}>
                <InputRightElement
                  pointerEvents="none"
                  children={<SearchIcon color="F2CC8F" />}
                  backgroundColor={"#F2CC8F"}
                  mt={"5px"}
                  mr={"5px"}
                  height={"30px"}
                />
                <Input
                  w={"340px"}
                  ml={"5"}
                  variant="outline"
                  size="md"
                  placeholder={``}
                  name="input"
                  value={keywordHandler}
                  onChange={(event) => setKeywordHandler(event.target.value)}
                  backgroundColor="white"
                />
              </InputGroup>
            </FormControl>
          </Box>
          <Box
            color="#E07A5F"
            as="b"
            textAlign={"center"}
            marginTop={"7px"}
            _hover={{
              background: "white",
              color: "#E07A5F",
              transition: "all 1000ms ease",
              cursor: "pointer",
            }}
            w="20%"
          >
            <Link to="/login">Login</Link>
          </Box>
        </Flex>
      </Box>
      <Box h={"100px"} mt={"70px"} bgColor={"#F4F1DE"}>
        Banner
      </Box>
      <SimpleGrid
        columns={"4"}
        spacing={5}
        textAlign={"center"}
        alignItems={"center"}
        bgColor={"white"}
        p={"5"}
        mt={"10px"}
      >
        {categories.slice(0, 7).map((item) => {
          return (
            <Box display={"grid"}>
              <Image
                justifySelf={"center"}
                src={item.icon}
                w={"50px"}
                alignItems={"center"}
              />
              <Text fontSize={"xs"}>{item.name}</Text>
            </Box>
          );
        })}
        <Link to={"/category"}>
          <Box display={"grid"}>
            <Image
              justifySelf={"center"}
              src={other}
              w={"40px"}
              alignItems={"center"}
            />
          </Box>
        </Link>
      </SimpleGrid>
      <Box h={"600px"} bgColor={"#F4F1DE"} mt={"10px"} position={"relative"}>
        <Box ml={"5"} mt={"5"} position={"absolute"}>
          <Menu preventOverflow={"hidden"}>
            <MenuButton as={Button} bgColor={"#81B29A"}>
              Sort
            </MenuButton>
            <MenuList>
              <MenuOptionGroup
                type="radio"
                onChange={(value) => setOrder(value)}
              >
                <MenuItemOption value="ASC">A - Z</MenuItemOption>
                <MenuItemOption value="DESC">Z - A</MenuItemOption>
                <MenuItemOption value="ASC">A - Z</MenuItemOption>
                <MenuItemOption value="DESC">Z - A</MenuItemOption>
                <MenuItemOption value="ASC">A - Z</MenuItemOption>
                <MenuItemOption value="DESC">Z - A</MenuItemOption>
                <MenuItemOption value="ASC">A - Z</MenuItemOption>
                <MenuItemOption value="DESC">Z - A</MenuItemOption>
                <MenuItemOption value="ASC">A - Z</MenuItemOption>
                <MenuItemOption value="DESC">Z - A</MenuItemOption>
                <MenuItemOption value="ASC">A - Z</MenuItemOption>
                <MenuItemOption value="DESC">Z - A</MenuItemOption>
                <MenuItemOption value="ASC">A - Z</MenuItemOption>
                <MenuItemOption value="DESC">Z - A</MenuItemOption>
                <MenuItemOption value="ASC">A - Z</MenuItemOption>
                <MenuItemOption value="DESC">Z - A</MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </Box>
      </Box>
      <Navigation />
    </Box>
  );
};

export default Home;
