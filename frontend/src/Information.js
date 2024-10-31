import React from 'react'
import actual_logo from './actual_logo.png'

const Information = () => {
    return (
        <div>
            <div
                style={{
                    padding: "20px 50px",
                    height: "60vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: 'center'
                }}
            >
                <div
                    style={{
                        background: "linear-gradient(90deg, rgba(216,239,211,1) 15%, rgba(228,254,248,1) 85%)",
                        height: "70%",
                        borderRadius: "25px",
                        padding: "10px",
                        display: "flex",
                        justifyContent: "space-evenly",
                        boxShadow: "11px 10px 5px 0px rgba(0,0,0,0.29)",
                        WebkitBoxShadow: "11px 10px 5px 0px rgba(0,0,0,0.29)",
                        MozBoxShadow: "11px 10px 5px 0px rgba(0,0,0,0.29)",
                    }}
                >
                    <div
                        style={{
                            borderRadius: "25px",
                            width: "65%",
                            padding: "10px",
                            display: "flex",
                            justifyContent: "start",
                            alignItems: "center"

                        }}
                    >
                        <div
                            style={{
                                borderRadius: "25px",
                                padding: '10px',
                                color: "black"
                            }}
                        >
                            <h1>CodeBot</h1>
                            <div
                                style={{
                                    fontSize: "20px"
                                }}
                            >
                                <p>Embark on a coding adventure designed just for you! </p>
                                <p>Each challenge unfolds a new chapter, pushing your skills further as you solve and explore</p>
                                <p>Ready to test your skills and learn something new?</p>

                            </div>

                        </div>
                    </div>
                    <div
                        style={{
                            borderRadius: "25px",
                            width: "34%",
                            display: "flex",
                            justifyContent: "center"
                        }}
                    >
                        <img
                            style={{
                                borderRadius: '50%',
                            }}
                            src={actual_logo} alt="Description" />
                    </div>
                </div>

            </div>
        </div >
    )
}

export default Information
