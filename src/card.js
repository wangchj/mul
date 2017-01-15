import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import './layout.css';

class FlashcardPage extends Component {

  constructor() {
    super();

    let params = this.getQueryParams();
    this.state = params;
  }

  getQueryParams() {
    let param1 = this.getUrlParam('a');
    let param2 = this.getUrlParam('b');
    let a = parseInt(param1);
    let b = parseInt(param2);

    a = a ? a : 2;
    b = b ? b : 2;

    return {a:a, b:b};
  }

  /**
   * Gets a query string parameter from the browser url.
   *
   * Source: http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
   * Note: this method is inefficient for getting a large number of parameters because this function
   *       needs to be called once for each parameter.
   */ 
  getUrlParam(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  render() {
    return (
      <div className="App" style={{height:'100%'}}>
        <div id="header" style={{position:'fixed', top:'0', left:'0', width:'100%', paddingTop:'10px', paddingBottom:'10px', textAlign:'right', border:'solid 0px gray'}}>
          <div style={{marginRight:'10px'}}>
        	  <a className="btn btn-default" href="table.html">
              <span className="glyphicon glyphicon-th"/>
            </a>
          </div>
        </div>
        <div id="content" style={{
          height: '100%',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'}}
        >
          <Mul a={this.state.a} b={this.state.b} />
        </div>
      </div>
    );
  }
}

class Mul extends Component {
  constructor(props) {
  	super();
    this.state = {
      a: parseInt(props.a),
      b: parseInt(props.b),
      activeOperand: 'a',
      showAnswer: props.showAnswer ? true : false,
      revealAnswer: props.showAnswer ? true : false
    }
  }

  /**
   * Add or minus one to the operand specified by opId.
   */
  scroll(opId, event) {
    //console.log('scroll()');
    let bound = event.target.getBoundingClientRect();
    let yMid = (bound.top + bound.bottom) / 2;

    if (event.pageY < yMid) { // Decrease operand
      if (opId == 'a')
        this.setState({a:this.state.a <= 2 ? 9 : this.state.a - 1});
      else
        this.setState({b:this.state.b <= 2 ? 9 : this.state.b - 1});
    }
    else { // Increase operand
      if (opId == 'a')
        this.setState({a:this.state.a >= 9 ? 2 : this.state.a + 1});
      else
        this.setState({b:this.state.b >= 9 ? 2 : this.state.b + 1});
    }

    this.setState({revealAnswer: this.state.showAnswer});
  }

  /**
   * Generate and display a random number for the operand specified by opId.
   */
  randOp(opId, event){
    var old = opId == 'a' ? this.state.a : this.state.b;
    var rand = parseInt(Math.random() * (10 - 2) + 2);
    while (rand == old)
      rand = parseInt(Math.random() * (10 - 2) + 2);

    if (opId == 'a')
      this.setState({a:rand});
    else
      this.setState({b:rand});

    this.setState({revealAnswer:this.state.showAnswer});
    
    event.stopPropagation();
  }

  /**
   * Generate and display a random number for both operands.
   */
  rand() {
    let oldA = this.state.a;
    let oldB = this.state.b;

    let a = parseInt(Math.random() * (10 - 2) + 2);
    while (a == oldA)
      a = parseInt(Math.random() * (10 - 2) + 2);

    let b = parseInt(Math.random() * (10 - 2) + 2);
    while (b == oldB)
      b = parseInt(Math.random() * (10 - 2) + 2);

    this.setState({a:a, b:b, revealAnswer:this.state.showAnswer});
  }

  /**
   * Handles checkbox click.
   */
  toggleShowAnswer() {
    //console.log('toggleShowAnswer()');
    this.setState({showAnswer:!this.state.showAnswer});
  }

  /**
   * Reveal or hides the multiplication answer.
   */
  toggleRevealAnswer() {
    //console.log('toggleRevealAnswer()');
    this.setState({revealAnswer:!this.state.revealAnswer});
  }

  render() {

    let answerVisibility = this.state.revealAnswer ? 'visible' : 'hidden';
    let answerBorder = this.state.revealAnswer ? 'none' : 'dashed 1px gray';
    return (
	    <div>
	      <table style={{margin:'0 auto', fontSize:60}}>
	      	<tbody>
		      	<tr>
		      		<td style={{padding:'40px 10px', cursor:'pointer'}} onClick={this.scroll.bind(this, 'a')}>
                <span onClick={this.randOp.bind(this, 'a')}>{this.state.a}</span>
              </td>
		      		<td style={{padding:'40px 10px'}}>
                <span onClick={this.rand.bind(this)} style={{cursor:'pointer'}}>×</span>
              </td>
		      		<td style={{padding:'40px 10px', cursor:'pointer'}} onClick={this.scroll.bind(this, 'b')}>
                <span onClick={this.randOp.bind(this, 'b')}>{this.state.b}</span>
              </td>
		      		<td style={{padding:'40px 10px'}} onClick={this.toggleRevealAnswer.bind(this)}><span style={{visibility:answerVisibility}}>=</span></td>
		      		<td style={{padding:'40px 10px', cursor:'pointer'}} onClick={this.toggleRevealAnswer.bind(this)}>
                <span style={{border:answerBorder}}><span style={{visibility:answerVisibility}}>{this.state.a * this.state.b}</span></span>
              </td>
		      	</tr>     	
	      	</tbody>
	      </table>

	      <div style={{position:'fixed', bottom:'5px', width:'100%', paddingTop:'10px', paddingBottom:'10px', border:'0px'}}>
          <div className="checkbox" style={{display:'inline', marginLeft:'15px'}}>
            <label><input type="checkbox" onClick={this.toggleShowAnswer.bind(this)}/>Show answer</label>
          </div>
	      </div>
	    </div>
    );
  }
}
ReactDOM.render(<FlashcardPage />, document.getElementById('root'));
