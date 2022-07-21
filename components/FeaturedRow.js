import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from "./RestaurantCard";
import sanityClient from "../sanity";

const FeaturedRow = ({ id, title, desc }) => {
  const [restaurants, setRestaurants] = useState();

  useEffect(() => {
    sanityClient
      .fetch(
        `
          *[_type == "featured" && _id == $id] {
            ...,
            restaurants[]->{
              ...,
              dishes[]->,
              type->{
                name
              }
            }
          }[0]
        `,
        { id }
      )
      .then((data) => setRestaurants(data?.restaurants));
  }, []);

  return (
    <View>
      <View className="flex-row w-100 h-100 mt-4 px-4 items-center space-x-2">
        <View className="flex-1">
          <Text className="text-lg font-bold">{title}</Text>
          <Text className="text-gray-500 text-xs">{desc}</Text>
        </View>
        <ArrowRightIcon color="#00CCBB" />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15
        }}
        className="mt-4"
      >
        {restaurants?.map((res) => (
          <RestaurantCard
            key={res._id}
            id={res._id}
            imgUrl={res.image}
            title={res.name}
            rating={res.rating}
            type={res.type.name}
            location={res.address}
            lat={res.lat}
            long={res.long}
            dishes={res.dishes}
            desc={res.short_description}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
