import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";

const Dish = ({ title, description, price, imgUrl }) => {
  const [editQuantity, setEditQuantity] = useState(false);

  return (
    <TouchableOpacity onPress={() => setEditQuantity(!editQuantity)}>
      <View className="flex-row py-4 px-4 border-solid border-b-2 border-slate-50">
        <View className="flex-1">
          <Text className="text-base mb-2">{title}</Text>
          <Text className="text-xs mb-2 text-gray-400">{description}</Text>
          <Text className="text-xs mb-2 text-gray-400">${price}</Text>

          {editQuantity && (
            <View className="text-xs mb-2 text-gray-400 flex-row items-center space-x-2 mt-2">
              <TouchableOpacity>
                <MinusCircleIcon size={35} color="#00CCBB" />
              </TouchableOpacity>
              <Text>1</Text>
              <TouchableOpacity>
                <PlusCircleIcon size={35} color="#00CCBB" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <Image
          source={{
            uri: imgUrl
          }}
          className="w-20 h-20"
        />
      </View>
    </TouchableOpacity>
  );
};

export default Dish;
