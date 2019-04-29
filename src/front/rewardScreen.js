import { h, render, Component } from 'preact';
import TransactionData from './transaction';
import AddTransaction from './addTransaction';


class RewardScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rewardListToggle: true,
            addTransactionToggle: false,
        }

    }

    openRewardList() {
        this.setState({
            rewardListToggle: true,
            addTransactionToggle: false
        });
    }

    openAddTransaction(e) {
        this.setState({
            rewardListToggle: false,
            addTransactionToggle: true
        });
    }

    render() {
        return (
            <div>
                <div class="tab">
                    <button class="tablinks" onClick={(e) => this.openRewardList()}>Reward List</button>&nbsp;&nbsp;&nbsp;
                <button class="tablinks" onClick={(e) => this.openAddTransaction(e)}>Add Transaction</button>
                </div>
                <hr />
                {this.state.rewardListToggle ? <TransactionData /> : false}
                {this.state.addTransactionToggle ? <AddTransaction /> : false}
            </div>
        );
    }
}

export default RewardScreen;