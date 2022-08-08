import React from 'react';

function CustomDropData() {
  const img = new Image();
  img.src = 'https://picsum.photos/20';

  const handleDragStart = event => {
    const types = event.dataTransfer.types;
    console.log('types: ', types);
    event.dataTransfer.setData('text', '13208033621');
    event.dataTransfer.setDragImage(img, 20, 20);
  };

  const handleDrop = event => {
    const data = event.dataTransfer.getData('text');
    console.log('data: ', data);
    // this.select();
    console.log(event.target);
    event.target.value = data;
    event.target.select();
  };

  return (
    <div>
      <a draggable onDragStart={handleDragStart}>
        132-0803-3621
      </a>
      <input onDragOver={e => e.preventDefault()} onDrop={handleDrop} />
    </div>
  );
}

export default CustomDropData;
