import * as React from 'react';
import styles from './Summary.module.scss';
import Table from '../../components/Table/Table';
import summaryData from '../../Resources/jsons/summaryData.json';
import summaryHeader from '../../Resources/jsons/summaryHeaders.json';
import {IconTable, IconChart } from '../../../src/Resources/svg/Icons';
import produce from 'immer/dist/immer';
import {BarChart, Bar, XAxis, YAxis,} from 'recharts';
import SimpleBarChart from '../../components/Charts/SimpleBarChart';
import StackedBarChart from '../../components/Charts/StackedBar';

export default (class Report extends React.PureComponent {
    state = {
        selected:{
            table:true,
            chart:false
        },
        data:[],
    };
    componentDidMount() {
        this.init();
    };

    init = () => {
        let data = [];
        summaryData.forEach((item, i)=>{
            data.push({
                name:item.name,
                online:item.summary[0].value,
                boxoffice:item.summary[1].value
            });
        });
        const nextState = produce(this.state, (draft) => {
            draft.data = data;
        });
        this.setState(nextState);
    }

    onHandleIcon = (item) => {
        const nextState = produce((this.state,(draft) => {
            draft.selected.table = false;
            draft.selected.chart = false;
            draft.selected[item] = true;
        }));

        this.setState(nextState);
    }
    render() {
        const {selected, data} = this.state;
        const headers = summaryHeader;

        return (
            <div className={styles.main}>
                <div className={styles.icons}>
                    <div className={styles.container_icon} onClick={() => this.onHandleIcon('table')}>
                        <IconTable className={selected.table ? styles.iconSelected: styles.icon}/>
                    </div>
                    <div className={styles.container_icon} onClick={()=>this.onHandleIcon('chart')}>
                        <IconChart className={selected.chart ? styles.iconSelected: styles.icon}/>
                    </div>
                </div>
                {selected.table && (
                    <div className={styles.table}>
                        {summaryData.map((element,i) => {
                            element.summary.forEach( (item) => {
                                item.total = item.sold + item.courtesies + item.promos;
                            });
                            return (
                                <div key={i}>
                                    <p className={styles.title} >{element.name}</p>
                                    <Table key={i} headers={headers} data={element.summary}/>
                                </div>
                            )
                        })}
                    </div>
                )}
                {selected.chart && (
                    <div>
                        <SimpleBarChart data={data} />
                        <StackedBarChart data={data} />
                    </div>
                )}
            </div>
        );
    };
});