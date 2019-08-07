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
		],
		headers: [
			{
				name: 'X',
				value: 'x',
				type: 'text'
			},
			{
				name: 'Y1',
				value: 'y1',
				type: 'number'
			},
			{
				name: 'Y2',
				value: 'y2',
				type: 'number'
			}
		],
		data: [
			{
				x: '02 oct',
				y1: 5,
				y2: 27
			},
			{
				x: '04 oct',
				y1: 7,
				y2: 5
			}
		]
	};

	updateData = () => {
		const { boards } = this.state;
		const datos = [];

		const nextState = produce(this.state, (draft) => {
			if (boards[0].items && boards[1].items && boards[2].items &&
                boards[0].items.length > 0 && boards[1].items.length > 0 && boards[2].items.length > 0) {
				boards[0].items.map((items, key) => {
					const temp = {};
					if (boards[1].items.length > key && boards[2].items.length > key) {
						temp.x = items;
						temp.y1 = boards[1].items[key];
						temp.y2 = boards[2].items[key];
						datos.push(temp);
					}
				});
				draft.data = datos;
			}
		});
		this.setState(nextState);
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
		if (this.state[input] != '') {
			const nextState = produce(this.state, (draft) => {
				switch (e) {
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
			console.log('TCL: tarea -> onClickPlus -> nextState', nextState);
		} else {
			console.log('Ingrese datos validos: ' + input);
		}
	};

	render() {
		const { input_x, input_y1, input_y2, boards, headers, data } = this.state;
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
						return <SimpleBoard key={i.toString()} object={board} index={i} />;
					})}
				</div>
				<div className={styles.graficos}>
					Tabla y Gráfica <Button type={"update"} label={"Update"} onClick = {this.updateData}/>
					<div>
						tabla
						<table className={styles.table}>
							<thead>
								<tr className={styles.header}>
									{headers.map((header, i) => {
										return <th className={styles.header_item}>{header.name}</th>;
									})}
								</tr>
							</thead>
							<tbody className={styles.body}>
								{data.map((item, i) => {
									return (
										<tr className={styles.row}>
											{headers.map((header, i) => {
												return <td className={styles.row_item}>{item[header.value]}</td>;
											})}
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
					<div>Grafica</div>
				</div>
			</div>
		);
	}
});
