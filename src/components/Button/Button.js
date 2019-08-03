import * as React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';
import { IconPlus, IconXMark, IconForward, IconRemove } from '../../Resources/svg/Icons';

export default class Button extends React.Component {
    static propTypes = {
        onClick : PropTypes.func.isRequired, 
        label : PropTypes.string
    };
    selectIcon = (type) => {
        switch (type) {
            case 'plus':
                return <IconPlus className={styles.icon}/>
            case 'forward':
                return <IconForward className={styles.icon}/>
            case 'remove':
                return <IconRemove className={styles.icon}/>
            case 'delete':
            default:
                return <IconXMark className={styles.icon} />
        }
    };
    render() {
        const { onClick, type, className}  = this.props;
        return (
            <div className={styles.main}>
                <button onClick={onClick} className={styles.button + ' ' + className}>
                    {this.selectIcon(type)}
                </button>
            </div>
        );
    };
}