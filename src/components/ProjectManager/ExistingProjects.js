import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

class ExistingProjects extends Component {
    // subscriber-side code. When 'Existing Projects' is clicked, page loads table of project, 
    // status and option for subscriber to continue or archive project

    componentDidMount(){
        this.props.dispatch({type: 'FETCH_EXISTING_PROJECTS', payload: this.props.reduxState.user.currentUser.team_id})
    }

    continueProject(id,name){
        //upon click, fetch details for that project and reroute to projects/id
        this.props.dispatch({ type: 'SET_PROJECT_ID', payload:{id:id, name:name }})
        this.props.history.push(`/projects/${id}`);
    }

    projectData(id, name) {
        //upon click, fetch details for that project and reroute to projects/id
        this.props.dispatch({ type: 'SET_PROJECT_ID', payload: { id: id, name: name } })
        this.props.dispatch({ type: 'FETCH_PROJECT_DATA', payload: id})
        this.props.history.push(`/projects/data/${id}`);
    }

    render(){
        return (
            <>
                <h2>Your Current Projects:</h2>
                {/* table below displays all projects belonging to one user */}
                <table className="tbl-sml">
                    <thead>
                        <tr>
                            <th>Project Name</th>
                            <th>Status</th>
                            <th></th>
                            <th>Project Data</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.props.reduxState.subscriber.existingProjects.map(project =>
                        <tr key={project.id}>
                            <td>{project.name}</td>
                            <td>In Progress</td>
                            <td>
                                {/* on btn click, user is routed to ProjectDetails component */}
                                <button className="btn-sml" onClick={() => this.continueProject(project.id, project.name)}>Continue</button>
                                {/* <button className="nav-item" onClick={()=>this.archiveProject(project.id)}>Archive</button> */}
                            </td>
                            <td><button className="btn-sml" onClick={() => this.projectData(project.id, project.name)}>View Data</button></td>
                        </tr>)}
                    </tbody>
                </table>
            </>
        );
    }
}

const mapStateToProps = reduxState => ({
reduxState
});

export default connect(mapStateToProps)(withRouter(ExistingProjects));
