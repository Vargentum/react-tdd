import React from "react"
import { AppointmentDayView } from "../src/AppointmentDayView"
import { render, click, initializeReactContainer} from './reactTestExtensions'

describe('AppointmentDayView', () => {
  
  const today = new Date()
  const twoAppointments = [
    {startAt: today.setHours(12, 0), customer: {firstName: "Ashley"}},
    {startAt: today.setHours(13, 0), customer: {firstName: "Jordan"}},
  ]

  beforeEach(() => {
    initializeReactContainer()
  })

  it('renders a div with the right id', () => {
    render(<AppointmentDayView appointments={[]} />)
    expect(document.body.querySelector('div#appointmentsDayView')).not.toBeNull()
  })

  it('renders an ol element to display appointments', () => {
    render(<AppointmentDayView appointments={[]} />)
    expect(document.body.querySelector('ol')).not.toBeNull()
  })

  it('renders an li for each appointment', () => {
    render(<AppointmentDayView appointments={twoAppointments} />)
    const children = document.body.querySelectorAll('ol > li')
    expect(children).toHaveLength(2)
  })

  it('renders the time of each appointment', () => {
    render(<AppointmentDayView appointments={twoAppointments} />)
    const children = document.body.querySelectorAll('li')
    expect(children[0].textContent).toContain('12:00')
    expect(children[1].textContent).toContain('13:00')
  })

  it('initially shows a message saying there are no appointments today', () => {
    render(<AppointmentDayView appointments={[]} />)
    expect(document.body.textContent).toContain('There are no appointments scheduled for today.')
  })

  it('selects the first appointment by default', () => {
    render(<AppointmentDayView appointments={twoAppointments} />)
    expect(document.body.textContent).toContain('Ashley')
  })

  it('has a button element in each li', () => {
    render(<AppointmentDayView appointments={twoAppointments} />)
    const buttons = document.body.querySelectorAll('li > button')
    expect(buttons).toHaveLength(2)
    expect(buttons[0].type).toEqual('button')
  })

  it('renders another appointment when selected', () => {
    render(<AppointmentDayView appointments={twoAppointments} />)
    const button = document.body.querySelectorAll('button')[1]
    click(button)
    expect(document.body.textContent).toContain('Jordan')
  })

})