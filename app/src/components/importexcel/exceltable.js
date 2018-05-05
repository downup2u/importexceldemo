import React, { Component } from 'react';
/*
  Simple HTML Table
  usage: <OutTable data={data} cols={cols} />
    data:Array<Array<any> >;
    cols:Array<{name:string, key:number|string}>;
*/

class OutTable extends React.Component {
	constructor(props) {
		super(props);
	};
	render() {
		const {cols,data} = this.props;
		console.log(data);
		console.log(cols);
    return (
        <div className="table-responsive">
        	<table className="table table-striped">
        		{/* <thead>
        			<tr>{cols.map((c) => <th key={c.key}>{c.name}</th>)}</tr>
        		</thead> */}
        		<tbody>
        			{
								data.map((r,i) =>
										<tr key={i}>
		        				{
											cols.map(c => <td key={c.key}>{ r[c.key] }</td>)
										}
		        			</tr>
								)
							}
        		</tbody>
        	</table>
        </div>
  	);
  };
};

export default OutTable;
