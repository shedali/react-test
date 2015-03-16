var React = require('react');
 
var MyView = React.createClass({
  render: function(){
    return (
      <div>
        Amazing React Project
      </div>
    );
  }
});
 
function render() {
  return <MyView />;
}
 
module.exports = render