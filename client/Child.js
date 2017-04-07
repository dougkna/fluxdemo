import React, {Component} from 'react';

var Child = React.createClass({
	// propTypes= {
	// 	id: React.propTypes.number.isRequired
	// }

	render(){
		return(
			<li>
				{this.props.text}
			</li>
		)
	}
})

module.exports = Child;