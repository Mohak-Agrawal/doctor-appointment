import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <div className="container-fluid">
                    <nav>
                        <ul className="footer-menu">
                            <li>
                                <Link to="/home">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/profile">
                                    User Profile
                                </Link>
                            </li>
                            <li>
                                <Link to="/appointment-lists">
                                My reservations
                                </Link>
                            </li>
                        </ul>
                        <p className="copyright text-center">
                            <span className="names"><a href="https://github.com/Abdellaharrad">Arrad</a></span> and <span className="names"><a href="https://github.com/AimeneNouri">Aimene</a></span> © 2021
                        </p>
                    </nav>
                </div>
          </footer>
        )
    }
}

export default Footer
