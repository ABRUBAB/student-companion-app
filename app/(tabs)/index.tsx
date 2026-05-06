import { ScrollView, Text, View, TouchableOpacity, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useColors } from "@/hooks/use-colors";
import { ScreenContainer } from "@/components/screen-container";
import * as Haptics from "expo-haptics";

export default function HomeScreen() {
  const router = useRouter();
  const colors = useColors();

  const handleNavigate = (screen: "tasks" | "gpa" | "chat" | "roadmap") => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(`/(tabs)/${screen}` as any);
  };

  return (
    <ScreenContainer className="p-0">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Header Section */}
        <View className="bg-gradient-to-br from-primary to-secondary px-6 pt-8 pb-12">
          <Text className="text-4xl font-bold text-white mb-2">Welcome Back</Text>
          <Text className="text-base text-white opacity-90">
            Let's make today productive
          </Text>
        </View>

        {/* Main Content */}
        <View className="px-6 pt-8 pb-20 gap-6">
          {/* Quick Stats Cards */}
          <View className="gap-4">
            <Text className="text-xl font-bold text-foreground">Your Stats</Text>
            
            <View className="flex-row gap-3">
              {/* CGPA Card */}
              <Pressable
                onPress={() => handleNavigate("gpa")}
                style={({ pressed }) => [
                  {
                    flex: 1,
                    backgroundColor: colors.surface,
                    borderRadius: 16,
                    padding: 16,
                    borderWidth: 1,
                    borderColor: colors.border,
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
              >
                <Text className="text-sm text-muted font-medium mb-2">CGPA</Text>
                <Text className="text-3xl font-bold text-primary">3.8</Text>
                <Text className="text-xs text-muted mt-1">Current</Text>
              </Pressable>

              {/* Target CGPA Card */}
              <Pressable
                onPress={() => handleNavigate("gpa")}
                style={({ pressed }) => [
                  {
                    flex: 1,
                    backgroundColor: colors.surface,
                    borderRadius: 16,
                    padding: 16,
                    borderWidth: 1,
                    borderColor: colors.border,
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
              >
                <Text className="text-sm text-muted font-medium mb-2">Target</Text>
                <Text className="text-3xl font-bold text-secondary">4.0</Text>
                <Text className="text-xs text-muted mt-1">Goal</Text>
              </Pressable>
            </View>
          </View>

          {/* Upcoming Tasks Section */}
          <View className="gap-4">
            <View className="flex-row justify-between items-center">
              <Text className="text-xl font-bold text-foreground">Upcoming</Text>
              <TouchableOpacity onPress={() => handleNavigate("tasks")}>
                <Text className="text-primary font-semibold">View All</Text>
              </TouchableOpacity>
            </View>

            {/* Sample Task Cards */}
            {[
              { title: "Math Assignment", due: "2 days", priority: "high" },
              { title: "Project Presentation", due: "5 days", priority: "medium" },
            ].map((task, idx) => (
              <Pressable
                key={idx}
                onPress={() => handleNavigate("tasks")}
                style={({ pressed }) => [
                  {
                    backgroundColor: colors.surface,
                    borderRadius: 12,
                    padding: 16,
                    borderLeftWidth: 4,
                    borderLeftColor:
                      task.priority === "high"
                        ? "#ef4444"
                        : task.priority === "medium"
                          ? "#f59e0b"
                          : "#22c55e",
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
              >
                <View className="flex-row justify-between items-start">
                  <View className="flex-1">
                    <Text className="text-base font-semibold text-foreground">
                      {task.title}
                    </Text>
                    <Text className="text-sm text-muted mt-1">Due in {task.due}</Text>
                  </View>
                  <View
                    className="px-3 py-1 rounded-full"
                    style={{
                      backgroundColor:
                        task.priority === "high"
                          ? "rgba(239, 68, 68, 0.1)"
                          : task.priority === "medium"
                            ? "rgba(245, 158, 11, 0.1)"
                            : "rgba(34, 197, 94, 0.1)",
                    }}
                  >
                    <Text
                      className="text-xs font-semibold capitalize"
                      style={{
                        color:
                          task.priority === "high"
                            ? "#ef4444"
                            : task.priority === "medium"
                              ? "#f59e0b"
                              : "#22c55e",
                      }}
                    >
                      {task.priority}
                    </Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>

          {/* Quick Actions */}
          <View className="gap-4">
            <Text className="text-xl font-bold text-foreground">Quick Access</Text>

            <View className="gap-3">
              <Pressable
                onPress={() => handleNavigate("chat")}
                style={({ pressed }) => [
                  {
                    backgroundColor: colors.primary,
                    borderRadius: 12,
                    padding: 16,
                    opacity: pressed ? 0.9 : 1,
                  },
                ]}
              >
                <Text className="text-white font-semibold text-center">
                  💬 Chat with AI Assistant
                </Text>
              </Pressable>

              <Pressable
                onPress={() => handleNavigate("roadmap")}
                style={({ pressed }) => [
                  {
                    backgroundColor: "#6366f1",
                    borderRadius: 12,
                    padding: 16,
                    opacity: pressed ? 0.9 : 1,
                  },
                ]}
              >
                <Text className="text-white font-semibold text-center">
                  🗺️ View Career Roadmap
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
