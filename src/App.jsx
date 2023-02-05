import { useState, useEffect } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import "./App.css";

function App() {
  const [myData, setMyData] = useState([]);
  const [isError, setIsError] = useState([]);
  const [btnname, setBtnName] = useState("Save");
  const [documentmode, setDocumentMode] = useState("add");
  const [updateData, setUpdateData] = useState([]);
  const API = 'http://localhost:4335/api/Contacts';

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    email: ''
  })


  const changeHandler = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const getData = async () => {
    try {
      const res = await axios.get(`${API}/GetContacts`)
      //console.log(res.data);
      setMyData(res.data)



    }
    catch (error) {
      setIsError(error.message)

    }

  }


  const addPost = async (e) => {
    e.preventDefault();
    if (documentmode == "add") {


      var resp = await axios.post(`${API}/AddContacts`, formData).then((res) => {
        console.warn("Posting data =", res)
        setMyData([...myData, res.data]);
      })

    }
    else if (documentmode == "edit") {
      console.warn("update=", formData);
      const item = formData.id;
      console.warn(item);



      axios.put(`${API}/${item}`, formData)
        .then((response) => {
          console.log(typeof (response.data));
          const tempData = [response.data];
          setMyData(tempData);
        });

    }
    setBtnName("Save");
    setDocumentMode("add");






  }
  function updatePost(id) {
    setBtnName("Update");
    setDocumentMode("edit");
    //console.warn(id, "object =", myData[id - 1]);
    let item = myData[id];
    setFormData(
      {
        id: item.id,
        fullName: item.fullName,
        phone: item.phone,
        address: item.address,
        email: item.email
      })

  }
  // function Edit() {
  //   // axios.put(`${API}/posts/${id}`, formData)
  //   //   .then((response) => {
  //   //     setMyData(response.data);
  //   //   });

  // }


  const Delete = (id) => {
    console.warn(id);
    axios.delete(`${API}/${id}`)


    setMyData(
      myData.filter((post) => {
        return post.id !== id;
      })
    );


    // })

  }




  useEffect(() => {
    getData();
  }, [myData])
  return (
    <div className="App">

      {/* {isError != '' && <h2>{isError}</h2>}
      {
          myData.slice(0,12).map((post)=>{
            const {id,address,email } = post;
            return (
              <div className="card" key={id}>
                <h3>{address.slice(0,10)}</h3>
                <p>{email}</p>
              </div>
            )
          })

      } */}
      {isError != '' && <h2>{isError}</h2>}
      {/* <Button variant="primary" onClick={addPost}>View</Button> */}
      <form>
        <label>fullName</label><br />
        <input type="text" name='fullName' value={formData.fullName || ""} onChange={changeHandler} /> <br /><br />
        <label>phone</label><br />
        <input type="text" name='phone' value={formData.phone || ""} onChange={changeHandler} /> <br /><br />
        <label>address</label><br />
        <input type="text" name='address' value={formData.address || ""} onChange={changeHandler} /> <br /><br />
        <label>email</label><br />
        <input type="text" name='email' value={formData.email || ""} onChange={changeHandler} /> <br /><br />
        <button type='button' onClick={addPost}>{btnname}</button>

      </form>
      {/* try */}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>

            <th>fullName</th>
            <th>phone</th>
            <th>address</th>
            <th>email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            myData.map((item, i) => {
              return (<tr key={i}>
                <td>{item.fullName}</td>
                <td>{item.phone}</td>
                <td>{item.address}</td>
                <td>{item.email}</td>
                <td>

                  <Button variant="success" onClick={() => updatePost(i)}>Edit</Button>&nbsp; &nbsp;
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
