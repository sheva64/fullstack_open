import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'

const Filter = ({ newFilter, handleFilterChange }) => {
  return <div>filter shown with <input value={newFilter} onChange={handleFilterChange}/></div>
}

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return <form onSubmit={addPerson}>
            <div>
              name: <input value={newName} onChange={handleNameChange}/>
            </div>
            <div>
              number: <input value={newNumber} onChange={handleNumberChange}/>
            </div>
            <div>
              <button type="submit">add</button>
            </div>
         </form>
}

const Persons = ({ personsToShow, deletePerson }) => {
  return <div>{personsToShow.map((person) => (
    <Person key={person.name} person={person} deletePerson={deletePerson} />
  ))}</div>
}

const Person = ({ person, deletePerson }) => {
  return <div>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person.id)}>delete</button>
        </div>
}

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')
 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [addingMessage, setAddingMessage] = useState({ message: 'You will see changes here...', type: "success" })

  const addPerson = (event) => {
    event.preventDefault()
    
    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber }
        personService
        .update(existingPerson.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
          setAddingMessage({
            message: `Changed number of ${existingPerson.name}`,
            type: "success"
        })
          setTimeout(() => {
            setAddingMessage({ message: null, type: null })
          }, 5000)
        })
        .catch(error => {
          setAddingMessage({
            message: `Information of ${existingPerson.name} was already removed from server`,
            type: "failure"
        })
          setTimeout(() => {
            setAddingMessage({ message: null, type: null })
          }, 5000)
          setPersons(persons.filter(p => p.name !== existingPerson.name))
        })
      }
      return
    }

    const personObject = {
      name: newName,
      number: newNumber 
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setAddingMessage({
          message: `Added ${personObject.name}`,
          type: "success"
        })
        setTimeout(() => {
          setAddingMessage({ message: null, type: null })
        }, 5000)
      })
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const personsToShow = newFilter
    ? persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
    : persons

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={addingMessage.message} type={addingMessage.type}/>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
                                        newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App