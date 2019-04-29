import 'promise-polyfill/src/polyfill'
import 'whatwg-fetch'
import { h, render } from 'preact'
import 'milligram/dist/milligram.css'
import './style.css'
import TransactionData from './transaction';
import AddTransaction from './addTransaction';
import RewardScreen from './rewardScreen';

function ResourceItem({ name, length }) {
  console.log("Resources Item ==>" + name + ", Length =>" + length);
  return (
    <li>
      <a href={name}>{name}</a>
      {/* <sup>{length ? `${length}x` : 'object'}</sup> */}
    </li>
  )
}

function ResourceList({ db }) {
  console.log("Resource List ==>" + JSON.stringify(db));
  return (
    <ul>
      {Object.keys(db).map(name => (
        <ResourceItem
          name={name}
          length={Array.isArray(db[name]) && db[name].length}
        />
      ))}
    </ul>
  )
}

function NoResources() {
  return <p>No resources found</p>
}

function ResourcesBlock({ db }) {
  console.log("Resource Block ==>" + db);
  return (
    <div>
        <RewardScreen/>
      {/* <TransactionData/>&nbsp;&nbsp; */}
      {/* <a href="customers">Transaction</a> */}
    </div>
    // <div>
    //   {Object.keys(db).length ? <ResourceList db={db} /> : <NoResources />}
    // </div>
  )
}

window
  .fetch('db')
  .then(response => response.json())
  .then(db =>
    render(<ResourcesBlock db={db} />, document.getElementById('resources'))
  )

function CustomRoutesBlock({ customRoutes }) {
  const rules = Object.keys(customRoutes)
  if (rules.length) {
    return (
      <div>
        <h4>Custom Routes</h4>
        <table>
          {rules.map(rule => (
            <tr>
              <td>{rule}</td>
              <td>⇢ {customRoutes[rule]}</td>
            </tr>
          ))}
        </table>
      </div>
    )
  }
}

window
  .fetch('__rules')
  .then(response => response.json())
  .then(customRoutes => {
    render(
      <CustomRoutesBlock customRoutes={customRoutes} />,
      document.getElementById('custom-routes')
    )
  })
