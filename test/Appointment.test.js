import React from "react"
import { Appointment } from "../src/Appointment"
import { render, initializeReactContainer} from './reactTestExtensions'

describe('Appointment', () => {

  beforeEach(() => {
    initializeReactContainer()
  })

  it('renders the customer first name', () => {
    const customer = {firstName: 'Ashley'}
    render(<Appointment customer={customer} />)
    expect(document.body.textContent).toContain('Ashley')
  })

  it('renders the another customer first name', () => {
    const customer = {firstName: 'Jordan'}
    render(<Appointment customer={customer} />)
    expect(document.body.textContent).toContain('Jordan')
  })

  it('renders the customer last name', () => {
    const customer = {lastName: 'Smith'}
    render(<Appointment customer={customer} />)
    expect(document.body.textContent).toContain('Smith')
  })

  it('renders the another customer last name', () => {
    const customer = {lastName: 'Brown'}
    render(<Appointment customer={customer} />)
    expect(document.body.textContent).toContain('Brown')
  })
})
