import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
export function LoginLogout() {
	const navigate = useNavigate();

	useEffect(() => {
		const getUser = async () => {
			try {
				const res = await axios.get(`http://localhost:3000/auth/user`, {
					withCredentials: true,
				});
				if (res.data.user) {
					navigate("/dashboard");
				}
			} catch (err) {
				console.log(err);
			}
		};
		getUser();
	}, [navigate]);

	const handleLogin = () => {
		window.open(`http://localhost:3000/auth/google`, "_self");
	};

	return (
		<Card className="w-[350px]">
			<CardHeader>
				<CardTitle> Login</CardTitle>
				<CardDescription>
					Your personalized Customer Service Platform.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form></form>
			</CardContent>
			<CardFooter className="flex justify-between">
				<Button variant="outline" onClick={handleLogin}>
					Login With Google
				</Button>
			</CardFooter>
		</Card>
	);
}
