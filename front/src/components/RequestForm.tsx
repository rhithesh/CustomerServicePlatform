import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { useState } from "react";

import axios from "axios";

export default function RequestForm() {
	const [category, setCategory] = useState("general");
	const [comments, setComments] = useState("");
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post(
				`http://localhost:3000/customer-service/submit`,
				{ category, comments },
				{ withCredentials: true },
			);
			alert("Request submitted successfully");
		} catch (err) {
			console.error(err);
			alert("Failed to submit request");
		}
	};

	return (
		<Card className="w-full max-w-2xl">
			<CardHeader>
				<CardTitle>Customer Service Request</CardTitle>
				<CardDescription>
					Fill out the form below to submit your request. We'll get back to you
					as soon as possible.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form className="grid gap-6">
					<div className="grid gap-2">
						<Label htmlFor="request-type">Request Type</Label>
						<RadioGroup
							id="request-type"
							defaultValue="general"
							onValueChange={(e) => {
								setCategory(e);
							}}>
							<div className="flex items-center gap-2">
								<RadioGroupItem value="general" id="general" />
								<Label htmlFor="general">General Inquiry</Label>
							</div>
							<div className="flex items-center gap-2">
								<RadioGroupItem value="feature" id="feature" />
								<Label htmlFor="feature">Feature Query</Label>
							</div>
							<div className="flex items-center gap-2">
								<RadioGroupItem value="pricing" id="pricing" />
								<Label htmlFor="pricing">Pricing Query</Label>
							</div>
							<div className="flex items-center gap-2">
								<RadioGroupItem value="implementation" id="implementation" />
								<Label htmlFor="implementation">Feature Implementation</Label>
							</div>
						</RadioGroup>
					</div>

					<div className="grid gap-2">
						<Label htmlFor="comments">Comments</Label>
						<Textarea
							value={comments}
							onChange={(e) => setComments(e.target.value)}
							id="comments"
							placeholder="Enter your comments or questions"
							className="min-h-[150px]"
						/>
					</div>
					<Button type="submit" onClick={handleSubmit} className="w-full">
						Submit Request
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
