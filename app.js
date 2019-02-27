//This is JSX syntax. It's parsed into JS by Babel (included in html src)
// In essence, JSX writes "React.createElement(param1, param2, param3)".

const players = [
    {
        name: "Kento",
        score: 0,
        id: 1
    },
    {
        name: "Ray",
        score: 69,
        id: 2
    },
    {
        name: "Mark",
        score: 6969,
        id: 3
    }
]

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
                {props.playerName}
            </span>

            <Counter />
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

function App(props) {
    return (
        <div className="scoreboard">
            <Header
                title="Scoreboard"
                totalPlayers={players.length}
            />
            {/* Players list here */}
            {/* .map() is basically foreach in JS. */}
            {props.initialPlayers.map(
                player =>
                    <Player
                        playerName={player.name}
                        // React needs a unique identifier to "React" quickly to changes in the DOM. Recommended to use strings.
                        key={player.id.toString()}
                    />
            )}
        </div>
    );
}

//Renders DOM elements
ReactDOM.render(
    //Custom template tags must begin with a capital letter.
    <App initialPlayers={players} />,
    document.getElementById('root')
);

