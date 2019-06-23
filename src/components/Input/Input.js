import * as React from 'react';
import styles from './Input.module.scss';

export default class Input extends React.Component {
    render() {
        const {input, onChange} = this.props;

        return (
            <div className={styles.main}>
                <input className={styles.default} value={input} onChange={onChange} />
            </div>
        );
    };
}