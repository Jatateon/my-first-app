import * as React from 'react';
import { Calendar } from 'react-date-range';
import produce from 'immer/dist/immer';
import Input from '../../components/Input/Input';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import format from 'date-fns/format';

import styles from './tarea.module.scss';
import { default as es } from 'react-date-range/dist/locale/es';
import Button from '../../components/Button/Button';
import SimpleBoard from '../../components/Board/SimpleBoard';

export default (class tarea extends React.PureComponent {
	state = {
		input_x: '',
		input_y1: '',
		input_y2: '',
		boards: [
			{
				title: 'X-AXIS',
				items: [],
				index: 0
			},
			{
				title: 'Y1-AXIS',
				items: [],
				index: 0
			},
			{
				title: 'Y2-AXIS',
				items: [],
				index: 0
			}
		]
	};

	handleSelect = (date) => {
		const nextState = produce(this.state, (draft) => {
			draft.input_x = format(date, 'DD MMM', { locale: es });
		});

		this.setState(nextState);
	};

	onChangeText = (event, e) => {
		const input = [ 'input' + e ];
		const nextState = produce(this.state, (draft) => {
			draft[input] = event.target.value;
		});
		this.setState(nextState);
	};

	onClickPlus = (e) => {
        const input = [ 'input' + e ];
        if(this.state[input] != "") {
            const nextState = produce(this.state, (draft) => {
                switch(e){
                    case '_x':
                        draft.boards[0].items.push(draft[input]);
                        draft[input] = '';
                        break;
                    case '_y1':
                        draft.boards[1].items.push(draft[input]);
                        draft[input] = '';
                        break;
                    case '_y2':
                        draft.boards[2].items.push(draft[input]);
                        draft[input] = '';
                        break;
                }
            });
            this.setState(nextState);
            console.log("TCL: tarea -> onClickPlus -> nextState", nextState)
        } else{
            console.log("Ingrese datos validos: " + input)
        }
	};

	render() {
		const { input_x, input_y1, input_y2, boards } = this.state;
		return (
			<div className={styles.main}>
				<div className={styles.captura}>
					captura
					<div className={styles.inputs}>
						<div className={styles.inputsItems}>
							<label>X</label>
							<Input input={input_x} readOnly={'readonly'} />
							<Button type={'plus'} onClick={() => this.onClickPlus('_x')} />
						</div>
						<div className={styles.inputsItems}>
							<label>Y1</label>
							<Input input={input_y1} onChange={(event) => this.onChangeText(event, '_y1')} />
							<Button type={'plus'} onClick={() => this.onClickPlus('_y1')} />
						</div>
						<div className={styles.inputsItems}>
							<label>Y2</label>
							<Input input={input_y2} onChange={(event) => this.onChangeText(event, '_y2')} />
							<Button type={'plus'} onClick={() => this.onClickPlus('_y2')} />
						</div>
					</div>
					<div className={styles.calendar}>
						<Calendar date={new Date()} onChange={this.handleSelect} locale={es} />
					</div>
				</div>
				<div className={styles.boards}>
					Boards
					{boards.map((board, i) => {
                        return (
                            <SimpleBoard key={i.toString()} object={board} index={i} />
                        );
					})}
				</div>
				<div className={styles.table}>
					Tabla y Gráfica
					<div>tabla</div>
					<div>Grafica</div>
				</div>
			</div>
		);
	}
});
