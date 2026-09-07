import { StatusBar } from "expo-status-bar";
import TodoScreen from "./components/TodoScreen";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <TodoScreen />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
