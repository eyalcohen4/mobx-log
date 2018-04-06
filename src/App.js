import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { observer } from 'mobx-react';
import { Input, Button } from 'semantic-ui-react';
import Entry from './Entry';
import styled from 'styled-components';


@observer
class App extends Component {
	state = {
		newEntry: ''
	}

	componentDidMount() {
		console.log(this.props);
	}
	
	handleAddEntry = () => {
		const date = new Date();
		const newEntry = { 
			message: this.state.newEntry, 
			hour: date.getHours(),
			minutes: date.getMinutes(),
			day: date.getDay(),
			month: date.getMonth() + 1,
			year: date.getFullYear()
		};

		this.props.log.addEntry(newEntry);
	}

  render() {
    return (
      <div className="App">
				<div style={{ margin: '10px 0 25px 0' }}>
					<Input 
						value={this.state.newEntry} 
						style={{ margin: '0 10px' }}
						onChange={({ target: { value }}) => this.setState({ newEntry: value })}
					/>
					<Button onClick={this.handleAddEntry}>Add Entry</Button>
				</div>
				<div>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<p>In Work Hours: {this.props.log.onlyInWorkHours.length}</p>
						<p>After Work Hours: {this.props.log.afterWorkHours.length}</p>
					</div>
					<ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
						{this.props.log.entries ? this.props.log.entries.map((entry, index) => (
							<li key={Math.random()}>
									<Entry 
										entry={entry} 
										onRemove={() => this.props.log.remove(index)}
										onValueChange={value => this.props.log.edit(value, index)} />
							</li>
						)) : null}
					</ul>
				</div>
      </div>
    );
  }
}

export default App;
