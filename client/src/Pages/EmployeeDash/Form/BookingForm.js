import { React, useState, useEffect } from "react";
import "../EmployeeDsh.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DayTime from "./DayTime";
import axios from "axios";

const BookingForm = () => {
	const { token, id } = JSON.parse(localStorage.getItem("data"));
	const [desks, setDesks] = useState([]);

	const notifySuccess = (message) => toast.success(<div>{message}</div>);
	const notifyError = (message) => toast.error(<div>{message}</div>);
	const [formData, setFormData] = useState({
		userId: id,
		deskId: -1,
		date: new Date(),
	});

	const postData = async () => {
		console.log(formData);
		return await fetch("/api/bookings", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(formData),
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		try {
			postData()
				.then((response) => response.json())
				.then(({ message, error }) => {
					error && notifyError(error);
					message && notifySuccess(message);
				});
		} catch (err) {
			console.log(err);
			notifyError();
		}
	};

	const handleFormData = (e) => {
		if (e.getMonth) setFormData({ ...formData, ["date"]: e });
		else {
			setFormData({ ...formData, [e.target.name]: e.target.value });
		}
	};

	useEffect(() => {
		axios
			.get("/api/desks")
			.then((response) => setDesks(response.data))
			.catch((err) => console.log(err));
	}, []);

	return (
		<div class="card ms-4 h-75" style={{ width: "37%" }}>
			<h5
				class="card-header"
				style={{ backgroundColor: "#4D44B5", color: "#FCFCFF" }}
			>
				Booking Form
			</h5>
			<form
				class="card-body gap-2 h-100 px-4 needs-validation"
				style={{ backgroundColor: "#faf9ff" }}
				onSubmit={handleSubmit}
			>
				<DayTime onDateChange={handleFormData} />

				<div class="form-group d-flex justify-content-between">
					<div class="form-group" style={{ width: "45%" }}>
						<label class="card-text mt-1" for="exampleInputEmail1">
							Desk type
						</label>
						<select
							class="form-select card-text my-2 mb-3"
							aria-label="Default select example"
						>
							<option disabled value="">
								Choose a desk type
							</option>

							<option value="1">Standing Desk</option>
							<option value="2">Regular Desk</option>
						</select>
					</div>
					<div class="form-group w-50">
						<label class="card-text mt-1" for="exampleInputEmail1">
							Desk Number
						</label>

						<select
							required
							class="form-select card-text my-2 mb-3"
							name="deskId"
							aria-label="Default select example"
							onChange={handleFormData}
						>
							<option selected disabled value="">
								Choose a desk name
							</option>
							{desks.map(({ desk_id, desk_name }, index) => (
								<option value={desk_id} key={index}>
									{desk_name}
								</option>
							))}
						</select>
					</div>
				</div>

				<div class="form-check form-check-inline my-2">
					<input
						class="form-check-input"
						type="radio"
						name="inlineRadioOptions"
						id="inlineRadio1"
						value="option1"
					/>
					<label class="form-check-label" for="inlineRadio1">
						Small
					</label>
				</div>
				<div class="form-check form-check-inline">
					<input
						class="form-check-input"
						type="radio"
						name="inlineRadioOptions"
						id="inlineRadio2"
						value="option2"
					/>
					<label class="form-check-label" for="inlineRadio2">
						Medium
					</label>
				</div>
				<div class="form-check form-check-inline m">
					<input
						class="form-check-input"
						type="radio"
						name="inlineRadioOptions"
						id="inlineRadio3"
						value="option3"
					/>
					<label class="form-check-label" for="inlineRadio3">
						Large
					</label>
				</div>

				<div class="form-group">
					<label class="card-text mt-2" for="exampleInputEmail1">
						Comment
					</label>
					<input
						type="text"
						class="form-control card-text my-2 mb-4"
						id="name"
						placeholder="Need extra mouse"
					/>
				</div>

				<div class="btn-wrap pb-2 d-flex w-100 justify-content-start gap-5">
					<button type="submit" id="s-btn" className="btn rounded">
						Confirm Booking
					</button>
					<button id="c-btn" className="btn rounded">
						Cancel
					</button>

					<ToastContainer position="bottom-center" />
				</div>
			</form>
		</div>
	);
};

export default BookingForm;
