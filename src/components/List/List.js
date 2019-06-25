import * as React from 'react';
import styles from './List.module.scss';
import {IconXMark} from '../../Resources/svg/Icons';

class List extends React.Component {
    state = {};

    componentDidMount() {}

    onDeleteItem = (index) => {
        // console.log("TCL: List -> onDeleteItem -> index", index)
        const {onRemoveItem} = this.props;
        onRemoveItem(index);
    };
    render() {
        const { items, index } = this.props;
        return (
            <div className={styles.main}>
                <ul className={styles.list}>
                {items.map((item, i) => (
                    <li key={i.toString()} className={index === i ? styles.item_selected : styles.item}>
                        <p className={styles.item_name}>{item}</p>
                        <div onClick={this.onDeleteItem(i)}>
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