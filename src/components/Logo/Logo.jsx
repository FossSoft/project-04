import { NavLink } from "react-router-dom";
import css from './Logo.module.css';

export default function Logo() {
	return (
		<NavLink to="/" className={css.logo}>AquaTrack</NavLink>
	)
}