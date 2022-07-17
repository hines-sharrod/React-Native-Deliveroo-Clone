import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { urlFor } from "../sanity";
import {
  ArrowLeftIcon,
  StarIcon,
  LocationMarkerIcon,
  ChevronRightIcon
} from "react-native-heroicons/solid";
import { QuestionMarkCircleIcon } from "react-native-heroicons/outline";

const RestaurantScreen = () => {
  const navigation = useNavigation();

  const {
    params: {
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
    }
  } = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  return (
    <ScrollView>
      <View className="relative ">
        <Image
          source={{
            uri: urlFor(imgUrl).url()
          }}
          className="w-100 h-56 bg-gray-300 p-4 "
        />
        <TouchableOpacity
          className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
          onPress={() => {
            navigation.goBack();
          }}
        >
          <ArrowLeftIcon size={20} color="#00CCBB" />
        </TouchableOpacity>
      </View>

      <View className="bg-white divide-y divide-gray-300">
        <View className="px-4 pt-4">
          <Text className="text-2xl font-bold mb-1">{title}</Text>
          <View className="flex-row space-x-1 items-center">
            <StarIcon color="green" opacity={0.5} size={22} />
            <Text className="text-gray-400 text-xs font-bold mr-1">
              <Text className="text-green-500">{rating}</Text> · {type}
            </Text>
            <LocationMarkerIcon color="#00CCBB" size={22} opacity={0.5} />
            <Text className="text-gray-500 text-xs">Nearby · {location}</Text>
          </View>
          <Text className=" text-gray-500 my-3">{desc}</Text>
        </View>

        <View className="flex-row space-x-4 px-4 items-center py-4">
          <QuestionMarkCircleIcon size={20} color="#00CCBB" />
          <Text className="font-semibold flex-1">Have a food allergy?</Text>
          <ChevronRightIcon size={20} color="#00CCBB" />
        </View>
      </View>
    </ScrollView>
  );
};

export default RestaurantScreen;
