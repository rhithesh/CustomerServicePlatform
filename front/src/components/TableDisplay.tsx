import { useEffect, useState } from "react";

import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectGroup,
	SelectItem,
} from "@/components/ui/select";
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const data = [
	{
		id: 1,
		name: "John Doe",
		requestType: "Refund",
	},
	{
		id: 2,
		name: "Jane Doe",
		requestType: "Refund",
	},
	{
		id: 3,
		name: "John Doe",
		requestType: "General Queries",
	},
	{
		id: 4,
		name: "Jane Doe",
		requestType: "General Queries",
	},
	{
		id: 5,
		name: "John Doe",
		requestType: "General Queries",
	},

	{
		id: 6,
		name: "Jane Doe",
		requestType: "General Queries",
	},
	{
		id: 7,
		name: "John Doe",
		requestType: "General Queries",
	},
	{
		id: 8,
		name: "Jane Doe",
		requestType: "Product Pricing Queries",
	},
	{
		id: 9,
		name: "John Doe",
		requestType: "Product Pricing Queries",
	},
	{
		id: 10,
		name: "Jane Doe",
		requestType: "Product Pricing Queries",
	},
];

export default function TableDisplay() {
	const navigate = useNavigate();

	const [requests, setRequests] = useState(data);
	useEffect(() => {
		const getUser = async () => {
			try {
				const res = await axios.get(`http://localhost:3000/auth/user`, {
					withCredentials: true,
				});
				if (res.data.user) {
					window.localStorage.setItem("details", JSON.stringify(res.data.user));
					navigate("/dashboard");
				}

				const data = await axios.get(`http://localhost:3000/auth/user`, {
					withCredentials: true,
				});
			} catch (err) {
				console.log(err);
			}
		};
		getUser();
	}, [navigate]);

	return (
		<div className="border rounded-lg w-full">
			<div className="flex items-center justify-between px-4 py-3 border-b">
				<div className="flex items-center gap-2">
					<Button
						onClick={() => {
							navigate("/dashboard");
						}}>
						Add Request
					</Button>
					<Select
						onValueChange={(e) => {
							console.log(e);
							if (e === "All") {
								setRequests(data);
							} else {
								const filteredData = data.filter(
									(request) => request.requestType === e,
								);
								setRequests(filteredData);
							}
						}}>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Filter by request type" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value="All">All</SelectItem>

								<SelectItem value="General Queries">General Queries</SelectItem>

								<SelectItem value="Product Features Queries">
									Product Features Queries
								</SelectItem>
								<SelectItem value="Product Pricing Queries">
									Product Pricing Queries
								</SelectItem>
								<SelectItem value="Product Feature Implementation Requests">
									Product Feature Implementation Requests
								</SelectItem>
								<SelectItem value="product-feedback">
									Product Feedback
								</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</div>
			<div className=" m-20  rounded-xl border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[300px]">Customer Name</TableHead>
							<TableHead className="w-[200px]">Request Type</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{requests.map((request) => (
							<TableRow key={request.id}>
								<TableCell>{request.name}</TableCell>
								<TableCell className="font-medium">
									{request.requestType}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
