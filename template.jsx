var React = require('react');
 
var MyView = React.createClass({
  render: function(){
    return (
      <div>
        A test project
      </div>
    );
  }
});
 
function render() {
  return <MyView />;
}
 
module.exports = render