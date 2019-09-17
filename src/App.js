import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Homepage from './pages/Homepage.js';
import BudgetAdd from './pages/BudgetAdd.js';
import AddNewTemplate from './pages/AddNewTemplate.js';
import LineBudget from './pages/LineBudget.js';
import SelectTemplate from './pages/SelectTemplate.js';
import DownloadPdf from './pages/DownloadPdf';
import DownloadExls from './pages/DownloadExls';

function App() {
    return (
        <section>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Homepage} />
                    <Route path="/add_new_budget" component={BudgetAdd} />
                    <Route path="/select_template" component={SelectTemplate} />
                    <Route path="/add_new_template" component={AddNewTemplate} />
                    <Route path="/lineBudget" component={LineBudget} />
                    <Route path="/download_pdf" component={DownloadPdf} />
                    <Route path="/download_exls" component={DownloadExls} />
                </Switch>
            </BrowserRouter>
        </section>
    );
}

export default App;
