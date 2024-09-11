import React, { useState } from "react";

const Counter = () => {

    const [number, setNumber] = useState(0);
    const [check, setCheck] = useState('');

    const increment = (event) => {
        let n = number;
        n++;
        checkValues(n);
        setNumber(n);
    }

    const decrement = (event) => {
        let n = number;
        n--;
        checkValues(n);
        setNumber(n);
    }

    const checkValues = (n) => {
        if(n % 2 === 0){
            setCheck('even');
        }else{
            setCheck('odd');
        }
    }

    return (
        <>
            <div className="container">
                <h1>Counter</h1>
                <div className="row">
                    <div className="col">
                        <h3 className="text-secondary">Counter: <span className="text-primary">{number}-{check}</span></h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-1">
                        <button className="btn btn-danger" onClick={decrement}>-</button>
                    </div>
                    <div className="col-1">
                        <button className="btn btn-success" onClick={increment}>+</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Counter;