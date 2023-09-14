import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home"; 
import About from "./pages/About";
import NoPage from "./pages/NoPage";
import NewGame from "./pages/NewGame";
import Login from "./pages/Login";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="About" element={<About />} />
					<Route path="NewGame" element={<NewGame />} />
					<Route path="Login" element={<Login />} />
					<Route path="*" element={<NoPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

ReactDOM.render(<App />, document.getElementById("root"));
