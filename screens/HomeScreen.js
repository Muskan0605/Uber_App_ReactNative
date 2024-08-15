import {
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  View,
  Image,
} from "react-native";
import React from "react";
import tw from "twrnc";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { setDestination, setOrigin } from "../slices/navSlice";
import { useDispatch } from "react-redux";
import NavFavourite from "../components/NavFavourite";

const HomeScreen = () => {
  const dispatch = useDispatch();

  return (
    <View style={tw`mt-3 ml-2 p-2`}>
      <View>
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
          }}
          source={{
            uri: "https://links.papareact.com/gzs",
          }}
        />
        <GooglePlacesAutocomplete
          placeholder="Where from?"
          fetchDetails={true}
          enablePoweredByContainer={false}
          returnKeyType={"search"}
          onPress={(data, details = null) => {
            if (details) {
              dispatch(
                setOrigin({
                  // Latitude and Longitude
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              dispatch(setDestination(null));
            } else {
              console.error("Details not available");
            }
          }}
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            },
          }}
          query={{
            key: GOOGLE_MAPS_API_KEY,
            language: "en",
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          onFail={(error) => console.log(error)}
        />
      </View>
      <NavOptions />
      <NavFavourite/>
    </View>
  );
};

export default HomeScreen;
