import { Route, Routes } from "react-router-dom";

import About from "./Pages/About.js";
import Dashboard from "./Pages/AdminDash/Dashboard.js";
import Home from "./Pages/Home.js";
import EmployeeDsh from "./Pages/EmployeeDash/EmployeeDsh.js";
import SignIn from "./Pages/SignIn/SignIn.js";
import Signup from "./Pages/Signup/Signup";
import NotFound from "./Pages/Error/NotFound.js";
import Topbar from "./Pages/TopBar/Topbar.js";

const App = () => (
	<Routes>
		<Route path="/" element={<Home />} />
		<Route path="/signin" element={<SignIn />} />
		<Route path="/signup" element={<Signup />} />
		<Route path="/about/this/site" element={<About />} />
		<Route path="/admin" element={<Dashboard />} />
		<Route path="/employee" element={<EmployeeDsh />} />
		<Route path="/topbar" element={<Topbar />} />
		<Route path="*" element={<NotFound />} />
	</Routes>
);

export default App;
