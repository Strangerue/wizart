import React from 'react'
import { Link } from 'react-router-dom';
import EmployeeTable from '../components/EmployeeTable'

function EmployeesPage() {
    return (
      <div>
        <ul className="search-and-buts-row">
          <li className="search-and-buts search">
            <input type="text" className="input" placeholder="type here..." />
          </li>
          <li className="search-and-buts buts">
            <button type="button" className="but notification"></button>
            <button type="button" className="but account"></button>
          </li>
        </ul>
        <div className="h_line"></div>
        <div className="employ-header">
          Welcome, Name
          <Link to="/employees/new_employee">
            <button type="button" className="add-employee">
              <img src="/public/Usersgroup.svg" align="absmiddle" className="icon" />
              Add an employee
            </button>
          </Link>
        </div>
        <EmployeeTable></EmployeeTable>
      </div>
    )
  }

export default EmployeesPage