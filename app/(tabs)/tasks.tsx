import { ScrollView, Text, View, Pressable, FlatList, Modal, TextInput } from "react-native";
import { useState } from "react";
import { useColors } from "@/hooks/use-colors";
import { ScreenContainer } from "@/components/screen-container";
import * as Haptics from "expo-haptics";

interface Task {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
  subjectColor: string;
}

const SUBJECT_COLORS: Record<string, string> = {
  Math: "#3b82f6",
  Physics: "#8b5cf6",
  Chemistry: "#ec4899",
  English: "#14b8a6",
  History: "#f59e0b",
  Computer: "#06b6d4",
};

export default function TasksScreen() {
  const colors = useColors();
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Calculus Assignment",
      subject: "Math",
      dueDate: "2024-05-10",
      priority: "high",
      completed: false,
      subjectColor: SUBJECT_COLORS.Math,
    },
    {
      id: "2",
      title: "Physics Lab Report",
      subject: "Physics",
      dueDate: "2024-05-15",
      priority: "medium",
      completed: false,
      subjectColor: SUBJECT_COLORS.Physics,
    },
    {
      id: "3",
      title: "English Essay",
      subject: "English",
      dueDate: "2024-05-12",
      priority: "high",
      completed: false,
      subjectColor: SUBJECT_COLORS.English,
    },
    {
      id: "4",
      title: "History Project",
      subject: "History",
      dueDate: "2024-05-20",
      priority: "low",
      completed: true,
      subjectColor: SUBJECT_COLORS.History,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    subject: "Math",
    dueDate: "",
    priority: "medium" as const,
  });

  const [filterPriority, setFilterPriority] = useState<"all" | "high" | "medium" | "low">("all");

  const toggleTaskCompletion = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addTask = () => {
    if (newTask.title.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.title,
        subject: newTask.subject,
        dueDate: newTask.dueDate,
        priority: newTask.priority,
        completed: false,
        subjectColor: SUBJECT_COLORS[newTask.subject] || "#3b82f6",
      };
      setTasks([task, ...tasks]);
      setNewTask({ title: "", subject: "Math", dueDate: "", priority: "medium" });
      setShowModal(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  const filteredTasks = tasks.filter(
    (task) => filterPriority === "all" || task.priority === filterPriority
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "#ef4444";
      case "medium":
        return "#f59e0b";
      case "low":
        return "#22c55e";
      default:
        return "#64748b";
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diff = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (diff < 0) return "Overdue";
    if (diff === 0) return "Today";
    if (diff === 1) return "Tomorrow";
    return `${diff} days`;
  };

  return (
    <ScreenContainer className="p-0">
      <View className="flex-1">
        {/* Header */}
        <View className="bg-gradient-to-br from-primary to-blue-600 px-6 pt-6 pb-8">
          <Text className="text-3xl font-bold text-white mb-2">Tasks</Text>
          <Text className="text-white opacity-90">
            {tasks.filter((t) => !t.completed).length} pending
          </Text>
        </View>

        {/* Filter Buttons */}
        <View className="px-6 pt-6 pb-4 flex-row gap-2">
          {(["all", "high", "medium", "low"] as const).map((priority) => (
            <Pressable
              key={priority}
              onPress={() => setFilterPriority(priority)}
              style={({ pressed }) => [
                {
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 20,
                  backgroundColor:
                    filterPriority === priority
                      ? colors.primary
                      : colors.surface,
                  borderWidth: 1,
                  borderColor:
                    filterPriority === priority ? colors.primary : colors.border,
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <Text
                className={`text-sm font-semibold capitalize ${
                  filterPriority === priority ? "text-white" : "text-foreground"
                }`}
              >
                {priority}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Tasks List */}
        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => toggleTaskCompletion(item.id)}
              style={({ pressed }) => [
                {
                  backgroundColor: colors.surface,
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 12,
                  borderLeftWidth: 4,
                  borderLeftColor: item.subjectColor,
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <View className="flex-row items-start gap-3">
                {/* Checkbox */}
                <View
                  className="w-6 h-6 rounded-full border-2 items-center justify-center mt-1"
                  style={{
                    borderColor: item.completed ? colors.success : colors.border,
                    backgroundColor: item.completed ? colors.success : "transparent",
                  }}
                >
                  {item.completed && <Text className="text-white text-xs">✓</Text>}
                </View>

                {/* Task Info */}
                <View className="flex-1">
                  <Text
                    className={`text-base font-semibold ${
                      item.completed ? "text-muted line-through" : "text-foreground"
                    }`}
                  >
                    {item.title}
                  </Text>
                  <View className="flex-row gap-2 mt-2 items-center">
                    <View
                      className="px-2 py-1 rounded"
                      style={{ backgroundColor: item.subjectColor + "20" }}
                    >
                      <Text
                        className="text-xs font-semibold"
                        style={{ color: item.subjectColor }}
                      >
                        {item.subject}
                      </Text>
                    </View>
                    <Text className="text-xs text-muted">
                      {getDaysUntilDue(item.dueDate)}
                    </Text>
                  </View>
                </View>

                {/* Priority Badge */}
                <View
                  className="px-2 py-1 rounded-full"
                  style={{
                    backgroundColor: getPriorityColor(item.priority) + "20",
                  }}
                >
                  <Text
                    className="text-xs font-semibold capitalize"
                    style={{ color: getPriorityColor(item.priority) }}
                  >
                    {item.priority}
                  </Text>
                </View>
              </View>
            </Pressable>
          )}
        />

        {/* Add Task Button */}
        <Pressable
          onPress={() => setShowModal(true)}
          style={({ pressed }) => [
            {
              position: "absolute",
              bottom: 80,
              right: 24,
              width: 56,
              height: 56,
              borderRadius: 28,
              backgroundColor: colors.primary,
              justifyContent: "center",
              alignItems: "center",
              opacity: pressed ? 0.9 : 1,
            },
          ]}
        >
          <Text className="text-2xl text-white font-bold">+</Text>
        </Pressable>

        {/* Add Task Modal */}
        <Modal visible={showModal} animationType="slide" transparent>
          <View className="flex-1 bg-black/50 justify-end">
            <View
              className="bg-background rounded-t-3xl p-6 gap-4"
              style={{ backgroundColor: colors.background }}
            >
              <Text className="text-2xl font-bold text-foreground">Add Task</Text>

              <TextInput
                placeholder="Task title"
                value={newTask.title}
                onChangeText={(text) =>
                  setNewTask({ ...newTask, title: text })
                }
                placeholderTextColor={colors.muted}
                className="border border-border rounded-lg p-3 text-foreground"
                style={{ borderColor: colors.border }}
              />

              <View className="flex-row gap-2">
                <Pressable
                  onPress={() => setShowModal(false)}
                  className="flex-1 bg-muted rounded-lg py-3"
                >
                  <Text className="text-white text-center font-semibold">Cancel</Text>
                </Pressable>
                <Pressable
                  onPress={addTask}
                  className="flex-1 bg-primary rounded-lg py-3"
                >
                  <Text className="text-white text-center font-semibold">Add</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScreenContainer>
  );
}
