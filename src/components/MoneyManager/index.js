import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here

class MoneyManager extends Component {
  state = {
    title: '',
    amount: '',
    type: 'Income',
    moneyList: [],
    balance: 0,
    income: 0,
    expenses: 0,
  }

  onSubmitTrigger = event => {
    event.preventDefault()
    const {title, amount, type} = this.state
    if (title === '' || amount === '') {
      return
    }
    const newTitle = {
      id: uuidv4(),
      title,
      amount,
      type,
    }
    if (type === 'Income') {
      this.setState(prevState => ({
        moneyList: [...prevState.moneyList, newTitle],
        title: '',
        balance: prevState.balance + amount,
        amount: '',
        income: prevState.income + amount,
      }))
    } else if (type === 'Expenses') {
      this.setState(prevState => ({
        moneyList: [...prevState.moneyList, newTitle],
        title: '',
        balance: prevState.balance - amount,
        amount: '',
        income: prevState.income,
        expenses: prevState.expenses + amount,
      }))
    }
  }

  filterDeletedItems = id => {
    const {moneyList} = this.state
    const filetrDeletedDate = moneyList.filter(each => each.id !== id)
    const item = moneyList.filter(each => each.id === id)
    const {type, amount} = item[0]
    // console.log(item)
    // console.log(type)
    // console.log(amount)
    if (type === 'Income') {
      this.setState(prevState => ({
        moneyList: filetrDeletedDate,
        title: '',
        balance: prevState.balance - amount,
        amount: '',
        income: prevState.income - amount,
        expenses: prevState.expenses,
      }))
    } else if (type === 'Expenses') {
      this.setState(prevState => ({
        moneyList: filetrDeletedDate,
        title: '',
        balance: prevState.balance + amount,
        amount: '',
        income: prevState.income,
        expenses: prevState.expenses - amount,
      }))
    }
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amount: parseInt(event.target.value)})
  }

  getType = event => {
    this.setState({type: event.target.value})
  }

  render() {
    const {title, amount, moneyList, balance, income, expenses} = this.state
    return (
      <div className="app-bg-container">
        <div className="inner-card-container">
          <div className="money-mangager-container">
            <h1>Hi, Richard</h1>
            <p>
              Welcome back to your <span>Money Manager</span>
            </p>
          </div>
          <div className="balance-income-expense-container">
            <div className="balance-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
                alt="balance"
                className="symbol"
              />
              <div>
                <p>Your Balance</p>
                <p className="amount" data-testid="balanceAmount">
                  Rs {balance}
                </p>
              </div>
            </div>
            <div className="income-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
                alt="income"
                className="symbol"
              />
              <div>
                <p>Your Income</p>
                <p className="amount" data-testid="incomeAmount">
                  Rs {income}
                </p>
              </div>
            </div>
            <div className="expense-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
                alt="expenses"
                className="symbol"
              />
              <div>
                <p>Your Expenses</p>
                <p className="amount" data-testid="expensesAmount">
                  Rs {expenses}
                </p>
              </div>
            </div>
          </div>
          <div className="bottom-containers">
            <div className="transaction-container">
              <h1 className="transaction-container-heading">
                Add Transactions
              </h1>
              <form type="form" onSubmit={this.onSubmitTrigger}>
                <label htmlFor="inputEl">TITLE</label>
                <br />
                <input
                  type="text"
                  id="inputEl"
                  placeholder="TITLE"
                  className="inputEl"
                  value={title}
                  onChange={this.onChangeTitle}
                />
                <br />
                <label htmlFor="userAmount">AMOUNT</label>
                <br />
                <input
                  type="text"
                  id="userAmount"
                  placeholder="AMOUNT"
                  className="amount-inputEl"
                  value={amount}
                  onChange={this.onChangeAmount}
                />
                <br />
                <label htmlFor="TYPE">TYPE</label>
                <br />
                <select className="select-inputEl" onChange={this.getType}>
                  {transactionTypeOptions.map(eachOption => (
                    <option id={eachOption.id} key={eachOption.optionId}>
                      {eachOption.displayText}
                    </option>
                  ))}
                </select>
                <br />
                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
            </div>
            <div className="history-container">
              <h1 className="transaction-container-heading">History</h1>
              <div className="history-items">
                <div className="history-container-headings">
                  <p>Title</p>
                  <p>Amount</p>
                  <p>Type</p>
                </div>
                <ul>
                  {moneyList.map(eachAmount => (
                    <TransactionItem
                      eachUserEnteredMoney={eachAmount}
                      key={eachAmount.id}
                      filterDeletedItems={this.filterDeletedItems}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
