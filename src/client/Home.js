import React, {useState, useEffect, useRef} from 'react';
import logo from './react.svg';
import './Home.css';
import axios from 'axios'
import D3 from './D3'


function Home () {
  const [file, selectFile] = useState(null)
  const [data, getData ] = useState(null)
  const getFile = (e) => {
    const fileUp = e.target.files[0]
    selectFile(fileUp)
  }


  const upload = async () => {
    try {
      const data = new FormData()
      data.append('file', file)
      console.log(file)
      const { data: newObj} = await axios.post('/api/upload', data)
      getData(newObj)
      console.log(newObj)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <React.Fragment>
      <div style={{width: '100%'}}>
        <input type="file" name="file" onChange={getFile} />
        <button type="button" onClick={upload}>upload</button>
      </div>
      <D3 />
    </React.Fragment>
    )
}

export default Home;
