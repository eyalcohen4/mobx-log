import React, { Component } from 'react';
import styled from 'styled-components';
import { Input, Button } from 'semantic-ui-react';

const EntryContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: ${props => props.isWorkHours ? '#4286f4' : '#10a9'};
	border-radius: 12px;
	margin: 10px 0;
	padding: 20px;
	color: #fff;
`;

const Icon = styled.span`
	display: inline-block;
	padding: 5px;
	font-size: 32px;
	cursor: pointer;
`
class Entry extends Component {
	state = { 
		isEditing: false,
	}

	handleEdit = value => {
		this.props.onValueChange(value);
	}

	render() {
		const { entry } = this.props;

		return (
			<EntryContainer isWorkHours={entry.isWorkHours}>
				{ !this.state.isEditing ? <span style={{ fontSize: '1.250em'}}>
					{entry.message} @ {entry.hour}:{entry.minutes} 🕑
					</span> : null
				}
				{ 
					this.state.isEditing ? 
					<div>
						<Input value={entry.message} onChange={({ target: { value } }) => this.handleEdit(value)} />
						<Button onClick={() => this.setState({ isEditing: false })}>✅</Button>
					</div> :
					null
				}
				<div>
					<Icon onClick={this.props.onRemove}>❌</Icon>
					<Icon onClick={() => this.setState({ isEditing: true })} >🖊️</Icon>
				</div>
			</EntryContainer>
		);
	}
}

export default Entry;
