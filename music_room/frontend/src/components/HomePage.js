import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";

export default class HomePage extends Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<p>This is the home page</p>} />
                    <Route path="/join" element={<RoomJoinPage />} />
                    <Route path="/create" element={<CreateRoomPage />} />
                </Routes>
            </Router>
        );
    }
}
