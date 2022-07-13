import React from "react";
import { FlatList, ListRenderItemInfo } from "react-native";
import { Flex, Heading, HStack, Spinner, Box, View, Text } from "native-base";

import { useAppSelector } from "../hooks/reduxHooks";

import DataItem from "./UI/DataItem";

interface Props {
  dataToDisplay: "all" | "expenses" | "incomes";
  isLoading?: boolean;
  datesWithDataArr: string[];
}

const DataList: React.FC<Props> = ({
  dataToDisplay,
  isLoading,
  datesWithDataArr,
}) => {
  const allData = useAppSelector((state) => state.dataArr);

  function dataToDisplayByType(type: string) {
    let fetchedData: DataObj[];
    let noDataString: string;

    if (type === "all") {
      fetchedData = allData;

      noDataString = "Nothing here... please add some data! 📈";
    }
    if (type === "expenses") {
      fetchedData = allData.filter((item) => item.type === "expense");

      noDataString = "Please, add expenses! 📉";
    }
    if (type === "incomes") {
      fetchedData = allData.filter((item) => item.type === "income");

      noDataString = "Please, add incomes! 🤑";
    }

    return {
      fetchedData: fetchedData!,
      noDataString: noDataString!,
    };
  }

  const { fetchedData, noDataString } = dataToDisplayByType(dataToDisplay);

  let noDataContent: JSX.Element;
  if (isLoading) {
    noDataContent = (
      <HStack flex={1} space={2} justifyContent="center" alignItems="center">
        <Spinner
          accessibilityLabel="Loading data"
          color="darkBlue.600"
          size="lg"
        />
        <Heading fontSize="lg" color="darkBlue.600">
          Loading
        </Heading>
      </HStack>
    );
  }

  if (!isLoading && fetchedData.length <= 0) {
    noDataContent = (
      <Heading color="white" size="sm" textAlign="center">
        {noDataString}
      </Heading>
    );
  }

  function renderDateItem(itemData: ListRenderItemInfo<string>) {
    const dataItem = itemData.item;

    const itemsByDate = fetchedData.filter(
      (item) => item.date === itemData.item
    );

    return (
      <>
        <Box
          py={2}
          mb={5}
          borderBottomColor="darkBlue.600"
          borderBottomWidth={1}
          w="60%"
        >
          <Heading color="white" fontSize={20} fontWeight="semibold">
            {dataItem}
          </Heading>
        </Box>
        {itemsByDate!.map((item) => (
          <DataItem
            title={item.title}
            amount={item.amount}
            description={item.description}
            type={item.type}
            id={item.id}
            key={item.id}
          />
        ))}
      </>
    );
  }

  return (
    <Flex flex={1} bg="darkBlue.700" p={5} borderTopRadius={10}>
      {noDataContent!}
      {!isLoading && (
        <FlatList
          data={datesWithDataArr}
          renderItem={renderDateItem}
          keyExtractor={(item, index) => item + index}
        />
      )}
    </Flex>
  );
};

export default DataList;
