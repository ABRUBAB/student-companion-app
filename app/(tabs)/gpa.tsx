import { ScrollView, Text, View, Pressable, FlatList, Modal, TextInput } from "react-native";
import { useState } from "react";
import { useColors } from "@/hooks/use-colors";
import { ScreenContainer } from "@/components/screen-container";
import * as Haptics from "expo-haptics";

interface Grade {
  id: string;
  subject: string;
  credits: number;
  grade: number;
  semester: string;
}

const GRADE_POINTS: Record<string, number> = {
  "A+": 4.0,
  A: 4.0,
  "A-": 3.7,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  "C+": 2.3,
  C: 2.0,
  "C-": 1.7,
  D: 1.0,
  F: 0.0,
};

export default function GPAScreen() {
  const colors = useColors();
  const [grades, setGrades] = useState<Grade[]>([
    { id: "1", subject: "Calculus", credits: 4, grade: 4.0, semester: "Spring 2024" },
    { id: "2", subject: "Physics", credits: 3, grade: 3.7, semester: "Spring 2024" },
    { id: "3", subject: "Chemistry", credits: 3, grade: 3.3, semester: "Spring 2024" },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showPlannerModal, setShowPlannerModal] = useState(false);
  const [targetCGPA, setTargetCGPA] = useState("3.9");

  const [newGrade, setNewGrade] = useState({
    subject: "",
    credits: "3",
    grade: "4.0",
    semester: "Spring 2024",
  });

  // Calculate SGPA (current semester)
  const calculateSGPA = () => {
    const currentSemesterGrades = grades.filter(
      (g) => g.semester === "Spring 2024"
    );
    if (currentSemesterGrades.length === 0) return 0;

    const totalPoints = currentSemesterGrades.reduce(
      (sum, g) => sum + g.grade * g.credits,
      0
    );
    const totalCredits = currentSemesterGrades.reduce(
      (sum, g) => sum + g.credits,
      0
    );
    return (totalPoints / totalCredits).toFixed(2);
  };

  // Calculate CGPA (all semesters)
  const calculateCGPA = () => {
    if (grades.length === 0) return 0;

    const totalPoints = grades.reduce((sum, g) => sum + g.grade * g.credits, 0);
    const totalCredits = grades.reduce((sum, g) => sum + g.credits, 0);
    return (totalPoints / totalCredits).toFixed(2);
  };

  const addGrade = () => {
    if (newGrade.subject.trim()) {
      const grade: Grade = {
        id: Date.now().toString(),
        subject: newGrade.subject,
        credits: parseInt(newGrade.credits),
        grade: parseFloat(newGrade.grade),
        semester: newGrade.semester,
      };
      setGrades([grade, ...grades]);
      setNewGrade({ subject: "", credits: "3", grade: "4.0", semester: "Spring 2024" });
      setShowAddModal(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 3.7) return "#22c55e";
    if (grade >= 3.0) return "#3b82f6";
    if (grade >= 2.0) return "#f59e0b";
    return "#ef4444";
  };

  const sgpa = calculateSGPA();
  const cgpa = calculateCGPA();

  return (
    <ScreenContainer className="p-0">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Header */}
        <View className="bg-gradient-to-br from-primary to-blue-600 px-6 pt-6 pb-8">
          <Text className="text-3xl font-bold text-white mb-2">GPA Calculator</Text>
          <Text className="text-white opacity-90">Track your academic performance</Text>
        </View>

        {/* GPA Stats */}
        <View className="px-6 pt-8 pb-6 gap-4">
          <View className="flex-row gap-4">
            {/* SGPA Card */}
            <View
              className="flex-1 rounded-2xl p-6 items-center justify-center"
              style={{ backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border }}
            >
              <Text className="text-sm text-muted font-medium mb-2">SGPA</Text>
              <Text className="text-4xl font-bold text-primary">{sgpa}</Text>
              <Text className="text-xs text-muted mt-2">Current Semester</Text>
            </View>

            {/* CGPA Card */}
            <View
              className="flex-1 rounded-2xl p-6 items-center justify-center"
              style={{ backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border }}
            >
              <Text className="text-sm text-muted font-medium mb-2">CGPA</Text>
              <Text className="text-4xl font-bold text-secondary">{cgpa}</Text>
              <Text className="text-xs text-muted mt-2">Overall</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="flex-row gap-3">
            <Pressable
              onPress={() => setShowAddModal(true)}
              className="flex-1 bg-primary rounded-lg py-3"
            >
              <Text className="text-white text-center font-semibold">+ Add Grade</Text>
            </Pressable>
            <Pressable
              onPress={() => setShowPlannerModal(true)}
              className="flex-1 bg-secondary rounded-lg py-3"
              style={{ backgroundColor: "#6366f1" }}
            >
              <Text className="text-white text-center font-semibold">📊 Plan</Text>
            </Pressable>
          </View>
        </View>

        {/* Grades List */}
        <View className="px-6 pb-20">
          <Text className="text-xl font-bold text-foreground mb-4">Your Grades</Text>

          <FlatList
            data={grades}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View
                className="rounded-lg p-4 mb-3 flex-row items-center justify-between"
                style={{ backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border }}
              >
                <View className="flex-1">
                  <Text className="text-base font-semibold text-foreground">
                    {item.subject}
                  </Text>
                  <View className="flex-row gap-2 mt-1">
                    <Text className="text-xs text-muted">
                      Credits: {item.credits}
                    </Text>
                    <Text className="text-xs text-muted">•</Text>
                    <Text className="text-xs text-muted">{item.semester}</Text>
                  </View>
                </View>
                <View
                  className="px-4 py-2 rounded-lg items-center"
                  style={{
                    backgroundColor: getGradeColor(item.grade) + "20",
                  }}
                >
                  <Text
                    className="text-lg font-bold"
                    style={{ color: getGradeColor(item.grade) }}
                  >
                    {item.grade.toFixed(1)}
                  </Text>
                </View>
              </View>
            )}
          />
        </View>

        {/* Add Grade Modal */}
        <Modal visible={showAddModal} animationType="slide" transparent>
          <View className="flex-1 bg-black/50 justify-end">
            <View
              className="rounded-t-3xl p-6 gap-4"
              style={{ backgroundColor: colors.background }}
            >
              <Text className="text-2xl font-bold text-foreground">Add Grade</Text>

              <TextInput
                placeholder="Subject name"
                value={newGrade.subject}
                onChangeText={(text) =>
                  setNewGrade({ ...newGrade, subject: text })
                }
                placeholderTextColor={colors.muted}
                className="border rounded-lg p-3 text-foreground"
                style={{ borderColor: colors.border, borderWidth: 1 }}
              />

              <TextInput
                placeholder="Credits (0-4)"
                value={newGrade.credits}
                onChangeText={(text) =>
                  setNewGrade({ ...newGrade, credits: text })
                }
                keyboardType="decimal-pad"
                placeholderTextColor={colors.muted}
                className="border rounded-lg p-3 text-foreground"
                style={{ borderColor: colors.border, borderWidth: 1 }}
              />

              <TextInput
                placeholder="Grade (0.0-4.0)"
                value={newGrade.grade}
                onChangeText={(text) =>
                  setNewGrade({ ...newGrade, grade: text })
                }
                keyboardType="decimal-pad"
                placeholderTextColor={colors.muted}
                className="border rounded-lg p-3 text-foreground"
                style={{ borderColor: colors.border, borderWidth: 1 }}
              />

              <View className="flex-row gap-2">
                <Pressable
                  onPress={() => setShowAddModal(false)}
                  className="flex-1 bg-muted rounded-lg py-3"
                >
                  <Text className="text-white text-center font-semibold">Cancel</Text>
                </Pressable>
                <Pressable
                  onPress={addGrade}
                  className="flex-1 bg-primary rounded-lg py-3"
                >
                  <Text className="text-white text-center font-semibold">Add</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        {/* Future Planner Modal */}
        <Modal visible={showPlannerModal} animationType="slide" transparent>
          <View className="flex-1 bg-black/50 justify-end">
            <View
              className="rounded-t-3xl p-6 gap-4"
              style={{ backgroundColor: colors.background }}
            >
              <Text className="text-2xl font-bold text-foreground">Future GPA Planner</Text>
              <Text className="text-sm text-muted">
                Set a target CGPA and see what grades you need to achieve it.
              </Text>

              <TextInput
                placeholder="Target CGPA"
                value={targetCGPA}
                onChangeText={setTargetCGPA}
                keyboardType="decimal-pad"
                placeholderTextColor={colors.muted}
                className="border rounded-lg p-3 text-foreground text-lg"
                style={{ borderColor: colors.border, borderWidth: 1 }}
              />

              <View
                className="bg-blue-50 rounded-lg p-4"
                style={{ backgroundColor: "#3b82f6" + "20" }}
              >
                <Text className="text-sm font-semibold text-foreground">
                  💡 To achieve {targetCGPA} CGPA, you need an average grade of{" "}
                  <Text className="text-primary">{targetCGPA}</Text> or higher in upcoming
                  semesters.
                </Text>
              </View>

              <Pressable
                onPress={() => setShowPlannerModal(false)}
                className="bg-primary rounded-lg py-3"
              >
                <Text className="text-white text-center font-semibold">Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </ScreenContainer>
  );
}
