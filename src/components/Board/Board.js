import * as React from 'react';
import styles from './Board.module.scss';
import Button from '../Button/Button';
import List from '../List/List';

class Board extends React.Component {
    state = {};

    componentDiMount() {}

    render() {
        const {items, index, label, onButtonClick} = this.props;
        return (
            <div className={styles.main}>
                <List items={items} index={index}/>
                <Button label={label} onClick={onButtonClick}/>
            </div>
        );
    }
}

export default Board;