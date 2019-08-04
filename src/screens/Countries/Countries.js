import * as React from 'react';
import produce from 'immer/dist/immer';
import styles from './Countries.module.scss';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import WebServices from '../../WebServices/WebServices';
import { async } from 'q';
export default (class Countries extends React.PureComponent {

    state = {
        response: {},
        input: ''
    }

    componentDidMount() { }

    fetchData = async () => {
        try {
            const { input } = this.state;
            if (input != "") {
                const response = await WebServices.getDataFromFullUrl({
                    fullUrl :input
                });
                const nextState = produce(this.state, (draft) => {
                    draft.response = response;
                });
                this.setState(nextState);
            } else {
                console.log("especificar una url valida")
            }
        } catch (e) {
            console.log("TCL: Countries -> fetchData -> e", e);
        }
    }

    onChangeInput = (e) => {
        const value = e.target.value;
        const nextState = produce(this.state, (draft) => {
            draft.input = value;
        })
        this.setState(nextState);
    }

    onClickSearch = (e) => {
        const { value } = this.state;
        if (value != "") {
            this.fetchData();
        }
    }

    render() {
        const { input } = this.state;
        return (
            <div className={styles.main}>
                <div className={styles.busqueda}>
                    <Input input={input} onChange={this.onChangeInput} />
                    <Button label={'Go'} type={'search'} onClick={this.onClickSearch} />
                </div>
                <div className={styles.card}>
                    Some information about the Country
                </div>
            </div>
        );
    }
})