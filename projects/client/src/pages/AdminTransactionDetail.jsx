import {
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  Grid,
  GridItem,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import searchIcon from "../assets/search.png";
import filterIcon from "../assets/funnel.png";
import sortIcon from "../assets/sort.png";
import Select from "react-select";
import ReactPaginate from "react-paginate";
import AdminNavbar from "../components/AdminNavbar";
import TransactionListBar from "../components/TransactionListBar";
import TransactionCardAdmin from "../components/TransactionCardAdmin";
import uploadProduct from "../assets/product_upload.png";

const AdminTransactionDetail = () => {
  const colourStyles = {
    control: (base) => ({
      ...base,
      height: "40px",
      width: "90px",
      color: "red",
      backgroundColor: "none",
      border: "none",
      boxShadow: "none",
      paddingRight: "15px",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "black",
      display: "none",
    }),
    indicatorSeparator: (base) => ({
      ...base,
      display: "none",
    }),
    menu: (base) => ({
      ...base,
      fontFamily: "roboto",
      fontSize: "14px",
      width: "150px",
      color: "black",
      zIndex: 3,
    }),
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: "black",
        fontWeight: "bold",
        fontSize: "15px",
        fontFamily: "roboto",
        paddingLeft: "5px",
      };
    },
  };

  return (
    <Box
      backgroundColor={"#F4F1DE"}
      height={"100vh"}
      fontFamily={"roboto"}
      fontSize={"16px"}
      overflow={"scroll"}
      pb={"120px"}
    >
      <Box pt={"100px"}>
        <Grid templateRows="repeat(3, 1fr)">
          <GridItem ml={"15px"} maxHeight={"50px"}>
            <Grid templateColumns="repeat(2, 1fr)" gap={3}>
              <GridItem w="100%" mt={"5px"}>
                <Badge colorScheme={"red"} fontStyle={"none"} fontSize={"14px"}>
                  Waiting For Review
                </Badge>
              </GridItem>
              <GridItem w="100%" textAlign={"center"}>
                <Button
                  height={"40px"}
                  width={"130px"}
                  bgColor={"#81B29A"}
                  _hover={{ bgColor: "#81B29A" }}
                >
                  Change Status
                </Button>
              </GridItem>
            </Grid>
            <Grid templateColumns="repeat(2, 1fr)" gap={3} mt={"5px"}>
              <GridItem w="100%" mt={"8px"} fontWeight={"bold"}>
                12345678
              </GridItem>
              <GridItem w="100%" textAlign={"center"}>
                <Button
                  height={"40px"}
                  width={"130px"}
                  bgColor={"#81B29A"}
                  _hover={{ bgColor: "#81B29A" }}
                >
                  See Invoice
                </Button>
              </GridItem>
            </Grid>
            <Grid templateColumns="repeat(2, 1fr)" gap={3} mt={"5px"}>
              <GridItem mt={"8px"} fontWeight={"bold"}>
                22-12-2022
              </GridItem>
              <GridItem textAlign={"center"}>
                <Button
                  height={"40px"}
                  bgColor={"#81B29A"}
                  _hover={{ bgColor: "#81B29A" }}
                  width={"130px"}
                >
                  Payment Proof
                </Button>
              </GridItem>
            </Grid>
          </GridItem>
        </Grid>
        <VStack spacing={4} align="stretch" px={"15px"}>
          <Box h="auto">
            <Text
              fontSize={"18px"}
              fontWeight={"bold"}
              bgColor={"#81B29A"}
              borderRadius={"5px"}
              pl={"15px"}
            >
              Detail Product
            </Text>
            <Text fontWeight={"bold"} mt={"10px"}>
              Username
            </Text>
          </Box>
          <Box
            h="auto"
            // bg="tomato"
            display={"flex"}
          >
            <Image
              src={uploadProduct}
              alt="search"
              objectFit={"contain"}
              height={"100px"}
              maxW={"300px"}
            />
            <Box mt={"15px"}>
              <Text fontWeight={"bold"}>Judul Produk</Text>
              <Text>1x Rp. 80.000</Text>
            </Box>
          </Box>
          <Box
            h="auto"
            // bg="tomato"
            display={"flex"}
          >
            <Image
              src={uploadProduct}
              alt="search"
              objectFit={"contain"}
              height={"100px"}
              maxW={"300px"}
            />
            <Box mt={"15px"}>
              <Text fontWeight={"bold"}>Judul Produk</Text>
              <Text>1x Rp. 80.000</Text>
            </Box>
          </Box>
          <Box
            h="auto"
            // bg="tomato"
            display={"flex"}
          >
            <Image
              src={uploadProduct}
              alt="search"
              objectFit={"contain"}
              height={"100px"}
              maxW={"300px"}
            />
            <Box mt={"15px"}>
              <Text fontWeight={"bold"}>Judul Produk</Text>
              <Text>1x Rp. 80.000</Text>
            </Box>
          </Box>
        </VStack>
        <VStack spacing={4} align="stretch" px={"15px"}>
          <Box h="auto">
            <Text
              fontSize={"18px"}
              fontWeight={"bold"}
              bgColor={"#81B29A"}
              borderRadius={"5px"}
              pl={"15px"}
            >
              Shipment Info
            </Text>
          </Box>
          <Box>
            <Text fontWeight={"bold"}>
              Address: <Text fontWeight={"normal"}>Jl. in aja dulu</Text>
            </Text>
            <Text fontWeight={"bold"} mt={"5px"}>
              Shipping Method:{" "}
              <Text fontWeight={"normal"}>{"Yakin Esok Sampai (YES)"}</Text>
            </Text>
          </Box>
        </VStack>
        <VStack
          spacing={1}
          align="stretch"
          px={"15px"}
          mt={"20px"}
          fontWeight={"bold"}
        >
          <Box h="auto">
            <Text
              fontSize={"18px"}
              fontWeight={"bold"}
              bgColor={"#81B29A"}
              borderRadius={"5px"}
              pl={"15px"}
            >
              Payment Info
            </Text>
          </Box>
          <Box
            h="auto"
            display={"flex"}
            justifyContent={"space-between"}
            pt={"20px"}
          >
            <Text>Total Price:</Text>
            <Text>Rp. 2.000.000</Text>
          </Box>
          <Box h="auto" display={"flex"} justifyContent={"space-between"}>
            <Text>Shipment Price:</Text>
            <Text>Rp. 2.000.000</Text>
          </Box>
          <Box h="auto" display={"flex"} justifyContent={"space-between"}>
            <Text>Discount Price:</Text>
            <Text>Rp. 2.000.000</Text>
          </Box>
          <Box h="auto" display={"flex"} justifyContent={"space-between"}>
            <Text>Sub Total Price:</Text>
            <Text>Rp. 2.000.000</Text>
          </Box>
        </VStack>
      </Box>
      <Box>
        <TransactionListBar />
      </Box>
      <Box>
        <AdminNavbar />
      </Box>
    </Box>
  );
};

export default AdminTransactionDetail;
