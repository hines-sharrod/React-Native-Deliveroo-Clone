import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { getTotalCost } from "../store/cart";

const CartButton = () => {
  const items = useSelector((state) => state.cart.items);
  const totalCost = useSelector(getTotalCost);
  const navigation = useNavigation();

  if (items.length === 0) return null;

  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity
        onPress={() => navigation.navigate("Cart")}
        className="mx-5 bg-green-600 p-4 rounded-lg flex-row items-center justify-between space-x-1"
      >
        <Text className="bg-gray-500 py-1 px-2 text-lg text-white font-extrabold">
          {items.length}
        </Text>
        <Text className="text-white text-center font-extrabold text-lg flex-1">
          View Basket
        </Text>
        <Text className="text-white font-bold text-lg">{totalCost}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartButton;
