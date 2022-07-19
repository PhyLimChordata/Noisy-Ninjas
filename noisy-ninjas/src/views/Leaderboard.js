import React from "react";
import "../style/Leaderboard.css"
import {useNavigate} from "react-router";
import {Rank} from "../components/Rank";
import {getUsername} from "../apiService";
export function Leaderboard ()  {
    const navigate = useNavigate();
    const username = getUsername()
    function getRankings() {
        return ["user1", "user2","user3","user4","user5","user6","user7","user8"]
    }

    function getCurrentRanking() {
        return 12
    }

    return (
        <div className={"leaderboard-page"}>
            <div className={"header"}>
                <img className={"back-icon clickable"} onClick={()=> navigate(-1)} src={require("../assets/static/back-icon.png")} alt={"back-icon"}/>
            </div>
            <div className={"body"}>
                <div className={"title"}>leaderboard</div>
                <div className={"rankings"}>
                    <Rank name={username} rank={getCurrentRanking()} className={"orange-rank"} key={0}/>
                    {getRankings().map((username, index) => <Rank name={username} rank={index+1} key={index+1} className={"alternating-dark-rank"}/>)}
                </div>

            </div>
        </div>
    );
};
