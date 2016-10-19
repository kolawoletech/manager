import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import { employeesFetch } from '../actions';
import ListItem from './ListItem';

class EmployeeList extends Component {
	componentWillMount() {
		this.props.employeesFetch();

		this.createDataSource(this.props);
	}

	componentWillReceiveProps(nextProps) {
		// nextProps are the next set of props that this component
		// will be rendered with.
		// this.props is still the old set of props
		this.createDataSource(nextProps);
	}

	createDataSource({ employees }) {
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});

		this.dataSource = ds.cloneWithRows(employees);
	}

	renderRow(employee) {
		return <ListItem employee={employee} />;
	}

	render() {
		console.log(this.props);
		return (
			<ListView
				enableEmptySections
				dataSource={this.dataSource}
				renderRow={this.renderRow}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	// state.employees is an object - it has many key/value pairs.
	// for each key/value pair (map), run the fat-arrow function.
	// the fat-arrow function will be called with each value (val) and key (uid).
	// val = user model (name/shift/phone properties)
	// then create a new object (return statement)
	// which we push all of the values (...val) and throw uid on top
	// end result will be an object that looks like:
	// { shift: 'Monday', name: 'Manny', id: '1wfsdasd4546ydfg'}
	// these objects will be collected and stored in employees array const.
	const employees = _.map(state.employees, (val, uid) => {
		return { ...val, uid };
	});

	return { employees };
};

export default connect(mapStateToProps, { employeesFetch })(EmployeeList);
