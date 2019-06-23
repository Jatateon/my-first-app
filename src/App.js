import React from 'react';
import styles from './App.module.scss';
import Board from './components/Board/Board';
import produce from 'immer/dist/immer';

class App extends React.PureComponent {
    state = {
        boards:[
            {
                name: 'girls',
                items: ['Monica','Julieta','María','Antonieta'],
                index: 0,
            },
            {
                name: 'food',
                items: ['mole','chiles rellenos','pizza','spaguetti','memelas'],
                index: 0,
            }
        ]
    };

    onHandleButton = (object, key) => {
        const nextState = produce(this.state, (draft) => {
            if(draft.boards[key].items.length > draft.boards[key].index + 1) {
                draft.boards[key].index = draft.boards[key].index + 1;
            } 
            else {
                draft.boards[key].index = 0;
            } 
        });
        this.setState(nextState);
    };

    render() {
        const {boards} = this.state;
        return(
            <div>
                <p className={styles.tittle}>¡Bienvenidos al curso de programación de cómputo movil!</p>
                    <div className={styles.container_boards}>
                        {boards.map((board,i) => {                            
                            return (
                            <Board 
                                key={i} 
                                items={board.items} 
                                index={board.index} 
                                label={'Siguiente'} 
                                onButtonClick={()=> this.onHandleButton(board,i)} 
                            />)
                        })}
                    </div>
                <p className={styles.result}>Los elementos seleccionados son: 
                        {boards.map((board) => {
                            return (
                               <p>{board.items[board.index]}</p>
                            )
                        })}
                </p>
            </div>
        );
    }

}

export default App;
