import React from "react";
import { StyleSheet, Alert } from "react-native";
import { Pressable } from "native-base";

import Animated, {
  interpolate,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

import { useAppNavigation } from "../../hooks/navigationHooks";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { removeItem, deleteDate } from "../../app/mainSlice";

import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../db/firebase";

import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

interface Props {
  translateX: Animated.SharedValue<number>;
  itemId: string;
  onResetAnimation: () => void;
}

const HiddenButtons: React.FC<Props> = ({
  translateX,
  itemId,
  onResetAnimation,
}) => {
  const dataArr = useAppSelector((state) => state.dataArr);
  const currUserDocId = useAppSelector((state) => state.userId);

  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  function navigateToEditItem() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    navigation.navigate("ManageDataScreen", { itemIdtoEdit: itemId });
    onResetAnimation();
  }

  async function deleteItemHandler() {
    if (!itemId) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    dispatch(removeItem(itemId));

    try {
      await deleteDoc(doc(db, "users", currUserDocId, "data", itemId));
    } catch {
      Alert.alert("Error deleting... ❌");
      return;
    }

    const CurrItem = dataArr.find((item) => item.id === itemId)!;

    dispatch(deleteDate(CurrItem.date));
  }

  const rStyle = useAnimatedStyle(() => {
    const inputRange = [0, -100];
    const opacity = interpolate(translateX.value, inputRange, [0, 1]);
    const scale = interpolate(translateX.value, inputRange, [0, 1]);
    const right = interpolate(translateX.value, inputRange, [-10, 0]);

    return {
      opacity: opacity,
      transform: [{ scale: withSpring(scale) }],
      right: right + "%",
    };
  });

  return (
    <Animated.View style={[styles.buttonsContainer, rStyle]}>
      <Pressable onPress={navigateToEditItem}>
        <MaterialIcons name="edit" size={30} color="#0077e6" />
      </Pressable>
      <Pressable onPress={deleteItemHandler}>
        <FontAwesome5 name="trash" size={25} color="#fb7185" />
      </Pressable>
    </Animated.View>
  );
};

export default HiddenButtons;

const styles = StyleSheet.create({
  buttonsContainer: {
    position: "absolute",
    width: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginRight: 10,
  },
});
