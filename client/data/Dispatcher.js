module.exports = Dispatcher; 

function Dispatcher() {
	this._callback = {};
	this._id = 1;
}

Dispatcher.prototype.register = function(cb) {
	this._callback[this._id] = cb;
	return this._id++;
}

Dispatcher.prototype.dispatch = function(payload) {
	for (var id in this._callback) {
		this._callback[id](payload);
	}
}


// var dispatcher = new Dispatcher()
// var handlerId = dispatcher.register( function( payload ) {
//   console.log( "GOT PAYLOAD: " + JSON.stringify(payload) )
//   console.log('handlerId', handlerId)
//   console.log('dispatcher', dispatcher)
// } )

// dispatcher.dispatch( { test: 1 } ) // outputs payload to console
// //dispatcher.unregister( handlerId )
// dispatcher.dispatch( { test: 2 } )