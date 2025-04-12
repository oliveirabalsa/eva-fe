import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TaskPage from "./pages/TaskPage";
import { Toaster } from "./components/ui/toaster";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/tasks" element={<TaskPage />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
