import * as React from 'react';
import styles from './Board.module.scss';
import Button from '../Button/Button';
import List from '../List/List';
import Input from '../Input/Input';

class Board extends React.Component {
    state = {};

    componentDiMount() {}

    render() {
        
        const {object, onButtonClick, onAddClick, onChangeInput, onRemoveClick, index} = this.props;
        return (
            <div className={styles.board}>
                <p>{object.title}</p>
                <div className={styles.container_add}>
                    <Input input={object.input.add} onChange={(event) => onChangeInput(event, index, 'add')}/>
                    <Button label={'Add'} onClick={() => onAddClick(index)}/>
                </div>
                <div className={styles.main}>
                    <List items={object.items} index={object.index}/>
                    <Button label={object.label} onClick={onButtonClick}/>
                </div>
                <div>
                    <Input input={object.input.remove} onChange={(event) => onChangeInput(event, index, 'remove')}/>
                    <Button label={'Remove'} onClick={() => onRemoveClick(index)}/>
                </div>
            </div>
        );
    }
}

export default Board;