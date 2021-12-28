import React from 'react';

function DraggableList() {
  const liStyle = {
    padding: 8,
    border: '1px solid #d9d9d9',
    marginTop: -1,
  };

  const lis = Array.from({ length: 8 }, (_, index) => {
    return (
      <li key={index} draggable data-index={index} style={liStyle}>
        {index + 1}
      </li>
    );
  });

  return <ul style={{ listStyle: 'none', paddingLeft: 0 }}>{lis}</ul>;
}

export default DraggableList;
