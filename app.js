//This is JSX syntax. It's parsed into JS by Babel (included in html src)
// In essence, JSX writes "React.createElement(param1, param2, param3)".


function Header(props) {
    return (
        <header>
            <h1>{props.title}</h1>
            <span className="stats">Players: {props.totalPlayers}</span>
        </header>
    );
}

function Player(props) {
    return (
        <div className="player">
            <span className="player-name">
                <button className="remove-player" onClick={ () => props.removePlayer(props.id) }>X</button>
                <strong>{props.playerName}</strong>
            </span>
            <Counter />
            <br />
        </div>
    );
}

class Counter extends React.Component {

    //Babel renders this code as a JS constructor.
    state = {
        playerScore: 0
    };
    //The above code is the same as writing the below code.
    // constructor() {
    //Calls the parent class's constructor.
    //     super()
    //     this.state = {
    //         playerScore: 0
    //     };
    // }

    //Arrow function is bound to the component of its instance
    incrementScore = () => {
        this.setState(prevState => ({
            playerScore: prevState.playerScore + 1
        }
        ));
    }

    decrementScore = () => {
        if (this.state.playerScore != 0) {
            //setState takes a callback to make sure the state change happens synchronously.
            this.setState(prevState => ({
                playerScore: prevState.playerScore - 1
            }));
        }
    }

    render() {
        return (
            <div className="counter">
                <button className="counter-action decrement" onClick={this.decrementScore}> - </button>
                <span className="counter-score">{this.state.playerScore}</span>
                <button className="counter-action increment" onClick={this.incrementScore}> + </button>
            </div>
        );
    }
}

class App extends React.Component {

    state = {
        players: [
            {
                name: "Kento",
                id: 1
            },
            {
                name: "Ray",
                id: 2
            },
            {
                name: "Mark",
                id: 3
            }
        ]
    };

    handleRemovePlayer = (id) => {
        this.setState ( prevState => {
            return {
                players: prevState.players.filter( p => p.id !== id )
            }
        });
    }

    render() {
        return (
            <div className="scoreboard">
                <Header
                    title="Scoreboard"
                    totalPlayers={this.state.players.length}
                />
                {/* Players list here */}
                {/* .map() is basically foreach in JS. */}
                {this.state.players.map(
                    player =>
                        <Player
                            playerName={player.name}
                            id={player.id}
                            // React needs a unique identifier to "React" quickly to changes in the DOM. Recommended to use strings.
                            key={player.id.toString()}
                            removePlayer = {this.handleRemovePlayer}
                        />
                )}
            </div>
        );
    }
}

//Renders DOM elements
ReactDOM.render(
    //Custom template tags must begin with a capital letter.
    <App />,
    document.getElementById('root')
);

