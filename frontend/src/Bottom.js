import React from 'react'
import actual_logo from './actual_logo.png'
import { useNavigate } from "react-router-dom";

const Bottom = () => {

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/main")
    }

    return (
        <div
            style={{
                backgroundColor: "rebeccapurple",
                height: "100%",
                borderRadius: "25px 25px 0px 0px",
                background: "linear-gradient(90deg, rgba(216,239,211,1) 15%, rgba(228,254,248,1) 85%)",
                boxShadow: "rgb(0,0,0,0.29) 5px 5px 5px 0px",
                display: "flex",
                boxSizing: 'border-box',
                justifyContent: "space-between",
                padding: "0px 10px 0px 50px"
            }}
        >
            <div
                style={{
                    borderRadius: "20px",
                    width: "30%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "black",
                    textAlign: "start"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <img
                        style={{
                            width: "50px",
                            height: "50px",
                            // height: "40%",
                            borderRadius: "50%"
                        }}
                        src={actual_logo} alt="Description" />
                    <h3 style={{ marginTop: "5px", marginBottom: 0, fontSize: "20px" }}>CodeBot</h3>
                </div>
                <p style={{ marginTop: "10px", marginBottom: "0px" }} >Are you ready to dive </p>
                <p style={{ marginBottom: "10px", marginTop: "0px" }} >into a new adventure?</p>
                <button
                    onClick={handleButtonClick}
                    style={{
                        backgroundColor: "#e4fef8",
                        color: "#497671",
                        border: "none",
                        borderRadius: "10px",
                        padding: "10px 20px",
                        cursor: "pointer"
                    }}
                >Start your journey!</button>
            </div>
            <div
                style={{
                    color: "#497671",
                    padding: "0px 50px 0px 0px",
                    textAlign: "start"
                }}
            >
                <h3>Meet the team:</h3>
                <p><strong>Ibrahim Bin Mansoor</strong> - Lead backend developer</p>
                <p><strong>Manal Rani</strong> - Lead frontend developer</p>
                <p><strong>Moneeba Rani</strong> - Lead designer</p>
            </div>
        </div>
    )
}

export default Bottom
