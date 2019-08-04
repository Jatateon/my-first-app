import React from 'react';
import styles from './App.module.scss';
import {Route, Redirect, withRouter, Switch} from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import Topbar from './components/Topbar/Topbar';
import Tableros from './screens/Tableros/Tableros';
import Report from './screens/Report/Report';
import Summary from './screens/Summary/Summary';
import Dashboard from './screens/Dashboard/Dashboard';
import Countries from './screens/Countries/Countries';
import examen from './screens/examen/examen';

export default withRouter (
    class App extends React.PureComponent {
        render() {
            return (
                <div>
                    <Topbar />
                    <Switch>
                        <RouteWithTitle exact title="examen" path="/examen" component={examen}/>
                        <RouteWithTitle exact title="Weather" path="/Weather" component={Dashboard}/>
                        <RouteWithTitle exact title="Tableros" path="/tableros" component={Tableros}/>
                        <RouteWithTitle exact title="Reporte" path="/reporte" component={Report} />
                        <RouteWithTitle exact title="Resumen" path="/resumen" component={Summary} />
                        <RouteWithTitle exact title="Countries" path="/Countries" component={Countries} />
                        <Redirect to={'/inicio'} />
                    </Switch>
                </div>
            );
        };
    }
);

export const RouteWithTitle = ({title, render, component: Comp, ...props}) => (
    <Route {...props} render={(p) => <DocumentTitle title={title}>{render ? render(p): <Comp {...p}/>}</DocumentTitle>}/>
);
