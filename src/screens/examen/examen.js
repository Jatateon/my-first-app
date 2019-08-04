import * as React from 'react';
import produce from 'immer/dist/immer';
import styles from './examen.module.scss';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import WebServices from '../../WebServices/WebServices';
import WeatherChart from '../../components/Charts/WeatherChart';


export default (class examen extends React.PureComponent {
	state = {
		response: {},
        input: '',
        headers:[
            {
                "name": "CITY",
                "value": "name",
                "footer":"",
                "type":"text"
            },
            {
                "name": "TEMP",
                "value": "temp",
                "footer":"",
                "type":"number"
            },
            {
                "name": "HUMIDITY",
                "value": "humidity",
                "footer":"",
                "type":"number"
            },
            {
                "name": "PRESSURE",
                "value": "pressure",
                "footer":"",
                "type":"number"
            },
        ],
        data:[
            {
                "name":'Oaxaca',
                "temp":21,
                "humidity":29,
                "pressure":23
            }
        ]
	};
	// console.log(urlWeather + '?id=' + city + '&APPID=f4b7aed55eedf34fc3e857d2707e9af1&units=metric');
	// const urlWeather = 'http://api.openweathermap.org/data/2.5/weather/';

	fetchData = async () => {
		try {
			const { input } = this.state;
			if (input != '') {
				const response = await WebServices.getDataFromFullUrl({
					fullUrl: input
				});
				console.log('TCL: Countries -> fetchData -> response', response);
				const nextState = produce(this.state, (draft) => {
					draft.response = response;
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

	onClickList = (tipo) => {
		const url = 'https://api.openweathermap.org/data/2.5/weather/';
		const apikey = '&APPID=f4b7aed55eedf34fc3e857d2707e9af1&units=metric';
		const fullUrl = [
			{ tipo:'ByCityName', url: url + '?q=London' + apikey },
			{ tipo:'ByCityId', url: url + '?id=3522509' + apikey },
			{ tipo:'ByCoordinates', url: url + '?lat=35&lon=139' +apikey }
		];

		fullUrl.map((item, i) => {
			if (item.tipo == tipo) {
                
                const nextState = produce(this.state, (draft)=>{
                    draft.input = item.url;
                    console.log("TCL: examen -> nextState -> item.url", item.url)
                })
                this.setState(nextState);
			}
		});
    };
    
    addRow = () => {
        const {response} = this.state;
        // {
        //     "name":'Oaxaca',
        //     "temp":21,
        //     "humidity":29,
        //     "pressure":23
        // }
        const nextState = produce(this.state, (draft)=> {
            draft.data.push({
                name:response.name,
                temp:response.main.temp,
                humidity:response.main.humidity,
                pressure:response.main.pressure,
            });
        })

        this.setState(nextState);
    }

	render() {
		const { input, response, headers, data } = this.state;
		return (
			<div className={styles.main}>
				<div className={styles.busqueda}>
					<Input input={input} onChange={this.onChangeInput} estilos={styles.inputText} />
					<Button label={'Go'} type={'search'} onClick={this.onClickSearch} />
                    <Button label={'New'} type={'plus'} onClick={this.addRow}/>
				</div>
				<div className={styles.TipoUrl}>
					<ul>
						<li onClick={() => this.onClickList('ByCityName')}>ByCityName</li>
						<li onClick={() => this.onClickList('ByCityId')}>ByCityId</li>
						<li onClick={() => this.onClickList('ByCoordinates')}>ByCoordinates</li>
					</ul>
				</div>
				<div className={styles.card}>
					<ul>
						<li><b>Name: </b> {response && response.name }</li>
						<li><b>Temperatura:</b> {response && response.main && response.main.temp}</li>
						<li><b>Humedad:</b> {response && response.main && response.main.humidity}</li>
						<li><b>Presion:</b> {response && response.main && response.main.pressure}</li>
					</ul>
				</div>
                <div className={styles.TablaDatos}>
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
                <div className={styles.GraficaDatos}>
                    <WeatherChart data={data} />
                </div>
			</div>
		);
	}
});
