import * as React from 'react';
import styles from './List.module.scss';
import {IconXMark} from '../../resources/svg/Icons';

class List extends React.Component {
    state = {};

    componentDidMount() {}

    onDeleteItem = (idx) => {
        const {onRemoveItem} = this.props;
        onRemoveItem(idx);
    };
    render() {
        const { items, index } = this.props;
        return (
            <div className={styles.main}>
                <ul className={styles.list}>
                {items.map((item, idx) => (
                    <li key={idx.toString()} className={index === idx ? styles.item_selected : styles.item}>
                        <p className={styles.item_name}>{item}</p>
                        <div onClick={() =>this.onDeleteItem(idx)}>
                            <IconXMark className={styles.icon}/>
                        </div>
                    </li>
                ))}
                </ul>
            </div>
        );
    }
}

export default List;