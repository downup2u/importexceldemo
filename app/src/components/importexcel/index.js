import React, { Component } from 'react';
import { Steps, Button, message,Alert,Icon } from 'antd';
import {DragDropFile,DataInput} from './draginputfile';
import OutTable from './exceltable';
import StartImport from './startimport';
import fetchimportfile from './fetchimportexcel';
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
      cols: [],  /* Array of column objects e.g. { name: "C", K: 2 } */
			isimporting:false,
			isnextbtnenabled:false,
			importresult:{}
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
			this.setState({ data: data, cols: make_cols(ws['!ref']),isnextbtnenabled:true });
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
		if(current == 1){
			this.setState({ current,isimporting:false });
		}
		else if(current === 2){
			this.setState({ current,isimporting:true });
			fetchimportfile(this.state.data).then((result)=>{
				if(result.issuccess){
					this.setState({
						isimporting:false,
						importresult:{
							issuccess:true,
							textmsg:`成功导入${result.successlist.length},失败:${result.failedlist.length}条`
						}
					 });
				}
				else{
					this.setState({
						isimporting:false,
						importresult:{
							issuccess:false,
							textmsg:result.errmsg
						}
					 });
				}
			}).catch((e)=>{
				this.setState({
					isimporting:false,
					importresult:{
						issuccess:false
					}
				 });
			});

		}

  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
	// onimportfinished(){
	// 	this.setState({
	// 		isimporting:false,
	// 		importresult:{
	// 			issuccess:true
	// 		}
	// 	 });
	// }
  render() {
    const { data,cols,current,isnextbtnenabled,isimporting,importresult} = this.state;
		let icon = <Icon type="loading" />;
		if(!isimporting){
			if(importresult.issuccess){
				icon = <Icon type="smile-o" />;
			}
			else{
				icon = <Icon type="frown-o" />;
			}
		}
    let steps = [{
      title: '选择文件',
			icon:<Icon type="file-excel" />,
      content: <DataInput handleFile={this.handleFile} />,
    }, {
      title: '编辑数据',
			icon:<Icon type="edit" />,
      content: <OutTable data={data} cols={cols} />,
    }, {
      title: isimporting?'导入中':'导入完成',
			icon:icon,
      content: <StartImport isimporting={isimporting} result={importresult}/>,
    }];

		const isshowprev = current > 0 && current < 2;
		const isshownext = current < steps.length - 1;
		const ishowfinished = current === steps.length - 1 && !isimporting;
		let statusstring = 'process';//wait process finish error
		if(current === 0){
			steps[0].statusstring = 'process';
			steps[1].statusstring = 'wait';
			steps[2].statusstring = 'wait';
		}
		else if(current === 1){
			steps[0].statusstring = 'finish';
			steps[1].statusstring = 'process';
			steps[2].statusstring = 'wait';
		}
		else if(current === 2){
			steps[0].statusstring = 'finish';
			steps[1].statusstring = 'finish';
			if(!this.state.isimporting){
				if(!this.state.importresult.issuccess){
					steps[2].statusstring = 'error';
				}
				else{
					steps[2].statusstring = 'finish';
				}
			}
			else{
				//isimporting
				steps[2].statusstring = 'process';
			}
		}
    return (
      <div>
        <Steps current={current}>
          {steps.map(item => <Step key={item.title} title={item.title} icon={item.icon}  status={item.statusstring}/>)}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
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
            <Button type="primary" onClick={() => this.next()} disabled={!isnextbtnenabled}>下一步</Button>
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
