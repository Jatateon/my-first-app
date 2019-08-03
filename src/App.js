import React from 'react';
import styles from './App.module.scss';
import {Route, Redirect, withRouter, Switch} from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import Topbar from './components/Topbar/Topbar';
import Tableros from './screens/Tableros/Tableros';
import Report from './screens/Report/Report';
import Summary from './screens/Summary/Summary';
import Dashboard from './screens/Dashboard/Dashboard';

export default withRouter (
    class App extends React.PureComponent {
        render() {
            return (
                <div>
                    <Topbar />
                    <Switch>
                        <RouteWithTitle exact title="Api" path="/dashboard" component={Dashboard}/>
                        <RouteWithTitle exact title="Tableros" path="/tableros" component={Tableros}/>
                        <RouteWithTitle exact title="Reporte" path="/reporte" component={Report} />
                        <RouteWithTitle exact title="Resumen" path="/resumen" component={Summary} />
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
