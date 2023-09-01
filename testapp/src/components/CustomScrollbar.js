import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';

function CustomScrollbar() {
  return (
    <div className="custom-scrollbar">
      <Scrollbars style={{ width: 300, height: 200 }}></Scrollbars>
    </div>
  );
}

export default CustomScrollbar;