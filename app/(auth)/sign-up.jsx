import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

// Import images
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";

import { createUser } from '../../lib/appwrite'

const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmit = () => {
    createUser()
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
            Sign up to Aura
          </Text>

          <FormField
            title="Username"
            value={form.username}
            placeholder="Username"
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
            // keyboardType="email-address"
          />

          <FormField
            title="Email"
            value={form.email}
            placeholder="Email"
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="New-Password"
            placeholder="New Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            // keyboardType="email-address"
          />
{/* 
          <FormField
            title="Confirm-Password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            handleChangeText={(e) => setForm({ ...form, confirmPassword: e })}
            otherStyles="mt-7"
          /> */}

          <CustomButton
            title="Sign up"
            handlePress={handleSubmit}
            isLoading={isSubmit}
            containerStyles="mt-7"
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Sign in
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
