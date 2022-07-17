import {
  Text,
  SafeAreaView,
  View,
  Image,
  TextInput,
  ScrollView
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ChevronDownIcon,
  UserIcon,
  SearchIcon,
  AdjustmentsIcon
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from "../sanity";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(
        `
          *[_type == "featured"] | order(_createdAt desc) {
            ...,
            restaurants[]->{
              ...,
              dishes[]->
            }
          }
        `
      )
      .then((data) => setFeaturedCategories(data));
  }, []);

  return (
    <SafeAreaView className="bg-white pt-4">
      {/* Header */}
      <View className="bg-white flex-row pb-3 justify-between items-center px-4">
        <Image
          source={{
            uri: "https://links.papareact.com/wru"
          }}
          className="h-7 w-7 bg-gray-300 p-5 rounded-full mr-2"
        />

        <View className="flex-1">
          <Text className="font-bold text-xs text-gray-500">Deliver Now!</Text>
          <Text className="font-bold text-xl">
            Current Location
            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>
        <View>
          <UserIcon size={40} color="#00CCBB" />
        </View>
      </View>

      {/* Search */}
      <View className="flex-row items-center space-x-2 pb-2 px-4">
        <View className="flex-row flex-1 space-x-2 bg-gray-300 p-2">
          <SearchIcon color="gray" size={20} />
          <TextInput
            placeholder="Restaurants and cuisines"
            keyboardType="default"
          />
        </View>
        <AdjustmentsIcon color="#00CCBB" />
      </View>

      {/* Body */}
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 100
        }}
      >
        {/* Categories */}
        <Categories />

        {/* Featured Rows */}
        {featuredCategories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            desc={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
