import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
 
import { DcLibApp } from '../imports/ui/App.jsx';
 
Meteor.startup(() => {
  render(<DcLibApp />, document.getElementById('render-target'));
});
