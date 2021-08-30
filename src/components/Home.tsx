import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import internal from 'stream';
import styled from 'styled-components';
import axios from '../axios/axios'

import './home.css'

const Title = styled.h1`
font-size: 1.5em;
text-align: center;
color: palevioletred;
`;
export default function Home() {


    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [idSelect, setIdSelect] = useState(-1);

    useEffect(() => {
        const getUsers = async () => {
            setIsLoading(true);
            await axios.get('/api/users?page=2')
                .then((res: any) => {
                    console.log("res: ", res)
                    if (res.data.data) {
                        setUsers(res.data.data)
                    }
                })
                .catch((e: any) => {
                    alert(e.response.data.error)
                })
            setIsLoading(false)
        }
        getUsers();
    }, [])
    const showDetailsAction = (id: any) => {
        setShowDetails(true);
        setIdSelect(id);
    }

    if (showDetails) {
        return (
            <Redirect to={"/users/profile/" + idSelect} />
        )
    }
    return (
        <>
            {isLoading ? (
                <div className="overlay">
                    <div className="lds-facebook"><div></div><div></div><div></div></div>
                </div>
            ) : users.length > 0 ? (
                <>
                    <div className="table-wrapper">
                        <table className="fl-table">
                            <thead>
                                <tr>
                                    <th>Email</th>
                                    <th>First name</th>
                                    <th>Last Name</th>
                                    <th>Avatar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((e, i) => (
                                    <tr onClick={() => showDetailsAction(e['id'])}>
                                        <td>{e['email']}</td>
                                        <td>{e['first_name']}</td>
                                        <td>{e['last_name']}</td>
                                        <td><img src={e['avatar']} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="center">
                        <span className="link-logout" onClick={() => {
                            window.location.href = "/logout"
                        }}>Logout</span>
                    </div>
                </>
            ) : (
                <Title>Empty List</Title>
            )}
        </>
    );
}