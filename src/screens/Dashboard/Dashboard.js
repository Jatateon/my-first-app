import * as React from 'react';
import styles from './Dashboard.module.scss';
import WebServices from '../../WebServices/WebServices';
import produce from 'immer';

export default (class Dashboard extends React.PureComponent {
	state = {
        response: {},
        cities:[{name:"Cairns", id:2172797},{name:"oaxaca",id:3522509},{name:"Tlaxiaco",id:3517285}],
        selectedCity:'',
        city:{}
	};

	componentDidMount() {
		this.fetchWeatherCity();
    }
    
    fetchGOT = async () => {
        try {
            const character = '583';

			const response = await WebServices.getCharacter({
				character
            });

            const nextState = produce(this.state, (draft) => {
                draft.response = response;
            })

            this.setState(nextState);
        } catch(e) {
			console.log('TCL: fetchData -> e', e);
        }
    }

	fetchWeatherCity = async (cityId) => {
		try {
            if(cityId != ''){
                
                const responseCity = await WebServices.getWheaterByCityId({
                    city:cityId
                });

                console.log("TCL: Dashboard -> fetchWeatherCity -> responseCity", responseCity)
                
                const nextState = produce(this.state, (draft) => {
                    draft.city = responseCity;
                    draft.selectedCity = cityId;
                })

                this.setState(nextState);
            } else {
                console.log("especificar un id de ciudad");
            }
		} catch (e) {
			console.log('TCL: fetchData -> e', e);
		}
    };
    
    changeCity = (e) => {
        this.fetchWeatherCity(e.target.value);
    }

	render() {
        const { cities, city, selectedCity} = this.state;
        
        return ( 
            <div className={styles.main}>
                <select onChange={this.changeCity} value={selectedCity}>
                    {cities.map((item, idx) => (
                        <option key={idx.toString()} value={item.id}>{item.name}</option>
                    ))}    
                </select>
                {city && 
                city.name && (
                    <p>{city.name}</p>
                )}
                
                {city && 
                city.name &&
                city.weather && (
                    <div>
                        <strong>Description</strong>
                        {city.weather.map((item, idx) => (
                            <p key={idx.toString()}>
                            <img key={idx.toString()}
                        src={"https://openweathermap.org/img/wn/"+item.icon+"@2x.png"} 
                        alt={city.name + ", " + city.country}
                        width="64" height="64"></img>
                            {item.description}</p>
                        ))}
                    </div>
                )}

                {city &&
                city.main && (
                    <div>
                        <div>
                            <strong>Temp: </strong>
                            <p>{city.main.temp}</p>
                            <p>
                            <strong>Min: </strong>
                            {city.main.temp_min}
                            <strong> - Max: </strong>
                            {city.main.temp_max}
                            </p>
                        </div>
                        <div>
                            <strong>Pressure: </strong>
                            <p>{city.main.pressure}</p>
                        </div>
                        <div>
                            <strong>Humidity: </strong>
                            <p>{city.main.humidity}</p>
                        </div>
                    </div>
                )}
                
            </div>
        );
	}
});
