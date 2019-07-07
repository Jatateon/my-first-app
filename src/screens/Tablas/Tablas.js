import * as React from 'react';
import styles from './Tablas.module.scss';
import cashoutData from '../../resources/jsons/cashoutData.json';
import cashoutHeader from '../../resources/jsons/cashoutHeader.json';

export default (class Tabla extends React.PureComponent {
    state = {};
    componentDidMount() {};
    render() {
        const headers = cashoutHeader;
        const data = cashoutData[0].cashout;
        return (
            <div className={styles.main}>
                <table className={styles.table}>
                    <thead >
                        <tr className={styles.header}>
                            {headers.map((header, i) => {
                                return (
                                    <th className={styles.header_item}>{header.name}</th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody className={styles.body}>
                            {data.map((item, i) => {
                                return (
                                    <tr className={styles.row}>
                                        {headers.map((header, i) => {
                                            return (
                                                <td className={styles.row_item}>{item[header.value]}</td>
                                            )
                                        })}
                                    </tr>   

                                );
                            })}
                    </tbody>
                </table>
            </div>
        );
    };
});