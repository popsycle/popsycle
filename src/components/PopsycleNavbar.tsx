import * as React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

class PopsycleNavbar extends React.Component {
	public render() {
		return (
			<Navbar>
				<Navbar.Header>
					<Navbar.Brand>
						<a href="#home">Popsycle</a>
					</Navbar.Brand>
				</Navbar.Header>
				<Nav pullRight={true}>
					<NavItem eventKey={1} href="#demo">
						Demo
					</NavItem>
				</Nav>
			</Navbar>
		);
	}
}

export default PopsycleNavbar;