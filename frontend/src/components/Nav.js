import  { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Assignment Tracker</h1>
                </Link>
            </div>
        </header>);
}

export default Nav;