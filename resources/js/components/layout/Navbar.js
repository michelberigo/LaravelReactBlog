import { Link } from 'react-router-dom'

export default function navbar (props) {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">Blog</Link>
            </div>
        </nav>
    )
}