import { Auth } from "./Components/Auth/Auth";
import Dashboard from "./Components/UserProfiles/Dashboard";
import { LoginPage } from "./Components/UserProfiles/LoginPage";

function App() {
  return (
    <Auth dashboard={<Dashboard />} login={<LoginPage />} />
  );
}

export default App;
