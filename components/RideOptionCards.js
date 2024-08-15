import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { selectTravelTimeInformation } from "../slices/navSlice";
import { useSelector } from "react-redux";

const datas = [
  {
    id: "123",
    title: "UberX",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "456",
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "789",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
];

const SURGE_CHARGE_RATE = 1.5;
const GBP_TO_INR = 100; // Exchange rate from GBP to INR

const RideOptionCards = () => {
  const [selected, setSelected] = useState();
  const navigation = useNavigation();
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  // Function to convert miles to kilometers
  const convertMilesToKm = (miles) => {
    return (parseFloat(miles) * 1.60934).toFixed(2);
  };

  return (
    <View style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("NavigateCard");
          }}
          style={tw`absolute top-3 left-5 p-2 rounded-full z-50 bg-gray-400`}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-center py-4 text-xl`}>
          Select A Ride - {travelTimeInformation?.distance?.text 
            ? `${convertMilesToKm(travelTimeInformation?.distance.text.split(' ')[0])} km`
            : ""}
        </Text>
      </View>
      <FlatList
        data={datas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelected(item);
            }}
            style={[
              tw`flex-row items-center px-6 py-1 justify-between`,
              item.id === selected?.id && tw`bg-gray-300`,
            ]}
          >
            <Image
              style={{
                width: 100,
                height: 80,
                resizeMode: "contain",
              }}
              source={{ uri: item.image }}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{item.title}</Text>
              <Text>{travelTimeInformation?.duration.text} approx..</Text>
            </View>
            <Text style={tw`text-xl`}>
              {
                new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(
                  ((travelTimeInformation?.duration.value *
                    SURGE_CHARGE_RATE *
                    item.multiplier) /
                    100) *
                    GBP_TO_INR
                )
              }
            </Text>
          </TouchableOpacity>
        )}
      />
      <View>
        <TouchableOpacity
          style={tw`bg-black py-3 m-3`}
          disabled={!selected}
        >
          <Text style={tw`text-center text-white text-xl`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RideOptionCards;

const styles = StyleSheet.create({});
