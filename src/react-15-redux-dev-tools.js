//import module React dan React DOM
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Form, Field } from 'react-final-form'
import Styles from './Styles';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { createStore } from 'redux';
import formReducer from './formReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(formReducer, composeWithDevTools())
//2)  memanggil reference ke div dengan id root
const el = document.getElementById("root");

//3) Memberi tahu react untuk Mengambil control dari elemen tersebut 
const root = ReactDOM.createRoot(el);

/* eslint-disable jsx-a11y/accessible-emoji */
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))


const App = (props) => {

  //dispatch isi variabel 'values' ke 'store' pada saat tombol 'Submit' ditekan
  const onSubmit = async values => {
    await sleep(300)
    console.log(values);
    dispatch({type:"UPDATE_FIRST_NAME",payload:{firstName: values.firstName}});
    dispatch({type:"UPDATE_LAST_NAME",payload:{lastName: values.lastName}});
    dispatch({type:"UPDATE_EMPLOYED",payload:{employed: values.employed}});
    dispatch({type:"UPDATE_EDUCATION",payload:{education: values.education}});
    dispatch({type:"UPDATE_EXPERTISES",payload:{expertises: values.expertises}});
    dispatch({type:"UPDATE_PREF_TECHS",payload:{prefTechs: values.tech}});
    dispatch({type:"UPDATE_NOTES",payload:{notes: values.notes}});
    // window.alert(values)
  }

  //hooks untuk dispatch() dan baca isi store
  const formData=useSelector(state=>state);
  const dispatch=useDispatch();
  
  return (
    //contoh kode dari react-final-form
    <Styles>
      <h1>Employee Form</h1>
      <Form
        onSubmit={onSubmit}
        initialValues={{}}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <label>First Name</label>
              <Field
                name="firstName"
                component="input"
                type="text"
                placeholder="First Name"
              />
            </div>
            <div>
              <label>Last Name</label>
              <Field
                name="lastName"
                component="input"
                type="text"
                placeholder="Last Name"
              />
            </div>
            <div>
              <label>Employed</label>
              <Field name="employed" component="input" type="checkbox" />
            </div>
            <div>
              <label>Education</label>
              <Field name="education" component="select">
                <option />
                <option value="high school">High School</option>
                <option value="bachelor">Bachelor</option>
                <option value="master">Master</option>
              </Field>
            </div>
            <div>
              <label>Expertise</label>
              <div>
                <label>
                  <Field
                    name="expertises"
                    component="input"
                    type="checkbox"
                    value="html"
                  />{' '}
                  HTML
                </label>
                <label>
                  <Field
                    name="expertises"
                    component="input"
                    type="checkbox"
                    value="css"
                  />{' '}
                  CSS
                </label>
                <label>
                  <Field
                    name="expertises"
                    component="input"
                    type="checkbox"
                    value="javascript"
                  />{' '}
                  Javascript
                </label>
                <label>
                  <Field
                    name="expertises"
                    component="input"
                    type="checkbox"
                    value="nodejs"
                  />{' '}
                  NodeJS
                </label>
                <label>
                  <Field
                    name="expertises"
                    component="input"
                    type="checkbox"
                    value="reactjs"
                  />{' '}
                  ReactJS
                </label>
              </div>
            </div>
            <div>
              <label>Preffered Technology</label>
              <div>
                <label>
                  <Field
                    name="tech"
                    component="input"
                    type="radio"
                    value="frontend"
                  />{' '}
                  Front End
                </label>
                <label>
                  <Field
                    name="tech"
                    component="input"
                    type="radio"
                    value="backend"
                  />{' '}
                  Back End
                </label>
                <label>
                  <Field
                    name="tech"
                    component="input"
                    type="radio"
                    value="fullstack"
                  />{' '}
                  Full Stack
                </label>
              </div>
            </div>
            <div>
              <label>Notes</label>
              <Field name="notes" component="textarea" placeholder="Notes" />
            </div>
            <div className="buttons">
              <button type="submit" disabled={submitting || pristine}>
                Submit
              </button>
              <button
                type="button"
                onClick={form.reset}
                disabled={submitting || pristine}
              >
                Reset
              </button>
            </div>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
    </Styles>
  )
}
//Render komponen ke root div
root.render(
  <Provider store={store}>
    <App></App>
  </Provider>
)