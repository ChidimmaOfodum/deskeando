import React, { useState, useEffect, useRef } from "react";
import "./topbar.css";
import iconuser from "./icon-user.svg";
import bell from "./bell.svg";
import { Link, useNavigate } from "react-router-dom";
import searchIcon from "./searchIcon.svg";
import thelogo from "./the-logo.svg";
import textlogo from "./text-logo.svg";
import { switchView } from "../../Pages/EmployeeDash/switchview";

function Topbar({ userDetails, handleClick, setView }) {
	const [showDropdown, setShowDropdown] = useState(false);
	const navItems = ["Home", "Floor Plan", "Book Desk"];
	const navigate = useNavigate();

	const dropdownRef = useRef(null);

	const toggleDropdown = () => {
		setShowDropdown(!showDropdown);
	};

	const handleClickOutside = (event) => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
			setShowDropdown(false);
		}
	};

	return (
		<article>
			<section className="thelogo-and-the-text">
				<img className="text-logo" src={textlogo} alt="text-logo" />
				<img className="the-logo" src={thelogo} alt="the-logo" />
			</section>
			<nav id="navbar" className="navbar  navbar-white bg-white">
				<section className="first_section">
					<form className=" form-inline ">
						<div className="input-control-form form-group has-search">
							<img className="searchIcon" src={searchIcon} alt="The Bell" />
							<input
								type="text"
								className="input-control-form form-control"
								placeholder=" Search here..."
							/>
						</div>
					</form>
				</section>

				<div className="end-of-page">
					<img className="bell" src={bell} alt="The Bell" />

					<span className="user-info">
						<strong className="user-name">{userDetails.userName}</strong> <br />
						<span className="user-role">{userDetails.role}</span>
					</span>
					<div className="the-icon-user-background" ref={handleClickOutside}>
						<div onClick={toggleDropdown}>
							<img className="icon-user" src={iconuser} alt="The Blue Dot" />
						</div>
						{showDropdown && (
							<Link className="dropdown-button" to="/">
								<button
									className="dropdown-menu-buttons"
									onClick={() => localStorage.clear()}
								>
									Sign out
								</button>
							</Link>
						)}
					</div>
				</div>

				<section className="second-section">
					<article className="user-info-and-hamburger">
						<span className="user-info-big-screen">
							<strong className="user-name">{userDetails.userName}</strong>{" "}
							<br />
							<span className="user-role">{userDetails.role}</span>
						</span>
						<div className="container-fluid">
							<button
								className="navbar-toggler navbar-toggler-topbar"
								type="button"
								data-bs-toggle="collapse"
								data-bs-target="#navbarToggleExternalContent"
								aria-controls="navbarToggleExternalContent"
								aria-expanded="false"
								aria-label="Toggle navigation"
								onClick={toggleDropdown}
							>
								<span className="navbar-toggler-icon"></span>
							</button>
						</div>
					</article>
				</section>
			</nav>
			<div className="collapse" id="navbarToggleExternalContent">
				<div className="hamburger-content text-hamburger-content  p-4">
					<ul className="links">
						{navItems.map((item, index) => {
							return (
								<li
									className=""
									id={index}
									onClick={(e) => {
										setView(switchView(e.currentTarget.id));
									}}
								>
									{item}
								</li>
							);
						})}

						<Link className="dropdown-button" to="/">
							<button
								id="dropdown-button-mobile"
								className="dropdown-menu-buttons links"
								onClick={() => localStorage.clear()}
							>
								Sign out
							</button>
						</Link>
					</ul>
				</div>
			</div>
		</article>
	);
}
export default Topbar;
