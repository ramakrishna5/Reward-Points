import { h, render, Component } from 'preact';
import moment from 'moment';

var rewardPoint = 0;
var totalPoints = 0;
class Transaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transactionList: [],
            selectValue: 'selectMonth'
        }

    }

    componentDidMount() {
        fetch('http://localhost:3000/transactions')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    transactionList: data
                });
            }).catch(error => console.error(error))
    }

    handleChange(event) {
        this.setState({ selectValue: event.target.value }, () => {
            fetch('http://localhost:3000/transactions?month_like=' + this.state.selectValue)
                .then(response => response.json())
                .then(data => {
                    totalPoints = 0;
                    this.setState({
                        transactionList: data
                    });
                }).catch(error => console.error(error))
        });
    }

    render() {
        const tableList = this.state.transactionList.map(item => {
            rewardPoint = 0;
            if (parseInt(item.amount) > 50 && parseInt(item.amount) <= 100) {
                var pointCal = parseInt(item.amount) - 50;
                rewardPoint = pointCal * 1 + 0;
            } else if (parseInt(item.amount) > 100) {
                var pointCal = parseInt(item.amount) - 100;
                rewardPoint = pointCal * 2 + 50;
            }
            totalPoints = rewardPoint + totalPoints;
            return (
                <tr key={item.id}>
                    <td style="padding: 20px;border: 1px solid black;border-collapse: collapse;">{item.id}</td>
                    <td style="padding: 20px;border: 1px solid black;border-collapse: collapse;">{item.customer_name}</td>
                    <td style="padding: 20px;border: 1px solid black;border-collapse: collapse;">{item.amount}</td>
                    <td style="padding: 20px;border: 1px solid black;border-collapse: collapse;">
                        {moment(item.date).format('DD/MMM/YYYY')}
                    </td>
                    <td style="padding: 20px;border: 1px solid black;border-collapse: collapse;">{rewardPoint}</td>
                </tr>
            );
        });
        return (
            <div>
                <h3 style="color: #9b4dca;">Reward List</h3>
                <hr />
                <select value={this.state.selectValue}
                    onChange={(e) => { this.handleChange(e) }}>
                    <option value="selectMonth">Select Month</option>
                    <option value="january">Jan</option>
                    <option value="february">Feb</option>
                    <option value="march">Mar</option>
                    <option value="april">Apr</option>
                    <option value="may">May</option>
                    <option value="june">Jun</option>
                    <option value="july">Jul</option>
                    <option value="august">Aug</option>
                    <option value="september">Sep</option>
                    <option value="october">Oct</option>
                    <option value="november">Nov</option>
                    <option value="december">Dec</option>
                </select>
                <table style="width:100%">
                    <tr>
                        <th style="padding: 20px;text-align:left;border: 1px solid black;border-collapse: collapse;">Customer Id</th>
                        <th style="text-align:left;border: 1px solid black;border-collapse: collapse;">Customer Name</th>
                        <th style="text-align:left;border: 1px solid black;border-collapse: collapse;">Amount</th>
                        <th style="text-align:left;border: 1px solid black;border-collapse: collapse;">Date</th>
                        <th style="text-align:left;border: 1px solid black;border-collapse: collapse;">Reward Points</th>
                    </tr>
                    {tableList}
                    <tr>
                        <td colspan="2" style="padding: 20px;text-align:center;border: 1px solid black;border-collapse: collapse;">Total Reward Points : </td>
                        <td colspan="3" style="padding: 20px;text-align:center;border: 1px solid black;border-collapse: collapse;">{totalPoints}</td>
                    </tr>
                </table>
            </div>
        );
    }
}

export default Transaction;