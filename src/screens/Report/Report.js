import * as React from 'react';
import styles from './Report.module.scss';
import Table from '../../components/Table/Table';
import cashoutData from '../../resources/jsons/cashoutData.json';
import cashoutHeader from '../../resources/jsons/cashoutHeader.json';

export default (class Report extends React.PureComponent {
    state = {};
    componentDidMount() {};
    render() {
        const headers = cashoutHeader;
        const data = cashoutData[0].cashout;
        return (
            <div className={styles.main}>
                <Table headers={headers} data={data}/>
            </div>
        );
    };
});