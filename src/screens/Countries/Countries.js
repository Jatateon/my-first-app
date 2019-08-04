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
		input: 'https://restcountries.eu/rest/v2/name/mexico?fullText=true'
	};

	componentDidMount() {
		this.fetchData();
	}

	fetchData = async () => {
		try {
			const { input } = this.state;
			if (input != '') {
				const response = await WebServices.getDataFromFullUrl({
					fullUrl: input
				});
				console.log('TCL: Countries -> fetchData -> response', response);
				const nextState = produce(this.state, (draft) => {
					draft.response = response[0];
				});
				this.setState(nextState);
			} else {
				console.log('especificar una url valida');
			}
		} catch (e) {
			console.log('TCL: Countries -> fetchData -> e', e);
		}
	};

	onChangeInput = (e) => {
		const value = e.target.value;
		const nextState = produce(this.state, (draft) => {
			draft.input = value;
		});
		this.setState(nextState);
	};

	onClickSearch = (e) => {
		const { input } = this.state;
		console.log('TCL: Countries -> onClickSearch -> value', input);
		if (input != '') {
			this.fetchData();
		}
	};

	render() {
		const { input, response } = this.state;
		return (
			<div className={styles.main}>
				<div className={styles.busqueda}>
					<Input input={input} onChange={this.onChangeInput} estilos={styles.inputText}/>
					<Button label={'Go'} type={'search'} onClick={this.onClickSearch} />
                    {console.log("TCL: Countries -> render -> styles.inputText", styles.inputText)}
				</div>
				<div className={styles.card}>
					<div className={styles.info}>
						<ul className={styles.listInfo}>
							<li>
								<b>País:</b> {response && response.name}
							</li>
							<li>
								<b>Capital:</b> {response && response.capital}
							</li>
							<li>
								<b>Poblacion:</b> {response && response.population}
							</li>
							<li>
								<b>Idiomas:</b>
								{
                                    response &&
									response.languages &&
									response.languages.map((item, idx) => {
										return response.languages.length > 1 && idx !== response.languages.length - 1
											? ' ' + item.nativeName + ', '
											: ' ' + item.nativeName;
                                    })
                                }
							</li>
							<li>
								<b>Región:</b> {response && response.region}
							</li>
							<li>
                                <b>Monedas:</b> 
                                {
                                    response && 
                                    response.currencies &&
                                    response.currencies.map((item, idx) => {
                                        return response.currencies.length > 1 && idx !== response.currencies.length - 1
                                        ? ' ' + item.name + ', '
                                        : ' ' + item.name;
                                    })
                                }
							</li>
						</ul>
					</div>
					<div className={styles.flag}>
						{response && response.flag && <img className={styles.flag} src={response.flag} />}
					</div>
				</div>
			</div>
		);
	}
});
