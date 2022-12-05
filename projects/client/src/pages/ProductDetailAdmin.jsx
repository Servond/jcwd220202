import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import ProductListBar from "../components/ProductListBar";
import uploadProduct from "../assets/product_upload.png";
import { useState } from "react";
import Select from "react-select";

const ProductDetailAdmin = () => {
  const [selectedImage, setSelectedImage] = useState(uploadProduct);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editMode, setEditMode] = useState(false);

  const startEdit = () => {
    setEditMode(true);
  };

  const stopEdit = () => {
    setEditMode(false);
  };

  return (
    <Box
      backgroundColor={"#F4F1DE"}
      height={"1150px"}
      fontFamily={"roboto"}
      fontSize={"16px"}
    >
      <Box>
        <ProductListBar />
      </Box>

      {editMode ? (
        <Box display={"grid"}>
          <VStack spacing={4} align="stretch" mt={"90px"}>
            <Box h="300px" display={"flex"} justifyContent={"center"}>
              <Image
                src={selectedImage}
                alt="search"
                objectFit={"contain"}
                height={"100%"}
              />
            </Box>
            <Box px={"30px"}>
              <Box fontWeight={"bold"} display={"flex"}>
                <Text>Product Name:</Text>
                <Text
                  marginLeft={"10px"}
                  fontStyle={"italic"}
                  color={"#E07A5F"}
                >
                  - Not editable by Admin
                </Text>
              </Box>
              <Box
                bgColor={"lightgrey"}
                borderRadius={"5px"}
                border={"1px solid lightgrey"}
                height={"40px"}
                py={"8px"}
                mt={"8px"}
              >
                <Text ml={"16px"}>{"Product Name"}</Text>
              </Box>
              <Box fontWeight={"bold"} display={"flex"} mt={"5px"}>
                <Text>Product Price:</Text>
                <Text
                  marginLeft={"10px"}
                  fontStyle={"italic"}
                  color={"#E07A5F"}
                >
                  - Not editable by Admin
                </Text>
              </Box>
              <Box
                bgColor={"lightgrey"}
                borderRadius={"5px"}
                border={"1px solid lightgrey"}
                height={"40px"}
                py={"8px"}
                mt={"8px"}
                display={"flex"}
              >
                <Text ml={"16px"}>{"Product Name"}</Text>
              </Box>
              <Box fontWeight={"bold"} display={"flex"} mt={"5px"}>
                <Text>Category:</Text>
                <Text
                  marginLeft={"10px"}
                  fontStyle={"italic"}
                  color={"#E07A5F"}
                >
                  - Not editable by Admin
                </Text>
              </Box>
              <Box
                bgColor={"lightgrey"}
                borderRadius={"5px"}
                border={"1px solid lightgrey"}
                height={"40px"}
                py={"8px"}
                mt={"8px"}
              >
                <Text ml={"16px"}>{"Product Name"}</Text>
              </Box>
              <Box fontWeight={"bold"} display={"flex"} mt={"5px"}>
                <Text>Description:</Text>
                <Text
                  marginLeft={"10px"}
                  fontStyle={"italic"}
                  color={"#E07A5F"}
                >
                  - Not editable by Admin
                </Text>
              </Box>
              <Box
                bgColor={"lightgrey"}
                borderRadius={"5px"}
                border={"1px solid lightgrey"}
                height={"120px"}
                py={"8px"}
                mt={"8px"}
                overflow={"scroll"}
                maxWidth={"370px"}
              >
                <Text mx={"16px"}>{"lorem"}</Text>
              </Box>
              <FormControl mt={"5px"} borderRadius={"5px"}>
                <FormLabel fontWeight={"bold"}>Stock:</FormLabel>
                <NumberInput
                  min={0}
                  bgColor={"white"}
                  mt={"8px"}
                  borderRadius={"5px"}
                >
                  <NumberInputField placeholder="Enter product stock" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormErrorMessage>Error</FormErrorMessage>
              </FormControl>
              <FormControl mt={"5px"}>
                <FormLabel fontWeight={"bold"} display={"flex"}>
                  <Text>Discount:</Text>
                  <Text
                    marginLeft={"10px"}
                    fontStyle={"italic"}
                    color={"#E07A5F"}
                  >
                    - Fill one of type discount below
                  </Text>
                </FormLabel>
                <InputGroup mt={"8px"}>
                  <InputLeftAddon
                    backgroundColor={"#81B29A"}
                    color={"white"}
                    width={"52px"}
                  >
                    Rp.
                  </InputLeftAddon>
                  <Input
                    placeholder="Enter product discount"
                    _placeholder={{ color: "black.500" }}
                    name="product_price"
                    bgColor={"white"}
                  />
                </InputGroup>
                <FormErrorMessage>Error</FormErrorMessage>
              </FormControl>
              <FormControl mt={"5px"} display={"flex"}>
                <InputGroup>
                  <NumberInput
                    min={0}
                    bgColor={"white"}
                    mt={"10px"}
                    borderRadius={"5px"}
                    width={"100%"}
                  >
                    <NumberInputField
                      width={"100%"}
                      placeholder="Enter product discount"
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <InputRightAddon
                    backgroundColor={"#81B29A"}
                    mt={"10px"}
                    maxWidth={"auto"}
                    color={"white"}
                  >
                    %
                  </InputRightAddon>
                </InputGroup>
                <FormErrorMessage>Error</FormErrorMessage>
              </FormControl>
            </Box>
            <Box display={"flex"} justifyContent={"center"}>
              <Button
                bgColor={"#E07A5F"}
                borderRadius={"15px"}
                _hover={{
                  bgColor: "#E07A5F",
                }}
                color={"white"}
                width={"100%"}
                marginLeft={"30px"}
                onClick={stopEdit}
              >
                Cancel
              </Button>
              <Button
                bgColor={"#81B29A"}
                borderRadius={"15px"}
                _hover={{
                  bgColor: "#81B29A",
                }}
                color={"white"}
                marginX={"30px"}
                width={"100%"}
              >
                Submit
              </Button>
            </Box>
          </VStack>
        </Box>
      ) : (
        <Box display={"grid"}>
          <VStack spacing={4} align="stretch" mt={"90px"}>
            <Box h="300px" display={"flex"} justifyContent={"center"}>
              <Image
                src={selectedImage}
                alt="search"
                objectFit={"contain"}
                height={"100%"}
              />
            </Box>
            <Box px={"30px"}>
              <Box fontWeight={"bold"}>Product Name:</Box>
              <Box
                bgColor={"white"}
                borderRadius={"5px"}
                border={"1px solid lightgrey"}
                height={"40px"}
                py={"8px"}
                mt={"8px"}
              >
                <Text ml={"16px"}>{"Product Name"}</Text>
              </Box>
              <Box fontWeight={"bold"} mt={"5px"}>
                Product Price:
              </Box>
              <Box
                bgColor={"white"}
                borderRadius={"5px"}
                border={"1px solid lightgrey"}
                height={"40px"}
                py={"8px"}
                mt={"8px"}
                display={"flex"}
              >
                <Text ml={"16px"}>{"Product Name"}</Text>
              </Box>
              <Box fontWeight={"bold"} mt={"5px"}>
                Category:
              </Box>
              <Box
                bgColor={"white"}
                borderRadius={"5px"}
                border={"1px solid lightgrey"}
                height={"40px"}
                py={"8px"}
                mt={"8px"}
              >
                <Text ml={"16px"}>{"Product Name"}</Text>
              </Box>
              <Box fontWeight={"bold"} mt={"5px"}>
                Description:
              </Box>
              <Box
                bgColor={"white"}
                borderRadius={"5px"}
                border={"1px solid lightgrey"}
                height={"120px"}
                py={"8px"}
                mt={"8px"}
                overflow={"scroll"}
                maxWidth={"370px"}
              >
                <Text mx={"16px"}>{"lorem"}</Text>
              </Box>
              <Box fontWeight={"bold"} mt={"5px"}>
                Stock:
              </Box>
              <Box
                bgColor={"white"}
                borderRadius={"5px"}
                border={"1px solid lightgrey"}
                height={"40px"}
                py={"8px"}
                mt={"8px"}
              >
                <Text ml={"16px"}>{"Product Name"}</Text>
              </Box>
              <Box fontWeight={"bold"} mt={"5px"}>
                Discount:
              </Box>
              <Box
                bgColor={"white"}
                borderRadius={"5px"}
                border={"1px solid lightgrey"}
                height={"40px"}
                py={"8px"}
                mt={"8px"}
              >
                <Text ml={"16px"}>{"Product Name"}</Text>
              </Box>
            </Box>
            <Box display={"flex"} justifyContent={"center"}>
              <Button
                bgColor={"#E07A5F"}
                borderRadius={"15px"}
                _hover={{
                  bgColor: "#E07A5F",
                }}
                color={"white"}
                width={"100%"}
                marginLeft={"30px"}
                onClick={onOpen}
              >
                Delete
              </Button>
              <Button
                bgColor={"#81B29A"}
                borderRadius={"15px"}
                _hover={{
                  bgColor: "#81B29A",
                }}
                color={"white"}
                marginX={"30px"}
                width={"100%"}
                onClick={startEdit}
              >
                Edit
              </Button>
            </Box>
          </VStack>
        </Box>
      )}

      {/* alert for delete */}
      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent
            mt={"150px"}
            fontFamily={"roboto"}
            fontSize={"16px"}
            bgColor={"#F4F1DE"}
          >
            <AlertDialogHeader
              fontSize="lg"
              fontWeight="bold"
              ml={"10px"}
              mt={"10px"}
            >
              Delete Product
            </AlertDialogHeader>

            <AlertDialogBody ml={"10px"}>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter display={"contents"}>
              <Button
                onClick={onClose}
                mx={"30px"}
                mt={"10px"}
                borderRadius={"15px"}
                bgColor={"#81B29A"}
                color={"white"}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={onClose}
                mx={"30px"}
                mt={"10px"}
                mb={"40px"}
                borderRadius={"15px"}
                bgColor={"#E07A5F"}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      {/* alert for delete */}
    </Box>
  );
};

export default ProductDetailAdmin;