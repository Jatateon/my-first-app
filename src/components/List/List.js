import * as React from 'react';
import styles from './List.module.scss';

class List extends React.Component {
    state = {};

    componentDidMount() {}

    render() {
        const { items, index } = this.props;
        return (
            <div className={styles.main}>
                <ul className={styles.list}>
                {items.map((item, i) => (
                    <li key={i} className={index === i ? styles.item_selected : styles.item}>
                        {item}
                    </li>
                ))}
                </ul>
            </div>
        );
    }
}

export default List;