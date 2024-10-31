import React from 'react'
import Information from './Information'
import Bottom from './Bottom'

const Home = () => {
    return (
        <>
            <div>
                <Information />
            </div>

            <div
                style={{
                    flexGrow: 1,
                    padding: "0px 50px"
                }}
            >
                <Bottom />
            </div>
        </>
    )
}

export default Home
