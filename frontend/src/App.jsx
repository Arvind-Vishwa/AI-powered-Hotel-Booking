import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";
import { useAuthStore } from "./AuthStore";

function App() {
  const fetchUser = useAuthStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser(); // auto-login using cookies
  }, []);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;