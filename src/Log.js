import { observable, action, reaction } from 'mobx';

class Logs {
	@observable entries = JSON.parse(localStorage.getItem('entries')) || [];

	@action addEntry(entry) {
		this.entries.push(entry);
	}

	@action remove(index) {
		this.entries.splice(index, 1);
	}

	@action edit(message, index) {
		this.entries[index].message = message;
	}

	save = reaction(() => this.entries.length, () => {
		const preSaveItem = this.entries[this.entries.length - 1];

		this.entries[this.entries.length - 1] = {
			...preSaveItem,
			isWorkHours: preSaveItem.hour > 9 && preSaveItem.hour < 18
		}
		localStorage.setItem('entries', JSON.stringify(this.entries));
	});

	get length() {
		return this.entries.length;
	}

	get onlyInWorkHours() {
		return this.entries.filter(entry => entry.hour > 9 && entry.hour < 18)
	}

	get afterWorkHours() {
		return this.entries.filter(entry => entry.hour < 10 || entry.hour > 18)
	}
}

export default new Logs();