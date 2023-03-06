import React from "react"
import ReactDOM from "react-dom/client"
import { act } from "react-dom/test-utils";
import { Appointment, AppointmentDayView } from "../src/Appointment"

describe('Appointment', () => {
  let container
  beforeEach(() => {
    container = document.createElement('div')
    document.body.replaceChildren(container)
  })
  const render = component => act(() => {
    ReactDOM.createRoot(container).render(component)
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
})


describe('AppointmentDayView', () => {
  let container
  const render = component => act(() => {
    ReactDOM.createRoot(container).render(component)
  })
  const today = new Date()
  const twoAppointments = [
    {startAt: today.setHours(12, 0), customer: {firstName: "Ashley"}},
    {startAt: today.setHours(13, 0), customer: {firstName: "Jordan"}},
  ]

  beforeEach(() => {
    container = document.createElement('div')
    document.body.replaceChildren(container)
  })

  it('renders a div with the right id', () => {
    render(<AppointmentDayView appointments={[]} />)
    expect(container.querySelector('div#appointmentsDayView')).not.toBeNull()
  })

  it('renders an ol element to display appointments', () => {
    render(<AppointmentDayView appointments={[]} />)
    expect(container.querySelector('ol')).not.toBeNull()
  })

  it('renders an li for each appointment', () => {
    render(<AppointmentDayView appointments={twoAppointments} />)
    const children = container.querySelectorAll('ol > li')
    expect(children).toHaveLength(2)
  })

  it('renders the time of each appointment', () => {
    render(<AppointmentDayView appointments={twoAppointments} />)
    const children = container.querySelectorAll('li')
    expect(children[0].textContent).toContain('12:00')
    expect(children[1].textContent).toContain('13:00')
  })

  it('initially shows a message saying there are no appointments today', () => {
    render(<AppointmentDayView appointments={[]} />)
    expect(container.textContent).toContain('There are no appointments scheduled for today.')
  })

  it('selects the first appointment by default', () => {
    render(<AppointmentDayView appointments={twoAppointments} />)
    expect(container.textContent).toContain('Ashley')
  })

  it('has a button element in each li', () => {
    render(<AppointmentDayView appointments={twoAppointments} />)
    const buttons = container.querySelectorAll('li > button')
    expect(buttons).toHaveLength(2)
    expect(buttons[0].type).toEqual('button')
  })

  it('renders another appointment when selected', () => {
    render(<AppointmentDayView appointments={twoAppointments} />)
    const button = container.querySelectorAll('button')[1]
    act(() => button.click())
    expect(container.textContent).toContain('Jordan')
  })

})