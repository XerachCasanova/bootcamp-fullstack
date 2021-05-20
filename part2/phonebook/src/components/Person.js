

const Person = ({ person, actionDelete }) => 
    <li>
        {person.name} {person.number} 
        <button key={person.id} onClick = {() => actionDelete(person)}>
            delete
        </button>
    </li>

export default Person