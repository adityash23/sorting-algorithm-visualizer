import React from "react";
import './visualizer.css';
import * as algorithms from "../Algorithms/algorithms.js";

const barsTotal = 100; // 250 ; // total number of bars to display

export default class SortingVisualizer extends React.Component{
    constructor(props){
        super(props);

        this.state = {array : [] ,} ;
    }

    componentDidMount() {
        this.resetArray() ;
    }

    // 10 and 600 are the min, max limit of values inside bars
    // TODO - modify to take user input for these

    resetArray() {
        const array = [];
        for (let i = 0 ; i < barsTotal; i ++){
            array.push(randomIntInterval(10, 580));
        } 
        this.setState({array});
    }

    mergeSort() {
        const animations = algorithms.mergeSort(this.state.array);
        for (let i = 0; i < animations.length; i++){
            const arrayBars = document.getElementsByClassName('arrayBar');
            const isColorChange = i %3 !== 2;

            if (isColorChange){
                const [bar1, bar2] = animations[i]; // unwrap the bar indices to be moved
                const bar1Style = arrayBars[bar1].style;
                const bar2Style = arrayBars[bar2].style;
                const color = i % 3 === 0 ? 'red' : 'deepskyblue';
            
                setTimeout( () => {
                    bar1Style.backgroundColor = color;
                    bar2Style.backgroundColor = color;
                }, i * 10) ;
            }
            else {
                setTimeout( () => {
                    const [bar1, height] = animations[i];
                    const bar1Style = arrayBars[bar1].style;
                    bar1Style.height = `${height}px`;
                }, i * 10);
            }   
        }
    }   

    quickSort() {
        /*
        const qsArray = algorithms.quickSort(this.state.array);
        const defaultSort = this.state.array.sort((a,b) => a - b);

        console.log(arraysEqual(qsArray, defaultSort));
        */
    }

    bubbleSort() {
        const animations = algorithms.bubbleSort(this.state.array);
        for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('arrayBar');
        const isColorChange = i % 4 < 2;
    
        if (isColorChange) {
            const [bar1, bar2] = animations[i]; // unwrap the bar indices to be moved
            if (bar1 === -1 || bar2 === -1) continue; // skip dummy
            const barOneStyle = arrayBars[bar1].style;
            const barTwoStyle = arrayBars[bar2].style;
            const color = i % 4 === 0 ? 'red' : 'deepskyblue';
            setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
            }, i * 10);
        } else {
            const [barIndex, newHeight] = animations[i];
            if (barIndex === -1) continue; // skip dummy 
            const barStyle = arrayBars[barIndex].style;
            setTimeout(() => {
            barStyle.height = `${newHeight}px`;
            }, i * 10);
        }
        }
    }

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
                <button class = 'button' onClick={() => this.resetArray()}>Generate New Array</button>
                <button class = 'button' onClick={() => this.mergeSort()}>Merge Sort</button>
                <button class = 'button' onClick={() => this.quickSort()}>Quick Sort</button>
                <button class = 'button' onClick={() => this.bubbleSort()}>Bubble Sort</button>
                <button class = 'button' onClick={() => this.heapSort()}>Heap Sort</button>
            </div>
        );

    }

}

function randomIntInterval(start, end){
    return Math.floor(Math.random() * (end - start + 1) + start);
}

function arraysEqual(array1, array2) {
    if (array1.length != array2.length) return false;

    for (let i = 0; i < array1.length; i++){
        if (array1[i] != array2[i]) return false;
    }

    return true;
}