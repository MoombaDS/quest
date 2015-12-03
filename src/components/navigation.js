let React = require("react"),
	LinkContainer = require("react-router-bootstrap").LinkContainer,
	IndexLinkContainer = require("react-router-bootstrap").IndexLinkContainer,
	NavItem = require("react-bootstrap").NavItem,
	Nav = require("react-bootstrap").Nav,
	ButtonGroup = require("react-bootstrap").ButtonGroup;

let Navigation = (props)=> {
    return (
		<div>
			<Nav bsStyle="pills">
					<IndexLinkContainer to="/"><NavItem>Home</NavItem></IndexLinkContainer>
					<LinkContainer to="/help"><NavItem>Help</NavItem></LinkContainer>
					<NavItem href="https://github.com/MoombaDS/quest" target="_blank">Source Code</NavItem>
			</Nav>

		</div>
	);
};

module.exports = Navigation;