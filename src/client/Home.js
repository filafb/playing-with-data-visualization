import React, {useState} from 'react';
import logo from './react.svg';
import './Home.css';
import axios from 'axios'


function Home () {
  const [file, selectFile] = useState(null)
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
      console.log(newObj)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <React.Fragment>
      <input type="file" name="file" onChange={getFile} />
      <button type="button" onClick={upload}>upload</button>
    </React.Fragment>
    )
}

export default Home;
