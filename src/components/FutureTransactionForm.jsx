import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel, HelpBlock, Radio } from 'react-bootstrap';
import PropTypes from 'prop-types';

const FieldGroup = ({ id, label, help, ...props }) => {
	return (
		<FormGroup controlId={id}>
			<ControlLabel>{label}</ControlLabel>
			<FormControl {...props} />
			{help && <HelpBlock>{help}</HelpBlock>}
		</FormGroup>
	);
};

FieldGroup.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	help: PropTypes.string
};

class FutureTransactionForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			amount: '',
			date: '',
			transactionType: '',
			label: ''
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	resetForm() {
		this.setState({
			amount: '',
			date: '',
			transactionType: '',
			label: ''
		});
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.onAddTransaction && this.props.onAddTransaction({...this.state});
		this.resetForm();
	}

	render() {
		const datePickerMin = new Date().toISOString().split('T')[0];
		return (
			<form onSubmit={this.handleSubmit}>
				<p>Please enter future transaction:</p>
				<FieldGroup
					id="amount"
					name="amount"
					type="number"
					label="Amount"
					placeholder="Enter amount"
					value={this.state.amount}
					onChange={this.handleInputChange}
					step="0.01" 
					min="0"
					required
				/>
				<FieldGroup
					id="label"
					name="label"
					type="text"
					label="Label"
					placeholder="Label"
					value={this.state.label}
					onChange={this.handleInputChange}
				/>
				<FieldGroup
					id="date"
					name="date"
					type="date"
					label="Date"
					value={this.state.date}
					onChange={this.handleInputChange}
					min={datePickerMin}
					required
				/>
				<FormGroup>
					<Radio
						name="transactionType"
						value="income"
						onChange={this.handleInputChange}
						checked={this.state.transactionType === 'income'}
						inline
						required
					>
						Income
					</Radio>{' '}
					<Radio
						name="transactionType"
						value="expense"
						onChange={this.handleInputChange}
						checked={this.state.transactionType === 'expense'}
						inline
					>
						Expense
					</Radio>
				</FormGroup>
				<Button type="submit">Add</Button>
			</form>
		);
	}
}

FutureTransactionForm.propTypes = {
	onAddTransaction: PropTypes.func
};

export default FutureTransactionForm;
