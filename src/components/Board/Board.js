import * as React from 'react';
import styles from './Board.module.scss';
import Button from '../Button/Button';
import List from '../List/List';
import Input from '../Input/Input';

class Board extends React.Component {
    state = {};

    componentDiMount() {}

    onRemoveItem = (index, idx) => {
        const {onRemoveItem} = this.props;        
        onRemoveItem(index, idx);
    };

    render() {
        const {object, onButtonClick, onAddClick, onChangeInput, onRemoveClick, index, onRemoveBoardClick} = this.props;
        return (
            <div  className={styles.board}>
                <div className={styles.group}>
                    <p className={styles.title}>{object.title}</p>
                    <Button className={styles.button_close} type={'remove'} onClick={() => onRemoveBoardClick(index)} />
                </div>
                <div className={styles.container}>
                    <div className={styles.main}>
                        <List items={object.items} index={object.index} onRemoveItem={(idx) => this.onRemoveItem(index,idx)} />
                        <Button type={"forward"} onClick={onButtonClick}/>
                    </div>
                    <div className={styles.group}>
                        <div className={styles.container_input}>
                            <Input input={object.input.add} onChange={(event) => onChangeInput(event, index, 'add')}/>
                        </div>
                        <Button type={'plus'} className={"green"} onClick={() => onAddClick(index)}/>
                    </div>
                    <div className={styles.group}>
                        <div className={styles.container_input}>
                            <Input input={object.input.remove} onChange={(event) => onChangeInput(event, index, 'remove')}/>
                        </div>
                        <Button type={''} onClick={() => onRemoveClick(index)}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Board;