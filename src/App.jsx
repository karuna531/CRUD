import { useState, useEffect } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import "./App.css";

function App() {
  const [myData, setMyData] = useState([]);
  const [isError, setIsError] = useState([]);
  const API = 'https://jsonplaceholder.typicode.com';

  const [formData, setFormData] = useState({
    userId: '',
    id: '',
    title: '',
    body: ''
  })


  const changeHandler = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  // useEffect(() => {
  //   axios.get("https://jsonplaceholder.typicode.com/posts").then((resp) =>
  //   setMyData(resp.data)).catch((error)=>setIsError(error.message));
  // }, [])

  //console.log(myData)
  const getData = async () => {
    try {
      const res = await axios.get(`${API}/posts`)
      //console.log(res.data);
      setMyData(res.data)
      //for update purpose
      // setFormData({
      //   userId: res[0].userId,
      //   id: res[0].id,
      //   title: res[0].title,
      //   body: res[0].body
      // })

    }
    catch (error) {
      setIsError(error.message)

    }


  }

  // const addPost = async () => {
  //   const data = { userId, id, title, body };

  //   const response = await axios.post(
  //     `             ${API}/posts`, data
  //   );
  //   setFormData([post, ...posts])

  // }
  const addPost = async (e) => {
    e.preventDefault();
    //const data = { userId, id, title, body };
    var resp = await axios.post(`${API}/posts`, formData).then((res) => {
      console.warn("Posting data =", res)
      setMyData([...myData, res.data]);
    })



    //console.log(resp.data)

    // //axios.post(`${API}, data `)

  }
  function updatePost(id) {
    //console.warn(id, "object =", myData[id - 1]);
    let item = myData[id - 1];
    setFormData(
      {
        userId: item.userId,
        id: item.id,
        title: item.title,
        body: item.body
      }

    )
    console.warn(item.title);
  }
  function Edit() {
    console.warn(formData.id)
    // axios.put(`${API}/posts/${id}`, formData)
    //   .then((response) => {
    //     setMyData(response.data);
    //   });

  }


  const Delete = (id) => {
    console.warn(id);
    axios.delete(`${API}/posts/${id}`).then(response => {
      console.log("deleted successfully!", id)
      // setMyData(myData.filter((p) => p.id !== id));

      setMyData(
        myData.filter((post) => {
          return post.id !== id;
        })
      );


    })

  }




  useEffect(() => {
    getData();
  }, [])
  return (
    <div className="App">

      {/* {isError != '' && <h2>{isError}</h2>}
      {
          myData.slice(0,12).map((post)=>{
            const {id,title,body } = post;
            return (
              <div className="card" key={id}>
                <h3>{title.slice(0,10)}</h3>
                <p>{body}</p>
              </div>
            )
          })

      } */}
      {isError != '' && <h2>{isError}</h2>}
      {/* <Button variant="primary" onClick={addPost}>View</Button> */}
      <form>
        <label>userId</label><br />
        <input type="text" name='userId' value={formData.userId || ""} onChange={changeHandler} /> <br /><br />
        <label>Id</label><br />
        <input type="text" name='id' value={formData.id || ""} onChange={changeHandler} /> <br /><br />
        <label>Title</label><br />
        <input type="text" name='title' value={formData.title || ""} onChange={changeHandler} /> <br /><br />
        <label>Body</label><br />
        <input type="text" name='body' value={formData.body || ""} onChange={changeHandler} /> <br /><br />
        <button type='button' onClick={addPost}>Save</button>
        <button type='button' onClick={Edit}>Edit</button>
      </form>
      {/* try */}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>

            <th>userId</th>
            <th>Id</th>
            <th>Title</th>
            <th>Body</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            myData.map((item, i) => {
              return (<tr key={i}>
                <td>{item.userId}</td>
                <td>{item.id}</td>
                <td>{item.title.slice(0, 7)}</td>
                <td>{item.body.slice(0, 10)}</td>
                <td>

                  <Button variant="success" onClick={() => updatePost(item.id)}>Edit</Button>&nbsp; &nbsp;
                  <Button variant="danger" onClick={() => Delete(item.id)} >Remove</Button>
                </td>


              </tr>)

            })
          }

        </tbody>
      </Table>



    </div>
  )
}

export default App;
