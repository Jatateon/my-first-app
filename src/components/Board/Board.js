import * as React from 'react';
import styles from './Board.module.scss';
import Button from '../Button/Button';
import List from '../List/List';
import Input from '../Input/Input';
import {IconPlus} from '../../Resources/svg/Icons';

class Board extends React.Component {
    state = {};

    componentDiMount() {}

    onRemoveItem = (index) => {
        console.log("TCL: Board -> onRemoveItem -> index", index);

    };

    render() {
        const {object, onButtonClick, onAddClick, onChangeInput, onRemoveClick, index, onRemoveItem} = this.props;
        return (
            <div  className={styles.board}>
                <p className={styles.title}>{object.title}</p>
                <div className={styles.container}>
                    <div className={styles.main}>
                        <List items={object.items} index={object.index} onRemoveItem={() => this.onRemoveItem()} />
                        <Button type={"forward"} onClick={onButtonClick}/>
                    </div>
                    <div className={styles.group}>
                        <div className={styles.container_input}>
                            <Input input={object.input.add} onChange={(event) => onChangeInput(event, index, 'add')}/>
                        </div>
                        <Button type={'plus'} onClick={() => onAddClick(index)}/>
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