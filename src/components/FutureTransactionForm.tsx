import * as React from 'react';
import { Button, ControlLabel, FormControl, FormGroup, HelpBlock, Radio } from 'react-bootstrap';

interface IProps {
	onAddTransaction(transaction:IState):void
}

interface IState {
	amount: string,
	date: string,
	label: string,
	transactionType: string // TODO make enum
}

const FieldGroup = ({ id, label, help, ...props }) => {
	return (
		<FormGroup controlId={id}>
			<ControlLabel>{label}</ControlLabel>
			<FormControl {...props} />
			{help && <HelpBlock>{help}</HelpBlock>}
		</FormGroup>
	);
};

class FutureTransactionForm extends React.Component<IProps, IState> {
	constructor(props) {
		super(props);
		this.state = {
			amount: '',
			date: '',
			label: '',
			transactionType: ''
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	private resetForm() {
		this.setState({
			amount: '',
			date: '',
			label: '',
			transactionType: ''
		});
	}

	private handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		} as IState);
	}

	private handleSubmit(event) {
		event.preventDefault();
		this.props.onAddTransaction({...this.state} as IState);
		this.resetForm();
	}

	public render() {
		const datePickerMin = new Date().toISOString().split('T')[0];
		return (
			<form onSubmit={this.handleSubmit}>
				<p>Please enter future transaction:</p>
				<FieldGroup
					help="Enter the amount of the transaction."
					id="amount"
					name="amount"
					type="number"
					label="Amount"
					placeholder="Enter amount"
					value={this.state.amount}
					onChange={this.handleInputChange}
					step="0.01" 
					min="0"
					required={true}
				/>
				<FieldGroup
					help="Enter a label for the transaction."
					id="label"
					name="label"
					type="text"
					label="Label"
					placeholder="Label"
					value={this.state.label}
					onChange={this.handleInputChange}
				/>
				<FieldGroup
					help="Select the date of the transaction."
					id="date"
					name="date"
					type="date"
					label="Date"
					value={this.state.date}
					onChange={this.handleInputChange}
					min={datePickerMin}
					required={true}
				/>
				<FormGroup>
					<Radio
						name="transactionType"
						value="income"
						onChange={this.handleInputChange}
						checked={this.state.transactionType === 'income'}
						inline={true}
						required={true}
					>
						Income
					</Radio>{' '}
					<Radio
						name="transactionType"
						value="expense"
						onChange={this.handleInputChange}
						checked={this.state.transactionType === 'expense'}
						inline={true}
					>
						Expense
					</Radio>
				</FormGroup>
				<Button type="submit">Add</Button>
			</form>
		);
	}
}

export default FutureTransactionForm;