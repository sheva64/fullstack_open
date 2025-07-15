const Course = ({ course }) => {
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }
  
  const Header = ({ name }) => {
    return (
      <div>
        <h1>{name}</h1>
      </div>
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part => 
          <Part key={part.id} part={part} />
        )}
      </div>
    )
  }
  
  const Part = ({ part }) => {
    return (
      <div>
        <p>{part.name} {part.exercises}</p> 
      </div>
    )
  }
  
  const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
      <div>
        <p><b>total of {total} exercises</b></p>
      </div>
    )
  }

  export default Course;