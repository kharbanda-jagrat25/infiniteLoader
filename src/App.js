import React, { useState, useEffect } from 'react';
import users from './utils/constants';
import { InfiniteLoader, List } from 'react-virtualized';
import 'react-virtualized/styles.css'; 

let startIndex = 0;
let stopIndex= 1;
const remoteRowCount = users.length;
let list = [];

const startIndexIncrementor = () => {
  startIndex += 1
}

const stopIndexIncrementor = () => {
  stopIndex += 1
}

const isRowLoaded = () => {
  return !!list[startIndex];
}

const loadMoreRows = () => {
  const user = [...users.slice(startIndex, stopIndex)]
  console.log(user);
  list = [...list, ...user]
  console.log(list);
  return user;
}

const rowRenderer = () => {
  const user = [...users.slice(startIndex, stopIndex)]
  list = [...list, ...user]
  console.log(list)
  return (
    <div
      key={startIndex}
    >
      {JSON.stringify(list[startIndex])}
      {/* {startIndex < 12 && startIndexIncrementor()}
      {stopIndex < 13 && stopIndexIncrementor()} */}
    </div>
  )
}

const onRowsRendered = () => {
  if (startIndex < users.length && stopIndex < users.length + 1 ) {
    startIndexIncrementor();
    stopIndexIncrementor();
  }
}

function App() {
  return (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadMoreRows}
      rowCount={remoteRowCount}
    >
      {() => (
        <List
          height={users.length}
          rowCount={remoteRowCount}
          rowHeight={1}
          width={users.length}
          rowRenderer={rowRenderer}
          onRowsRendered={onRowsRendered}
        />
      )}
    </InfiniteLoader>
  );
}

export default App;
