import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import { Grid, Typography, TextField, FormControl, FormHelperText, Radio, RadioGroup, FormControlLabel } from "@material-ui/core";
import { Link } from "react-router-dom";

export default class CreateRoomPage extends Component {
    defaultVotes = 2;

    constructor(props) {
        super(props);
        this.state = {
            guestCanPause: true,
            votesToSkip: this.defaultVotes
        };
        //to reflect these function on this class or toa ccess this keyword
        this.handleRoomButtonPress = this.handleRoomButtonPress.bind(this);
        this.handleVotesChange = this.handleVotesChange.bind(this);
        this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
    }

    handleVotesChange(e) {
        this.setState({
            votesToSkip: e.target.value
        })
    }

    handleGuestCanPauseChange(e) {
        this.setState({
            guestCanPause: e.target.value === "true" ? true : false
        })
    }

    handleRoomButtonPress() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                votes_to_skip: this.state.votesToSkip,
                guest_can_play: this.state.guestCanPause
            })
        };
        fetch('/api/create-room', requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => console.log(data))
            .catch((error) => console.error('Error:', error));

    }

    render() {
        return (
            <Grid
                container
                spacing={3}
                style={{
                    height: "100vh", // Full page height
                    alignItems: "center", // Center content vertically
                    justifyContent: "center", // Center content horizontally
                    backgroundColor: "#f5f5f5", // Light background color
                }}
            >
                {/* Title */}
                <Grid item xs={12} align="center">
                    <Typography component="h4" variant="h4" style={{ fontWeight: "bold", color: "#3f51b5" }}>
                        Create A Room
                    </Typography>
                </Grid>

                {/* Guest Control */}
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                        <FormHelperText>
                            <div style={{ fontSize: "16px", color: "#757575" }}>
                                Guest Control of Playback State
                            </div>
                        </FormHelperText>
                        <RadioGroup row defaultValue={"true"} onChange={this.handleGuestCanPauseChange}>
                            <FormControlLabel
                                value="true"
                                control={<Radio color="primary" />}
                                label="Play/Pause"
                                labelPlacement="bottom"
                                style={{ margin: "0 15px" }}
                            />
                            <FormControlLabel
                                value="false"
                                control={<Radio color="secondary" />}
                                label="No Control"
                                labelPlacement="bottom"
                                style={{ margin: "0 15px" }}
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>

                {/* Votes Input */}
                <Grid item xs={12} align="center">
                    <TextField
                        required
                        type="number"
                        onChange={this.handleVotesChange}
                        defaultValue={this.defaultVotes}
                        inputProps={{
                            min: 1,
                            style: { textAlign: "center", fontSize: "16px" },
                        }}
                        style={{
                            width: "100px",
                            marginBottom: "10px",
                        }}
                    />
                    <FormHelperText>
                        <div style={{ fontSize: "16px", color: "#757575", textAlign: "center" }}>
                            Votes required to skip song
                        </div>
                    </FormHelperText>
                </Grid>

                {/* Create Room Button */}
                <Grid item xs={12} align="center">
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={this.handleRoomButtonPress}
                        style={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                    >
                        Create A Room
                    </Button>
                </Grid>

                {/* Back Button */}
                <Grid item xs={12} align="center">
                    <Button
                        color="secondary"
                        variant="contained"
                        to="/"
                        component={Link}
                        style={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                    >
                        Back
                    </Button>
                </Grid>
            </Grid>
        );
    }
}
