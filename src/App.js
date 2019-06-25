import React from 'react';
import styles from './App.module.scss';
import Board from './components/Board/Board';
import produce from 'immer/dist/immer';

class App extends React.PureComponent {
    state = {
        boards:[
            {
                title: 'girls',
                items: ['Monica','Julieta','María','Antonieta'],
                index: 0,
                label: 'Siguente',
                input: {
                    add:'Maria',
                    remove:''
                },
            },
            {
                title: 'food',
                items: ['mole','chiles rellenos','pizza','spaguetti','memelas'],
                index: 0,
                label: 'Siguente',
                input:{
                    add:'Chilaquiles',
                    remove:''
                },
            },
            
        ]
    };

    onHandleButton = (key) => {
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

    onInputChange = (event, index, type) => {
        const value = event.target.value
        const nextState = produce( this.state, (draft) => {
            draft.boards[index].input[type] = value;
        });
        this.setState(nextState);
    };

    onAddButtonClick = (index) => {
        const nextState = produce(this.state, (draft)=>{
            if(draft.boards[index].input.add.length > 0) {
                draft.boards[index].items = draft.boards[index].items.concat([draft.boards[index].input.add]);
            } 
            draft.boards[index].input.add = '';
        });
        this.setState(nextState);
    };

    onRemoveButtonClick = (index) => {
        const nextState = produce(this.state, (draft) => {
            if(draft.boards[index].input.remove.length > 0 ){
                let i = draft.boards[index].input.remove.value;
                draft.boards[index].items.splice(i,1);
                draft.boards[index].input.remove = '';
            }
        });
        this.setState(nextState);
    };

    onRemoveItem = (index) => {
        console.log("TCL: App -> onRemoveItem -> index", index);
    };

    render() {
        const {boards} = this.state;
        return(
            <div className={styles.container_boards}>
                <p className={styles.tittle}>¡Bienvenidos al curso de programación de cómputo movil!</p>
                <div className={styles.container_boards}>
                    {boards.map((board,i) => {                            
                        return (
                        <Board 
                            key={i.toString()}
                            object={board}
                            index={i}
                            onButtonClick={()=> this.onHandleButton(i)} 
                            onChangeInput={this.onInputChange}
                            onAddClick={this.onAddButtonClick}
                            onRemoveClick={this.onRemoveButtonClick}
                            onRemoveItem={this.onRemoveItem(i)}
                        />)
                    })}
                </div>
                <div>
                    <p className={styles.result}>Los elementos seleccionados son: 
                        {boards.map((board, i) => {
                            return (
                                <p key={i.toString()}>{board.items[board.index]}</p>
                            )
                        })}
                    </p>
                </div>
            </div>
        );
    }

}

export default App;
