import * as React from 'react';
import styles from './Input.module.scss';

export default class Input extends React.Component {
	render() {
		const { input, onChange, estilos } = this.props;

		return (
			<div className={styles.main}>
				<input
					className={styles.default}
					value={input}
					onChange={onChange}
					style={estilos ? {estilos} : {}}
				/>
			</div>
		);
	}
}
