import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class PopsycleNavbar extends Component {
	render() {
		return (
			<Navbar>
				<Navbar.Header>
					<Navbar.Brand>
						<a href="#home">Popsycle</a>
					</Navbar.Brand>
				</Navbar.Header>
				<Nav pullRight>
					<NavItem eventKey={1} href="#demo">
						Demo
					</NavItem>
				</Nav>
			</Navbar>
		);
	}
}

export default PopsycleNavbar;