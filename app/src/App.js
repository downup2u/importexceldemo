import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import chartdata from './chartdata';
import Rechart from './chart_rechart';
import SheetJSApp from './sheetjs';
import { Modal, Button } from 'antd';
import ImportExcel from './components/importexcel';

// function info() {
//   Modal.info({
//     title: '导入EXCEL',
//     closable:true,
//     footer:null,
//     content: (
//       <ImportExcel />
//     ),
//     onOk() {},
//   });
// }

class App extends Component {
  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  hideModal = () => {
    this.setState({
      visible: false,
    });
  }
  render() {
    // const data = [
    //       {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
    //       {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
    //       {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
    //       {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
    //       {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
    //       {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
    //       {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
    // ];
    return (
      <div className="App">

        <div>
          <Button type="primary"  onClick={this.showModal}>导入EXCEL</Button>
        </div>
        <Modal
          title="导入EXCEL"
          width={800}
          visible={this.state.visible}
          onOk={this.hideModal}
          onCancel={this.hideModal}
          okText="确认"
          cancelText="取消"
          footer={null}
        >
          <ImportExcel onClose={this.hideModal}/>
        </Modal>
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header> */}
        {/* <SheetJSApp /> */}
        {/* <Rechart chartdata={chartdata} /> */}
      </div>
    );
  }
}

export default App;
