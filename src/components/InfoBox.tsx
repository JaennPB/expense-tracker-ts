import React from "react";
import { Text, Flex } from "native-base";

interface Props {
  type: string;
  data: string | number;
  color: "success.500" | "error.400";
}

const InfoBox: React.FC<Props> = ({ color, data, type }) => {
  return (
    <Flex
      direction="row"
      justify="space-between"
      align="center"
      px={5}
      py={2}
      bg={color}
      borderRadius={5}
    >
      <Text color="white" fontSize="md">
        {type}
      </Text>
      <Text color="white" fontSize="md">
        {data}
      </Text>
    </Flex>
  );
};

export default InfoBox;
