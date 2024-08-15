import { Button, Image, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";


const NavOptions = () => {

const navigation=useNavigation()

  const datas = [
    {
      id: "124",
      title: "Get a Ride",
      image: "https://links.papareact.com/3pn",
      screen: "MapScreen",
    },
    {
      id: "567",
      title: "order food",
      image: "https://links.papareact.com/28w",
      screen: "EatsScreen",
    },
  ];

  return (
    <View>
      <Text>
        {datas.map((data) => (
          <View
            key={data.id}
            style={tw`pb-6 pt-3 flex-1 justify-center items-center `}
          >
            <View style={tw`bg-gray-300  ml-5 p-4 gap-3`}>
              <Image
                style={{
                  width: 120,
                  height: 120,
                  resizeMode: "contain",
                }}
                source={{ uri: data.image }}
              />
              <Button onPress={()=>navigation.navigate(data.screen)} title={data.title} />
              <Icon 

                style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                name="arrowright"
                color='white'
                type="antdesign"
              />
            </View>
          </View>
        ))}
      </Text>
    </View>
  );
};

export default NavOptions;
