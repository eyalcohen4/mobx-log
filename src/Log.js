import { observable, action, reaction } from 'mobx';

class Logs {
	@observable entries = JSON.parse(localStorage.getItem('entries')) || [];

	@action addEntry(entry) {
		this.entries.push(entry);
	}

	save = reaction(() => this.entries.length, () => {
		localStorage.setItem('entries', JSON.stringify(this.entries));
	});

	get length() {
		return this.entries.length;
	}

	get onlyInWorkHours() {
		return this.entries.filter(entry => entry.hour > 10 || entry.hour < 18)
	}
}

export default new Logs();