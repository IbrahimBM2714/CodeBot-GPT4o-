import React from 'react'
import actual_logo from './actual_logo.png'
import { useNavigate } from "react-router-dom";


const Navbar = () => {

    const navigate = useNavigate()

    const handleButtonClick = () => {
        navigate("/")
    }

    return (
        <div
            style={{
                padding: "10px 10px",
                display: 'flex',
                justifyContent: 'center'
            }}
        >

            <div
                style={{
                    background: "linear-gradient(90deg, rgba(216,239,211,1) 15%, rgba(228,254,248,1) 85%)",
                    width: "90%",
                    borderRadius: "45px",
                    padding: "5px",
                    display: 'flex',
                    justifyContent: "space-between",
                    boxShadow: "rgb(0,0,0,0.29) 5px 5px 5px 0px",
                    // border: "1px solid black"
                }}
            >
                <div>
                    <img
                        style={{
                            borderRadius: '50%',
                            width: "20%",
                            border: "2px solid black"
                        }}
                        src={actual_logo} alt="Description" />
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <button
                        onClick={handleButtonClick}
                        style={{
                            borderRadius: "50px",
                            border: "none",
                            padding: "10px 15px",
                            cursor: "pointer",
                            backgroundColor: "white",
                            boxShadow: "1px 1px 5px 0px rgba(0,0,0,0.75)",
                            color: "black"
                        }}
                    >Home</button>

                </div>
            </div>
        </div>
    )
}

export default Navbar
