let React = require("react"),
	ReactRedux = require("react-redux"),
	proptypes = React.PropTypes,
	constants = require("../constants"),
	Panel = require("react-bootstrap").Panel,
	Grid = require("react-bootstrap").Grid,
	Row = require("react-bootstrap").Row,
	Col = require("react-bootstrap").Col;

let WorldMap = React.createClass({
	render() {
		if (this.props.display) {

			let rows = [];

			let minX = (this.props.player.x - (constants.VISUAL_MAP_WIDTH) > 0) ? this.props.player.x - (constants.VISUAL_MAP_WIDTH) : 0;
			let maxX = (this.props.player.x + (constants.VISUAL_MAP_WIDTH) < this.props.map[0].length-1) ? this.props.player.x + (constants.VISUAL_MAP_WIDTH) : this.props.map[0].length-1;
			let minY = (this.props.player.y - (constants.VISUAL_MAP_WIDTH) > 0) ? this.props.player.y - (constants.VISUAL_MAP_WIDTH) : 0;
			let maxY = (this.props.player.y + (constants.VISUAL_MAP_WIDTH) < this.props.map.length-1) ? this.props.player.y + (constants.VISUAL_MAP_WIDTH) : this.props.map.length-1;

			// Keep the map from being offset weirdly if there aren't enough rows
			if (minY === 0) {
				let missingRows = (constants.VISUAL_MAP_WIDTH*2) - maxY;
				for (let y = 0; y < missingRows; ++y) {
					let mapRow = [];
					for (let x = 0; x < (constants.VISUAL_MAP_WIDTH*2)+1; ++x) {
						mapRow.push(<span key={x + "" + y}>&nbsp;</span>);
					}
					rows.push(<p key={maxY + y + 1}>{mapRow}</p>);
				}
			}

			// Keep the map from being offset weirdly if there aren't enough columns to the left
			let leftOffset = 0;
			if (minX === 0) {
				leftOffset = (constants.VISUAL_MAP_WIDTH*2) - maxX;
			}

			// Keep the map from being offset weirdly if there aren't enough columns to the right
			let rightOffset = 0;
			if (maxX === this.props.map[0].length-1) {
				rightOffset = (constants.VISUAL_MAP_WIDTH*2) - (maxX - minX);
			}

			for (let y = minY; y <= maxY; ++y) {
				let mapRow = [];
				for (let x = minX - leftOffset; x <= maxX + rightOffset; ++x) {
					if (x < 0 || x >= this.props.map[0].length) {
						mapRow.push(<span key={x + "" + y}>&nbsp;</span>);
						continue;
					}
					if (x === this.props.player.x && y === this.props.player.y) {
						// Place the player character
						mapRow.push(<span key={x + "" + y} className="Player">☺</span>);
						continue;
					}
					if (!this.props.map[y][x].seen) { // If the area has not been seen it should be hidden
						mapRow.push(<span key={x + "" + y}>&nbsp;</span>);
						continue;
					}
					if (this.props.map[y][x].encounter && this.props.map[y][x].encounter.seen) {
						mapRow.push(<span key={x + "" + y}>{this.props.map[y][x].encounter.icon}</span>);
						continue;
					}
					switch (this.props.map[y][x].type) { // TODO: remove this switch statement and just use a map to get symbols with type as key
						case "grasslands":
							mapRow.push(<span key={x + "" + y} className="grass">#</span>);
							break;
						case "Mountain":
							mapRow.push(<span key={x + "" + y} className="cliff">▲</span>);
							break;
						case "Water":
							mapRow.push(<span key={x + "" + y} className="water">♒</span>);
							break;
						case "Wizard":
							mapRow.push(<span key={x + "" + y} className="Wizard">Π</span>);
							break;
						default:
							console.log("Something went wrong in map drawing.");
							break;
					}
				}
				rows.push(<p key={y}>{mapRow}</p>);
			}

			return (
				<Panel className="map">
					{rows}
				</Panel>
			);
		} else {
			return (
				<div></div>
			);
		}
	}
});

let mapStateToProps = (state)=> {
	return { display: state.world.displayMap, map: state.world.map, player: state.world.playerPos };
};

module.exports = ReactRedux.connect(mapStateToProps)(WorldMap);