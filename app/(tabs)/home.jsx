import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";

// Import images
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import Trending from "../../components/Trending";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import { useAPPWrite } from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { StatusBar } from "expo-status-bar";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);

  const { data: posts, isLoading, refetch } = useAPPWrite(getAllPosts);
  const { data: latestPosts, } = useAPPWrite(getLatestPosts);

  const onRefresh = async () => {
    setRefreshing(true);

    // re-call videos -> if any new videos appeared
    await refetch()

    setRefreshing(false);
  };

  // console.log(posts)

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-primary ">
        <FlatList
          horizontal={false}
          // data={[{ id: 1 }, { id: 2 }, { id: 13 }]}
          data={posts}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <VideoCard video={item} />
          )}
          ListHeaderComponent={() => (
            // add a heading above the List content
            <View className="my-6 px-6 space-y-6 ">
              <View className="justify-between items-start flex-row mb-6">
                <View>
                  <Text className="font-pmedium text-sm text-gray-100">
                    Welcome back
                  </Text>
                  <Text className="text-2xl font-psemibold text-white">
                    JSMastery
                  </Text>
                </View>

                <View className="mt-1.5">
                  <Image
                    source={images?.logoSmall}
                    className="w-9 h-10"
                    resizeMode="contain"
                  />
                </View>
              </View>
              <SearchInput />
              <View className="w-full flex-1 pt-5 pb-8">
                <Text className="text-gray-100 text-lg font-pregular mb-3">
                  Latest Videos
                </Text>
                {/* Add a trending component here */}
                <Trending posts={latestPosts ?? []} />
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title="No videos found"
              subtitle="Be the first to create a video"
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />


        {/* Helps with the status bar color */}
        <StatusBar backgroundColor="#161622" style="light" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Home;
