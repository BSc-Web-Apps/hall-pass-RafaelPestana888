import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex flex-1 py-32 bg-background">
      <View className="flex flex-row h-20 w-full border-2 border-cyan-400">
        <View className="flex w-24 h-full border-2 border-pink-400"></View>
        <View className="flex flex-1 h-full border-2 border-green-400">
        <Text className="text-foreground">Feed the cat</Text>
        <Text className="text-foreground">Feed the cat</Text>
        </View>
      </View>
    </View>
  );
}