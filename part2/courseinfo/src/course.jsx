const Header =({name}) => {
    return (
      <h2>{name}</h2>
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

  export default Course

  