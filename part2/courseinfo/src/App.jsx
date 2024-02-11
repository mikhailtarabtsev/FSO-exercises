const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  const Header =({name}) => {
    return (
      <h1>{name}</h1>
    )
  }


  const Content = ({parts}) => {
    return(
      <>
      {parts.map(part => 
          <Part name = {part.name} exercises = {part.exercises} key = {part.id} />
      )
      }
      </>
    )
  }


  const Part = ({name, exercises}) => {
    return (
      <p>
      {name} {exercises}
      </p>
    )
  }

  const Total = ({parts}) =>{
    const exercises =  parts.map(part =>part.exercises )
    const total = exercises.reduce((sum, value) => sum+value)

    return (
      <h3>Total of {total} exercises </h3>
    )

  }

  

  const Course = ({course}) => {
    return(

    <>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
    </>
    )

  }

  return <Course course={course} />
}

export default App