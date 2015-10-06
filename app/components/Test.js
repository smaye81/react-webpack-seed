const React = require('react');


const Test = React.createClass({

    getInitialState () {
        return {
            song : {}
        }
    },

    handleClick () {
        console.log('Clicked!');
    },

    render () {

       return (
           <div>
               <label>Component!</label>
               <button onClick={this.handleClick}>Click Me</button>
           </div>
       );
    }

});


module.exports = Test;
