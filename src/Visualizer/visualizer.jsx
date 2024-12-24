import React from "react";
import './visualizer.css';

export default class SortingVisualizer extends React.Component{
    constructor(props){
        super(props);

        this.state = {array : [] ,} ;
    }

    componentDidMount() {
        this.resetArray() ;
    }

    // 10 and 600 are the min, max limit of values inside bars
    // 300 represents the number of bars 
    // TODO - modify to take user input for these

    resetArray() {
        const array = [];
        for (let i = 0 ; i < 250; i ++){
            array.push(randomIntInterval(10, 580));
        } 
        this.setState({array});
    }

    mergeSort() {}

    quickSort() {}

    bubbleSort() {}

    heapSort() {}

    render() {
        const {array} = this.state;

        return (
            <div className="arrayContainer">
                {array.map((value, idx) => (
                    <div 
                        className = "arrayBar" 
                        key = {idx}
                        style = {{height : `${value}px`}}>
                    </div>
                ))}
                <button onClick={() => this.resetArray()}>Generate New Array</button>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
                <button onClick={() => this.quickSort()}>Quick Sort</button>
                <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                <button onClick={() => this.heapSort()}>Heap Sort</button>
            </div>
        );

    }

}

function randomIntInterval(start, end){
    return Math.floor(Math.random() * (end - start + 1) + start);
}