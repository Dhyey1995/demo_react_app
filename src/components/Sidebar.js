import React from 'react';
import { NavLink } from 'react-router-dom';
class Sidebar extends React.Component {
    render() {
        return (
            <li>
                <div className="conntection-footer">
                    <NavLink to={'/'}>Dashboard</NavLink> 
                </div>
                <br />
                <div className="conntection-footer">
                    <NavLink to={'/add_new_budget'}>Add new budget</NavLink> 
                </div>
                <br />
                <div className="conntection-footer">
                    <NavLink to={'/select_template'}>Select Template</NavLink> 
                </div>
            </li>
        );
    }
}

export default Sidebar;