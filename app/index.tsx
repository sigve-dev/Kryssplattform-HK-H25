import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Post from "@/components/Post";
import { PostData } from "@/types/post";
import { Stack } from "expo-router";
import { useState } from "react";

export default function HomeScreen() {
  const posts: PostData[] = [
    {
      title: "Mitt flrste innlegg",
      description: "Sensasjonelt!",
    },
    {
      title: "Mitt andre innlegg",
      description: "Ubeskrivelig flott",
    },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View style={styles.mainContainer}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable onPress={() => setIsModalVisible(true)}>
              <Text>Knapp? Ja, knapp</Text>
            </Pressable>
          ),
        }}
      />
      <Modal visible={isModalVisible} animationType="slide">
        <Pressable onPress={() => console.log("Kna")}>
          <Text>Knapp?</Text>
        </Pressable>
      </Modal>
      <FlatList
        data={posts}
        ItemSeparatorComponent={() => <View style={{ height: 12 }}></View>}
        renderItem={(post) => <Post postData={post.item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  post: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});
