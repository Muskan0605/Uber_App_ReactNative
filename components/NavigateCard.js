import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useDebugValue } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch } from "react-redux";
import { setDestination } from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";
import NavFavourite from "./NavFavourite";
import { Icon } from "@rneui/base";

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <View style={tw`bg-white flex-1`}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("HomeScreen");
        }}
        style={tw`absolute top-3 left-5 p-2 rounded-full z-50 bg-gray-400`}
      >
        <Icon name="chevron-left" type="fontawesome" />
      </TouchableOpacity>
      <Text style={tw`text-center py-4 text-xl`}>Good Morining, Ujjwal</Text>
      <View style={tw`border-t border-gray-200`}>
        <View>
          <GooglePlacesAutocomplete
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              navigation.navigate("RideOptionCards");
            }}
            placeholder="where to ?"
            styles={{
              container: [tw`bg-gray-200`, styles.container],
              textInput: [tw`bg-slate-400 text-black`, styles.textInput],
              textInputContainer: [
                tw`bg-gray-100 rounded-full`,
                styles.textInputContainer,
              ],
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            returnKeyType={"search"}
            debounce={400}
            fetchDetails={true}
            query={{
              key: GOOGLE_MAPS_API_KEY,
              language: "en",
            }}
          />
        </View>
      </View>
      <View style={{ zIndex: -1 }}>
        <NavFavourite />
      </View>
      <View
        style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("RideOptionCards");
          }}
          style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full z-50`}
        >
          <Icon name="car" type="font-awesome" color="white" size={16}></Icon>
          <Text style={tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full`}
        >
          <Icon
            name="fast-food-outline"
            type="ionicon"
            color="black"
            size={16}
          ></Icon>
          <Text style={tw`text-center`}>Eats</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NavigateCard;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    borderRadius: 0,
    fontSize: 18,
    color: "#000", // Darker text color
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
