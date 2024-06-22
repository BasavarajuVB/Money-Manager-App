// Write your code here
import './index.css'

const TransactionItem = props => {
  const {eachUserEnteredMoney, filterDeletedItems} = props
  const {id, title, amount, type} = eachUserEnteredMoney

  const removeItem = () => {
    filterDeletedItems(id)
  }
  return (
    <li>
      <hr />
      <div className="list-container">
        <p className="title">{title}</p>
        <p>RS {amount}</p>
        <p>{type}</p>
        <button
          type="button"
          className="button"
          onClick={removeItem}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}
export default TransactionItem
