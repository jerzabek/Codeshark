import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { getTask, executeTask } from '../../API'
import CodeEditor from '@uiw/react-textarea-code-editor';
import Select from 'react-select'
import { UserContext } from './../../common/UserContext';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

const MySwall = withReactContent(Swal)

function Task(props) {

    const userContext = useContext(UserContext)
    const [showTests, setShowTests] = useState(false)


    const { handle } = useParams()
    const [list, setList] = useState([]);

    useEffect(() => {

        (async () => {
            try {
                const res = await getTask(handle)

                if (res.success) {
                    setList(res.data)
                } else {
                    let mock = []

                    for (var i = 0; i < 20; i++) {
                        mock.push({
                            ime_prezime_autora: 'marko markic', ime_zadatka: 'zadatak', max_vrijeme_izvrsavanja: '2.4',
                            slag: 'zadatak', tekst_zadatka: 'tekst tekst tekst tekst', tezina: '1'
                        })
                    }

                    setList(mock)
                }
            } catch (err) {
                console.log(err)
            }
        })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleRunAndSave(lang, code) {

        setShowTests(true)
        const username = userContext.user.username

        const executeTaskData = {
            "slug": handle,
            "korisnickoime": username,
            "lang": lang,
            "code": code
        };


        (async () => {
            try {
                const res = await executeTask(executeTaskData)

                if (res.success) {
                    MySwall.fire({
                        title: <p>Success</p>,
                        html: <p>{res.data.result}</p>
                    })
                } else {
                     MySwall.fire({
                         title: <p>Success</p>,
                         html: <p>All tests passed!</p>
                     })
                }
            } catch (err) {
                console.log(err)
            }
        })();
    }

    const [code, setCode] = React.useState(
        `function add(a, b) {\n  return a + b;\n}`
    );

    const options = [
        { value: 'py3', label: 'Python' },
        { value: 'c', label: 'C' },
        { value: 'cpp', label: 'C++' }
    ]

    const [state, setState] = React.useState(
        'py3'
    );


    //mock tests
    
    let mock = []

    for(var i = 0 ; i < 10 ; i++) {
        mock.push({ passed: 'passed', description: 'all correct' })
    }
    //delete this


    return (
        <React.Fragment>
            <div style={{ marginLeft: 30, marginTop: 20 }}>
                <h3>{list.ime_zadatka}</h3>
                <p>{list.tekst_zadatka}</p>
                <div><b>Author:</b> {list.ime_prezime_autora}</div>
                <div><b>Compile time limit: </b>{list.max_vrijeme_izvrsavanja} sec</div>
                <div><b>Difficulty: </b>{list.tezina}/5</div>
            </div>
            <div style={{ float: 'right', marginRight: 190 }} >
                <Select options={options}
                    className="basic-single "
                    defaultValue={options[0]}
                    onChange={(evn) => setState(evn.value)}
                />
            </div>
            <CodeEditor

                language="c"
                placeholder="Please enter your code."
                onChange={(evn) => setCode(evn.target.value)}
                padding={15}
                style={{
                    fontSize: 12,
                    backgroundColor: "#f5f5f5",
                    fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                    marginLeft: 190,
                    marginRight: 190,
                    marginTop: 50,
                    marginBottom: 10,
                    minHeight: 400,
                }}
            />

            <button className='btn btn-info  btn-dark rounded-0 btn-cta px-2'
                style={{ float: 'right', marginRight: 190 , marginBottom: 50}}
                onClick={(e) => handleRunAndSave(state, code)}>
                Run and save!
            </button>
            {
                showTests ? (
                    <div style={{marginLeft: 220, marginRight: 220, marginTop: 70, marginBottom: 50}}>
                    <h2>Result : 100%</h2>
                    <table className="table table-striped table-hover competition-table">
                        <thead>
                        </thead>
                        <tbody>
                            {mock && mock.map(test =>
                                <tr key={test.passed}>
                                    <td></td>
                                    <td style={{ color: 'green'}}>{test.passed}</td>
                                    <td>{test.description}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <h3 style={{ color: 'white'}}>-</h3>
                    </div>
                ) : (<div></div>)
            }
        </React.Fragment>

    );

}

export default Task;