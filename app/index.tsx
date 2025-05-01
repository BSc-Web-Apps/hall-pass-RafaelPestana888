import React, { useState } from "react";
import { Text, View, TouchableOpacity, TextInput, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";

export default function HomeScreen() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { text: task, isChecked: false }]);
      setTask("");
    }
  };

  const toggleCheckbox = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].isChecked = !updatedTasks[index].isChecked;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(updatedTasks);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Title */}
      <Text style={styles.title}>Hall Pass</Text>

      {/* Task List */}
      <ScrollView contentContainerStyle={styles.taskList}>
        {tasks.map((taskItem, index) => (
          <View key={index} style={styles.taskItem}>
            <TouchableOpacity onPress={() => toggleCheckbox(index)} style={styles.checkboxContainer}>
              <View
                style={[
                  styles.checkbox,
                  taskItem.isChecked && { backgroundColor: "green" },
                ]}
              />
              {taskItem.isChecked && <Text style={styles.checkedText}>✔</Text>}
            </TouchableOpacity>
            <Text style={[styles.taskText, taskItem.isChecked && { textDecorationLine: "line-through" }]}>
              {taskItem.text}
            </Text>
            <TouchableOpacity onPress={() => deleteTask(index)} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Input and Add Button at Bottom */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={task}
          onChangeText={setTask}
          placeholder="Enter new task"
          placeholderTextColor="#ccc"
        />
        <TouchableOpacity onPress={addTask} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Task</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 16,
  },
  taskList: {
    paddingBottom: 16,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    justifyContent: "space-between",
  },
  checkboxContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 4,
    backgroundColor: "white",
  },
  checkedText: {
    position: "absolute",
    fontSize: 18,
    color: "white",
  },
  taskText: {
    fontSize: 16,
    color: "#fff",
    flex: 1,
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    padding: 6,
    borderRadius: 4,
    alignItems: "center",
    marginLeft: 10,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 8,
    color: "#fff",
    marginRight: 8,
  },
  addButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 14,
  },
});
