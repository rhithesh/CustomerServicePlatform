import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";

import DisplayTable from "./pages/DisplayTable";
import RequestForm from "./pages/Request";

const App = () => {
	return (
		<Router>
			<div>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/dashboard" element={<RequestForm />} />
					<Route path="/display" element={<DisplayTable />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
