import {
  ScrollView,
  Text,
  View,
  Pressable,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState } from "react";
import { useColors } from "@/hooks/use-colors";
import { ScreenContainer } from "@/components/screen-container";
import * as Haptics from "expo-haptics";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: string;
}

export default function ChatScreen() {
  const colors = useColors();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm your AI study assistant. I can help you with your tasks, GPA planning, and career guidance. How can I help you today?",
      sender: "ai",
      timestamp: "10:30 AM",
    },
  ]);

  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = () => {
    if (inputText.trim()) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        sender: "user",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInputText("");
      setIsLoading(true);

      // Simulate AI response
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "I'm processing your request. Please set up your API key in settings to enable full AI capabilities.",
          sender: "ai",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, aiMessage]);
        setIsLoading(false);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }, 1000);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScreenContainer className="p-0">
        {/* Header */}
        <View className="bg-gradient-to-br from-primary to-blue-600 px-6 pt-6 pb-6">
          <Text className="text-3xl font-bold text-white mb-1">AI Assistant</Text>
          <Text className="text-white opacity-90">Powered by Gemini</Text>
        </View>

        {/* Messages List */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              className={`px-6 py-3 flex-row ${
                item.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <View
                className={`max-w-xs px-4 py-3 rounded-2xl ${
                  item.sender === "user"
                    ? "bg-primary rounded-br-none"
                    : "bg-surface border border-border rounded-bl-none"
                }`}
              >
                <Text
                  className={`text-base ${
                    item.sender === "user" ? "text-white" : "text-foreground"
                  }`}
                >
                  {item.text}
                </Text>
                <Text
                  className={`text-xs mt-1 ${
                    item.sender === "user"
                      ? "text-white opacity-70"
                      : "text-muted"
                  }`}
                >
                  {item.timestamp}
                </Text>
              </View>
            </View>
          )}
          contentContainerStyle={{ paddingVertical: 16 }}
          scrollEnabled={true}
          nestedScrollEnabled={true}
        />

        {/* Loading Indicator */}
        {isLoading && (
          <View className="px-6 py-2 flex-row items-center gap-2">
            <View className="flex-row gap-1">
              <View
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: colors.primary }}
              />
              <View
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: colors.primary, opacity: 0.6 }}
              />
              <View
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: colors.primary, opacity: 0.3 }}
              />
            </View>
            <Text className="text-sm text-muted">AI is thinking...</Text>
          </View>
        )}

        {/* Input Area */}
        <View
          className="px-6 py-4 border-t flex-row gap-3 items-center"
          style={{ borderTopColor: colors.border }}
        >
          <TextInput
            placeholder="Ask me anything..."
            value={inputText}
            onChangeText={setInputText}
            placeholderTextColor={colors.muted}
            multiline
            maxLength={500}
            className="flex-1 border rounded-full px-4 py-3 text-foreground"
            style={{
              borderColor: colors.border,
              borderWidth: 1,
              maxHeight: 100,
            }}
          />
          <Pressable
            onPress={sendMessage}
            disabled={!inputText.trim() || isLoading}
            style={({ pressed }) => [
              {
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: inputText.trim() ? colors.primary : colors.muted,
                justifyContent: "center",
                alignItems: "center",
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Text className="text-white text-xl">→</Text>
          </Pressable>
        </View>
      </ScreenContainer>
    </KeyboardAvoidingView>
  );
}
