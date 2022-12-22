import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import uploadProduct from "../assets/product_upload.png";

const VoucherCard = ({
  voucher_name,
  branch_name,
  discount_amount_nominal,
  discount_amount_percentage,
  is_Inactive,
  minimum_payment,
  minimum_transaction_done,
  quantity,
  applied_product,
  voucher_start_date,
  voucher_end_date,
  voucher_type,
}) => {
  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const showDiscount = () => {
    if (
      discount_amount_nominal === null &&
      discount_amount_percentage === null
    ) {
      return (
        <Box display={"flex"}>
          <Text fontWeight={"bold"}>Discount:</Text>
          <Text ml={"5px"}>{`-` || "Loading..."}</Text>
        </Box>
      );
    }

    if (discount_amount_nominal === 0) {
      return (
        <Box display={"flex"}>
          <Text fontWeight={"bold"}>Discount:</Text>
          <Text ml={"5px"}>
            {`${discount_amount_percentage}%` || "Loading..."}
          </Text>
        </Box>
      );
    }

    if (discount_amount_percentage === 0) {
      return (
        <Box display={"flex"}>
          <Text fontWeight={"bold"}>Discount:</Text>
          <Text ml={"5px"}>
            {formatRupiah(discount_amount_nominal) || "Loading..."}
          </Text>
        </Box>
      );
    }
  };

  return (
    <>
      <Box marginTop={"20px"} mx={"20px"}>
        <Box
          // maxHeight={"185px"}
          fontFamily={"roboto"}
          color={"black"}
          border={"2px solid #E07A5F"}
          borderRadius={"15px"}
          boxShadow={"1px 1px 4px #E07A5F"}
          height={"230px"}
          columnGap={"2"}
          fontSize={"15px"}
        >
          <Box
            display={"flex"}
            mt={"5px"}
            borderBottom={"3px solid #E07A5F"}
            mx={"10px"}
            pb={"5px"}
          >
            <Box flex={1} fontWeight={"bold"} textAlign={"left"}>
              {is_Inactive == 1 ? (
                <Badge colorScheme="red">Inactive</Badge>
              ) : (
                <Badge colorScheme="green">Active</Badge>
              )}
            </Box>
            <Box
              bg="#81B29A"
              flex={"1"}
              borderRadius={"15px"}
              mr={"5px"}
              textAlign={"center"}
              color={"white"}
            >
              {voucher_type || "Loading..."}
            </Box>
          </Box>
          <Flex mt={"5px"} px={"5px"}>
            <Box flex="0.5">
              <Image
                src={uploadProduct}
                alt="logo"
                display={"block"}
                ml={"auto"}
                mr={"auto"}
                height={"110px"}
              />
            </Box>
            <Box flex="1">
              <Box display={"flex"}>
                <Text fontWeight={"bold"}>{branch_name || "Loading..."}</Text>
              </Box>
              <Box display={"flex"}>
                <Text fontWeight={"bold"}>{voucher_name || "Loading..."}</Text>
              </Box>
              {showDiscount()}
              <Box display={"flex"}>
                <Text fontWeight={"bold"}>Applied to:</Text>
                <Text
                  ml={"5px"}
                  overflow={"hidden"}
                  textOverflow={"ellipsis"}
                  whiteSpace={"nowrap"}
                  maxWidth={"120px"}
                >
                  {applied_product || "-"}
                </Text>
              </Box>
              <Box display={"flex"}>
                <Text fontWeight={"bold"}>Min. Payment:</Text>
                <Text ml={"5px"}>{formatRupiah(minimum_payment) || "-"}</Text>
              </Box>
              <Box display={"flex"}>
                <Text fontWeight={"bold"}>Min. Transaction:</Text>
                <Text ml={"5px"}>{minimum_transaction_done || "-"}</Text>
              </Box>
            </Box>
          </Flex>
          <Flex px={"5px"} height={"auto"}>
            <Box flex="0.5" textAlign={"center"}>
              <Button bg={"#E07A5F"} _hover={{ bgColor: "#E07A5F" }}>
                Delete
              </Button>
            </Box>
            <Box flex="1">
              <Box display={"flex"}>
                <Text fontWeight={"bold"}>Quantity: </Text>
                <Text ml={"5px"}>{`${quantity}x` || "-"}</Text>
              </Box>
              <Box display={"flex"}>
                <Text>{voucher_start_date.split("T")[0] || "-"}</Text>
                <Text px={"4px"} fontWeight={"bold"}>
                  to
                </Text>
                <Text>{voucher_end_date.split("T")[0] || "-"}</Text>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default VoucherCard;
