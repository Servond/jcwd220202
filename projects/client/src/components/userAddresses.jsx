import { Button, Td, Text, Tr } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { axiosInstance } from "../api"

const AddressList = ({}) => {
  const [address, setAddress] = useState([])

  const fetchAddress = async () => {
    try {
      const response = await axiosInstance.get("/address")
      console.log(response.data.data)
      setAddress(response.data.data)
    } catch (err) {
      console.log(err)
    }
  }
  console.log(address);
  useEffect(() => {
    fetchAddress()
  }, [])

  return (
    <>
      <Text>{address}</Text>
      <Button>klik!</Button>
    </>
  )
}

export default AddressList
