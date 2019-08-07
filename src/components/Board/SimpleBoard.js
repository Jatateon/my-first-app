import * as React from 'react';
import styles from './Board.module.scss';
import Button from '../Button/Button';
import List from '../List/List';

class SimpleBoard extends React.Component {
    state = {};

    componentDiMount() {}

    onRemoveItem = (index, idx) => {
        const {onRemoveItem} = this.props;        
        onRemoveItem(index, idx);
    };

    render() {
        const {object, index, onRemoveBoardClick} = this.props;
        return (
            <div  className={styles.board}>
                <div className={styles.group}>
                    <p className={styles.title}>{object.title}</p>
                    <Button className={styles.button_close} type={'remove'} onClick={() => onRemoveBoardClick(index)} />
                </div>
                <div className={styles.container}>
                    <div className={styles.main}>
                        <List items={object.items} index={object.index} onRemoveItem={(idx) => this.onRemoveItem(index,idx)} />
                    </div>
                </div>
            </div>
        );
    }
}

export default SimpleBoard;