import React, { Component } from 'react';
import {connect} from 'react-redux';
import Swal from 'sweetalert2';
import './NewWorkflow.css'



class ExistingWorkflows extends Component {


    // collects all workflows from db
    componentDidMount=()=>{
        this.props.dispatch({ type: 'GET_TEAM_WORKFLOWS', payload: this.props.user.currentUser.team_id })
    }

    // user warning before deleting a workflow
    deleteWorkflow=(id)=> {
        Swal.fire({
            title: `Are you sure you want to delete this workflow?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
            if (result.value) {
                Swal.fire(
                'Deleted!',
                `Workflow has been deleted`,
                'success'
                );
                this.props.dispatch({type: 'DELETE_THIS_WORKFLOW', payload: {id: id, team: this.props.user.currentUser.team_id}})
            }
        })
    }

    // one of two places to publish a workflow
    publishWorkflow=(id)=> {
        Swal.fire({
            title: `Would you like to make this workflow available to subsribers?`,
            text: "Publishing a workflow allows an admin to give a subscriber access to it",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
            }).then((result) => {
            if (result.value) {
                Swal.fire(
                'Published!',
                `Workflow will now be available`,
                'success'
                );
                this.props.dispatch({type: 'PUBLISH_THIS_WORKFLOW', payload: {id: id, team: this.props.user.currentUser.team_id}})
            }
        })
    }

    // identifies workflow to be viewed and displays in new dom
    viewWorkflow=(id)=> {
        this.props.dispatch({type: 'GET_THIS_WORKFLOW', payload: {id: id}})
        this.props.history.push('workflows/edit')
    }

    render() {
        return (
            <>
                <h2>Existing Workflows:</h2>
                <div className="card-container">
    {/* suggest having two buttons, one that shows only if unpublished with an option to publish workflow */}
    {/* or better yet have this be displayed in two tables, on published and one not published with an option to publish */}
                    {this.props.reduxState.workflow.teamWorkflows &&
                        this.props.reduxState.workflow.teamWorkflows.map(flow => (
                            <div className="card" data-id={flow.id} key={flow.id}>
                                <div className="card-wf">{flow.name}</div>
                                <button className="btn-sml" onClick={()=>this.viewWorkflow(flow.id)}>View</button>
                                <button className="btn-sml-delete" onClick={()=>this.deleteWorkflow(flow.id)}>Delete</button>
                                {flow.published === false &&
                                    <button className="btn-sml publish" onClick={()=>this.publishWorkflow(flow.id)}>Publish</button>
                                }
                                <div className="sven">svenplan</div>
                            </div>
                        ))
                    }    
                </div>
            </>
        );
    }
}


const mapStateToProps = reduxState => ({
    reduxState,
    user: reduxState.user
});
export default connect(mapStateToProps)(ExistingWorkflows);
