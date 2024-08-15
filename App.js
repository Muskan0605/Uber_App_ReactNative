import { StyleSheet, Text, View,KeyboardAvoidingView,Platform } from "react-native";
import { Provider } from "react-redux";
import { store } from "./store";
import HomeScreen from "./screens/HomeScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapScreen from "./screens/MapScreen";
import tw from "twrnc";



// set up redux
export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <KeyboardAvoidingView 
        style={{flex:1}}
        {...(Platform.OS === 'android' && { behavior: 'padding' })}
         keyboardVerticalOffset={Platform.OS==='android'?-64:0}
       
        >
           <Stack.Navigator>
            <Stack.Screen 
            name="HomeScreen" 
            component={HomeScreen} 
            options={{
              headerShown:false,
            }}
            />
            <Stack.Screen 
            name="MapScreen" 
            component={MapScreen} 
            options={{
              headerShown:false,
            }}
            />
          </Stack.Navigator>
        </KeyboardAvoidingView>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 20,
  },
});
