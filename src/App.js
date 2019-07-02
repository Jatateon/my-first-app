import React from 'react';
import styles from './App.module.scss';
import Board from './components/Board/Board';
import Input from './components/Input/Input';
import Button from './components/Button/Button';
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
            
        ],
        input:''
    };
    
    onNameChange = (event) => {
        const value = event.target.value;
        const nextState = produce( this.state, (draft) => {
            draft.input = value;
        });
        this.setState(nextState);
    };
    
    onAddBoardClick = () => {
        const nextState = produce(this.state, (draft) => {
            if(draft.input.length > 0) {
                let board = {
                    title: draft.input,
                    items:[],
                    input: {
                        add:'',
                        remove:''
                    }
                };
                draft.boards.unshift(board);
                draft.input = '';
            }
        });
        this.setState(nextState);
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

    onRemoveBoardClick = (index) => {
        const nextState = produce(this.state, (draft) => {            
            draft.boards.splice(index,1);
            draft.input = '';
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
        const nextState = produce(this.state, draft => {
            let i = draft.boards[index].input.remove;
            draft.boards[index].items.splice(i,1);
        });
        this.setState(nextState);
    };

    onRemoveItem = (index, idx) => {
        const nextState = produce(this.state, (draft) => {
            draft.boards[index].items.splice(idx,1);
        });
        this.setState(nextState);
    };

    render() {
        const {boards, input} = this.state;
        return( 
            <div>
                <div>
                    <div className={styles.flex_hor}>
                        <p className={styles.tittle +  ' ' + styles.ajustable}>Mis tableros</p>
                        <div className={styles.elementos + ' ' + styles.rigth}>
                            <b>{boards.length} </b>Elemento{boards.length > 1 ? 's':''}
                        </div>
                    </div>
                    <div className={styles.flex_vert}>
                        <p className={styles.subtitle + ' ' + styles.left}>Nombre del tablero</p>
                        <div className={styles.group  + ' ' + styles.left}>
                            <div className={styles.container_input}>
                                <Input input={input} onChange={(event) => this.onNameChange(event)}/>
                            </div>
                            <Button className={styles.button_add} type={'plus'} onClick={this.onAddBoardClick}/>
                        </div>
                    </div>
                </div>
                <div className={styles.container_boards}>
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
                                onRemoveClick={()=>this.onRemoveButtonClick(i)}
                                onRemoveItem={this.onRemoveItem}
                                onRemoveBoardClick = {this.onRemoveBoardClick}
                            />)
                        })}
                    </div>                    
                </div>
            </div>
        );
    }

}

export default App;
