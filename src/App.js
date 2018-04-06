import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { observer } from 'mobx-react';
import styled from 'styled-components';

const Entry = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #4286f4;
	border-radius: 4px;
	margin: 10px;
	padding: 5px;
`

@observer
class App extends Component {
	state = {
		newEntry: ''
	}

	componentDidMount() {
		console.log(this.props);
	}
	
	handleAddEntry = () => {
		const newEntry = { message: this.state.newEntry, hour: new Date().getHours() };

		this.props.log.addEntry(newEntry);
	}

  render() {
    return (
      <div className="App">
				<input value={this.state.newEntry} onChange={({ target: { value }}) => this.setState({ newEntry: value })}/>
				<button onClick={this.handleAddEntry}>Add Entry</button>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
					{this.props.log.entries ? this.props.log.entries.map(entry => (
						<li>
							<Entry>
								<span>
									{entry.message} @ {entry.hour}  ⏰
								</span>
							</Entry>
						</li>
					)) : null}
				</ul>
				<div>
					In Work Hours: {this.props.log.onlyInWorkHours.length}
				</div>
      </div>
    );
  }
}

export default App;
