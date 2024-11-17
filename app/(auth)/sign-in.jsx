import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";

// Import images
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { signIn } from "../../lib/appwrite";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmit, setIsSubmit] = useState(false);


  const handleSubmit = async () => {
    if (!form.password || !form.email) {
      Alert.alert("Error", "Please fill in all fields");
      return
    }

    setIsSubmit(true);

    try {
      const result = await signIn(
        form?.email,
        form?.password
      );

      // set it to global state...

      router.replace('/home')
    } catch (error) {
      Alert.alert("Error", error?.message || "something went wrong");
    } finally {
      setIsSubmit(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full flex flex-col justify-center min-h-[83vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />

          <Text className="text-2xl text-white font-psemibold mt-10 ">
            Login to Aura
          </Text>

          <FormField
            title="Email"
            value={form.email}
            placeholder="Email"
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            placeholder="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          // keyboardType="email-address"
          />

          <CustomButton
            title="Sign in"
            handlePress={handleSubmit}
            isLoading={isSubmit}
            containerStyles="mt-7"
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account? 
            </Text>
            <Link href='/sign-up' className="text-lg font-psemibold text-secondary">
              Sign up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
