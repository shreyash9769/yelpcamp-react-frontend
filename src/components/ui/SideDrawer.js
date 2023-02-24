import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import classes from '../../styles/SideDrawer.module.css';

const SideDrawer = props => {
  const content = (
    <CSSTransition
      in={props.show}
      timeout={600}
      classNames={{
        enter: classes.enter,
        enterActive: classes.enterActive,
        exit: classes.exit,
        exitActive: classes.exitActive
      }}
      mountOnEnter
      unmountOnExit
    >
      <aside className={classes.sidedrawer} onClick={props.onClick}>{props.children}</aside>
    </CSSTransition>
  );

  return ReactDOM.createPortal(content, document.getElementById('drawer-hook'));
};

export default SideDrawer;
