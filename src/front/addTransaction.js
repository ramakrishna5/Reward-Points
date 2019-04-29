import { h, render, Component } from 'preact';
import moment from 'moment';
import './addTransaction.css';
import RewardScreen from './rewardScreen';

class AddTransaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerName: '',
            amount: '',
            transactionDate: ''
        }

    }


    handleSubmit(e) {
        var month = moment(this.state.transactionDate).format("MMMM");
        var addData = {
            "amount": this.state.amount,
            "date": this.state.transactionDate,
            "month": month,
            "customer_name": this.state.customerName
        }
        fetch('http://localhost:3000/transactions', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(addData)
        }).then(res => res.json())
            .then(res => {
                console.log("add trans res =>" + res);
                window.location.reload();
            });

    }

    render() {
        return (
            <div>
                <form action="">
                    <div className="container">
                        <h3 style="color: #9b4dca;">Add Transaction</h3>
                        <hr />
                        <label style="color: #9b4dca;" for="email"><b>Customer Name</b></label>
                        <input type="text" placeholder="Enter customer name" name="customerName"
                            onChange={(e) => { this.setState({ customerName: event.target.value }) }} required />
                        <label style="color: #9b4dca;" for="psw"><b>Amount</b></label>
                        <input type="number" placeholder="Enter amount" name="amount" onChange={(e) => { this.setState({ amount: event.target.value }) }} required />

                        <label style="color: #9b4dca;" for="psw-repeat"><b>Transaction Date</b></label>
                        <input type="date" name="transactionDate" onChange={(e) => { this.setState({ transactionDate: event.target.value }) }} required />
                        <hr />

                        <button type="button" className="registerbtn" onClick={(e) => { this.handleSubmit(e) }}>Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddTransaction;