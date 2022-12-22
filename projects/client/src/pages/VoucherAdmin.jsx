import {
  Box,
  Button,
  calc,
  Flex,
  FormControl,
  Grid,
  GridItem,
  HStack,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import searchIcon from "../assets/search.png";
import filterIcon from "../assets/funnel.png";
import sortIcon from "../assets/sort.png";
import ProductListBar from "../components/ProductListBar";
import Select from "react-select";
import { axiosInstance } from "../api";
import { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import ProductCardAdmin from "../components/ProductCardAdmin";
import { useFormik } from "formik";
import ReactPaginate from "react-paginate";
import "../style/pagination.css";
import productNotFound from "../assets/feelsorry.png";
import VoucherBar from "../components/VocuherBar";
import addIcon from "../assets/add.png";
import { voucherTypeSelection } from "../assets/voucherType";
import { Link, useNavigate } from "react-router-dom";
import VoucherCard from "../components/VoucherCard";

const maxItemsPerPage = 10;

const VoucherAdmin = () => {
  const [voucherType, setVoucherType] = useState([]);
  const [voucher, setVoucher] = useState([]);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDir, setSortDir] = useState("ASC");
  const [filter, setFilter] = useState("");
  const [currentSearch, setCurrentSearch] = useState("");
  const [totalVoucher, setTotalVoucher] = useState(0);
  const [activePage, setActivePage] = useState(1);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  const optionsSort = [
    { value: "createdAt ASC", label: "latest created" },
    { value: "createdAt DESC", label: "oldest created" },
    { value: "voucher_start_date ASC", label: "latest start date" },
    { value: "voucher_start_date DESC", label: "oldest start date" },
  ];

  const fetchVoucherType = async () => {
    try {
      const response = await axiosInstance.get(`/admin-voucher/type`);

      setVoucherType(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderVoucherType = voucherType.map((val) => {
    return {
      value: val.id,
      label: val.voucher_type,
    };
  });

  renderVoucherType.unshift({ value: "", label: "All" });

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

  const fetchAdminVoucher = async () => {
    try {
      const response = await axiosInstance.get("/admin-voucher", {
        params: {
          _sortBy: sortBy,
          _sortDir: sortDir,
          VoucherTypeId: filter,
          voucher_name: currentSearch,
          _page: activePage,
          _limit: maxItemsPerPage,
        },
      });

      setVoucher(response.data.data);

      setTotalVoucher(response.data.dataCount);
    } catch (error) {
      console.log(error);
    }
  };

  const maxPage = Math.ceil(totalVoucher / maxItemsPerPage);

  const openSelectVoucherModal = () => {
    onOpen();

    document.body.style.overflow = "hidden";
  };

  const closeSelectVoucherModal = () => {
    onClose();

    document.body.style.overflow = "unset";
  };

  const toCreateVoucherPage = (val) => {
    navigate(val.url);

    closeSelectVoucherModal();
  };

  const handlePageClick = (data) => {
    let currentPage = data.selected + 1;

    setActivePage(currentPage);
  };

  const sortProductHandler = (event) => {
    setSortBy(event.value.split(" ")[0]);
    setSortDir(event.value.split(" ")[1]);
  };

  const filterProductHandler = (event) => {
    setFilter(event.value);

    setActivePage(1);
  };

  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: ({ search }) => {
      setCurrentSearch(search);
    },
  });

  const formChangeHandler = ({ target }) => {
    const { name, value } = target;
    formik.setFieldValue(name, value);
  };

  const renderVoucher = () => {
    return voucher.map((val) => {
      return (
        <VoucherCard
          key={val.id.toString()}
          voucher_name={val.voucher_name}
          branch_name={val.Branch.branch_name}
          discount_amount_nominal={val.discount_amount_nominal}
          discount_amount_percentage={val.discount_amount_percentage}
          is_Inactive={val.is_Inactive}
          minimum_payment={val.minimum_payment}
          minimum_transaction_done={val.minimum_transaction_done}
          quantity={val.quantity}
          applied_product={val.Product?.product_name}
          voucher_start_date={val.voucher_start_date}
          voucher_end_date={val.voucher_end_date}
          voucher_type={val.VoucherType?.voucher_type}
        />
      );
    });
  };

  useEffect(() => {
    fetchVoucherType();
  }, []);

  useEffect(() => {
    fetchAdminVoucher();
  }, [sortBy, sortDir, filter, currentSearch, activePage]);

  return (
    <Box
      backgroundColor={"#F4F1DE"}
      height={"100vh"}
      fontFamily={"roboto"}
      fontSize={"16px"}
      overflow={"scroll"}
      pb={"120px"}
    >
      <Box>
        <VoucherBar />
      </Box>
      <Box>
        <Flex>
          <Box p={"2"} marginTop={"80px"} width={"100%"} mr={"8px"}>
            <FormControl>
              <InputGroup>
                <Input
                  name="search"
                  placeholder="Search Voucher Name"
                  _placeholder={{ color: "black.500" }}
                  value={formik.values.search}
                  onChange={formChangeHandler}
                  bgColor={"white"}
                  height={"40px"}
                  marginLeft={"6px"}
                />
                <InputRightElement marginRight={"5px"}>
                  <Button
                    size="sm"
                    color={"white"}
                    bgColor={"#F2CC8F"}
                    fontSize={"16px"}
                    _hover={{
                      bgColor: "#F2CC8F",
                    }}
                    onClick={formik.handleSubmit}
                  >
                    <Image
                      src={searchIcon}
                      alt="search"
                      width={"40px"}
                      objectFit={"contain"}
                    />
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </Box>
        </Flex>
        <Grid templateColumns="repeat(3, 1fr)" gap={2} mx={"15px"}>
          <GridItem w="100%" h="10">
            <Grid
              templateColumns="repeat(1, 1fr)"
              textAlign={"Left"}
              bgColor={"#81B29A"}
              borderRadius={"5px"}
            >
              <GridItem w="100%" h="10" display={"flex"} ml={"8px"}>
                <Image
                  src={sortIcon}
                  alt="search"
                  height={"20px"}
                  ml={"10px"}
                  mt={"10px"}
                />
                <Select
                  options={optionsSort}
                  styles={colourStyles}
                  placeholder={"Sort"}
                  onChange={sortProductHandler}
                />
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem w="100%" h="10">
            <Grid
              templateColumns="repeat(1, 1fr)"
              textAlign={"Left"}
              bgColor={"#81B29A"}
              borderRadius={"5px"}
            >
              <GridItem w="100%" h="10" display={"flex"} ml={"8px"}>
                <Image
                  src={filterIcon}
                  alt="search"
                  height={"20px"}
                  ml={"10px"}
                  mt={"10px"}
                />
                <Select
                  options={renderVoucherType}
                  styles={colourStyles}
                  placeholder={"Filter"}
                  onChange={filterProductHandler}
                />
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem w="100%" h="10">
            <Grid
              templateColumns="repeat(1, 1fr)"
              textAlign={"Left"}
              bgColor={"#81B29A"}
              borderRadius={"5px"}
            >
              <GridItem
                w="100%"
                h="10"
                display={"flex"}
                justifyContent={"space-evenly"}
                onClick={openSelectVoucherModal}
              >
                <Image src={addIcon} alt="search" height={"20px"} mt={"10px"} />
                <Box
                  mt={"9px"}
                  textAlign={"center"}
                  fontWeight={"bold"}
                  fontSize={"15px"}
                  color={"black"}
                >
                  Voucher
                </Box>
              </GridItem>
            </Grid>
          </GridItem>
        </Grid>
      </Box>
      {!voucher.length ? null : (
        <Box marginTop={"20px"}>
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            pageCount={maxPage}
            marginPagesDisplayed={5}
            pageRangeDisplayed={2}
            onPageChange={handlePageClick}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
          />
        </Box>
      )}
      {!voucher.length ? (
        <Box display={"grid"} mt={"15vh"}>
          <Text textAlign={"center"} fontWeight={"bold"}>
            No item(s) found
          </Text>
          <Image
            src={productNotFound}
            alt="not found"
            width={"70%"}
            objectFit={"contain"}
            justifySelf={"center"}
          />
        </Box>
      ) : (
        <Box>{renderVoucher()}</Box>
      )}
      <Box>
        <AdminNavbar />
      </Box>

      {/* modal for voucher type */}
      <Modal isOpen={isOpen} onClose={closeSelectVoucherModal}>
        <ModalOverlay />
        <ModalContent
          mt={"20vh"}
          fontFamily={"roboto"}
          fontSize={"16px"}
          bgColor={"#F4F1DE"}
        >
          <ModalHeader
            fontSize={"16px"}
            fontWeight="bold"
            mt={"10px"}
            textAlign={"center"}
          >
            Select Type of Voucher
          </ModalHeader>
          <ModalCloseButton color={"#E07A5F"}></ModalCloseButton>
          <ModalBody mb={"40px"}>
            {voucherTypeSelection.map((val) => {
              return (
                <HStack
                  height={"120px"}
                  border={"2px solid #E07A5F"}
                  borderRadius={"15px"}
                  boxShadow={"1px 1px 4px #E07A5F"}
                  mt={"10px"}
                  spacing={"10px"}
                  _hover={{ borderColor: "#81B29A", color: "black" }}
                  onClick={() => toCreateVoucherPage(val)}
                  key={val.title}
                >
                  <Box display={"flex"} ml={"15px"}>
                    <Box width={"70px"}>
                      <Image
                        src={val.icon}
                        alt="voucher type"
                        width={"100px"}
                        objectFit={"contain"}
                      />
                    </Box>
                  </Box>
                  <Box p={"10px"} display={"grid"}>
                    <Text fontWeight={"bold"} justifySelf={"start"}>
                      {val.title}
                    </Text>
                    <Text>{val.description}</Text>
                  </Box>
                </HStack>
              );
            })}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default VoucherAdmin;
