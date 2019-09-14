import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Axios from 'axios';
import { Redirect } from 'react-router';
import swal from 'sweetalert';


class Template extends Component {
    constructor(props) {
        super(props);
        this.state = {
            template:[],
            updateTemplateStatus:false,
        }
    }
    updateBudgettemplate = () => {
        let dataPayload = { fk_template_id:this.state.template.id };
        Axios.patch('https://betasite.online/laravelAPI/api/budget/'+this.props.budgetID,dataPayload)
        .then((response) => {
            if(response.data.status) {
                this.setState({ updateTemplateStatus:true });
                swal("Success",response.data.message,"success");
            } else {
                swal("Oops...",response.data.message, "error")
            }
        });
    }
    componentDidMount = () => {
        this.setState({
            template:this.props.props,
        });
    }
    render() {
        if( this.state.updateTemplateStatus ){
            return <Redirect to='/lineBudget' />;
        }
        return (
            <div className="card">
                <div className="card-header bg-primary text-center p-3 ">
                    <h4 className="mb-0 text-white">{this.state.template.name}</h4>
                </div>
                <div className="card-body text-center" style={{background: this.state.template.color}}>
                    <h1 className="mb-1" style={{color: "black"}}>{this.state.template.budget_count} Budget</h1>
                </div>
                <div className="card-body border-top">
                    <ul className="list-unstyled bullet-check font-14">
                        <li>{this.state.template.content}</li>
                    </ul>
                    <Button onClick={this.updateBudgettemplate} variant="secondary" block size="lg">
                        Get started
                    </Button>
                </div>
            </div>
        );
    }
}

export default Template;