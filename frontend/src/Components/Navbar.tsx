import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
	const navigate = useNavigate();
	const [search, setSearch] = useState("");

	return (
		<nav className="bg-white shadow-md py-4 px-6 md:px-10 flex items-center justify-between">
			<button
				type="button"
				className="text-2xl font-bold text-blue-600 cursor-pointer"
				onClick={() => navigate("/")}
			>
				Aktiekoll!
			</button>

			<div className="relative flex items-center w-full max-w-xs">
				<input
					type="text"
					className="w-full p-2 pl-4 pr-10 border border-gray-300 rounded-lg"
					placeholder="Sök aktie!"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<button
					type="button"
					onClick={() => navigate(`/stock/${search}`)}
					className="absolute right-2 p-1 text-gray-500 cursor-pointer"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						className="w-5 h-5"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
						/>
					</svg>
				</button>
			</div>
		</nav>
	);
}
export default Navbar;
