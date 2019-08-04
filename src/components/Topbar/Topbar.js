import * as React from 'react';
import {Link} from 'react-router-dom';
import styles from './Topbar.module.scss';

export default (class Topbar extends React.PureComponent {
    state = {};

    componentDidMount() {};

    render () {
        return (
            <div className={styles.main}>
                <ul className={styles.list}>
                    <Link className={styles.item} to={'/examen'}>
                        <li className={styles.item}>Examen</li>
                    </Link>
                    <Link className={styles.item} to={'/tableros'}>
                        <li className={styles.item}>Inicio</li>
                    </Link>
                    <Link className={styles.item} to={'/Weather'}>
                        <li className={styles.item}>Weather</li>
                        </Link>
                    <Link className={styles.item} to={'/reporte'}>
                        <li className={styles.item}>Reporte</li>
                    </Link>
                    <Link className={styles.item} to={'/resumen'}>
                        <li className={styles.item}>Resumen</li>
                    </Link>
                    <Link className={styles.item} to={'/Countries'}>
                        <li className={styles.item}>Countries</li>
                    </Link>
                </ul>
            </div>
        );
    };
});