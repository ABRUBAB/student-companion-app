import { ScrollView, Text, View, Pressable, Modal, FlatList } from "react-native";
import { useState } from "react";
import { useColors } from "@/hooks/use-colors";
import { ScreenContainer } from "@/components/screen-container";
import * as Haptics from "expo-haptics";

interface Milestone {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
}

interface ChecklistItem {
  id: string;
  title: string;
  completed: boolean;
  category: string;
}

export default function RoadmapScreen() {
  const colors = useColors();
  const [pathSelected, setPathSelected] = useState<"domestic" | "abroad" | null>(null);
  const [showPathModal, setShowPathModal] = useState(false);

  const [domesticMilestones] = useState<Milestone[]>([
    {
      id: "1",
      title: "Complete Current Semester",
      description: "Finish all courses with good grades",
      completed: true,
      dueDate: "2024-05-30",
    },
    {
      id: "2",
      title: "Prepare for Internship",
      description: "Build portfolio and apply for internships",
      completed: false,
      dueDate: "2024-07-15",
    },
    {
      id: "3",
      title: "Secure Job Offer",
      description: "Apply to companies and interview",
      completed: false,
      dueDate: "2024-12-31",
    },
    {
      id: "4",
      title: "Start First Job",
      description: "Begin your professional journey",
      completed: false,
      dueDate: "2025-06-01",
    },
  ]);

  const [abroadMilestones] = useState<Milestone[]>([
    {
      id: "1",
      title: "Maintain High CGPA",
      description: "Target 3.8+ CGPA for better universities",
      completed: true,
      dueDate: "2024-12-31",
    },
    {
      id: "2",
      title: "Take IELTS/TOEFL",
      description: "Score 100+ on TOEFL or 7.5+ on IELTS",
      completed: false,
      dueDate: "2024-08-30",
    },
    {
      id: "3",
      title: "Prepare GRE/GMAT",
      description: "Score 320+ on GRE or 700+ on GMAT",
      completed: false,
      dueDate: "2024-10-31",
    },
    {
      id: "4",
      title: "Apply to Universities",
      description: "Submit applications to target universities",
      completed: false,
      dueDate: "2024-11-30",
    },
    {
      id: "5",
      title: "Get Admission & Visa",
      description: "Receive admission and process visa",
      completed: false,
      dueDate: "2025-03-31",
    },
  ]);

  const [abroadChecklist] = useState<ChecklistItem[]>([
    {
      id: "1",
      title: "Valid Passport",
      completed: false,
      category: "Documents",
    },
    {
      id: "2",
      title: "Academic Transcripts",
      completed: false,
      category: "Documents",
    },
    {
      id: "3",
      title: "Letters of Recommendation",
      completed: false,
      category: "Documents",
    },
    {
      id: "4",
      title: "Statement of Purpose",
      completed: false,
      category: "Application",
    },
    {
      id: "5",
      title: "Financial Documents",
      completed: false,
      category: "Financial",
    },
    {
      id: "6",
      title: "Health Insurance",
      completed: false,
      category: "Health",
    },
  ]);

  const currentMilestones = pathSelected === "abroad" ? abroadMilestones : domesticMilestones;
  const completedCount = currentMilestones.filter((m) => m.completed).length;
  const progressPercentage = (completedCount / currentMilestones.length) * 100;

  return (
    <ScreenContainer className="p-0">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Header */}
        <View className="bg-gradient-to-br from-primary to-blue-600 px-6 pt-6 pb-8">
          <Text className="text-3xl font-bold text-white mb-2">Career Roadmap</Text>
          <Text className="text-white opacity-90">Plan your future path</Text>
        </View>

        {/* Path Selection */}
        {!pathSelected ? (
          <View className="px-6 pt-8 pb-20 gap-6">
            <Text className="text-xl font-bold text-foreground">Choose Your Path</Text>

            <Pressable
              onPress={() => {
                setPathSelected("domestic");
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              }}
              style={({ pressed }) => [
                {
                  backgroundColor: colors.surface,
                  borderRadius: 16,
                  padding: 24,
                  borderWidth: 2,
                  borderColor: colors.border,
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <Text className="text-2xl mb-2">🏠 Stay in Country</Text>
              <Text className="text-base text-foreground font-semibold mb-3">
                Build your career locally
              </Text>
              <Text className="text-sm text-muted leading-relaxed">
                Focus on internships, job placements, and building a strong professional network in your home country.
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                setPathSelected("abroad");
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              }}
              style={({ pressed }) => [
                {
                  backgroundColor: colors.surface,
                  borderRadius: 16,
                  padding: 24,
                  borderWidth: 2,
                  borderColor: colors.border,
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <Text className="text-2xl mb-2">✈️ Go Abroad</Text>
              <Text className="text-base text-foreground font-semibold mb-3">
                Study or work internationally
              </Text>
              <Text className="text-sm text-muted leading-relaxed">
                Prepare for higher education or work opportunities abroad with language tests, applications, and visa planning.
              </Text>
            </Pressable>
          </View>
        ) : (
          <View className="px-6 pt-8 pb-20">
            {/* Back Button */}
            <Pressable
              onPress={() => setPathSelected(null)}
              className="mb-6"
            >
              <Text className="text-primary font-semibold">← Change Path</Text>
            </Pressable>

            {/* Progress */}
            <View className="mb-8">
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-lg font-bold text-foreground">Progress</Text>
                <Text className="text-lg font-bold text-primary">
                  {completedCount}/{currentMilestones.length}
                </Text>
              </View>
              <View
                className="w-full h-3 rounded-full overflow-hidden"
                style={{ backgroundColor: colors.surface }}
              >
                <View
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                />
              </View>
            </View>

            {/* Milestones */}
            <Text className="text-xl font-bold text-foreground mb-4">
              {pathSelected === "abroad" ? "Study Abroad" : "Career"} Milestones
            </Text>

            <FlatList
              data={currentMilestones}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item, index }) => (
                <View className="mb-4 flex-row gap-4">
                  {/* Timeline */}
                  <View className="items-center">
                    <View
                      className="w-10 h-10 rounded-full border-2 items-center justify-center"
                      style={{
                        borderColor: item.completed ? colors.success : colors.border,
                        backgroundColor: item.completed ? colors.success : "transparent",
                      }}
                    >
                      {item.completed ? (
                        <Text className="text-white text-lg">✓</Text>
                      ) : (
                        <Text className="text-foreground text-lg font-bold">{index + 1}</Text>
                      )}
                    </View>
                    {index < currentMilestones.length - 1 && (
                      <View
                        className="w-1 flex-1 mt-2"
                        style={{ backgroundColor: colors.border, minHeight: 40 }}
                      />
                    )}
                  </View>

                  {/* Content */}
                  <View className="flex-1 pb-4">
                    <Text
                      className={`text-base font-semibold ${
                        item.completed ? "text-muted line-through" : "text-foreground"
                      }`}
                    >
                      {item.title}
                    </Text>
                    <Text className="text-sm text-muted mt-1">{item.description}</Text>
                    <Text className="text-xs text-muted mt-2">
                      Due: {new Date(item.dueDate).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
              )}
            />

            {/* Study Abroad Checklist */}
            {pathSelected === "abroad" && (
              <View className="mt-8 pt-8 border-t" style={{ borderTopColor: colors.border }}>
                <Text className="text-xl font-bold text-foreground mb-4">
                  📋 Study Abroad Checklist
                </Text>

                <FlatList
                  data={abroadChecklist}
                  keyExtractor={(item) => item.id}
                  scrollEnabled={false}
                  renderItem={({ item }) => (
                    <View
                      className="flex-row items-center gap-3 p-3 mb-2 rounded-lg"
                      style={{ backgroundColor: colors.surface }}
                    >
                      <View
                        className="w-5 h-5 rounded border-2 items-center justify-center"
                        style={{
                          borderColor: item.completed ? colors.success : colors.border,
                          backgroundColor: item.completed ? colors.success : "transparent",
                        }}
                      >
                        {item.completed && <Text className="text-white text-xs">✓</Text>}
                      </View>
                      <View className="flex-1">
                        <Text className="text-sm font-medium text-foreground">
                          {item.title}
                        </Text>
                        <Text className="text-xs text-muted">{item.category}</Text>
                      </View>
                    </View>
                  )}
                />
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
