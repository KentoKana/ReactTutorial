//This is JSX syntax. It's parsed into JS by Babel (included in html src)
// In essence, JSX writes "React.createElement(param1, param2, param3)".

// const desc = 'I just learned how to create a React node and render it into the DOM.';
// const myTitleID = 'main-title';
// const name='Kento';
// const header = (
//     <header>
//         <h1 id={myTitleID}>{name}'s First React Element!</h1>
//         {/* Can write JS inside curly braces */}
//         <p>{ desc }</p>
//     </header>
// );

//React Component (Using a constructor)
//Set property values inside App(), but pass the parameter in Header constructor.
//It's like defining parameters in a function. You can "call" the component later to set the value for the props.

const players = [
    {
        name: "Kento",
        score: 0,
        id:1
    },
    {
        name: "Ray",
        score: 69,
        id:2
    },
    {
        name: "Mark",
        score: 6969,
        id:3
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

            <Counter playerScore={ props.playerScore } />
        </div>
    );
}

function Counter(props) {
    return (
        <div className="counter">
            <button className="counter-action decrement"> - </button>
            <span className="counter-score">{ props.playerScore }</span>
            <button className="counter-action increment"> + </button>
        </div>
    );
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
                        playerName={ player.name }
                        playerScore={ player.score }
                        // React needs a unique identifier to "React" quickly to changes in the DOM. Recommended to use strings.
                        key={ player.id.toString() }
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

