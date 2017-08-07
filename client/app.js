
var DeckList = (props) => {
  return (
  <ul id = "DeckList">
    {props.cards.map(card =>
    <CardRender card={card}/>
    )}
  </ul>
  )
}

class CardRender extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var style = {
      width: 50,
      height: 80
    };
    return (
      <div id="image">
        <img style={style} src={`client/PNG-cards-1.3/${this.props.card.img}`}/>
      </div>
    )
  }
};

var hit = function(player, deck) {
  player.push(deck.pop());
}

var scoreCheck = function(cards) {
  var score = 0;
  cards.forEach(function(card) {
    if (['jack', 'queen', 'king'].includes(card.rank)) {
      score += 10;
    } else if (card.rank === 'ace') {
      score += 1;
    } else {
      score += Number(card.rank);
    }
  });
  return score;
}

var scoreCompare = function(player, dealer) {
  console.log('comparing');
  if (scoreCheck(player) > scoreCheck(dealer)) {
    ReactDOM.render(<p>YOU WIN</p>, document.getElementById('card'));
  } else {
    ReactDOM.render(<p>YOU LOSE</p>, document.getElementById('card'));
  }
}

var deck = null;
var player = [];
var dealer = [];
$.get('http://localhost:3000/getdeck', function(data) {
  var parsed = JSON.parse(data);
  //ReactDOM.render(<DeckList cards={parsed[0]}/>, document.getElementById('card'));
  deck = parsed[0];
  //console.log(deck);
  player.push(deck.pop());
  player.push(deck.pop());
  console.log(player);
  dealer.push(deck.pop());
  dealer.push(deck.pop());
  console.log(dealer);
  ReactDOM.render(<div><h1>Player</h1><DeckList cards={player}/><h1>Dealer</h1><DeckList cards={dealer}/></div>, document.getElementById('card'));
  return parsed;

});
ReactDOM.render(<p>Hello there</p>, document.getElementById('card'));
ReactDOM.render(<div><button id="hit">Hit</button><button onClick={scoreCompare(player, dealer)} id="stand">Stand</button></div>, document.getElementById('buttons'));

