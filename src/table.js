import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import './layout.css';

class TablePage extends Component {

  constructor() {
    super();
    this.state = {
      highlight: {
        row: null,
        col: null
      }
    }
  }

  tableButtonClick() {
    console.log('tableButtonClick()');
  }

  render() {
    return (
      <div className="App" style={{height:'100%'}}>
        <div id="header" style={{position:'fixed', top:'0', left:'0', width:'100%', paddingTop:'10px', paddingBottom:'10px', textAlign:'right', border:'solid 0px gray'}}>
          <div style={{marginRight:'10px'}}></div>
        </div>
        <div id="content" style={{textAlign:'center'}}>
          <div id="TablePageContent" style={{marginTop:'50px'}}>
            {this.makeTable()}
          </div>
        </div>
      </div>
    );
  }

  /**
   * Make the mul table.
   */
  makeTable() {
    return (
      <table style={{margin:'0 auto', border:'solid 1px gray'}}>
        {this.makeTableHeader()}
        {this.makeTableBody()}
      </table>
    );
  }

  /**
   * Make the header row of the mul table.
   */
  makeTableHeader() {
    var cells = [];

    // Make an empty column for the row header
    cells.push(<Cell key={'col'+0} isHeader={true}/>);

    for (var i = 1; i <= 9; i++) {
      cells.push(<Cell key={'col'+i} isHeader={true} colId={i} mouseLoc={this.state.highlight} onMouseEnterCell={this.onMouseEnterCell.bind(this)} onMouseLeaveCell={this.onMouseLeaveCell.bind(this)}/>);
    }

    return (
      <thead>
        <tr>{cells}</tr>
      </thead>
    );
  }

  /**
   * Make the body (rows) of the mul table.
   */
  makeTableBody() {
    var rows = [];
    for (var row = 1; row <= 9; row++) {
      
      // Each row consists of array of cells
      var cells = [];
      
      // The first cell of the row is the header
      cells.push(<Cell key={row+'.'+0} isHeader={true} rowId={row} mouseLoc={this.state.highlight} onMouseEnterCell={this.onMouseEnterCell.bind(this)} onMouseLeaveCell={this.onMouseLeaveCell.bind(this)}/>)

      // Make the rest of the cells of the row
      for (var col = 1; col <= 9; col++) {
        cells.push(<Cell key={row+'.'+col} rowId={row} colId={col} mouseLoc={this.state.highlight} onMouseEnterCell={this.onMouseEnterCell.bind(this)} onMouseLeaveCell={this.onMouseLeaveCell.bind(this)}/>)
      }

      rows.push(<tr key={"row"+row}>{cells}</tr>);
    }

    return <tbody>{rows}</tbody>;
  }

  onMouseEnterCell(rowId, colId) {
    this.setState({highlight:{row:rowId, col:colId}});
  }

  onMouseLeaveCell(rowId, colId) {
    this.setState({highlight:{row:null, col:null}});
  }
}

class Cell extends Component {

  render() {
    if (this.props.isHeader)
      return this.makeHeaderCell();
    else
      return this.makeBodyCell();
  }

  makeHeaderCell() {

    let rowId = this.props.rowId;
    let colId = this.props.colId;

    let css = this.props.mouseLoc && 
      ((this.props.mouseLoc.row && (this.props.mouseLoc.row === this.props.rowId)) ||
      (this.props.mouseLoc.col && (this.props.mouseLoc.col === this.props.colId))) ?
      Object.assign({}, tdCss, thCss, bgHiCss) :
      Object.assign({}, tdCss, thCss, bgLoCss);

    // If both rowId and colId are empty, just make an empty cell
    if (!rowId && !colId)
      return <th style={css}></th>

    // If column id exists, then this is a header cell of a column, at the top of the table.
    if (colId) {
      return <th style={css} onMouseEnter={this.onMouseEnter.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}>{colId}</th>
    }
    // Else, this is a header cell of a rwo, at the left of the table.
    else {
      return <th style={css} onMouseEnter={this.onMouseEnter.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}>{rowId}</th>
    }
  }

  makeBodyCell() {

    let rowId = parseInt(this.props.rowId);
    let colId = parseInt(this.props.colId);
    let css = Object.assign({}, tdCss, bgLoCss, txLoCss);

    if (this.props.mouseLoc && this.props.rowId && this.props.colId) {
      if (this.props.mouseLoc.row === rowId && this.props.mouseLoc.col === colId)
        css = Object.assign({}, tdCss, bgHiCss, txHiCss);
      else if (this.props.mouseLoc.row === rowId || this.props.mouseLoc.col === colId)
        css = Object.assign({}, tdCss, bgHiCss, txLoCss);
    }

    return (
      <td onMouseEnter={this.onMouseEnter.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)} style={css}>
        {parseInt(rowId) * parseInt(colId)}
      </td>
    );
  }

  onMouseEnter(event) {
    this.props.onMouseEnterCell(this.props.rowId, this.props.colId);
  }

  onMouseLeave(event) {
    this.props.onMouseLeaveCell(this.props.rowId, this.props.colId);
  }
}

// https://www.reddit.com/r/reactjs/comments/41gu88/how_would_i_add_multiple_style_attributes_to_a/?st=ixnx26xz&sh=3f2da8e8


let tdCss = {padding:'10px 15px', border:'1px solid #ddd', fontSize:'24px'};
let thCss = {textAlign: 'center'};

let bgHiCss = {backgroundColor:'#eee'};
let bgLoCss = {backgroundColor:'transparent'};
let txHiCss = {color:'#444'};
let txLoCss = {color:'#aaa'};

ReactDOM.render(<TablePage />, document.getElementById('root'));
