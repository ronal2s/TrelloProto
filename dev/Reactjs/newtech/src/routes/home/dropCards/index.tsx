
import React from 'react'
import Container from './container'
// @ts-ignore
import { DndProvider } from 'react-dnd'
// @ts-ignore
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
    return (
        <div className="App">
            <DndProvider backend={HTML5Backend}>
                <Container />
            </DndProvider>
        </div>
    )
}
export default App;