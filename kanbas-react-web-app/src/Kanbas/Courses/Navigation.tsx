import { Link, useLocation } from "react-router-dom";
import "../styles.css";

export default function CoursesNavigation() {
    const { pathname } = useLocation();
    const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

    return (
        <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
            {
                links.map((link) => (
                    <Link key={link} to={link} className={`nav text-danger list-group-item
                    ${pathname.includes(link) ? "active" : ""}`}>
                        {link}
                    </Link>
                ))
            }
        </div>
    )
}