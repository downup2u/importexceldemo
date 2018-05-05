import React, { Component } from 'react';
import { Steps, Button, message,Alert } from 'antd';

class StartImport extends React.Component {
	constructor(props) {
		super(props);
	};


	render() {
		return (
			<Alert message="导入成功" type="success" showIcon />
		);
	};

}

export default StartImport;
