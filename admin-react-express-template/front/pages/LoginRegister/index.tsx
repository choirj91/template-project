import React, { useState } from 'react';
import fetcher from '@utils/fetcher';
import { Navigate } from 'react-router-dom';
import useSWR from 'swr';

// components
import Login from './Login';
import Register from './Register';

const LogIn = () => {
    const { data: adminData, error, revalidate, mutate } = useSWR('/api/admins', fetcher);
    const [signin, setSignin] = useState<boolean>(true);

    if (!error && adminData) {
        return <Navigate to="/" />;
    }

    return (
        <div className="login-container">
            <div className={`container ${!signin ? 'right-panel-active' : ''}`} id="container">
                <Register setSignin={setSignin} />
                <Login />
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1 style={{ fontWeight: "bolder" }}>Admin</h1>
                            <h1 style={{ fontWeight: "bolder" }}>Tamplate</h1>
                            <p style={{
                                fontSize: "14px",
                                fontWeight: 100,
                                lineHeight: "20px",
                                letterSpacing: "0.5px",
                                margin: "20px 0 30px",
                            }}>등록 후 관리자의 승인이 필요합니다.</p>
                            <div className="ghost" onClick={e => setSignin(true)}>Login</div>
                        </div>
                        <div className="overlay-panel overlay-right" >
                            <h1 style={{ fontWeight: "bolder" }}>Admin</h1>
                            <h1 style={{ fontWeight: "bolder" }}>Tamplate</h1>
                            <p style={{
                                fontSize: "14px",
                                fontWeight: 100,
                                lineHeight: "40px",
                                letterSpacing: "0.5px",
                                margin: "20px 0 30px",
                            }}></p>
                            <div className="ghost" onClick={e => setSignin(false)}>Register</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogIn;
