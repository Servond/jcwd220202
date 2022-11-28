import {
  Box,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

const OtherMenuBar = ({ isOpen, closeModal }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal}>
        {/* ini yang disamadenganin adalah props yang akan dipassing */}
        <ModalOverlay />
        <ModalContent
          position={"fixed"}
          height={"60%"}
          bottom={"-20"}
          marginLeft={"60%"}
          fontFamily={"roboto"}
          fontSize={"16px"}
          fontWeight={"bold"}
          border={"5px solid"}
          borderRadius={"15px"}
          borderColor={"white"}
          backgroundColor={"#E07A5F"}
        >
          <ModalHeader>Other</ModalHeader>
          <ModalBody>
            <Box display={"flex"}>
              <Text>Statistic</Text>
            </Box>
            <Box display={"flex"}>
              <Text>Logout</Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default OtherMenuBar;
