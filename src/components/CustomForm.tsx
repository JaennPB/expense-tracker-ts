import React from "react";
import { VStack, Flex, Button, Heading, IconButton, Icon } from "native-base";

import { Entypo } from "@expo/vector-icons";

import moment from "moment";

import CustomInput from "./UI/CustomInput";

import { useAppNavigation } from "../hooks/navigationHooks";
import { useAppDispatch } from "../hooks/reduxHooks";

interface Props {
  isEditing: boolean;
}

const CustomForm: React.FC<Props> = (props: Props) => {
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();
  const [isExpense, setIsExpense] = React.useState<boolean>(true);
  const [isIncome, setIsIncome] = React.useState<boolean>(false);
  const [data, setData] = React.useState<{ title: string; amount: string }>({
    title: "",
    amount: "",
  });

  function dataEnteredHandler(
    inputIdentifier: string,
    enteredText: string
  ): void {
    setData((prevState) => {
      return {
        ...prevState,
        [inputIdentifier]: enteredText,
      };
    });
  }

  function submitDataHandler(data: { title: string; amount: string }): void {
    const modifiedDataObject = {
      id: data.title + "-id",
      title: data.title,
      amount: +data.amount,
      date: moment().format("MMM Do YY"),
      type: isExpense ? "expense" : "income",
    };

    navigation.goBack();
    console.log(modifiedDataObject);
  }

  function toggleExpenseOrIncomeHandler(dataType: string): void {
    if (dataType === "expense" && !isExpense) {
      setIsExpense(true);
      setIsIncome(false);
    }

    if (dataType === "income" && !isIncome) {
      setIsIncome(true);
      setIsExpense(false);
    }
  }

  let topContent!: JSX.Element;
  let headingContent!: string;

  if (!props.isEditing) {
    topContent = (
      <Button.Group
        isAttached
        borderWidth={1}
        borderRadius={5}
        borderColor="darkBlue.600"
      >
        <IconButton
          icon={<Icon as={Entypo} name="minus" color="white" />}
          bgColor={isExpense ? "darkBlue.600" : null}
          w={66}
          onPress={toggleExpenseOrIncomeHandler.bind(this, "expense")}
        />
        <IconButton
          icon={<Icon as={Entypo} name="plus" color="white" />}
          bgColor={isIncome ? "darkBlue.600" : null}
          w={66}
          onPress={toggleExpenseOrIncomeHandler.bind(this, "income")}
        />
      </Button.Group>
    );

    if (isExpense) headingContent = "New expense";
    if (isIncome) headingContent = "New income";
  }

  return (
    <>
      {topContent}
      <Heading color="white" mt={props.isEditing ? 0 : 5}>
        {headingContent}
      </Heading>

      <VStack w="100%" mt={props.isEditing ? 0 : 5} space={5}>
        <CustomInput
          title="Title"
          type="default"
          onChangeText={dataEnteredHandler.bind(this, "title")}
          value={data.title}
        />
        <CustomInput
          title="Amount"
          type="decimal-pad"
          onChangeText={dataEnteredHandler.bind(this, "amount")}
          value={data.amount}
        />
      </VStack>
      <Flex direction="row" w="100%" mt={5} justify="space-between">
        <Button w={150} variant="ghost" onPress={() => navigation.goBack()}>
          Cancel
        </Button>
        <Button
          w={150}
          bg="success.400"
          onPress={submitDataHandler.bind(this, data)}
        >
          {props.isEditing ? "Update" : "Add"}
        </Button>
      </Flex>
    </>
  );
};

export default CustomForm;
