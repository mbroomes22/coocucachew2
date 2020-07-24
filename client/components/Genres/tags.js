import React from 'react'


export default class Tags extends React.Component {

  filterSelection = () => {

  }

  render(){
    return(
      <div id="myBtnContainer">
        <button className="btn active" type="button" onClick={filterSelection('all')}> Show all</button>
        <button className="btn" type="button"  onClick={filterSelection('cars')}> Cars</button>
        <button className="btn" type="button" onClick={filterSelection('animals')}> Animals</button>
        <button className="btn" type="button" onClick={filterSelection('fruits')}> Fruits</button>
        <button className="btn" type="button" onClick={filterSelection('colors')}> Colors</button>
      </div>
    )
  }
}
