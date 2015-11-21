var React = require("react"),
	ReactRedux = require("react-redux"),
	proptypes = React.PropTypes,
	Row = require("react-bootstrap").Row,
	Col = require("react-bootstrap").Col;

var Dialogue = React.createClass({
	displayName: "Dialogue",
	propTypes: {
		speaker: proptypes.string.isRequired,
		line: proptypes.string.isRequired,
		name: proptypes.string.isRequired
	},
	render: function() {
		var name = this.props.speaker;
		if (name === "Player") {
			name = this.props.name;
		}

		return (
			<Row className={this.props.speaker}>
				<Col xs={4} md={1}>
					{name+":"}
				</Col>
				<Col xs={12} md={11}>
					{this.props.line}
				</Col>
			</Row>
		);
	}
});

var mapStateToProps = function (state) {
	return { name: state.player.name };
};

module.exports = ReactRedux.connect(mapStateToProps)(Dialogue);