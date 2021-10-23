import React, { useState, useCallback } from 'react';
import ReactFlow, { removeElements, addEdge, ReactFlowProvider } from 'react-flow-renderer';
import { BiCopy } from "react-icons/bi";
import './save.css';
const initialElements = [
  {
    id: '1',
    type: 'input',
    sourcePosition: 'right',
    
    data: { label: 'Input Node' },
    position: { x: 250, y: 25 },
  },
  {
    id: '2',
    sourcePosition: 'right',
    targetPosition: 'left',
    data: { label: 'Another Node' },
    position: { x: 100, y: 125 },
  },
];

export default function Basic () {
  const [elements, setElements] = useState(initialElements);
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) => setElements((els) => addEdge(params, els));

  const getNodeId = () => `randomnode_${+new Date()}`;

  const onAdd = useCallback(() => {
    console.log('boton oprimido')
    const newNode = {
      id: getNodeId(),
      data: { label: 'Added node' },
      position: {
        x: Math.random() * window.innerWidth - 100,
        y: Math.random() * window.innerHeight,
      },
    };
    setElements((els) => els.concat(newNode));
  }, [setElements]);

  return (
    <ReactFlowProvider>
      <ReactFlow
        elements={elements}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        deleteKeyCode={46} /* 'delete'-key */
      >
      <div className='save__controls'>
        <button onClick={onAdd}><BiCopy/></button>
      </div>
      </ReactFlow>
    </ReactFlowProvider>
  );
};