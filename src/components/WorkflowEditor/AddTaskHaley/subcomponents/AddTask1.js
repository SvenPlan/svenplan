import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class AddTask1 extends Component {
    state = {
        addingNewRiskArea: false,
        titleInput: '',
        riskareas: [],
    }

    componentDidMount =()=> {
        this.props.dispatch({ type: 'FETCH_RISK_TYPES', payload: 1 });
    }

    nextStep = () => {
        this.props.dispatch({ type: 'SET_TASK_TITLE', payload: this.state.titleInput });
        this.props.dispatch({ type: 'SET_TASK_RISKAREAS', payload: this.state.riskareas });
        // this.props.history.push('/add-task-haley/2')
    }

    goBack = () => {
        this.props.history.push('/add-task-haley')
    }

    handleTitleInput =(event)=> {
        this.setState({
            titleInput: event.target.value,
        })
    }
    
    handleRiskareas = (event) => {
        let tagArray = this.state.riskareas;
        if (tagArray.includes(event.target.value)) {
            //if in tagArray, take it out
            let indexToSpliceOut = tagArray.indexOf(event.target.value);
            tagArray.splice(indexToSpliceOut, 1);
            this.setState({
                riskareas: tagArray
            })
        }
        else {
            //if not in tagArray, add it
            this.setState({
                riskareas: [...this.state.riskareas, event.target.value]
            })
        }
    }

    render() {
        return (
        <>
            <p>Next, enter some basic details about the task:</p>
                <div>
                    <label htmlFor="titleInput">
                        Title:<input type="text" id="titleInput" value={this.props.task.taskInProgress.title} onChange={this.handleTitleInput}/>
                    </label>
                </div>
                <div>
                    <p>Risk Area (select all that apply):</p>
                    {this.props.task.taskInProgress.riskareaOptions&&
                        <>
                        {this.props.task.taskInProgress.riskareaOptions.map((riskarea)=>
                            <div>
                                <input type="checkbox" id="check-text" value={riskarea} onChange={this.handleRiskareas}/>
                                <label htmlFor="check-text">{riskarea}</label>
                            </div>
                        )}
                        </>
                    }

                    <input type="checkbox" id="check-text" value="text" />
                        <label htmlFor="check-text">New Risk Area</label>
                    
                </div>
            <br/>
            <button onClick={this.goBack}>Go Back A Step</button>
            <button onClick={this.nextStep}>next step {this.state.phaseId}</button>
        </>
    );
        }
}

const putReduxStateOnProps = (reduxState) => ({
    user: reduxState.user,
    task: reduxState.task
});

export default connect(putReduxStateOnProps)(AddTask1);