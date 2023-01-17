import {
  Badge,
  Box,
  Button,
  Flex,
  Image,
  Stack,
  Text,
  useToast,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductCardUser = ({
  product_name,
  product_price,
  product_description,
  product_image,
  id,
}) => {
  const authSelector = useSelector((state) => state.auth);

  console.log(authSelector);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const truncate = (string, length) => {
    if (string.length > length) return string.substring(0, length) + "...";
    else return string;
  };

  const openAlert = () => {
    onOpen();

    document.body.style.overflow = "hidden";
  };

  const closeAlert = () => {
    onClose();

    document.body.style.overflow = "unset";
  };

  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const lengthDesc = 40;

  const showProduct = () => {
    if (authSelector.is_verified === false) {
      return (
        <Box marginTop={"20px"} mx={"20px"} onClick={openAlert}>
          <Flex
            maxHeight={"185px"}
            fontFamily={"roboto"}
            color={"black"}
            border={"2px solid #E07A5F"}
            borderRadius={"15px"}
            boxShadow={"1px 1px 4px #E07A5F"}
          >
            <Box flex="1.6">
              <Image
                src={
                  product_image ||
                  "https://images.unsplash.com/photo-1519638399535-1b036603ac77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80"
                }
                alt="pic"
                objectFit={"cover"}
                height={"100%"}
                width={"100%"}
                px={"10px"}
                py={"30px"}
              />
            </Box>
            <Box flex="2">
              <Box marginY={"25px"} p={"5px"}>
                <Text
                  fontWeight={"bold"}
                  overflow={"hidden"}
                  textOverflow={"ellipsis"}
                  whiteSpace={"nowrap"}
                  maxWidth={"120px"}
                >
                  {product_name || "Batagor ori asli 100%"}
                </Text>
                <Text
                  fontWeight={"bold"}
                  overflow={"hidden"}
                  textOverflow={"ellipsis"}
                  whiteSpace={"nowrap"}
                  maxWidth={"120px"}
                >
                  {formatRupiah(product_price) || "Rp. 1.000.000"}
                </Text>
                <Text
                  fontSize={"13px"}
                  color={"black"}
                  overflow={"hidden"}
                  textOverflow={"----"}
                >
                  {truncate(product_description, lengthDesc) ||
                    truncate(
                      "Batagor merupakan lorem ipsum handnakdnknkaedaskaksnkanksnakskans",
                      lengthDesc
                    )}
                </Text>
              </Box>
            </Box>
          </Flex>
        </Box>
      );
    }

    if (authSelector.id === 0) {
      return (
        <Link to={`/login/user`}>
          <Box marginTop={"20px"} mx={"20px"}>
            <Flex
              maxHeight={"185px"}
              fontFamily={"roboto"}
              color={"black"}
              border={"2px solid #E07A5F"}
              borderRadius={"15px"}
              boxShadow={"1px 1px 4px #E07A5F"}
            >
              <Box flex="1.6">
                <Image
                  src={
                    product_image ||
                    "https://images.unsplash.com/photo-1519638399535-1b036603ac77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80"
                  }
                  alt="pic"
                  objectFit={"cover"}
                  height={"100%"}
                  width={"100%"}
                  px={"10px"}
                  py={"30px"}
                />
              </Box>
              <Box flex="2">
                <Box marginY={"25px"} p={"5px"}>
                  <Text
                    fontWeight={"bold"}
                    overflow={"hidden"}
                    textOverflow={"ellipsis"}
                    whiteSpace={"nowrap"}
                    maxWidth={"120px"}
                  >
                    {product_name || "Batagor ori asli 100%"}
                  </Text>
                  <Text
                    fontWeight={"bold"}
                    overflow={"hidden"}
                    textOverflow={"ellipsis"}
                    whiteSpace={"nowrap"}
                    maxWidth={"120px"}
                  >
                    {formatRupiah(product_price) || "Rp. 1.000.000"}
                  </Text>
                  <Text
                    fontSize={"13px"}
                    color={"black"}
                    overflow={"hidden"}
                    textOverflow={"----"}
                  >
                    {truncate(product_description, lengthDesc) ||
                      truncate(
                        "Batagor merupakan lorem ipsum handnakdnknkaedaskaksnkanksnakskans",
                        lengthDesc
                      )}
                  </Text>
                </Box>
              </Box>
            </Flex>
          </Box>
        </Link>
      );
    }

    if (authSelector.id !== 0) {
      return (
        <Link to={`/product/${id}`}>
          <Box marginTop={"20px"} mx={"20px"}>
            <Flex
              maxHeight={"185px"}
              fontFamily={"roboto"}
              color={"black"}
              border={"2px solid #E07A5F"}
              borderRadius={"15px"}
              boxShadow={"1px 1px 4px #E07A5F"}
            >
              <Box flex="1.6">
                <Image
                  src={
                    product_image ||
                    "https://images.unsplash.com/photo-1519638399535-1b036603ac77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80"
                  }
                  alt="pic"
                  objectFit={"cover"}
                  height={"100%"}
                  width={"100%"}
                  px={"10px"}
                  py={"30px"}
                />
              </Box>
              <Box flex="2">
                <Box marginY={"25px"} p={"5px"}>
                  <Text
                    fontWeight={"bold"}
                    overflow={"hidden"}
                    textOverflow={"ellipsis"}
                    whiteSpace={"nowrap"}
                    maxWidth={"120px"}
                  >
                    {product_name || "Batagor ori asli 100%"}
                  </Text>
                  <Text
                    fontWeight={"bold"}
                    overflow={"hidden"}
                    textOverflow={"ellipsis"}
                    whiteSpace={"nowrap"}
                    maxWidth={"120px"}
                  >
                    {formatRupiah(product_price) || "Rp. 1.000.000"}
                  </Text>
                  <Text
                    fontSize={"13px"}
                    color={"black"}
                    overflow={"hidden"}
                    textOverflow={"----"}
                  >
                    {truncate(product_description, lengthDesc) ||
                      truncate(
                        "Batagor merupakan lorem ipsum handnakdnknkaedaskaksnkanksnakskans",
                        lengthDesc
                      )}
                  </Text>
                </Box>
              </Box>
            </Flex>
          </Box>
        </Link>
      );
    }
  };

  return (
    <>
      {showProduct()}
      {/* <Link to={`/product/${id}`}>
        <Box marginTop={"20px"} mx={"20px"}>
          <Flex
            maxHeight={"185px"}
            fontFamily={"roboto"}
            color={"black"}
            border={"2px solid #E07A5F"}
            borderRadius={"15px"}
            boxShadow={"1px 1px 4px #E07A5F"}
          >
            <Box flex="1.6">
              <Image
                src={
                  product_image ||
                  "https://images.unsplash.com/photo-1519638399535-1b036603ac77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80"
                }
                alt="pic"
                objectFit={"cover"}
                height={"100%"}
                width={"100%"}
                px={"10px"}
                py={"30px"}
              />
            </Box>
            <Box flex="2">
              <Box marginY={"25px"} p={"5px"}>
                <Text
                  fontWeight={"bold"}
                  overflow={"hidden"}
                  textOverflow={"ellipsis"}
                  whiteSpace={"nowrap"}
                  maxWidth={"120px"}
                >
                  {product_name || "Batagor ori asli 100%"}
                </Text>
                <Text
                  fontWeight={"bold"}
                  overflow={"hidden"}
                  textOverflow={"ellipsis"}
                  whiteSpace={"nowrap"}
                  maxWidth={"120px"}
                >
                  {formatRupiah(product_price) || "Rp. 1.000.000"}
                </Text>
                <Text
                  fontSize={"13px"}
                  color={"black"}
                  overflow={"hidden"}
                  textOverflow={"----"}
                >
                  {truncate(product_description, lengthDesc) ||
                    truncate(
                      "Batagor merupakan lorem ipsum handnakdnknkaedaskaksnkanksnakskans",
                      lengthDesc
                    )}
                </Text>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Link> */}

      {/* alert */}
      <AlertDialog isOpen={isOpen} onClose={closeAlert}>
        <AlertDialogOverlay>
          <AlertDialogContent
            mt={"35vh"}
            fontFamily={"roboto"}
            fontSize={"16px"}
            bgColor={"#F4F1DE"}
          >
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Verify Your Account
            </AlertDialogHeader>

            <AlertDialogBody>
              You haven't verify your email yet, please verifiy your email by
              going to profile page and clicking the verify account button.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                onClick={closeAlert}
                borderRadius={"15px"}
                bgColor={"#81B29A"}
                color={"white"}
                _hover={{
                  bgColor: "green.500",
                }}
              >
                Ok
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ProductCardUser;
