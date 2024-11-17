import { Link, Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Import your global CSS file
import "../global.css";

// Import images
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {
  const { isLoggedIn, setIsLoggedIn, isUser, setUser, isLoading } = useGlobalContext();

  if (isLoading) {
    // Show a loading screen while checking the user's state
    return (
      <SafeAreaView className="bg-primary h-full flex justify-center items-center">
        <Text className="text-white text-xl font-psemibold">Loading...</Text>
      </SafeAreaView>
    );
  }

  if (isLoggedIn) {
    // Redirect once the user is confirmed to be logged in
    return <Redirect href="/home" />;
  }
  
  return (
    <SafeAreaView className="bg-primary h-full">
      {/* To ensure that contents remain within the safe area of the mobile device */}
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        {/* To make it scrollable. Responsive on all devices */}
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]" // works hand in hand with resizeMode
            resizeMode="contain" // helps contain with the screen of any device
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]" // works hand in hand with resizeMode
            resizeMode="contain" // helps contain with the screen of any device
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover endless possibilities with
              <Text className="text-secondary-200 flex flex-col justify-center">
                {" "}
                Aura
              </Text>
            </Text>
          </View>
          <Text className="text-base font-pregular text-gray-100 mt-7 text-center">
            Where creativity meets innovation: embark on a journey of limitless
            exploration
          </Text>
          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>

      {/* Helps with the status bar color */}
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
