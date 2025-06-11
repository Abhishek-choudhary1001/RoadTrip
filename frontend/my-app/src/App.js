import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import BrowseTrips from "./pages/BrowseTrips";
import TripDescription from "./pages/TripDescription";
import CreateTrip from "./pages/CreateTrip";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Welcome from "./components/Welcome";
import MyTrips from "./pages/MyTrips";
import EditTrip from "./pages/EditTrip";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import ApiTest from "./components/ApiTest";
import { UserProvider } from "./UserContext"; // <-- Import your UserProvider

function App() {
  return (
    <UserProvider>
      <Router>
        <div>
          <ApiTest />
          <Navbar />
          <Welcome />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/trips" element={<BrowseTrips />} />
            <Route path="/trips/:id" element={<TripDescription />} />
            <Route path="/create" element={<CreateTrip />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/my-trips" element={<MyTrips />} />
            <Route path="/edit-trip/:id" element={<EditTrip />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
