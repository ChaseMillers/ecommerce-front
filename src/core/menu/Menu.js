// Fragment is used to wrap multiple objects
import React, {Fragment} from 'react';
// withRouter is for props history
import {Link, withRouter} from 'react-router-dom';
import {signout, isAuthenticated} from '../../auth';
import {itemTotalCount} from '../cartHelpers';
import "./Menu.css";


const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#ff9900" };
    } else {
        return { color: "#ffffff" };
    }
};

const userId = isAuthenticated() && isAuthenticated().user._id;
const guestId = "5e0bbc73c3a74f0024630fd8"

const Menu = ({ history }) => (
    
    <div className="header">
        <a href="/" className="logo"><img src="/images/logo.png" alt="Logo"/></a>
        <div className="center">
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
       
          <ul className="nav">
            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/")}
                    to="/"
                >
                    Home
                </Link>
            </li>

            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/shop")}
                    to="/shop"
                >
                    Shop
                </Link>
            </li>

            <li className="nav-item number">
                <Link
                    className="nav-link"
                    style={isActive(history, "/cart")}
                    to="/cart"
                >
                    Cart{" "}
                    <sup>
                        <small className="cart-number">{itemTotalCount()}</small>
                    </sup>
                </Link>
            </li>

            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        style={isActive(history, "/user/dashboard")}
                        to="/user/dashboard"
                    >
                        Dashboard
                    </Link>
                </li>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        style={isActive(history, "/admin/dashboard")}
                        to="/admin/dashboard"
                    >
                        Dashboard
                    </Link>
                </li>
            )}

            {!isAuthenticated() || isAuthenticated().user.role === 3? (
                <Fragment>        
                    <li className= "nav-item">
                        <Link className="nav-link" 
                        onClick={() =>
                            signout(() => {
                                history.push("/");
                            })
                        }
                        style={isActive(history, '/signin')} 
                        to="/signin">
                            Signin
                        </Link>
                    </li>
                    <li className= "nav-item">
                            <Link className="nav-link" 
                            style={isActive(history, '/signup')} 
                            to="/signup">
                                Signup
                            </Link>
                    </li>
                </Fragment>
            ): ""}


            {isAuthenticated() && !isAuthenticated().user.role === 3 &&(
                <li className="nav-item">
                    <button
                        className="nav-link signout"
                        style={{ cursor: "pointer", color: "#ffffff" }}
                        onClick={() =>
                            signout(() => {
                                history.push("/");
                            })
                        }
                    >
                        Signout
                    </button>
                </li>
            )}

        </ul>
        </div>
        
    </div>
)

export default withRouter(Menu)