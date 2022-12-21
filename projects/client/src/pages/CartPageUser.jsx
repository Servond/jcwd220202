import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  Grid,
  GridItem,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import backIcon from "../assets/back_icon.png";
import grocerinLogoWithText from "../assets/grocerin_logo.png";
import { axiosInstance } from "../api";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "../components/NavigationBar";
import ProductBox from "../components/ProductBox";
import InfiniteScroll from "react-infinite-scroll-component";
import CheckoutCart from "../components/CheckoutCartList";

const CartUser = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [qty, setQty] = useState(null);
  console.log(qty);
  const checkoutButton = async () => {
    try {
      await axiosInstance.post("/transaction/checkout");

      toast({ title: "Product checked out", status: "success" });
    } catch (err) {
      console.log(err);
      toast({ title: "Error handling product", status: "error" });
    }
  };

  const deleteBtnHandler = async (id) => {
    try {
      await axiosInstance.delete(`/transaction/${id}`);

      fetchCartItems();
      toast({ title: "Item deleted", status: "info" });
    } catch (err) {
      console.log(err);
    }
  };
  // const qtyBtnHandler = async (id) => {
  //   try {
  //     let qtyUpdate = {
  //       quantity: qty,
  //     };
  //     await axiosInstance.patch(`/transaction/${id}`, qtyUpdate);
  //     // fetchCartItems()
  //     console.log("add qty");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const fetchCartItems = async () => {
    try {
      const response = await axiosInstance.get("/transaction/cart");
      // const cartArr = [...response];

      setCartItems(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(cartItems[0]);

  const renderCartItems = () => {
    return cartItems.map((val) => {
      const totalProductTimesQuantity =
        val.quantity * val.ProductBranch.current_price;
      return (
        <CheckoutCart
          key={val.id.toString()}
          product_name={val.ProductBranch.Product.product_name}
          product_image={val.ProductBranch.Product.product_image}
          quantity={val.quantity}
          current_price={val.ProductBranch.current_price}
          total_product_price={totalProductTimesQuantity}
          onDelete={() => deleteBtnHandler(val.id)}
          // onQty={() => qtyBtnHandler(val.id)}
          // handleQty = {(qty) => qtyBtnHandler(val.id) }
        />
      );
    });
  };
  console.log(cartItems);
  // const quantityHandler = (value) =>{
  //   setQty(value)
  // }

  // const subTotal = () => {
  //   return total_product_price * qty;
  // };

  // const result = renderCartItems

  // console.log(renderCartItems())

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <>
      <Box
        backgroundColor={"#F4F1DE"}
        height={"100vh"}
        fontFamily={"roboto"}
        fontSize={"16px"}
        overflow={"scroll"}
        pb={"120px"}
      >
        <Flex display={"flex"}>
          <Text fontSize={"38px"}> Ini adalah carttttt</Text>
        </Flex>
        {renderCartItems()}
        <Text>ini total </Text>
        <Button mt={"50px"} onClick={checkoutButton}>
          {"Ceckout gannnnn"}
        </Button>
      </Box>

      <Navigation />
    </>
  );
};

export default CartUser;
