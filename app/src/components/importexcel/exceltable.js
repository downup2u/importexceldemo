import React, { Component } from 'react';
import { Table } from 'antd';
import EditableCell from './edittablecell';
/*
  Simple HTML Table
  usage: <OutTable data={data} cols={cols} />
    data:Array<Array<any> >;
    cols:Array<{name:string, key:number|string}>;
*/

class OutTable extends React.Component {
	constructor(props) {
		super(props);
		const {data} = this.props;
		let dataSource = [];
		if(data.length > 1){
			for(let i = 1 ;i < data.length ; i ++){
				let dataitem = {
					key:`${i}`
				};
				for(let j = 0 ;j < data[0].length ;j ++){
					dataitem[data[0][j]] = data[i][j];
				}
				dataSource.push(dataitem)
			}
		}
		this.state = {
			dataSource
		}
	}

	render() {
		const {data} = this.props;
		const {dataSource} = this.state;

		let columns = [];
		if(data.length > 0){
			for(let i = 0 ;i < data[0].length ;i ++){
				columns.push({
					 title: data[0][i],
					 dataIndex: data[0][i],
					 key: data[0][i],
				})
			}
		}

		console.log(columns);
		console.log(dataSource);

    return (
        <div className="table-responsive">
        	<Table dataSource={dataSource} columns={columns} />
        </div>
  	);
  };
};

export default OutTable;
