import React from 'react'

function Display2 (props){

    return(
        <div className="Display">    
            <form onSubmit={props.handleSubmit}>
                <div>
                <label htmlFor="answer">{JSON.stringify(props.question)}</label>
                <input
                    type="text"
                    name="answer"
                    value={props.eventValue}
                    onChange={props.handleChange} />
                </div>
                <button>Submit</button>
            </form>
            <div>
                Question Value: {JSON.stringify(props.value)}
            </div>
            {JSON.stringify(props.answer)}
        </div>
    )
}

export default Display2