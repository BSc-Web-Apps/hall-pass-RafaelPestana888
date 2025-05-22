import { View, Text, TouchableOpacity } from "react-native";
import { styles } from '../app/index'

export default function Task({
    index,
    deleteTask,
    setEditingIndex,
    setTask,
    setDescription,
    taskItem,
    toggleCheckbox
}: any) {
    return (
        <View style={styles.taskItem}>
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
    )
}