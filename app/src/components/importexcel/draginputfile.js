import React, { Component } from 'react';
/*
  Simple HTML5 file drag-and-drop wrapper
  usage: <DragDropFile handleFile={handleFile}>...</DragDropFile>
    handleFile(file:File):void;
*/
class DragDropFile extends React.Component {
	constructor(props) {
		super(props);
		this.onDrop = this.onDrop.bind(this);
	};

	suppress(evt)
	{
		 evt.stopPropagation();
		 evt.preventDefault();
	};

	onDrop(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		const files = evt.dataTransfer.files;
		if(files && files[0]) {
			this.props.handleFile(files[0]);
		}
	};

	render() {
		return (
			<div onDrop={this.onDrop} onDragEnter={this.suppress} onDragOver={this.suppress}>
				{this.props.children}
			</div>
		);
	};
};

/* list of supported file types */
const SheetJSFT = [
	"xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
].map(function(x) { return "." + x; }).join(",");

/*
  Simple HTML5 file input wrapper
  usage: <DataInput handleFile={callback} />
    handleFile(file:File):void;
*/
class DataInput extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	};
	handleChange(e) {
		const files = e.target.files;
		if(files && files[0]) {

			console.log(files[0].name);
			this.props.handleFile(files[0]);
		}
	};
	render() {
		console.log(this.props.selectfile);
		return (
				<div className="form-group">
					<div>{this.props.selectfile}</div>
					<input type="file" className="form-control" id="file"
						accept={SheetJSFT} onChange={this.handleChange}
						filename={this.props.selectfile}
					/>
				</div>

		);
	};
}

export {DragDropFile,DataInput};
