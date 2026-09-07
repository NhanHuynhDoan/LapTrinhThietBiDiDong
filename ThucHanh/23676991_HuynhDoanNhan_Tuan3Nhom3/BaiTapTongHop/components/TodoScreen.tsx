import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { Todo } from "../types/todo";

type TodoAction =
  | { type: "ADD_TODO"; payload: Todo }
  | { type: "TOGGLE_TODO"; payload: string }
  | { type: "DELETE_TODO"; payload: string };

function todoReducer(todos: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case "ADD_TODO":
      return [...todos, action.payload];
    case "TOGGLE_TODO":
      return todos.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo,
      );
    case "DELETE_TODO":
      return todos.filter((todo) => todo.id !== action.payload);
    default:
      return todos;
  }
}

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  textColor: string;
  borderColor: string;
};

const TodoItem = memo(function TodoItem({
  todo,
  onToggle,
  onDelete,
  textColor,
  borderColor,
}: TodoItemProps) {
  return (
    <View style={[styles.todoItem, { borderColor }]}>
      <Text
        style={[
          styles.todoTitle,
          { color: textColor },
          todo.completed && styles.completedTodo,
        ]}
      >
        {todo.title}
      </Text>
      <View style={styles.todoActions}>
        <Button
          title={todo.completed ? "Bỏ hoàn thành" : "Hoàn thành"}
          onPress={() => onToggle(todo.id)}
        />
        <Button title="Xóa" color="#c62828" onPress={() => onDelete(todo.id)} />
      </View>
    </View>
  );
});

export default function TodoScreen() {
  const { isDark, toggleTheme } = useTheme();
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [title, setTitle] = useState("");
  const [keyword, setKeyword] = useState("");

  const filteredTodos = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    return todos.filter((todo) =>
      todo.title.toLowerCase().includes(normalizedKeyword),
    );
  }, [keyword, todos]);

  const remainingCount = useMemo(
    () => todos.filter((todo) => !todo.completed).length,
    [todos],
  );

  useEffect(() => {
    console.log(`Danh sách hiện có ${todos.length} công việc`);
  }, [todos.length]);

  const handleAddTodo = useCallback(() => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    dispatch({
      type: "ADD_TODO",
      payload: {
        id: `${Date.now()}-${Math.random()}`,
        title: trimmedTitle,
        completed: false,
      },
    });
    setTitle("");
  }, [title]);

  const handleToggleTodo = useCallback((id: string) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
  }, []);

  const handleDeleteTodo = useCallback((id: string) => {
    dispatch({ type: "DELETE_TODO", payload: id });
  }, []);

  const backgroundColor = isDark ? "#121212" : "#ffffff";
  const textColor = isDark ? "#ffffff" : "#222222";
  const borderColor = isDark ? "#555555" : "#cccccc";

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>
        Công việc cá nhân
      </Text>
      <Button
        title={isDark ? "Chuyển sang sáng" : "Chuyển sang tối"}
        onPress={toggleTheme}
      />

      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Nhập công việc mới"
        placeholderTextColor={isDark ? "#aaaaaa" : "#777777"}
        style={[styles.input, { color: textColor, borderColor }]}
        onSubmitEditing={handleAddTodo}
      />
      <Button title="Thêm công việc" onPress={handleAddTodo} />

      <TextInput
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Lọc công việc theo từ khóa"
        placeholderTextColor={isDark ? "#aaaaaa" : "#777777"}
        style={[styles.input, { color: textColor, borderColor }]}
      />

      <Text style={[styles.counter, { color: textColor }]}>
        Còn {remainingCount} công việc chưa hoàn thành
      </Text>

      <FlatList
        data={filteredTodos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
            textColor={textColor}
            borderColor={borderColor}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: textColor }]}>
            {keyword ? "Không tìm thấy công việc" : "Chưa có công việc nào"}
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    gap: 12,
    padding: 24,
  },
  counter: {
    fontSize: 16,
    fontWeight: "600",
  },
  emptyText: {
    paddingVertical: 24,
    textAlign: "center",
  },
  input: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
  },
  separator: {
    height: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  todoActions: {
    flexDirection: "row",
    gap: 8,
  },
  todoItem: {
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
    padding: 12,
  },
  todoTitle: {
    fontSize: 17,
  },
  completedTodo: {
    textDecorationLine: "line-through",
  },
});
