import React from "react";

import "./leaderboard.css";

class Leaderboard extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            val: null
        }
    }

    render(){

        if(this.props.data){
            return(
                <div className = "leaderboard-parent-main">
                    
                    <div className = "lead-parent-header">Leaderboard</div>

                    <div className = "score-card-parent">
                        {this.props.data.map((player, key) => {
                            key = key + 1;
                            if(key === 1){
                                return(
                                    <div key={key} className = "score-card-layout first-place">
                                        <div className = "player-name-layout" >{key}.&nbsp;&nbsp;{player.username}
                                            {/* {key === 1 && <div>I am first</div>}
                                            {key === 2 && <div>I am second</div>}
                                            {key === 3 && <div>I am third</div>} */}
                                        </div>
                                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Score: {player.score}</div>
                                    </div>
                                )
                            }
                            else if(key === 2){
                                return(
                                    <div key={key} className = "score-card-layout second-place">
                                        <div className = "player-name-layout" >{key}.&nbsp;&nbsp;{player.username}
                                            {/* {key === 1 && <div>I am first</div>}
                                            {key === 2 && <div>I am second</div>}
                                            {key === 3 && <div>I am third</div>} */}
                                        </div>
                                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Score: {player.score}</div>
                                    </div>
                                )
                            }
                            else if(key === 3){
                                return(
                                    <div key={key} className = "score-card-layout third-place">
                                        <div className = "player-name-layout" >{key}.&nbsp;&nbsp;{player.username}
                                            {/* {key === 1 && <div>I am first</div>}
                                            {key === 2 && <div>I am second</div>}
                                            {key === 3 && <div>I am third</div>} */}
                                        </div>
                                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Score: {player.score}</div>
                                    </div>
                                )
                            }
                            else{
                                return(
                                    <div key={key} className = "score-card-layout">
                                        <div className = "player-name-layout" >{key}.&nbsp;&nbsp;{player.username}
                                            {/* {key === 1 && <div>I am first</div>}
                                            {key === 2 && <div>I am second</div>}
                                            {key === 3 && <div>I am third</div>} */}
                                        </div>
                                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Score: {player.score}</div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            );
        }
        else{
            return(
                <div><img src = {require("../../images/spinner-1.svg")}/></div>
            )
        }
    }
}


export default Leaderboard;