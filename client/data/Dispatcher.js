module.exports = new Dispatcher(); 

function Dispatcher() {
	this._callback = {};
	this._id = 0;
}

Dispatcher.prototype.register = function(cb) {
	this._callback[this._id] = cb;
	return this._id++;
}

Dispatcher.prototype.dispatch = function(payload) {
	for (this._id in this._callback) {
		this._callback[this._id](payload);
		console.log('id', this._id)
		//console.log("what register does : ", this._callback[this._id])
	}
}