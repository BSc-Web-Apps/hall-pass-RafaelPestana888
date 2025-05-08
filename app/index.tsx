import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function HomeScreen() {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null); // Index of the task being edited

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([
        ...tasks,
        { text: task, description: description.trim(), isChecked: false },
      ]);
      setTask("");
      setDescription("");
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

  const saveTask = () => {
    if (editingIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex] = { text: task, description: description, isChecked: false };
      setTasks(updatedTasks);
      setEditingIndex(null); // Exit edit mode
      setTask("");
      setDescription("");
    }
  };

  const cancelEdit = () => {
    setEditingIndex(null); // Exit edit mode
    setTask("");
    setDescription("");
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
            <TouchableOpacity
              onPress={() => toggleCheckbox(index)}
              style={styles.checkboxContainer}
            >
              <View
                style={[
                  styles.checkbox,
                  taskItem.isChecked && { backgroundColor: "green" },
                ]}
              />
              {taskItem.isChecked && (
                <Text style={styles.checkedText}>✔</Text>
              )}
            </TouchableOpacity>

            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.taskText,
                  taskItem.isChecked && { textDecorationLine: "line-through" },
                ]}
              >
                {taskItem.text}
              </Text>
              {taskItem.description !== "" && (
                <Text style={styles.descriptionText}>
                  {taskItem.description}
                </Text>
              )}
            </View>

            {taskItem.isChecked && (
              <TouchableOpacity
                onPress={() => deleteTask(index)}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            )}

            {/* Edit Button - visible only when editing a task */}
            <TouchableOpacity
              onPress={() => {
                setEditingIndex(index);
                setTask(taskItem.text);
                setDescription(taskItem.description);
              }}
              style={styles.editButton}
            >
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Inputs and Add Button */}
      <View style={styles.inputContainer}>
        {editingIndex === null ? (
          <>
            <TextInput
              style={styles.input}
              value={task}
              onChangeText={setTask}
              placeholder="Task title"
              placeholderTextColor="#ccc"
            />
            <TextInput
              style={styles.input}
              value={description}
              onChangeText={setDescription}
              placeholder="Task description (optional)"
              placeholderTextColor="#ccc"
            />
            <TouchableOpacity onPress={addTask} style={styles.addButton}>
              <Text style={styles.addButtonText}>Add Task</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TextInput
              style={styles.input}
              value={task}
              onChangeText={setTask}
              placeholder="Edit task title"
              placeholderTextColor="#ccc"
            />
            <TextInput
              style={styles.input}
              value={description}
              onChangeText={setDescription}
              placeholder="Edit task description (optional)"
              placeholderTextColor="#ccc"
            />
            <TouchableOpacity onPress={saveTask} style={styles.saveButton}>
              <Text style={styles.addButtonText}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={cancelEdit} style={styles.cancelButton}>
              <Text style={styles.addButtonText}>Cancel</Text>
            </TouchableOpacity>
          </>
        )}
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
    alignItems: "flex-start",
    marginVertical: 8,
    justifyContent: "space-between",
  },
  checkboxContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginTop: 6,
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
  },
  descriptionText: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 4,
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    padding: 6,
    borderRadius: 4,
    alignItems: "center",
    marginLeft: 10,
    marginTop: 6,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  editButton: {
    backgroundColor: "#ffbb33",
    padding: 6,
    borderRadius: 4,
    alignItems: "center",
    marginLeft: 10,
    marginTop: 6,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  inputContainer: {
    marginTop: 12,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 8,
    color: "#fff",
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: "#f44336",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#4CAF50", // Green save button
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignItems: "center",
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: "#f44336", // Red cancel button
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 14,
  },
});
