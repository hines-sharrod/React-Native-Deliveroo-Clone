import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  Touchable,
  TouchableOpacity
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../store/restaurant";
import { getTotalCost, selectCartItems } from "../store/cart";
import { XCircleIcon } from "react-native-heroicons/solid";
import { urlFor } from "../sanity";

const CartScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectCartItems);
  const totalCost = useSelector(getTotalCost);
  const [groupedCartItems, setGroupedCartItems] = useState([]);

  useEffect(() => {
    const groupedItems = items.reduce((group, item) => {
      const { id } = item; // destructure the id key from each item object
      group[id] = group[id] ?? []; // sets a group object with the item id as the key or sets it to an empty array
      group[id].push(item); // adds current item to the new id keyed object
      return group;
    }, {});

    setGroupedCartItems(groupedItems);
  }, [items]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="bg-white px-2 py-4 items-center relative mb-4 shadow-xs border-b border-[#00CCBB]">
          <Text className="font-bold text-base">Cart</Text>
          <Text className="text-gray-400 text-xs">{restaurant.title}</Text>
          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute right-6 top-3 rounded-full bg-gray-100"
          >
            <XCircleIcon color="gray" opacity={0.5} size={40} />
          </TouchableOpacity>
        </View>

        <View className="bg-white px-2 py-2 flex-row items-center space-x-4 mb-4 ">
          <Image
            source={{
              uri: urlFor(restaurant.imgUrl).url()
            }}
            className="w-8 h-8 rounded-full"
          />
          <Text className="text-xs flex-1">Deliver in 50-75 mins</Text>
          <Text className="text-gray-400 text-xs">Change</Text>
        </View>

        <ScrollView>
          {Object.entries(groupedCartItems).map(([key, groupedItems]) => (
            <View
              key={key}
              className="bg-white px-4 py-2 flex-row items-center justify-between space-x-4 border-b border-[#00CCBB]/25"
            >
              <View className="flex-row items-center flex-1">
                <Text className="text-gray-400 text-xs">
                  {groupedItems.length} x
                </Text>
                <Image
                  source={{
                    uri: urlFor(groupedItems[0]?.imgUrl).url()
                  }}
                  className="w-12 h-12 rounded-full mx-3"
                />
                <Text>{groupedItems[0]?.title}</Text>
              </View>

              <View className="flex-row items-center space-x-3">
                <Text>${groupedItems[0]?.price}</Text>
                <Text className="text-gray-400 text-xs">Remove</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View className="bg-white mt-5 px-4 py-4 space-y-3">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400">{totalCost}</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery Fee</Text>
            <Text className="text-gray-400">$0.00</Text>
          </View>

          <View className="flex-row justify-between mb-2">
            <Text>Order Total</Text>
            <Text className="font-extrabold">{totalCost}</Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("PreparingOrder")}
            className="bg-gray-400 rounded-lg p-5"
          >
            <Text className="font-bold text-center text-white">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;
