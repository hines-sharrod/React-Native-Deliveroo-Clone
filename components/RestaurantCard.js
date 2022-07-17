import { View, Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import { LocationMarkerIcon } from "react-native-heroicons/outline";
import { StarIcon } from "react-native-heroicons/solid";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";

const RestaurantCard = ({
  id,
  imgUrl,
  title,
  rating,
  type,
  location,
  lat,
  long,
  dishes,
  desc
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Restaurant", {
          id,
          imgUrl,
          title,
          rating,
          type,
          location,
          lat,
          long,
          dishes,
          desc
        });
      }}
      className="bg-white mr-3 shadow"
    >
      <Image
        source={{
          uri: urlFor(imgUrl).url()
        }}
        className="h-36 w-64 rounded-sm"
      />

      <View className="px-3 pt-2 pb-4">
        <Text className="text-lg font-bold">{title}</Text>
        <View className="flex-row space-x-1 items-center">
          <StarIcon color="green" opacity={0.4} size={22} />
          <Text className="text-gray-500 text-xs">
            <Text className="text-green-500">{rating}</Text> · {type}
          </Text>
        </View>
        <View className="flex-row space-x-1 items-center">
          <LocationMarkerIcon color="#00CCBB" size={22} />
          <Text className="text-gray-500 text-xs">Nearby · {location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
