import db from "../db.js";

// list a logged in user's bookings
export const viewBookings = async (req, res) => {
	try {
		const user = req.user;
		const bookingResult = await db.query(
			`SELECT * FROM bookings WHERE user_id = $1`,
			[user.user_id]
		);
        
		const bookings = bookingResult.rows;
		const bookingDetails = bookings.map((booking) => ({
			"User Id": booking.user_id,
			"Booking Id": booking.booking_id,
			"Desk Id": booking.desk_id,
			"Reserved Date": new Date(booking.reservation_date).toLocaleDateString(
				"en-UK",
				{
					year: "numeric",
					month: "short",
					day: "numeric",
					hour: "2-digit",
					minute: "2-digit",
					second: "2-digit",
					timeZone: "UTC",
				}
			),
		}));
		res.json(bookingDetails);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Server error" });
	}
};
