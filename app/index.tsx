import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import Post from "@/components/Post";
import { PostData } from "@/types/post";
import { Stack } from "expo-router";
import { useState } from "react";

export default function HomeScreen() {
  const [posts, setPosts] = useState<PostData[]>([
    {
      title: "Mitt flrste innlegg",
      description: "Sensasjonelt!",
    },
    {
      title: "Mitt andre innlegg",
      description: "Ubeskrivelig flott",
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [nyTittel, setNyTittel] = useState("");
  const [nyBeskrivelse, setNyBeskrivelse] = useState("");

  const leggTilInnlegg = () => {
    if (nyTittel.trim() && nyBeskrivelse.trim()) {
      setPosts([
        { title: nyTittel, description: nyBeskrivelse },
        ...posts,
      ]);
      setNyTittel("");
      setNyBeskrivelse("");
      setIsModalVisible(false);
    } else {
      Alert.alert("Feil", "Tittel og beskrivelse kan ikke være tomme.");
    }
  }

  return (
    <View style={styles.mainContainer}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable onPress={() => setIsModalVisible(true)}>
              <Text>Registrer nytt innlegg</Text>
            </Pressable>
          ),
        }}
      />
    
      <Modal 
        visible={isModalVisible} 
        animationType="fade"
        transparent={true}
        onRequestClose={() => {
          setIsModalVisible(false);
          Alert.alert("Modal has been closed.");
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Nytt innlegg</Text>
            <TextInput
              placeholder="Tittel"
              value={nyTittel}
              onChangeText={setNyTittel}
              style={{ height: 40, borderColor: 'gray', borderWidth: 1}}
            />
            <TextInput
              placeholder="Beskrivelse"
              value={nyBeskrivelse}
              onChangeText={setNyBeskrivelse}
              style={{ height: 80, borderColor: 'gray', borderWidth: 1, marginTop: 8 }}
              multiline
            />
            <View style={{ flexDirection: "row" }}></View>
            <Pressable onPress={leggTilInnlegg}>
              <Text>Legg til innlegg</Text>
            </Pressable>
            <Pressable onPress={() => setIsModalVisible(false)}>
              <Text>Lukk registreringen</Text>
            </Pressable>
          </View>
        </View>
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
    centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)", // Optional: adds a dim background
  },
  modalView: {
    margin: 20,
    justifyContent: "center",
    display: "flex",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    
  },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }
});
