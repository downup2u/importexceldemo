import React, { Component } from 'react';
import { Steps, Button, message,Alert } from 'antd';
import {DragDropFile,DataInput} from './draginputfile';
import OutTable from './exceltable';
import StartImport from './startimport';
import XLSX from 'xlsx';

import './index.css';

const Step = Steps.Step;

const make_cols = refstr => {
	let o = [], C = XLSX.utils.decode_range(refstr).e.c + 1;
	for(var i = 0; i < C; ++i) {
    o[i] = {
      name:XLSX.utils.encode_col(i),
      key:i
    }
  }
	return o;
};


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      data: [], /* Array of Arrays e.g. [["a","b"],[1,2]] */
      cols: []  /* Array of column objects e.g. { name: "C", K: 2 } */
    };
    this.handleFile = this.handleFile.bind(this);
  }
  handleFile(file/*:File*/)
  {
		/* Boilerplate to set up FileReader */
		const reader = new FileReader();
		const rABS = !!reader.readAsBinaryString;
		reader.onload = (e) => {
			/* Parse data */
			const bstr = e.target.result;
			const wb = XLSX.read(bstr, {type:rABS ? 'binary' : 'array'});
			/* Get first worksheet */
			const wsname = wb.SheetNames[0];
			const ws = wb.Sheets[wsname];
			/* Convert array of arrays */
			const data = XLSX.utils.sheet_to_json(ws, {header:1});
			/* Update state */
			this.setState({ data: data, cols: make_cols(ws['!ref']) });
		};
		if(rABS) {
      reader.readAsBinaryString(file);
    }
    else {
      reader.readAsArrayBuffer(file);
    }
	};

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  render() {
    const { current } = this.state;
    const steps = [{
      title: '选择文件',
      content: <DataInput handleFile={this.handleFile} />,
    }, {
      title: '编辑数据',
      content: <OutTable data={this.state.data} cols={this.state.cols} />,
    }, {
      title: '开始导入',
      content: <StartImport />,
    }];

		const isshowprev = this.state.current > 0 && this.state.current < 2;
		const isshownext = this.state.current < steps.length - 1;
		const ishowfinished = this.state.current === steps.length - 1;
    return (
      <div>
        <Steps current={current}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <div className="steps-content">{steps[this.state.current].content}</div>
        <div className="steps-action">
					{
						isshowprev
						&&
						<Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
							上一步
						</Button>
					}
          {
            isshownext
            &&
            <Button type="primary" onClick={() => this.next()}>下一步</Button>
          }
          {
            ishowfinished
            &&
            <Button type="primary" onClick={() => {this.props.onClose()}}>完成</Button>
          }

        </div>
      </div>
    );
  }
}

export default App;
