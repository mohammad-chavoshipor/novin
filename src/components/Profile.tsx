import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from '../axios/axios'
import { Param, ProfileSTRC } from '../config/conf';

import './home.css'

const Title = styled.h1`
font-size: 1.5em;
text-align: center;
color: palevioletred;
`;


export default function Profile() {

    const [user, setUser] = useState<ProfileSTRC | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [isBack, setIsBack] = useState(false);
    const param = useParams<Param>();

    useEffect(() => {
        const getUser = async () => {
            setIsLoading(true);
            await axios.get('api/users/' + param.id)
                .then((res: any) => {
                    if (res.data.data) {
                        setUser(res.data.data)
                    }
                })
                .catch((e: any) => {
                    alert(e.response.data.error)
                })
            setIsLoading(false)
        }
        getUser();
    }, [])
    if (isBack) {
        return (
            <Redirect to="/" />
        )
    }
    return (
        <>
            {isLoading ? (
                <div className="overlay">
                    <div className="lds-facebook"><div></div><div></div><div></div></div>
                </div>
            ) : user ? (
                <div className="card">
                    <img src={user.avatar} />
                    <h1>{user.first_name} {" "} {user.last_name}</h1>
                    <p className="title">Email: {user.email}</p>
                    <p>Harvard University</p>
                    <a href="#"><i className="fa fa-dribbble"></i></a>
                    <a href="#"><i className="fa fa-twitter"></i></a>
                    <a href="#"><i className="fa fa-linkedin"></i></a>
                    <a href="#"><i className="fa fa-facebook"></i></a>
                    <p><button onClick={() => setIsBack(true)}>Back To Home</button></p>
                </div>
            ) : (
                <Title>Empty Information</Title>
            )}
        </>
    );
}