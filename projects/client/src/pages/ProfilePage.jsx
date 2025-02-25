import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Input,
  Select,
  Spacer,
  Stack,
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  InputRightElement,
  Heading,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { axiosInstance } from "../api";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/features/authSlice";
import Navigation from "../components/NavigationBar";
import uploadProfile from "../assets/upload_image.png";
import * as Yup from "yup";
import backIcon from "../assets/back_icon.png";
import grocerinLogo from "../assets/grocerin_logo_aja.png";
import { DatePicker } from "antd";
import moment from "moment";

const ProfilePage = () => {
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const [updateProfile, setUpdateProfile] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const inputFileRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [userLocation, setUserLocation] = useState();
  const [birthDate, setBirthDate] = useState("");
  // const { onCopy, copyReferral, setCopyReferral, hasCopied } = useClipboard("");

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const fetchProfile = async () => {
    try {
      const response = await axiosInstance.get(`/profile`);
      console.log(response);
      setUserData(response.data.data);

      formik.setFieldValue("username", response.data.data.username);
      formik.setFieldValue("gender", response.data.data.gender);
      formik.setFieldValue("birth", response.data.data.birth);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAddress = async () => {
    try {
      const responseAddress = await axiosInstance.get(`/profile/activeAddress`);
      console.log(responseAddress);
      setUserLocation(responseAddress.data.data.Addresses[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      gender: "",
      birth: "",
      profile_picture: "",
    },
    onSubmit: async (values) => {
      try {
        const userData = new FormData();

        userData.append("username", values.username);
        userData.append("gender", values.gender);
        userData.append("birth", birthDate);
        userData.append("profile_picture", values.profile_picture);

        await axiosInstance.patch(`/profile`, userData);

        setUpdateProfile(false);
        fetchProfile();
      } catch (err) {
        console.log(err);
      }
    },
  });

  const formikPassword = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: async ({ password, newPassword }) => {
      try {
        const response = await axiosInstance.patch("/password/change", {
          password: password,
          newPassword: newPassword,
        });

        toast({
          title: "Change Password Successful",
          description: response.data.message,
          status: "success",
        });
      } catch (error) {
        console.log(error.response);
        toast({
          title: "Change Password Failed",
          description: error.response.data.message,
          status: "error",
        });
      }
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .required()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
      confirmPassword: Yup.string()
        .required("please retype your password.")
        .oneOf([Yup.ref("newPassword")], "Your passwords do not match."),
    }),
    validateOnChange: false,
  });

  const formChangeHandler = ({ target }) => {
    const { name, value } = target;
    formik.setFieldValue(name, value);
  };
  // console.log(formik.values);

  // console.log("ini", birthDate)

  const birthChangeHandler = () => {
    formik.setFieldValue("birth", birthDate);
  };

  const formChangePasswordHandler = ({ target }) => {
    const { name, value } = target;
    formikPassword.setFieldValue(name, value);
  };

  const logoutBtnHandler = () => {
    localStorage.removeItem("auth_token");
    dispatch(logout());
    navigate("/login/user");
    toast({
      status: "info",
      title: "User logout",
    });
  };
  console.log(userLocation);

  const sendVerificationEmail = async () => {
    try {
      await axiosInstance.get("/register/user/reverification");

      toast({
        status: "success",
        title: "verification sent",
      });
    } catch (error) {
      console.log(error);
      toast({
        status: "error",
        title: "send verification failed",
      });
    }
  };

  console.log(birthDate);

  useEffect(() => {
    fetchProfile();
    fetchAddress();
  }, []);

  return (
    <Box height="1200px" bgColor="#F4F1DE" fontFamily={"roboto"}>
      <Grid
        templateColumns="repeat(3, 1fr)"
        gap={6}
        bgColor={"#81B29A"}
        h={"75px"}
        position={"fixed"}
        top={"0"}
        right={"0"}
        left={"0"}
        fontWeight={"bold"}
        zIndex={"4"}
        margin={"auto"}
        maxWidth={"480px"}
      >
        <GridItem>
          <Box marginTop={"20px"} marginLeft={"20px"}>
            <Image
              objectFit="cover"
              src={backIcon}
              alt="back"
              height={"40px"}
              onClick={() => navigate(-1)}
            />
          </Box>
        </GridItem>
        <GridItem>
          <Box margin={"25px"} textAlign={"center"} fontSize={"18px"}>
            Profile
          </Box>
        </GridItem>
        <GridItem>
          <Image
            src={grocerinLogo}
            alt="logo"
            height={"50px"}
            display={"block"}
            marginLeft={"auto"}
            marginRight={8}
            mt={3}
          />
        </GridItem>
      </Grid>
      <Box ml={5} pt={"100px"}>
        <Text fontSize={"lg"} as={"b"}>
          Hello, {userData.username}
        </Text>
        <Box display={"flex"} justifyContent={"center"}>
          <Image
            src={selectedImage || uploadProfile}
            width="100px"
            height="100px"
            borderRadius="full"
          />
        </Box>
        <Box display={"flex"} justifyContent={"right"} mx={10}>
          <Button
            w="50px"
            h="30px"
            bgColor="#81B29A"
            color={"white"}
            onClick={() => setUpdateProfile(true)}
          >
            Edit
          </Button>
        </Box>
      </Box>
      {!updateProfile ? (
        // display
        <Stack spacing={3} margin="10" mt={0}>
          <Text fontWeight={"bold"}>Username: {userData.username}</Text>
          <Text fontWeight={"bold"}>Gender: {userData.gender}</Text>
          <Text fontWeight={"bold"}>Date of Birth: {userData.birth}</Text>
        </Stack>
      ) : (
        // Edit mode
        <Stack spacing={3} margin="10">
          <Text fontWeight={"bold"}>Profile Picture:</Text>
          <Input
            ref={inputFileRef}
            display={"none"}
            type="file"
            name="profile_picture"
            accept="image/*"
            onChange={(event) => {
              formik.setFieldValue("profile_picture", event.target.files[0]);

              if (
                !event.target.files.length &&
                event.target.files.length === 0
              ) {
                return setSelectedImage(uploadProfile);
              }

              setSelectedImage(URL.createObjectURL(event.target.files[0]));
            }}
            _placeholder={{ color: "black.500" }}
            bgColor={"white"}
          />
          <Button
            fontWeight={"normal"}
            width={"100%"}
            bgColor={"#81B29A"}
            color={"white"}
            onClick={() => {
              inputFileRef.current.click();
            }}
            _hover={{ bgColor: "#81B29A" }}
          >
            {formik?.values?.profile_picture?.name || "Choose Image"}
          </Button>
          <Text fontWeight={"bold"}>Username:</Text>
          <Input
            value={formik.values.username}
            name="username"
            onChange={formChangeHandler}
            placeholder={userData.username}
            size="md"
            bgColor={"white"}
          />
          <Text fontWeight={"bold"}>Gender:</Text>
          <Select
            name="gender"
            value={formik.values.gender}
            placeholder={userData.gender}
            onChange={formChangeHandler}
            size="md"
            bgColor={"white"}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other...</option>
          </Select>

          <Text fontWeight={"bold"}>Date of Birth:</Text>

          <Box>
            <DatePicker
              defaultValue={moment(userData?.birth)}
              onChange={(value) => {
                let newDate = moment(new Date(value)).format("YYYY-MM-DD");
                setBirthDate(newDate);

                if (newDate === "1970-01-01") {
                  newDate = null;
                }

                setBirthDate(newDate);
              }}
            />
          </Box>
          <Box marginTop={"20px"} textAlign={"center"}>
            <Button
              mt={"15px"}
              color={"white"}
              type="logout"
              fontWeight={"bold"}
              borderRadius={"20px"}
              bgColor="#81B29A"
              width={"100px"}
              height={"35px"}
              onClick={formik.handleSubmit}
            >
              Save
            </Button>
          </Box>
        </Stack>
      )}

      <Stack spacing={3} margin="10">
        <HStack>
          <Text fontWeight={"bold"}>Address:</Text>
          <Spacer />
          <Link to="/user/address">
            <Text fontStyle={"italic"}>Change address</Text>
          </Link>
        </HStack>
        <Text fontSize={"16"}>{userLocation?.address}</Text>

        <Text fontWeight={"bold"}>Email:</Text>
        <HStack>
          <Text fontSize={"16"}>{userData.email}</Text>
          <Spacer />
        </HStack>
        <Text fontWeight={"bold"}>Password:</Text>
        <Flex>
          <Text fontWeight={"extrabold"}>**********</Text>
          <Spacer />
          <Text fontStyle={"italic"} onClick={onOpen}>
            Change password
          </Text>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent mt={"150px"} w={"400px"} bgColor={"#F4F1DE"}>
              <ModalHeader>Change Password</ModalHeader>
              <ModalBody>
                <Box
                  marginLeft={"50px"}
                  marginRight={"50px"}
                  marginTop={0}
                  fontFamily={"Roboto"}
                >
                  <FormControl
                    mt={"10px"}
                    isInvalid={formikPassword.errors.password}
                  >
                    <FormLabel fontWeight={"bold"}>Old Password</FormLabel>
                    <InputGroup>
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={formikPassword.values.password}
                        name="password"
                        placeholder="Enter your password"
                        borderRadius={"15px"}
                        _placeholder={{
                          color: "black.500",
                        }}
                        bgColor={"#D9D9D9"}
                        onChange={formChangePasswordHandler}
                      />
                      <InputRightElement width="4.5rem">
                        <Button
                          size="sm"
                          color={"white"}
                          borderRadius={"20px"}
                          bgColor={"#81B29A"}
                          fontSize={"16px"}
                          _hover={{
                            bgColor: "#81B29A",
                          }}
                          onClick={togglePassword}
                        >
                          {showPassword ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {formikPassword.errors.password}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    mt={"10px"}
                    isInvalid={formikPassword.errors.newPassword}
                  >
                    <FormLabel fontWeight={"bold"}>New Password</FormLabel>
                    <InputGroup>
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={formikPassword.values.newPassword}
                        name="newPassword"
                        placeholder="Enter your new password"
                        borderRadius={"15px"}
                        _placeholder={{
                          color: "black.500",
                        }}
                        bgColor={"#D9D9D9"}
                        onChange={formChangePasswordHandler}
                      />
                      <InputRightElement width="4.5rem">
                        <Button
                          size="sm"
                          color={"white"}
                          borderRadius={"20px"}
                          bgColor={"#81B29A"}
                          fontSize={"16px"}
                          _hover={{
                            bgColor: "#81B29A",
                          }}
                          onClick={toggleNewPassword}
                        >
                          {showPassword ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {formikPassword.errors.newPassword}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    mt={"10px"}
                    isInvalid={formikPassword.errors.confirmPassword}
                  >
                    <FormLabel fontWeight={"bold"}>
                      Confirm New Password
                    </FormLabel>
                    <InputGroup>
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formikPassword.values.confirmPassword}
                        placeholder="Enter your new password"
                        borderRadius={"15px"}
                        _placeholder={{
                          color: "black.500",
                        }}
                        bgColor={"#D9D9D9"}
                        onChange={formChangePasswordHandler}
                      />
                      <InputRightElement width="4.5rem">
                        <Button
                          size="sm"
                          bg={"#1b3c4b"}
                          color={"white"}
                          borderRadius={"20px"}
                          bgColor={"#81B29A"}
                          fontSize={"16px"}
                          _hover={{
                            bgColor: "#81B29A",
                          }}
                          onClick={toggleConfirmPassword}
                        >
                          {showConfirmPassword ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {formikPassword.errors.confirmPassword}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
              </ModalBody>
              <ModalFooter>
                <Button
                  borderRadius={"15px"}
                  bgColor={"#E07A5F"}
                  color={"white"}
                  mr={3}
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  borderRadius={"15px"}
                  bgColor={"#81B29A"}
                  color={"white"}
                  onClick={formikPassword.handleSubmit}
                >
                  Change Password
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>
        <Text fontWeight={"bold"}>Referral Code:</Text>
        <Text>{userData.my_referral_code}</Text>
      </Stack>
      {userData.is_verified === false ? (
        <Box
          marginTop={"20px"}
          display={"flex"}
          justifyContent={"space-between"}
          px={"40px"}
        >
          <Button
            mt={"15px"}
            color={"white"}
            type="logout"
            fontWeight={"bold"}
            borderRadius={"20px"}
            bgColor={"#81B29A"}
            width={"150px"}
            height={"35px"}
            onClick={sendVerificationEmail}
          >
            Verify Account
          </Button>
          <Button
            mt={"15px"}
            color={"white"}
            type="logout"
            fontWeight={"bold"}
            borderRadius={"20px"}
            bgColor={"#F84040"}
            width={"100px"}
            height={"35px"}
            onClick={logoutBtnHandler}
          >
            Logout
          </Button>
        </Box>
      ) : (
        <Box marginTop={"20px"} textAlign={"center"}>
          <Button
            mt={"15px"}
            color={"white"}
            type="logout"
            fontWeight={"bold"}
            borderRadius={"20px"}
            bgColor={"#F84040"}
            width={"100px"}
            height={"35px"}
            onClick={logoutBtnHandler}
          >
            Logout
          </Button>
        </Box>
      )}

      <Navigation />
    </Box>
  );
};

export default ProfilePage;
