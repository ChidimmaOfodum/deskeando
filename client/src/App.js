import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/AdminDash/Dashboard.js";
import Home from "./Pages/Home.js";
import EmployeeDsh from "./Pages/EmployeeDash/EmployeeDsh.js";
import SignIn from "./Pages/SignIn/SignIn.js";
import Signup from "./Pages/Signup/Signup";
import NotFound from "./Pages/Error/NotFound.js";

const App = () => (
	<Routes>
		<Route path="/" element={<Home />} />
		<Route path="/signin" element={<SignIn />} />
		<Route path="/signup" element={<Signup />} />
		<Route path="/admin" element={<Dashboard />} />
		<Route path="/employee" element={<EmployeeDsh />} />
		<Route path="*" element={<NotFound />} />
	</Routes>
);
export default App;
